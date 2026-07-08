'use client';

import * as React from 'react';
import { Copy, Eraser, CaseSensitive } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type Mode = 'upper' | 'lower' | 'title' | 'sentence' | 'toggle';

function convert(text: string, mode: Mode): string {
  switch (mode) {
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'title':
      return text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    case 'sentence':
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    case 'toggle':
      return text
        .split('')
        .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
        .join('');
  }
}

const MODES: { id: Mode; label: string; sample: string }[] = [
  { id: 'upper', label: 'UPPERCASE', sample: 'HELLO WORLD' },
  { id: 'lower', label: 'lowercase', sample: 'hello world' },
  { id: 'title', label: 'Title Case', sample: 'Hello World' },
  { id: 'sentence', label: 'Sentence case', sample: 'Hello world' },
  { id: 'toggle', label: 'tOGGLE cASE', sample: 'hELLO wORLD' },
];

export function CaseConverter() {
  const [text, setText] = React.useState('');
  const [mode, setMode] = React.useState<Mode>('upper');
  const [copied, setCopied] = React.useState(false);
  const [output, setOutput] = React.useState('');

  React.useEffect(() => {
    setOutput(convert(text, mode));
  }, [text, mode]);

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
            placeholder="Type or paste your text here…"
            className="mt-3 min-h-[240px] resize-none rounded-xl"
          />
          <Button
            onClick={() => setText('')}
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
            Conversion mode
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={cn(
                  'flex items-center gap-2 rounded-xl border px-4 py-3 text-left transition-all',
                  mode === m.id
                    ? 'border-transparent bg-gradient-brand text-white shadow-md shadow-brand-purple/25'
                    : 'border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
                )}
              >
                <CaseSensitive className="h-4 w-4 shrink-0" />
                <div>
                  <span className="block text-sm font-semibold">{m.label}</span>
                  <span
                    className={cn(
                      'block text-xs',
                      mode === m.id ? 'text-white/70' : 'text-muted-foreground/70'
                    )}
                  >
                    {m.sample}
                  </span>
                </div>
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
            <Button
              onClick={copy}
              variant="outline"
              size="sm"
              className="rounded-xl"
            >
              <Copy className="h-4 w-4" />
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <div className="mt-3 min-h-[240px] rounded-xl border border-border/60 bg-background/50 p-4 text-sm whitespace-pre-wrap break-words">
            {output || (
              <span className="text-muted-foreground">
                Converted text will appear here…
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
