import { supabaseServer } from '@/lib/supabase-server';

// ============================================================
// Types
// ============================================================

export type TimeSeriesPoint = { label: string; value: number };
export type CategoryData = { label: string; value: number };
export type ToolAnalyticsRow = { slug: string; name: string; views: number; category: string };
export type SearchAnalyticsRow = { query: string; count: number; zero_results: number };
export type VisitorBreakdown = { label: string; value: number };

export type AnalyticsSummary = {
  totalPageViews: number;
  totalToolViews: number;
  totalCategoryViews: number;
  totalBlogViews: number;
  totalSearches: number;
  noResultSearches: number;
  affiliateClicks: number;
  adClicks: number;
  newsletterSubscribers: number;
  newsletterGrowth: number;
  activeUsers: number;
  returningVisitors: number;
  adImpressions: number;
};

export type DateRange = 'daily' | 'weekly' | 'monthly' | 'yearly';

// ============================================================
// Helpers
// ============================================================

function rangeToInterval(range: DateRange): string {
  switch (range) {
    case 'daily': return 'day';
    case 'weekly': return 'week';
    case 'monthly': return 'month';
    case 'yearly': return 'year';
  }
}

function rangeToStartDate(range: DateRange): Date {
  const now = new Date();
  switch (range) {
    case 'daily':
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    case 'weekly':
      return new Date(now.getTime() - 12 * 7 * 24 * 60 * 60 * 1000);
    case 'monthly':
      return new Date(now.getTime() - 12 * 30 * 24 * 60 * 60 * 1000);
    case 'yearly':
      return new Date(now.getTime() - 5 * 365 * 24 * 60 * 60 * 1000);
  }
}

function formatDateLabel(date: string, range: DateRange): string {
  const d = new Date(date);
  switch (range) {
    case 'daily': return d.toISOString().slice(5, 10);
    case 'weekly': return `W${getWeekNumber(d)}`;
    case 'monthly': return d.toISOString().slice(0, 7);
    case 'yearly': return d.toISOString().slice(0, 4);
  }
}

function getWeekNumber(d: Date): number {
  const onejan = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
}

// ============================================================
// Summary (dashboard cards)
// ============================================================

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const sincePrev = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString();

  const [
    pageViewsTotal,
    toolViews,
    categoryViews,
    blogViews,
    searchesTotal,
    noResultSearches,
    adClicks,
    affiliateClicks,
    newsletterCurrent,
    newsletterPrev,
    activeSessions,
    returningVisitors,
    adImpressions,
  ] = await Promise.all([
    supabaseServer.from('analytics_page_views').select('*', { count: 'exact', head: true }),
    supabaseServer.from('analytics_page_views').select('*', { count: 'exact', head: true }).eq('page_type', 'tool'),
    supabaseServer.from('analytics_page_views').select('*', { count: 'exact', head: true }).eq('page_type', 'category'),
    supabaseServer.from('analytics_page_views').select('*', { count: 'exact', head: true }).eq('page_type', 'blog'),
    supabaseServer.from('analytics_search_events').select('*', { count: 'exact', head: true }),
    supabaseServer.from('analytics_search_events').select('*', { count: 'exact', head: true }).eq('result_count', 0),
    supabaseServer.from('admin_click_events').select('*', { count: 'exact', head: true }).eq('type', 'ad'),
    supabaseServer.from('admin_click_events').select('*', { count: 'exact', head: true }).eq('type', 'affiliate'),
    supabaseServer.from('admin_newsletter_subscribers').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabaseServer.from('admin_newsletter_subscribers').select('*', { count: 'exact', head: true }).eq('status', 'active').lt('created_at', since),
    supabaseServer.from('analytics_visitor_sessions').select('*', { count: 'exact', head: true }).gt('last_activity', since),
    supabaseServer.from('analytics_visitor_sessions').select('*', { count: 'exact', head: true }).eq('is_returning', true),
    supabaseServer.from('analytics_ad_impressions').select('*', { count: 'exact', head: true }),
  ]);

  const currentSubs = newsletterCurrent.count ?? 0;
  const prevSubs = newsletterPrev.count ?? 0;

  return {
    totalPageViews: pageViewsTotal.count ?? 0,
    totalToolViews: toolViews.count ?? 0,
    totalCategoryViews: categoryViews.count ?? 0,
    totalBlogViews: blogViews.count ?? 0,
    totalSearches: searchesTotal.count ?? 0,
    noResultSearches: noResultSearches.count ?? 0,
    affiliateClicks: affiliateClicks.count ?? 0,
    adClicks: adClicks.count ?? 0,
    newsletterSubscribers: currentSubs,
    newsletterGrowth: currentSubs - prevSubs,
    activeUsers: activeSessions.count ?? 0,
    returningVisitors: returningVisitors.count ?? 0,
    adImpressions: adImpressions.count ?? 0,
  };
}

