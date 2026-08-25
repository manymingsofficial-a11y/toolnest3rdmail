import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Terms & Conditions — ToolNest',
  description:
    'The terms and conditions for using ToolNest and its free online tools — acceptable use, tool output responsibility, intellectual property, advertising, limitation of liability, and more.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms & Conditions — ToolNest',
    description:
      'The terms and conditions for using ToolNest and its free online tools — acceptable use, tool output, intellectual property, advertising, and liability.',
    type: 'website',
    url: `${SITE_URL}/terms`,
    siteName: 'ToolNest',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions — ToolNest',
    description:
      'The terms and conditions for using ToolNest and its free online tools.',
    creator: '@toolnest',
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
