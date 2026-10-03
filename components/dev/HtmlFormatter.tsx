'use client';

import * as React from 'react';
import { Copy, Check, Loader2, X, FileCode2, AlertCircle, RotateCcw, Minimize2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Void elements that don't need closing tags
const voidElements = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr', 'area',
  'basefont', 'bgsound', 'colgroup', 'command', 'embed', 'frame',
  'image', 'isindex', 'keygen', 'menuitem', 'nextid', 'spacer'
]);

export function HtmlFormatter() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [formatting, setFormatting] = React.useState(false);
  const [mode, setMode] = React.useState<'beautify' | 'minify'>('beautify');
  const [indentSize, setIndentSize] = React.useState(2);

  function formatHtml(input: string, mode: 'beautify' | 'minify', indentSize: number): { formatted: string; error?: string } {
    const html = input.trim();
    if (!html) return { formatted: '' };

    try {
      if (mode === 'minify') {
        return { formatted: minifyHtml(html) };
      } else {
        return { formatted: beautifyHtml(html, indentSize) };
      }
    } catch (e) {
      return { formatted: '', error: e instanceof Error ? e.message : 'Failed to process HTML' };
    }
  }

  function minifyHtml(html: string): string {
    return html
      // Remove comments (but keep IE conditional comments)
      .replace(/<!--(?!\[if|!\[endif\])[\s\S]*?-->/g, '')
      // Remove whitespace between tags
      .replace(/>\s+</g, '><')
      // Collapse whitespace in text nodes (but preserve in pre, textarea, script, style)
      .replace(/>([\s\S]*?)<\/((?:pre|textarea|script|style))>/g, (match, content, tag) => {
        return '>' + content + '</' + tag + '>';
      })
      // Collapse whitespace between tags
      .replace(/>\s+</g, '><')
      // Remove leading/trailing whitespace
      .trim();
  }

  function beautifyHtml(html: string, indentSize: number): string {
    const indentStr = ' '.repeat(indentSize);
    let result = '';

    // Pre-formatting: normalize whitespace
    let normalizedHtml = html
      // Normalize line endings
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      // Remove excess whitespace between tags (but preserve in pre/textarea/script/style)
      .replace(/>(\s+)<\/((?:pre|textarea|script|style))>/g, (match, ws, tag) => {
        return '>' + ws + '</' + tag + '>';
      });

    // Tokenize HTML
    const tokens: { type: 'tag' | 'text' | 'comment' | 'doctype' | 'cdata'; value: string; tagName?: string; isClosing?: boolean; isSelfClosing?: boolean }[] = [];
    
    let i = 0;
    while (i < normalizedHtml.length) {
      const ch = normalizedHtml[i];
      
      if (normalizedHtml.startsWith('<!--', i)) {
        // Comment
        const end = normalizedHtml.indexOf('-->', i);
        if (end === -1) break;
        tokens.push({ type: 'comment', value: normalizedHtml.slice(i, end + 3) });
        i = end + 3;
        continue;
      }
      
      if (normalizedHtml.startsWith('<![CDATA[', i)) {
        // CDATA
        const end = normalizedHtml.indexOf(']]>', i);
        if (end === -1) break;
        tokens.push({ type: 'cdata', value: normalizedHtml.slice(i, end + 3) });
        i = end + 3;
        continue;
      }
      
      if (normalizedHtml.startsWith('<!DOCTYPE', i) || normalizedHtml.startsWith('<!doctype', i)) {
        // DOCTYPE
        const end = normalizedHtml.indexOf('>', i);
        if (end === -1) break;
        tokens.push({ type: 'doctype', value: normalizedHtml.slice(i, end + 1) });
        i = end + 1;
        continue;
      }
      
      if (normalizedHtml[i] === '<') {
        // Tag
        const end = normalizedHtml.indexOf('>', i);
        if (end === -1) break;
        const tagContent = normalizedHtml.slice(i, end + 1);
        const tagMatch = tagContent.match(/^<\/?([a-zA-Z0-9:_-]+)/);
        const tagName = tagMatch ? tagMatch[1].toLowerCase() : '';
        const isClosing = tagContent.startsWith('</');
        const isSelfClosing = tagContent.endsWith('/>') || (voidElements.has(tagName) && !isClosing);
        
        tokens.push({
          type: 'tag',
          value: tagContent,
          tagName,
          isClosing,
          isSelfClosing
        });
        i = end + 1;
        continue;
      }
      
      // Text content
      const nextTag = normalizedHtml.indexOf('<', i);
      if (nextTag === -1) {
        tokens.push({ type: 'text', value: normalizedHtml.slice(i) });
        break;
      }
      if (nextTag > i) {
        tokens.push({ type: 'text', value: normalizedHtml.slice(i, nextTag) });
      }
      i = nextTag;
    }

    // Now format
    let indentLevel = 0;
    
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      
      if (token.type === 'comment') {
        result += '  '.repeat(indentLevel) + token.value + '\n';
      } else if (token.type === 'doctype') {
        result += token.value + '\n';
      } else if (token.type === 'cdata') {
        result += '  '.repeat(indentLevel) + token.value + '\n';
      } else if (token.type === 'text') {
        const trimmed = token.value.trim();
        if (trimmed) {
          result += '  '.repeat(indentLevel) + trimmed + '\n';
        }
      } else if (token.type === 'tag') {
        const { value, tagName, isClosing, isSelfClosing } = token;
        const safeTagName = tagName ?? '';
        
        if (isClosing) {
          indentLevel = Math.max(0, indentLevel - 1);
          result += '  '.repeat(indentLevel) + value + '\n';
        } else if (isSelfClosing || voidElements.has(safeTagName)) {
          result += '  '.repeat(indentLevel) + value + '\n';
        } else {
          result += '  '.repeat(indentLevel) + value + '\n';
          indentLevel++;
        }
      }
    }
    
    return result.trim();
  }

  function format() {
    setError(null);
    setFormatting(true);
    setOutput('');

    setTimeout(() => {
      try {
        const result = formatHtml(input, mode, indentSize);
        setOutput(result.formatted);
        toast.success(mode === 'beautify' ? 'HTML formatted!' : 'HTML minified!');
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to process HTML');
        toast.error('Failed to process HTML');
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
    <ToolCard title="HTML Formatter">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">HTML Input</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="<div>\n  <p>Hello</p>\n</div>"
            className="min-h-[200px] rounded-xl font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setMode('beautify')}
              variant={mode === 'beautify' ? 'default' : 'outline'}
              size="sm"
              className="rounded-xl"
            >
              Beautify
            </Button>
            <Button
              onClick={() => setMode('minify')}
              variant={mode === 'minify' ? 'default' : 'outline'}
              size="sm"
              className="rounded-xl"
            >
              <Minimize2 className="mr-1.5 h-4 w-4" />Minify
            </Button>
          </div>
          
          {mode === 'beautify' && (
            <div className="space-y-2">
              <Label className="flex items-center justify-between text-sm font-medium">
                <span>Indent Size: {indentSize} spaces</span>
              </Label>
              <Select value={indentSize.toString()} onValueChange={(v) => setIndentSize(Number(v))}>
                <SelectTrigger className="w-full max-w-xs">
                  <SelectValue placeholder="Select indent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 space</SelectItem>
                  <SelectItem value="2">2 spaces</SelectItem>
                  <SelectItem value="4">4 spaces</SelectItem>
                  <SelectItem value="t">Tab</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={format}
            disabled={formatting || !input.trim()}
            className="rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-red-700"
          >
            {formatting ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {mode === 'beautify' ? (
                  <FileCode2 className="mr-1.5 h-4 w-4" />
                ) : (
                  <Minimize2 className="mr-1.5 h-4 w-4" />
                )}
                {mode === 'beautify' ? 'Format' : 'Minify'}
              </>
            )}
          </Button>
          <Button onClick={handleClear} variant="outline" size="sm" className="rounded-xl">
            <RotateCcw className="mr-1.5 h-4 w-4" />Clear
          </Button>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        {output && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Result</Label>
            <Textarea value={output} readOnly className="min-h-[200px] rounded-xl font-mono text-sm" />
            <CopyButton text={output} />
          </div>
        )}
      </div>
    </ToolCard>
  );
}