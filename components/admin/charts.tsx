'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export type ChartDataItem = {
  label: string;
  value: number;
  color?: string;
};

export type BarChartProps = {
  data: ChartDataItem[];
  className?: string;
  height?: number;
};

export function BarChart({ data, className, height = 200 }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <Card className={cn('glass-card p-5', className)}>
      <div className="flex items-end gap-3" style={{ height }}>
        {data.map((item, i) => {
          const pct = (item.value / max) * 100;
          const color = item.color ?? 'from-brand-purple to-brand-purple/60';
          return (
            <div key={i} className="group relative flex flex-1 flex-col items-center justify-end gap-2">
              <span className="text-xs font-semibold opacity-0 transition-opacity group-hover:opacity-100">
                {item.value}
              </span>
              <div
                className={cn('w-full max-w-[40px] rounded-t-md bg-gradient-to-t transition-all duration-500', color)}
                style={{ height: `${pct}%`, minHeight: '4px' }}
              />
              <span className="truncate text-[10px] text-muted-foreground" style={{ maxWidth: 60 }}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export type LineChartProps = {
  data: { label: string; value: number }[];
  className?: string;
  height?: number;
};

export function LineChart({ data, className, height = 200 }: LineChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const min = Math.min(...data.map((d) => d.value), 0);
  const range = max - min || 1;
  const width = 100;
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1 || 1)) * width;
      const y = height - ((d.value - min) / range) * (height - 20) - 10;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <Card className={cn('glass-card p-5', className)}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(168 85 247 / 0.3)" />
            <stop offset="100%" stopColor="rgb(168 85 247 / 0)" />
          </linearGradient>
        </defs>
        <polygon points={`0,${height} ${points} ${width},${height}`} fill="url(#lineGrad)" />
        <polyline
          points={points}
          fill="none"
          stroke="rgb(168 85 247)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="mt-2 flex justify-between">
        {data.map((d, i) => (
          <span key={i} className="text-[10px] text-muted-foreground">{d.label}</span>
        ))}
      </div>
    </Card>
  );
}

export type DualBarChartProps = {
  data: { label: string; tools: number; searches: number }[];
  className?: string;
  height?: number;
};

export function DualBarChart({ data, className, height = 200 }: DualBarChartProps) {
  const max = Math.max(...data.flatMap((d) => [d.tools, d.searches]), 1);

  return (
    <Card className={cn('glass-card p-5', className)}>
      <div className="mb-3 flex items-center gap-4 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded bg-brand-purple" /> Tools
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded bg-emerald-500" /> Searches
        </span>
      </div>
      <div className="flex items-end gap-4" style={{ height }}>
        {data.map((item, i) => (
          <div key={i} className="group flex flex-1 flex-col items-center justify-end gap-1">
            <div className="flex h-full w-full items-end justify-center gap-1">
              <div
                className="w-3 rounded-t bg-brand-purple/80 transition-all duration-500 group-hover:bg-brand-purple"
                style={{ height: `${(item.tools / max) * 100}%`, minHeight: '4px' }}
                title={`Tools: ${item.tools}`}
              />
              <div
                className="w-3 rounded-t bg-emerald-500/80 transition-all duration-500 group-hover:bg-emerald-500"
                style={{ height: `${(item.searches / max) * 100}%`, minHeight: '4px' }}
                title={`Searches: ${item.searches}`}
              />
            </div>
            <span className="text-[10px] text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
