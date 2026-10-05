'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Loader2, FileVideo, Trash2, Crop, Maximize2, Minimize2 } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { runFFmpeg, revokeObjectUrl } from '@/lib/ffmpeg';

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function VideoCropper() {
  const [file, setFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [cropArea, setCropArea] = React.useState<CropArea | null>(null);
  const [videoDimensions, setVideoDimensions] = React.useState({ width: 0, height: 0 });
  const [copied, setCopied] = React.useState(false);
  const [showCropper, setShowCropper] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

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
    setCropArea(null);
    setShowCropper(false);

    const url = URL.createObjectURL(f);
    if (videoRef.current) {
      videoRef.current.src = url;
      videoRef.current.onloadedmetadata = () => {
        setVideoDimensions({
          width: videoRef.current!.videoWidth,
          height: videoRef.current!.videoHeight
        });
        // Default crop area to center 80%
        const w = videoRef.current!.videoWidth;
        const h = videoRef.current!.videoHeight;
        setCropArea({
          x: Math.floor(w * 0.1),
          y: Math.floor(h * 0.1),
          width: Math.floor(w * 0.8),
          height: Math.floor(h * 0.8)
        });
        setShowCropper(true);
      };
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  }

  function updateCropArea(area: CropArea) {
    if (!videoDimensions.width || !videoDimensions.height) return;
    const maxX = videoDimensions.width - area.width;
    const maxY = videoDimensions.height - area.height;
    setCropArea({
      x: Math.max(0, Math.min(area.x, maxX)),
      y: Math.max(0, Math.min(area.y, maxY)),
      width: Math.min(area.width, videoDimensions.width),
      height: Math.min(area.height, videoDimensions.height)
    });
  }

  function setPresetCrop(preset: 'center' | 'square' | '16:9' | '9:16' | '4:3') {
    if (!videoDimensions.width || !videoDimensions.height) return;
    const { width: vw, height: vh } = videoDimensions;

    let width: number, height: number, x: number, y: number;

    switch (preset) {
      case 'center':
        width = Math.floor(vw * 0.8);
        height = Math.floor(vh * 0.8);
        x = Math.floor((vw - width) / 2);
        y = Math.floor((vh - height) / 2);
        break;
      case 'square':
        const size = Math.min(vw, vh);
        width = height = size;
        x = Math.floor((vw - size) / 2);
        y = Math.floor((vh - size) / 2);
        break;
      case '16:9':
        if (vw / vh > 16 / 9) {
          height = vh;
          width = Math.floor(height * 16 / 9);
        } else {
          width = vw;
          height = Math.floor(width * 9 / 16);
        }
        x = Math.floor((vw - width) / 2);
        y = Math.floor((vh - height) / 2);
        break;
      case '9:16':
        if (vw / vh < 9 / 16) {
          width = vw;
          height = Math.floor(width * 16 / 9);
        } else {
          height = vh;
          width = Math.floor(height * 9 / 16);
        }
        x = Math.floor((vw - width) / 2);
        y = Math.floor((vh - height) / 2);
        break;
      case '4:3':
        if (vw / vh > 4 / 3) {
          height = vh;
          width = Math.floor(height * 4 / 3);
        } else {
          width = vw;
          height = Math.floor(width * 3 / 4);
        }
        x = Math.floor((vw - width) / 2);
        y = Math.floor((vh - height) / 2);
        break;
    }

    setCropArea({ x, y, width, height });
  }

  function handleCanvasMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!cropArea) return;
    const cropAreaRef = cropArea;
    const rect = canvasRef.current!.getBoundingClientRect();
    const scaleX = videoDimensions.width / rect.width;
    const scaleY = videoDimensions.height / rect.height;
    const startX = (e.clientX - rect.left) * scaleX;
    const startY = (e.clientY - rect.top) * scaleY;

    const isResizing =
      Math.abs(startX - (cropAreaRef.x + cropAreaRef.width)) < 10 * scaleX &&
      Math.abs(startY - (cropAreaRef.y + cropAreaRef.height)) < 10 * scaleY;
    const isMoving =
      startX >= cropAreaRef.x && startX <= cropAreaRef.x + cropAreaRef.width &&
      startY >= cropAreaRef.y && startY <= cropAreaRef.y + cropAreaRef.height;

    function handleMouseMove(e: MouseEvent) {
      if (isResizing) {
        const newWidth = Math.max(10, (e.clientX - rect.left) * scaleX - cropAreaRef.x);
        const newHeight = Math.max(10, (e.clientY - rect.top) * scaleY - cropAreaRef.y);
        updateCropArea({ ...cropAreaRef, width: newWidth, height: newHeight });
      } else if (isMoving) {
        const dx = (e.clientX - rect.left) * scaleX - startX;
        const dy = (e.clientY - rect.top) * scaleY - startY;
        updateCropArea({ ...cropAreaRef, x: cropAreaRef.x + dx, y: cropAreaRef.y + dy });
      }
    }

    function handleMouseUp() {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }

  async function cropVideo() {
    if (!file || !cropArea) {
      toast.error('Please upload a video and select a crop area.');
      return;
    }
    if (cropArea.width < 10 || cropArea.height < 10) {
      toast.error('Crop area too small. Minimum 10x10 pixels.');
      return;
    }
    setProcessing(true);
    setError(null);
    setResultUrl(null);
    setResultBlob(null);
    setProgress(0);
    setStatus('Loading FFmpeg...');

    try {
      setStatus('Cropping video...');
      setProgress(30);

      // Ensure even dimensions for better compatibility
      const w = cropArea.width % 2 === 0 ? cropArea.width : cropArea.width - 1;
      const h = cropArea.height % 2 === 0 ? cropArea.height : cropArea.height - 1;
      const x = cropArea.x % 2 === 0 ? cropArea.x : cropArea.x - 1;
      const y = cropArea.y % 2 === 0 ? cropArea.y : cropArea.y - 1;

      const output = await runFFmpeg(
        [
          '-i', 'input.mp4',
          '-vf', `crop=${w}:${h}:${x}:${y}`,
          '-c:v', 'libx264',
          '-preset', 'fast',
          '-crf', '23',
          '-c:a', 'copy',
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
      setStatus(`Done! Cropped to ${w}x${h}.`);
      toast.success('Video cropped!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to crop video.');
      setStatus(null);
      toast.error('Failed to crop video.');
    } finally {
      setProcessing(false);
    }
  }

  function handleDownload() {
    if (!resultBlob || !resultUrl) return;
    const name = file?.name.replace(/\.[^.]+$/, '') + '_cropped.mp4' || 'cropped.mp4';
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
    setCropArea(null);
    setShowCropper(false);
    setVideoDimensions({ width: 0, height: 0 });
    if (inputRef.current) inputRef.current.value = '';
    if (videoRef.current) {
      revokeObjectUrl(videoRef.current.src);
      videoRef.current.src = '';
    }
  }

  const drawCropOverlay = React.useCallback(() => {
    if (!canvasRef.current || !videoRef.current || !cropArea || !showCropper) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d')!;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Draw video frame
    ctx.drawImage(video, 0, 0, rect.width, rect.height);

    // Draw dark overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Clear crop area
    const scaleX = rect.width / videoDimensions.width;
    const scaleY = rect.height / videoDimensions.height;
    ctx.clearRect(
      cropArea.x * scaleX,
      cropArea.y * scaleY,
      cropArea.width * scaleX,
      cropArea.height * scaleY
    );

    // Draw crop rectangle border
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(
      cropArea.x * scaleX,
      cropArea.y * scaleY,
      cropArea.width * scaleX,
      cropArea.height * scaleY
    );
    ctx.setLineDash([]);

    // Draw resize handle
    ctx.fillStyle = '#fff';
    ctx.fillRect(
      (cropArea.x + cropArea.width - 8) * scaleX,
      (cropArea.y + cropArea.height - 8) * scaleY,
      16 * scaleX,
      16 * scaleY
    );
  }, [cropArea, showCropper, videoDimensions]);

  React.useEffect(() => {
    if (showCropper && videoRef.current && canvasRef.current) {
      const drawLoop = () => {
        if (showCropper) {
          drawCropOverlay();
          requestAnimationFrame(drawLoop);
        }
      };
      drawLoop();
    }
  }, [showCropper, cropArea, videoDimensions, drawCropOverlay]);

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
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25 transition-transform group-hover:scale-110">
            <Crop className="h-8 w-8" />
          </div>
          <p className="mt-4 text-base font-semibold">
            Drop a video file here or click to browse
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Supports MP4, WebM, MOV
          </p>
        </div>

        {file && showCropper && (
          <div className="rounded-2xl glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
                Select Crop Area
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{cropArea ? `${cropArea.width}x${cropArea.height}` : '—'}</span>
                <span>@</span>
                <span>{cropArea ? `${cropArea.x},${cropArea.y}` : '—'}</span>
              </div>
            </div>
            <div className="relative rounded-xl border border-dashed border-border/60 bg-muted/30 p-2">
              <video
                ref={videoRef}
                className="w-full max-h-[400px] rounded-lg"
                crossOrigin="anonymous"
                muted
                playsInline
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 cursor-crosshair"
                onMouseDown={handleCanvasMouseDown}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => setPresetCrop('center')} className="rounded-xl">Center 80%</Button>
              <Button variant="outline" size="sm" onClick={() => setPresetCrop('square')} className="rounded-xl">Square</Button>
              <Button variant="outline" size="sm" onClick={() => setPresetCrop('16:9')} className="rounded-xl">16:9</Button>
              <Button variant="outline" size="sm" onClick={() => setPresetCrop('9:16')} className="rounded-xl">9:16</Button>
              <Button variant="outline" size="sm" onClick={() => setPresetCrop('4:3')} className="rounded-xl">4:3</Button>
            </div>
            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
              <Label className="flex items-center gap-1">
                <Input type="number" value={cropArea?.x ?? 0} onChange={(e) => updateCropArea({ ...cropArea!, x: Number(e.target.value) })} className="w-16" placeholder="X" />
                <span>X</span>
              </Label>
              <Label className="flex items-center gap-1">
                <Input type="number" value={cropArea?.y ?? 0} onChange={(e) => updateCropArea({ ...cropArea!, y: Number(e.target.value) })} className="w-16" placeholder="Y" />
                <span>Y</span>
              </Label>
              <Label className="flex items-center gap-1">
                <Input type="number" value={cropArea?.width ?? 0} onChange={(e) => updateCropArea({ ...cropArea!, width: Number(e.target.value) })} className="w-16" placeholder="W" />
                <span>W</span>
              </Label>
              <Label className="flex items-center gap-1">
                <Input type="number" value={cropArea?.height ?? 0} onChange={(e) => updateCropArea({ ...cropArea!, height: Number(e.target.value) })} className="w-16" placeholder="H" />
                <span>H</span>
              </Label>
            </div>
          </div>
        )}

        {file && !showCropper && (
          <div className="rounded-2xl glass-card p-5 text-center text-muted-foreground py-12">
            <FileVideo className="mx-auto h-12 w-12 opacity-40" />
            <p className="mt-2">Could not load video for cropping</p>
          </div>
        )}

        {error && (
          <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={cropVideo}
            disabled={processing || !file || !cropArea}
            className="rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25 hover:from-red-600 hover:to-rose-700"
          >
            {processing ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Cropping...
              </>
            ) : (
              <>
                <Crop className="mr-1.5 h-4 w-4" />
                Crop Video
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
                <video
                  src={resultUrl}
                  className="max-h-[280px] w-auto rounded-lg"
                  controls
                />
              </>
            ) : (
              <div className="grid h-[180px] place-items-center text-center text-sm text-muted-foreground">
                <Crop className="mx-auto h-8 w-8 opacity-40" />
                <p className="mt-2">Upload a video and select crop area</p>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-2">
            {resultBlob ? (
              <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm">
                <div className="flex items-center gap-2 text-green-500">
                  <Check className="h-5 w-5" />
                  <span>Cropped! {Math.round((resultBlob?.size || 0) / 1024)} KB</span>
                </div>
              </div>
            ) : null}
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={handleDownload}
                disabled={!resultBlob}
                className="rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white"
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