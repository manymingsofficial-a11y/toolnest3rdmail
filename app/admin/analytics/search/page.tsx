import { getSearchTimeSeries, getTopSearchQueries, getZeroResultSearches, getAnalyticsSummary } from '@/lib/analytics-queries';
import { SearchAnalyticsClient } from '@/components/admin/analytics-search-client';

export const dynamic = 'force-dynamic';

export default async function SearchAnalyticsPage() {
  const [timeSeries, topQueries, zeroResults, summary] = await Promise.all([
    getSearchTimeSeries('daily'),
    getTopSearchQueries(10),
    getZeroResultSearches(10),
    getAnalyticsSummary(),
  ]);

  return (
    <SearchAnalyticsClient
      timeSeries={timeSeries}
      topQueries={topQueries}
      zeroResults={zeroResults}
      totalSearches={summary.totalSearches}
      noResultSearches={summary.noResultSearches}
    />
  );
}
