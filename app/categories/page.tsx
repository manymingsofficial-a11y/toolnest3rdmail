import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchTools, fetchCategories } from '@/lib/public-data';
import { CategoriesPageClient } from '@/components/categories-page-client';
import { getIcon } from '@/lib/icon-map';
import { cn } from '@/lib/utils';
import type { Tool, Category } from '@/lib/data';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ cat?: string }> }): Promise<Metadata> {
  const params = await searchParams;
  const hasCategoryFilter = !!params.cat;

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

  return (
    <>
      <CategoriesPageClient tools={tools} categories={categories} />
      <ServerRenderedCategoryLinks tools={tools} categories={categories} />
    </>
  );
}

function ServerRenderedCategoryLinks({ tools, categories }: { tools: Tool[]; categories: Category[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <h2 className="sr-only">All categories and tools</h2>
      {categories.map((cat) => {
        const catTools = tools.filter((t) => t.category === cat.name);
        if (catTools.length === 0) return null;
        const CatIcon = getIcon(cat.icon);
        return (
          <div key={cat.slug} className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div
                className={cn(
                  'grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br text-white shadow',
                  cat.gradient
                )}
              >
                <CatIcon className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-bold tracking-tight">{cat.name}</h3>
              <span className="text-sm text-muted-foreground">{catTools.length} tools</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {catTools.map((tool) => {
                const ToolIcon = getIcon(tool.icon);
                return (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-border/40 bg-background/30 p-3 transition-colors hover:border-border/80 hover:bg-background/60"
                  >
                    <div
                      className={cn(
                        'grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-white',
                        tool.gradient
                      )}
                    >
                      <ToolIcon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium leading-tight group-hover:text-brand-purple transition-colors">
                      {tool.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
