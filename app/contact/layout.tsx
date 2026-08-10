import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact — Get in Touch',
  description:
    'Get in touch with the ToolNest team to request a new tool, report a bug, or share feedback. We read every message and build what our users ask for.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact ToolNest — Get in Touch',
    description: 'Request a new tool, report a bug, or share feedback with the ToolNest team.',
    type: 'website',
    url: `${SITE_URL}/contact`,
    siteName: 'ToolNest',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact ToolNest',
    description: 'Request a tool, report a bug, or share feedback.',
    creator: '@toolnest',
  },
  robots: { index: true, follow: true },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
