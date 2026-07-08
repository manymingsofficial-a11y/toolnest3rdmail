'use client';

import * as React from 'react';

import { DevShell, CodeArea, CopyButton, DownloadButton, StatusBadge } from './dev-ui';
import { Button } from '@/components/ui/button';
import { RotateCcw, Minimize2, Maximize2 } from 'lucide-react';

export function JsonFormatter() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState('');
  const [indent, setIndent] = React.useState(2);

  function format(minify: boolean) {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, minify ? 0 : indent));
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  }

  const formatRef = React.useRef(format);
  formatRef.current = format;

  React.useEffect(() => {
    formatRef.current(false);
  }, [input, indent]);

  function reset() {
    setInput('');
    setOutput('');
    setError('');
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => format(false)} size="sm" className="rounded-xl bg-gradient-brand text-white">
          <Maximize2 className="h-4 w-4" /> Beautify
        </Button>
        <Button onClick={() => format(true)} size="sm" variant="outline" className="rounded-xl">
          <Minimize2 className="h-4 w-4" /> Minify
        </Button>
        <Button onClick={reset} size="sm" variant="outline" className="rounded-xl">
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Indent:</span>
          {[2, 4].map((n) => (
            <button
              key={n}
              onClick={() => setIndent(n)}
              className={`rounded-lg px-2.5 py-1 text-sm font-medium ${
                indent === n ? 'bg-gradient-brand text-white' : 'border border-border/60 text-muted-foreground'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <DevShell
        input={<CodeArea value={input} onChange={setInput} placeholder='{"key":"value"}' />}
        output={
          error ? (
            <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          ) : (
            <CodeArea value={output} placeholder="Formatted JSON…" />
          )
        }
        actions={
          <div className="flex gap-2">
            <CopyButton text={output} />
            <DownloadButton text={output} filename="formatted.json" />
          </div>
        }
      />
    </div>
  );
}

export function JsonValidator() {
  const [input, setInput] = React.useState('');
  const [valid, setValid] = React.useState<boolean | null>(null);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (!input.trim()) {
      setValid(null);
      setError('');
      return;
    }
    try {
      JSON.parse(input);
      setValid(true);
      setError('');
    } catch (e) {
      setValid(false);
      setError((e as Error).message);
    }
  }, [input]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {valid !== null && <StatusBadge ok={valid} label={valid ? 'Valid JSON' : 'Invalid JSON'} />}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">JSON Input</h3>
          <CodeArea value={input} onChange={setInput} placeholder='{"key":"value"}' />
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">Result</h3>
          {valid === null ? (
            <div className="grid min-h-[300px] place-items-center rounded-xl border border-border/60 bg-background/40 text-sm text-muted-foreground">
              Enter JSON to validate
            </div>
          ) : valid ? (
            <div className="grid min-h-[300px] place-items-center rounded-xl border border-green-500/40 bg-green-500/5 text-center">
              <div>
                <div className="text-4xl">✓</div>
                <p className="mt-2 text-sm font-semibold text-green-600 dark:text-green-400">Valid JSON</p>
              </div>
            </div>
          ) : (
            <div className="min-h-[300px] rounded-xl border border-destructive/40 bg-destructive/10 p-4">
              <p className="text-sm font-semibold text-destructive">Syntax Error</p>
              <p className="mt-2 text-sm text-destructive/80">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Base64Tool() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [mode, setMode] = React.useState<'encode' | 'decode'>('encode');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (!input) {
      setOutput('');
      setError('');
      return;
    }
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
      setError('');
    } catch {
      setError(mode === 'decode' ? 'Invalid Base64 input' : 'Encoding error');
      setOutput('');
    }
  }, [input, mode]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['encode', 'decode'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              mode === m ? 'bg-gradient-brand text-white' : 'border border-border/60 text-muted-foreground hover:text-foreground'
            }`}
          >
            {m === 'encode' ? 'Encode' : 'Decode'}
          </button>
        ))}
      </div>
      <DevShell
        input={<CodeArea value={input} onChange={setInput} placeholder={mode === 'encode' ? 'Enter text to encode…' : 'Enter Base64 to decode…'} />}
        output={
          error ? (
            <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>
          ) : (
            <CodeArea value={output} placeholder="Result…" />
          )
        }
        actions={<CopyButton text={output} />}
      />
    </div>
  );
}

export function UrlEncoderTool() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [mode, setMode] = React.useState<'encode' | 'decode'>('encode');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (!input) {
      setOutput('');
      setError('');
      return;
    }
    try {
      setOutput(mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input));
      setError('');
    } catch {
      setError('Invalid input');
      setOutput('');
    }
  }, [input, mode]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['encode', 'decode'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              mode === m ? 'bg-gradient-brand text-white' : 'border border-border/60 text-muted-foreground hover:text-foreground'
            }`}
          >
            {m === 'encode' ? 'Encode' : 'Decode'}
          </button>
        ))}
      </div>
      <DevShell
        input={<CodeArea value={input} onChange={setInput} placeholder={mode === 'encode' ? 'Enter URL or text…' : 'Enter encoded URL…'} />}
        output={
          error ? (
            <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>
          ) : (
            <CodeArea value={output} placeholder="Result…" />
          )
        }
        actions={<CopyButton text={output} />}
      />
    </div>
  );
}
