'use client';

import * as React from 'react';
import { Check, Copy, RotateCcw } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function CalcShell({
  children,
  result,
  onReset,
  resultLabel = 'Result',
}: {
  children: React.ReactNode;
  result: React.ReactNode;
  onReset: () => void;
  resultLabel?: string;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="space-y-6">{children}</div>
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            {resultLabel}
          </h3>
          <div className="mt-4">{result}</div>
        </div>
      </div>
    </div>
  );
}

export function CalcCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl glass-card p-6">
      <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}

export function NumberInput(props: React.ComponentProps<typeof Input>) {
  return <Input type="number" className="rounded-xl" {...props} />;
}

export function ResultRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/50 px-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={cn(
          'text-base font-bold tabular-nums',
          accent && 'text-green-600 dark:text-green-400'
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function BigResult({
  value,
  sub,
  copyValue,
}: {
  value: string;
  sub?: string;
  copyValue?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  function copy() {
    if (!copyValue) return;
    navigator.clipboard.writeText(copyValue).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }
  return (
    <div className="space-y-3">
      <div className="grid place-items-center rounded-xl border border-dashed border-border/60 bg-gradient-brand/5 bg-muted/30 p-6 text-center">
        <p className="text-3xl font-bold tracking-tight">{value}</p>
        {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
      </div>
      {copyValue && (
        <div className="flex gap-2">
          <Button onClick={copy} variant="outline" size="sm" className="flex-1 rounded-xl">
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy Result'}
          </Button>
        </div>
      )}
    </div>
  );
}

export function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <Button onClick={onReset} variant="outline" size="sm" className="rounded-xl">
      <RotateCcw className="h-4 w-4" />
      Reset
    </Button>
  );
}

export function fmt(n: number, decimals = 2): string {
  if (!isFinite(n)) return '—';
  return n.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function fmtMoney(n: number, decimals = 2): string {
  if (!isFinite(n)) return '—';
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
