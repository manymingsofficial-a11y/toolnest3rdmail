'use client';

import * as React from 'react';
import { PageHeader, SectionCard } from '@/components/admin/shared';
import { StatCard } from '@/components/admin/stat-card';
import { LineChart } from '@/components/admin/charts';
import { EmptyData, ExportButtons } from '@/components/admin/analytics-shared';
import type { NewsletterAnalytics } from '@/lib/analytics-queries';
import { Mail, UserMinus, TrendingUp, Percent, Users, Activity } from 'lucide-react';

export function NewsletterAnalyticsClient({ data }: { data: NewsletterAnalytics }) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Newsletter Analytics"
        description="Subscribers, growth, and conversion rate"
        action={
          <ExportButtons
            filename="newsletter-analytics"
            headers={['Metric', 'Value']}
            rows={[
              ['Total Subscribers', data.totalSubscribers],
              ['Active Subscribers', data.activeSubscribers],
              ['Unsubscribed', data.unsubscribed],
              ['Growth This Month', data.growthThisMonth],
              ['Growth Rate (%)', data.growthRate.toFixed(2)],
              ['Subscribes (30d)', data.subscribesLast30Days],
              ['Unsubscribes (30d)', data.unsubscribesLast30Days],
              ['Conversion Rate (%)', data.conversionRate.toFixed(2)],
            ]}
          />
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Subscribers" value={data.totalSubscribers.toLocaleString()} icon={<Mail className="h-5 w-5" />} gradient="from-brand-purple/30 to-brand-purple/10" />
        <StatCard label="Active" value={data.activeSubscribers.toLocaleString()} icon={<Users className="h-5 w-5" />} gradient="from-emerald-500/30 to-emerald-500/10" />
        <StatCard label="Unsubscribed" value={data.unsubscribed.toLocaleString()} icon={<UserMinus className="h-5 w-5" />} gradient="from-rose-500/30 to-rose-500/10" />
        <StatCard label="Growth (Month)" value={`+${data.growthThisMonth}`} icon={<TrendingUp className="h-5 w-5" />} gradient="from-blue-500/30 to-blue-500/10" />
        <StatCard label="Growth Rate" value={`${data.growthRate.toFixed(1)}%`} icon={<Percent className="h-5 w-5" />} gradient="from-amber-500/30 to-amber-500/10" />
        <StatCard label="Subscribes (30d)" value={data.subscribesLast30Days.toLocaleString()} icon={<Activity className="h-5 w-5" />} gradient="from-cyan-500/30 to-cyan-500/10" />
        <StatCard label="Unsubscribes (30d)" value={data.unsubscribesLast30Days.toLocaleString()} icon={<UserMinus className="h-5 w-5" />} gradient="from-orange-500/30 to-orange-500/10" />
        <StatCard label="Conversion Rate" value={`${data.conversionRate.toFixed(2)}%`} icon={<Percent className="h-5 w-5" />} gradient="from-violet-500/30 to-violet-500/10" />
      </div>

      <SectionCard title="Subscriber Growth" description="New subscribers per month (last 12 months)">
        {data.timeSeries.length > 0 && data.timeSeries.some((d) => d.value > 0) ? (
          <LineChart data={data.timeSeries} height={220} />
        ) : (
          <EmptyData message="No subscriber growth data yet" />
        )}
      </SectionCard>

      <div className="grid gap-4 sm:grid-cols-2">
        <SectionCard title="Subscribes vs Unsubscribes" description="Last 30 days">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Subscribes</p>
              <p className="mt-2 text-2xl font-bold text-emerald-600">{data.subscribesLast30Days}</p>
            </div>
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Unsubscribes</p>
              <p className="mt-2 text-2xl font-bold text-rose-500">{data.unsubscribesLast30Days}</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Net Growth" description="Last 30 days">
          <div className="flex h-full items-center justify-center">
            <p className={`text-4xl font-bold ${data.subscribesLast30Days - data.unsubscribesLast30Days >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
              {data.subscribesLast30Days - data.unsubscribesLast30Days >= 0 ? '+' : ''}
              {data.subscribesLast30Days - data.unsubscribesLast30Days}
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
