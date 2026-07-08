'use client';

import * as React from 'react';

import { CalcShell, CalcCard, Field, NumberInput, ResultRow, ResetButton, fmt, fmtMoney, BigResult } from './calc-ui';

export function LoanEmiCalculator() {
  const [amount, setAmount] = React.useState('');
  const [rate, setRate] = React.useState('');
  const [tenure, setTenure] = React.useState('');
  const [unit, setUnit] = React.useState<'years' | 'months'>('years');

  const result = React.useMemo(() => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 12 / 100;
    const n = unit === 'years' ? parseFloat(tenure) * 12 : parseFloat(tenure);
    if (!p || !r || !n) return null;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    const interest = total - p;
    return { emi, total, interest, p };
  }, [amount, rate, tenure, unit]);

  function reset() {
    setAmount('');
    setRate('');
    setTenure('');
  }

  return (
    <CalcShell
      onReset={reset}
      result={
        result ? (
          <div className="space-y-3">
            <BigResult value={`₹${fmtMoney(result.emi)}`} sub="Monthly EMI" copyValue={fmtMoney(result.emi)} />
            <ResultRow label="Principal" value={`₹${fmtMoney(result.p)}`} />
            <ResultRow label="Total interest" value={`₹${fmtMoney(result.interest)}`} accent />
            <ResultRow label="Total payment" value={`₹${fmtMoney(result.total)}`} />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Enter loan details to calculate EMI.</p>
        )
      }
    >
      <CalcCard title="Loan details">
        <Field label="Loan amount (₹)">
          <NumberInput value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="500000" />
        </Field>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Interest rate (% per year)">
            <NumberInput value={rate} onChange={(e) => setRate(e.target.value)} placeholder="8.5" />
          </Field>
          <Field label="Tenure">
            <NumberInput value={tenure} onChange={(e) => setTenure(e.target.value)} placeholder="5" />
          </Field>
        </div>
        <div className="mt-4 flex gap-2">
          {(['years', 'months'] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                unit === u
                  ? 'bg-gradient-brand text-white'
                  : 'border border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <ResetButton onReset={reset} />
        </div>
      </CalcCard>
    </CalcShell>
  );
}

export function GstCalculator() {
  const [amount, setAmount] = React.useState('');
  const [gstRate, setGstRate] = React.useState('18');
  const [mode, setMode] = React.useState<'exclusive' | 'inclusive'>('exclusive');

  const result = React.useMemo(() => {
    const amt = parseFloat(amount);
    const rate = parseFloat(gstRate);
    if (!amt || !rate) return null;
    if (mode === 'exclusive') {
      const gst = (amt * rate) / 100;
      return { base: amt, gst, total: amt + gst };
    }
    const base = amt / (1 + rate / 100);
    return { base, gst: amt - base, total: amt };
  }, [amount, gstRate, mode]);

  function reset() {
    setAmount('');
    setGstRate('18');
  }

  return (
    <CalcShell
      onReset={reset}
      result={
        result ? (
          <div className="space-y-3">
            <BigResult value={`₹${fmtMoney(result.gst)}`} sub="GST Amount" copyValue={fmtMoney(result.gst)} />
            <ResultRow label="Base amount" value={`₹${fmtMoney(result.base)}`} />
            <ResultRow label={`GST (${gstRate}%)`} value={`₹${fmtMoney(result.gst)}`} accent />
            <ResultRow label="Total amount" value={`₹${fmtMoney(result.total)}`} />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Enter an amount to calculate GST.</p>
        )
      }
    >
      <CalcCard title="GST calculation">
        <div className="mb-4 flex gap-2">
          {(['exclusive', 'inclusive'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                mode === m
                  ? 'bg-gradient-brand text-white'
                  : 'border border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
              }`}
            >
              {m === 'exclusive' ? 'Add GST' : 'Remove GST'}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Amount (₹)">
            <NumberInput value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="1000" />
          </Field>
          <Field label="GST rate (%)">
            <NumberInput value={gstRate} onChange={(e) => setGstRate(e.target.value)} placeholder="18" />
          </Field>
        </div>
        <div className="mt-4">
          <ResetButton onReset={reset} />
        </div>
      </CalcCard>
    </CalcShell>
  );
}

export function DiscountCalculator() {
  const [price, setPrice] = React.useState('');
  const [discount, setDiscount] = React.useState('');

  const result = React.useMemo(() => {
    const p = parseFloat(price);
    const d = parseFloat(discount);
    if (!p || !d) return null;
    const save = (p * d) / 100;
    return { save, final: p - save, p };
  }, [price, discount]);

  function reset() {
    setPrice('');
    setDiscount('');
  }

  return (
    <CalcShell
      onReset={reset}
      result={
        result ? (
          <div className="space-y-3">
            <BigResult value={`₹${fmtMoney(result.final)}`} sub="Final Price" copyValue={fmtMoney(result.final)} />
            <ResultRow label="Original price" value={`₹${fmtMoney(result.p)}`} />
            <ResultRow label="You save" value={`₹${fmtMoney(result.save)}`} accent />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Enter price and discount to calculate.</p>
        )
      }
    >
      <CalcCard title="Discount calculation">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Original price (₹)">
            <NumberInput value={price} onChange={(e) => setPrice(e.target.value)} placeholder="999" />
          </Field>
          <Field label="Discount (%)">
            <NumberInput value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="20" />
          </Field>
        </div>
        <div className="mt-4">
          <ResetButton onReset={reset} />
        </div>
      </CalcCard>
    </CalcShell>
  );
}

export function TipCalculator() {
  const [bill, setBill] = React.useState('');
  const [tipPct, setTipPct] = React.useState('15');
  const [people, setPeople] = React.useState('1');

  const result = React.useMemo(() => {
    const b = parseFloat(bill);
    const t = parseFloat(tipPct);
    const p = parseInt(people) || 1;
    if (!b) return null;
    const tip = (b * t) / 100;
    return { tip, total: b + tip, per: (b + tip) / p, b, p };
  }, [bill, tipPct, people]);

  function reset() {
    setBill('');
    setTipPct('15');
    setPeople('1');
  }

  return (
    <CalcShell
      onReset={reset}
      result={
        result ? (
          <div className="space-y-3">
            <BigResult value={`₹${fmtMoney(result.per)}`} sub="Per Person" copyValue={fmtMoney(result.per)} />
            <ResultRow label="Bill amount" value={`₹${fmtMoney(result.b)}`} />
            <ResultRow label="Tip amount" value={`₹${fmtMoney(result.tip)}`} accent />
            <ResultRow label="Total bill" value={`₹${fmtMoney(result.total)}`} />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Enter the bill amount to calculate.</p>
        )
      }
    >
      <CalcCard title="Bill details">
        <Field label="Bill amount (₹)">
          <NumberInput value={bill} onChange={(e) => setBill(e.target.value)} placeholder="500" />
        </Field>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Tip percentage (%)">
            <NumberInput value={tipPct} onChange={(e) => setTipPct(e.target.value)} placeholder="15" />
          </Field>
          <Field label="Number of people">
            <NumberInput value={people} onChange={(e) => setPeople(e.target.value)} placeholder="1" min={1} />
          </Field>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {[10, 15, 18, 20].map((p) => (
            <button
              key={p}
              onClick={() => setTipPct(String(p))}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                tipPct === String(p)
                  ? 'bg-gradient-brand text-white'
                  : 'border border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
              }`}
            >
              {p}%
            </button>
          ))}
        </div>
        <div className="mt-4">
          <ResetButton onReset={reset} />
        </div>
      </CalcCard>
    </CalcShell>
  );
}
