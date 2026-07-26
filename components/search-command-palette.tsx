'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Clock,
  CornerDownLeft,
  Hash,
  Heart,
  Search,
  TrendingUp,
  X,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { tools, categories } from '@/lib/data';
import type { Tool, Category } from '@/lib/data';
import { useRecentSearches } from '@/hooks/use-tools-storage';

const POPULAR_QUERIES = [
  'QR Code',
  'PDF Merge',
  'Image Compressor',
  'Password Generator',
  'Loan EMI',
];

const SYNONYMS: Record<string, string[]> = {
  qr: ['qrcode', 'barcode', 'scan'],
  pdf: ['document', 'merge', 'split', 'compress'],
  image: ['photo', 'picture', 'resize', 'compress', 'crop'],
  password: ['secure', 'random', 'key'],
  calculator: ['calc', 'math', 'emi', 'interest'],
  converter: ['convert', 'transform', 'change'],
  seo: ['meta', 'sitemap', 'robots', 'keyword'],
  json: ['format', 'beautify', 'validate'],
  text: ['word', 'character', 'case', 'sort'],
  hash: ['md5', 'sha256', 'encrypt'],
  developer: ['code', 'css', 'js', 'html', 'minify'],
};

function getSynonyms(query: string): string[] {
  const q = query.toLowerCase();
  const result: string[] = [];
  for (const [key, syns] of Object.entries(SYNONYMS)) {
    if (q.includes(key) || syns.some((s) => q.includes(s))) {
      result.push(key, ...syns);
    }
  }
  return result;
}

function highlight(text: string, query: string) {
  if (!query.trim()) return text;
  const q = query.toLowerCase().trim();
  const lower = text.toLowerCase();
  const parts: React.ReactNode[] = [];
  let idx = lower.indexOf(q);
  let lastIdx = 0;
  let key = 0;
  while (idx !== -1) {
    parts.push(text.slice(lastIdx, idx));
    parts.push(
      <mark
        key={`m-${key++}`}
        className="rounded bg-brand-purple/20 px-0.5 text-foreground"
      >
        {text.slice(idx, idx + q.length)}
      </mark>
    );
    lastIdx = idx + q.length;
    idx = lower.indexOf(q, lastIdx);
  }
  parts.push(text.slice(lastIdx));
  return <>{parts}</>;
}

type ToolResult = {
  type: 'tool';
  tool: Tool;
  score: number;
};

type CategoryResult = {
  type: 'category';
  category: Category;
  score: number;
};

type SearchResult = ToolResult | CategoryResult;

