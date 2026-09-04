import type { Metadata } from 'next';

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
    siteName: 'ToolNest',
    locale: 'en_US',
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
