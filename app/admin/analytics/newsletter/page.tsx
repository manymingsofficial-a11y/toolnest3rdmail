import { getNewsletterAnalytics } from '@/lib/analytics-queries';
import { NewsletterAnalyticsClient } from '@/components/admin/analytics-newsletter-client';

export const dynamic = 'force-dynamic';

export default async function NewsletterAnalyticsPage() {
  const data = await getNewsletterAnalytics();
  return <NewsletterAnalyticsClient data={data} />;
}
