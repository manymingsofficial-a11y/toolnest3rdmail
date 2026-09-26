'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Loader2, FileAudio, Info } from 'lucide-react';
import { toast } from 'sonner';
import { parseBlob } from 'music-metadata';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function AudioMetadataViewer() {
  const [file, setFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
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
    setError(null);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }

  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
  }

  function formatDuration(seconds: number): string {
    if (!seconds || isNaN(seconds)) return 'Unknown';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  async function extractMetadata() {
    if (!file) {
      toast.error('Please upload an audio file first.');
      return;
    }
    setProcessing(true);
    setError(null);
    setResult(null);

    try {
      const metadata = await parseBlob(file);
      const common = metadata.common || {};
      const format = metadata.format || {};
      
      const meta = {
        title: common.title || 'Not available',
        artist: common.artist || 'Not available',
        album: common.album || 'Not available',
        year: common.year ? String(common.year) : 'Not available',
        genre: Array.isArray(common.genre) ? common.genre.join(', ') : (common.genre || 'Not available'),
        duration: formatDuration(format.duration ?? 0),
        bitrate: format.bitrate ? `${Math.round(format.bitrate / 1000)} kbps` : 'Not available',
        codec: format.codec || format.container || 'Not available',
        sampleRate: format.sampleRate ? `${format.sampleRate} Hz` : 'Not available',
        channels: format.numberOfChannels ? String(format.numberOfChannels) : 'Not available',
        fileName: file.name,
        fileSize: formatBytes(file.size),
        fileType: file.type,
        lastModified: new Date(file.lastModified).toLocaleString(),
      };

      const resultText = JSON.stringify(meta, null, 2);
      setResult(resultText);
      toast.success('Metadata extracted!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to extract metadata.');
      toast.error('Failed to extract metadata.');
    } finally {
      setProcessing(false);
    }
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
          <Info className="h-12 w-12 text-muted-foreground/50" />
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
            onClick={extractMetadata}
            disabled={processing || !file}
            className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25 hover:from-green-600 hover:to-emerald-700"
          >
            {processing ? (
              <><span className="mr-1.5 h-4 w-4 animate-spin">⟳</span>Extracting...</>
            ) : (
              'Extract Metadata'
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
              <Label className="text-sm font-medium">Metadata</Label>
              <div className="flex gap-2">
                <Button onClick={handleCopy} variant="outline" size="sm" className="rounded-xl">
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
              </div>
            </div>
            <div className="overflow-auto rounded-xl border border-border/60 bg-muted/30 p-4 text-sm font-mono whitespace-pre-wrap max-h-[400px]">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}