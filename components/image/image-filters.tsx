'use client';

import * as React from 'react';
import { Download, RotateCw, FlipHorizontal2, FlipVertical2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  useImageUpload,
  UploadZone,
  ImageInfoBar,
  canvasToBlob,
  downloadBlob,
} from '@/components/image/image-utils';

type FilterConfig = {
  brightness?: number;
  contrast?: number;
  saturate?: number;
  grayscale?: number;
  sepia?: number;
  blur?: number;
};

function useCanvasFilter() {
  const { image, dragging, setDragging, inputRef, ingest, clear, error } =
    useImageUpload();
  const [filters, setFilters] = React.useState<FilterConfig>({});
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const applyFilter = React.useCallback(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = image.width;
    canvas.height = image.height;
    const parts: string[] = [];
    if (filters.brightness !== undefined)
      parts.push(`brightness(${filters.brightness}%)`);
    if (filters.contrast !== undefined)
      parts.push(`contrast(${filters.contrast}%)`);
    if (filters.saturate !== undefined)
      parts.push(`saturate(${filters.saturate}%)`);
    if (filters.grayscale !== undefined)
      parts.push(`grayscale(${filters.grayscale}%)`);
    if (filters.sepia !== undefined) parts.push(`sepia(${filters.sepia}%)`);
    if (filters.blur !== undefined) parts.push(`blur(${filters.blur}px)`);
    ctx.filter = parts.join(' ') || 'none';
    ctx.drawImage(image.img, 0, 0);
  }, [image, filters]);

  React.useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  function download() {
    if (!canvasRef.current || !image) return;
    const type = image.type === 'image/png' ? 'image/png' : 'image/jpeg';
    canvasToBlob(canvasRef.current, type, 0.92).then((blob) => {
      const name = image.name.replace(/\.[^.]+$/, '');
      downloadBlob(blob, `${name}-adjusted.${type === 'image/png' ? 'png' : 'jpg'}`);
    });
  }

  return {
    image,
    dragging,
    setDragging,
    inputRef,
    ingest,
    clear,
    error,
    canvasRef,
    filters,
    setFilters,
    download,
  };
}

function FilterSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 200,
  step = 1,
  unit = '%',
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-sm text-muted-foreground">
          {value}
          {unit}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
      />
    </div>
  );
}

