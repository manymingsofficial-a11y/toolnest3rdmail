'use client';

import * as React from 'react';
import { Copy, Check, Shuffle, Replace} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl glass-card p-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">{title}</h3>
        <div className="mt-4 space-y-4">{children}</div>
      </div>
    </div>
  );
}

const WORDS = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
];

const SENTENCES = [
  'The quick brown fox jumps over the lazy dog.',
  'A journey of a thousand miles begins with a single step.',
  'To be or not to be, that is the question.',
  'The only thing we have to fear is fear itself.',
  'In the end, we will remember not the words of our enemies.',
  'Life is what happens when you are busy making other plans.',
  'The best way to predict the future is to invent it.',
  'Success is not final, failure is not fatal.',
];

export function TextRepeater() {
  const [text, setText] = React.useState('');
  const [count, setCount] = React.useState(5);
  const [separator, setSeparator] = React.useState('\\n');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    if (!text) {
      setResult('');
      return;
    }
    const sep = separator === '\\n' ? '\n' : separator === '\\t' ? '\t' : separator;
    setResult(Array(count).fill(text).join(sep));
  }, [text, count, separator]);

  return (
    <ToolCard title="Text Repeater">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Text to Repeat</Label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to repeat..."
          className="min-h-[100px] rounded-xl"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Repeat Count</Label>
          <Input
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(10000, Number(e.target.value) || 1)))}
            className="rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Separator</Label>
          <select
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-sm"
          >
            <option value="\\n">New Line</option>
            <option value="\\t">Tab</option>
            <option value=" ">Space</option>
            <option value=", ">Comma + Space</option>
          </select>
        </div>
      </div>
      {result && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Result ({result.length} chars)</Label>
          <Textarea value={result} readOnly className="min-h-[150px] rounded-xl font-mono text-sm" />
          <CopyButton text={result} />
        </div>
      )}
    </ToolCard>
  );
}

export function TextReverser() {
  const [text, setText] = React.useState('');
  const [mode, setMode] = React.useState<'chars' | 'lines' | 'words'>('chars');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    if (!text) {
      setResult('');
      return;
    }
    if (mode === 'chars') {
      setResult(text.split('').reverse().join(''));
    } else if (mode === 'lines') {
      setResult(text.split('\n').reverse().join('\n'));
    } else {
      setResult(text.split(' ').reverse().join(' '));
    }
  }, [text, mode]);

  return (
    <ToolCard title="Text Reverser">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Input Text</Label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to reverse..."
          className="min-h-[100px] rounded-xl"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium">Reverse Mode</Label>
        <div className="flex gap-2">
          {([
            ['chars', 'Characters'],
            ['words', 'Words'],
            ['lines', 'Lines'],
          ] as const).map(([val, label]) => (
            <Button
              key={val}
              variant={mode === val ? 'default' : 'outline'}
              size="sm"
              className="rounded-xl"
              onClick={() => setMode(val)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
      {result && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Reversed</Label>
          <Textarea value={result} readOnly className="min-h-[100px] rounded-xl font-mono text-sm" />
          <CopyButton text={result} />
        </div>
      )}
    </ToolCard>
  );
}

export function RandomTextGenerator() {
  const [type, setType] = React.useState<'words' | 'sentences' | 'paragraphs'>('words');
  const [count, setCount] = React.useState(10);
  const [result, setResult] = React.useState('');

  function generate() {
    let out = '';
    if (type === 'words') {
      const arr = Array.from({ length: count }, () => WORDS[Math.floor(Math.random() * WORDS.length)]);
      out = arr.join(' ');
    } else if (type === 'sentences') {
      const arr = Array.from({ length: count }, () => SENTENCES[Math.floor(Math.random() * SENTENCES.length)]);
      out = arr.join(' ');
    } else {
      const paras = Array.from({ length: count }, () => {
        const sc = 3 + Math.floor(Math.random() * 4);
        return Array.from({ length: sc }, () => SENTENCES[Math.floor(Math.random() * SENTENCES.length)]).join(' ');
      });
      out = paras.join('\n\n');
    }
    setResult(out);
  }

  return (
    <ToolCard title="Random Text Generator">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Type</Label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as typeof type)}
            className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-sm"
          >
            <option value="words">Words</option>
            <option value="sentences">Sentences</option>
            <option value="paragraphs">Paragraphs</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Count</Label>
          <Input
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
            className="rounded-xl"
          />
        </div>
      </div>
      <Button onClick={generate} className="rounded-xl">
        <Shuffle className="mr-1.5 h-4 w-4" />
        Generate
      </Button>
      {result && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Result</Label>
          <Textarea value={result} readOnly className="min-h-[150px] rounded-xl text-sm" />
          <CopyButton text={result} />
        </div>
      )}
    </ToolCard>
  );
}

