import { getAnalyticsSummary, getPageViewTimeSeries, getTopTools, getCategoryViews, getVisitorAnalytics } from '@/lib/analytics-queries';
import { AnalyticsOverviewClient } from '@/components/admin/analytics-overview-client';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  const [summary, timeSeries, topTools, categoryViews, visitors] = await Promise.all([
    getAnalyticsSummary(),
    getPageViewTimeSeries('daily'),
    getTopTools(10),
    getCategoryViews(),
    getVisitorAnalytics(),
  ]);

  return (
    <AnalyticsOverviewClient
      summary={summary}
      timeSeries={timeSeries}
      topTools={topTools}
      categoryViews={categoryViews}
      visitors={visitors}
    />
  );
}
