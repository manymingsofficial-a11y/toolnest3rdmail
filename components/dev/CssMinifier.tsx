'use client';

import * as React from 'react';
import { Copy, Check, Loader2, X, Minimize2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export function CssMinifier() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [minifying, setMinifying] = React.useState(false);
  const [stats, setStats] = React.useState<{ original: number; minified: number; saved: number } | null>(null);

  async function minifyCss(css: string): Promise<{ minified: string; error?: string }> {
    const code = css.trim();
    if (!code) return { minified: '' };

    try {
      // Dynamic import csso for browser-compatible CSS minification
      const { minify } = await import('csso');
      
      const result = minify(code);

      // csso v5 returns { css, map } and throws on error
      return { minified: result.css || '' };
    } catch (e) {
      return { minified: '', error: e instanceof Error ? e.message : 'Failed to minify CSS' };
    }
  }

  async function minify() {
    setError(null);
    setMinifying(true);
    setOutput('');

    try {
      const result = await minifyCss(input);
      if (result.minified || !input.trim()) {
        setOutput(result.minified);
        const original = input.length;
        const minified = result.minified.length;
        const saved = original - minified;
        setStats({ original, minified, saved });
        toast.success('CSS minified!');
      } else if (result.error) {
        setError(result.error);
        toast.error(result.error);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to minify CSS');
      toast.error('Failed to minify CSS');
    } finally {
      setMinifying(false);
    }
  }

  function handleClear() {
    setInput('');
    setOutput('');
    setError(null);
    setStats(null);
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
    <ToolCard title="CSS Minifier">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">CSS Input</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder=".class {\n  color: red;\n  margin: 0;\n}"
            className="min-h-[200px] rounded-xl font-mono text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={minify}
            disabled={minifying || !input.trim()}
            className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 hover:from-sky-600 hover:to-blue-700"
          >
            {minifying ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Minifying...
              </>
            ) : (
              <>
                <Minimize2 className="mr-1.5 h-4 w-4" />
                Minify CSS
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
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Minified CSS</Label>
              <div className="flex gap-2">
                {stats && (
                  <span className="text-xs text-muted-foreground">
                    {stats.original} → {stats.minified} bytes (saved {stats.saved}, {Math.round((stats.saved / stats.original) * 100)}%)
                  </span>
                )}
                <CopyButton text={output} />
              </div>
            </div>
            <Textarea value={output} readOnly className="min-h-[200px] rounded-xl font-mono text-sm" />
          </div>
        )}
      </div>
    </ToolCard>
  );
}