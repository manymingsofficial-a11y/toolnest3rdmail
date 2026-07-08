'use client';

import * as React from 'react';
import { Delete } from 'lucide-react';

import { cn } from '@/lib/utils';

type Mode = 'deg' | 'rad';

export function ScientificCalculator() {
  const [expr, setExpr] = React.useState('');
  const [result, setResult] = React.useState('0');
  const [mode, setMode] = React.useState<Mode>('deg');
  const [copied, setCopied] = React.useState(false);

  function press(key: string) {
    setExpr((prev) => prev + key);
  }

  function clear() {
    setExpr('');
    setResult('0');
  }

  function backspace() {
    setExpr((prev) => prev.slice(0, -1));
  }

  function evaluate() {
    try {
      let e = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, String(Math.PI))
        .replace(/e(?![0-9])/g, String(Math.E))
        .replace(/√/g, 'Math.sqrt')
        .replace(/sin\(/g, mode === 'deg' ? 'Math.sin(_d2r(' : 'Math.sin(')
        .replace(/cos\(/g, mode === 'deg' ? 'Math.cos(_d2r(' : 'Math.cos(')
        .replace(/tan\(/g, mode === 'deg' ? 'Math.tan(_d2r(' : 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/\^/g, '**')
        .replace(/(\d+)%/g, '($1/100)')
        .replace(/!/g, '_fact');

      const _d2r = (d: number) => (d * Math.PI) / 180;
      const _fact = (n: number) => {
        if (n < 0 || !Number.isInteger(n)) return NaN;
        let f = 1;
        for (let i = 2; i <= n; i++) f *= i;
        return f;
      };

      const val = Function('_d2r', '_fact', `return ${e || '0'}`)(_d2r, _fact);
      if (!isFinite(val)) {
        setResult('Error');
      } else {
        setResult(String(Math.round(val * 1e10) / 1e10));
      }
    } catch {
      setResult('Error');
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  const keys: { label: string; action: () => void; span?: number; variant?: 'op' | 'fn' | 'eq' }[] = [
    { label: 'sin', action: () => press('sin('), variant: 'fn' },
    { label: 'cos', action: () => press('cos('), variant: 'fn' },
    { label: 'tan', action: () => press('tan('), variant: 'fn' },
    { label: 'log', action: () => press('log('), variant: 'fn' },
    { label: 'ln', action: () => press('ln('), variant: 'fn' },
    { label: 'π', action: () => press('π'), variant: 'fn' },
    { label: 'e', action: () => press('e'), variant: 'fn' },
    { label: '√', action: () => press('√('), variant: 'fn' },
    { label: 'x²', action: () => press('^2'), variant: 'fn' },
    { label: 'x^y', action: () => press('^'), variant: 'fn' },
    { label: 'n!', action: () => press('!'), variant: 'fn' },
    { label: '%', action: () => press('%'), variant: 'fn' },
    { label: '7', action: () => press('7') },
    { label: '8', action: () => press('8') },
    { label: '9', action: () => press('9') },
    { label: '÷', action: () => press('÷'), variant: 'op' },
    { label: '4', action: () => press('4') },
    { label: '5', action: () => press('5') },
    { label: '6', action: () => press('6') },
    { label: '×', action: () => press('×'), variant: 'op' },
    { label: '1', action: () => press('1') },
    { label: '2', action: () => press('2') },
    { label: '3', action: () => press('3') },
    { label: '−', action: () => press('-'), variant: 'op' },
    { label: '0', action: () => press('0') },
    { label: '.', action: () => press('.') },
    { label: '(', action: () => press('(') },
    { label: ')', action: () => press(')') },
    { label: '+', action: () => press('+'), variant: 'op' },
    { label: '=', action: evaluate, variant: 'eq', span: 2 },
  ];

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {(['deg', 'rad'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  'rounded-lg px-3 py-1 text-xs font-bold uppercase transition-all',
                  mode === m ? 'bg-gradient-brand text-white' : 'bg-muted text-muted-foreground'
                )}
              >
                {m}
              </button>
            ))}
          </div>
          <button
            onClick={copyResult}
            className="rounded-lg px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="mt-4 rounded-xl border border-border/60 bg-background/80 p-4">
          <div className="min-h-[28px] text-right font-mono text-sm text-muted-foreground break-all">
            {expr || '\u00A0'}
          </div>
          <div className="mt-1 text-right font-mono text-3xl font-bold break-all">
            {result}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          <button
            onClick={clear}
            className="col-span-2 rounded-xl bg-destructive/10 py-3 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/20"
          >
            Clear
          </button>
          <button
            onClick={backspace}
            className="col-span-1 rounded-xl bg-muted py-3 transition-colors hover:bg-muted/80"
            aria-label="Backspace"
          >
            <Delete className="mx-auto h-4 w-4" />
          </button>
          <button
            onClick={evaluate}
            className="rounded-xl bg-gradient-brand py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            =
          </button>

          {keys.map((k) => (
            <button
              key={k.label}
              onClick={k.action}
              className={cn(
                'rounded-xl py-3 text-sm font-medium transition-all',
                k.span === 2 && 'col-span-2',
                k.variant === 'op' && 'bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20',
                k.variant === 'fn' && 'bg-muted text-muted-foreground hover:bg-muted/80',
                k.variant === 'eq' && 'bg-gradient-brand text-white hover:opacity-90',
                !k.variant && 'bg-background/60 hover:bg-background',
                k.variant === 'eq' && k.span === 2 && 'col-span-2'
              )}
            >
              {k.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