// ============================================================
// Time series (page views over time)
// ============================================================

export async function getPageViewTimeSeries(range: DateRange): Promise<TimeSeriesPoint[]> {
  const startDate = rangeToStartDate(range);
  const interval = rangeToInterval(range);

  const { data, error } = await supabaseServer.rpc('get_page_view_timeseries', {
    start_date: startDate.toISOString(),
    interval_unit: interval,
  });

  if (error || !data) return [];
  return (data as { bucket: string; count: number }[]).map((row) => ({
    label: formatDateLabel(row.bucket, range),
    value: Number(row.count),
  }));
}

// ============================================================
// Tool analytics
// ============================================================

export async function getTopTools(limit = 10): Promise<ToolAnalyticsRow[]> {
  const { data, error } = await supabaseServer
    .from('analytics_page_views')
    .select('tool_slug')
    .eq('page_type', 'tool')
    .not('tool_slug', 'eq', '');

  if (error || !data) return [];

  const counts = new Map<string, number>();
  for (const row of data) {
    const slug = row.tool_slug as string;
    counts.set(slug, (counts.get(slug) ?? 0) + 1);
  }

  const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, limit);

  // Fetch tool names
  const slugs = sorted.map(([slug]) => slug);
  const { data: tools } = await supabaseServer
    .from('admin_tools')
    .select('slug, name, category')
    .in('slug', slugs);

  const toolMap = new Map((tools ?? []).map((t) => [t.slug, t]));

  return sorted.map(([slug, views]) => ({
    slug,
    name: toolMap.get(slug)?.name ?? slug,
    views,
    category: toolMap.get(slug)?.category ?? '',
  }));
}

export async function getLeastViewedTools(limit = 10): Promise<ToolAnalyticsRow[]> {
  const { data, error } = await supabaseServer
    .from('analytics_page_views')
    .select('tool_slug')
    .eq('page_type', 'tool')
    .not('tool_slug', 'eq', '');

  if (error || !data) return [];

  const counts = new Map<string, number>();
  for (const row of data) {
    const slug = row.tool_slug as string;
    counts.set(slug, (counts.get(slug) ?? 0) + 1);
  }

  // Get all published tools to include those with 0 views
  const { data: allTools } = await supabaseServer
    .from('admin_tools')
    .select('slug, name, category')
    .eq('status', 'published')
    .is('deleted_at', null);

  const allToolSlugs = (allTools ?? []).map((t) => t.slug);
  for (const slug of allToolSlugs) {
    if (!counts.has(slug)) counts.set(slug, 0);
  }

  const sorted = Array.from(counts.entries()).sort((a, b) => a[1] - b[1]).slice(0, limit);
  const toolMap = new Map((allTools ?? []).map((t) => [t.slug, t]));

  return sorted.map(([slug, views]) => ({
    slug,
    name: toolMap.get(slug)?.name ?? slug,
    views,
    category: toolMap.get(slug)?.category ?? '',
  }));
}

export async function getMostSearchedTools(limit = 10): Promise<SearchAnalyticsRow[]> {
  const { data, error } = await supabaseServer
    .from('analytics_search_events')
    .select('query, result_count');

  if (error || !data) return [];

  const counts = new Map<string, { count: number; zero: number }>();
  for (const row of data) {
    const q = row.query as string;
    const existing = counts.get(q) ?? { count: 0, zero: 0 };
    existing.count++;
    if ((row.result_count as number) === 0) existing.zero++;
    counts.set(q, existing);
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, limit)
    .map(([query, v]) => ({ query, count: v.count, zero_results: v.zero }));
}

