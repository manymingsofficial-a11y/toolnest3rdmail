import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recently Used Tools',
  description: 'Tools you have opened recently on ToolNest.',
  alternates: { canonical: '/recent' },
  robots: { index: false, follow: true },
};

export default function RecentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
