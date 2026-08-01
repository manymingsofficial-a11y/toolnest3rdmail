import type { Metadata } from 'next';
import { tools } from '@/lib/data';
import { generateItemListJsonLd, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: `All Tools — Browse ${tools.length} Free Online Tools`,
  description:
    'Browse and search every free online tool on ToolNest — PDF, image, QR, SEO, AI, text, developer, calculators, converters and more.',
  keywords: ['free online tools', 'toolnest', 'web tools', 'pdf tools', 'image tools', 'developer tools', 'calculators', 'converters'],
  alternates: {
    canonical: '/tools',
  },
  openGraph: {
    title: `All Tools — Browse ${tools.length} Free Online Tools | ToolNest`,
    description:
      'Browse and search every free online tool on ToolNest. Filter by category or search by name.',
    type: 'website',
    url: `${SITE_URL}/tools`,
    siteName: 'ToolNest',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `All Tools — ${tools.length} Free Online Tools | ToolNest`,
    description: 'Browse and search every free online tool on ToolNest.',
    creator: '@toolnest',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const itemListJsonLd = generateItemListJsonLd(tools.slice(0, 50), '/tools');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      {children}
    </>
  );
}
