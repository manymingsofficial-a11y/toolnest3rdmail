'use client';

import * as React from 'react';
import { tools } from '@/lib/data';
import type { Tool } from '@/lib/data';

const FAV_KEY = 'toolnest:favorites';
const RECENT_KEY = 'toolnest:recent';
const POPULAR_KEY = 'toolnest:popular';
const SEARCH_KEY = 'toolnest:recent-searches';
const MAX_RECENT = 10;
const MAX_SEARCHES = 8;

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(`${key}-changed`));
  } catch {
    /* ignore */
  }
}

export function useFavorites() {
  const [favSlugs, setFavSlugs] = React.useState<string[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setFavSlugs(read<string[]>(FAV_KEY, []));
    setHydrated(true);
    const handler = () => setFavSlugs(read<string[]>(FAV_KEY, []));
    window.addEventListener(`${FAV_KEY}-changed`, handler);
    return () => window.removeEventListener(`${FAV_KEY}-changed`, handler);
  }, []);

  const toggle = React.useCallback((slug: string) => {
    setFavSlugs((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      write(FAV_KEY, next);
      return next;
    });
  }, []);

  const isFav = React.useCallback((slug: string) => favSlugs.includes(slug), [favSlugs]);
  const favorites = React.useMemo(
    () => favSlugs.map((s) => tools.find((t) => t.slug === s)).filter(Boolean) as Tool[],
    [favSlugs]
  );

  return { favorites, favSlugs, isFav, toggle, hydrated };
}

export function useRecentlyUsed() {
  const [recent, setRecent] = React.useState<string[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setRecent(read<string[]>(RECENT_KEY, []));
    setHydrated(true);
    // Track current path
    const path = window.location.pathname;
    if (path.startsWith('/tools/')) {
      const slug = path.split('/').pop()!;
      if (slug && tools.find((t) => t.slug === slug)) {
        trackTool(slug);
        incrementPopular(slug);
      }
    }
    const handler = () => setRecent(read<string[]>(RECENT_KEY, []));
    window.addEventListener(`${RECENT_KEY}-changed`, handler);
    return () => window.removeEventListener(`${RECENT_KEY}-changed`, handler);
  }, []);

  const recentTools = React.useMemo(
    () => recent.map((s) => tools.find((t) => t.slug === s)).filter(Boolean) as Tool[],
    [recent]
  );

  const clear = React.useCallback(() => {
    write(RECENT_KEY, []);
  }, []);

  return { recentTools, recent, clear, hydrated };
}

function trackTool(slug: string) {
  const current = read<string[]>(RECENT_KEY, []);
  const next = [slug, ...current.filter((s) => s !== slug)].slice(0, MAX_RECENT);
  write(RECENT_KEY, next);
}

function incrementPopular(slug: string) {
  const current = read<Record<string, number>>(POPULAR_KEY, {});
  current[slug] = (current[slug] || 0) + 1;
  write(POPULAR_KEY, current);
}

export function usePopularTools() {
  const [popular, setPopular] = React.useState<Record<string, number>>({});
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setPopular(read<Record<string, number>>(POPULAR_KEY, {}));
    setHydrated(true);
    const handler = () => setPopular(read<Record<string, number>>(POPULAR_KEY, {}));
    window.addEventListener(`${POPULAR_KEY}-changed`, handler);
    return () => window.removeEventListener(`${POPULAR_KEY}-changed`, handler);
  }, []);

  const mostUsed = React.useMemo(() => {
    const sorted = Object.entries(popular)
      .sort(([, a], [, b]) => b - a)
      .map(([slug]) => tools.find((t) => t.slug === slug))
      .filter(Boolean) as Tool[];
    return sorted.slice(0, 8);
  }, [popular]);

  return { mostUsed, hydrated };
}

export function useRecentSearches() {
  const [searches, setSearches] = React.useState<string[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setSearches(read<string[]>(SEARCH_KEY, []));
    setHydrated(true);
    const handler = () => setSearches(read<string[]>(SEARCH_KEY, []));
    window.addEventListener(`${SEARCH_KEY}-changed`, handler);
    return () => window.removeEventListener(`${SEARCH_KEY}-changed`, handler);
  }, []);

  const addSearch = React.useCallback((query: string) => {
    if (!query.trim()) return;
    const current = read<string[]>(SEARCH_KEY, []);
    const next = [query, ...current.filter((s) => s.toLowerCase() !== query.toLowerCase())].slice(0, MAX_SEARCHES);
    write(SEARCH_KEY, next);
  }, []);

  const clearSearches = React.useCallback(() => {
    write(SEARCH_KEY, []);
  }, []);

  return { searches, addSearch, clearSearches, hydrated };
}
