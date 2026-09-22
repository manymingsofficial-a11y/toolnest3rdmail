import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Categories — Browse Tools by Category',
  description:
    'Browse all tool categories on ToolNest — PDF, image, QR & barcode, SEO, AI, text, developer, calculators, converters and more.',
  alternates: {
    canonical: '/categories',
  },
  openGraph: {
    title: 'Categories — Browse Tools by Category | ToolNest',
    description:
      'Browse all tool categories on ToolNest — PDF, image, QR & barcode, SEO, AI, text, developer, calculators, converters and more.',
    type: 'website',
    url: `${SITE_URL}/categories`,
    siteName: 'ToolNest',
    locale: 'en_US',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Browse Tool Categories — ToolNest' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Categories — ToolNest',
    description: 'Browse all tool categories on ToolNest.',
    creator: '@toolnest',
  },
  robots: { index: true, follow: true },
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
