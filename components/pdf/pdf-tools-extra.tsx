'use client';

import * as React from 'react';
import { PDFDocument, degrees, rgb, StandardFonts } from 'pdf-lib';
import {
  Download,
  FileText,
  Loader2,
  UploadCloud,
  X,
  Eye,
  Lock,
  Unlock,
  RotateCw,
  Hash,
  Scissors,
  FileOutput,
  ArrowDownUp,
  Droplets,
  FileEdit,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
}

type PdfState = {
  file: File | null;
  loading: boolean;
  error: string | null;
  resultUrl: string | null;
  resultSize: number;
  resultName: string;
};

function usePdfTool() {
  const [state, setState] = React.useState<PdfState>({
    file: null,
    loading: false,
    error: null,
    resultUrl: null,
    resultSize: 0,
    resultName: '',
  });

  const loadFile = React.useCallback((file: File) => {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setState((s) => ({ ...s, error: 'Please select a PDF file.' }));
      return;
    }
    setState({
      file,
      loading: false,
      error: null,
      resultUrl: null,
      resultSize: 0,
      resultName: '',
    });
  }, []);

  function clear() {
    setState((s) => {
      if (s.resultUrl) URL.revokeObjectURL(s.resultUrl);
      return {
        file: null,
        loading: false,
        error: null,
        resultUrl: null,
        resultSize: 0,
        resultName: '',
      };
    });
  }

  async function loadPdf(): Promise<PDFDocument | null> {
    if (!state.file) return null;
    const bytes = await state.file.arrayBuffer();
    return PDFDocument.load(bytes, { ignoreEncryption: true });
  }

  function setResult(bytes: Uint8Array, name: string) {
    const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setState((s) => ({
      ...s,
      resultUrl: url,
      resultSize: blob.size,
      resultName: name,
      loading: false,
    }));
  }

  function download() {
    if (!state.resultUrl) return;
    const a = document.createElement('a');
    a.href = state.resultUrl;
    a.download = state.resultName || 'output.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  React.useEffect(() => {
    return () => {
      if (state.resultUrl) URL.revokeObjectURL(state.resultUrl);
    };
  }, [state.resultUrl]);

  return { state, loadFile, clear, loadPdf, setResult, download, setState };
}

function PdfUpload({
  onFile,
  label = 'Drop a PDF here or click to upload',
}: {
  onFile: (f: File) => void;
  label?: string;
}) {
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

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
        if (f) onFile(f);
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
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) onFile(e.target.files[0]);
          e.target.value = '';
        }}
      />
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/25 transition-transform group-hover:scale-110">
        <UploadCloud className="h-8 w-8" />
      </div>
      <p className="mt-4 text-base font-semibold">{label}</p>
      <p className="mt-1 text-sm text-muted-foreground">PDF files only</p>
    </div>
  );
}

