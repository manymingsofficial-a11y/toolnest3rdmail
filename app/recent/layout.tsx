import type { Metadata } from 'next';
import { SITE_URL, SITE_LOGO } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Recently Used Tools',
  description: 'Tools you have opened recently on ToolNest.',
  alternates: { canonical: '/recent' },
  openGraph: {
    title: 'Recently Used Tools — ToolNest',
    description: 'Tools you have opened recently on ToolNest.',
    type: 'website',
    url: `${SITE_URL}/recent`,
    siteName: 'ToolNest',
    locale: 'en_US',
    images: [{ url: SITE_LOGO, width: 1200, height: 630, alt: 'ToolNest Recently Used Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recently Used Tools — ToolNest',
    description: 'Tools you have opened recently on ToolNest.',
    creator: '@toolnest',
    images: [SITE_LOGO],
  },
  robots: { index: false, follow: true },
};

export default function RecentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
