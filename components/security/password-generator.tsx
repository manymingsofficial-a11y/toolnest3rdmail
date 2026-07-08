'use client';

import * as React from 'react';
import {
  Check,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  RefreshCw,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  UPPER,
  LOWER,
  NUMBERS,
  SYMBOLS,
  SIMILAR,
  AMBIGUOUS,
  secureRandomInt,
  analyzePassword,
} from '@/lib/security-utils';

export function PasswordGenerator() {
  const [length, setLength] = React.useState(16);
  const [upper, setUpper] = React.useState(true);
  const [lower, setLower] = React.useState(true);
  const [numbers, setNumbers] = React.useState(true);
  const [symbols, setSymbols] = React.useState(true);
  const [excludeSimilar, setExcludeSimilar] = React.useState(false);
  const [excludeAmbiguous, setExcludeAmbiguous] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [show, setShow] = React.useState(true);
  const [copied, setCopied] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const generate = React.useCallback(() => {
    let pool = '';
    if (upper) pool += UPPER;
    if (lower) pool += LOWER;
    if (numbers) pool += NUMBERS;
    if (symbols) pool += SYMBOLS;
    if (excludeSimilar) pool = pool.replace(SIMILAR, '');
    if (excludeAmbiguous) pool = pool.replace(AMBIGUOUS, '');
    if (!pool) {
      setError('Select at least one character type.');
      setPassword('');
      return;
    }
    setError(null);
    let pw = '';
    for (let i = 0; i < length; i++) {
      pw += pool[secureRandomInt(pool.length)];
    }
    setPassword(pw);
  }, [length, upper, lower, numbers, symbols, excludeSimilar, excludeAmbiguous]);

  React.useEffect(() => {
    generate();
  }, [generate]);

  function copy() {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  const strength = analyzePassword(password);
  const opts: { label: string; value: boolean; set: (v: boolean) => void }[] = [
    { label: 'Uppercase (A-Z)', value: upper, set: setUpper },
    { label: 'Lowercase (a-z)', value: lower, set: setLower },
    { label: 'Numbers (0-9)', value: numbers, set: setNumbers },
    { label: 'Symbols (!@#$)', value: symbols, set: setSymbols },
    { label: 'Exclude similar (il1Lo0O)', value: excludeSimilar, set: setExcludeSimilar },
    { label: 'Exclude ambiguous ({}[]()<>)', value: excludeAmbiguous, set: setExcludeAmbiguous },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="rounded-2xl glass-card p-6">
          <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/50 p-4">
            <KeyRound className="h-5 w-5 shrink-0 text-brand-blue" />
            <code className="min-w-0 flex-1 break-all font-mono text-lg font-semibold">
              {show ? password : '•'.repeat(password.length)}
            </code>
            <button
              onClick={() => setShow((s) => !s)}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label={show ? 'Hide password' : 'Show password'}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
            <button
              onClick={copy}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Copy password"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Password length</Label>
              <span className="text-sm font-bold text-foreground">{length}</span>
            </div>
            <Slider
              value={[length]}
              onValueChange={(v) => setLength(v[0])}
              min={4}
              max={64}
              step={1}
              className="mt-2"
            />
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              onClick={generate}
              className="rounded-xl bg-gradient-brand text-white"
            >
              <RefreshCw className="h-4 w-4" />
              Regenerate
            </Button>
            <Button
              onClick={copy}
              variant="outline"
              className="rounded-xl"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </div>

        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Character options
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {opts.map((o) => (
              <div
                key={o.label}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-background/40 px-4 py-3"
              >
                <Label className="cursor-pointer text-sm">{o.label}</Label>
                <Switch checked={o.value} onCheckedChange={o.set} />
              </div>
            ))}
          </div>
        </div>

        {error && (
          <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Strength indicator
          </h3>
          <div className="mt-4 space-y-2">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'h-2 flex-1 rounded-full transition-all',
                    strength.score >= i ? strength.color : 'bg-muted'
                  )}
                />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{strength.label}</span>
              <span className="text-xs text-muted-foreground">
                {strength.entropy} bits
              </span>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-border/60 bg-background/50 p-4">
            <p className="text-xs text-muted-foreground">Estimated crack time</p>
            <p className="mt-1 text-lg font-bold">{strength.crackTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
