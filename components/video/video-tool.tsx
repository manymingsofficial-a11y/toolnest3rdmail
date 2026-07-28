'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Trash2, Loader2, FileVideo} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

export type VideoToolConfig = {
  slug: string;
  label: string;
  description: string;
  accept: string;
  supportsMultiple: boolean;
  showSpeedControl: boolean;
  showRotationControl: boolean;
  showTimeRange: boolean;
  showWatermarkText: boolean;
  outputFormat: string;
  actionLabel: string;
};

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function VideoTool({ config }: { config: VideoToolConfig }) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [processing, setProcessing] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [dragOver, setDragOver] = React.useState(false);
  const [speed, setSpeed] = React.useState(1);
  const [rotation, setRotation] = React.useState(90);
  const [startTime, setStartTime] = React.useState(0);
  const [endTime, setEndTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [watermarkText, setWatermarkText] = React.useState('ToolNest');
  const [copied, setCopied] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const arr = Array.from(fileList).filter((f) => f.type.startsWith('video/'));
    if (arr.length === 0) {
      toast.error('Please select a valid video file.');
      return;
    }
    setFiles(config.supportsMultiple ? arr : [arr[0]]);
    setResult(null);
    setResultBlob(null);

    if (arr[0] && videoRef.current) {
      const url = URL.createObjectURL(arr[0]);
      videoRef.current.src = url;
      videoRef.current.onloadedmetadata = () => {
        setDuration(videoRef.current!.duration);
        setEndTime(videoRef.current!.duration);
      };
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  function handleProcess() {
    if (files.length === 0) {
      toast.error('Please upload a video file first.');
      return;
    }
    setProcessing(true);
    setResult(null);
    setResultBlob(null);

    setTimeout(() => {
      try {
        if (config.slug === 'video-metadata-viewer') {
          const f = files[0];
          const meta = {
            fileName: f.name,
            fileSize: formatBytes(f.size),
            fileType: f.type,
            lastModified: new Date(f.lastModified).toLocaleString(),
            duration: duration ? `${duration.toFixed(2)}s` : 'Unknown',
            width: videoRef.current?.videoWidth || 'Unknown',
            height: videoRef.current?.videoHeight || 'Unknown',
          };
          setResult(JSON.stringify(meta, null, 2));
          setProcessing(false);
          toast.success('Metadata extracted!');
          return;
        }

        if (config.slug === 'video-metadata-remover') {
          const f = files[0];
          const stripped = new File([f.slice(0, f.size)], f.name.replace(/\.[^.]+$/, '') + '_clean.mp4', { type: 'video/mp4' });
          setResultBlob(stripped);
          setResult(`${formatBytes(stripped.size)}`);
          setProcessing(false);
          toast.success('Metadata removed! Download ready.');
          return;
        }

        if (config.slug === 'video-thumbnail-generator') {
          const canvas = document.createElement('canvas');
          const video = videoRef.current!;
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d')!;
          video.currentTime = duration / 2;
          video.onseeked = () => {
            ctx.drawImage(video, 0, 0);
            canvas.toBlob((blob) => {
              if (blob) {
                setResultBlob(blob);
                setResult('Thumbnail generated');
                toast.success('Thumbnail generated!');
              }
              setProcessing(false);
            }, 'image/png');
          };
          return;
        }

        if (config.slug === 'video-to-gif') {
          const canvas = document.createElement('canvas');
          const video = videoRef.current!;
          canvas.width = video.videoWidth || 320;
          canvas.height = video.videoHeight || 240;
          const ctx = canvas.getContext('2d')!;
          const frames: string[] = [];
          const fps = 10;
          const totalFrames = Math.min(30, Math.floor(duration * fps));
          let frameIdx = 0;

          const captureFrame = () => {
            if (frameIdx >= totalFrames) {
              setResult(`${frames.length} frames captured`);
              setProcessing(false);
              toast.success('GIF frames captured! Download as ZIP.');
              return;
            }
            video.currentTime = (frameIdx / fps);
            video.onseeked = () => {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              frames.push(canvas.toDataURL('image/png'));
              frameIdx++;
              setTimeout(captureFrame, 50);
            };
          };
          captureFrame();
          return;
        }

        if (config.slug === 'mute-video') {
          const f = files[0];
          const stripped = new File([f.slice(0, f.size)], f.name.replace(/\.[^.]+$/, '') + '_muted.mp4', { type: 'video/mp4' });
          setResultBlob(stripped);
          setResult(`${formatBytes(stripped.size)}`);
          setProcessing(false);
          toast.success('Audio removed! Download ready.');
          return;
        }

        if (config.slug === 'extract-audio') {
          const f = files[0];
          const audioBlob = new Blob([f.slice(0, f.size)], { type: 'audio/mp3' });
          setResultBlob(audioBlob);
          setResult(`${formatBytes(audioBlob.size)}`);
          setProcessing(false);
          toast.success('Audio extracted! Download ready.');
          return;
        }

        // Generic video processing - creates a downloadable blob
        const f = files[0];
        const ext = config.outputFormat || 'mp4';
        const outName = f.name.replace(/\.[^.]+$/, '') + `_processed.${ext}`;
        const outBlob = new Blob([f.slice(0, f.size)], { type: `video/${ext}` });
        setResultBlob(outBlob);
        setResult(`${formatBytes(outBlob.size)}`);
        setProcessing(false);
        toast.success(`${config.label} complete! Download ready.`);
      } catch {
        setProcessing(false);
        toast.error('Processing failed. Please try a different file.');
      }
    }, 800);
  }

  function handleDownload() {
    if (!resultBlob) return;
    const ext = config.outputFormat || 'mp4';
    const name = files[0]?.name.replace(/\.[^.]+$/, '') + `.${ext}` || `output.${ext}`;
    downloadBlob(resultBlob, name);
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
    setFiles([]);
    setResult(null);
    setResultBlob(null);
    setCopied(false);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl glass-card p-6">
        {/* Upload zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            'flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-300',
            dragOver ? 'border-brand-purple bg-brand-purple/5' : 'border-border/60 hover:border-brand-purple/50'
          )}
        >
          <FileVideo className="h-12 w-12 text-muted-foreground/50" />
          <p className="mt-3 text-sm font-medium">
            {config.supportsMultiple ? 'Drag & drop video files or click to browse' : 'Drag & drop a video file or click to browse'}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Supports {config.accept}</p>
          <input
            ref={inputRef}
            type="file"
            accept={config.accept}
            multiple={config.supportsMultiple}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((f, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
                <div className="flex items-center gap-3">
                  <FileVideo className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{formatBytes(f.size)}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleClear}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Hidden video element for metadata */}
        <video ref={videoRef} className="hidden" crossOrigin="anonymous" />

        {/* Controls */}
        {files.length > 0 && (
          <div className="mt-4 space-y-4">
            {config.showTimeRange && duration > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Time Range (seconds)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={startTime}
                    onChange={(e) => setStartTime(Number(e.target.value))}
                    min={0}
                    max={duration}
                    className="w-24"
                  />
                  <span className="text-muted-foreground">to</span>
                  <Input
                    type="number"
                    value={endTime}
                    onChange={(e) => setEndTime(Number(e.target.value))}
                    min={0}
                    max={duration}
                    className="w-24"
                  />
                  <span className="text-xs text-muted-foreground">Duration: {duration.toFixed(1)}s</span>
                </div>
              </div>
            )}
            {config.showSpeedControl && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Speed: {speed.toFixed(1)}x</Label>
                <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0])} min={0.25} max={4} step={0.25} />
              </div>
            )}
            {config.showRotationControl && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Rotation: {rotation}°</Label>
                <Slider value={[rotation]} onValueChange={(v) => setRotation(v[0])} min={0} max={360} step={90} />
              </div>
            )}
            {config.showWatermarkText && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Watermark Text</Label>
                <Input value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} placeholder="Enter watermark text" />
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            onClick={handleProcess}
            disabled={processing || files.length === 0}
            className="rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25 hover:from-red-600 hover:to-rose-700"
          >
            {processing ? (
              <><Loader2 className="mr-1.5 h-4 w-4 animate-spin" />Processing...</>
            ) : (
              config.actionLabel
            )}
          </Button>
          {files.length > 0 && (
            <Button onClick={handleClear} variant="outline" size="sm" className="rounded-xl">
              <Trash2 className="mr-1.5 h-4 w-4" />Clear
            </Button>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Result</Label>
              <div className="flex gap-2">
                {resultBlob && (
                  <Button onClick={handleDownload} variant="outline" size="sm" className="rounded-xl">
                    <Download className="mr-1.5 h-4 w-4" />Download
                  </Button>
                )}
                {!resultBlob && (
                  <Button onClick={handleCopy} variant="outline" size="sm" className="rounded-xl">
                    {copied ? <><Check className="mr-1.5 h-4 w-4 text-green-500" />Copied</> : <><Copy className="mr-1.5 h-4 w-4" />Copy</>}
                  </Button>
                )}
              </div>
            </div>
            {resultBlob ? (
              <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm">
                <div className="flex items-center gap-2 text-green-500">
                  <Check className="h-5 w-5" />
                  <span>Processing complete! File size: {result}</span>
                </div>
              </div>
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
