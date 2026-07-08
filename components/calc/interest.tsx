'use client';

import * as React from 'react';

import { CalcShell, CalcCard, Field, NumberInput, ResultRow, ResetButton, fmt, fmtMoney, BigResult } from './calc-ui';

export function SimpleInterestCalculator() {
  const [principal, setPrincipal] = React.useState('');
  const [rate, setRate] = React.useState('');
  const [time, setTime] = React.useState('');

  const result = React.useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    if (!p || !r || !t) return null;
    const interest = (p * r * t) / 100;
    return { interest, total: p + interest, p };
  }, [principal, rate, time]);

  function reset() {
    setPrincipal('');
    setRate('');
    setTime('');
  }

  return (
    <CalcShell
      onReset={reset}
      result={
        result ? (
          <div className="space-y-3">
            <BigResult value={`₹${fmtMoney(result.interest)}`} sub="Interest Earned" copyValue={fmtMoney(result.interest)} />
            <ResultRow label="Principal" value={`₹${fmtMoney(result.p)}`} />
            <ResultRow label="Interest" value={`₹${fmtMoney(result.interest)}`} accent />
            <ResultRow label="Total amount" value={`₹${fmtMoney(result.total)}`} />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Enter values to calculate interest.</p>
        )
      }
    >
      <CalcCard title="Simple interest">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Principal (₹)">
            <NumberInput value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="10000" />
          </Field>
          <Field label="Rate (% per year)">
            <NumberInput value={rate} onChange={(e) => setRate(e.target.value)} placeholder="5" />
          </Field>
          <Field label="Time (years)">
            <NumberInput value={time} onChange={(e) => setTime(e.target.value)} placeholder="3" />
          </Field>
        </div>
        <div className="mt-4">
          <ResetButton onReset={reset} />
        </div>
      </CalcCard>
    </CalcShell>
  );
}

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = React.useState('');
  const [rate, setRate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [freq, setFreq] = React.useState('12');

  const result = React.useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseInt(freq);
    if (!p || !r || !t) return null;
    const total = p * Math.pow(1 + r / n, n * t);
    return { total, interest: total - p, p };
  }, [principal, rate, time, freq]);

  function reset() {
    setPrincipal('');
    setRate('');
    setTime('');
  }

  return (
    <CalcShell
      onReset={reset}
      result={
        result ? (
          <div className="space-y-3">
            <BigResult value={`₹${fmtMoney(result.interest)}`} sub="Interest Earned" copyValue={fmtMoney(result.interest)} />
            <ResultRow label="Principal" value={`₹${fmtMoney(result.p)}`} />
            <ResultRow label="Interest" value={`₹${fmtMoney(result.interest)}`} accent />
            <ResultRow label="Total amount" value={`₹${fmtMoney(result.total)}`} />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Enter values to calculate.</p>
        )
      }
    >
      <CalcCard title="Compound interest">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Principal (₹)">
            <NumberInput value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="10000" />
          </Field>
          <Field label="Rate (% per year)">
            <NumberInput value={rate} onChange={(e) => setRate(e.target.value)} placeholder="5" />
          </Field>
          <Field label="Time (years)">
            <NumberInput value={time} onChange={(e) => setTime(e.target.value)} placeholder="3" />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Compounding frequency">
            <select
              value={freq}
              onChange={(e) => setFreq(e.target.value)}
              className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="1">Annually (1/yr)</option>
              <option value="2">Semi-annually (2/yr)</option>
              <option value="4">Quarterly (4/yr)</option>
              <option value="12">Monthly (12/yr)</option>
              <option value="365">Daily (365/yr)</option>
            </select>
          </Field>
        </div>
        <div className="mt-4">
          <ResetButton onReset={reset} />
        </div>
      </CalcCard>
    </CalcShell>
  );
}
