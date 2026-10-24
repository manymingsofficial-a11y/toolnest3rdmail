import Link from 'next/link';
import { fetchTools, fetchCategories } from '@/lib/public-data';
import { ToolsPageClient } from '@/components/tools-page-client';
import { getIcon } from '@/lib/icon-map';
import { cn } from '@/lib/utils';
import { getIndexPolicy } from '@/lib/tool-classification';
import type { Tool, Category } from '@/lib/data';

export default async function ToolsPage() {
  const [tools, categories] = await Promise.all([
    fetchTools(),
    fetchCategories(),
  ]);

  const indexableTools = tools.filter((t) => getIndexPolicy(t.slug).index);

  return (
    <>
      <ToolsPageClient tools={tools} categories={categories} />
      <ServerRenderedToolLinks tools={indexableTools} categories={categories} />
    </>
  );
}

function ServerRenderedToolLinks({ tools, categories }: { tools: Tool[]; categories: Category[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <h2 className="sr-only">All tools</h2>
      {categories.map((cat) => {
        const catTools = tools.filter((t) => t.category === cat.name);
        if (catTools.length === 0) return null;
        return (
          <div key={cat.slug} className="mb-10">
            <h3 className="mb-3 text-base font-bold tracking-tight">{cat.name}</h3>
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
