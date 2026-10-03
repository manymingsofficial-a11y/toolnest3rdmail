'use client';

import * as React from 'react';
import { Copy, Check, Loader2, X, AlertCircle, Terminal } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export function JsMinifier() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [minifying, setMinifying] = React.useState(false);
  const [stats, setStats] = React.useState<{ original: number; minified: number; saved: number } | null>(null);

  async function minifyJs(js: string): Promise<{ minified: string; error?: string }> {
    const code = js.trim();
    if (!code) return { minified: '' };

    try {
      const { minify } = await import('terser');
      
      const result = await minify(code, {
        compress: {
          passes: 2,
          ecma: 2020,
          toplevel: true,
        },
        mangle: {
          toplevel: true,
        },
        format: {
          ecma: 2020,
          comments: false,
        },
        sourceMap: false,
      });

      // Terser v5 returns { code, map, error } - error is only set on parse failure
      // If minification throws, it's caught by the try/catch
      return { minified: result.code || '' };
    } catch (e) {
      return { minified: '', error: e instanceof Error ? e.message : 'Failed to minify JavaScript' };
    }
  }

  async function minify() {
    setError(null);
    setMinifying(true);
    setOutput('');

    try {
      const result = await minifyJs(input);
      if (result.minified || !input.trim()) {
        setOutput(result.minified);
        const original = input.length;
        const minified = result.minified.length;
        const saved = original - minified;
        setStats({ original, minified, saved });
        toast.success('JavaScript minified!');
      } else if (result.error) {
        setError(result.error);
        toast.error(result.error);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to minify JavaScript');
      toast.error('Failed to minify JavaScript');
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
    <ToolCard title="JS Minifier">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">JavaScript Input</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="function hello() {\n  console.log('hi');\n}"
            className="min-h-[200px] rounded-xl font-mono text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={minify}
            disabled={minifying || !input.trim()}
            className="rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg shadow-yellow-500/25 hover:from-yellow-600 hover:to-amber-700"
          >
            {minifying ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Minifying...
              </>
            ) : (
              <>
                <Terminal className="mr-1.5 h-4 w-4" />
                Minify
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
              <Label className="text-sm font-medium">Minified JavaScript</Label>
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