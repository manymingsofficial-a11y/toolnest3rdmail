'use client';

import * as React from 'react';
import { Copy, Check, Loader2, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

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

export function XmlFormatter() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [formatting, setFormatting] = React.useState(false);

  function formatXml(input: string): { formatted: string; error?: string } {
    const xml = input.trim();
    if (!xml) return { formatted: '' };

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'text/xml');

      const parserError = doc.querySelector('parsererror');
      if (parserError) {
        return { formatted: '', error: parserError.textContent || 'Invalid XML syntax' };
      }

      // Serialize with pretty printing
      const serializer = new XMLSerializer();
      const serialized = serializer.serializeToString(doc);

      // More sophisticated formatting - parse with proper indentation
      let formatted = '';
      let indentLevel = 0;
      const indentStr = '  ';

      // Split by tags
      const parts = serialized.split(/(<[^>]*>)/g);

      for (const part of parts) {
        if (!part) continue;

        if (part.startsWith('<?xml')) {
          // XML declaration
          formatted += part + '\n';
        } else if (part.startsWith('<!DOCTYPE')) {
          formatted += part + '\n';
        } else if (part.startsWith('<!--')) {
          formatted += indentStr.repeat(indentLevel) + part + '\n';
        } else if (part.startsWith('<![CDATA[')) {
          formatted += part;
        } else if (part.startsWith('</')) {
          // Closing tag
          indentLevel = Math.max(0, indentLevel - 1);
          formatted += indentStr.repeat(indentLevel) + part + '\n';
        } else if (part.startsWith('<') && part.endsWith('/>')) {
          // Self-closing tag
          formatted += indentStr.repeat(indentLevel) + part + '\n';
        } else if (part.startsWith('<') && part.endsWith('>')) {
          // Opening tag
          formatted += indentStr.repeat(indentLevel) + part + '\n';
          // Check if it's not a void element
          const tagMatch = part.match(/^<([a-zA-Z0-9:_-]+)/);
          if (tagMatch) {
            const tagName = tagMatch[1].toLowerCase();
            const voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
            if (!voidElements.includes(tagName)) {
              indentLevel++;
            }
          }
        } else {
          // Text content
          const trimmed = part.trim();
          if (trimmed) {
            formatted += indentStr.repeat(indentLevel) + trimmed + '\n';
          }
        }
      }

      return { formatted: formatted.trim() };
    } catch (e) {
      return { formatted: '', error: e instanceof Error ? e.message : 'Failed to format XML' };
    }
  }

  function format() {
    setError(null);
    setFormatting(true);
    setOutput('');

    setTimeout(() => {
      try {
        const result = formatXml(input);
        if (result.error) {
          setError(result.error);
          toast.error(result.error);
        } else {
          setOutput(result.formatted);
          toast.success('XML formatted!');
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to format XML');
        toast.error('Failed to format XML');
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
    <ToolCard title="XML Formatter">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">XML Input</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='<?xml version="1.0"?>\n<root>\n  <item>value</item>\n</root>'
            className="min-h-[200px] rounded-xl font-mono text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={format}
            disabled={formatting || !input.trim()}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-700"
          >
            {formatting ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Formatting...
              </>
            ) : (
              <>
                <AlertCircle className="mr-1.5 h-4 w-4" />
                Format XML
              </>
            )}
          </Button>
          <Button onClick={() => { setInput(''); setOutput(''); setError(null); }} variant="outline" size="sm" className="rounded-xl">
            <X className="mr-1.5 h-4 w-4" />Clear
          </Button>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        {output && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Formatted XML</Label>
            <Textarea value={output} readOnly className="min-h-[200px] rounded-xl font-mono text-sm" />
            <CopyButton text={output} />
          </div>
        )}
      </div>
    </ToolCard>
  );
}