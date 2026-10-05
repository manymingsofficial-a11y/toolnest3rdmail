'use client';

import * as React from 'react';
import { Upload, Download, Copy, Check, Loader2, FileVideo, Trash2, Image as ImageIcon, Type, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { runFFmpeg, revokeObjectUrl } from '@/lib/ffmpeg';
import { formatBytes } from '@/lib/format-utils';

interface WatermarkPosition {
  value: string;
  label: string;
  ffmpegPosition: string;
}

const WATERMARK_POSITIONS: WatermarkPosition[] = [
  { value: 'top-left', label: 'Top Left', ffmpegPosition: '10:10' },
  { value: 'top-center', label: 'Top Center', ffmpegPosition: '(W-w)/2:10' },
  { value: 'top-right', label: 'Top Right', ffmpegPosition: 'W-w-10:10' },
  { value: 'center', label: 'Center', ffmpegPosition: '(W-w)/2:(H-h)/2' },
  { value: 'bottom-left', label: 'Bottom Left', ffmpegPosition: '10:H-h-10' },
  { value: 'bottom-center', label: 'Bottom Center', ffmpegPosition: '(W-w)/2:H-h-10' },
  { value: 'bottom-right', label: 'Bottom Right', ffmpegPosition: 'W-w-10:H-h-10' },
];

export function VideoWatermark() {
  const [file, setFile] = React.useState<File | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultBlob, setResultBlob] = React.useState<Blob | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [watermarkType, setWatermarkType] = React.useState<'text' | 'image'>('text');
  const [watermarkText, setWatermarkText] = React.useState('ToolNest');
  const [fontSize, setFontSize] = React.useState(48);
  const [fontColor, setFontColor] = React.useState('#ffffff');
  const [opacity, setOpacity] = React.useState(0.7);
  const [position, setPosition] = React.useState('bottom-right');
  const [watermarkImage, setWatermarkImage] = React.useState<File | null>(null);
  const [imageWidth, setImageWidth] = React.useState(200);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const imageInputRef = React.useRef<HTMLInputElement>(null);

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

  function handleImageFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const f = fileList[0];
    if (!f.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
      return;
    }
    setWatermarkImage(f);
    setWatermarkType('image');
  }

  function handleImageDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files?.length) handleImageFiles(e.dataTransfer.files);
  }

  function getPositionFFmpeg(): string {
    const pos = WATERMARK_POSITIONS.find(p => p.value === position);
    return pos?.ffmpegPosition || 'W-w-10:H-h-10';
  }

  async function addWatermark() {
    if (!file) {
      toast.error('Please upload a video file first.');
      return;
    }
    if (watermarkType === 'text' && !watermarkText.trim()) {
      toast.error('Please enter watermark text.');
      return;
    }
    if (watermarkType === 'image' && !watermarkImage) {
      toast.error('Please upload a watermark image.');
      return;
    }
    setProcessing(true);
    setError(null);
    setResultUrl(null);
    setResultBlob(null);
    setProgress(0);
    setStatus('Loading FFmpeg...');

    try {
      const ffmpeg = await (await import('@/lib/ffmpeg')).getFFmpeg();

      // Write input video
      const inputData = file instanceof File ? await (await import('@/lib/ffmpeg')).fetchFile(file) : file;
      ffmpeg.writeFile('input.mp4', inputData as Uint8Array);

      let filterComplex = '';
      let outputArgs: string[] = [];

      if (watermarkType === 'text') {
        // Text watermark
        const pos = getPositionFFmpeg();
        filterComplex = `drawtext=text='${watermarkText.replace(/'/g, "\\'")}':fontsize=${fontSize}:fontcolor=${fontColor}@${opacity}:x=${pos.split(':')[0]}:y=${pos.split(':')[1]}`;
        outputArgs = [
          '-i', 'input.mp4',
          '-vf', filterComplex,
          '-c:v', 'libx264',
          '-preset', 'fast',
          '-crf', '23',
          '-c:a', 'copy',
          'output.mp4'
        ];
      } else {
        // Image watermark
        const imageData = watermarkImage instanceof File ? await (await import('@/lib/ffmpeg')).fetchFile(watermarkImage) : watermarkImage;
        ffmpeg.writeFile('watermark.png', imageData as Uint8Array);

        const pos = getPositionFFmpeg();
        const [x, y] = pos.split(':');
        filterComplex = `overlay=${x}:${y}:alpha=${opacity}`;
        outputArgs = [
          '-i', 'input.mp4',
          '-i', 'watermark.png',
          '-filter_complex', filterComplex,
          '-c:v', 'libx264',
          '-preset', 'fast',
          '-crf', '23',
          '-c:a', 'copy',
          'output.mp4'
        ];
      }

      setStatus('Applying watermark...');
      setProgress(30);

      const output = await runFFmpeg(outputArgs, [{ name: 'input.mp4', data: file }], 'output.mp4');

      setProgress(80);
      setStatus('Finalizing...');

      const blob = new Blob([output], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);

      setResultBlob(blob);
      setResultUrl(url);
      setProgress(100);
      setStatus('Done! Watermark applied.');
      toast.success('Watermark added!');

      // Cleanup
      try { ffmpeg.deleteFile('input.mp4'); } catch {}
      try { ffmpeg.deleteFile('watermark.png'); } catch {}
      try { ffmpeg.deleteFile('output.mp4'); } catch {}

    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to add watermark.');
      setStatus(null);
      toast.error('Failed to add watermark. Note: Watermarking requires full video re-encoding.');
    } finally {
      setProcessing(false);
    }
  }

  function handleDownload() {
    if (!resultBlob || !resultUrl) return;
    const name = file?.name.replace(/\.[^.]+$/, '') + '_watermarked.mp4' || 'watermarked.mp4';
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
    setWatermarkImage(null);
    setResultUrl(null);
    setResultBlob(null);
    setError(null);
    setStatus(null);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = '';
    if (imageInputRef.current) imageInputRef.current.value = '';
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
                  <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleClear}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Watermark Settings */}
        <div className="mt-4 rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Watermark Settings
          </h3>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Watermark Type</Label>
              <div className="flex gap-4">
                <Label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="watermark-type"
                    checked={watermarkType === 'text'}
                    onChange={() => setWatermarkType('text')}
                    className="sr-only"
                  />
                  <span className={cn(
                    'px-4 py-2 rounded-lg border text-sm font-medium transition-colors',
                    watermarkType === 'text'
                      ? 'border-brand-purple bg-brand-purple/10 text-brand-purple'
                      : 'border-border/60 hover:border-brand-purple/50'
                  )}>
                    <Type className="mr-2 h-4 w-4" />Text
                  </span>
                </Label>
                <Label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="watermark-type"
                    checked={watermarkType === 'image'}
                    onChange={() => setWatermarkType('image')}
                    className="sr-only"
                  />
                  <span className={cn(
                    'px-4 py-2 rounded-lg border text-sm font-medium transition-colors',
                    watermarkType === 'image'
                      ? 'border-brand-purple bg-brand-purple/10 text-brand-purple'
                      : 'border-border/60 hover:border-brand-purple/50'
                  )}>
                    <ImageIcon className="mr-2 h-4 w-4" />Image
                  </span>
                </Label>
              </div>
            </div>

            {watermarkType === 'text' && (
              <div className="space-y-4 border-t border-border/60 pt-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Watermark Text</Label>
                  <Input
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="Enter watermark text"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center justify-between text-sm font-medium">
                    <span>Font Size: {fontSize}px</span>
                  </Label>
                  <Slider value={[fontSize]} onValueChange={(v) => setFontSize(v[0])} min={12} max={200} step={2} />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center justify-between text-sm font-medium">
                    <span>Font Color</span>
                    <span className="text-xs text-muted-foreground">{fontColor}</span>
                  </Label>
                  <Input
                    type="color"
                    value={fontColor}
                    onChange={(e) => setFontColor(e.target.value)}
                    className="w-16 h-10 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}

            {watermarkType === 'image' && (
              <div className="space-y-4 border-t border-border/60 pt-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Watermark Image</Label>
                  <div
                    onDragOver={(e) => { e.preventDefault(); }}
                    onDragLeave={() => {}}
                    onDrop={handleImageDrop}
                    onClick={() => imageInputRef.current?.click()}
                    className="relative cursor-pointer rounded-xl border-2 border-dashed border-border/60 p-4 text-center"
                  >
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      className="hidden"
                      onChange={(e) => { if (e.target.files) handleImageFiles(e.target.files); e.target.value = ''; }}
                    />
                    {watermarkImage ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element -- blob URLs not supported by Next.js Image */}
                        <img
                          src={URL.createObjectURL(watermarkImage)}
                          alt="Watermark preview"
                          className="mx-auto max-h-32 max-w-full rounded"
                        />
                      </>
                    ) : (
                      <>
                        <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground/50" />
                        <p className="mt-2 text-sm text-muted-foreground">Drop image or click to browse</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, WebP, SVG</p>
                      </>
                    )}
                  </div>
                  {watermarkImage && (
                    <p className="text-xs text-muted-foreground">
                      {watermarkImage.name} · {formatBytes(watermarkImage.size)}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center justify-between text-sm font-medium">
                    <span>Image Width: {imageWidth}px</span>
                  </Label>
                  <Slider value={[imageWidth]} onValueChange={(v) => setImageWidth(v[0])} min={50} max={500} step={10} />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-medium">Position</Label>
              <Select value={position} onValueChange={(v) => setPosition(v)}>
                <SelectTrigger className="w-full max-w-xs">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {WATERMARK_POSITIONS.map(p => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center justify-between text-sm font-medium">
                <span>Opacity: {Math.round(opacity * 100)}%</span>
              </Label>
              <Slider value={[opacity]} onValueChange={(v) => setOpacity(v[0])} min={0} max={1} step={0.05} />
            </div>

            <p className="text-xs text-amber-500">
              ⚠ Watermarking requires full video re-encoding (quality loss may occur). This takes longer than stream-copy operations.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            onClick={addWatermark}
            disabled={processing || !file || (watermarkType === 'text' && !watermarkText.trim()) || (watermarkType === 'image' && !watermarkImage)}
            className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-amber-700"
          >
            {processing ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Adding Watermark...
              </>
            ) : (
              <>
                <ImageIcon className="mr-1.5 h-4 w-4" />
                Add Watermark
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
              <React.Fragment>
                <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm">
                  <div className="flex items-center gap-2 text-green-500">
                    <span className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>Processing complete! File size: {formatBytes(resultBlob.size)}</span>
                  </div>
                </div>
                <Button onClick={handleDownload} className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white">
                  Download Watermarked Video
                </Button>
              </React.Fragment>
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