export function SearchCommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [activeIdx, setActiveIdx] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { searches, addSearch, clearSearches } = useRecentSearches();

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  React.useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const results = React.useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const syns = getSynonyms(query);
    const out: SearchResult[] = [];

    for (const t of tools) {
      const name = t.name.toLowerCase();
      const desc = t.description.toLowerCase();
      const cat = t.category.toLowerCase();
      let score = 0;
      if (name === q) score = 100;
      else if (name.startsWith(q)) score = 80;
      else if (name.includes(q)) score = 60;
      else if (desc.includes(q)) score = 40;
      else if (cat.includes(q)) score = 30;
      else if (syns.some((s) => name.includes(s) || desc.includes(s))) score = 20;
      if (score > 0) out.push({ type: 'tool', tool: t, score });
    }

    for (const c of categories) {
      const name = c.name.toLowerCase();
      const desc = c.description.toLowerCase();
      let score = 0;
      if (name.includes(q)) score = 50;
      else if (desc.includes(q)) score = 25;
      else if (syns.some((s) => name.includes(s))) score = 15;
      if (score > 0) out.push({ type: 'category', category: c, score });
    }

    out.sort((a, b) => b.score - a.score);
    return out.slice(0, 10);
  }, [query]);

  React.useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  function navigateTo(result: SearchResult) {
    addSearch(query || (result.type === 'tool' ? result.tool.name : result.category.name));
    if (result.type === 'tool') {
      router.push(`/tools/${result.tool.slug}`);
    } else {
      router.push(`/categories?cat=${result.category.slug}`);
    }
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results.length > 0) navigateTo(results[activeIdx]);
    }
  }

  const showSuggestions = !query.trim();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-xl border border-border/60 bg-background/40 px-3 py-2 text-sm text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground md:flex"
        aria-label="Open search"
      >
        <Search className="h-4 w-4" />
        <span>Search tools…</span>
        <kbd className="ml-4 rounded border border-border/60 bg-muted px-1.5 py-0.5 text-xs font-mono">
          ⌘K
        </kbd>
      </button>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-background/60 p-4 pt-[8vh] backdrop-blur-sm animate-fade-in"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Search tools"
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-border/60 bg-popover shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3.5">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search tools, categories…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Search query"
                aria-controls="search-results"
                aria-expanded="true"
                role="combobox"
                aria-autocomplete="list"
              />
              {query ? (
                <button
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Close search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div
              id="search-results"
              className="max-h-[55vh] overflow-y-auto p-2 scrollbar-thin"
              role="listbox"
            >
              {showSuggestions ? (
                <div className="space-y-5 p-3">
                  {searches.length > 0 && (
                    <div>
                      <div className="mb-2.5 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          <Clock className="h-3 w-3" /> Recent
                        </span>
                        <button
                          onClick={clearSearches}
                          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {searches.map((s) => (
                          <button
                            key={s}
                            onClick={() => setQuery(s)}
                            className="rounded-full border border-border/60 bg-background/40 px-3 py-1.5 text-xs transition-all hover:scale-105 hover:border-brand-purple/40 hover:text-foreground"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <span className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <TrendingUp className="h-3 w-3" /> Popular searches
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_QUERIES.map((s) => (
                        <button
                          key={s}
                          onClick={() => setQuery(s)}
                          className="rounded-full border border-border/60 bg-background/40 px-3 py-1.5 text-xs transition-all hover:scale-105 hover:border-brand-purple/40 hover:text-foreground"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="px-4 py-12 text-center animate-fade-in">
                  <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    No tools found for &ldquo;{query}&rdquo;
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {results.map((result, i) => {
                    const isActive = activeIdx === i;
                    if (result.type === 'category') {
                      const cat = result.category;
                      const CatIcon = cat.icon;
                      return (
                        <button
                          key={`cat-${cat.slug}`}
                          role="option"
                          aria-selected={isActive}
                          onClick={() => navigateTo(result)}
                          onMouseEnter={() => setActiveIdx(i)}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200',
                            isActive ? 'bg-muted scale-[1.01]' : 'hover:bg-muted/50'
                          )}
                        >
                          <div
                            className={cn(
                              'grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-white shadow-sm',
                              cat.gradient
                            )}
                          >
                            <CatIcon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium">
                              {highlight(cat.name, query)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {cat.count} tools
                            </p>
                          </div>
                          <Hash className="h-3 w-3 shrink-0 text-muted-foreground" />
                        </button>
                      );
                    }
                    const tool = result.tool;
                    const ToolIcon = tool.icon;
                    return (
                      <button
                        key={tool.slug}
                        role="option"
                        aria-selected={isActive}
                        onClick={() => navigateTo(result)}
                        onMouseEnter={() => setActiveIdx(i)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200',
                          isActive ? 'bg-muted scale-[1.01]' : 'hover:bg-muted/50'
                        )}
                      >
                        <div
                          className={cn(
                            'grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-white shadow-sm',
                            tool.gradient
                          )}
                        >
                          <ToolIcon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {highlight(tool.name, query)}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {highlight(tool.description, query)}
                          </p>
                        </div>
                        <span className="hidden shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground sm:inline">
                          {tool.category}
                        </span>
                        {isActive && (
                          <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-muted-foreground animate-fade-in" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border/60 px-4 py-2.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <Heart className="h-3 w-3" />
                ToolNest Search
              </span>
              <span className="flex items-center gap-3">
                <kbd className="rounded border border-border/60 bg-muted px-1.5 py-0.5">
                  ↑↓
                </kbd>
                navigate
                <kbd className="rounded border border-border/60 bg-muted px-1.5 py-0.5">
                  ↵
                </kbd>
                open
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
