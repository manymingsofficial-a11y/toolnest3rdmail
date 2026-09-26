'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Loader2, FileAudio, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
}

function stripID3Tags(buffer: ArrayBuffer): ArrayBuffer {
  const byteArray = new Uint8Array(buffer);
  
  // Check for ID3v2 header (first 10 bytes: "ID3" + version + flags + size)
  if (byteArray.length < 10) return buffer;
  
  if (byteArray[0] === 0x49 && byteArray[1] === 0x44 && byteArray[2] === 0x33) {
    // ID3v2 header found
    // Size is stored as 4 bytes synchsafe integer (bytes 6-9)
    const size = (byteArray[6] << 21) | (byteArray[7] << 14) | (byteArray[8] << 7) | byteArray[9];
    const tagSize = 10 + size;
    
    if (tagSize < byteArray.length) {
      // Strip the ID3v2 tag
      return byteArray.slice(tagSize).buffer;
    }
  }
  
  // Check for ID3v1 tag at the end (128 bytes)
  if (byteArray.length >= 128) {
    const end = byteArray.length - 128;
    if (byteArray[end] === 0x54 && byteArray[end + 1] === 0x41 && byteArray[end + 2] === 0x47) {
      // ID3v1 tag found ("TAG")
      return byteArray.slice(0, end).buffer;
    }
  }
  
  return buffer;
}

export function AudioMetadataRemover() {
  const [file, setFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const f = fileList[0];
    if (!f.type.startsWith('audio/')) {
      toast.error('Please select a valid audio file.');
      return;
    }
    setFile(f);
    setResult(null);
    setResultBlob(null);
    setError(null);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }

  async function removeMetadata() {
    if (!file) {
      toast.error('Please upload an audio file first.');
      return;
    }
    setProcessing(true);
    setError(null);
    setResult(null);
    setResultBlob(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const cleanedBuffer = stripID3Tags(arrayBuffer);
      
      const blob = new Blob([cleanedBuffer], { type: file.type });
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResult(formatBytes(blob.size));
      toast.success('Metadata removed! Download ready.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to remove metadata.');
      toast.error('Failed to remove metadata.');
    } finally {
      setProcessing(false);
    }
  }

  function handleDownload() {
    if (!resultBlob || !file) return;
    const ext = file.name.split('.').pop() || 'mp3';
    const name = file.name.replace(/\.[^.]+$/, '') + `_clean.${ext}`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(resultBlob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success('Downloaded!');
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleClear() {
    setFile(null);
    setResult(null);
    setResultBlob(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl glass-card p-6">
        {/* Upload zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); }}
          onDragLeave={() => {}}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            'flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-300',
            file ? 'border-border/60' : 'border-border/60 hover:border-brand-purple/50'
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept="audio/mp3,audio/wav,audio/ogg,audio/m4a,audio/flac"
            className="hidden"
            onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ''; }}
          />
          <span className="h-12 w-12 text-muted-foreground/50">🎵</span>
          <p className="mt-3 text-sm font-medium">
            Drag & drop an audio file or click to browse
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Supports MP3, WAV, OGG, M4A, FLAC</p>
        </div>

        {file && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 text-muted-foreground">🎵</span>
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
                </div>
                <button
                  onClick={handleClear}
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Remove file"
                >
                  <span className="text-muted-foreground">✕</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            onClick={removeMetadata}
            disabled={processing || !file}
            className="rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25 hover:from-red-600 hover:to-rose-700"
          >
            {processing ? (
              <><span className="mr-1.5 h-4 w-4 animate-spin">⟳</span>Removing...</>
            ) : (
              'Remove Metadata'
            )}
          </Button>
          {file && (
            <Button onClick={handleClear} variant="outline" size="sm" className="rounded-xl">
              Clear
            </Button>
          )}
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {result && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Result</Label>
              <div className="flex gap-2">
                {resultBlob && (
                  <Button onClick={() => {
                    if (resultBlob && file) {
                      const ext = file.name.split('.').pop() || 'mp3';
                      const name = file.name.replace(/\.[^.]+$/, '') + `_clean.${ext}`;
                      const a = document.createElement('a');
                      a.href = URL.createObjectURL(resultBlob);
                      a.download = name;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      toast.success('Downloaded!');
                    }
                  }} variant="outline" size="sm" className="rounded-xl">
                    <span className="mr-1.5">↓</span>
                    Download
                  </Button>
                )}
                {!resultBlob && (
                  <Button onClick={() => { if (result) navigator.clipboard.writeText(result); setCopied(true); toast.success('Copied!'); setTimeout(() => setCopied(false), 2000); }} variant="outline" size="sm" className="rounded-xl">
                    {copied ? (
                      <>
                        <span className="mr-1.5 h-4 w-4 text-green-500">✓</span>
                        Copied!
                      </>
                    ) : (
                      <>
                        <span className="mr-1.5">📋</span>
                        Copy
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
            {resultBlob ? (
              <>
                <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm">
                  <div className="flex items-center gap-2 text-green-500">
                    <span className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      ✓
                    </span>
                    <span>Processing complete! File size: {result}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (resultBlob && file) {
                      const ext = file.name.split('.').pop() || 'mp3';
                      const name = file.name.replace(/\.[^.]+$/, '') + `_clean.${ext}`;
                      const a = document.createElement('a');
                      a.href = URL.createObjectURL(resultBlob);
                      a.download = name;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      toast.success('Downloaded!');
                    }
                  }}
                  className="w-full rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white"
                >
                  Download Cleaned Audio
                </button>
              </>
            ) : (
              <div className="overflow-auto rounded-xl border border-border/60 bg-muted/30 p-4 text-sm whitespace-pre-wrap max-h-[400px]">
                {result}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}