'use client';

import * as React from 'react';
import {
  Archive,
  Check,
  Download,
  Loader2,
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

type Level = 'low' | 'medium' | 'high';

const LEVELS: { id: Level; label: string; hint: string; quality: number }[] = [
  { id: 'low', label: 'Low', hint: 'Best quality, mild compression', quality: 0.8 },
  { id: 'medium', label: 'Medium', hint: 'Balanced quality and size', quality: 0.5 },
  { id: 'high', label: 'High', hint: 'Smallest size, lower quality', quality: 0.25 },
];

export function ImageCompressor() {
  const up = useImageUpload();
  const [level, setLevel] = React.useState<Level>('medium');
  const [busy, setBusy] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultSize, setResultSize] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);

  function resetResult() {
    setResultUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setResultSize(0);
    setProgress(0);
  }

  async function compress() {
    if (!up.image) return;
    setBusy(true);
    setError(null);
    resetResult();
    setProgress(20);
    try {
      const cfg = LEVELS.find((l) => l.id === level)!;
      const canvas = document.createElement('canvas');
      canvas.width = up.image.width;
      canvas.height = up.image.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');
      ctx.drawImage(up.image.img, 0, 0);
      setProgress(60);
      const outType = up.image.type === 'image/png' ? 'image/png' : 'image/jpeg';
      const blob = await canvasToBlob(canvas, outType, cfg.quality);
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setResultSize(blob.size);
      setProgress(100);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not compress this image.');
    } finally {
      setBusy(false);
    }
  }

  function download() {
    if (!resultUrl || !up.image) return;
    fetch(resultUrl)
      .then((r) => r.blob())
      .then((b) => downloadBlob(b, up.image!.name.replace(/\.[^.]+$/, '') + '-compressed.' + (up.image!.type === 'image/png' ? 'png' : 'jpg')));
  }

  function clearAll() {
    resetResult();
    up.clear();
    setError(null);
  }

  const savedPct =
    up.image && resultSize > 0
      ? Math.max(0, Math.round((1 - resultSize / up.image.size) * 100))
      : 0;

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
                Compression level
              </h3>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {LEVELS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setLevel(l.id);
                      resetResult();
                    }}
                    className={cn(
                      'rounded-xl border px-4 py-3 text-left transition-all',
                      level === l.id
                        ? 'border-transparent bg-gradient-brand text-white shadow-md shadow-brand-purple/25'
                        : 'border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <span className="block text-sm font-semibold">{l.label}</span>
                    <span
                      className={cn(
                        'mt-0.5 block text-xs',
                        level === l.id ? 'text-white/80' : 'text-muted-foreground/80'
                      )}
                    >
                      {l.hint}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button
                  onClick={compress}
                  disabled={busy}
                  className="rounded-xl bg-gradient-brand text-white"
                >
                  {busy ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Archive className="h-4 w-4" />
                  )}
                  Compress
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
                  afterLabel="Compressed"
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
              <ProgressBar value={progress} label="Compressing…" />
            </div>
          )}

          {!busy && resultUrl && (
            <div className="mt-4 space-y-4">
              <div className="grid place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 p-5">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-green-500/10 text-green-500">
                  <Check className="h-6 w-6" />
                </div>
                <p className="mt-2 text-sm font-medium">Compression complete</p>
              </div>
              <div className="space-y-2 rounded-xl border border-border/60 bg-background/50 p-4">
                <Row label="Original" value={formatBytes(up.image!.size)} />
                <Row label="Compressed" value={formatBytes(resultSize)} accent />
                <div className="my-1 border-t border-border/60" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Saved</span>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-1 text-sm font-bold',
                      savedPct > 0
                        ? 'bg-green-500/15 text-green-600 dark:text-green-400'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {savedPct > 0 ? `${savedPct}%` : '—'}
                  </span>
                </div>
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
              <Archive className="h-10 w-10 opacity-40" />
              <p className="mt-2">Upload an image and pick a level to compress.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={cn(
          'text-sm font-semibold',
          accent && 'text-green-600 dark:text-green-400'
        )}
      >
        {value}
      </span>
    </div>
  );
}
