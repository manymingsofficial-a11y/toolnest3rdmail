'use client';

import * as React from 'react';
import JsBarcode from 'jsbarcode';
import {
  Check,
  Copy,
  Download,
  Eraser,
  Barcode as BarcodeIcon,
  Sparkles,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

type Format = 'CODE128' | 'CODE39' | 'EAN13' | 'EAN8' | 'UPC' | 'UPC-E';

const formats: { id: Format; label: string; hint: string }[] = [
  { id: 'CODE128', label: 'Code128', hint: 'Any text — most flexible' },
  { id: 'CODE39', label: 'Code39', hint: 'A-Z 0-9 and a few symbols' },
  { id: 'EAN13', label: 'EAN-13', hint: 'Exactly 12 or 13 digits' },
  { id: 'EAN8', label: 'EAN-8', hint: 'Exactly 7 or 8 digits' },
  { id: 'UPC', label: 'UPC-A', hint: 'Exactly 11 or 12 digits' },
  { id: 'UPC-E', label: 'UPC-E', hint: '6 or 7 compressed digits' },
];

const PRESET_COLORS = [
  '#0f172a',
  '#2563eb',
  '#7c3aed',
  '#db2777',
  '#dc2626',
  '#ea580c',
  '#16a34a',
  '#0d9488',
];

export function BarcodeGenerator() {
  const [format, setFormat] = React.useState<Format>('CODE128');
  const [value, setValue] = React.useState('');
  const [barWidth, setBarWidth] = React.useState(2);
  const [height, setHeight] = React.useState(100);
  const [fontSize, setFontSize] = React.useState(20);
  const [margin, setMargin] = React.useState(10);
  const [lineColor, setLineColor] = React.useState('#0f172a');
  const [bgColor, setBgColor] = React.useState('#ffffff');
  const [displayValue, setDisplayValue] = React.useState(true);

  const [copied, setCopied] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [generated, setGenerated] = React.useState(false);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);

  const render = React.useCallback(() => {
    const canvas = canvasRef.current;
    const svg = svgRef.current;
    if (!canvas || !svg) return;

    setError(null);
    if (!value) {
      setGenerated(false);
      return;
    }

    const options = {
      format,
      width: barWidth,
      height,
      fontSize,
      margin,
      marginBlock: Math.round(margin * 0.4),
      displayValue,
      lineColor,
      background: bgColor,
      font: 'monospace',
      textMargin: 2,
    };

    try {
      JsBarcode(canvas, value, options);
      JsBarcode(svg, value, options);
      setGenerated(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid input for this format');
      setGenerated(false);
    }
  }, [value, format, barWidth, height, fontSize, margin, displayValue, lineColor, bgColor]);

  React.useEffect(() => {
    render();
  }, [render]);

  function copyText() {
    if (!value) return;
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  function clearAll() {
    setValue('');
    setError(null);
    setGenerated(false);
  }

  function downloadPng() {
    const canvas = canvasRef.current;
    if (!canvas || !generated) return;
    canvas.toBlob((b) => {
      if (b) triggerDownload(b, 'barcode.png');
    }, 'image/png');
  }

  function downloadSvg() {
    const svg = svgRef.current;
    if (!svg || !generated) return;
    const xml = new XMLSerializer().serializeToString(svg);
    triggerDownload(
      new Blob([xml], { type: 'image/svg+xml;charset=utf-8' }),
      'barcode.svg'
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="rounded-2xl glass-card p-6">
          <Label className="text-sm font-medium">Barcode format</Label>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {formats.map((f) => (
              <button
                key={f.id}
                onClick={() => setFormat(f.id)}
                className={cn(
                  'rounded-xl border px-3 py-2.5 text-left transition-all',
                  format === f.id
                    ? 'border-transparent bg-gradient-brand text-white shadow-md shadow-brand-purple/25'
                    : 'border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
                )}
              >
                <span className="block text-sm font-semibold">{f.label}</span>
                <span
                  className={cn(
                    'mt-0.5 block text-xs',
                    format === f.id ? 'text-white/80' : 'text-muted-foreground/80'
                  )}
                >
                  {f.hint}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl glass-card p-6">
          <Field label="Text / value to encode" hint={formats.find((f) => f.id === format)?.hint}>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={getPlaceholder(format)}
              className="rounded-xl font-mono"
            />
          </Field>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={copyText}
              disabled={!value}
              className="rounded-xl"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Copy Text'}
            </Button>
            <Button
              variant="outline"
              onClick={clearAll}
              className="rounded-xl"
            >
              <Eraser className="h-4 w-4" />
              Clear
            </Button>
            <Button
              onClick={render}
              disabled={!value}
              className="rounded-xl bg-gradient-brand text-white"
            >
              <Sparkles className="h-4 w-4" />
              Generate
            </Button>
          </div>

          {error && (
            <p className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          )}
        </div>

        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Customization
          </h3>
          <div className="mt-5 space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={`Bar width — ${barWidth}px`}>
                <Slider
                  value={[barWidth]}
                  onValueChange={(v) => setBarWidth(v[0])}
                  min={1}
                  max={6}
                  step={1}
                />
              </Field>
              <Field label={`Height — ${height}px`}>
                <Slider
                  value={[height]}
                  onValueChange={(v) => setHeight(v[0])}
                  min={40}
                  max={240}
                  step={4}
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={`Font size — ${fontSize}px`}>
                <Slider
                  value={[fontSize]}
                  onValueChange={(v) => setFontSize(v[0])}
                  min={0}
                  max={36}
                  step={2}
                />
              </Field>
              <Field label={`Margin — ${margin}px`}>
                <Slider
                  value={[margin]}
                  onValueChange={(v) => setMargin(v[0])}
                  min={0}
                  max={40}
                  step={2}
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Line color">
                <ColorRow value={lineColor} onChange={setLineColor} presets={PRESET_COLORS} />
              </Field>
              <Field label="Background color">
                <ColorRow value={bgColor} onChange={setBgColor} presets={PRESET_COLORS} />
              </Field>
            </div>

            <label className="flex items-center justify-between rounded-xl border border-border/60 bg-background/40 px-4 py-3">
              <span className="text-sm font-medium">Show text under barcode</span>
              <input
                type="checkbox"
                checked={displayValue}
                onChange={(e) => setDisplayValue(e.target.checked)}
                className="h-4 w-4 accent-brand-purple"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Live preview
          </h3>
          <div className="mt-4 grid place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 p-6">
            {generated ? (
              <canvas
                ref={canvasRef}
                className="max-h-[280px] w-auto rounded-lg bg-white"
              />
            ) : (
              <div className="grid h-[180px] place-items-center text-center text-sm text-muted-foreground">
                <div>
                  <BarcodeIcon className="mx-auto h-8 w-8 opacity-40" />
                  <p className="mt-2">Enter a value to generate</p>
                </div>
              </div>
            )}
            <svg ref={svgRef} className="hidden" />
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-xs text-muted-foreground">
              {generated
                ? `${format} · ${value.length} chars`
                : 'Nothing generated yet'}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={downloadPng}
                disabled={!generated}
                className="rounded-xl bg-gradient-brand text-white"
              >
                <Download className="h-4 w-4" />
                PNG
              </Button>
              <Button
                onClick={downloadSvg}
                disabled={!generated}
                variant="outline"
                className="rounded-xl"
              >
                <Download className="h-4 w-4" />
                SVG
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function ColorRow({
  value,
  onChange,
  presets,
}: {
  value: string;
  onChange: (v: string) => void;
  presets: string[];
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-12 cursor-pointer rounded-lg border border-input bg-background p-1"
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-xl font-mono text-sm"
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {presets.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={cn(
              'h-6 w-6 rounded-md border transition-transform hover:scale-110',
              value.toLowerCase() === c.toLowerCase()
                ? 'border-foreground ring-2 ring-ring'
                : 'border-border/60'
            )}
            style={{ backgroundColor: c }}
            aria-label={`Color ${c}`}
          />
        ))}
      </div>
    </div>
  );
}

function getPlaceholder(format: Format): string {
  switch (format) {
    case 'CODE128':
      return 'ABC12345';
    case 'CODE39':
      return 'CODE-123';
    case 'EAN13':
      return '5901234123457';
    case 'EAN8':
      return '96385074';
    case 'UPC':
      return '036000291452';
    case 'UPC-E':
      return '0123456';
  }
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