export function LineCounter() {
  const [text, setText] = React.useState('');
  const stats = React.useMemo(() => {
    const lines = text ? text.split('\n') : [];
    const nonEmpty = lines.filter((l) => l.trim().length > 0);
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return {
      lines: lines.length,
      nonEmptyLines: nonEmpty.length,
      words,
      chars: text.length,
      charsNoSpaces: text.replace(/\s/g, '').length,
    };
  }, [text]);

  return (
    <ToolCard title="Line Counter">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Input Text</Label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter or paste text here..."
          className="min-h-[150px] rounded-xl"
        />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          ['Lines', stats.lines],
          ['Non-Empty', stats.nonEmptyLines],
          ['Words', stats.words],
          ['Characters', stats.chars],
          ['No Spaces', stats.charsNoSpaces],
        ].map(([label, val]) => (
          <div key={label as string} className="rounded-xl border border-border/60 bg-muted/30 p-4 text-center">
            <p className="text-2xl font-bold">{val as number}</p>
            <p className="mt-1 text-xs text-muted-foreground">{label as string}</p>
          </div>
        ))}
      </div>
    </ToolCard>
  );
}

export function RemoveExtraSpaces() {
  const [text, setText] = React.useState('');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(
      text
        .replace(/[ \t]+/g, ' ')
        .replace(/ *\n */g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim()
    );
  }, [text]);

  return (
    <ToolCard title="Remove Extra Spaces">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Input Text</Label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text with extra spaces..."
          className="min-h-[100px] rounded-xl"
        />
      </div>
      {result && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Cleaned Text</Label>
          <Textarea value={result} readOnly className="min-h-[100px] rounded-xl text-sm" />
          <CopyButton text={result} />
        </div>
      )}
    </ToolCard>
  );
}

