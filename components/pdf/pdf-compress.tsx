'use client';

import * as React from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import {
  Archive,
  Check,
  Download,
  FileText,
  Loader2,
  UploadCloud,
  X,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type Level = 'low' | 'medium' | 'high';

const LEVELS: {
  id: Level;
  label: string;
  hint: string;
  scale: number;
  jpeg: number;
}[] = [
  { id: 'low', label: 'Low', hint: 'Best quality, mild compression', scale: 2.0, jpeg: 0.85 },
  { id: 'medium', label: 'Medium', hint: 'Balanced quality and size', scale: 1.4, jpeg: 0.6 },
  { id: 'high', label: 'High', hint: 'Smallest size, lower quality', scale: 0.9, jpeg: 0.4 },
];

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
}

export function PdfCompress() {
  const [file, setFile] = React.useState<File | null>(null);
  const [level, setLevel] = React.useState<Level>('medium');
  const [busy, setBusy] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [originalSize, setOriginalSize] = React.useState(0);
  const [compressedSize, setCompressedSize] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  function ingest(f: File) {
    if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) {
      setError('Please select a PDF file.');
      return;
    }
    setError(null);
    setResultUrl(null);
    setStatus(null);
    setFile(f);
    setOriginalSize(f.size);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) ingest(f);
  }

  function clearAll() {
    setFile(null);
    setResultUrl(null);
    setCompressedSize(0);
    setOriginalSize(0);
    setError(null);
    setStatus(null);
    setProgress(0);
  }

  const savedPct =
    originalSize > 0 && compressedSize > 0
      ? Math.max(0, Math.round((1 - compressedSize / originalSize) * 100))
      : 0;

  async function compress() {
    if (!file) return;
    setBusy(true);
    setError(null);
    setResultUrl(null);
    setProgress(0);
    setStatus('Loading PDF…');
    try {
      const cfg = LEVELS.find((l) => l.id === level)!;
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const pageCount = src.getPageCount();

      const out = await PDFDocument.create();
      const scale = cfg.scale;
      const quality = cfg.jpeg;

      for (let i = 0; i < pageCount; i++) {
        setProgress(Math.round((i / pageCount) * 85));
        setStatus(`Processing page ${i + 1} of ${pageCount}…`);

        const [copied] = await out.copyPages(src, [i]);
        const w = copied.getWidth();
        const h = copied.getHeight();
        out.addPage(copied);

        if (scale >= 2 && quality >= 0.8) {
          continue;
        }
      }

      setProgress(90);
      setStatus('Optimizing output…');

      const data = await out.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      let finalBytes: Uint8Array = data;
      let finalSize = (data as Uint8Array).byteLength;

      if (finalSize >= originalSize * 0.98) {
        setStatus('Re-rendering pages for maximum compression…');
        const rendered = await renderToImages(bytes, scale, quality, (p) =>
          setProgress(40 + Math.round(p * 0.5))
        );
        if (rendered) {
          finalBytes = rendered;
          finalSize = rendered.byteLength;
        }
      }

      const blob = new Blob([finalBytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setCompressedSize(blob.size);
      setProgress(100);
      setStatus('Done! Your compressed PDF is ready.');
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'Could not compress this PDF.'
      );
      setStatus(null);
    } finally {
      setBusy(false);
    }
  }

  async function renderToImages(
    bytes: ArrayBuffer,
    scale: number,
    quality: number,
    onProgress: (pct: number) => void
  ): Promise<Uint8Array | null> {
    try {
      const pdfjs = await import('pdfjs-dist/build/pdf.mjs');
      const workerSrc = (
        await import('pdfjs-dist/build/pdf.worker.mjs?url')
      ).default;
      pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

      const loadingTask = pdfjs.getDocument({ data: bytes });
      const pdf = await loadingTask.promise;
      const out = await PDFDocument.create();

      for (let i = 1; i <= pdf.numPages; i++) {
        onProgress((i / pdf.numPages) * 100);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;

        const jpegBlob = await new Promise<Blob>((resolve) =>
          canvas.toBlob((b) => resolve(b!), 'image/jpeg', quality)
        );
        const jpgBytes = new Uint8Array(await jpegBlob.arrayBuffer());
        const img = await out.embedJpg(jpgBytes);
        const newPage = out.addPage([canvas.width, canvas.height]);
        newPage.drawImage(img, {
          x: 0,
          y: 0,
          width: canvas.width,
          height: canvas.height,
        });
      }

      return out.save({ useObjectStreams: true });
    } catch {
      return null;
    }
  }

  function download() {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = file?.name.replace(/\.pdf$/i, '') + '-compressed.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  React.useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [resultUrl]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        {!file ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
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
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) ingest(e.target.files[0]);
                e.target.value = '';
              }}
            />
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/25 transition-transform group-hover:scale-110">
              <UploadCloud className="h-8 w-8" />
            </div>
            <p className="mt-4 text-base font-semibold">
              Drop a PDF here or click to upload
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose a compression level and reduce your file size
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-2xl glass-card p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-rose-500/10 text-rose-500">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Original size: {formatBytes(originalSize)}
                  </p>
                </div>
                <button
                  onClick={clearAll}
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="rounded-2xl glass-card p-6">
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
                Compression level
              </h3>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {LEVELS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLevel(l.id)}
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

              <div className="mt-5">
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
                  Compress PDF
                </Button>
              </div>
            </div>
          </>
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
            <div className="mt-4 space-y-3">
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-brand transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                {status}
              </p>
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
                <Row label="Original" value={formatBytes(originalSize)} />
                <Row
                  label="Compressed"
                  value={formatBytes(compressedSize)}
                  accent
                />
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
                Download compressed PDF
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                {status}
              </p>
            </div>
          )}

          {!busy && !resultUrl && (
            <div className="mt-4 grid place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 p-8 text-center text-sm text-muted-foreground">
              <Archive className="h-10 w-10 opacity-40" />
              <p className="mt-2">Upload a PDF and pick a level to compress.</p>
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
