import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { categories } from '@/lib/data';
import { CategoryPageClient } from './category-page-client';
import { generateCategoryJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';

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
    title: `${cat.name} — Free Online Tools`,
    description: `${cat.description} Browse all ${cat.name.toLowerCase()} tools on ToolNest — free, instant, no sign-up.`,
    alternates: {
      canonical: `/categories/${cat.slug}`,
    },
    openGraph: {
      title: `${cat.name} — Free Online Tools | ToolNest`,
      description: cat.description,
      type: 'website',
    },
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = categories.find((c) => c.slug === params.slug);
  if (!cat) notFound();

  const categoryJsonLd = generateCategoryJsonLd(cat!.slug);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Categories', url: '/categories' },
    { name: cat!.name, url: `/categories/${cat!.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CategoryPageClient slug={cat!.slug} />
    </>
  );
}
