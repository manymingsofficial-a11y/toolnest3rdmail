import { fetchTools, fetchCategories } from '@/lib/public-data';
import { CategoriesPageClient } from '@/components/categories-page-client';

export default async function CategoriesPage() {
  const [tools, categories] = await Promise.all([
    fetchTools(),
    fetchCategories(),
  ]);

  return <CategoriesPageClient tools={tools} categories={categories} />;
}
