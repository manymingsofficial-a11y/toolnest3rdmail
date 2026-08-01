import type { Metadata } from 'next';
import { generateSearchMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSearchMetadata('');

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
