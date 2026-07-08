'use client';

import * as React from 'react';
import { Copy, Download, Pilcrow, RefreshCw } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { secureRandomInt } from '@/lib/security-utils';

const WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
  'accusamus', 'iusto', 'odio', 'dignissimos', 'ducimus', 'blanditiis',
  'praesentium', 'voluptatum', 'deleniti', 'atque', 'corrupti', 'quos',
];

type Unit = 'words' | 'sentences' | 'paragraphs';

function randomWord(): string {
  return WORDS[secureRandomInt(WORDS.length)];
}

function makeSentence(): string {
  const len = 8 + secureRandomInt(12);
  const words: string[] = [];
  for (let i = 0; i < len; i++) words.push(randomWord());
  let s = words.join(' ');
  s = s.charAt(0).toUpperCase() + s.slice(1) + '.';
  return s;
}

function makeParagraph(): string {
  const len = 3 + secureRandomInt(5);
  const sentences: string[] = [];
  for (let i = 0; i < len; i++) sentences.push(makeSentence());
  return sentences.join(' ');
}

function generate(unit: Unit, count: number): string {
  if (unit === 'words') {
    const words: string[] = [];
    for (let i = 0; i < count; i++) words.push(randomWord());
    let s = words.join(' ');
    if (s.length > 0) s = s.charAt(0).toUpperCase() + s.slice(1);
    return s;
  }
  if (unit === 'sentences') {
    const sentences: string[] = [];
    for (let i = 0; i < count; i++) sentences.push(makeSentence());
    return sentences.join(' ');
  }
  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) paragraphs.push(makeParagraph());
  return paragraphs.join('\n\n');
}

export function LoremIpsumGenerator() {
  const [unit, setUnit] = React.useState<Unit>('paragraphs');
  const [count, setCount] = React.useState(3);
  const [output, setOutput] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const generateNow = React.useCallback(() => {
    setOutput(generate(unit, count));
  }, [unit, count]);

  React.useEffect(() => {
    generateNow();
  }, [generateNow]);

  function copy() {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  function downloadTxt() {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lorem-ipsum.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const units: { id: Unit; label: string }[] = [
    { id: 'words', label: 'Words' },
    { id: 'sentences', label: 'Sentences' },
    { id: 'paragraphs', label: 'Paragraphs' },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="space-y-4">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Output
          </h3>
          <div className="mt-3 min-h-[280px] rounded-xl border border-border/60 bg-background/50 p-5 text-sm leading-relaxed whitespace-pre-wrap break-words">
            {output || (
              <span className="text-muted-foreground">
                Lorem ipsum will appear here…
              </span>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button onClick={generateNow} className="rounded-xl bg-gradient-brand text-white">
              <RefreshCw className="h-4 w-4" />
              Regenerate
            </Button>
            <Button onClick={copy} variant="outline" className="rounded-xl">
              <Copy className="h-4 w-4" />
              {copied ? 'Copied' : 'Copy'}
            </Button>
            <Button onClick={downloadTxt} variant="outline" className="rounded-xl">
              <Download className="h-4 w-4" />
              Download TXT
            </Button>
          </div>
        </div>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl glass-card p-6">
          <div className="flex items-center gap-2">
            <Pilcrow className="h-5 w-5 text-brand-purple" />
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
              Options
            </h3>
          </div>

          <div className="mt-4">
            <Label className="text-sm font-medium">Generate</Label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {units.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setUnit(u.id)}
                  className={cn(
                    'rounded-xl border px-3 py-2.5 text-sm font-medium transition-all',
                    unit === u.id
                      ? 'border-transparent bg-gradient-brand text-white'
                      : 'border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
                  )}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Count</Label>
              <span className="text-sm font-bold">{count}</span>
            </div>
            <input
              type="range"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="mt-2 w-full accent-brand-purple"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