export function TextCompare() {
  const [left, setLeft] = React.useState('');
  const [right, setRight] = React.useState('');

  const diff = React.useMemo(() => {
    const leftLines = left.split('\n');
    const rightLines = right.split('\n');
    const maxLen = Math.max(leftLines.length, rightLines.length);
    const rows: { left: string; right: string; same: boolean }[] = [];
    for (let i = 0; i < maxLen; i++) {
      const l = leftLines[i] ?? '';
      const r = rightLines[i] ?? '';
      rows.push({ left: l, right: r, same: l === r });
    }
    return rows;
  }, [left, right]);

  return (
    <ToolCard title="Text Compare">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Left Text</Label>
          <Textarea
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            placeholder="Enter first text..."
            className="min-h-[200px] rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Right Text</Label>
          <Textarea
            value={right}
            onChange={(e) => setRight(e.target.value)}
            placeholder="Enter second text..."
            className="min-h-[200px] rounded-xl"
          />
        </div>
      </div>
      {(left || right) && (
        <div className="overflow-hidden rounded-xl border border-border/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/30">
                <th className="px-3 py-2 text-left font-medium">Left</th>
                <th className="px-3 py-2 text-left font-medium">Right</th>
              </tr>
            </thead>
            <tbody>
              {diff.map((row, i) => (
                <tr
                  key={i}
                  className={cn(
                    'border-b border-border/40 last:border-0',
                    !row.same && 'bg-red-500/10'
                  )}
                >
                  <td className="px-3 py-1.5 font-mono text-xs">{row.left || '—'}</td>
                  <td className="px-3 py-1.5 font-mono text-xs">{row.right || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </ToolCard>
  );
}

export function FindAndReplace() {
  const [text, setText] = React.useState('');
  const [find, setFind] = React.useState('');
  const [replace, setReplace] = React.useState('');
  const [useRegex, setUseRegex] = React.useState(false);
  const [caseSensitive, setCaseSensitive] = React.useState(false);
  const [result, setResult] = React.useState('');
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!text || !find) {
      setResult(text);
      setCount(0);
      return;
    }
    try {
      let count = 0;
      let out: string;
      if (useRegex) {
        const flags = caseSensitive ? 'g' : 'gi';
        const re = new RegExp(find, flags);
        out = text.replace(re, () => {
          count++;
          return replace;
        });
      } else {
        const flags = caseSensitive ? 'g' : 'gi';
        const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp(escaped, flags);
        out = text.replace(re, () => {
          count++;
          return replace;
        });
      }
      setResult(out);
      setCount(count);
    } catch {
      setResult(text);
      setCount(0);
    }
  }, [text, find, replace, useRegex, caseSensitive]);

  return (
    <ToolCard title="Find & Replace">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Input Text</Label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text..."
          className="min-h-[100px] rounded-xl"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Find</Label>
          <Input value={find} onChange={(e) => setFind(e.target.value)} className="rounded-xl" placeholder="Text or regex to find" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Replace With</Label>
          <Input value={replace} onChange={(e) => setReplace(e.target.value)} className="rounded-xl" placeholder="Replacement text" />
        </div>
      </div>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} />
          Use Regex
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />
          Case Sensitive
        </label>
      </div>
      {result && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Result ({count} replacements)</Label>
          <Textarea value={result} readOnly className="min-h-[100px] rounded-xl text-sm" />
          <CopyButton text={result} />
        </div>
      )}
    </ToolCard>
  );
}

export function TextCleaner() {
  const [text, setText] = React.useState('');
  const [opts, setOpts] = React.useState({
    trimLines: true,
    collapseSpaces: true,
    removeEmptyLines: false,
    removeSpecialChars: false,
    removeHtmlTags: false,
    toLowerCase: false,
  });
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    let out = text;
    if (opts.removeHtmlTags) out = out.replace(/<[^>]*>/g, '');
    if (opts.removeSpecialChars) out = out.replace(/[^\w\s\n.,!?;:'"()-]/g, '');
    if (opts.collapseSpaces) out = out.replace(/[ \t]+/g, ' ');
    if (opts.trimLines) out = out.split('\n').map((l) => l.trim()).join('\n');
    if (opts.removeEmptyLines) out = out.split('\n').filter((l) => l.trim().length > 0).join('\n');
    if (opts.toLowerCase) out = out.toLowerCase();
    setResult(out);
  }, [text, opts]);

  return (
    <ToolCard title="Text Cleaner">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Input Text</Label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text to clean..."
          className="min-h-[100px] rounded-xl"
        />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {([
          ['trimLines', 'Trim each line'],
          ['collapseSpaces', 'Collapse multiple spaces'],
          ['removeEmptyLines', 'Remove empty lines'],
          ['removeSpecialChars', 'Remove special characters'],
          ['removeHtmlTags', 'Remove HTML tags'],
          ['toLowerCase', 'Convert to lowercase'],
        ] as const).map(([key, label]) => (
          <label key={key} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={opts[key]}
              onChange={(e) => setOpts({ ...opts, [key]: e.target.checked })}
            />
            {label}
          </label>
        ))}
      </div>
      {result && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Cleaned Text</Label>
          <Textarea value={result} readOnly className="min-h-[100px] rounded-xl text-sm" />
          <CopyButton text={result} />
        </div>
      )}
    </ToolCard>
  );
}

export function MarkdownPreview() {
  const [text, setText] = React.useState('# Hello World\n\nThis is **bold** and *italic*.\n\n- Item 1\n- Item 2\n\n[Link](https://example.com)');

  function renderMarkdown(md: string): string {
    let html = md
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/`(.+?)`/g, '<code>$1</code>');
    html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    html = html.replace(/<p><h/g, '<h');
    html = html.replace(/<\/h(\d)><\/p>/g, '</h$1>');
    html = html.replace(/<p><ul/g, '<ul');
    html = html.replace(/<\/ul><\/p>/g, '</ul>');
    return html;
  }

  return (
    <ToolCard title="Markdown Preview">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Markdown Input</Label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[300px] rounded-xl font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Preview</Label>
          <div
            className="min-h-[300px] overflow-auto rounded-xl border border-border/60 bg-background p-4 prose-sm"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(text) }}
          />
        </div>
      </div>
    </ToolCard>
  );
}

export function HtmlToText() {
  const [html, setHtml] = React.useState('');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    if (!html) {
      setResult('');
      return;
    }
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    tmp.querySelectorAll('script,style').forEach((el) => el.remove());
    setResult(tmp.textContent || '');
  }, [html]);

  return (
    <ToolCard title="HTML to Text">
      <div className="space-y-2">
        <Label className="text-sm font-medium">HTML Input</Label>
        <Textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder="<p>Paste HTML here...</p>"
          className="min-h-[150px] rounded-xl font-mono text-sm"
        />
      </div>
      {result && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Plain Text</Label>
          <Textarea value={result} readOnly className="min-h-[150px] rounded-xl text-sm" />
          <CopyButton text={result} />
        </div>
      )}
    </ToolCard>
  );
}
