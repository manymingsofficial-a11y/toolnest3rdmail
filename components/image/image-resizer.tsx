'use client';

import * as React from 'react';
import {
  Check,
  Download,
  Link2,
  Loader2,
  Scaling as ScalingIcon,
  Trash2,
  Unlink,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  useImageUpload,
  UploadZone,
  ImageInfoBar,
  BeforeAfter,
  ProgressBar,
  canvasToBlob,
  downloadBlob,
  formatBytes,
} from './image-utils';

export function ImageResizer() {
  const up = useImageUpload();
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [lock, setLock] = React.useState(true);
  const [busy, setBusy] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultSize, setResultSize] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (up.image) {
      setWidth(up.image.width);
      setHeight(up.image.height);
    }
  }, [up.image]);

  function resetResult() {
    setResultUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setResultSize(0);
    setProgress(0);
  }

  function onWidth(v: number) {
    resetResult();
    setWidth(v);
    if (lock && up.image && up.image.width > 0) {
      setHeight(Math.round((v / up.image.width) * up.image.height));
    }
  }

  function onHeight(v: number) {
    resetResult();
    setHeight(v);
    if (lock && up.image && up.image.height > 0) {
      setWidth(Math.round((v / up.image.height) * up.image.width));
    }
  }

  async function resize() {
    if (!up.image) return;
    if (width <= 0 || height <= 0) {
      setError('Width and height must be greater than zero.');
      return;
    }
    setBusy(true);
    setError(null);
    resetResult();
    setProgress(20);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(up.image.img, 0, 0, width, height);
      setProgress(60);
      const outType = up.image.type === 'image/png' ? 'image/png' : 'image/jpeg';
      const blob = await canvasToBlob(canvas, outType, 0.92);
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setResultSize(blob.size);
      setProgress(100);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not resize this image.');
    } finally {
      setBusy(false);
    }
  }

  function download() {
    if (!up.image || !resultUrl) return;
    const img = up.image;
    fetch(resultUrl)
      .then((r) => r.blob())
      .then((b) =>
        downloadBlob(
          b,
          img.name.replace(/\.[^.]+$/, '') + `-${width}x${height}.` + (img.type === 'image/png' ? 'png' : 'jpg')
        )
      );
  }

  function clearAll() {
    resetResult();
    up.clear();
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
                Dimensions
              </h3>
              <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-end gap-3">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Width (px)</Label>
                  <Input
                    type="number"
                    min={1}
                    value={width}
                    onChange={(e) => onWidth(Number(e.target.value))}
                    className="rounded-xl"
                  />
                </div>
                <button
                  onClick={() => setLock((l) => !l)}
                  className="mb-2 grid h-10 w-10 place-items-center rounded-xl border border-border/60 bg-background/50 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={lock ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
                  title={lock ? 'Aspect ratio locked' : 'Aspect ratio unlocked'}
                >
                  {lock ? <Link2 className="h-4 w-4" /> : <Unlink className="h-4 w-4" />}
                </button>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Height (px)</Label>
                  <Input
                    type="number"
                    min={1}
                    value={height}
                    onChange={(e) => onHeight(Number(e.target.value))}
                    className="rounded-xl"
                  />
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Original: {up.image.width}×{up.image.height}px ·{' '}
                {lock ? 'Aspect ratio locked' : 'Free dimensions'}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {(() => {
                  const img = up.image;
                  if (!img) return null;
                  return [25, 50, 75].map((p) => (
                    <Button
                      key={p}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        onWidth(Math.round(img.width * (p / 100)));
                      }}
                      className="rounded-lg"
                    >
                      {p}%
                    </Button>
                  ));
                })()}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button
                  onClick={resize}
                  disabled={busy}
                  className="rounded-xl bg-gradient-brand text-white"
                >
                  {busy ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ScalingIcon className="h-4 w-4" />
                  )}
                  Resize
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

        {up.image && (
          <div className="rounded-2xl glass-card p-6">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
              Preview
            </h3>
            <div className="mt-4">
              {resultUrl ? (
                <BeforeAfter
                  beforeUrl={up.image.url}
                  afterUrl={resultUrl}
                  beforeSize={up.image.size}
                  afterSize={resultSize}
                  afterLabel="Resized"
                />
              ) : (
                <div className="grid place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 p-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={up.image.url}
                    alt={up.image.name}
                    className="max-h-[300px] w-auto rounded-lg object-contain"
                  />
                </div>
              )}
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
              <ProgressBar value={progress} label="Resizing…" />
            </div>
          )}

          {!busy && resultUrl && (
            <div className="mt-4 space-y-4">
              <div className="grid place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 p-5">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-green-500/10 text-green-500">
                  <Check className="h-6 w-6" />
                </div>
                <p className="mt-2 text-sm font-medium">
                  {width}×{height}px
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
              <ScalingIcon className="h-10 w-10 opacity-40" />
              <p className="mt-2">Upload an image and set new dimensions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
