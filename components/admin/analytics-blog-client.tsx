'use client';

import * as React from 'react';
import { PageHeader, SectionCard } from '@/components/admin/shared';
import { LineChart, BarChart } from '@/components/admin/charts';
import { AnalyticsTable, EmptyData, ExportButtons } from '@/components/admin/analytics-shared';
import type { BlogAnalyticsRow, TimeSeriesPoint } from '@/lib/analytics-queries';
import { FileText, Eye, Clock } from 'lucide-react';

export function BlogAnalyticsClient({
  blogData,
  timeSeries,
}: {
  blogData: BlogAnalyticsRow[];
  timeSeries: TimeSeriesPoint[];
}) {
  const totalViews = blogData.reduce((sum, b) => sum + b.views, 0);
  const avgReadingTime = blogData.length > 0 ? blogData.reduce((sum, b) => sum + b.readingTime, 0) / blogData.length : 0;

  return (
    <div className="space-y-6">
      <PageHeader title="Blog Analytics" description="Article views, reading time, and popular posts" />

      <div className="grid gap-4 sm:grid-cols-3">
        <SectionCard title="Total Blog Views" description="All-time blog page views">
          <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
        </SectionCard>
        <SectionCard title="Published Articles" description="Articles with views">
          <p className="text-2xl font-bold">{blogData.length}</p>
        </SectionCard>
        <SectionCard title="Avg Reading Time" description="Across viewed articles">
          <p className="text-2xl font-bold">{avgReadingTime > 0 ? `${avgReadingTime.toFixed(0)} min` : '—'}</p>
        </SectionCard>
      </div>

      <SectionCard title="Blog Views Over Time" description="Daily blog page views">
        {timeSeries.length > 0 && timeSeries.some((d) => d.value > 0) ? (
          <LineChart data={timeSeries} height={200} />
        ) : (
          <EmptyData message="No blog view data yet" />
        )}
      </SectionCard>

      <SectionCard
        title="Popular Articles"
        description="Top 10 by views"
        action={<ExportButtons filename="blog-analytics" headers={['Slug', 'Title', 'Views', 'Reading Time (min)']} rows={blogData.map((b) => [b.slug, b.title, b.views, b.readingTime])} />}
      >
        {blogData.length > 0 ? (
          <>
            <BarChart
              data={blogData.map((b, i) => ({
                label: b.title.length > 12 ? b.title.slice(0, 10) + '...' : b.title,
                value: b.views,
                color: i === 0 ? 'from-brand-purple to-brand-purple/60' : 'from-cyan-500 to-cyan-500/60',
              }))}
              height={220}
            />
            <div className="mt-4">
              <AnalyticsTable
                headers={['Rank', 'Title', 'Views', 'Reading Time']}
                rows={blogData.map((b, i) => [i + 1, b.title, b.views, `${b.readingTime} min`])}
              />
            </div>
          </>
        ) : (
          <EmptyData message="No blog view data yet" />
        )}
      </SectionCard>
    </div>
  );
}
