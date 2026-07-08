'use client';

import * as React from 'react';
import ReactCrop, {
  type Crop,
  type PixelCrop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
  Check,
  Crop as CropIcon,
  Download,
  Loader2,
  Trash2,
  Circle,
  Square,
  RectangleHorizontal,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  useImageUpload,
  UploadZone,
  ImageInfoBar,
  ProgressBar,
  canvasToBlob,
  downloadBlob,
  formatBytes,
} from './image-utils';

type Ratio = 'free' | 'square' | '16:9' | '4:3';

const RATIOS: { id: Ratio; label: string; icon: React.ReactNode; value: number | undefined }[] = [
  { id: 'free', label: 'Free', icon: <RectangleHorizontal className="h-4 w-4" />, value: undefined },
  { id: 'square', label: '1:1', icon: <Square className="h-4 w-4" />, value: 1 },
  { id: '16:9', label: '16:9', icon: <RectangleHorizontal className="h-4 w-4" />, value: 16 / 9 },
  { id: '4:3', label: '4:3', icon: <RectangleHorizontal className="h-4 w-4" />, value: 4 / 3 },
];

export function ImageCropper() {
  const up = useImageUpload();
  const [ratio, setRatio] = React.useState<Ratio>('free');
  const [circle, setCircle] = React.useState(false);
  const [crop, setCrop] = React.useState<Crop>();
  const [completed, setCompleted] = React.useState<PixelCrop>();
  const [busy, setBusy] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultSize, setResultSize] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);

  function resetResult() {
    setResultUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setResultSize(0);
    setProgress(0);
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const aspect = RATIOS.find((r) => r.id === ratio)?.value;
    if (aspect) {
      setCrop(
        centerCrop(
          makeAspectCrop({ unit: '%', width: 80 }, aspect, width, height),
          width,
          height
        )
      );
    } else {
      setCrop({ unit: '%', width: 80, height: 80, x: 10, y: 10 });
    }
  }

  function selectRatio(r: Ratio) {
    setRatio(r);
    resetResult();
    const aspect = RATIOS.find((x) => x.id === r)?.value;
    if (imgRef.current && aspect) {
      const { width, height } = imgRef.current;
      setCrop(
        centerCrop(
          makeAspectCrop({ unit: '%', width: 80 }, aspect, width, height),
          width,
          height
        )
      );
    } else if (imgRef.current) {
      setCrop({ unit: '%', width: 80, height: 80, x: 10, y: 10 });
    }
  }

  async function applyCrop() {
    if (!up.image || !completed || !imgRef.current) return;
    setBusy(true);
    setError(null);
    resetResult();
    setProgress(20);
    try {
      const blob = await cropToBlob(
        imgRef.current,
        completed,
        circle,
        up.image.type === 'image/png' ? 'image/png' : 'image/jpeg'
      );
      if (!blob) throw new Error('Could not crop this image.');
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setResultSize(blob.size);
      setProgress(100);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not crop this image.');
    } finally {
      setBusy(false);
    }
  }

  function download() {
    if (!resultUrl || !up.image) return;
    fetch(resultUrl)
      .then((r) => r.blob())
      .then((b) =>
        downloadBlob(
          b,
          up
            .image!.name.replace(/\.[^.]+$/, '') + '-cropped.' + (circle ? 'png' : up.image!.type === 'image/png' ? 'png' : 'jpg')
        )
      );
  }

  function clearAll() {
    resetResult();
    up.clear();
    setCrop(undefined);
    setCompleted(undefined);
    setError(null);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        {!up.image ? (
          <UploadZone
            inputRef={up.inputRef}
            onFiles={up.ingest}
            dragging={up.dragging}
            setDragging={up.setDragging}
          />
        ) : (
          <>
            <ImageInfoBar image={up.image} onRemove={clearAll} />

            <div className="rounded-2xl glass-card p-6">
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
                Crop shape
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {RATIOS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => selectRatio(r.id)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all',
                      ratio === r.id && !circle
                        ? 'border-transparent bg-gradient-brand text-white shadow-md shadow-brand-purple/25'
                        : 'border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {r.icon}
                    {r.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setCircle(true);
                    setRatio('square');
                    resetResult();
                    if (imgRef.current) {
                      const { width, height } = imgRef.current;
                      setCrop(
                        centerCrop(
                          makeAspectCrop({ unit: '%', width: 70 }, 1, width, height),
                          width,
                          height
                        )
                      );
                    }
                  }}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all',
                    circle
                      ? 'border-transparent bg-gradient-brand text-white shadow-md shadow-brand-purple/25'
                      : 'border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Circle className="h-4 w-4" />
                  Circle
                </button>
              </div>

              <div className="mt-5 overflow-hidden rounded-xl border border-border/60 bg-muted/30">
                <ReactCrop
                  crop={crop}
                  onChange={(_, percent) => setCrop(percent)}
                  onComplete={(c) => setCompleted(c)}
                  aspect={RATIOS.find((r) => r.id === ratio)?.value}
                  className="max-h-[420px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imgRef}
                    src={up.image.url}
                    alt={up.image.name}
                    onLoad={onImageLoad}
                    className="max-h-[420px] w-full object-contain"
                  />
                </ReactCrop>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button
                  onClick={applyCrop}
                  disabled={busy || !completed}
                  className="rounded-xl bg-gradient-brand text-white"
                >
                  {busy ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CropIcon className="h-4 w-4" />
                  )}
                  Apply Crop
                </Button>
                <Button
                  variant="outline"
                  onClick={clearAll}
                  disabled={busy}
                  className="rounded-xl"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </Button>
              </div>
            </div>
          </>
        )}

        {up.image && resultUrl && (
          <div className="rounded-2xl glass-card p-6">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
              Cropped preview
            </h3>
            <div className="mt-4 grid place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resultUrl}
                alt="Cropped result"
                className={cn('max-h-[300px] w-auto', circle && 'rounded-full')}
              />
            </div>
          </div>
        )}

        {error && (
          <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Result
          </h3>

          {busy && (
            <div className="mt-4">
              <ProgressBar value={progress} label="Cropping…" />
            </div>
          )}

          {!busy && resultUrl && (
            <div className="mt-4 space-y-4">
              <div className="grid place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 p-5">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-green-500/10 text-green-500">
                  <Check className="h-6 w-6" />
                </div>
                <p className="mt-2 text-sm font-medium">
                  {circle ? 'Circle' : ratio === 'free' ? 'Free' : RATIOS.find((r) => r.id === ratio)?.label} crop
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatBytes(resultSize)}
                </p>
              </div>
              <Button
                onClick={download}
                className="w-full rounded-xl bg-gradient-brand text-white"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          )}

          {!busy && !resultUrl && (
            <div className="mt-4 grid place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 p-8 text-center text-sm text-muted-foreground">
              <CropIcon className="h-10 w-10 opacity-40" />
              <p className="mt-2">Upload an image and drag to select a crop area.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

async function cropToBlob(
  image: HTMLImageElement,
  crop: PixelCrop,
  circle: boolean,
  outType: string
): Promise<Blob | null> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const pixelRatio = window.devicePixelRatio || 1;

  const targetW = Math.round(crop.width * scaleX);
  const targetH = Math.round(crop.height * scaleY);

  canvas.width = targetW * pixelRatio;
  canvas.height = targetH * pixelRatio;
  ctx.scale(pixelRatio, pixelRatio);

  if (circle) {
    const size = Math.min(targetW, targetH);
    canvas.width = size * pixelRatio;
    canvas.height = size * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    const sx = crop.x * scaleX + (crop.width * scaleX - size) / 2;
    const sy = crop.y * scaleY + (crop.height * scaleY - size) / 2;
    ctx.drawImage(image, sx, sy, size, size, 0, 0, size, size);
  } else {
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      targetW,
      targetH
    );
  }

  return canvasToBlob(canvas, outType, 0.92);
}
