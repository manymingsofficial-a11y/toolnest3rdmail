import { getBlogAnalytics, getPageViewTimeSeries } from '@/lib/analytics-queries';
import { BlogAnalyticsClient } from '@/components/admin/analytics-blog-client';

export const dynamic = 'force-dynamic';

export default async function BlogAnalyticsPage() {
  const [blogData, timeSeries] = await Promise.all([
    getBlogAnalytics(10),
    getPageViewTimeSeries('daily'),
  ]);

  return (
    <BlogAnalyticsClient blogData={blogData} timeSeries={timeSeries} />
  );
}
