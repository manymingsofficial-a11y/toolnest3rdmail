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
      </div>
    </div>
  );
}

const speedUnits: Unit[] = [
  { id: 'ms', label: 'Metres/sec (m/s)', toBase: (v) => v, fromBase: (v) => v },
  { id: 'kmh', label: 'Kilometres/hour (km/h)', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
  { id: 'mph', label: 'Miles/hour (mph)', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
  { id: 'knot', label: 'Knots (kn)', toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
  { id: 'fts', label: 'Feet/sec (ft/s)', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
];

const areaUnits: Unit[] = [
  { id: 'sqm', label: 'Square Metres (m²)', toBase: (v) => v, fromBase: (v) => v },
  { id: 'sqkm', label: 'Square Kilometres (km²)', toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
  { id: 'sqft', label: 'Square Feet (ft²)', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
  { id: 'acre', label: 'Acres', toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
  { id: 'hectare', label: 'Hectares (ha)', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
  { id: 'sqmi', label: 'Square Miles (mi²)', toBase: (v) => v * 2.58999e6, fromBase: (v) => v / 2.58999e6 },
];

const volumeUnits: Unit[] = [
  { id: 'ml', label: 'Millilitres (ml)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  { id: 'l', label: 'Litres (L)', toBase: (v) => v, fromBase: (v) => v },
  { id: 'gallon', label: 'Gallons (US)', toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
  { id: 'quart', label: 'Quarts (US)', toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
  { id: 'pint', label: 'Pints (US)', toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
  { id: 'cup', label: 'Cups (US)', toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
  { id: 'floz', label: 'Fluid Ounces (US)', toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
  { id: 'tbsp', label: 'Tablespoons', toBase: (v) => v * 0.0147868, fromBase: (v) => v / 0.0147868 },
  { id: 'tsp', label: 'Teaspoons', toBase: (v) => v * 0.00492892, fromBase: (v) => v / 0.00492892 },
];

const pressureUnits: Unit[] = [
  { id: 'pa', label: 'Pascals (Pa)', toBase: (v) => v, fromBase: (v) => v },
  { id: 'kpa', label: 'Kilopascals (kPa)', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  { id: 'bar', label: 'Bar', toBase: (v) => v * 100000, fromBase: (v) => v / 100000 },
  { id: 'psi', label: 'PSI', toBase: (v) => v * 6894.76, fromBase: (v) => v / 6894.76 },
  { id: 'atm', label: 'Atmospheres (atm)', toBase: (v) => v * 101325, fromBase: (v) => v / 101325 },
  { id: 'mmhg', label: 'mmHg', toBase: (v) => v * 133.322, fromBase: (v) => v / 133.322 },
];

const energyUnits: Unit[] = [
  { id: 'j', label: 'Joules (J)', toBase: (v) => v, fromBase: (v) => v },
  { id: 'kj', label: 'Kilojoules (kJ)', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  { id: 'cal', label: 'Calories (cal)', toBase: (v) => v * 4.184, fromBase: (v) => v / 4.184 },
  { id: 'kcal', label: 'Kilocalories (kcal)', toBase: (v) => v * 4184, fromBase: (v) => v / 4184 },
  { id: 'wh', label: 'Watt-hours (Wh)', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
  { id: 'kwh', label: 'Kilowatt-hours (kWh)', toBase: (v) => v * 3600000, fromBase: (v) => v / 3600000 },
  { id: 'btu', label: 'BTU', toBase: (v) => v * 1055.06, fromBase: (v) => v / 1055.06 },
];

const powerUnits: Unit[] = [
  { id: 'w', label: 'Watts (W)', toBase: (v) => v, fromBase: (v) => v },
  { id: 'kw', label: 'Kilowatts (kW)', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  { id: 'mw', label: 'Megawatts (MW)', toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
  { id: 'hp', label: 'Horsepower (hp)', toBase: (v) => v * 745.7, fromBase: (v) => v / 745.7 },
  { id: 'btuh', label: 'BTU/hour', toBase: (v) => v * 0.293071, fromBase: (v) => v / 0.293071 },
];

export function SpeedConverter() {
  return <Converter units={speedUnits} defaultFrom="kmh" defaultTo="ms" title="Speed Converter" />;
}
export function AreaConverter() {
  return <Converter units={areaUnits} defaultFrom="sqm" defaultTo="sqft" title="Area Converter" />;
}
export function VolumeConverter() {
  return <Converter units={volumeUnits} defaultFrom="l" defaultTo="gallon" title="Volume Converter" />;
}
export function PressureConverter() {
  return <Converter units={pressureUnits} defaultFrom="bar" defaultTo="psi" title="Pressure Converter" />;
}
export function EnergyConverter() {
  return <Converter units={energyUnits} defaultFrom="j" defaultTo="cal" title="Energy Converter" />;
}
export function PowerConverter() {
  return <Converter units={powerUnits} defaultFrom="w" defaultTo="hp" title="Power Converter" />;
}

export function FuelConverter() {
  const [value, setValue] = React.useState('10');
  const [unit, setUnit] = React.useState<'mpg' | 'l100km' | 'kml'>('l100km');
  const [copied, setCopied] = React.useState(false);

  const results = React.useMemo(() => {
    const v = parseFloat(value);
    if (isNaN(v)) return { mpg: '', l100km: '', kml: '' };
    let mpg: number, l100km: number, kml: number;
    if (unit === 'mpg') {
      mpg = v;
      l100km = 235.215 / v;
      kml = v * 0.425144;
    } else if (unit === 'l100km') {
      l100km = v;
      mpg = 235.215 / v;
      kml = 100 / v;
    } else {
      kml = v;
      l100km = 100 / v;
      mpg = v / 0.425144;
    }
    return {
      mpg: mpg.toFixed(2),
      l100km: l100km.toFixed(2),
      kml: kml.toFixed(2),
    };
  }, [value, unit]);

  function copy() {
    navigator.clipboard.writeText(`${results.mpg} MPG = ${results.l100km} L/100km = ${results.kml} km/L`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl glass-card p-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">Fuel Converter</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Value</Label>
            <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="rounded-xl" placeholder="Enter value" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Input Unit</Label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as typeof unit)}
              className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-sm"
            >
              <option value="mpg">Miles/Gallon (MPG)</option>
              <option value="l100km">Litres/100km (L/100km)</option>
              <option value="kml">Kilometres/Litre (km/L)</option>
            </select>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {([
            ['MPG (US)', results.mpg],
            ['L/100km', results.l100km],
            ['km/L', results.kml],
          ] as const).map(([label, val]) => (
            <div key={label} className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 px-4 py-3">
              <span className="text-sm font-medium">{label}</span>
              <span className="font-mono text-sm font-bold">{val || '—'}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={copy} variant="outline" size="sm" className="rounded-xl">
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy All'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CurrencyConverter() {
  const [amount, setAmount] = React.useState('100');
  const [fromCurrency, setFromCurrency] = React.useState('USD');
  const [rate, setRate] = React.useState('0.85');
  const [toCurrency, setToCurrency] = React.useState('EUR');
  const [copied, setCopied] = React.useState(false);

  const result = React.useMemo(() => {
    const a = parseFloat(amount);
    const r = parseFloat(rate);
    if (isNaN(a) || isNaN(r)) return '';
    return (a * r).toLocaleString('en-US', { maximumFractionDigits: 2 });
  }, [amount, rate]);

  function copy() {
    if (!result) return;
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl glass-card p-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">Currency Converter</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Enter your own exchange rate — this tool does not fetch live rates.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Amount</Label>
            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="rounded-xl" placeholder="100" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">From Currency</Label>
            <Input value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value.toUpperCase())} className="rounded-xl" placeholder="USD" maxLength={3} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Exchange Rate (1 {fromCurrency || 'XXX'} =)</Label>
            <Input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="rounded-xl" placeholder="0.85" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">To Currency</Label>
            <Input value={toCurrency} onChange={(e) => setToCurrency(e.target.value.toUpperCase())} className="rounded-xl" placeholder="EUR" maxLength={3} />
          </div>
        </div>
        <div className={cn('mt-4 rounded-xl border border-border/60 bg-muted/30 p-4')}>
          <p className="text-sm text-muted-foreground">
            {amount || '0'} {fromCurrency} =
          </p>
          <p className="mt-1 text-2xl font-bold">
            {result || '—'} {toCurrency}
          </p>
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={copy} variant="outline" size="sm" className="rounded-xl">
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy Result'}
          </Button>
        </div>
      </div>
    </div>
  );
}
