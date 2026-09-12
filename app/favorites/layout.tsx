import type { Metadata } from 'next';
import { SITE_URL, SITE_LOGO } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Favorite Tools',
  description: 'Your saved favorite tools on ToolNest.',
  alternates: { canonical: '/favorites' },
  openGraph: {
    title: 'Favorite Tools — ToolNest',
    description: 'Your saved favorite tools on ToolNest.',
    type: 'website',
    url: `${SITE_URL}/favorites`,
    siteName: 'ToolNest',
    locale: 'en_US',
    images: [{ url: SITE_LOGO, width: 1200, height: 630, alt: 'ToolNest Favorite Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Favorite Tools — ToolNest',
    description: 'Your saved favorite tools on ToolNest.',
    creator: '@toolnest',
    images: [SITE_LOGO],
  },
  robots: { index: false, follow: true },
};

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
