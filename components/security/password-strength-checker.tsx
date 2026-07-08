'use client';

import * as React from 'react';
import {
  Eye,
  EyeOff,
  ShieldCheck,
  Lightbulb,
  Clock,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { analyzePassword } from '@/lib/security-utils';

export function PasswordStrengthChecker() {
  const [pw, setPw] = React.useState('');
  const [show, setShow] = React.useState(false);
  const result = React.useMemo(() => analyzePassword(pw), [pw]);

  const checks: { label: string; pass: boolean }[] = [
    { label: 'At least 12 characters', pass: pw.length >= 12 },
    { label: 'Uppercase letter', pass: /[A-Z]/.test(pw) },
    { label: 'Lowercase letter', pass: /[a-z]/.test(pw) },
    { label: 'Number', pass: /[0-9]/.test(pw) },
    { label: 'Symbol', pass: /[^a-zA-Z0-9]/.test(pw) },
    { label: 'No repeated chars', pass: pw.length > 0 && !/(.)\1{2,}/.test(pw) },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="rounded-2xl glass-card p-6">
          <label className="text-sm font-medium">Enter your password</label>
          <div className="relative mt-2">
            <Input
              type={show ? 'text' : 'password'}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Type a password to analyze…"
              className="rounded-xl pr-10 font-mono"
            />
            <button
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={show ? 'Hide password' : 'Show password'}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Analysis runs entirely in your browser — your password is never sent
            anywhere.
          </p>
        </div>

        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Strength analysis
          </h3>
          <div className="mt-4 space-y-2">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'h-2.5 flex-1 rounded-full transition-all',
                    result.score >= i ? result.color : 'bg-muted'
                  )}
                />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-bold">{result.label}</span>
              <span className="text-xs text-muted-foreground">
                {result.entropy} bits of entropy
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border/60 bg-background/50 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                Crack time
              </div>
              <p className="mt-1 text-base font-bold">{result.crackTime}</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-background/50 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" />
                Length
              </div>
              <p className="mt-1 text-base font-bold">{pw.length} chars</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Requirements
          </h3>
          <ul className="mt-3 space-y-2">
            {checks.map((c) => (
              <li key={c.label} className="flex items-center gap-2 text-sm">
                <span
                  className={cn(
                    'grid h-5 w-5 place-items-center rounded-full text-xs font-bold',
                    c.pass
                      ? 'bg-green-500/15 text-green-600 dark:text-green-400'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {c.pass ? '✓' : '·'}
                </span>
                <span className={c.pass ? 'text-foreground' : 'text-muted-foreground'}>
                  {c.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl glass-card p-6">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
              Suggestions to improve
            </h3>
          </div>
          <ul className="mt-4 space-y-2.5">
            {result.suggestions.map((s, i) => (
              <li
                key={i}
                className="flex gap-2 rounded-xl border border-border/60 bg-background/40 px-3 py-2.5 text-sm"
              >
                <span className="text-brand-blue">→</span>
                <span className="text-muted-foreground">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
