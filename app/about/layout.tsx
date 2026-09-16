import type { Metadata } from 'next';
import { tools, categories } from '@/lib/data';
import { SITE_URL, SITE_NAME, SITE_LOGO } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About — Free Online Tools for Everyone',
  description: `ToolNest offers ${tools.length} free online tools across ${categories.length} categories — PDF, image, QR, SEO, AI, text, developer and more. No registration required.`,
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About ToolNest — Free Online Tools for Everyone',
    description: `ToolNest provides ${tools.length} free online tools across ${categories.length} categories. All tools run in your browser with no registration required.`,
    type: 'website',
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    locale: 'en_US',
    images: [{ url: SITE_LOGO, width: 1200, height: 630, alt: 'About ToolNest — Free Online Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ToolNest — Free Online Tools',
    description: `${tools.length} free online tools across ${categories.length} categories. No registration required.`,
    creator: '@toolnest',
    images: [SITE_LOGO],
  },
  robots: { index: true, follow: true },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
