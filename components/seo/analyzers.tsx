'use client';

import * as React from 'react';
import { Globe, ArrowRight, AlertCircle } from 'lucide-react';

import { CopyButton, DownloadButton } from '@/components/dev/dev-ui';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}

export function KeywordDensityChecker() {
  const [text, setText] = React.useState('');
  const [results, setResults] = React.useState<{ word: string; count: number; density: number }[]>([]);

  React.useEffect(() => {
    if (!text.trim()) {
      setResults([]);
      return;
    }
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'as', 'if', 'so', 'not', 'no', 'yes']);
    const words = text.toLowerCase().match(/\b[a-z]{2,}\b/g) || [];
    const total = words.length;
    const freq: Record<string, number> = {};
    for (const w of words) {
      if (stopWords.has(w)) continue;
      freq[w] = (freq[w] || 0) + 1;
    }
    const sorted = Object.entries(freq)
      .map(([word, count]) => ({ word, count, density: (count / total) * 100 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
    setResults(sorted);
  }, [text]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">Your content</h3>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your content here…" className="min-h-[300px] resize-none rounded-xl" />
        {text && <p className="text-sm text-muted-foreground">{text.split(/\s+/).filter(Boolean).length} words</p>}
      </div>
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">Keyword density (top 20)</h3>
        {results.length === 0 ? (
          <div className="grid min-h-[300px] place-items-center rounded-xl border border-border/60 bg-background/40 text-sm text-muted-foreground">
            Enter text to analyze
          </div>
        ) : (
          <div className="space-y-2">
            {results.map((r) => (
              <div key={r.word} className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/50 px-4 py-2.5">
                <span className="flex-1 font-mono text-sm font-medium">{r.word}</span>
                <span className="text-sm text-muted-foreground">{r.count}×</span>
                <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${Math.min(100, r.density * 5)}%` }} />
                </div>
                <span className="w-12 text-right text-sm font-bold tabular-nums">{r.density.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function SlugGenerator() {
  const [text, setText] = React.useState('');
  const [separator, setSeparator] = React.useState('-');
  const [lower, setLower] = React.useState(true);

  const slug = React.useMemo(() => {
    let s = text
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, separator);
    if (lower) s = s.toLowerCase();
    return s;
  }, [text, separator, lower]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold text-muted-foreground">Input text</h3>
          <div className="mt-4 space-y-4">
            <Field label="Title or text"><Input value={text} onChange={(e) => setText(e.target.value)} placeholder="My Awesome Blog Post!" className="rounded-xl" /></Field>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <button onClick={() => setSeparator('-')} className={cn('rounded-lg px-3 py-1.5 text-sm font-medium', separator === '-' ? 'bg-gradient-brand text-white' : 'border border-border/60 text-muted-foreground')}>Hyphen (-)</button>
                <button onClick={() => setSeparator('_')} className={cn('rounded-lg px-3 py-1.5 text-sm font-medium', separator === '_' ? 'bg-gradient-brand text-white' : 'border border-border/60 text-muted-foreground')}>Underscore (_)</button>
              </div>
              <button onClick={() => setLower(!lower)} className={cn('rounded-lg px-3 py-1.5 text-sm font-medium', lower ? 'bg-gradient-brand text-white' : 'border border-border/60 text-muted-foreground')}>
                {lower ? 'lowercase' : 'Mixed Case'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">Generated slug</h3>
        <div className="rounded-xl border border-border/60 bg-background/50 p-6">
          <code className="break-all font-mono text-lg font-semibold">{slug || '—'}</code>
        </div>
        <CopyButton text={slug} />
      </div>
    </div>
  );
}

export function CanonicalUrlGenerator() {
  const [url, setUrl] = React.useState('');
  const [output, setOutput] = React.useState('');

  React.useEffect(() => {
    if (!url.trim()) {
      setOutput('');
      return;
    }
    let clean = url.trim();
    if (!clean.startsWith('http')) clean = `https://${clean}`;
    try {
      const u = new URL(clean);
      setOutput(`<link rel="canonical" href="${u.origin}${u.pathname}" />`);
    } catch {
      setOutput('Invalid URL');
    }
  }, [url]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold text-muted-foreground">Enter your URL</h3>
          <div className="mt-4">
            <Field label="Page URL"><Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/page" className="rounded-xl" /></Field>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">Canonical tag</h3>
        <div className="rounded-xl border border-border/60 bg-background/50 p-6">
          <code className="break-all font-mono text-sm font-semibold">{output || '—'}</code>
        </div>
        <CopyButton text={output} />
      </div>
    </div>
  );
}

export function SearchSnippetPreview() {
  const [title, setTitle] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [desc, setDesc] = React.useState('');

  const displayUrl = url.startsWith('http') ? url.replace(/^https?:\/\//, '') : url;
  const titleLen = title.length;
  const descLen = desc.length;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold text-muted-foreground">Page details</h3>
          <div className="mt-4 space-y-4">
            <div>
              <Field label={`Title (${titleLen}/60)`}><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your page title" className="rounded-xl" maxLength={70} /></Field>
              {titleLen > 60 && <p className="mt-1 text-xs text-amber-500">Title is longer than 60 characters — Google may truncate it.</p>}
            </div>
            <Field label="URL"><Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="example.com/page" className="rounded-xl" /></Field>
            <div>
              <Field label={`Description (${descLen}/160)`}><Textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Meta description…" className="rounded-xl" rows={3} maxLength={180} /></Field>
              {descLen > 160 && <p className="mt-1 text-xs text-amber-500">Description is longer than 160 characters — Google may truncate it.</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">Google preview</h3>
        <div className="rounded-xl border border-border/60 bg-white p-5 shadow-sm dark:bg-background">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-brand text-xs font-bold text-white">G</div>
            <div>
              <p className="text-xs text-gray-600 dark:text-muted-foreground">{displayUrl || 'example.com'}</p>
            </div>
          </div>
          <h3 className="mt-2 text-xl text-[#1a0dab] hover:underline dark:text-blue-400" style={{ color: '#1a0dab' }}>
            {title || 'Your Page Title Here'}
          </h3>
          <p className="mt-1 text-sm text-gray-700 dark:text-muted-foreground">
            {desc || 'Your meta description will appear here. Keep it under 160 characters for best results.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export function RedirectChecker() {
  const [url, setUrl] = React.useState('');
  const [result, setResult] = React.useState<{ status: number; finalUrl: string; steps: { url: string; status: number }[] } | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  async function check() {
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const cleanUrl = url.startsWith('http') ? url : `https://${url}`;
      const res = await fetch(cleanUrl, { redirect: 'follow', method: 'GET' });
      setResult({
        status: res.status,
        finalUrl: res.url,
        steps: [{ url: cleanUrl, status: res.status }],
      });
    } catch (e) {
      setError(`Could not fetch URL: ${(e as Error).message}. Note: CORS may block browser-based redirect checks for some sites.`);
    }
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/old-page" className="rounded-xl pl-10" onKeyDown={(e) => e.key === 'Enter' && check()} />
        </div>
        <button onClick={check} disabled={loading} className="rounded-xl bg-gradient-brand px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50">
          {loading ? 'Checking…' : 'Check Redirect'}
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-3">
          <div className="rounded-xl border border-border/60 bg-background/50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Final Status</span>
              <span className={cn('rounded-full px-3 py-1 text-sm font-bold', result.status >= 200 && result.status < 300 ? 'bg-green-500/10 text-green-600 dark:text-green-400' : result.status >= 300 && result.status < 400 ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-red-500/10 text-red-600 dark:text-red-400')}>
                {result.status}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Final URL:</span>
              <code className="truncate font-mono text-sm">{result.finalUrl}</code>
            </div>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/50 p-4">
            <p className="text-sm font-semibold">Redirect chain</p>
            <div className="mt-3 space-y-2">
              {result.steps.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-bold">{step.status}</span>
                  <code className="truncate font-mono text-xs">{step.url}</code>
                  {i < result.steps.length - 1 && <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!result && !error && !loading && (
        <div className="grid place-items-center rounded-xl border border-border/60 bg-background/40 py-12 text-sm text-muted-foreground">
          Enter a URL above to check its redirect chain and final HTTP status.
        </div>
      )}
    </div>
  );
}
