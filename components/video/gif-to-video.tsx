'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Loader2, FileVideo, Trash2, Film, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { runFFmpeg, revokeObjectUrl } from '@/lib/ffmpeg';

export function GifToVideo() {
  const [file, setFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [outputFormat, setOutputFormat] = React.useState<'mp4' | 'webm'>('mp4');
  const [frameRate, setFrameRate] = React.useState(30);
  const [copied, setCopied] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const f = fileList[0];
    if (f.type !== 'image/gif') {
      toast.error('Please select a valid GIF file.');
      return;
    }
    setFile(f);
    setResultUrl(null);
    setResultBlob(null);
    setError(null);
    setStatus(null);
    setProgress(0);

    const url = URL.createObjectURL(f);
    if (imgRef.current) {
      imgRef.current.src = url;
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }

  async function convertGif() {
    if (!file) {
      toast.error('Please upload a GIF file first.');
      return;
    }
    setProcessing(true);
    setError(null);
    setResultUrl(null);
    setResultBlob(null);
    setProgress(0);
    setStatus('Loading FFmpeg...');

    try {
      setStatus('Converting GIF to video...');
      setProgress(30);

      const outputExt = outputFormat;
      const codec = outputFormat === 'webm' ? 'libvpx-vp9' : 'libx264';
      const crf = outputFormat === 'webm' ? '30' : '23';

      const output = await runFFmpeg(
        [
          '-i', 'input.gif',
          '-vf', `fps=${frameRate},scale=trunc(iw/2)*2:trunc(ih/2)*2`,
          '-c:v', codec,
          '-crf', crf,
          '-pix_fmt', 'yuv420p',
          'output.' + outputExt
        ],
        [{ name: 'input.gif', data: file }],
        'output.' + outputExt
      );

      setProgress(80);
      setStatus('Finalizing...');

      const mimeType = outputFormat === 'webm' ? 'video/webm' : 'video/mp4';
      const blob = new Blob([output], { type: mimeType });
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
      setProgress(100);
      setStatus(`Done! Converted to ${outputFormat.toUpperCase()}.`);
      toast.success('GIF converted to video!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to convert GIF.');
      setStatus(null);
      toast.error('Failed to convert GIF.');
    } finally {
      setProcessing(false);
    }
  }

  function handleDownload() {
    if (!resultBlob || !resultUrl) return;
    const name = file?.name.replace(/\.gif$/i, '') + `.${outputFormat}` || `output.${outputFormat}`;
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
    setStatus(null);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = '';
    if (videoRef.current) {
      revokeObjectUrl(videoRef.current.src);
      videoRef.current.src = '';
    }
    if (imgRef.current) {
      revokeObjectUrl(imgRef.current.src);
      imgRef.current.src = '';
    }
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
            accept="image/gif"
            className="hidden"
            onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ''; }}
          />
          <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
          <p className="mt-3 text-sm font-medium">
            Drag & drop a GIF file or click to browse
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Supports animated GIF</p>
        </div>

        {file && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
              <div className="flex items-center gap-3">
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{Math.round(file.size / 1024)} KB</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleClear}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Settings */}
        {file && (
          <div className="mt-4 rounded-2xl glass-card p-6">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
              Conversion Settings
            </h3>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Output Format</Label>
                <Select value={outputFormat} onValueChange={(v) => setOutputFormat(v as 'mp4' | 'webm')}>
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mp4">MP4 (H.264) - Best compatibility</SelectItem>
                    <SelectItem value="webm">WebM (VP9) - Smaller file size</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center justify-between text-sm font-medium">
                  <span>Frame Rate</span>
                  <span className="text-xs text-muted-foreground">{frameRate} FPS</span>
                </Label>
                <Slider
                  value={[frameRate]}
                  onValueChange={(v) => setFrameRate(v[0])}
                  min={10}
                  max={60}
                  step={5}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>10 FPS</span>
                  <span>60 FPS</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Note: GIFs don&apos;t have a native frame rate. FFmpeg will extract frames at the specified FPS.
                Higher FPS = smoother playback but larger file.
              </p>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            onClick={convertGif}
            disabled={processing || !file}
            className="rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25 hover:from-red-600 hover:to-rose-700"
          >
            {processing ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <Film className="mr-1.5 h-4 w-4" />
                Convert to {outputFormat.toUpperCase()}
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
                        <Copy className="mr-1.5 h-4 w-4" />
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
                    <span>Processing complete! File size: {Math.round((resultBlob?.size || 0) / 1024)} KB</span>
                  </div>
                </div>
                <Button onClick={handleDownload} className="w-full rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white">
                  Download {outputFormat.toUpperCase()} Video
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