'use client';

import * as React from 'react';
import { PageHeader, SectionCard } from '@/components/admin/shared';
import { LineChart } from '@/components/admin/charts';
import { StatCard } from '@/components/admin/stat-card';
import { AnalyticsTable, EmptyData, ExportButtons } from '@/components/admin/analytics-shared';
import type { TimeSeriesPoint, SearchAnalyticsRow } from '@/lib/analytics-queries';
import { Search, AlertCircle, Activity, TrendingUp } from 'lucide-react';

export function SearchAnalyticsClient({
  timeSeries,
  topQueries,
  zeroResults,
  totalSearches,
  noResultSearches,
}: {
  timeSeries: TimeSeriesPoint[];
  topQueries: SearchAnalyticsRow[];
  zeroResults: SearchAnalyticsRow[];
  totalSearches: number;
  noResultSearches: number;
}) {
  const zeroRate = totalSearches > 0 ? (noResultSearches / totalSearches) * 100 : 0;

  return (
    <div className="space-y-6">
      <PageHeader title="Search Analytics" description="Search queries, zero-result searches, and trends" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Searches" value={totalSearches.toLocaleString()} icon={<Search className="h-5 w-5" />} gradient="from-brand-purple/30 to-brand-purple/10" />
        <StatCard label="No Result Searches" value={noResultSearches.toLocaleString()} icon={<AlertCircle className="h-5 w-5" />} gradient="from-rose-500/30 to-rose-500/10" />
        <StatCard label="Zero Result Rate" value={`${zeroRate.toFixed(1)}%`} icon={<TrendingUp className="h-5 w-5" />} gradient="from-amber-500/30 to-amber-500/10" />
        <StatCard label="Unique Queries" value={topQueries.length.toLocaleString()} icon={<Activity className="h-5 w-5" />} gradient="from-emerald-500/30 to-emerald-500/10" />
      </div>

      <SectionCard title="Daily Search Volume" description="Searches over the last 30 days">
        {timeSeries.length > 0 && timeSeries.some((d) => d.value > 0) ? (
          <LineChart data={timeSeries} height={220} />
        ) : (
          <EmptyData message="No search data yet" />
        )}
      </SectionCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Top Search Keywords" description="Most searched queries" action={<ExportButtons filename="top-search-queries" headers={['Query', 'Count', 'Zero Results']} rows={topQueries.map((s) => [s.query, s.count, s.zero_results])} />}>
          {topQueries.length > 0 ? (
            <AnalyticsTable headers={['Query', 'Searches', 'Zero Results']} rows={topQueries.map((s) => [s.query, s.count, s.zero_results])} />
          ) : (
            <EmptyData message="No search data yet" />
          )}
        </SectionCard>

        <SectionCard title="Zero-Result Searches" description="Queries returning no results" action={<ExportButtons filename="zero-result-searches" headers={['Query', 'Count']} rows={zeroResults.map((s) => [s.query, s.count])} />}>
          {zeroResults.length > 0 ? (
            <AnalyticsTable headers={['Query', 'Occurrences']} rows={zeroResults.map((s) => [s.query, s.count])} />
          ) : (
            <EmptyData message="No zero-result searches yet" />
          )}
        </SectionCard>
      </div>
    </div>
  );
}
