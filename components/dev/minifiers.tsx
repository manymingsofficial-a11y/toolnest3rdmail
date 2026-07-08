'use client';

import * as React from 'react';

import { DevShell, CodeArea, CopyButton, DownloadButton } from './dev-ui';
import { Button } from '@/components/ui/button';
import { RotateCcw, Minimize2 } from 'lucide-react';

export function HtmlFormatter() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [mode, setMode] = React.useState<'beautify' | 'minify'>('beautify');

  function beautify(html: string): string {
    let indent = 0;
    const tab = '  ';
    let result = '';
    const lines = html.replace(/></g, '>\n<').split('\n');
    for (let line of lines) {
      line = line.trim();
      if (!line) continue;
      if (line.startsWith('</')) indent--;
      result += tab.repeat(Math.max(0, indent)) + line + '\n';
      if (
        line.startsWith('<') &&
        !line.startsWith('</') &&
        !line.endsWith('/>') &&
        !line.includes('</') &&
        !line.match(/<(meta|link|br|hr|img|input|source|track|wbr|area|base|col|embed|param)\b/i)
      ) {
        indent++;
      }
    }
    return result.trim();
  }

  function minify(html: string): string {
    return html
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
  }

  React.useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      return;
    }
    setOutput(mode === 'beautify' ? beautify(input) : minify(input));
  }, [input, mode]);

  function reset() {
    setInput('');
    setOutput('');
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => setMode('beautify')} size="sm" className={`rounded-xl ${mode === 'beautify' ? 'bg-gradient-brand text-white' : 'border border-border/60'}`} variant={mode === 'beautify' ? 'default' : 'outline'}>
          Beautify
        </Button>
        <Button onClick={() => setMode('minify')} size="sm" className={`rounded-xl ${mode === 'minify' ? 'bg-gradient-brand text-white' : 'border border-border/60'}`} variant={mode === 'minify' ? 'default' : 'outline'}>
          <Minimize2 className="h-4 w-4" /> Minify
        </Button>
        <Button onClick={reset} size="sm" variant="outline" className="rounded-xl">
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
      </div>
      <DevShell
        input={<CodeArea value={input} onChange={setInput} placeholder="<div>\n  <p>Hello</p>\n</div>" />}
        output={<CodeArea value={output} placeholder="Formatted HTML…" />}
        actions={
          <div className="flex gap-2">
            <CopyButton text={output} />
            <DownloadButton text={output} filename="formatted.html" />
          </div>
        }
      />
    </div>
  );
}

export function CssMinifier() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [saved, setSaved] = React.useState(0);

  React.useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setSaved(0);
      return;
    }
    const minified = input
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,])\s*/g, '$1')
      .replace(/;}/g, '}')
      .trim();
    setOutput(minified);
    setSaved(input.length - minified.length);
  }, [input]);

  return (
    <div className="space-y-4">
      <DevShell
        input={<CodeArea value={input} onChange={setInput} placeholder=".class {\n  color: red;\n  margin: 0;\n}" />}
        output={<CodeArea value={output} placeholder="Minified CSS…" />}
        actions={
          <div className="flex gap-2">
            <CopyButton text={output} />
            <DownloadButton text={output} filename="style.min.css" />
          </div>
        }
      />
      {saved > 0 && (
        <p className="text-sm text-muted-foreground">
          Saved <span className="font-semibold text-green-600 dark:text-green-400">{saved}</span> bytes ({Math.round((saved / input.length) * 100)}%)
        </p>
      )}
    </div>
  );
}

export function JsMinifier() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [saved, setSaved] = React.useState(0);

  React.useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setSaved(0);
      return;
    }
    const minified = input
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}();,:=<>+\-*/%&|^!?\[\]])\s*/g, '$1')
      .replace(/;\s*}/g, '}')
      .trim();
    setOutput(minified);
    setSaved(input.length - minified.length);
  }, [input]);

  return (
    <div className="space-y-4">
      <DevShell
        input={<CodeArea value={input} onChange={setInput} placeholder="function hello() {\n  console.log('hi');\n}" />}
        output={<CodeArea value={output} placeholder="Minified JS…" />}
        actions={
          <div className="flex gap-2">
            <CopyButton text={output} />
            <DownloadButton text={output} filename="script.min.js" />
          </div>
        }
      />
      {saved > 0 && (
        <p className="text-sm text-muted-foreground">
          Saved <span className="font-semibold text-green-600 dark:text-green-400">{saved}</span> bytes ({Math.round((saved / input.length) * 100)}%)
        </p>
      )}
    </div>
  );
}
