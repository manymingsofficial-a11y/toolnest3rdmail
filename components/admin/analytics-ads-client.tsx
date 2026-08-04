'use client';

import * as React from 'react';
import { PageHeader, SectionCard } from '@/components/admin/shared';
import { StatCard } from '@/components/admin/stat-card';
import { AnalyticsTable, EmptyData, ExportButtons } from '@/components/admin/analytics-shared';
import type { AdAnalyticsRow } from '@/lib/analytics-queries';
import { Eye, MousePointerClick, Percent, TrendingUp } from 'lucide-react';

export function AdsAnalyticsClient({
  adData,
  totalImpressions,
  totalClicks,
}: {
  adData: AdAnalyticsRow[];
  totalImpressions: number;
  totalClicks: number;
}) {
  const overallCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;

  return (
    <div className="space-y-6">
      <PageHeader title="Ad Analytics" description="Ad impressions, clicks, and CTR by placement" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Impressions" value={totalImpressions.toLocaleString()} icon={<Eye className="h-5 w-5" />} gradient="from-brand-purple/30 to-brand-purple/10" />
        <StatCard label="Total Clicks" value={totalClicks.toLocaleString()} icon={<MousePointerClick className="h-5 w-5" />} gradient="from-blue-500/30 to-blue-500/10" />
        <StatCard label="Overall CTR" value={`${overallCtr.toFixed(2)}%`} icon={<Percent className="h-5 w-5" />} gradient="from-emerald-500/30 to-emerald-500/10" />
        <StatCard label="Active Slots" value={adData.length} icon={<TrendingUp className="h-5 w-5" />} gradient="from-amber-500/30 to-amber-500/10" />
      </div>

      <SectionCard
        title="Ad Performance by Slot"
        description="Impressions, clicks, and CTR for each ad placement"
        action={<ExportButtons filename="ad-analytics" headers={['Slot', 'Impressions', 'Clicks', 'CTR (%)']} rows={adData.map((a) => [a.slot, a.impressions, a.clicks, a.ctr.toFixed(2)])} />}
      >
        {adData.length > 0 ? (
          <AnalyticsTable
            headers={['Slot', 'Impressions', 'Clicks', 'CTR']}
            rows={adData.map((a) => [a.slot, a.impressions.toLocaleString(), a.clicks.toLocaleString(), `${a.ctr.toFixed(2)}%`])}
          />
        ) : (
          <EmptyData message="No ad data yet" />
        )}
      </SectionCard>

      <SectionCard title="Revenue Placeholder" description="Estimated revenue (configure your CPM in settings)">
        <div className="rounded-xl border border-border/60 bg-muted/20 p-6 text-center">
          <p className="text-sm text-muted-foreground">Revenue tracking requires AdSense integration.</p>
          <p className="mt-2 text-2xl font-bold">$0.00</p>
          <p className="mt-1 text-xs text-muted-foreground">Connect AdSense in Ad Settings to enable revenue tracking.</p>
        </div>
      </SectionCard>
    </div>
  );
}
