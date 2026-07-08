'use client';

import * as React from 'react';

import { CalcShell, CalcCard, Field, NumberInput, ResultRow, ResetButton, fmt } from './calc-ui';

export function AgeCalculator() {
  const [dob, setDob] = React.useState('');
  const [target, setTarget] = React.useState(new Date().toISOString().slice(0, 10));
  const [result, setResult] = React.useState<{ y: number; m: number; d: number; totalDays: number } | null>(null);

  React.useEffect(() => {
    if (!dob || !target) {
      setResult(null);
      return;
    }
    const birth = new Date(dob);
    const tgt = new Date(target);
    if (isNaN(birth.getTime()) || isNaN(tgt.getTime()) || birth > tgt) {
      setResult(null);
      return;
    }
    let y = tgt.getFullYear() - birth.getFullYear();
    let m = tgt.getMonth() - birth.getMonth();
    let d = tgt.getDate() - birth.getDate();
    if (d < 0) {
      m--;
      const prevMonth = new Date(tgt.getFullYear(), tgt.getMonth(), 0);
      d += prevMonth.getDate();
    }
    if (m < 0) {
      y--;
      m += 12;
    }
    const totalDays = Math.floor((tgt.getTime() - birth.getTime()) / 86400000);
    setResult({ y, m, d, totalDays });
  }, [dob, target]);

  function reset() {
    setDob('');
    setTarget(new Date().toISOString().slice(0, 10));
    setResult(null);
  }

  return (
    <CalcShell
      onReset={reset}
      result={
        result ? (
          <div className="space-y-3">
            <div className="grid place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 p-6 text-center">
              <p className="text-3xl font-bold">{result.y} years</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {result.m} months · {result.d} days
              </p>
            </div>
            <ResultRow label="Total days" value={fmt(result.totalDays, 0)} />
            <ResultRow label="Total months" value={fmt(result.y * 12 + result.m, 0)} />
            <ResultRow label="Total weeks" value={fmt(Math.floor(result.totalDays / 7), 0)} />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Enter your date of birth to calculate.</p>
        )
      }
    >
      <CalcCard title="Enter your details">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Date of Birth">
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </Field>
          <Field label="Age at Date">
            <input
              type="date"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </Field>
        </div>
        <div className="mt-4">
          <ResetButton onReset={reset} />
        </div>
      </CalcCard>
    </CalcShell>
  );
}

export function BmiCalculator() {
  const [height, setHeight] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [unit, setUnit] = React.useState<'metric' | 'imperial'>('metric');

  const bmi = React.useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w) return null;
    if (unit === 'metric') {
      const m = h / 100;
      return w / (m * m);
    }
    return (w / (h * h)) * 703;
  }, [height, weight, unit]);

  const category = bmi
    ? bmi < 18.5
      ? { label: 'Underweight', color: 'text-blue-500' }
      : bmi < 25
        ? { label: 'Normal weight', color: 'text-green-500' }
        : bmi < 30
          ? { label: 'Overweight', color: 'text-amber-500' }
          : { label: 'Obese', color: 'text-red-500' }
    : null;

  function reset() {
    setHeight('');
    setWeight('');
  }

  return (
    <CalcShell
      onReset={reset}
      result={
        bmi ? (
          <div className="space-y-3">
            <div className="grid place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 p-6 text-center">
              <p className="text-4xl font-bold">{fmt(bmi, 1)}</p>
              <p className={`mt-1 text-sm font-semibold ${category?.color}`}>{category?.label}</p>
            </div>
            <ResultRow label="Underweight" value="< 18.5" />
            <ResultRow label="Normal" value="18.5 – 24.9" />
            <ResultRow label="Overweight" value="25 – 29.9" />
            <ResultRow label="Obese" value="≥ 30" />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Enter height and weight to calculate.</p>
        )
      }
    >
      <CalcCard title="Enter your measurements">
        <div className="mb-4 flex gap-2">
          {(['metric', 'imperial'] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                unit === u
                  ? 'bg-gradient-brand text-white'
                  : 'border border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
              }`}
            >
              {u === 'metric' ? 'Metric (cm, kg)' : 'Imperial (in, lb)'}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={unit === 'metric' ? 'Height (cm)' : 'Height (in)'}>
            <NumberInput value={height} onChange={(e) => setHeight(e.target.value)} placeholder={unit === 'metric' ? '175' : '69'} />
          </Field>
          <Field label={unit === 'metric' ? 'Weight (kg)' : 'Weight (lb)'}>
            <NumberInput value={weight} onChange={(e) => setWeight(e.target.value)} placeholder={unit === 'metric' ? '70' : '154'} />
          </Field>
        </div>
        <div className="mt-4">
          <ResetButton onReset={reset} />
        </div>
      </CalcCard>
    </CalcShell>
  );
}

export function PercentageCalculator() {
  const [mode, setMode] = React.useState<'of' | 'isWhat' | 'change'>('of');
  const [a, setA] = React.useState('');
  const [b, setB] = React.useState('');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) {
      setResult('');
      return;
    }
    if (mode === 'of') setResult(`${fmt((x / 100) * y)} (${x}% of ${y})`);
    else if (mode === 'isWhat') setResult(`${fmt((x / y) * 100)}% (${x} is ${fmt((x / y) * 100, 2)}% of ${y})`);
    else setResult(`${fmt(((y - x) / x) * 100)}% (${fmt(((y - x) / x) * 100)}% change from ${x} to ${y})`);
  }, [mode, a, b]);

  function reset() {
    setA('');
    setB('');
    setResult('');
  }

  const modes: { id: typeof mode; label: string; aLabel: string; bLabel: string }[] = [
    { id: 'of', label: 'X% of Y', aLabel: 'Percentage (%)', bLabel: 'Of value' },
    { id: 'isWhat', label: 'X is what % of Y', aLabel: 'Value (X)', bLabel: 'Total (Y)' },
    { id: 'change', label: '% change', aLabel: 'Original', bLabel: 'New value' },
  ];
  const active = modes.find((m) => m.id === mode)!;

  return (
    <CalcShell
      onReset={reset}
      result={
        result ? (
          <div className="grid place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 p-6 text-center">
            <p className="text-2xl font-bold">{result}</p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Enter values to calculate.</p>
        )
      }
    >
      <CalcCard title="Percentage calculation">
        <div className="mb-4 flex flex-wrap gap-2">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                mode === m.id
                  ? 'bg-gradient-brand text-white'
                  : 'border border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={active.aLabel}>
            <NumberInput value={a} onChange={(e) => setA(e.target.value)} placeholder="0" />
          </Field>
          <Field label={active.bLabel}>
            <NumberInput value={b} onChange={(e) => setB(e.target.value)} placeholder="0" />
          </Field>
        </div>
        <div className="mt-4">
          <ResetButton onReset={reset} />
        </div>
      </CalcCard>
    </CalcShell>
  );
}
