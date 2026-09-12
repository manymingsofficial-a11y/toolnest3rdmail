import type { Metadata } from 'next';
import { SITE_URL, SITE_LOGO } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Terms of Service — ToolNest',
  description:
    'The terms and conditions for using ToolNest free online tools. Acceptable use, intellectual property, disclaimers, and limitations of liability.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service — ToolNest',
    description:
      'The terms and conditions for using ToolNest free online tools. Acceptable use, intellectual property, disclaimers, and limitations of liability.',
    type: 'website',
    url: `${SITE_URL}/terms`,
    siteName: 'ToolNest',
    locale: 'en_US',
    images: [{ url: SITE_LOGO, width: 1200, height: 630, alt: 'ToolNest Terms of Service' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service — ToolNest',
    description: 'Terms and conditions for using ToolNest free online tools.',
    creator: '@toolnest',
    images: [SITE_LOGO],
  },
  robots: { index: true, follow: true },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
