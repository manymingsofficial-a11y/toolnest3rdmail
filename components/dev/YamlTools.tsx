'use client';

import * as React from 'react';
import { Copy, Check, Loader2, X, AlertCircle, FileText } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import * as yaml from 'js-yaml';

export function YamlFormatter() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [formatting, setFormatting] = React.useState(false);

  function formatYaml(input: string): { formatted: string; error?: string } {
    const yamlStr = input.trim();
    if (!yamlStr) return { formatted: '' };

    try {
      // Parse YAML to validate and normalize
      const parsed = yaml.load(yamlStr);
      // Dump with proper formatting (2-space indent, no flow style)
      const formatted = yaml.dump(parsed, {
        indent: 2,
        lineWidth: 120,
        noRefs: true,
        sortKeys: false,
        quotingType: '"',
        forceQuotes: false,
      });
      return { formatted: formatted.trimEnd() };
    } catch (e) {
      return { formatted: '', error: e instanceof Error ? e.message : 'Failed to parse YAML' };
    }
  }

  function format() {
    setError(null);
    setFormatting(true);
    setOutput('');

    setTimeout(() => {
      try {
        const result = formatYaml(input);
        if (result.error) {
          setError(result.error);
          toast.error(result.error);
        } else {
          setOutput(result.formatted);
          toast.success('YAML formatted!');
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to format YAML');
        toast.error('Failed to format YAML');
      } finally {
        setFormatting(false);
      }
    }, 0);
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
    <ToolCard title="YAML Formatter">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">YAML Input</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="key: value\n  nested:\n    key: value"
            className="min-h-[200px] rounded-xl font-mono text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={format}
            disabled={formatting || !input.trim()}
            className="rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/25 hover:from-rose-600 hover:to-pink-700"
          >
            {formatting ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Formatting...
              </>
            ) : (
              <>
                <FileText className="mr-1.5 h-4 w-4" />
                Format YAML
              </>
            )}
          </Button>
          <Button onClick={() => { setInput(''); setOutput(''); setError(null); }} variant="outline" size="sm" className="rounded-xl">
            Clear
          </Button>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        {output && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Formatted YAML</Label>
            <Textarea value={output} readOnly className="min-h-[200px] rounded-xl font-mono text-sm" />
            <CopyButton text={output} />
          </div>
        )}
      </div>
    </ToolCard>
  );
}

export function YamlValidator() {
  const [input, setInput] = React.useState('');
  const [valid, setValid] = React.useState<boolean | null>(null);
  const [message, setMessage] = React.useState('');
  const [errorDetails, setErrorDetails] = React.useState<string | null>(null);
  const [validating, setValidating] = React.useState(false);

  function validate() {
    setValid(null);
    setMessage('');
    setErrorDetails(null);
    setValidating(true);

    setTimeout(() => {
      try {
        if (!input.trim()) {
          setValid(false);
          setMessage('Please enter YAML to validate.');
          setValidating(false);
          return;
        }

        yaml.load(input);
        setValid(true);
        setMessage('Valid YAML! No errors found.');
        setErrorDetails(null);
      } catch (e) {
        setValid(false);
        const message = e instanceof Error ? e.message : 'Invalid YAML';
        setMessage(`Invalid YAML: ${message}`);
        setErrorDetails(e instanceof Error ? e.stack || e.message : String(e));
      } finally {
        setValidating(false);
      }
    }, 0);
  }

  function handleClear() {
    setInput('');
    setValid(null);
    setMessage('');
    setErrorDetails(null);
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
    <ToolCard title="YAML Validator">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">YAML Input</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="key: value\n  nested:\n    key: value"
            className="min-h-[200px] rounded-xl font-mono text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={validate}
            disabled={validating || !input.trim()}
            className="rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/25 hover:from-pink-600 hover:to-rose-700"
          >
            {validating ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Validating...
              </>
            ) : (
              <>
                <FileText className="mr-1.5 h-4 w-4" />
                Validate YAML
              </>
            )}
          </Button>
          <Button onClick={handleClear} variant="outline" size="sm" className="rounded-xl">
            Clear
          </Button>
        </div>

        {valid !== null && (
          <div className={cn(
            'rounded-xl border p-4 text-center',
            valid ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'
          )}>
            <p className={valid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
              {message}
            </p>
            {errorDetails && (
              <details className="mt-2 text-left">
                <summary className="text-xs text-muted-foreground cursor-pointer">Error details</summary>
                <pre className="mt-2 text-xs font-mono text-red-600 dark:text-red-400 whitespace-pre-wrap">{errorDetails}</pre>
              </details>
            )}
          </div>
        )}
      </div>
    </ToolCard>
  );
}