export async function getTrendingTools(limit = 10): Promise<ToolAnalyticsRow[]> {
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabaseServer
    .from('analytics_page_views')
    .select('tool_slug')
    .eq('page_type', 'tool')
    .not('tool_slug', 'eq', '')
    .gt('created_at', since);

  if (error || !data) return [];

  const counts = new Map<string, number>();
  for (const row of data) {
    const slug = row.tool_slug as string;
    counts.set(slug, (counts.get(slug) ?? 0) + 1);
  }

  const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, limit);
  const slugs = sorted.map(([slug]) => slug);
  const { data: tools } = await supabaseServer
    .from('admin_tools')
    .select('slug, name, category')
    .in('slug', slugs);

  const toolMap = new Map((tools ?? []).map((t) => [t.slug, t]));

  return sorted.map(([slug, views]) => ({
    slug,
    name: toolMap.get(slug)?.name ?? slug,
    views,
    category: toolMap.get(slug)?.category ?? '',
  }));
}

// ============================================================
// Search analytics
// ============================================================

export async function getSearchTimeSeries(range: DateRange): Promise<TimeSeriesPoint[]> {
  const startDate = rangeToStartDate(range);
  const interval = rangeToInterval(range);

  const { data, error } = await supabaseServer.rpc('get_search_timeseries', {
    start_date: startDate.toISOString(),
    interval_unit: interval,
  });

  if (error || !data) return [];
  return (data as { bucket: string; count: number }[]).map((row) => ({
    label: formatDateLabel(row.bucket, range),
    value: Number(row.count),
  }));
}

export async function getTopSearchQueries(limit = 10): Promise<SearchAnalyticsRow[]> {
  return getMostSearchedTools(limit);
}

export async function getZeroResultSearches(limit = 10): Promise<SearchAnalyticsRow[]> {
  const { data, error } = await supabaseServer
    .from('analytics_search_events')
    .select('query, result_count')
    .eq('result_count', 0);

  if (error || !data) return [];

  const counts = new Map<string, number>();
  for (const row of data) {
    const q = row.query as string;
    counts.set(q, (counts.get(q) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([query, count]) => ({ query, count, zero_results: count }));
}

// ============================================================
// Category analytics
// ============================================================

export async function getCategoryViews(): Promise<CategoryData[]> {
  const { data, error } = await supabaseServer
    .from('analytics_page_views')
    .select('category_slug')
    .eq('page_type', 'category')
    .not('category_slug', 'eq', '');

  if (error || !data) return [];

  const counts = new Map<string, number>();
  for (const row of data) {
    const slug = row.category_slug as string;
    counts.set(slug, (counts.get(slug) ?? 0) + 1);
  }

  const slugs = Array.from(counts.keys());
  const { data: categories } = await supabaseServer
    .from('admin_categories')
    .select('slug, name')
    .in('slug', slugs);

  const catMap = new Map((categories ?? []).map((c) => [c.slug, c.name]));

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([slug, value]) => ({ label: catMap.get(slug) ?? slug, value }));
}

export async function getFastestGrowingCategory(): Promise<CategoryData | null> {
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const prevSince = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();

  const [recent, previous] = await Promise.all([
    supabaseServer.from('analytics_page_views').select('category_slug').eq('page_type', 'category').not('category_slug', 'eq', '').gt('created_at', since),
    supabaseServer.from('analytics_page_views').select('category_slug').eq('page_type', 'category').not('category_slug', 'eq', '').gt('created_at', prevSince).lt('created_at', since),
  ]);

  const recentCounts = new Map<string, number>();
  for (const row of recent.data ?? []) {
    const slug = row.category_slug as string;
    recentCounts.set(slug, (recentCounts.get(slug) ?? 0) + 1);
  }

  const prevCounts = new Map<string, number>();
  for (const row of previous.data ?? []) {
    const slug = row.category_slug as string;
    prevCounts.set(slug, (prevCounts.get(slug) ?? 0) + 1);
  }

  let bestSlug = '';
  let bestGrowth = -Infinity;
  for (const [slug, recentCount] of Array.from(recentCounts)) {
    const prevCount = prevCounts.get(slug) ?? 0;
    const growth = recentCount - prevCount;
    if (growth > bestGrowth) {
      bestGrowth = growth;
      bestSlug = slug;
    }
  }

  if (!bestSlug) return null;

  const { data: cat } = await supabaseServer
    .from('admin_categories')
    .select('name')
    .eq('slug', bestSlug)
    .maybeSingle();

  return { label: cat?.name ?? bestSlug, value: bestGrowth };
}

// ============================================================
// Blog analytics
// ============================================================

export type BlogAnalyticsRow = {
  slug: string;
  title: string;
  views: number;
  readingTime: number;
};

export async function getBlogAnalytics(limit = 10): Promise<BlogAnalyticsRow[]> {
  const { data, error } = await supabaseServer
    .from('analytics_page_views')
    .select('blog_slug')
    .eq('page_type', 'blog')
    .not('blog_slug', 'eq', '');

  if (error || !data) return [];

  const counts = new Map<string, number>();
  for (const row of data) {
    const slug = row.blog_slug as string;
    counts.set(slug, (counts.get(slug) ?? 0) + 1);
  }

  const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, limit);
  const slugs = sorted.map(([slug]) => slug);
  const { data: posts } = await supabaseServer
    .from('admin_blog_posts')
    .select('slug, title, reading_time')
    .in('slug', slugs);

  const postMap = new Map((posts ?? []).map((p) => [p.slug, p]));

  return sorted.map(([slug, views]) => ({
    slug,
    title: postMap.get(slug)?.title ?? slug,
    views,
    readingTime: postMap.get(slug)?.reading_time ?? 0,
  }));
}

