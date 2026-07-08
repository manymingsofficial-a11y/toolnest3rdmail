'use client';

import * as React from 'react';
import Link from 'next/link';
import { Heart, Search, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { ToolCard } from '@/components/tool-card';
import { useFavorites } from '@/hooks/use-tools-storage';

export default function FavoritesPage() {
  const { favorites, hydrated } = useFavorites();

  return (
    <>
      <PageHeader
        eyebrow="Your collection"
        title="Favorite Tools"
        description="All the tools you've saved in one place — click the heart icon on any tool to add it here."
      />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {!hydrated ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl glass-card" />
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-2xl glass-card p-12 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/25">
              <Heart className="h-8 w-8" />
            </div>
            <h2 className="mt-6 text-xl font-semibold tracking-tight">
              No favorites yet
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Click the heart icon on any tool card to save it here. Your
              favorites are stored locally in your browser.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild className="rounded-xl bg-gradient-brand text-white">
                <Link href="/tools">
                  <Search className="h-4 w-4" />
                  Browse tools
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/">
                  <Sparkles className="h-4 w-4" />
                  Go home
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {favorites.length} saved {favorites.length === 1 ? 'tool' : 'tools'}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {favorites.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
