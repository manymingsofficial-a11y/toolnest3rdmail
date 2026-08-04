import { getAffiliateClicks, getAffiliateNetworkBreakdown, getAnalyticsSummary } from '@/lib/analytics-queries';
import { AffiliateAnalyticsClient } from '@/components/admin/analytics-affiliate-client';

export const dynamic = 'force-dynamic';

export default async function AffiliateAnalyticsPage() {
  const [clicks, networkBreakdown, summary] = await Promise.all([
    getAffiliateClicks(10),
    getAffiliateNetworkBreakdown(),
    getAnalyticsSummary(),
  ]);

  return (
    <AffiliateAnalyticsClient
      clicks={clicks}
      networkBreakdown={networkBreakdown}
      totalClicks={summary.affiliateClicks}
    />
  );
}
