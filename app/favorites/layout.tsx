import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Favorite Tools',
  description: 'Your saved favorite tools on ToolNest.',
  alternates: { canonical: '/favorites' },
  robots: { index: false, follow: true },
};

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
