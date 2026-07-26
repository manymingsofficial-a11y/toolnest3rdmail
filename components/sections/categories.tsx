import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';

import { categories } from '@/lib/data';

export function Categories() {
  return (
    <section id="categories" className="relative py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-64 -translate-y-1/2 bg-gradient-brand opacity-[0.04] blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue">
            <LayoutGrid className="h-4 w-4" />
            Popular Categories
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Find the right tool for the job
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Ten curated collections covering every kind of free online tool —
            from PDF and image to developer and calculators.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl glass-card p-5 transition-all duration-300 hover:-translate-y-1 hover:glow"
            >
              <div
                aria-hidden
                className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${cat.gradient} opacity-15 blur-2xl transition-opacity duration-300 group-hover:opacity-30`}
              />
              <div
                className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${cat.gradient} text-white shadow-lg`}
              >
                <cat.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-sm font-semibold tracking-tight">
                {cat.name}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {cat.count} tools
              </p>
              <p className="mt-2 text-xs text-muted-foreground/80 line-clamp-2">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
