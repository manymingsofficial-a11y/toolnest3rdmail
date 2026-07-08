'use client';

import * as React from 'react';
import { ArrowRight, Copy, Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type Unit = { id: string; label: string; toBase: (v: number) => number; fromBase: (v: number) => number };

function Converter({
  units,
  defaultFrom,
  defaultTo,
  title,
}: {
  units: Unit[];
  defaultFrom: string;
  defaultTo: string;
  title: string;
}) {
  const [from, setFrom] = React.useState(defaultFrom);
  const [to, setTo] = React.useState(defaultTo);
  const [value, setValue] = React.useState('1');
  const [copied, setCopied] = React.useState(false);

  const result = React.useMemo(() => {
    const v = parseFloat(value);
    if (isNaN(v)) return '';
    const fromU = units.find((u) => u.id === from)!;
    const toU = units.find((u) => u.id === to)!;
    const base = fromU.toBase(v);
    const out = toU.fromBase(base);
    return out.toLocaleString('en-US', { maximumFractionDigits: 8 });
  }, [value, from, to, units]);

  function swap() {
    setFrom(to);
    setTo(from);
  }

  function copy() {
    if (!result) return;
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  function reset() {
    setValue('1');
    setFrom(defaultFrom);
    setTo(defaultTo);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl glass-card p-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">{title}</h3>
        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-end gap-3">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">From</Label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>{u.label}</option>
              ))}
            </select>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mt-1.5 rounded-xl"
              placeholder="Enter value"
            />
          </div>
          <button
            onClick={swap}
            className="mb-2 grid h-10 w-10 place-items-center rounded-xl border border-border/60 bg-background/50 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Swap units"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">To</Label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>{u.label}</option>
              ))}
            </select>
            <div className="mt-1.5 flex h-10 items-center rounded-xl border border-border/60 bg-background/50 px-3 font-mono text-sm font-semibold">
              {result || '—'}
            </div>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <Button onClick={copy} variant="outline" size="sm" className="rounded-xl">
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy Result'}
          </Button>
          <Button onClick={reset} variant="outline" size="sm" className="rounded-xl">
            Reset
          </Button>
        </div>

        <div className="mt-6 rounded-xl border border-border/60 bg-muted/30 p-4">
          <p className="text-sm font-semibold">{value || '0'} {units.find((u) => u.id === from)?.label}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            = <span className="font-bold text-foreground">{result || '—'}</span> {units.find((u) => u.id === to)?.label}
          </p>
        </div>
      </div>
    </div>
  );
}

const lengthUnits: Unit[] = [
  { id: 'mm', label: 'Millimetres (mm)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  { id: 'cm', label: 'Centimetres (cm)', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
  { id: 'm', label: 'Metres (m)', toBase: (v) => v, fromBase: (v) => v },
  { id: 'km', label: 'Kilometres (km)', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  { id: 'in', label: 'Inches (in)', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
  { id: 'ft', label: 'Feet (ft)', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
  { id: 'yd', label: 'Yards (yd)', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
  { id: 'mi', label: 'Miles (mi)', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
];

const weightUnits: Unit[] = [
  { id: 'mg', label: 'Milligrams (mg)', toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
  { id: 'g', label: 'Grams (g)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  { id: 'kg', label: 'Kilograms (kg)', toBase: (v) => v, fromBase: (v) => v },
  { id: 't', label: 'Tonnes (t)', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  { id: 'oz', label: 'Ounces (oz)', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
  { id: 'lb', label: 'Pounds (lb)', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
  { id: 'st', label: 'Stones (st)', toBase: (v) => v * 6.35029, fromBase: (v) => v / 6.35029 },
];

const timeUnits: Unit[] = [
  { id: 'ms', label: 'Milliseconds (ms)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  { id: 's', label: 'Seconds (s)', toBase: (v) => v, fromBase: (v) => v },
  { id: 'min', label: 'Minutes (min)', toBase: (v) => v * 60, fromBase: (v) => v / 60 },
  { id: 'hr', label: 'Hours (hr)', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
  { id: 'day', label: 'Days (day)', toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
  { id: 'wk', label: 'Weeks (wk)', toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
  { id: 'yr', label: 'Years (yr)', toBase: (v) => v * 31536000, fromBase: (v) => v / 31536000 },
];

const dataUnits: Unit[] = [
  { id: 'b', label: 'Bytes (B)', toBase: (v) => v, fromBase: (v) => v },
  { id: 'kb', label: 'Kilobytes (KB)', toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
  { id: 'mb', label: 'Megabytes (MB)', toBase: (v) => v * 1048576, fromBase: (v) => v / 1048576 },
  { id: 'gb', label: 'Gigabytes (GB)', toBase: (v) => v * 1073741824, fromBase: (v) => v / 1073741824 },
  { id: 'tb', label: 'Terabytes (TB)', toBase: (v) => v * 1099511627776, fromBase: (v) => v / 1099511627776 },
  { id: 'pb', label: 'Petabytes (PB)', toBase: (v) => v * 1125899906842624, fromBase: (v) => v / 1125899906842624 },
];

export function LengthConverter() {
  return <Converter units={lengthUnits} defaultFrom="m" defaultTo="ft" title="Length Converter" />;
}
export function WeightConverter() {
  return <Converter units={weightUnits} defaultFrom="kg" defaultTo="lb" title="Weight Converter" />;
}
export function TimeConverter() {
  return <Converter units={timeUnits} defaultFrom="hr" defaultTo="min" title="Time Converter" />;
}
export function DataStorageConverter() {
  return <Converter units={dataUnits} defaultFrom="mb" defaultTo="gb" title="Data Storage Converter" />;
}

export function TemperatureConverter() {
  const [c, setC] = React.useState('');
  const [f, setF] = React.useState('');
  const [k, setK] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  function update(from: 'c' | 'f' | 'k', val: string) {
    const v = parseFloat(val);
    if (isNaN(v)) {
      setC(''); setF(''); setK('');
      return;
    }
    let celsius: number;
    if (from === 'c') celsius = v;
    else if (from === 'f') celsius = (v - 32) * 5 / 9;
    else celsius = v - 273.15;
    setC(from !== 'c' ? celsius.toFixed(2) : val);
    setF(from !== 'f' ? (celsius * 9 / 5 + 32).toFixed(2) : val);
    setK(from !== 'k' ? (celsius + 273.15).toFixed(2) : val);
  }

  function copy() {
    navigator.clipboard.writeText(`${c}°C = ${f}°F = ${k}K`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  function reset() {
    setC(''); setF(''); setK('');
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl glass-card p-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">Temperature Converter</h3>
        <div className="mt-4 space-y-4">
          {([
            { id: 'c' as const, label: 'Celsius (°C)', value: c, set: (v: string) => update('c', v) },
            { id: 'f' as const, label: 'Fahrenheit (°F)', value: f, set: (v: string) => update('f', v) },
            { id: 'k' as const, label: 'Kelvin (K)', value: k, set: (v: string) => update('k', v) },
          ]).map((field) => (
            <div key={field.id} className="space-y-1.5">
              <Label className="text-sm font-medium">{field.label}</Label>
              <Input
                type="number"
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                placeholder="Enter temperature"
                className="rounded-xl"
              />
            </div>
          ))}
        </div>
        <div className="mt-5 flex gap-2">
          <Button onClick={copy} variant="outline" size="sm" className="rounded-xl">
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy Result'}
          </Button>
          <Button onClick={reset} variant="outline" size="sm" className="rounded-xl">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