function FilterLayout({
  title,
  children,
  controls,
  image,
  canvasRef,
  onDownload,
  onClear,
  onIngest,
  dragging,
  setDragging,
  inputRef,
  error,
}: {
  title: string;
  children?: React.ReactNode;
  controls: React.ReactNode;
  image: ReturnType<typeof useImageUpload>['image'];
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onDownload: () => void;
  onClear: () => void;
  onIngest: (f: File) => void;
  dragging: boolean;
  setDragging: (v: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  error: string | null;
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl glass-card p-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
          {title}
        </h3>
        {!image ? (
          <div className="mt-4">
            <UploadZone
              inputRef={inputRef}
              onFiles={onIngest}
              dragging={dragging}
              setDragging={setDragging}
            />
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <ImageInfoBar image={image} onRemove={onClear} />
            <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/30">
              <canvas ref={canvasRef} className="h-auto w-full" />
            </div>
            {children}
            {controls}
            <div className="flex gap-2">
              <Button onClick={onDownload} className="rounded-xl">
                <Download className="mr-1.5 h-4 w-4" />
                Download
              </Button>
              <Button onClick={onClear} variant="outline" className="rounded-xl">
                New Image
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ImageBrightnessAdjuster() {
  const h = useCanvasFilter();
  return (
    <FilterLayout
      title="Image Brightness Adjuster"
      image={h.image}
      canvasRef={h.canvasRef}
      onDownload={h.download}
      onClear={h.clear}
      onIngest={h.ingest}
      dragging={h.dragging}
      setDragging={h.setDragging}
      inputRef={h.inputRef}
      error={h.error}
      controls={
        <FilterSlider
          label="Brightness"
          value={h.filters.brightness ?? 100}
          onChange={(v) => h.setFilters({ ...h.filters, brightness: v })}
          min={0}
          max={200}
        />
      }
    />
  );
}

export function ImageContrastAdjuster() {
  const h = useCanvasFilter();
  return (
    <FilterLayout
      title="Image Contrast Adjuster"
      image={h.image}
      canvasRef={h.canvasRef}
      onDownload={h.download}
      onClear={h.clear}
      onIngest={h.ingest}
      dragging={h.dragging}
      setDragging={h.setDragging}
      inputRef={h.inputRef}
      error={h.error}
      controls={
        <FilterSlider
          label="Contrast"
          value={h.filters.contrast ?? 100}
          onChange={(v) => h.setFilters({ ...h.filters, contrast: v })}
          min={0}
          max={200}
        />
      }
    />
  );
}

export function ImageGrayscale() {
  const h = useCanvasFilter();
  return (
    <FilterLayout
      title="Image Grayscale"
      image={h.image}
      canvasRef={h.canvasRef}
      onDownload={h.download}
      onClear={h.clear}
      onIngest={h.ingest}
      dragging={h.dragging}
      setDragging={h.setDragging}
      inputRef={h.inputRef}
      error={h.error}
      controls={
        <FilterSlider
          label="Grayscale"
          value={h.filters.grayscale ?? 0}
          onChange={(v) => h.setFilters({ ...h.filters, grayscale: v })}
          min={0}
          max={100}
        />
      }
    />
  );
}

export function ImageSepiaFilter() {
  const h = useCanvasFilter();
  return (
    <FilterLayout
      title="Image Sepia Filter"
      image={h.image}
      canvasRef={h.canvasRef}
      onDownload={h.download}
      onClear={h.clear}
      onIngest={h.ingest}
      dragging={h.dragging}
      setDragging={h.setDragging}
      inputRef={h.inputRef}
      error={h.error}
      controls={
        <FilterSlider
          label="Sepia"
          value={h.filters.sepia ?? 0}
          onChange={(v) => h.setFilters({ ...h.filters, sepia: v })}
          min={0}
          max={100}
        />
      }
    />
  );
}

export function ImageBlur() {
  const h = useCanvasFilter();
  return (
    <FilterLayout
      title="Image Blur"
      image={h.image}
      canvasRef={h.canvasRef}
      onDownload={h.download}
      onClear={h.clear}
      onIngest={h.ingest}
      dragging={h.dragging}
      setDragging={h.setDragging}
      inputRef={h.inputRef}
      error={h.error}
      controls={
        <FilterSlider
          label="Blur"
          value={h.filters.blur ?? 0}
          onChange={(v) => h.setFilters({ ...h.filters, blur: v })}
          min={0}
          max={20}
          step={0.5}
          unit="px"
        />
      }
    />
  );
}

export function ImageSharpen() {
  const { image, dragging, setDragging, inputRef, ingest, clear, error } =
    useImageUpload();
  const [amount, setAmount] = React.useState(50);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image.img, 0, 0);
    if (amount === 0) return;
    const strength = amount / 100;
    const src = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const dst = ctx.createImageData(canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        for (let c = 0; c < 3; c++) {
          let val = src.data[idx + c] * (1 + 4 * strength);
          val -= src.data[(Math.max(0, y - 1) * w + x) * 4 + c] * strength;
          val -= src.data[(Math.min(h - 1, y + 1) * w + x) * 4 + c] * strength;
          val -= src.data[(y * w + Math.max(0, x - 1)) * 4 + c] * strength;
          val -= src.data[(y * w + Math.min(w - 1, x + 1)) * 4 + c] * strength;
          dst.data[idx + c] = Math.max(0, Math.min(255, val));
        }
        dst.data[idx + 3] = src.data[idx + 3];
      }
    }
    ctx.putImageData(dst, 0, 0);
  }, [image, amount]);

  function download() {
    if (!canvasRef.current || !image) return;
    const type = image.type === 'image/png' ? 'image/png' : 'image/jpeg';
    canvasToBlob(canvasRef.current, type, 0.92).then((blob) => {
      const name = image.name.replace(/\.[^.]+$/, '');
      downloadBlob(blob, `${name}-sharpened.${type === 'image/png' ? 'png' : 'jpg'}`);
    });
  }

  return (
    <FilterLayout
      title="Image Sharpen"
      image={image}
      canvasRef={canvasRef}
      onDownload={download}
      onClear={clear}
      onIngest={ingest}
      dragging={dragging}
      setDragging={setDragging}
      inputRef={inputRef}
      error={error}
      controls={
        <FilterSlider
          label="Sharpen Amount"
          value={amount}
          onChange={setAmount}
          min={0}
          max={100}
        />
      }
    />
  );
}

export function ImageRotator() {
  const { image, dragging, setDragging, inputRef, ingest, clear, error } =
    useImageUpload();
  const [angle, setAngle] = React.useState(0);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rad = (angle * Math.PI) / 180;
    const abs = Math.abs(angle % 180);
    const swap = abs > 45 && abs < 135;
    canvas.width = swap ? image.height : image.width;
    canvas.height = swap ? image.width : image.height;
    ctx.fillStyle = 'transparent';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rad);
    ctx.drawImage(image.img, -image.width / 2, -image.height / 2);
  }, [image, angle]);

  function download() {
    if (!canvasRef.current || !image) return;
    canvasToBlob(canvasRef.current, 'image/png').then((blob) => {
      const name = image.name.replace(/\.[^.]+$/, '');
      downloadBlob(blob, `${name}-rotated.png`);
    });
  }

  return (
    <FilterLayout
      title="Image Rotator"
      image={image}
      canvasRef={canvasRef}
      onDownload={download}
      onClear={clear}
      onIngest={ingest}
      dragging={dragging}
      setDragging={setDragging}
      inputRef={inputRef}
      error={error}
      controls={
        <div className="space-y-3">
          <FilterSlider
            label="Rotation Angle"
            value={angle}
            onChange={setAngle}
            min={-180}
            max={180}
            unit="°"
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
              onClick={() => setAngle((a) => a - 90)}
            >
              <RotateCw className="mr-1 h-4 w-4 -scale-100" />
              -90°
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
              onClick={() => setAngle((a) => a + 90)}
            >
              <RotateCw className="mr-1 h-4 w-4" />
              +90°
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
              onClick={() => setAngle(180)}
            >
              180°
            </Button>
          </div>
        </div>
      }
    />
  );
}

