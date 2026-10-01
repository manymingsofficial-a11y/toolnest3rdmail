'use client';

import * as React from 'react';
import { Upload, Download, Check, Loader2, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { revokeObjectUrl } from '@/lib/ffmpeg';

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function PngToSvg() {
  const [file, setFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [copied, setCopied] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const f = fileList[0];
    if (f.type !== 'image/png') {
      toast.error('Please select a valid PNG file.');
      return;
    }
    setFile(f);
    setResultUrl(null);
    setResultBlob(null);
    setError(null);

    const url = URL.createObjectURL(f);
    if (imgRef.current) {
      imgRef.current.src = url;
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }

  async function convertToSvg() {
    if (!file) {
      toast.error('Please upload a PNG file first.');
      return;
    }

    setProcessing(true);
    setError(null);
    setResultUrl(null);
    setResultBlob(null);

    try {
      setStatus('Converting PNG to SVG container...');
      setProgress(30);

      // Load image to get dimensions
      const img = await loadImage(file);
      const width = img.width;
      const height = img.height;

      // Convert file to data URL
      const dataUrl = await fileToDataUrl(file);

      // Create SVG with embedded PNG
      const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <image width="${width}" height="${height}" xlink:href="${dataUrl}" />
</svg>`;

      setProgress(80);
      setStatus('Finalizing...');

      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);

      setResultBlob(blob);
      setResultUrl(url);
      setProgress(100);
      setStatus('Done! PNG converted to SVG container.');
      toast.success('PNG converted to SVG!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to convert PNG to SVG.');
      setStatus(null);
      toast.error('Failed to convert PNG to SVG.');
    } finally {
      setProcessing(false);
    }
  }

  function loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load image.'));
      };
      img.src = url;
    });
  }

  function handleDownload() {
    if (!resultBlob || !resultUrl) return;
    const name = file?.name.replace(/\.png$/i, '') + '.svg' || 'converted.svg';
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    revokeObjectUrl(resultUrl);
    toast.success('Downloaded!');
  }

  function handleCopy() {
    if (!resultUrl) return;
    navigator.clipboard.writeText(resultUrl).then(() => {
      setCopied(true);
      toast.success('URL copied!');
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleClear() {
    setFile(null);
    setResultUrl(null);
    setResultBlob(null);
    setError(null);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = '';
    if (imgRef.current) {
      revokeObjectUrl(imgRef.current.src);
      imgRef.current.src = '';
    }
  }

  const [status, setStatus] = React.useState<string | null>(null);
  const [progress, setProgress] = React.useState(0);

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
            accept="image/png"
            className="hidden"
            onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ''; }}
          />
          <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
          <p className="mt-3 text-sm font-medium">
            Drag & drop a PNG file or click to browse
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Supports PNG only</p>
        </div>

        {file && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
              <div className="flex items-center gap-3">
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleClear}>
                  <AlertCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Info notice */}
        {file && (
          <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
            <p className="font-medium text-amber-600 dark:text-amber-400">
              Note: This converts the PNG to an SVG container while preserving the original image.
            </p>
            <p className="mt-1 text-muted-foreground">
              The output SVG embeds the original PNG as a data URI. This is not vectorization —
              pixels are not traced into paths. The visual appearance is identical to the source PNG.
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            onClick={convertToSvg}
            disabled={processing || !file}
            className="rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25 hover:from-violet-600 hover:to-purple-700"
          >
            {processing ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <ImageIcon className="mr-1.5 h-4 w-4" />
                Convert PNG to SVG
              </>
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

        {(resultBlob || resultUrl) && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Result</span>
              <div className="flex gap-2">
                {resultBlob && (
                  <Button onClick={handleDownload} variant="outline" size="sm" className="rounded-xl">
                    <Download className="mr-1.5 h-4 w-4" />
                    Download
                  </Button>
                )}
                {!resultBlob && (
                  <Button onClick={handleCopy} variant="outline" size="sm" className="rounded-xl">
                    {copied ? (
                      <>
                        <Check className="mr-1.5 h-4 w-4 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <AlertCircle className="mr-1.5 h-4 w-4" />
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
                      <Check className="h-3 w-3" />
                    </span>
                    <span>Processing complete! File size: {formatBytes(resultBlob.size)}</span>
                  </div>
                </div>
                <Button onClick={handleDownload} className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white">
                  Download SVG
                </Button>
              </>
            ) : (
              <div className="overflow-auto rounded-xl border border-border/60 bg-muted/30 p-4 text-sm whitespace-pre-wrap max-h-[400px]">
                {resultUrl || 'Processing...'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}