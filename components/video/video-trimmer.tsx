'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Loader2, FileVideo, Trash2, Scissors } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { runFFmpeg, revokeObjectUrl } from '@/lib/ffmpeg';

export function VideoTrimmer() {
  const [file, setFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [startTime, setStartTime] = React.useState(0);
  const [endTime, setEndTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
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
      videoRef.current.onloadedmetadata = () => {
        setDuration(videoRef.current!.duration);
        setStartTime(0);
        setEndTime(videoRef.current!.duration);
      };
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }

  async function trimVideo() {
    if (!file) {
      toast.error('Please upload a video file first.');
      return;
    }
    if (duration <= 0) {
      toast.error('Could not determine video duration.');
      return;
    }
    if (startTime >= endTime) {
      toast.error('Start time must be before end time.');
      return;
    }
    setProcessing(true);
    setError(null);
    setResultUrl(null);
    setResultBlob(null);
    setProgress(0);
    setStatus('Loading FFmpeg...');

    try {
      setStatus('Trimming video...');
      setProgress(30);

      const trimDuration = endTime - startTime;
      const output = await runFFmpeg(
        [
          '-ss', String(startTime),
          '-t', String(trimDuration),
          '-i', 'input.mp4',
          '-c:v', 'copy',
          '-c:a', 'copy',
          '-avoid_negative_ts', 'make_zero',
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
      setStatus('Done! Trimmed video ready.');
      toast.success('Video trimmed!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to trim video.');
      setStatus(null);
      toast.error('Failed to trim video.');
    } finally {
      setProcessing(false);
    }
  }

  function handleDownload() {
    if (!resultBlob || !resultUrl) return;
    const name = file?.name.replace(/\.[^.]+$/, '') + '_trimmed.mp4' || 'trimmed.mp4';
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
    setStartTime(0);
    setEndTime(0);
    setDuration(0);
    if (inputRef.current) inputRef.current.value = '';
    if (videoRef.current) {
      revokeObjectUrl(videoRef.current.src);
      videoRef.current.src = '';
    }
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div
          onDragOver={(e) => { e.preventDefault(); }}
          onDragLeave={() => {}}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className="group cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all"
        >
          <input
            ref={inputRef}
            type="file"
            accept="video/mp4,video/webm"
            className="hidden"
            onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ''; }}
          />
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/25 transition-transform group-hover:scale-110">
            <Scissors className="h-8 w-8" />
          </div>
          <p className="mt-4 text-base font-semibold">
            Drop a video file here or click to browse
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Supports MP4, WebM
          </p>
        </div>

        {file && (
          <div className="rounded-2xl glass-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
                Video to trim
              </h3>
              <span className="text-xs text-muted-foreground">
                {file.name} · {Math.round(file.size / 1024)} KB
              </span>
            </div>
            <div className="mt-4 rounded-xl border border-dashed border-border/60 bg-muted/30 p-4">
              <video
                ref={videoRef}
                className="w-full max-h-[300px] rounded-lg"
                controls
                crossOrigin="anonymous"
              />
            </div>
          </div>
        )}

        {file && (
          <div className="rounded-2xl glass-card p-6">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
              Trim Range
            </h3>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label className="flex items-center justify-between text-sm font-medium">
                  <span>Start: {formatTime(startTime)}</span>
                  <span className="text-xs text-muted-foreground">End: {formatTime(endTime)}</span>
                </label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={startTime}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val >= 0 && val < endTime) setStartTime(val);
                    }}
                    min={0}
                    max={endTime}
                    step={0.1}
                    className="w-24"
                  />
                  <span className="text-muted-foreground">to</span>
                  <Input
                    type="number"
                    value={endTime}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val > startTime && val <= duration) setEndTime(val);
                    }}
                    min={startTime}
                    max={duration}
                    step={0.1}
                    className="w-24"
                  />
                  <span className="text-xs text-muted-foreground">Total: {formatTime(duration)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Slider
                  value={[startTime, endTime]}
                  onValueChange={(v) => {
                    setStartTime(v[0]);
                    setEndTime(v[1]);
                  }}
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  disabled={duration <= 0}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0s</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={trimVideo}
            disabled={processing || !file}
            className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-amber-700"
          >
            {processing ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Trim Video'
            )}
          </Button>
          {file && (
            <Button onClick={handleClear} variant="outline" size="sm" className="rounded-xl">
              Clear
            </Button>
          )}
        </div>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Preview
          </h3>
          <div className="mt-4 grid place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 p-6">
            {resultUrl ? (
              <>
                <video
                  src={resultUrl}
                  className="max-h-[280px] w-auto rounded-lg"
                  controls
                />
              </>
            ) : (
              <div className="grid h-[180px] place-items-center text-center text-sm text-muted-foreground">
                <Scissors className="mx-auto h-8 w-8 opacity-40" />
                <p className="mt-2">Upload a video and set trim range</p>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-2">
            {resultBlob ? (
              <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm">
                <div className="flex items-center gap-2 text-green-500">
                  <Check className="h-5 w-5" />
                  <span>Trimmed video ready! {Math.round((resultBlob?.size || 0) / 1024)} KB</span>
                </div>
              </div>
            ) : null}
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={handleDownload}
                disabled={!resultBlob}
                className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white"
              >
                <Download className="mr-1.5 h-4 w-4" />
                Download MP4
              </Button>
              <Button
                onClick={handleCopy}
                disabled={!resultUrl}
                variant="outline"
                className="rounded-xl"
              >
                {copied ? (
                  <>
                    <Check className="mr-1.5 h-4 w-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-1.5 h-4 w-4" />
                    Copy URL
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}