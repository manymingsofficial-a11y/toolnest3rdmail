import { fetchTools, fetchCategories } from '@/lib/public-data';
import { ToolsPageClient } from '@/components/tools-page-client';

export default async function ToolsPage() {
  const [tools, categories] = await Promise.all([
    fetchTools(),
    fetchCategories(),
  ]);

  return <ToolsPageClient tools={tools} categories={categories} />;
}
