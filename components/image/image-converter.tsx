'use client';

import * as React from 'react';
import {
  Check,
  Download,
  Loader2,
  Repeat,
  Trash2,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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

type TargetFormat = 'jpeg' | 'png' | 'webp';

const FORMATS: {
  id: TargetFormat;
  label: string;
  ext: string;
  mime: string;
  hint: string;
}[] = [
  { id: 'jpeg', label: 'JPG', ext: 'jpg', mime: 'image/jpeg', hint: 'Best for photos' },
  { id: 'png', label: 'PNG', ext: 'png', mime: 'image/png', hint: 'Lossless, transparency' },
  { id: 'webp', label: 'WEBP', ext: 'webp', mime: 'image/webp', hint: 'Smallest modern format' },
];

export function ImageConverter() {
  const up = useImageUpload();
  const [target, setTarget] = React.useState<TargetFormat>('webp');
  const [busy, setBusy] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultSize, setResultSize] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);

  const sourceFormat = up.image
    ? up.image.type.includes('png')
      ? 'PNG'
      : up.image.type.includes('webp')
        ? 'WEBP'
        : 'JPG'
    : '';

  function resetResult() {
    setResultUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setResultSize(0);
    setProgress(0);
  }

  async function convert() {
    if (!up.image) return;
    setBusy(true);
    setError(null);
    resetResult();
    setProgress(20);
    try {
      const cfg = FORMATS.find((f) => f.id === target)!;
      const canvas = document.createElement('canvas');
      canvas.width = up.image.width;
      canvas.height = up.image.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');
      if (target === 'jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(up.image.img, 0, 0);
      setProgress(60);
      const blob = await canvasToBlob(canvas, cfg.mime, 0.92);
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setResultSize(blob.size);
      setProgress(100);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not convert this image.');
    } finally {
      setBusy(false);
    }
  }

  function download() {
    if (!resultUrl || !up.image) return;
    const cfg = FORMATS.find((f) => f.id === target)!;
    fetch(resultUrl)
      .then((r) => r.blob())
      .then((b) =>
        downloadBlob(b, up.image!.name.replace(/\.[^.]+$/, '') + '.' + cfg.ext)
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
                Convert to
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Source: {sourceFormat}
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {FORMATS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setTarget(f.id);
                      resetResult();
                    }}
                    className={cn(
                      'rounded-xl border px-4 py-3 text-left transition-all',
                      target === f.id
                        ? 'border-transparent bg-gradient-brand text-white shadow-md shadow-brand-purple/25'
                        : 'border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <span className="block text-sm font-semibold">{f.label}</span>
                    <span
                      className={cn(
                        'mt-0.5 block text-xs',
                        target === f.id ? 'text-white/80' : 'text-muted-foreground/80'
                      )}
                    >
                      {f.hint}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button
                  onClick={convert}
                  disabled={busy}
                  className="rounded-xl bg-gradient-brand text-white"
                >
                  {busy ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Repeat className="h-4 w-4" />
                  )}
                  Convert
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
                  afterLabel={FORMATS.find((f) => f.id === target)!.label}
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
              <ProgressBar value={progress} label="Converting…" />
            </div>
          )}

          {!busy && resultUrl && (
            <div className="mt-4 space-y-4">
              <div className="grid place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 p-5">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-green-500/10 text-green-500">
                  <Check className="h-6 w-6" />
                </div>
                <p className="mt-2 text-sm font-medium">
                  {sourceFormat} → {FORMATS.find((f) => f.id === target)!.label}
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
              <Repeat className="h-10 w-10 opacity-40" />
              <p className="mt-2">Upload an image and choose a target format.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