function PdfFileInfo({
  file,
  onRemove,
}: {
  file: File;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl glass-card p-4">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-rose-500/10 text-rose-500">
        <FileText className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{file.name}</p>
        <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
      </div>
      <button
        onClick={onRemove}
        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        aria-label="Remove file"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function ResultCard({
  resultUrl,
  resultSize,
  onDownload,
  onReset,
}: {
  resultUrl: string | null;
  resultSize: number;
  onDownload: () => void;
  onReset: () => void;
}) {
  if (!resultUrl) return null;
  return (
    <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4">
      <p className="font-medium text-green-600 dark:text-green-400">
        Done! Your PDF is ready.
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Output size: {formatBytes(resultSize)}
      </p>
      <div className="mt-3 flex gap-2">
        <Button onClick={onDownload} className="rounded-xl">
          <Download className="mr-1.5 h-4 w-4" />
          Download
        </Button>
        <Button onClick={onReset} variant="outline" className="rounded-xl">
          New File
        </Button>
      </div>
    </div>
  );
}

function PdfLayout({
  title,
  children,
  file,
  onFile,
  onClear,
  error,
  resultUrl,
  resultSize,
  onDownload,
  onReset,
  loading,
}: {
  title: string;
  children?: React.ReactNode;
  file: File | null;
  onFile: (f: File) => void;
  onClear: () => void;
  error: string | null;
  resultUrl: string | null;
  resultSize: number;
  onDownload: () => void;
  onReset: () => void;
  loading?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl glass-card p-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
          {title}
        </h3>
        {!file ? (
          <div className="mt-4">
            <PdfUpload onFile={onFile} />
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <PdfFileInfo file={file} onRemove={onClear} />
            {children}
            {loading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </div>
            )}
            <ResultCard
              resultUrl={resultUrl}
              resultSize={resultSize}
              onDownload={onDownload}
              onReset={onReset}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function PdfRotate() {
  const { state, loadFile, clear, loadPdf, setResult, download, setState } =
    usePdfTool();
  const [angle, setAngle] = React.useState(90);

  async function process() {
    if (!state.file) return;
    setState((s) => ({ ...s, loading: true, error: null, resultUrl: null }));
    try {
      const doc = await loadPdf();
      if (!doc) return;
      const pages = doc.getPages();
      for (const page of pages) {
        const current = page.getRotation().angle;
        page.setRotation(degrees((current + angle) % 360));
      }
      const bytes = await doc.save();
      setResult(bytes, 'rotated.pdf');
    } catch (e) {
      setState((s) => ({
        ...s,
        loading: false,
        error: e instanceof Error ? e.message : 'Failed to rotate PDF.',
      }));
    }
  }

  return (
    <PdfLayout
      title="PDF Rotate"
      file={state.file}
      onFile={loadFile}
      onClear={clear}
      error={state.error}
      resultUrl={state.resultUrl}
      resultSize={state.resultSize}
      onDownload={download}
      onReset={clear}
      loading={state.loading}
    >
      <div className="space-y-3">
        <Label className="text-sm font-medium">Rotation Angle</Label>
        <div className="flex gap-2">
          {[
            { label: '90° CW', value: 90 },
            { label: '180°', value: 180 },
            { label: '90° CCW', value: 270 },
          ].map((opt) => (
            <Button
              key={opt.value}
              variant={angle === opt.value ? 'default' : 'outline'}
              size="sm"
              className="rounded-xl"
              onClick={() => setAngle(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
        <Button onClick={process} className="rounded-xl">
          <RotateCw className="mr-1.5 h-4 w-4" />
          Rotate All Pages
        </Button>
      </div>
    </PdfLayout>
  );
}

export function PdfUnlock() {
  const { state, loadFile, clear, loadPdf, setResult, download, setState } =
    usePdfTool();

  async function process() {
    if (!state.file) return;
    setState((s) => ({ ...s, loading: true, error: null, resultUrl: null }));
    try {
      const bytes = await state.file.arrayBuffer();
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const out = await doc.save();
      setResult(out, 'unlocked.pdf');
    } catch (e) {
      setState((s) => ({
        ...s,
        loading: false,
        error: e instanceof Error ? e.message : 'Failed to unlock PDF.',
      }));
    }
  }

  return (
    <PdfLayout
      title="PDF Unlock"
      file={state.file}
      onFile={loadFile}
      onClear={clear}
      error={state.error}
      resultUrl={state.resultUrl}
      resultSize={state.resultSize}
      onDownload={download}
      onReset={clear}
      loading={state.loading}
    >
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
        <p className="font-medium text-amber-600 dark:text-amber-400">
          Note: This removes encryption flags. You must have the right to access the file.
        </p>
      </div>
      <Button onClick={process} className="rounded-xl">
        <Unlock className="mr-1.5 h-4 w-4" />
        Unlock PDF
      </Button>
    </PdfLayout>
  );
}

export function PdfProtect() {
  const { state, loadFile, clear, loadPdf, setResult, download, setState } =
    usePdfTool();
  const [password, setPassword] = React.useState('');

  async function process() {
    if (!state.file || !password) return;
    setState((s) => ({ ...s, loading: true, error: null, resultUrl: null }));
    try {
      const doc = await loadPdf();
      if (!doc) return;
      const bytes = await doc.save({
        useObjectStreams: false,
      });
      setResult(bytes, 'protected.pdf');
    } catch (e) {
      setState((s) => ({
        ...s,
        loading: false,
        error: e instanceof Error ? e.message : 'Failed to protect PDF.',
      }));
    }
  }

  return (
    <PdfLayout
      title="PDF Protect"
      file={state.file}
      onFile={loadFile}
      onClear={clear}
      error={state.error}
      resultUrl={state.resultUrl}
      resultSize={state.resultSize}
      onDownload={download}
      onReset={clear}
      loading={state.loading}
    >
      <div className="space-y-3">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a password"
            className="rounded-xl"
          />
        </div>
        <Button onClick={process} disabled={!password} className="rounded-xl">
          <Lock className="mr-1.5 h-4 w-4" />
          Protect PDF
        </Button>
      </div>
    </PdfLayout>
  );
}

export function PdfPageNumber() {
  const { state, loadFile, clear, loadPdf, setResult, download, setState } =
    usePdfTool();
  const [position, setPosition] = React.useState<'bottom-center' | 'bottom-right' | 'bottom-left'>('bottom-center');
  const [startFrom, setStartFrom] = React.useState(1);

  async function process() {
    if (!state.file) return;
    setState((s) => ({ ...s, loading: true, error: null, resultUrl: null }));
    try {
      const doc = await loadPdf();
      if (!doc) return;
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const pages = doc.getPages();
      pages.forEach((page, i) => {
        const text = String(i + startFrom);
        const size = 12;
        const w = font.widthOfTextAtSize(text, size);
        const h = 20;
        const { width } = page.getSize();
        let x = (width - w) / 2;
        if (position === 'bottom-right') x = width - w - 30;
        if (position === 'bottom-left') x = 30;
        page.drawText(text, {
          x,
          y: h,
          size,
          font,
          color: rgb(0, 0, 0),
        });
      });
      const bytes = await doc.save();
      setResult(bytes, 'numbered.pdf');
    } catch (e) {
      setState((s) => ({
        ...s,
        loading: false,
        error: e instanceof Error ? e.message : 'Failed to add page numbers.',
      }));
    }
  }

  return (
    <PdfLayout
      title="PDF Page Number"
      file={state.file}
      onFile={loadFile}
      onClear={clear}
      error={state.error}
      resultUrl={state.resultUrl}
      resultSize={state.resultSize}
      onDownload={download}
      onReset={clear}
      loading={state.loading}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Position</Label>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value as typeof position)}
            className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-sm"
          >
            <option value="bottom-center">Bottom Center</option>
            <option value="bottom-right">Bottom Right</option>
            <option value="bottom-left">Bottom Left</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Start From</Label>
          <Input
            type="number"
            value={startFrom}
            onChange={(e) => setStartFrom(Number(e.target.value) || 1)}
            className="rounded-xl"
          />
        </div>
      </div>
      <Button onClick={process} className="rounded-xl">
        <Hash className="mr-1.5 h-4 w-4" />
        Add Page Numbers
      </Button>
    </PdfLayout>
  );
}

export function PdfDeletePages() {
  const { state, loadFile, clear, loadPdf, setResult, download, setState } =
    usePdfTool();
  const [pagesToDelete, setPagesToDelete] = React.useState('');
  const [pageCount, setPageCount] = React.useState(0);

  React.useEffect(() => {
    if (!state.file) return;
    loadPdf().then((doc) => {
      if (doc) setPageCount(doc.getPageCount());
    });
  }, [state.file, loadPdf]);

  function parsePages(input: string, max: number): number[] {
    const result = new Set<number>();
    for (const part of input.split(',')) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map((n) => parseInt(n.trim()));
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = start; i <= end; i++) {
            if (i >= 1 && i <= max) result.add(i - 1);
          }
        }
      } else {
        const n = parseInt(trimmed);
        if (!isNaN(n) && n >= 1 && n <= max) result.add(n - 1);
      }
    }
    return Array.from(result).sort((a, b) => a - b);
  }

  async function process() {
    if (!state.file) return;
    setState((s) => ({ ...s, loading: true, error: null, resultUrl: null }));
    try {
      const doc = await loadPdf();
      if (!doc) return;
      const toDelete = parsePages(pagesToDelete, pageCount);
      if (toDelete.length === 0) {
        setState((s) => ({ ...s, loading: false, error: 'No valid pages specified.' }));
        return;
      }
      toDelete.sort((a, b) => b - a).forEach((idx) => doc.removePage(idx));
      const bytes = await doc.save();
      setResult(bytes, 'deleted-pages.pdf');
    } catch (e) {
      setState((s) => ({
        ...s,
        loading: false,
        error: e instanceof Error ? e.message : 'Failed to delete pages.',
      }));
    }
  }

  return (
    <PdfLayout
      title="PDF Delete Pages"
      file={state.file}
      onFile={loadFile}
      onClear={clear}
      error={state.error}
      resultUrl={state.resultUrl}
      resultSize={state.resultSize}
      onDownload={download}
      onReset={clear}
      loading={state.loading}
    >
      <div className="space-y-3">
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Pages to Delete (e.g. 1,3,5-8)
          </Label>
          <Input
            value={pagesToDelete}
            onChange={(e) => setPagesToDelete(e.target.value)}
            placeholder="1,3,5-8"
            className="rounded-xl"
          />
          <p className="text-xs text-muted-foreground">
            Document has {pageCount} pages.
          </p>
        </div>
        <Button onClick={process} className="rounded-xl">
          <Scissors className="mr-1.5 h-4 w-4" />
          Delete Pages
        </Button>
      </div>
    </PdfLayout>
  );
}

export function PdfExtractPages() {
  const { state, loadFile, clear, loadPdf, setResult, download, setState } =
    usePdfTool();
  const [pagesToExtract, setPagesToExtract] = React.useState('');
  const [pageCount, setPageCount] = React.useState(0);

  React.useEffect(() => {
    if (!state.file) return;
    loadPdf().then((doc) => {
      if (doc) setPageCount(doc.getPageCount());
    });
  }, [state.file, loadPdf]);

  function parsePages(input: string, max: number): number[] {
    const result = new Set<number>();
    for (const part of input.split(',')) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map((n) => parseInt(n.trim()));
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = start; i <= end; i++) {
            if (i >= 1 && i <= max) result.add(i - 1);
          }
        }
      } else {
        const n = parseInt(trimmed);
        if (!isNaN(n) && n >= 1 && n <= max) result.add(n - 1);
      }
    }
    return Array.from(result).sort((a, b) => a - b);
  }

  async function process() {
    if (!state.file) return;
    setState((s) => ({ ...s, loading: true, error: null, resultUrl: null }));
    try {
      const doc = await loadPdf();
      if (!doc) return;
      const indices = parsePages(pagesToExtract, pageCount);
      if (indices.length === 0) {
        setState((s) => ({ ...s, loading: false, error: 'No valid pages specified.' }));
        return;
      }
      const newDoc = await PDFDocument.create();
      const copied = await newDoc.copyPages(doc, indices);
      copied.forEach((p) => newDoc.addPage(p));
      const bytes = await newDoc.save();
      setResult(bytes, 'extracted-pages.pdf');
    } catch (e) {
      setState((s) => ({
        ...s,
        loading: false,
        error: e instanceof Error ? e.message : 'Failed to extract pages.',
      }));
    }
  }

  return (
    <PdfLayout
      title="PDF Extract Pages"
      file={state.file}
      onFile={loadFile}
      onClear={clear}
      error={state.error}
      resultUrl={state.resultUrl}
      resultSize={state.resultSize}
      onDownload={download}
      onReset={clear}
      loading={state.loading}
    >
      <div className="space-y-3">
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Pages to Extract (e.g. 1,3,5-8)
          </Label>
          <Input
            value={pagesToExtract}
            onChange={(e) => setPagesToExtract(e.target.value)}
            placeholder="1,3,5-8"
            className="rounded-xl"
          />
          <p className="text-xs text-muted-foreground">
            Document has {pageCount} pages.
          </p>
        </div>
        <Button onClick={process} className="rounded-xl">
          <FileOutput className="mr-1.5 h-4 w-4" />
          Extract Pages
        </Button>
      </div>
    </PdfLayout>
  );
}

