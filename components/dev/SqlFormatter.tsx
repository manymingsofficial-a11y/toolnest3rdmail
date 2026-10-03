'use client';

import * as React from 'react';
import { Copy, Check, Loader2, X, Database } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export function SqlFormatter() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [formatting, setFormatting] = React.useState(false);

  async function formatSql(sql: string): Promise<string> {
    const code = sql.trim();
    if (!code) return '';

    try {
      // Dynamic import to avoid SSR issues and reduce bundle size
      const { format } = await import('sql-formatter');
      // sql-formatter v15 API: indent option was removed, use tabWidth instead
      return format(code, {
        language: 'sql',
        tabWidth: 2,
        keywordCase: 'upper',
        dataTypeCase: 'upper',
        functionCase: 'upper',
      });
    } catch (e) {
      throw new Error(e instanceof Error ? e.message : 'Failed to format SQL');
    }
  }

  async function format() {
    setError(null);
    setFormatting(true);
    setOutput('');

    try {
      const result = await formatSql(input);
      setOutput(result);
      toast.success('SQL formatted!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to format SQL');
      toast.error('Failed to format SQL');
    } finally {
      setFormatting(false);
    }
  }

  function handleClear() {
    setInput('');
    setOutput('');
    setError(null);
  }

  function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
    const [copied, setCopied] = React.useState(false);
    return (
      <Button
        onClick={() => {
          navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          });
        }}
        variant="outline"
        size="sm"
        className="rounded-xl"
        disabled={!text}
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied' : label}
      </Button>
    );
  }

  function ToolCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">{title}</h3>
          <div className="mt-4 space-y-4">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <ToolCard title="SQL Formatter">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">SQL Input</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="SELECT * FROM users WHERE id = 1"
            className="min-h-[200px] rounded-xl font-mono text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={format}
            disabled={formatting || !input.trim()}
            className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-indigo-700"
          >
            {formatting ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Formatting...
              </>
            ) : (
              <>
                <Database className="mr-1.5 h-4 w-4" />
                Format SQL
              </>
            )}
          </Button>
          <Button onClick={handleClear} variant="outline" size="sm" className="rounded-xl">
            <X className="mr-1.5 h-4 w-4" />Clear
          </Button>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        {output && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Formatted SQL</Label>
            <Textarea value={output} readOnly className="min-h-[200px] rounded-xl font-mono text-sm" />
            <CopyButton text={output} />
          </div>
        )}
      </div>
    </ToolCard>
  );
}