import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy — ToolNest',
  description:
    'How ToolNest handles your data: browser-based tools, cookies, Google Analytics, Google AdSense, newsletter emails, and local storage. No registration required.',
  alternates: { canonical: '/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy — ToolNest',
    description:
      'How ToolNest handles your data: browser-based tools, cookies, Google Analytics, Google AdSense, newsletter emails, and local storage.',
    type: 'website',
    url: `${SITE_URL}/privacy-policy`,
    siteName: 'ToolNest',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — ToolNest',
    description:
      'How ToolNest handles your data: browser-based tools, cookies, analytics, ads, and local storage.',
    creator: '@toolnest',
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
