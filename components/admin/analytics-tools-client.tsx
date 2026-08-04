'use client';

import * as React from 'react';
import { PageHeader, SectionCard } from '@/components/admin/shared';
import { BarChart } from '@/components/admin/charts';
import { AnalyticsTable, EmptyData, ExportButtons } from '@/components/admin/analytics-shared';
import type { ToolAnalyticsRow, SearchAnalyticsRow } from '@/lib/analytics-queries';
import { TrendingUp, TrendingDown, Search, Star } from 'lucide-react';

export function ToolsAnalyticsClient({
  topTools,
  leastViewed,
  mostSearched,
  trending,
}: {
  topTools: ToolAnalyticsRow[];
  leastViewed: ToolAnalyticsRow[];
  mostSearched: SearchAnalyticsRow[];
  trending: ToolAnalyticsRow[];
}) {
  return (
    <div className="space-y-6">
      <PageHeader title="Tool Analytics" description="Tool views, search, and trending data" />

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Most Viewed Tools" description="Top 10 by page views" action={<ExportButtons filename="top-tools" headers={['Slug', 'Name', 'Views', 'Category']} rows={topTools.map((t) => [t.slug, t.name, t.views, t.category])} />}>
          {topTools.length > 0 ? (
            <>
              <BarChart
                data={topTools.map((t, i) => ({
                  label: t.name.length > 12 ? t.name.slice(0, 10) + '...' : t.name,
                  value: t.views,
                  color: i === 0 ? 'from-brand-purple to-brand-purple/60' : 'from-blue-500 to-blue-500/60',
                }))}
                height={220}
              />
              <div className="mt-4">
                <AnalyticsTable headers={['Rank', 'Tool', 'Views', 'Category']} rows={topTools.map((t, i) => [i + 1, t.name, t.views, t.category])} />
              </div>
            </>
          ) : (
            <EmptyData message="No tool view data yet" />
          )}
        </SectionCard>

        <SectionCard title="Least Viewed Tools" description="Bottom 10 by page views" action={<ExportButtons filename="least-viewed-tools" headers={['Slug', 'Name', 'Views', 'Category']} rows={leastViewed.map((t) => [t.slug, t.name, t.views, t.category])} />}>
          {leastViewed.length > 0 ? (
            <AnalyticsTable headers={['Rank', 'Tool', 'Views', 'Category']} rows={leastViewed.map((t, i) => [i + 1, t.name, t.views, t.category])} emptyMessage="No data yet" />
          ) : (
            <EmptyData message="No tool view data yet" />
          )}
        </SectionCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Most Searched Tools" description="Top 10 search queries" action={<ExportButtons filename="most-searched" headers={['Query', 'Count', 'Zero Results']} rows={mostSearched.map((s) => [s.query, s.count, s.zero_results])} />}>
          {mostSearched.length > 0 ? (
            <AnalyticsTable headers={['Query', 'Searches', 'Zero Results']} rows={mostSearched.map((s) => [s.query, s.count, s.zero_results])} />
          ) : (
            <EmptyData message="No search data yet" />
          )}
        </SectionCard>

        <SectionCard title="Trending Tools" description="Most viewed in the last 7 days" action={<ExportButtons filename="trending-tools" headers={['Slug', 'Name', 'Views', 'Category']} rows={trending.map((t) => [t.slug, t.name, t.views, t.category])} />}>
          {trending.length > 0 ? (
            <>
              <BarChart
                data={trending.map((t, i) => ({
                  label: t.name.length > 12 ? t.name.slice(0, 10) + '...' : t.name,
                  value: t.views,
                  color: i === 0 ? 'from-emerald-500 to-emerald-500/60' : 'from-teal-500 to-teal-500/60',
                }))}
                height={220}
              />
              <div className="mt-4">
                <AnalyticsTable headers={['Rank', 'Tool', 'Views (7d)', 'Category']} rows={trending.map((t, i) => [i + 1, t.name, t.views, t.category])} />
              </div>
            </>
          ) : (
            <EmptyData message="No trending data yet" />
          )}
        </SectionCard>
      </div>
    </div>
  );
}
