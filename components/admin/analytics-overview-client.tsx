'use client';

import * as React from 'react';
import { StatCard } from '@/components/admin/stat-card';
import { LineChart, BarChart } from '@/components/admin/charts';
import { PageHeader, SectionCard } from '@/components/admin/shared';
import { BreakdownCard, EmptyData, ExportButtons } from '@/components/admin/analytics-shared';
import type { AnalyticsSummary, TimeSeriesPoint, CategoryData, ToolAnalyticsRow, VisitorAnalytics } from '@/lib/analytics-queries';
import {
  Eye, Search, MousePointerClick, Mail, Users, TrendingUp,
  Wrench, FolderTree, FileText, AlertCircle, Activity, Repeat, Megaphone, Link2,
} from 'lucide-react';

export function AnalyticsOverviewClient({
  summary,
  timeSeries,
  topTools,
  categoryViews,
  visitors,
}: {
  summary: AnalyticsSummary;
  timeSeries: TimeSeriesPoint[];
  topTools: ToolAnalyticsRow[];
  categoryViews: CategoryData[];
  visitors: VisitorAnalytics;
}) {
  const hasData = summary.totalPageViews > 0 || summary.totalSearches > 0 || summary.newsletterSubscribers > 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Real-time analytics dashboard for ToolNest"
        action={
          <ExportButtons
            filename="analytics-overview"
            headers={['Metric', 'Value']}
            rows={[
              ['Total Page Views', summary.totalPageViews],
              ['Total Tool Views', summary.totalToolViews],
              ['Total Category Views', summary.totalCategoryViews],
              ['Total Blog Views', summary.totalBlogViews],
              ['Total Searches', summary.totalSearches],
              ['No Result Searches', summary.noResultSearches],
              ['Affiliate Clicks', summary.affiliateClicks],
              ['Ad Clicks', summary.adClicks],
              ['Ad Impressions', summary.adImpressions],
              ['Newsletter Subscribers', summary.newsletterSubscribers],
              ['Newsletter Growth', summary.newsletterGrowth],
              ['Active Users', summary.activeUsers],
              ['Returning Visitors', summary.returningVisitors],
            ]}
          />
        }
      />

      {!hasData && (
        <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          <span className="text-sm font-medium">No data available yet. Analytics will appear here once visitors start using the site.</span>
        </div>
      )}

      {/* Dashboard cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Page Views" value={summary.totalPageViews.toLocaleString()} icon={<Eye className="h-5 w-5" />} gradient="from-brand-purple/30 to-brand-purple/10" />
        <StatCard label="Tool Views" value={summary.totalToolViews.toLocaleString()} icon={<Wrench className="h-5 w-5" />} gradient="from-blue-500/30 to-blue-500/10" />
        <StatCard label="Category Views" value={summary.totalCategoryViews.toLocaleString()} icon={<FolderTree className="h-5 w-5" />} gradient="from-emerald-500/30 to-emerald-500/10" />
        <StatCard label="Blog Views" value={summary.totalBlogViews.toLocaleString()} icon={<FileText className="h-5 w-5" />} gradient="from-cyan-500/30 to-cyan-500/10" />
        <StatCard label="Total Searches" value={summary.totalSearches.toLocaleString()} icon={<Search className="h-5 w-5" />} gradient="from-amber-500/30 to-amber-500/10" />
        <StatCard label="No Result Searches" value={summary.noResultSearches.toLocaleString()} icon={<AlertCircle className="h-5 w-5" />} gradient="from-rose-500/30 to-rose-500/10" />
        <StatCard label="Affiliate Clicks" value={summary.affiliateClicks.toLocaleString()} icon={<Link2 className="h-5 w-5" />} gradient="from-violet-500/30 to-violet-500/10" />
        <StatCard label="Ad Clicks" value={summary.adClicks.toLocaleString()} icon={<Megaphone className="h-5 w-5" />} gradient="from-orange-500/30 to-orange-500/10" />
        <StatCard label="Ad Impressions" value={summary.adImpressions.toLocaleString()} icon={<Eye className="h-5 w-5" />} gradient="from-teal-500/30 to-teal-500/10" />
        <StatCard label="Subscribers" value={summary.newsletterSubscribers.toLocaleString()} icon={<Mail className="h-5 w-5" />} gradient="from-pink-500/30 to-pink-500/10" />
        <StatCard
          label="Newsletter Growth"
          value={summary.newsletterGrowth >= 0 ? `+${summary.newsletterGrowth}` : String(summary.newsletterGrowth)}
          icon={<TrendingUp className="h-5 w-5" />}
          gradient="from-indigo-500/30 to-indigo-500/10"
          trend={summary.newsletterGrowth !== 0 ? { value: 'this month', positive: summary.newsletterGrowth >= 0 } : undefined}
        />
        <StatCard label="Active Users" value={summary.activeUsers.toLocaleString()} icon={<Activity className="h-5 w-5" />} gradient="from-green-500/30 to-green-500/10" />
        <StatCard label="Returning Visitors" value={summary.returningVisitors.toLocaleString()} icon={<Repeat className="h-5 w-5" />} gradient="from-purple-500/30 to-purple-500/10" />
        <StatCard label="Total Sessions" value={visitors.totalSessions.toLocaleString()} icon={<Users className="h-5 w-5" />} gradient="from-sky-500/30 to-sky-500/10" />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Page Views" description="Daily page views over the last 30 days">
          {timeSeries.length > 0 && timeSeries.some((d) => d.value > 0) ? (
            <LineChart data={timeSeries} height={220} />
          ) : (
            <EmptyData message="No page view data yet" />
          )}
        </SectionCard>
        <SectionCard title="Top 10 Tools" description="Most viewed tools">
          {topTools.length > 0 ? (
            <BarChart
              data={topTools.map((t, i) => ({
                label: t.name.length > 12 ? t.name.slice(0, 10) + '...' : t.name,
                value: t.views,
                color: i === 0 ? 'from-brand-purple to-brand-purple/60' : 'from-blue-500 to-blue-500/60',
              }))}
              height={220}
            />
          ) : (
            <EmptyData message="No tool view data yet" />
          )}
        </SectionCard>
      </div>

      {/* Category views */}
      <SectionCard title="Category Views" description="Views per category">
        {categoryViews.length > 0 ? (
          <BarChart
            data={categoryViews.map((c) => ({
              label: c.label.length > 12 ? c.label.slice(0, 10) + '...' : c.label,
              value: c.value,
              color: 'from-emerald-500 to-emerald-500/60',
            }))}
            height={200}
          />
        ) : (
          <EmptyData message="No category view data yet" />
        )}
      </SectionCard>

      {/* Visitor breakdown */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <BreakdownCard title="Device Type" data={visitors.deviceBreakdown} total={visitors.totalSessions} />
        <BreakdownCard title="Browser" data={visitors.browserBreakdown} total={visitors.totalSessions} />
        <BreakdownCard title="Operating System" data={visitors.osBreakdown} total={visitors.totalSessions} />
      </div>
    </div>
  );
}