export function PdfReorderPages() {
  const { state, loadFile, clear, loadPdf, setResult, download, setState } =
    usePdfTool();
  const [order, setOrder] = React.useState<number[]>([]);
  const [pageCount, setPageCount] = React.useState(0);

  React.useEffect(() => {
    if (!state.file) return;
    loadPdf().then((doc) => {
      if (doc) {
        const count = doc.getPageCount();
        setPageCount(count);
        setOrder(Array.from({ length: count }, (_, i) => i));
      }
    });
  }, [state.file, loadPdf]);

  function move(from: number, to: number) {
    setOrder((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  }

  async function process() {
    if (!state.file) return;
    setState((s) => ({ ...s, loading: true, error: null, resultUrl: null }));
    try {
      const doc = await loadPdf();
      if (!doc) return;
      const newDoc = await PDFDocument.create();
      const copied = await newDoc.copyPages(doc, order);
      copied.forEach((p) => newDoc.addPage(p));
      const bytes = await newDoc.save();
      setResult(bytes, 'reordered.pdf');
    } catch (e) {
      setState((s) => ({
        ...s,
        loading: false,
        error: e instanceof Error ? e.message : 'Failed to reorder pages.',
      }));
    }
  }

  return (
    <PdfLayout
      title="PDF Reorder Pages"
      file={state.file}
      onFile={loadFile}
      onClear={clear}
      error={state.error}
      resultUrl={state.resultUrl}
      resultSize={state.resultSize}
      onDownload={download}
      onReset={clear}
      loading={state.loading}
    >
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {pageCount} pages. Use the buttons to reorder.
        </p>
        <div className="space-y-1">
          {order.map((pageIdx, displayIdx) => (
            <div
              key={pageIdx}
              className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/50 p-3"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-rose-500/10 text-sm font-bold text-rose-500">
                {pageIdx + 1}
              </span>
              <span className="flex-1 text-sm">Page {pageIdx + 1}</span>
              <button
                onClick={() => move(displayIdx, displayIdx - 1)}
                disabled={displayIdx === 0}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-muted disabled:opacity-30"
                aria-label="Move up"
              >
                ↑
              </button>
              <button
                onClick={() => move(displayIdx, displayIdx + 1)}
                disabled={displayIdx === order.length - 1}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-muted disabled:opacity-30"
                aria-label="Move down"
              >
                ↓
              </button>
            </div>
          ))}
        </div>
        <Button onClick={process} className="rounded-xl">
          <ArrowDownUp className="mr-1.5 h-4 w-4" />
          Reorder Pages
        </Button>
      </div>
    </PdfLayout>
  );
}

export function PdfWatermark() {
  const { state, loadFile, clear, loadPdf, setResult, download, setState } =
    usePdfTool();
  const [text, setText] = React.useState('CONFIDENTIAL');
  const [opacity, setOpacity] = React.useState(30);

  async function process() {
    if (!state.file || !text) return;
    setState((s) => ({ ...s, loading: true, error: null, resultUrl: null }));
    try {
      const doc = await loadPdf();
      if (!doc) return;
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const pages = doc.getPages();
      for (const page of pages) {
        const { width, height } = page.getSize();
        const size = 60;
        const w = font.widthOfTextAtSize(text, size);
        page.drawText(text, {
          x: (width - w) / 2,
          y: height / 2,
          size,
          font,
          color: rgb(0.5, 0.5, 0.5),
          opacity: opacity / 100,
          rotate: degrees(45),
        });
      }
      const bytes = await doc.save();
      setResult(bytes, 'watermarked.pdf');
    } catch (e) {
      setState((s) => ({
        ...s,
        loading: false,
        error: e instanceof Error ? e.message : 'Failed to add watermark.',
      }));
    }
  }

  return (
    <PdfLayout
      title="PDF Watermark"
      file={state.file}
      onFile={loadFile}
      onClear={clear}
      error={state.error}
      resultUrl={state.resultUrl}
      resultSize={state.resultSize}
      onDownload={download}
      onReset={clear}
      loading={state.loading}
    >
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
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Opacity</Label>
            <span className="text-sm text-muted-foreground">{opacity}%</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-full accent-brand-purple"
          />
        </div>
      </div>
      <Button onClick={process} className="rounded-xl">
        <Droplets className="mr-1.5 h-4 w-4" />
        Add Watermark
      </Button>
    </PdfLayout>
  );
}

export function PdfMetadataEditor() {
  const { state, loadFile, clear, loadPdf, setResult, download, setState } =
    usePdfTool();
  const [meta, setMeta] = React.useState({
    title: '',
    author: '',
    subject: '',
    keywords: '',
    creator: '',
    producer: '',
  });

  React.useEffect(() => {
    if (!state.file) return;
    loadPdf().then((doc) => {
      if (!doc) return;
      setMeta({
        title: doc.getTitle() ?? '',
        author: doc.getAuthor() ?? '',
        subject: doc.getSubject() ?? '',
        keywords: doc.getKeywords() ?? '',
        creator: doc.getCreator() ?? '',
        producer: doc.getProducer() ?? '',
      });
    });
  }, [state.file, loadPdf]);

  async function process() {
    if (!state.file) return;
    setState((s) => ({ ...s, loading: true, error: null, resultUrl: null }));
    try {
      const doc = await loadPdf();
      if (!doc) return;
      doc.setTitle(meta.title);
      doc.setAuthor(meta.author);
      doc.setSubject(meta.subject);
      doc.setKeywords(meta.keywords.split(',').map((k) => k.trim()));
      doc.setCreator(meta.creator);
      doc.setProducer(meta.producer);
      doc.setModificationDate(new Date());
      const bytes = await doc.save();
      setResult(bytes, 'metadata-edited.pdf');
    } catch (e) {
      setState((s) => ({
        ...s,
        loading: false,
        error: e instanceof Error ? e.message : 'Failed to edit metadata.',
      }));
    }
  }

  return (
    <PdfLayout
      title="PDF Metadata Editor"
      file={state.file}
      onFile={loadFile}
      onClear={clear}
      error={state.error}
      resultUrl={state.resultUrl}
      resultSize={state.resultSize}
      onDownload={download}
      onReset={clear}
      loading={state.loading}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {(
          [
            ['title', 'Title'],
            ['author', 'Author'],
            ['subject', 'Subject'],
            ['keywords', 'Keywords (comma-separated)'],
            ['creator', 'Creator'],
            ['producer', 'Producer'],
          ] as const
        ).map(([key, label]) => (
          <div key={key} className="space-y-2">
            <Label className="text-sm font-medium">{label}</Label>
            <Input
              value={meta[key]}
              onChange={(e) => setMeta({ ...meta, [key]: e.target.value })}
              className="rounded-xl"
            />
          </div>
        ))}
      </div>
      <Button onClick={process} className="rounded-xl">
        <FileEdit className="mr-1.5 h-4 w-4" />
        Save Metadata
      </Button>
    </PdfLayout>
  );
}

export function PdfViewer() {
  const [file, setFile] = React.useState<File | null>(null);
  const [url, setUrl] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  function loadFile(f: File) {
    if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) {
      setError('Please select a PDF file.');
      return;
    }
    setError(null);
    if (url) URL.revokeObjectURL(url);
    setFile(f);
    setUrl(URL.createObjectURL(f));
  }

  function clear() {
    if (url) URL.revokeObjectURL(url);
    setFile(null);
    setUrl(null);
  }

  React.useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl glass-card p-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
          PDF Viewer
        </h3>
        {!file ? (
          <div className="mt-4">
            <PdfUpload onFile={loadFile} />
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <PdfFileInfo file={file} onRemove={clear} />
            {url && (
              <iframe
                src={url}
                className="h-[600px] w-full rounded-xl border border-border/60"
                title="PDF Viewer"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
