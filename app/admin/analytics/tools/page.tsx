import { getTopTools, getLeastViewedTools, getMostSearchedTools, getTrendingTools } from '@/lib/analytics-queries';
import { ToolsAnalyticsClient } from '@/components/admin/analytics-tools-client';

export const dynamic = 'force-dynamic';

export default async function ToolsAnalyticsPage() {
  const [topTools, leastViewed, mostSearched, trending] = await Promise.all([
    getTopTools(10),
    getLeastViewedTools(10),
    getMostSearchedTools(10),
    getTrendingTools(10),
  ]);

  return (
    <ToolsAnalyticsClient
      topTools={topTools}
      leastViewed={leastViewed}
      mostSearched={mostSearched}
      trending={trending}
    />
  );
}
