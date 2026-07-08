'use client';

import * as React from 'react';
import { PDFDocument } from 'pdf-lib';
import {
  Download,
  FileText,
  Loader2,
  Scissors,
  UploadCloud,
  X,
  Check,
  Files,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Mode = 'ranges' | 'each';

type SplitResult = {
  name: string;
  url: string;
  size: number;
  pages: string;
};

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
}

function parseRanges(input: string, max: number): number[][] {
  const groups: number[][] = [];
  for (const part of input.split(',')) {
    const seg = part.trim();
    if (!seg) continue;
    if (seg.includes('-')) {
      const [a, b] = seg.split('-').map((n) => parseInt(n.trim(), 10));
      if (Number.isNaN(a) || Number.isNaN(b)) continue;
      const lo = Math.min(a, b);
      const hi = Math.max(a, b);
      const pages: number[] = [];
      for (let p = lo; p <= hi; p++) {
        if (p >= 1 && p <= max) pages.push(p - 1);
      }
      if (pages.length) groups.push(pages);
    } else {
      const n = parseInt(seg, 10);
      if (!Number.isNaN(n) && n >= 1 && n <= max) groups.push([n - 1]);
    }
  }
  return groups;
}

export function PdfSplit() {
  const [file, setFile] = React.useState<File | null>(null);
  const [pageCount, setPageCount] = React.useState(0);
  const [mode, setMode] = React.useState<Mode>('ranges');
  const [rangeText, setRangeText] = React.useState('1-3, 5, 7-9');
  const [busy, setBusy] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [results, setResults] = React.useState<SplitResult[]>([]);
  const [dragging, setDragging] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  async function ingest(f: File) {
    if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) {
      setError('Please select a PDF file.');
      return;
    }
    setError(null);
    setResults([]);
    setStatus(null);
    setFile(f);
    try {
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
      setPageCount(doc.getPageCount());
    } catch {
      setError('Could not read this PDF. It may be corrupted or password-protected.');
      setFile(null);
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) ingest(f);
  }

  function clearAll() {
    setFile(null);
    setPageCount(0);
    setResults([]);
    setError(null);
    setStatus(null);
    setProgress(0);
  }

  async function split() {
    if (!file) return;
    setBusy(true);
    setError(null);
    setResults([]);
    setProgress(0);
    setStatus('Loading PDF…');
    try {
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const total = src.getPageCount();

      let groups: number[][];
      if (mode === 'each') {
        groups = Array.from({ length: total }, (_, i) => [i]);
      } else {
        groups = parseRanges(rangeText, total);
        if (groups.length === 0) {
          setError(
            `No valid page ranges found. Use 1-based page numbers between 1 and ${total}.`
          );
          setBusy(false);
          return;
        }
      }

      const out: SplitResult[] = [];
      for (let i = 0; i < groups.length; i++) {
        setProgress(Math.round((i / groups.length) * 90));
        setStatus(`Splitting part ${i + 1} of ${groups.length}…`);
        const doc = await PDFDocument.create();
        const pages = await doc.copyPages(src, groups[i]);
        pages.forEach((p) => doc.addPage(p));
        const data = await doc.save();
        const blob = new Blob([data as BlobPart], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const pageLabel =
          groups[i].length === 1
            ? `Page ${groups[i][0] + 1}`
            : `Pages ${groups[i][0] + 1}-${groups[i][groups[i].length - 1] + 1}`;
        out.push({
          name: `${file.name.replace(/\.pdf$/i, '')}-part-${i + 1}.pdf`,
          url,
          size: blob.size,
          pages: pageLabel,
        });
      }
      setResults(out);
      setProgress(100);
      setStatus(`Done! ${out.length} file${out.length === 1 ? '' : 's'} created.`);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'Could not split this PDF.'
      );
      setStatus(null);
    } finally {
      setBusy(false);
    }
  }

  function downloadOne(r: SplitResult) {
    const a = document.createElement('a');
    a.href = r.url;
    a.download = r.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function downloadAll() {
    results.forEach((r, i) => setTimeout(() => downloadOne(r), i * 250));
  }

  React.useEffect(() => {
    return () => {
      results.forEach((r) => URL.revokeObjectURL(r.url));
    };
  }, [results]);

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
              Split it by page range or into individual pages
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
                    {formatBytes(file.size)} · {pageCount} pages
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
                Split mode
              </h3>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button
                  onClick={() => setMode('ranges')}
                  className={cn(
                    'rounded-xl border px-4 py-3 text-left transition-all',
                    mode === 'ranges'
                      ? 'border-transparent bg-gradient-brand text-white shadow-md shadow-brand-purple/25'
                      : 'border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
                  )}
                >
                  <span className="block text-sm font-semibold">
                    By page range
                  </span>
                  <span
                    className={cn(
                      'mt-0.5 block text-xs',
                      mode === 'ranges' ? 'text-white/80' : 'text-muted-foreground/80'
                    )}
                  >
                    e.g. 1-3, 5, 7-9
                  </span>
                </button>
                <button
                  onClick={() => setMode('each')}
                  className={cn(
                    'rounded-xl border px-4 py-3 text-left transition-all',
                    mode === 'each'
                      ? 'border-transparent bg-gradient-brand text-white shadow-md shadow-brand-purple/25'
                      : 'border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
                  )}
                >
                  <span className="block text-sm font-semibold">
                    Every page
                  </span>
                  <span
                    className={cn(
                      'mt-0.5 block text-xs',
                      mode === 'each' ? 'text-white/80' : 'text-muted-foreground/80'
                    )}
                  >
                    One PDF per page
                  </span>
                </button>
              </div>

              {mode === 'ranges' && (
                <div className="mt-4">
                  <Label className="text-sm font-medium">Page ranges</Label>
                  <Input
                    value={rangeText}
                    onChange={(e) => setRangeText(e.target.value)}
                    placeholder="1-3, 5, 7-9"
                    className="mt-1.5 rounded-xl font-mono"
                  />
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Use 1-based page numbers. Separate ranges with commas. The
                    PDF has {pageCount} pages.
                  </p>
                </div>
              )}

              <div className="mt-5">
                <Button
                  onClick={split}
                  disabled={busy}
                  className="rounded-xl bg-gradient-brand text-white"
                >
                  {busy ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Scissors className="h-4 w-4" />
                  )}
                  Split PDF
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

          {!busy && results.length > 0 && (
            <div className="mt-4 space-y-3">
              <div className="grid place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 p-5">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-green-500/10 text-green-500">
                  <Check className="h-6 w-6" />
                </div>
                <p className="mt-2 text-sm font-medium">
                  {results.length} file{results.length === 1 ? '' : 's'} ready
                </p>
              </div>
              <ul className="max-h-[260px] space-y-2 overflow-y-auto pr-1">
                {results.map((r) => (
                  <li
                    key={r.url}
                    className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/50 p-2.5"
                  >
                    <Files className="h-4 w-4 shrink-0 text-rose-500" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium">{r.pages}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {formatBytes(r.size)}
                      </p>
                    </div>
                    <button
                      onClick={() => downloadOne(r)}
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      aria-label="Download"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
              <Button
                onClick={downloadAll}
                className="w-full rounded-xl bg-gradient-brand text-white"
              >
                <Download className="h-4 w-4" />
                Download all
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                {status}
              </p>
            </div>
          )}

          {!busy && results.length === 0 && (
            <div className="mt-4 grid place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 p-8 text-center text-sm text-muted-foreground">
              <Scissors className="h-10 w-10 opacity-40" />
              <p className="mt-2">Upload a PDF and choose a split mode.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
