import type { Metadata } from 'next';
import { tools, categories } from '@/lib/data';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About — Free Online Tools for Everyone',
  description: `ToolNest provides ${tools.length} free online tools across ${categories.length} categories — PDF, image, QR, SEO, AI, text, developer, calculators and more. All tools run in your browser with no registration required.`,
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About ToolNest — Free Online Tools for Everyone',
    description: `ToolNest provides ${tools.length} free online tools across ${categories.length} categories. All tools run in your browser with no registration required.`,
    type: 'website',
    url: `${SITE_URL}/about`,
    siteName: 'ToolNest',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ToolNest — Free Online Tools',
    description: `${tools.length} free online tools across ${categories.length} categories. No registration required.`,
    creator: '@toolnest',
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