export function ImageFlipper() {
  const { image, dragging, setDragging, inputRef, ingest, clear, error } =
    useImageUpload();
  const [flipH, setFlipH] = React.useState(false);
  const [flipV, setFlipV] = React.useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(flipH ? canvas.width : 0, flipV ? canvas.height : 0);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    ctx.drawImage(image.img, 0, 0);
  }, [image, flipH, flipV]);

  function download() {
    if (!canvasRef.current || !image) return;
    canvasToBlob(canvasRef.current, 'image/png').then((blob) => {
      const name = image.name.replace(/\.[^.]+$/, '');
      downloadBlob(blob, `${name}-flipped.png`);
    });
  }

  return (
    <FilterLayout
      title="Image Flipper"
      image={image}
      canvasRef={canvasRef}
      onDownload={download}
      onClear={clear}
      onIngest={ingest}
      dragging={dragging}
      setDragging={setDragging}
      inputRef={inputRef}
      error={error}
      controls={
        <div className="flex gap-2">
          <Button
            variant={flipH ? 'default' : 'outline'}
            size="sm"
            className="rounded-xl"
            onClick={() => setFlipH((v) => !v)}
          >
            <FlipHorizontal2 className="mr-1 h-4 w-4" />
            Flip Horizontal
          </Button>
          <Button
            variant={flipV ? 'default' : 'outline'}
            size="sm"
            className="rounded-xl"
            onClick={() => setFlipV((v) => !v)}
          >
            <FlipVertical2 className="mr-1 h-4 w-4" />
            Flip Vertical
          </Button>
        </div>
      }
    />
  );
}
