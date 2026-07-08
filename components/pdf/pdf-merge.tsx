'use client';

import * as React from 'react';
import { PDFDocument } from 'pdf-lib';
import {
  ArrowDown,
  ArrowUp,
  Check,
  Download,
  FilePlus2,
  GripVertical,
  Loader2,
  Trash2,
  UploadCloud,
  X,
  FileText,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type PdfFile = {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount: number | null;
};

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
}

export function PdfMerge() {
  const [files, setFiles] = React.useState<PdfFile[]>([]);
  const [busy, setBusy] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultSize, setResultSize] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [dragIndex, setDragIndex] = React.useState<number | null>(null);
  const [overIndex, setOverIndex] = React.useState<number | null>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);

  async function ingestFiles(fileList: FileList | File[]) {
    const arr = Array.from(fileList).filter(
      (f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')
    );
    if (arr.length === 0) {
      setError('Please select PDF files only.');
      return;
    }
    setError(null);
    setStatus(null);
    setResultUrl(null);

    const enriched: PdfFile[] = [];
    for (const file of arr) {
      let pageCount: number | null = null;
      try {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
        pageCount = doc.getPageCount();
      } catch {
        pageCount = null;
      }
      enriched.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        file,
        name: file.name,
        size: file.size,
        pageCount,
      });
    }
    setFiles((prev) => [...prev, ...enriched]);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.length) ingestFiles(e.dataTransfer.files);
  }

  function move(from: number, to: number) {
    if (from === to || to < 0 || to >= files.length) return;
    setFiles((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setResultUrl(null);
    setStatus(null);
  }

  function clearAll() {
    setFiles([]);
    setResultUrl(null);
    setStatus(null);
    setError(null);
    setProgress(0);
  }

  async function merge() {
    if (files.length < 2) {
      setError('Add at least two PDF files to merge.');
      return;
    }
    setBusy(true);
    setError(null);
    setResultUrl(null);
    setProgress(0);
    setStatus('Reading files…');
    try {
      const merged = await PDFDocument.create();
      for (let i = 0; i < files.length; i++) {
        setProgress(Math.round((i / files.length) * 80));
        setStatus(`Adding ${files[i].name}…`);
        const bytes = await files[i].file.arrayBuffer();
        const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
        const pages = await merged.copyPages(src, src.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      setStatus('Writing merged PDF…');
      setProgress(90);
      const out = await merged.save();
      const blob = new Blob([out as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setResultSize(blob.size);
      setProgress(100);
      setStatus('Done! Your merged PDF is ready.');
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'Could not merge these PDF files.'
      );
      setStatus(null);
    } finally {
      setBusy(false);
    }
  }

  function download() {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = 'merged.pdf';
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
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) ingestFiles(e.target.files);
              e.target.value = '';
            }}
          />
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/25 transition-transform group-hover:scale-110">
            <UploadCloud className="h-8 w-8" />
          </div>
          <p className="mt-4 text-base font-semibold">
            Drop PDF files here or click to upload
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Select multiple PDFs — you can reorder them after upload
          </p>
        </div>

        {files.length > 0 && (
          <div className="rounded-2xl glass-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
                Files to merge ({files.length})
              </h3>
              <span className="text-xs text-muted-foreground">
                Drag to reorder
              </span>
            </div>
            <ul className="mt-4 space-y-2">
              {files.map((f, i) => (
                <li
                  key={f.id}
                  draggable
                  onDragStart={() => setDragIndex(i)}
                  onDragEnter={() => setOverIndex(i)}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnd={() => {
                    if (dragIndex !== null && overIndex !== null) {
                      move(dragIndex, overIndex);
                    }
                    setDragIndex(null);
                    setOverIndex(null);
                  }}
                  onDrop={(e) => e.preventDefault()}
                  className={cn(
                    'flex items-center gap-3 rounded-xl border bg-background/50 p-3 transition-all',
                    overIndex === i && dragIndex !== null
                      ? 'border-brand-blue ring-2 ring-brand-blue/30'
                      : 'border-border/60',
                    dragIndex === i && 'opacity-50'
                  )}
                >
                  <GripVertical className="h-5 w-5 shrink-0 cursor-grab text-muted-foreground/60" />
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-rose-500/10 text-rose-500">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{f.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatBytes(f.size)}
                      {f.pageCount !== null && ` · ${f.pageCount} pages`}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => move(i, i - 1)}
                      disabled={i === 0}
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
                      aria-label="Move up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => move(i, i + 1)}
                      disabled={i === files.length - 1}
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
                      aria-label="Move down"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => removeFile(f.id)}
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                onClick={merge}
                disabled={busy || files.length < 2}
                className="rounded-xl bg-gradient-brand text-white"
              >
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FilePlus2 className="h-4 w-4" />
                )}
                Merge PDFs
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
              <div className="grid place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 p-6">
                <div className="grid h-14 w-14 place-items-center rounded-xl bg-green-500/10 text-green-500">
                  <Check className="h-7 w-7" />
                </div>
                <p className="mt-3 text-sm font-medium">Merged PDF ready</p>
                <p className="text-xs text-muted-foreground">
                  {formatBytes(resultSize)}
                </p>
              </div>
              <Button
                onClick={download}
                className="w-full rounded-xl bg-gradient-brand text-white"
              >
                <Download className="h-4 w-4" />
                Download merged PDF
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                {status}
              </p>
            </div>
          )}

          {!busy && !resultUrl && (
            <div className="mt-4 grid place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 p-8 text-center text-sm text-muted-foreground">
              <FileText className="h-10 w-10 opacity-40" />
              <p className="mt-2">
                Upload two or more PDFs, then click Merge.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
