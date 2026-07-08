'use client';

import * as React from 'react';
import { Check, Copy, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function DevShell({
  input,
  output,
  actions,
}: {
  input: React.ReactNode;
  output: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-muted-foreground">Input</h3>
          {actions}
        </div>
        {input}
      </div>
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">Output</h3>
        {output}
      </div>
    </div>
  );
}

export function CodeArea({
  value,
  onChange,
  placeholder,
  minHeight = 300,
  mono = true,
}: {
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  minHeight?: number;
  mono?: boolean;
}) {
  return (
    <Textarea
      value={value}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      placeholder={placeholder}
      readOnly={!onChange}
      className={`${mono ? 'font-mono text-sm' : ''} resize-none rounded-xl`}
      style={{ minHeight }}
    />
  );
}

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = React.useState(false);
  function copy() {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }
  return (
    <Button onClick={copy} variant="outline" size="sm" className="rounded-xl">
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      {copied ? 'Copied' : label}
    </Button>
  );
}

export function DownloadButton({
  text,
  filename,
  label = 'Download',
}: {
  text: string;
  filename: string;
  label?: string;
}) {
  function download() {
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  return (
    <Button onClick={download} variant="outline" size="sm" className="rounded-xl">
      <Download className="h-4 w-4" />
      {label}
    </Button>
  );
}

export function StatusBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
        ok
          ? 'bg-green-500/10 text-green-600 dark:text-green-400'
          : 'bg-red-500/10 text-red-600 dark:text-red-400'
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${ok ? 'bg-green-500' : 'bg-red-500'}`} />
      {label}
    </span>
  );
}
