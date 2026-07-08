'use client';

import * as React from 'react';
import {
  Check,
  Copy,
  Download,
  Fingerprint,
  RefreshCw,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

function uuidv4(): string {
  const c = globalThis.crypto;
  if (c && typeof c.randomUUID === 'function') {
    return c.randomUUID();
  }
  const arr = new Uint8Array(16);
  c.getRandomValues(arr);
  arr[6] = (arr[6] & 0x0f) | 0x40;
  arr[8] = (arr[8] & 0x3f) | 0x80;
  const hex: string[] = [];
  arr.forEach((b) => hex.push(b.toString(16).padStart(2, '0')));
  return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10, 16).join('')}`;
}

export function UuidGenerator() {
  const [count, setCount] = React.useState(5);
  const [uuids, setUuids] = React.useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = React.useState<number | null>(null);
  const [uppercase, setUppercase] = React.useState(false);

  const generate = React.useCallback(() => {
    const next: string[] = [];
    for (let i = 0; i < count; i++) next.push(uuidv4());
    setUuids(next);
  }, [count]);

  React.useEffect(() => {
    generate();
  }, [generate]);

  const display = uppercase
    ? uuids.map((u) => u.toUpperCase())
    : uuids;

  function copyOne(idx: number) {
    navigator.clipboard.writeText(display[idx]).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1600);
    });
  }

  function downloadTxt() {
    const blob = new Blob([display.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uuids.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Options
          </h3>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Quantity</Label>
              <span className="text-sm font-bold">{count}</span>
            </div>
            <div className="mt-2 flex gap-2">
              {[1, 5, 10, 25, 50].map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
                    count === n
                      ? 'bg-gradient-brand text-white'
                      : 'border border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl border border-border/60 bg-background/40 px-4 py-3">
            <Label className="cursor-pointer text-sm">Uppercase</Label>
            <button
              onClick={() => setUppercase((u) => !u)}
              className={cn(
                'relative h-6 w-11 rounded-full transition-colors',
                uppercase ? 'bg-gradient-brand' : 'bg-muted'
              )}
              aria-label="Toggle uppercase"
            >
              <span
                className={cn(
                  'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
                  uppercase ? 'translate-x-5' : 'translate-x-0.5'
                )}
              />
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button
              onClick={generate}
              className="rounded-xl bg-gradient-brand text-white"
            >
              <RefreshCw className="h-4 w-4" />
              Generate
            </Button>
            <Button
              onClick={downloadTxt}
              variant="outline"
              className="rounded-xl"
            >
              <Download className="h-4 w-4" />
              Download TXT
            </Button>
          </div>
        </div>

        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Generated UUIDs
          </h3>
          <ul className="mt-4 space-y-2">
            {display.map((u, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/50 px-4 py-3"
              >
                <Fingerprint className="h-4 w-4 shrink-0 text-brand-blue" />
                <code className="min-w-0 flex-1 break-all font-mono text-sm font-medium">
                  {u}
                </code>
                <button
                  onClick={() => copyOne(i)}
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Copy UUID"
                >
                  {copiedIdx === i ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            About UUID v4
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            A UUID (Universally Unique Identifier) v4 is a 128-bit random
            identifier. The randomness makes collisions virtually impossible —
            even generating billions of UUIDs, the chance of a duplicate is
            negligible.
          </p>
          <div className="mt-4 rounded-xl border border-border/60 bg-background/50 p-4 text-xs text-muted-foreground">
            <p className="font-mono text-foreground">xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</p>
            <p className="mt-2">
              The <span className="font-mono">4</span> marks version 4;{' '}
              <span className="font-mono">y</span> is 8, 9, a, or b.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
