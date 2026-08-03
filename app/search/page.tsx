import { Suspense } from 'react';
import { fetchSearchIndex } from '@/lib/public-data';
import { tools as staticTools, categories as staticCategories } from '@/lib/data';
import { SearchPageClient } from '@/components/search-page-client';

export default async function SearchPage() {
  let tools = staticTools;
  let categories = staticCategories;

  try {
    const index = await fetchSearchIndex();
    if (index.tools.length > 0 || index.categories.length > 0) {
      tools = index.tools;
      categories = index.categories;
    }
  } catch {
    // fall back to static data
  }

  return (
    <Suspense fallback={null}>
      <SearchPageClient tools={tools} categories={categories} />
    </Suspense>
  );
}
