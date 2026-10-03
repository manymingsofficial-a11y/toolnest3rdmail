'use client';

import * as React from 'react';
import { Copy, Check, Loader2, X, Image as ImageIcon, AlertCircle, Settings, Download, FileText } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export function SvgOptimizer() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [optimizing, setOptimizing] = React.useState(false);
  const [stats, setStats] = React.useState<{ original: number; optimized: number; saved: number } | null>(null);
  const [copied, setCopied] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Optimization options - mapped to SVGO plugin configs
  const [options, setOptions] = React.useState({
    removeComments: true,
    removeDoctype: true,
    removeXMLProcInst: true,
    removeMetadata: true,
    removeTitle: false,
    removeDesc: false,
    removeUselessDefs: true,
    removeEditorsNSData: true,
    removeEmptyAttrs: true,
    removeHiddenElems: true,
    removeEmptyText: true,
    removeEmptyContainers: true,
    removeViewBox: false,
    cleanupEnableBackground: true,
    cleanupAttrs: true,
    mergePaths: true,
    convertShapeToPath: true,
    convertPathData: true,
    collapseGroups: true,
    removeUnusedNS: true,
    cleanupIDs: true,
    cleanupNumericValues: true,
    moveElemsAttrsToGroup: true,
    moveGroupAttrsToElems: true,
    cleanupListOfValues: true,
  });

  function handleOptionChange(key: string, value: boolean) {
    setOptions(prev => ({ ...prev, [key]: value }));
  }

  async function optimize() {
    setError(null);
    setOptimizing(true);
    setOutput('');

    try {
      // Use SVGO browser build - exports `optimize` function directly
      const { optimize: svgoOptimize } = await import('svgo/browser');

      // Convert options object to SVGO plugin config array format
      // Built-in plugins can be specified as strings (SVGO v4 accepts strings for built-in plugins)
      const plugins = Object.entries(options)
        .filter(([, enabled]) => enabled)
        .map(([name]) => name);

      const result = svgoOptimize(input, {
        multipass: true,
        plugins: plugins as any, // SVGO v4 browser accepts string[] for built-in plugins
        js2svg: {
          pretty: true,
          indent: 2,
        },
      });

      // svgo/browser optimize returns { data } on success, throws on error
      setOutput(result.data);
      const original = input.length;
      const optimized = result.data.length;
      const saved = original - optimized;
      setStats({ original, optimized, saved });
      toast.success('SVG optimized!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to optimize SVG');
      toast.error('Failed to optimize SVG');
    } finally {
      setOptimizing(false);
    }
  }

  function handleClear() {
    setInput('');
    setOutput('');
    setError(null);
    setStats(null);
    if (inputRef.current) inputRef.current.value = '';
  }

  function handleDownload() {
    if (!output) return;
    const blob = new Blob([output], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded!');
  }

  function handleCopy() {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleExample() {
    const example = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <!-- This is a comment -->
  <title>Example SVG</title>
  <desc>An example SVG for testing</desc>
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" fill="url(#grad1)" />
  <circle cx="50" cy="50" r="40" fill="blue" stroke="black" stroke-width="2" />
  <text x="50" y="55" font-size="12" text-anchor="middle" fill="white">SVG</text>
</svg>`;
    setInput(example);
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
    <ToolCard title="SVG Optimizer">
      <div className="space-y-4">
        {/* Upload zone for file input */}
        <div
          onDragOver={(e) => { e.preventDefault(); }}
          onDragLeave={() => {}}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file && file.type === 'image/svg+xml') {
              const reader = new FileReader();
              reader.onload = (e) => setInput(e.target?.result as string);
              reader.readAsText(file);
            } else {
              toast.error('Please drop an SVG file');
            }
          }}
          onClick={() => inputRef.current?.click()}
          className={cn(
            'flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-300',
            input ? 'border-border/60' : 'border-border/60 hover:border-brand-purple/50'
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/svg+xml"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => setInput(e.target?.result as string);
                reader.readAsText(file);
              }
              e.target.value = '';
            }}
          />
          <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
          <p className="mt-3 text-sm font-medium">
            {input ? 'SVG loaded. Drop another or click to replace.' : 'Drag & drop an SVG file or click to browse'}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">SVG files only</p>
        </div>

        {/* Text input area */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Or paste SVG code</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your SVG code here..."
            className="min-h-[150px] rounded-xl font-mono text-sm"
          />
        </div>

        {input && (
          <div className="rounded-lg border border-border/60 bg-muted/30 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ImageIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">SVG file</p>
                <p className="text-xs text-muted-foreground">{input.length} characters</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Options */}
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">Optimization Options</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { key: 'removeComments', label: 'Remove comments' },
              { key: 'removeDoctype', label: 'Remove DOCTYPE' },
              { key: 'removeXMLProcInst', label: 'Remove XML prolog' },
              { key: 'removeMetadata', label: 'Remove <metadata>' },
              { key: 'removeTitle', label: 'Remove <title>' },
              { key: 'removeDesc', label: 'Remove <desc>' },
              { key: 'removeUselessDefs', label: 'Remove useless defs' },
              { key: 'removeEditorsNSData', label: 'Remove editor namespaces' },
              { key: 'removeEmptyAttrs', label: 'Remove empty attributes' },
              { key: 'removeHiddenElems', label: 'Remove hidden elements' },
              { key: 'removeEmptyText', label: 'Remove empty text' },
              { key: 'removeEmptyContainers', label: 'Remove empty containers' },
              { key: 'removeViewBox', label: 'Remove viewBox' },
              { key: 'cleanupEnableBackground', label: 'Cleanup enable-background' },
              { key: 'cleanupAttrs', label: 'Cleanup attributes' },
              { key: 'mergePaths', label: 'Merge paths' },
              { key: 'convertShapeToPath', label: 'Convert shapes to paths' },
              { key: 'convertPathData', label: 'Optimize path data' },
              { key: 'collapseGroups', label: 'Collapse groups' },
              { key: 'removeUnusedNS', label: 'Remove unused namespaces' },
              { key: 'cleanupIDs', label: 'Cleanup IDs' },
              { key: 'cleanupNumericValues', label: 'Cleanup numeric values' },
              { key: 'moveElemsAttrsToGroup', label: 'Move elem attrs to group' },
              { key: 'moveGroupAttrsToElems', label: 'Move group attrs to elems' },
              { key: 'cleanupListOfValues', label: 'Cleanup list of values' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options[key as keyof typeof options]}
                  onChange={(e) => handleOptionChange(key, e.target.checked)}
                  className="h-4 w-4 rounded border-border/60 text-brand-purple focus:ring-brand-purple/20"
                />
                <span className="text-sm text-muted-foreground">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={optimize}
            disabled={optimizing || !input.trim()}
            className="rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-500/25 hover:from-purple-600 hover:to-violet-700"
          >
            {optimizing ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Settings className="mr-1.5 h-4 w-4" />
                Optimize SVG
              </>
            )}
          </Button>
          <Button onClick={handleExample} variant="outline" size="sm" className="rounded-xl">
            <FileText className="mr-1.5 h-4 w-4" />Load Example
          </Button>
          <Button onClick={handleClear} variant="outline" size="sm" className="rounded-xl">
            <X className="mr-1.5 h-4 w-4" />Clear
          </Button>
        </div>

        {error && (
          <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {output && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Result</span>
              <div className="flex gap-2">
                <Button onClick={handleDownload} variant="outline" size="sm" className="rounded-xl">
                  <Download className="mr-1.5 h-4 w-4" />
                  Download
                </Button>
                <Button onClick={handleCopy} variant="outline" size="sm" className="rounded-xl">
                  {copied ? (
                    <>
                      <Check className="mr-1.5 h-4 w-4 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-1.5 h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm">
              <div className="flex items-center gap-2 text-green-500">
                <span className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="h-3 w-3" />
                </span>
                <span>Optimization complete! {stats ? `Saved ${stats.saved} bytes (${Math.round((stats.saved / stats.original) * 100)}%)` : ''}</span>
              </div>
            </div>
            <Button onClick={handleDownload} className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white">
              <Download className="mr-1.5 h-4 w-4" />
              Download Optimized SVG
            </Button>
          </div>
        )}
      </div>
    </ToolCard>
  );
}