// ============================================================
// Affiliate analytics
// ============================================================

export type AffiliateAnalyticsRow = {
  targetId: string;
  name: string;
  network: string;
  clicks: number;
};

export async function getAffiliateClicks(limit = 10): Promise<AffiliateAnalyticsRow[]> {
  const { data, error } = await supabaseServer
    .from('admin_click_events')
    .select('target_id, placement, metadata')
    .eq('type', 'affiliate');

  if (error || !data) return [];

  const counts = new Map<string, { clicks: number; network: string; name: string }>();
  for (const row of data) {
    const id = (row.target_id as string) || '';
    const meta = (row.metadata as Record<string, string>) ?? {};
    const existing = counts.get(id) ?? { clicks: 0, network: row.placement as string, name: meta.name ?? id };
    existing.clicks++;
    counts.set(id, existing);
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1].clicks - a[1].clicks)
    .slice(0, limit)
    .map(([targetId, v]) => ({ targetId, name: v.name, network: v.network, clicks: v.clicks }));
}

export async function getAffiliateNetworkBreakdown(): Promise<CategoryData[]> {
  const { data, error } = await supabaseServer
    .from('admin_click_events')
    .select('placement')
    .eq('type', 'affiliate');

  if (error || !data) return [];

  const counts = new Map<string, number>();
  for (const row of data) {
    const network = (row.placement as string) || 'unknown';
    counts.set(network, (counts.get(network) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([label, value]) => ({ label, value }));
}

// ============================================================
// Ad analytics
// ============================================================

export type AdAnalyticsRow = {
  slot: string;
  impressions: number;
  clicks: number;
  ctr: number;
};

export async function getAdAnalytics(): Promise<AdAnalyticsRow[]> {
  const [impressions, clicks] = await Promise.all([
    supabaseServer.from('analytics_ad_impressions').select('slot'),
    supabaseServer.from('admin_click_events').select('placement').eq('type', 'ad'),
  ]);

  if ((impressions.error || clicks.error) && !impressions.data && !clicks.data) return [];

  const impCounts = new Map<string, number>();
  for (const row of impressions.data ?? []) {
    const slot = (row.slot as string) || '';
    impCounts.set(slot, (impCounts.get(slot) ?? 0) + 1);
  }

  const clickCounts = new Map<string, number>();
  for (const row of clicks.data ?? []) {
    const slot = (row.placement as string) || '';
    clickCounts.set(slot, (clickCounts.get(slot) ?? 0) + 1);
  }

  const allSlots = new Set(Array.from(impCounts.keys()).concat(Array.from(clickCounts.keys())));

  return Array.from(allSlots)
    .sort((a, b) => (clickCounts.get(b) ?? 0) - (clickCounts.get(a) ?? 0))
    .map((slot) => {
      const imp = impCounts.get(slot) ?? 0;
      const clk = clickCounts.get(slot) ?? 0;
      return {
        slot,
        impressions: imp,
        clicks: clk,
        ctr: imp > 0 ? (clk / imp) * 100 : 0,
      };
    });
}

// ============================================================
// Newsletter analytics
// ============================================================

export type NewsletterAnalytics = {
  totalSubscribers: number;
  activeSubscribers: number;
  unsubscribed: number;
  growthThisMonth: number;
  growthRate: number;
  subscribesLast30Days: number;
  unsubscribesLast30Days: number;
  conversionRate: number;
  timeSeries: TimeSeriesPoint[];
};

export async function getNewsletterAnalytics(): Promise<NewsletterAnalytics> {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const [total, active, unsubscribed, monthSubs, last30Subs, last30Unsubs, totalPageViews] = await Promise.all([
    supabaseServer.from('admin_newsletter_subscribers').select('*', { count: 'exact', head: true }),
    supabaseServer.from('admin_newsletter_subscribers').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabaseServer.from('admin_newsletter_subscribers').select('*', { count: 'exact', head: true }).eq('status', 'unsubscribed'),
    supabaseServer.from('admin_newsletter_subscribers').select('*', { count: 'exact', head: true }).gt('created_at', monthStart),
    supabaseServer.from('admin_newsletter_subscribers').select('*', { count: 'exact', head: true }).gt('created_at', last30Days).eq('status', 'active'),
    supabaseServer.from('admin_click_events').select('*', { count: 'exact', head: true }).eq('type', 'newsletter').eq('placement', 'unsubscribe').gt('created_at', last30Days),
    supabaseServer.from('analytics_page_views').select('*', { count: 'exact', head: true }),
  ]);

  const totalSubs = total.count ?? 0;
  const activeSubs = active.count ?? 0;
  const monthSubsCount = monthSubs.count ?? 0;
  const pageViews = totalPageViews.count ?? 0;

  // Build time series from newsletter subscribe events
  const { data: subsData } = await supabaseServer
    .from('admin_newsletter_subscribers')
    .select('created_at')
    .order('created_at', { ascending: true })
    .limit(500);

  const timeSeries: TimeSeriesPoint[] = [];
  if (subsData) {
    const monthMap = new Map<string, number>();
    for (const row of subsData) {
      const month = (row.created_at as string).slice(0, 7);
      monthMap.set(month, (monthMap.get(month) ?? 0) + 1);
    }
    for (const [label, value] of Array.from(monthMap.entries()).slice(-12)) {
      timeSeries.push({ label, value });
    }
  }

  return {
    totalSubscribers: totalSubs,
    activeSubscribers: activeSubs,
    unsubscribed: unsubscribed.count ?? 0,
    growthThisMonth: monthSubsCount,
    growthRate: totalSubs > 0 ? (monthSubsCount / totalSubs) * 100 : 0,
    subscribesLast30Days: last30Subs.count ?? 0,
    unsubscribesLast30Days: last30Unsubs.count ?? 0,
    conversionRate: pageViews > 0 ? (activeSubs / pageViews) * 100 : 0,
    timeSeries,
  };
}

// ============================================================
// Visitor analytics
// ============================================================

export type VisitorAnalytics = {
  deviceBreakdown: VisitorBreakdown[];
  browserBreakdown: VisitorBreakdown[];
  osBreakdown: VisitorBreakdown[];
  referrerBreakdown: VisitorBreakdown[];
  topLandingPages: VisitorBreakdown[];
  topExitPages: VisitorBreakdown[];
  totalSessions: number;
  returningVisitors: number;
  newVisitors: number;
};

export async function getVisitorAnalytics(): Promise<VisitorAnalytics> {
  const { data: sessions, error } = await supabaseServer
    .from('analytics_visitor_sessions')
    .select('device_type, browser, os, referrer, landing_page, exit_page, is_returning')
    .order('started_at', { ascending: false })
    .limit(5000);

  if (error || !sessions) {
    return {
      deviceBreakdown: [], browserBreakdown: [], osBreakdown: [],
      referrerBreakdown: [], topLandingPages: [], topExitPages: [],
      totalSessions: 0, returningVisitors: 0, newVisitors: 0,
    };
  }

  const countBy = (field: keyof typeof sessions[0]): VisitorBreakdown[] => {
    const map = new Map<string, number>();
    for (const s of sessions) {
      const val = (s[field] as string) || 'unknown';
      map.set(val, (map.get(val) ?? 0) + 1);
    }
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([label, value]) => ({ label, value }));
  };

  const total = sessions.length;
  const returning = sessions.filter((s) => s.is_returning).length;
  const newVis = total - returning;

  return {
    deviceBreakdown: countBy('device_type'),
    browserBreakdown: countBy('browser'),
    osBreakdown: countBy('os'),
    referrerBreakdown: countBy('referrer'),
    topLandingPages: countBy('landing_page'),
    topExitPages: countBy('exit_page'),
    totalSessions: total,
    returningVisitors: returning,
    newVisitors: newVis,
  };
}
