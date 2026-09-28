'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Loader2, FileVideo, Trash2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { runFFmpeg, revokeObjectUrl } from '@/lib/ffmpeg';

export function MuteVideo() {
  const [file, setFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
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
    setResultUrl(null);
    setResultBlob(null);
    setError(null);
    setStatus(null);
    setProgress(0);

    const url = URL.createObjectURL(f);
    if (videoRef.current) {
      videoRef.current.src = url;
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }

  async function muteVideo() {
    if (!file) {
      toast.error('Please upload a video file first.');
      return;
    }
    setProcessing(true);
    setError(null);
    setResultUrl(null);
    setResultBlob(null);
    setProgress(0);
    setStatus('Loading FFmpeg...');

    try {
      setStatus('Removing audio track...');
      setProgress(30);

      const output = await runFFmpeg(
        [
          '-i', 'input.mp4',
          '-an',
          '-c:v', 'copy',
          'output.mp4'
        ],
        [{ name: 'input.mp4', data: file }],
        'output.mp4'
      );

      setProgress(80);
      setStatus('Finalizing...');

      const blob = new Blob([output], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
      setProgress(100);
      setStatus('Done! Video muted.');
      toast.success('Audio removed!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to mute video.');
      setStatus(null);
      toast.error('Failed to mute video.');
    } finally {
      setProcessing(false);
    }
  }

  function handleDownload() {
    if (!resultBlob || !resultUrl) return;
    const name = file?.name.replace(/\.[^.]+$/, '') + '_muted.mp4' || 'muted.mp4';
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
                  <p className="text-xs text-muted-foreground">{Math.round(file.size / 1024)} KB</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleClear}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            onClick={muteVideo}
            disabled={processing || !file}
            className="rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25 hover:from-red-600 hover:to-rose-700"
          >
            {processing ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Muting...
              </>
            ) : (
              <>
                <VolumeX className="mr-1.5 h-4 w-4" />
                Mute Video
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

        {resultBlob && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Result</span>
              <div className="flex gap-2">
                <Button onClick={handleDownload} variant="outline" size="sm" className="rounded-xl">
                  <Download className="mr-1.5 h-4 w-4" />
                  Download
                </Button>
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
            <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm">
              <div className="flex items-center gap-2 text-green-500">
                <span className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="h-3 w-3" />
                </span>
                <span>Processing complete! File size: {Math.round((resultBlob?.size || 0) / 1024)} KB</span>
              </div>
            </div>
            <Button onClick={handleDownload} className="w-full rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white">
              Download Muted Video
            </Button>
          </div>
        )}

        {resultUrl && !resultBlob && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Result</span>
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
            <div className="overflow-auto rounded-xl border border-border/60 bg-muted/30 p-4 text-sm whitespace-pre-wrap max-h-[400px]">
              {resultUrl}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}