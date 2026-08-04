import { getAdAnalytics, getAnalyticsSummary } from '@/lib/analytics-queries';
import { AdsAnalyticsClient } from '@/components/admin/analytics-ads-client';

export const dynamic = 'force-dynamic';

export default async function AdsAnalyticsPage() {
  const [adData, summary] = await Promise.all([
    getAdAnalytics(),
    getAnalyticsSummary(),
  ]);

  return (
    <AdsAnalyticsClient
      adData={adData}
      totalImpressions={summary.adImpressions}
      totalClicks={summary.adClicks}
    />
  );
}
