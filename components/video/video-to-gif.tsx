'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Loader2, FileVideo, Trash2, Image as ImageIcon, Play, Pause } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { runFFmpeg, revokeObjectUrl } from '@/lib/ffmpeg';

export function VideoToGif() {
  const [file, setFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [fps, setFps] = React.useState(10);
  const [width, setWidth] = React.useState(480);
  const [startTime, setStartTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [clipDuration, setClipDuration] = React.useState(5);
  const [copied, setCopied] = React.useState(false);
  const [previewPlaying, setPreviewPlaying] = React.useState(false);
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
        setClipDuration(Math.min(5, videoRef.current!.duration));
      };
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }

  function validateInputs(): boolean {
    if (duration <= 0) {
      toast.error('Could not determine video duration.');
      return false;
    }
    if (startTime < 0 || startTime >= duration) {
      toast.error('Invalid start time.');
      return false;
    }
    if (clipDuration <= 0 || startTime + clipDuration > duration) {
      toast.error('Invalid clip duration.');
      return false;
    }
    if (fps < 1 || fps > 30) {
      toast.error('FPS must be between 1 and 30.');
      return false;
    }
    if (width < 100 || width > 1280) {
      toast.error('Width must be between 100 and 1280 pixels.');
      return false;
    }
    return true;
  }

  async function generateGif() {
    if (!file) {
      toast.error('Please upload a video file first.');
      return;
    }
    if (!validateInputs()) return;

    setProcessing(true);
    setError(null);
    setResultUrl(null);
    setResultBlob(null);
    setProgress(0);
    setStatus('Loading FFmpeg...');

    try {
      setStatus('Generating GIF...');
      setProgress(20);

      const output = await runFFmpeg(
        [
          '-ss', String(startTime),
          '-t', String(clipDuration),
          '-i', 'input.mp4',
          '-vf', `fps=${fps},scale=${width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
          '-loop', '0',
          'output.gif'
        ],
        [{ name: 'input.mp4', data: file }],
        'output.gif'
      );

      setProgress(80);
      setStatus('Finalizing...');

      const blob = new Blob([output], { type: 'image/gif' });
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
      setProgress(100);
      setStatus(`Done! GIF created at ${fps}fps, ${width}px wide.`);
      toast.success('GIF generated!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to generate GIF.');
      setStatus(null);
      toast.error('Failed to generate GIF. Large files may exceed browser memory limits.');
    } finally {
      setProcessing(false);
    }
  }

  function handleDownload() {
    if (!resultBlob || !resultUrl) return;
    const name = file?.name.replace(/\.[^.]+$/, '') + '.gif' || 'animation.gif';
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
    setFps(10);
    setWidth(480);
    setStartTime(0);
    setDuration(0);
    setClipDuration(5);
    setPreviewPlaying(false);
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
            accept="video/mp4,video/webm,video/quicktime"
            className="hidden"
            onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ''; }}
          />
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/25 transition-transform group-hover:scale-110">
            <ImageIcon className="h-8 w-8" />
          </div>
          <p className="mt-4 text-base font-semibold">
            Drop a video file here or click to browse
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Supports MP4, WebM, MOV
          </p>
        </div>

        {file && (
          <div className="rounded-2xl glass-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
                Video to convert
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
              GIF Settings
            </h3>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label className="flex items-center justify-between text-sm font-medium">
                  <span>Start Time: {formatTime(startTime)}</span>
                  <span className="text-xs text-muted-foreground">Duration: {formatTime(duration)}</span>
                </label>
                <Slider
                  value={[startTime]}
                  onValueChange={(v) => {
                    const val = Math.min(v[0], Math.max(0, duration - 0.5));
                    setStartTime(val);
                    if (startTime + clipDuration > duration) {
                      setClipDuration(Math.max(0.5, duration - val));
                    }
                  }}
                  min={0}
                  max={Math.max(0, duration - 0.5)}
                  step={0.1}
                  disabled={duration <= 0}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0s</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center justify-between text-sm font-medium">
                  <span>Clip Length: {clipDuration.toFixed(1)}s</span>
                  <span className="text-xs text-muted-foreground">Max: {formatTime(Math.max(0, duration - startTime))}</span>
                </label>
                <Slider
                  value={[clipDuration]}
                  onValueChange={(v) => {
                    const maxDur = Math.max(0.5, duration - startTime);
                    setClipDuration(Math.max(0.5, Math.min(v[0], maxDur)));
                  }}
                  min={0.5}
                  max={Math.max(0.5, duration - startTime)}
                  step={0.5}
                  disabled={duration <= 0}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0.5s</span>
                  <span>{formatTime(duration - startTime)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center justify-between text-sm font-medium">
                  <span>FPS: {fps}</span>
                  <span className="text-xs text-muted-foreground">Higher = smoother, larger file</span>
                </label>
                <Slider
                  value={[fps]}
                  onValueChange={(v) => setFps(v[0])}
                  min={1}
                  max={30}
                  step={1}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1</span>
                  <span>30</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center justify-between text-sm font-medium">
                  <span>Width: {width}px</span>
                  <span className="text-xs text-muted-foreground">Height auto-calculated</span>
                </label>
                <Slider
                  value={[width]}
                  onValueChange={(v) => setWidth(Math.round(v[0] / 10) * 10)}
                  min={100}
                  max={1280}
                  step={10}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>100</span>
                  <span>1280</span>
                </div>
              </div>

              <div className="rounded-lg border border-border/60 bg-muted/30 p-3 text-xs text-muted-foreground">
                <p className="font-medium mb-1">Estimated GIF size:</p>
                <p>
                  ~{(clipDuration * fps * width * 0.08).toFixed(1)} KB (rough estimate)
                </p>
                <p className="mt-1">
                  Large GIFs (over 10MB) may cause browser memory issues.
                </p>
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
            onClick={generateGif}
            disabled={processing || !file}
            className="rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/25 hover:from-rose-600 hover:to-pink-700"
          >
            {processing ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <ImageIcon className="mr-1.5 h-4 w-4" />
                Generate GIF
              </>
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
                <img
                  src={resultUrl}
                  alt="Generated GIF"
                  className="max-h-[280px] w-auto rounded-lg"
                />
              </>
            ) : (
              <div className="grid h-[180px] place-items-center text-center text-sm text-muted-foreground">
                <ImageIcon className="mx-auto h-8 w-8 opacity-40" />
                <p className="mt-2">Upload a video and configure settings</p>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-2">
            {resultBlob ? (
              <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm">
                <div className="flex items-center gap-2 text-green-500">
                  <Check className="h-5 w-5" />
                  <span>GIF ready! {Math.round((resultBlob?.size || 0) / 1024)} KB</span>
                </div>
              </div>
            ) : null}
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={handleDownload}
                disabled={!resultBlob}
                className="rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white"
              >
                <Download className="mr-1.5 h-4 w-4" />
                Download GIF
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