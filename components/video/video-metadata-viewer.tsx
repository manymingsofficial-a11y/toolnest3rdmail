'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Loader2, FileVideo } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { runFFmpeg } from '@/lib/ffmpeg';

export function VideoMetadataViewer() {
  const [file, setFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const f = fileList[0];
    if (!f.type.startsWith('video/')) {
      toast.error('Please select a valid video file.');
      return;
    }
    setFile(f);
    setResult(null);
    setError(null);

    const url = URL.createObjectURL(f);
    if (videoRef.current) {
      videoRef.current.src = url;
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }

  async function extractMetadata() {
    if (!file) {
      toast.error('Please upload a video file first.');
      return;
    }
    setProcessing(true);
    setError(null);
    setResult(null);

    try {
      const output = await runFFmpeg(
        [
          '-i', 'input.mp4',
          '-f', 'ffmetadata',
          'metadata.txt'
        ],
        [{ name: 'input.mp4', data: file }],
        'metadata.txt'
      );

      const text = new TextDecoder().decode(output);
      const lines = text.split('\n').filter(l => l.trim() && !l.startsWith(';'));
      const metadata: Record<string, string> = {};
      
      for (const line of lines) {
        const [key, ...rest] = line.split('=');
        if (key && rest.length) {
          metadata[key.toLowerCase()] = rest.join('=');
        }
      }

      const f = file;
      const meta = {
        fileName: f.name,
        fileSize: formatBytes(f.size),
        fileType: f.type,
        lastModified: new Date(f.lastModified).toLocaleString(),
        ...metadata,
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

  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
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
            accept="video/mp4,video/webm,video/quicktime"
            className="hidden"
            onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ''; }}
          />
          <FileVideo className="h-12 w-12 text-muted-foreground/50" />
          <p className="mt-3 text-sm font-medium">
            Drag & drop a video file or click to browse
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Supports MP4, WebM, MOV</p>
        </div>

        {file && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
              <div className="flex items-center gap-3">
                <FileVideo className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleClear}>
                  <span className="sr-only">Clear</span>
                  <span className="text-muted-foreground">✕</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            onClick={extractMetadata}
            disabled={processing || !file}
            className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-indigo-700"
          >
            {processing ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Extracting...
              </span>
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
                      <Check className="mr-1.5 h-4 w-4 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-1.5 h-4 w-4" />
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