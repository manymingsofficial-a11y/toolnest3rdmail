'use client';

import * as React from 'react';
import { UploadCloud, X } from 'lucide-react';

import { cn } from '@/lib/utils';

export function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
}

export type LoadedImage = {
  file: File;
  url: string;
  name: string;
  size: number;
  type: string;
  width: number;
  height: number;
  img: HTMLImageElement;
};

export function useImageUpload() {
  const [image, setImage] = React.useState<LoadedImage | null>(null);
  const [dragging, setDragging] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const loadFile = React.useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return null;
    }
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    return new Promise<LoadedImage | null>((resolve) => {
      img.onload = () => {
        resolve({
          file,
          url,
          name: file.name,
          size: file.size,
          type: file.type,
          width: img.naturalWidth,
          height: img.naturalHeight,
          img,
        });
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        setError('Could not load that image.');
        resolve(null);
      };
      img.src = url;
    });
  }, []);

  async function ingest(file: File) {
    setError(null);
    const loaded = await loadFile(file);
    if (loaded) setImage(loaded);
  }

  function clear() {
    setImage((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
    setError(null);
  }

  function replace(next: LoadedImage) {
    setImage((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return next;
    });
  }

  React.useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image.url);
    };
  }, [image]);

  return {
    image,
    dragging,
    setDragging,
    error,
    setError,
    inputRef,
    ingest,
    clear,
    replace,
    setImage,
  };
}

export function UploadZone({
  inputRef,
  onFiles,
  dragging,
  setDragging,
  label = 'Drop an image here or click to upload',
  hint = 'JPG, PNG and WEBP supported',
}: {
  inputRef: React.RefObject<HTMLInputElement>;
  onFiles: (file: File) => void;
  dragging: boolean;
  setDragging: (v: boolean) => void;
  label?: string;
  hint?: string;
}) {
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const f = e.dataTransfer.files?.[0];
        if (f) onFiles(f);
      }}
      onClick={() => inputRef.current?.click()}
      className={cn(
        'group cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all',
        dragging
          ? 'border-brand-blue bg-brand-blue/10 scale-[1.01]'
          : 'border-border/70 bg-card/50 hover:border-brand-blue/60 hover:bg-card/80'
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) onFiles(e.target.files[0]);
          e.target.value = '';
        }}
      />
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/25 transition-transform group-hover:scale-110">
        <UploadCloud className="h-8 w-8" />
      </div>
      <p className="mt-4 text-base font-semibold">{label}</p>
      <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
    </div>
  );
}

export function BeforeAfter({
  beforeUrl,
  afterUrl,
  beforeSize,
  afterSize,
  afterLabel = 'Result',
}: {
  beforeUrl: string;
  afterUrl: string;
  beforeSize?: number;
  afterSize?: number;
  afterLabel?: string;
}) {
  const [pos, setPos] = React.useState(50);

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl border border-border/60 bg-muted/30">
        <div className="relative aspect-video w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={afterUrl}
            alt="After"
            className="absolute inset-0 h-full w-full object-contain"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={beforeUrl}
            alt="Before"
            className="absolute inset-0 h-full w-full object-contain"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-x-0 bottom-0 z-10 h-2 w-full cursor-ew-resize appearance-none bg-transparent accent-brand-purple"
          aria-label="Compare before and after"
        />
        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          Before
        </div>
        <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-gradient-brand px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          {afterLabel}
        </div>
      </div>
      {(beforeSize !== undefined || afterSize !== undefined) && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Before: {beforeSize !== undefined ? formatBytes(beforeSize) : '—'}
          </span>
          <span className="font-medium text-green-600 dark:text-green-400">
            After: {afterSize !== undefined ? formatBytes(afterSize) : '—'}
          </span>
        </div>
      )}
    </div>
  );
}

export function ImageInfoBar({
  image,
  onRemove,
}: {
  image: LoadedImage;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl glass-card p-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.url}
        alt={image.name}
        className="h-12 w-12 shrink-0 rounded-lg object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{image.name}</p>
        <p className="text-xs text-muted-foreground">
          {formatBytes(image.size)} · {image.width}×{image.height}px
        </p>
      </div>
      <button
        onClick={onRemove}
        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        aria-label="Remove image"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function ProgressBar({ value, label }: { value: number; label?: string }) {
  return (
    <div className="space-y-2">
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-brand transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
      {label && <p className="text-center text-sm text-muted-foreground">{label}</p>}
    </div>
  );
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Failed to create blob'))),
      type,
      quality
    );
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
