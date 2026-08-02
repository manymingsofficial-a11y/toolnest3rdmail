'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export type StatCardProps = {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: string; positive: boolean };
  gradient?: string;
  className?: string;
};

export function StatCard({ label, value, icon, trend, gradient = 'from-brand-purple/20 to-brand-purple/5', className }: StatCardProps) {
  return (
    <Card className={cn('glass-card relative overflow-hidden p-5', className)}>
      <div className={cn('pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br opacity-30 blur-2xl', gradient)} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
          {trend && (
            <p className={cn('mt-1 text-xs font-medium', trend.positive ? 'text-emerald-500' : 'text-rose-500')}>
              {trend.positive ? '+' : ''}{trend.value}
            </p>
          )}
        </div>
        <div className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-foreground', gradient)}>
          {icon}
        </div>
      </div>
    </Card>
  );
}
