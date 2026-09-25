import type { Metadata } from 'next';
import { fetchTools, fetchCategories } from '@/lib/public-data';
import { CategoriesPageClient } from '@/components/categories-page-client';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ cat?: string }> }): Promise<Metadata> {
  const params = await searchParams;
  const hasCategoryFilter = !!params.cat;

  // When a category filter is applied via query param, noindex to prevent duplicate content
  // The main /categories page (without filter) should be indexed
  if (hasCategoryFilter) {
    return {
      robots: { index: false, follow: true },
    };
  }

  return {
    title: 'Categories — Browse Tools by Category',
    description:
      'Browse all tool categories on ToolNest — PDF, image, QR & barcode, SEO, AI, text, developer, calculators, converters and more.',
    alternates: {
      canonical: '/categories',
    },
    openGraph: {
      title: 'Categories — Browse Tools by Category | ToolNest',
      description:
        'Browse all tool categories on ToolNest — PDF, image, QR & barcode, SEO, AI, text, developer, calculators, converters and more.',
      type: 'website',
      url: 'https://freetoolnest.vercel.app/categories',
      siteName: 'ToolNest',
      locale: 'en_US',
      images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Browse Tool Categories — ToolNest' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Categories — ToolNest',
      description: 'Browse all tool categories on ToolNest.',
      creator: '@toolnest',
    },
    robots: { index: true, follow: true },
  };
}

export default async function CategoriesPage() {
  const [tools, categories] = await Promise.all([
    fetchTools(),
    fetchCategories(),
  ]);

  return <CategoriesPageClient tools={tools} categories={categories} />;
}