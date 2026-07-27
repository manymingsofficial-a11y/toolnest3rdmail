'use client';

import * as React from 'react';
import { Download, Copy, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  useImageUpload,
  UploadZone,
  ImageInfoBar,
  canvasToBlob,
  downloadBlob,
  formatBytes,
} from '@/components/image/image-utils';

export function ImageBorderCreator() {
  const { image, dragging, setDragging, inputRef, ingest, clear, error } =
    useImageUpload();
  const [width, setWidth] = React.useState(10);
  const [color, setColor] = React.useState('#6366f1');
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = image.width + width * 2;
    canvas.height = image.height + width * 2;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image.img, width, width);
  }, [image, width, color]);

  function download() {
    if (!canvasRef.current || !image) return;
    canvasToBlob(canvasRef.current, 'image/png').then((blob) => {
      const name = image.name.replace(/\.[^.]+$/, '');
      downloadBlob(blob, `${name}-bordered.png`);
    });
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl glass-card p-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
          Image Border Creator
        </h3>
        {!image ? (
          <div className="mt-4">
            <UploadZone
              inputRef={inputRef}
              onFiles={ingest}
              dragging={dragging}
              setDragging={setDragging}
            />
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <ImageInfoBar image={image} onRemove={clear} />
            <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/30">
              <canvas ref={canvasRef} className="h-auto w-full" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Border Width</Label>
                  <span className="text-sm text-muted-foreground">{width}px</span>
                </div>
                <Slider
                  value={[width]}
                  min={1}
                  max={100}
                  onValueChange={(v) => setWidth(v[0])}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Border Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded-lg border border-border/60"
                  />
                  <Input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={download} className="rounded-xl">
                <Download className="mr-1.5 h-4 w-4" />
                Download
              </Button>
              <Button onClick={clear} variant="outline" className="rounded-xl">
                New Image
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ImageRoundedCorners() {
  const { image, dragging, setDragging, inputRef, ingest, clear, error } =
    useImageUpload();
  const [radius, setRadius] = React.useState(20);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const r = Math.min(radius, Math.min(canvas.width, canvas.height) / 2);
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.arcTo(canvas.width, 0, canvas.width, canvas.height, r);
    ctx.arcTo(canvas.width, canvas.height, 0, canvas.height, r);
    ctx.arcTo(0, canvas.height, 0, 0, r);
    ctx.arcTo(0, 0, canvas.width, 0, r);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(image.img, 0, 0);
  }, [image, radius]);

  function download() {
    if (!canvasRef.current || !image) return;
    canvasToBlob(canvasRef.current, 'image/png').then((blob) => {
      const name = image.name.replace(/\.[^.]+$/, '');
      downloadBlob(blob, `${name}-rounded.png`);
    });
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl glass-card p-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
          Image Rounded Corners
        </h3>
        {!image ? (
          <div className="mt-4">
            <UploadZone
              inputRef={inputRef}
              onFiles={ingest}
              dragging={dragging}
              setDragging={setDragging}
            />
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <ImageInfoBar image={image} onRemove={clear} />
            <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/30">
              <canvas ref={canvasRef} className="h-auto w-full" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Corner Radius</Label>
                <span className="text-sm text-muted-foreground">{radius}px</span>
              </div>
              <Slider
                value={[radius]}
                min={0}
                max={200}
                onValueChange={(v) => setRadius(v[0])}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={download} className="rounded-xl">
                <Download className="mr-1.5 h-4 w-4" />
                Download
              </Button>
              <Button onClick={clear} variant="outline" className="rounded-xl">
                New Image
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ImageColorPicker() {
  const { image, dragging, setDragging, inputRef, ingest, clear, error } =
    useImageUpload();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [pickedColor, setPickedColor] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image.img, 0, 0);
  }, [image]);

  function handlePick(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = `#${[pixel[0], pixel[1], pixel[2]]
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('')}`;
    setPickedColor(hex);
    setCopied(false);
  }

  function copyColor() {
    if (!pickedColor) return;
    navigator.clipboard.writeText(pickedColor).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl glass-card p-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
          Image Color Picker
        </h3>
        {!image ? (
          <div className="mt-4">
            <UploadZone
              inputRef={inputRef}
              onFiles={ingest}
              dragging={dragging}
              setDragging={setDragging}
            />
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <ImageInfoBar image={image} onRemove={clear} />
            <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/30">
              <canvas
                ref={canvasRef}
                onClick={handlePick}
                className="h-auto w-full cursor-crosshair"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Click anywhere on the image to pick a color.
            </p>
            {pickedColor && (
              <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 p-4">
                <div
                  className="h-12 w-12 shrink-0 rounded-lg border border-border/60"
                  style={{ backgroundColor: pickedColor }}
                />
                <div className="flex-1">
                  <p className="font-mono text-lg font-bold">{pickedColor}</p>
                  <p className="text-xs text-muted-foreground">HEX color</p>
                </div>
                <Button
                  onClick={copyColor}
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              </div>
            )}
            <Button onClick={clear} variant="outline" className="rounded-xl">
              New Image
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export function ImageWatermark() {
  const { image, dragging, setDragging, inputRef, ingest, clear, error } =
    useImageUpload();
  const [text, setText] = React.useState('© ToolNest');
  const [opacity, setOpacity] = React.useState(30);
  const [size, setSize] = React.useState(48);
  const [color, setColor] = React.useState('#ffffff');
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image.img, 0, 0);
    if (!text) return;
    ctx.globalAlpha = opacity / 100;
    ctx.font = `bold ${size}px sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    ctx.globalAlpha = 1;
  }, [image, text, opacity, size, color]);

  function download() {
    if (!canvasRef.current || !image) return;
    const type = image.type === 'image/png' ? 'image/png' : 'image/jpeg';
    canvasToBlob(canvasRef.current, type, 0.92).then((blob) => {
      const name = image.name.replace(/\.[^.]+$/, '');
      downloadBlob(blob, `${name}-watermarked.${type === 'image/png' ? 'png' : 'jpg'}`);
    });
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl glass-card p-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
          Image Watermark
        </h3>
        {!image ? (
          <div className="mt-4">
            <UploadZone
              inputRef={inputRef}
              onFiles={ingest}
              dragging={dragging}
              setDragging={setDragging}
            />
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <ImageInfoBar image={image} onRemove={clear} />
            <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/30">
              <canvas ref={canvasRef} className="h-auto w-full" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Watermark Text</Label>
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded-lg border border-border/60"
                  />
                  <Input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Opacity</Label>
                  <span className="text-sm text-muted-foreground">{opacity}%</span>
                </div>
                <Slider
                  value={[opacity]}
                  min={10}
                  max={100}
                  onValueChange={(v) => setOpacity(v[0])}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Font Size</Label>
                  <span className="text-sm text-muted-foreground">{size}px</span>
                </div>
                <Slider
                  value={[size]}
                  min={12}
                  max={200}
                  onValueChange={(v) => setSize(v[0])}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={download} className="rounded-xl">
                <Download className="mr-1.5 h-4 w-4" />
                Download
              </Button>
              <Button onClick={clear} variant="outline" className="rounded-xl">
                New Image
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function BackgroundRemover() {
  const { image, dragging, setDragging, inputRef, ingest, clear, error } =
    useImageUpload();
  const [threshold, setThreshold] = React.useState(30);
  const [processing, setProcessing] = React.useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [bgColor, setBgColor] = React.useState('#ffffff');

  React.useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image.img, 0, 0);
  }, [image]);

  function removeBackground() {
    if (!image || !canvasRef.current) return;
    setProcessing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const bg = hexToRgb(bgColor);
    if (!bg) return;
    const thresh = threshold * 2.55;
    for (let i = 0; i < data.length; i += 4) {
      const dr = Math.abs(data[i] - bg.r);
      const dg = Math.abs(data[i + 1] - bg.g);
      const db = Math.abs(data[i + 2] - bg.b);
      const dist = Math.sqrt(dr * dr + dg * dg + db * db);
      if (dist < thresh) {
        data[i + 3] = 0;
      } else if (dist < thresh * 1.5) {
        data[i + 3] = Math.round((data[i + 3] * (dist - thresh)) / (thresh * 0.5));
      }
    }
    ctx.putImageData(imageData, 0, 0);
    setProcessing(false);
  }

  function hexToRgb(hex: string) {
    const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!m) return null;
    return {
      r: parseInt(m[1], 16),
      g: parseInt(m[2], 16),
      b: parseInt(m[3], 16),
    };
  }

  function download() {
    if (!canvasRef.current || !image) return;
    canvasToBlob(canvasRef.current, 'image/png').then((blob) => {
      const name = image.name.replace(/\.[^.]+$/, '');
      downloadBlob(blob, `${name}-nobg.png`);
    });
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl glass-card p-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
          Background Remover
        </h3>
        {!image ? (
          <div className="mt-4">
            <UploadZone
              inputRef={inputRef}
              onFiles={ingest}
              dragging={dragging}
              setDragging={setDragging}
            />
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <ImageInfoBar image={image} onRemove={clear} />
            <div
              className="overflow-hidden rounded-xl border border-border/60"
              style={{
                backgroundImage:
                  'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
              }}
            >
              <canvas ref={canvasRef} className="h-auto w-full" />
            </div>
            <p className="text-sm text-muted-foreground">
              Set the background color of your image and adjust the threshold.
              Colors close to the background will be made transparent.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Background Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded-lg border border-border/60"
                  />
                  <Input
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Threshold</Label>
                  <span className="text-sm text-muted-foreground">{threshold}</span>
                </div>
                <Slider
                  value={[threshold]}
                  min={5}
                  max={100}
                  onValueChange={(v) => setThreshold(v[0])}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={removeBackground}
                disabled={processing}
                className="rounded-xl"
              >
                {processing ? 'Processing...' : 'Remove Background'}
              </Button>
              <Button onClick={download} variant="outline" className="rounded-xl">
                <Download className="mr-1.5 h-4 w-4" />
                Download PNG
              </Button>
              <Button onClick={clear} variant="outline" className="rounded-xl">
                New Image
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ImageMetadataViewer() {
  const { image, dragging, setDragging, inputRef, ingest, clear, error } =
    useImageUpload();
  const [metadata, setMetadata] = React.useState<Record<string, string> | null>(
    null
  );

  React.useEffect(() => {
    if (!image) {
      setMetadata(null);
      return;
    }
    const meta: Record<string, string> = {
      'File Name': image.name,
      'File Size': formatBytes(image.size),
      'MIME Type': image.type,
      Width: `${image.width}px`,
      Height: `${image.height}px`,
      'Aspect Ratio': (
        Math.round((image.width / image.height) * 100) / 100
      ).toString(),
      'Last Modified': new Date(image.file.lastModified).toLocaleString(),
    };
    setMetadata(meta);
  }, [image]);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl glass-card p-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
          Image Metadata Viewer
        </h3>
        {!image ? (
          <div className="mt-4">
            <UploadZone
              inputRef={inputRef}
              onFiles={ingest}
              dragging={dragging}
              setDragging={setDragging}
            />
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <ImageInfoBar image={image} onRemove={clear} />
            {metadata && (
              <div className="overflow-hidden rounded-xl border border-border/60">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(metadata).map(([key, value]) => (
                      <tr key={key} className="border-b border-border/60 last:border-0">
                        <td className="bg-muted/30 px-4 py-2.5 font-medium">
                          {key}
                        </td>
                        <td className="px-4 py-2.5 font-mono">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <Button onClick={clear} variant="outline" className="rounded-xl">
              New Image
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export function ImageMetadataRemover() {
  const { image, dragging, setDragging, inputRef, ingest, clear, error } =
    useImageUpload();
  const [done, setDone] = React.useState(false);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultSize, setResultSize] = React.useState(0);

  React.useEffect(() => {
    if (!image) {
      setDone(false);
      setResultUrl(null);
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(image.img, 0, 0);
    const type = image.type === 'image/png' ? 'image/png' : 'image/jpeg';
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        setResultSize(blob.size);
        if (resultUrl) URL.revokeObjectURL(resultUrl);
        setResultUrl(URL.createObjectURL(blob));
        setDone(true);
      },
      type,
      0.92
    );
  }, [image]);

  function download() {
    if (!resultUrl || !image) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    const name = image.name.replace(/\.[^.]+$/, '');
    const ext = image.type === 'image/png' ? 'png' : 'jpg';
    a.download = `${name}-clean.${ext}`;
    a.click();
  }

  React.useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [resultUrl]);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl glass-card p-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
          Image Metadata Remover
        </h3>
        {!image ? (
          <div className="mt-4">
            <UploadZone
              inputRef={inputRef}
              onFiles={ingest}
              dragging={dragging}
              setDragging={setDragging}
            />
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <ImageInfoBar image={image} onRemove={clear} />
            {done && resultUrl && (
              <>
                <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resultUrl}
                    alt="Cleaned image"
                    className="h-auto w-full"
                  />
                </div>
                <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm">
                  <p className="font-medium text-green-600 dark:text-green-400">
                    Metadata removed successfully!
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    Original: {formatBytes(image.size)} → Clean: {formatBytes(resultSize)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={download} className="rounded-xl">
                    <Download className="mr-1.5 h-4 w-4" />
                    Download Clean Image
                  </Button>
                  <Button onClick={clear} variant="outline" className="rounded-xl">
                    New Image
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
