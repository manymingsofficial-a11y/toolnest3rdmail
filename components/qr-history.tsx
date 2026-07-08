'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Check,
  Clock,
  Copy,
  Download,
  History as HistoryIcon,
  ScanLine,
  Sparkles,
  Trash2,
  ExternalLink,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useQrHistory } from '@/hooks/use-qr-history';

function formatDate(ts: number) {
  return new Date(ts).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function isUrl(data: string) {
  return /^https?:\/\//i.test(data.trim());
}

export function QrHistoryView() {
  const { items, loaded, remove, clearAll } = useQrHistory();
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  function copyData(id: string, data: string) {
    navigator.clipboard.writeText(data).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1600);
    });
  }

  function downloadPreview(item: (typeof items)[number]) {
    if (!item.preview) return;
    fetch(item.preview)
      .then((r) => r.blob())
      .then((b) => {
        const url = URL.createObjectURL(b);
        const a = document.createElement('a');
        a.href = url;
        a.download = `qr-${item.type}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl glass-card p-5">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-white">
            <HistoryIcon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold tracking-tight">
              Saved QR codes
            </h2>
            <p className="text-xs text-muted-foreground">
              Stored locally in your browser — {items.length}{' '}
              {items.length === 1 ? 'entry' : 'entries'}
            </p>
          </div>
        </div>
        {items.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="rounded-xl">
                <Trash2 className="h-4 w-4" />
                Clear all
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear all history?</AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently removes every saved QR code from this
                  browser. The action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={clearAll}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Clear all
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {!loaded ? (
        <div className="rounded-2xl glass-card p-10 text-center text-sm text-muted-foreground">
          Loading history…
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl glass-card p-12 text-center">
          <HistoryIcon className="mx-auto h-12 w-12 opacity-30" />
          <h3 className="mt-4 text-lg font-semibold">No history yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            QR codes you generate or scan will appear here automatically.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/tools/qr-code-generator">
              <Button className="rounded-xl bg-gradient-brand text-white">
                <Sparkles className="h-4 w-4" />
                Generate a QR code
              </Button>
            </Link>
            <Link href="/tools/qr-scanner">
              <Button variant="outline" className="rounded-xl">
                <ScanLine className="h-4 w-4" />
                Scan a QR code
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const url = isUrl(item.data);
            return (
              <div
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-2xl glass-card p-5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
                      item.kind === 'generated'
                        ? 'bg-gradient-brand text-white'
                        : 'bg-foreground/10 text-foreground'
                    )}
                  >
                    {item.kind === 'generated' ? (
                      <Sparkles className="h-3 w-3" />
                    ) : (
                      <ScanLine className="h-3 w-3" />
                    )}
                    {item.kind === 'generated' ? 'Generated' : 'Scanned'}
                  </span>
                  <button
                    onClick={() => remove(item.id)}
                    className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Delete entry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 grid place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 p-4">
                  {item.preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.preview}
                      alt={item.data}
                      className="max-h-[120px] w-auto rounded-md"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  ) : (
                    <div className="grid h-[120px] place-items-center text-center">
                      <ScanLine className="h-8 w-8 opacity-30" />
                    </div>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {formatDate(item.createdAt)}
                </div>
                <div className="mt-1 text-xs font-medium text-foreground/80">
                  {item.type}
                </div>
                <p className="mt-2 line-clamp-2 break-all rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-xs font-mono text-muted-foreground">
                  {item.data}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {url ? (
                    <a
                      href={item.data}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-lg"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Open
                      </Button>
                    </a>
                  ) : (
                    <Link href="/tools/qr-code-generator">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-lg"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        Open again
                      </Button>
                    </Link>
                  )}
                  {item.preview && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadPreview(item)}
                      className="rounded-lg"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyData(item.id, item.data)}
                    className="rounded-lg"
                  >
                    {copiedId === item.id ? (
                      <Check className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
