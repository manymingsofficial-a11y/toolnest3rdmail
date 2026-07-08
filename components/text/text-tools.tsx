'use client';

import * as React from 'react';
import { Copy, Eraser, ListOrdered } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function RemoveDuplicateLines() {
  const [text, setText] = React.useState('');
  const [caseSensitive, setCaseSensitive] = React.useState(true);
  const [output, setOutput] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const { removed, total } = React.useMemo(() => {
    const lines = text.split('\n');
    const seen = new Set<string>();
    const out: string[] = [];
    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        out.push(line);
      }
    }
    return { removed: lines.length - out.length, total: lines.length };
  }, [text, caseSensitive]);

  React.useEffect(() => {
    const lines = text.split('\n');
    const seen = new Set<string>();
    const out: string[] = [];
    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        out.push(line);
      }
    }
    setOutput(out.join('\n'));
  }, [text, caseSensitive]);

  function copy() {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Input
          </h3>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste lines with duplicates here…"
            className="mt-3 min-h-[240px] resize-none rounded-xl font-mono text-sm"
          />
          <div className="mt-3 flex items-center justify-between rounded-xl border border-border/60 bg-background/40 px-4 py-3">
            <Label className="cursor-pointer text-sm">Case sensitive</Label>
            <Switch checked={caseSensitive} onCheckedChange={setCaseSensitive} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl glass-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
              Output
            </h3>
            <Button onClick={copy} variant="outline" size="sm" className="rounded-xl">
              <Copy className="h-4 w-4" />
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <div className="mt-3 min-h-[240px] rounded-xl border border-border/60 bg-background/50 p-4 font-mono text-sm whitespace-pre-wrap break-words">
            {output || (
              <span className="font-sans text-muted-foreground">
                Unique lines will appear here…
              </span>
            )}
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {total} lines → {total - removed} lines
            </span>
            <span className="font-semibold text-green-600 dark:text-green-400">
              {removed} removed
            </span>
          </div>
          <Button
            onClick={() => {
              setText('');
              setOutput('');
            }}
            variant="outline"
            size="sm"
            className="mt-3 rounded-xl"
          >
            <Eraser className="h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
}

type SortMode = 'az' | 'za' | 'reverse' | 'removeEmpty';

const SORT_MODES: { id: SortMode; label: string }[] = [
  { id: 'az', label: 'Sort A → Z' },
  { id: 'za', label: 'Sort Z → A' },
  { id: 'reverse', label: 'Reverse order' },
  { id: 'removeEmpty', label: 'Remove empty lines' },
];

export function TextSorter() {
  const [text, setText] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [copied, setCopied] = React.useState(false);
  const [activeMode, setActiveMode] = React.useState<SortMode>('az');

  function apply(mode: SortMode) {
    setActiveMode(mode);
    const lines = text.split('\n');
    let out: string[];
    switch (mode) {
      case 'az':
        out = [...lines].sort((a, b) => a.localeCompare(b));
        break;
      case 'za':
        out = [...lines].sort((a, b) => b.localeCompare(a));
        break;
      case 'reverse':
        out = [...lines].reverse();
        break;
      case 'removeEmpty':
        out = lines.filter((l) => l.trim() !== '');
        break;
    }
    setOutput(out.join('\n'));
  }

  function copy() {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Input
          </h3>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste lines to sort here…"
            className="mt-3 min-h-[240px] resize-none rounded-xl font-mono text-sm"
          />
          <Button
            onClick={() => {
              setText('');
              setOutput('');
            }}
            variant="outline"
            size="sm"
            className="mt-3 rounded-xl"
          >
            <Eraser className="h-4 w-4" />
            Clear
          </Button>
        </div>

        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Sort options
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {SORT_MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => apply(m.id)}
                className={cn(
                  'flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all',
                  activeMode === m.id
                    ? 'border-transparent bg-gradient-brand text-white shadow-md shadow-brand-purple/25'
                    : 'border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
                )}
              >
                <ListOrdered className="h-4 w-4 shrink-0" />
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl glass-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
              Output
            </h3>
            <Button onClick={copy} variant="outline" size="sm" className="rounded-xl">
              <Copy className="h-4 w-4" />
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <div className="mt-3 min-h-[240px] rounded-xl border border-border/60 bg-background/50 p-4 font-mono text-sm whitespace-pre-wrap break-words">
            {output || (
              <span className="font-sans text-muted-foreground">
                Sorted lines will appear here…
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
