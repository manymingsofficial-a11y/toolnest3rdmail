'use client';

import * as React from 'react';
import { Copy, Eraser, Hash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

function analyze(text: string) {
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentences = text.trim() ? (text.match(/[^.!?]+[.!?]+/g) || [text]).length : 0;
  const paragraphs = text.trim() ? text.trim().split(/\n+/).filter(Boolean).length : 0;
  const lines = text ? text.split('\n').length : 0;
  const readingTime = Math.max(1, Math.round(words / 200));
  return { chars, charsNoSpaces, words, sentences, paragraphs, lines, readingTime };
}

export function WordCounter() {
  const [text, setText] = React.useState('');
  const [copied, setCopied] = React.useState(false);
  const stats = React.useMemo(() => analyze(text), [text]);

  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  const items: { label: string; value: number }[] = [
    { label: 'Words', value: stats.words },
    { label: 'Characters', value: stats.chars },
    { label: 'Characters (no spaces)', value: stats.charsNoSpaces },
    { label: 'Sentences', value: stats.sentences },
    { label: 'Paragraphs', value: stats.paragraphs },
    { label: 'Lines', value: stats.lines },
    { label: 'Reading time', value: stats.readingTime },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="space-y-4">
        <div className="rounded-2xl glass-card p-6">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here…"
            className="min-h-[300px] resize-none rounded-xl"
          />
          <div className="mt-3 flex gap-2">
            <Button onClick={copy} variant="outline" size="sm" className="rounded-xl">
              <Copy className="h-4 w-4" />
              {copied ? 'Copied' : 'Copy'}
            </Button>
            <Button
              onClick={() => setText('')}
              variant="outline"
              size="sm"
              className="rounded-xl"
            >
              <Eraser className="h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Statistics
          </h3>
          <div className="mt-4 space-y-3">
            {items.map((it) => (
              <div
                key={it.label}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-background/50 px-4 py-3"
              >
                <span className="text-sm text-muted-foreground">{it.label}</span>
                <span className="text-xl font-bold tabular-nums">
                  {it.label === 'Reading time' ? `${it.value} min` : it.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CharacterCounter() {
  const [text, setText] = React.useState('');
  const [copied, setCopied] = React.useState(false);
  const stats = React.useMemo(() => analyze(text), [text]);

  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  const items: { label: string; value: number }[] = [
    { label: 'Characters', value: stats.chars },
    { label: 'Characters (no spaces)', value: stats.charsNoSpaces },
    { label: 'Letters', value: (text.match(/[a-zA-Z]/g) || []).length },
    { label: 'Digits', value: (text.match(/[0-9]/g) || []).length },
    { label: 'Spaces', value: (text.match(/ /g) || []).length },
    { label: 'Words', value: stats.words },
    { label: 'Lines', value: stats.lines },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="space-y-4">
        <div className="rounded-2xl glass-card p-6">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here…"
            className="min-h-[300px] resize-none rounded-xl"
          />
          <div className="mt-3 flex gap-2">
            <Button onClick={copy} variant="outline" size="sm" className="rounded-xl">
              <Copy className="h-4 w-4" />
              {copied ? 'Copied' : 'Copy'}
            </Button>
            <Button
              onClick={() => setText('')}
              variant="outline"
              size="sm"
              className="rounded-xl"
            >
              <Eraser className="h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl glass-card p-6">
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-brand-blue" />
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
              Character counts
            </h3>
          </div>
          <div className="mt-4 space-y-3">
            {items.map((it) => (
              <div
                key={it.label}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-background/50 px-4 py-3"
              >
                <span className="text-sm text-muted-foreground">{it.label}</span>
                <span className="text-xl font-bold tabular-nums">{it.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
