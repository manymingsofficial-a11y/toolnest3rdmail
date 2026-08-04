'use client';

import * as React from 'react';
import { PageHeader, SectionCard } from '@/components/admin/shared';
import { StatCard } from '@/components/admin/stat-card';
import { BarChart } from '@/components/admin/charts';
import { AnalyticsTable, BreakdownCard, EmptyData, ExportButtons } from '@/components/admin/analytics-shared';
import type { AffiliateAnalyticsRow, CategoryData } from '@/lib/analytics-queries';
import { MousePointerClick, Link2, TrendingUp, Network } from 'lucide-react';

export function AffiliateAnalyticsClient({
  clicks,
  networkBreakdown,
  totalClicks,
}: {
  clicks: AffiliateAnalyticsRow[];
  networkBreakdown: CategoryData[];
  totalClicks: number;
}) {
  return (
    <div className="space-y-6">
      <PageHeader title="Affiliate Analytics" description="Clicks, CTR, and top products by network" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Clicks" value={totalClicks.toLocaleString()} icon={<MousePointerClick className="h-5 w-5" />} gradient="from-brand-purple/30 to-brand-purple/10" />
        <StatCard label="Unique Products" value={clicks.length} icon={<Link2 className="h-5 w-5" />} gradient="from-blue-500/30 to-blue-500/10" />
        <StatCard label="Active Networks" value={networkBreakdown.length} icon={<Network className="h-5 w-5" />} gradient="from-emerald-500/30 to-emerald-500/10" />
        <StatCard label="Top Product Clicks" value={clicks[0]?.clicks.toLocaleString() ?? '0'} icon={<TrendingUp className="h-5 w-5" />} gradient="from-amber-500/30 to-amber-500/10" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard
          title="Top Products by Clicks"
          description="Most clicked affiliate products"
          action={<ExportButtons filename="affiliate-clicks" headers={['Product ID', 'Name', 'Network', 'Clicks']} rows={clicks.map((c) => [c.targetId, c.name, c.network, c.clicks])} />}
        >
          {clicks.length > 0 ? (
            <AnalyticsTable headers={['Product', 'Network', 'Clicks']} rows={clicks.map((c) => [c.name, c.network, c.clicks.toLocaleString()])} />
          ) : (
            <EmptyData message="No affiliate click data yet" />
          )}
        </SectionCard>

        <SectionCard title="Clicks by Network" description="Affiliate network breakdown">
          {networkBreakdown.length > 0 ? (
            <>
              <BarChart
                data={networkBreakdown.map((n, i) => ({
                  label: n.label,
                  value: n.value,
                  color: i === 0 ? 'from-brand-purple to-brand-purple/60' : 'from-emerald-500 to-emerald-500/60',
                }))}
                height={200}
              />
              <div className="mt-4">
                <BreakdownCard title="Network Share" data={networkBreakdown} total={totalClicks} />
              </div>
            </>
          ) : (
            <EmptyData message="No network data yet" />
          )}
        </SectionCard>
      </div>
    </div>
  );
}
