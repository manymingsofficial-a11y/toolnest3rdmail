'use client';

import * as React from 'react';
import { getDataProvider } from '@/lib/admin/static-provider';
import type { AdminDashboardStats } from '@/lib/admin/types';
import { StatCard } from '@/components/admin/stat-card';
import { BarChart, LineChart, DualBarChart } from '@/components/admin/charts';
import { PageHeader, LoadingSpinner, SectionCard } from '@/components/admin/shared';
import { Wrench, FolderTree, FileText, Search, Heart, Eye, Activity, CheckCircle2 } from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = React.useState<AdminDashboardStats | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getDataProvider()
      .getDashboardStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !stats) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your ToolNest platform"
      />

      {/* Status banner */}
      <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
        <span className="text-sm font-medium">All systems operational</span>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Tools" value={stats.totalTools} icon={<Wrench className="h-5 w-5" />} gradient="from-brand-purple/30 to-brand-purple/10" trend={{ value: '12%', positive: true }} />
        <StatCard label="Categories" value={stats.totalCategories} icon={<FolderTree className="h-5 w-5" />} gradient="from-blue-500/30 to-blue-500/10" />
        <StatCard label="Blog Posts" value={stats.totalBlogPosts} icon={<FileText className="h-5 w-5" />} gradient="from-emerald-500/30 to-emerald-500/10" />
        <StatCard label="Total Searches" value={stats.totalSearches.toLocaleString()} icon={<Search className="h-5 w-5" />} gradient="from-amber-500/30 to-amber-500/10" trend={{ value: '8%', positive: true }} />
        <StatCard label="Favorites" value={stats.totalFavorites} icon={<Heart className="h-5 w-5" />} gradient="from-rose-500/30 to-rose-500/10" />
        <StatCard label="Recent Usage" value={stats.totalRecentUsage.toLocaleString()} icon={<Activity className="h-5 w-5" />} gradient="from-cyan-500/30 to-cyan-500/10" />
        <StatCard label="Total Views" value={stats.totalViews.toLocaleString()} icon={<Eye className="h-5 w-5" />} gradient="from-violet-500/30 to-violet-500/10" trend={{ value: '15%', positive: true }} />
        <StatCard label="Status" value="Operational" icon={<CheckCircle2 className="h-5 w-5" />} gradient="from-emerald-500/30 to-emerald-500/10" />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Most Used Tools" description="Top tools by usage count">
          <BarChart
            data={stats.mostUsedTools.map((t, i) => ({
              label: t.name.length > 12 ? t.name.slice(0, 10) + '...' : t.name,
              value: t.count,
              color: i === 0 ? 'from-brand-purple to-brand-purple/60' : 'from-blue-500 to-blue-500/60',
            }))}
            height={220}
          />
        </SectionCard>
        <SectionCard title="Popular Categories" description="Tools per category">
          <BarChart
            data={stats.popularCategories.map((c) => ({
              label: c.name.replace(' Tools', '').slice(0, 10),
              value: c.count,
              color: 'from-emerald-500 to-emerald-500/60',
            }))}
            height={220}
          />
        </SectionCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Daily Searches" description="Searches over the last 7 days">
          <LineChart
            data={stats.dailySearches.map((d) => ({
              label: d.date.slice(5),
              value: d.count,
            }))}
            height={200}
          />
        </SectionCard>
        <SectionCard title="Weekly Activity" description="Tools and searches per day">
          <DualBarChart data={stats.weeklyActivity.map((d) => ({ label: d.day, tools: d.tools, searches: d.searches }))} height={200} />
        </SectionCard>
      </div>
    </div>
  );
}
