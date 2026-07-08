'use client';

import * as React from 'react';
import {
  Check,
  Copy,
  RefreshCw,
  UserPlus,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { secureRandomInt } from '@/lib/security-utils';

const ADJECTIVES = [
  'swift', 'brave', 'calm', 'clever', 'daring', 'eager', 'fierce', 'gentle',
  'happy', 'jolly', 'keen', 'lucky', 'merry', 'noble', 'proud', 'quick',
  'royal', 'silly', 'smart', 'solid', 'stormy', 'sunny', 'super', 'wild',
  'wise', 'bold', 'epic', 'grand', 'mighty', 'rapid', 'shiny', 'cool',
];

const NOUNS = [
  'tiger', 'eagle', 'wolf', 'falcon', 'dragon', 'lion', 'bear', 'hawk',
  'fox', 'shark', 'raven', 'cobra', 'panther', 'phoenix', 'griffin', 'viper',
  'comet', 'thunder', 'blaze', 'shadow', 'frost', 'storm', 'wave', 'spark',
  'mountain', 'river', 'forest', 'star', 'moon', 'sun', 'wind', 'flame',
];

function generateOne(prefix: string, suffix: string, useNumbers: boolean): string {
  const adj = ADJECTIVES[secureRandomInt(ADJECTIVES.length)];
  const noun = NOUNS[secureRandomInt(NOUNS.length)];
  const base = `${adj}${noun}`;
  const num = useNumbers ? secureRandomInt(10000) : '';
  return `${prefix}${base}${num}${suffix}`;
}

export function UsernameGenerator() {
  const [prefix, setPrefix] = React.useState('');
  const [suffix, setSuffix] = React.useState('');
  const [useNumbers, setUseNumbers] = React.useState(true);
  const [count, setCount] = React.useState(5);
  const [usernames, setUsernames] = React.useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = React.useState<number | null>(null);

  const generate = React.useCallback(() => {
    const next: string[] = [];
    const seen = new Set<string>();
    while (next.length < count) {
      const u = generateOne(prefix, suffix, useNumbers);
      if (!seen.has(u)) {
        seen.add(u);
        next.push(u);
      }
    }
    setUsernames(next);
  }, [prefix, suffix, useNumbers, count]);

  React.useEffect(() => {
    generate();
  }, [generate]);

  function copyOne(idx: number) {
    navigator.clipboard.writeText(usernames[idx]).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1600);
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Options
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Prefix</Label>
              <Input
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                placeholder="e.g. mr_"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Suffix</Label>
              <Input
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
                placeholder="e.g. _99"
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl border border-border/60 bg-background/40 px-4 py-3">
            <Label className="cursor-pointer text-sm">Add random numbers</Label>
            <Switch checked={useNumbers} onCheckedChange={setUseNumbers} />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Quantity</Label>
              <span className="text-sm font-bold">{count}</span>
            </div>
            <div className="mt-2 flex gap-2">
              {[1, 5, 10, 20].map((n) => (
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

          <div className="mt-5">
            <Button
              onClick={generate}
              className="rounded-xl bg-gradient-brand text-white"
            >
              <RefreshCw className="h-4 w-4" />
              Generate
            </Button>
          </div>
        </div>

        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Generated usernames
          </h3>
          <ul className="mt-4 space-y-2">
            {usernames.map((u, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/50 px-4 py-3"
              >
                <UserPlus className="h-4 w-4 shrink-0 text-brand-purple" />
                <code className="min-w-0 flex-1 truncate font-mono text-sm font-medium">
                  {u}
                </code>
                <button
                  onClick={() => copyOne(i)}
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Copy username"
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
            Tips
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>Use a prefix to match a theme or brand.</li>
            <li>Numbers make usernames harder to guess.</li>
            <li>Combine adjective + noun for memorable names.</li>
            <li>Generate multiple and pick your favourite.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
