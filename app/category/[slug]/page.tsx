import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { categories } from '@/lib/data';
import { CategoryPageClient } from './category-page-client';

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const cat = categories.find((c) => c.slug === params.slug);
  if (!cat) return {};
  return {
    title: `${cat.name} — Free Online Tools | ToolNest`,
    description: `${cat.description} Browse all ${cat.name.toLowerCase()} tools on ToolNest — free, instant, no sign-up.`,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = categories.find((c) => c.slug === params.slug);
  if (!cat) notFound();
  // notFound() throws so cat is defined here; TypeScript needs the cast
  return <CategoryPageClient cat={cat!} />;
}
