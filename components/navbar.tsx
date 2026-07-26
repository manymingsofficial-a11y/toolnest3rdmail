'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Heart, Menu, Wrench, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { SearchCommandPalette } from '@/components/search-command-palette';
import { categories, getToolsByCategory } from '@/lib/data';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'All Tools' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [mobileExpanded, setMobileExpanded] = React.useState<string | null>(null);
  const [hoveredCat, setHoveredCat] = React.useState<string | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  function handleCatEnter(slug: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHoveredCat(slug);
  }

  function handleCatLeave() {
    closeTimer.current = setTimeout(() => setHoveredCat(null), 150);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 lg:px-8',
          scrolled && 'h-14'
        )}
      >
        <div
          className={cn(
            'absolute inset-x-3 top-2 -z-10 h-[calc(100%-1rem)] rounded-2xl transition-all duration-300 sm:inset-x-4',
            scrolled
              ? 'glass shadow-lg shadow-foreground/5'
              : 'border border-transparent bg-transparent'
          )}
        />

        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/30">
            <Wrench className="h-5 w-5" />
          </span>
          <span className="text-base tracking-tight">
            Tool<span className="text-gradient">Nest</span>
          </span>
        </Link>

        {/* Desktop nav with mega dropdown */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {active && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-gradient-brand opacity-10" />
                )}
                {link.label}
              </Link>
            );
          })}

          {/* Categories dropdown trigger */}
          <div
            className="relative"
            onMouseEnter={() => handleCatEnter('__root')}
            onMouseLeave={handleCatLeave}
          >
            <button
              className={cn(
                'flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                hoveredCat === '__root' || pathname.startsWith('/categories')
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              aria-expanded={hoveredCat === '__root'}
              aria-haspopup="true"
            >
              Categories
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 transition-transform duration-200',
                  hoveredCat === '__root' && 'rotate-180'
                )}
              />
            </button>

            {/* Mega dropdown */}
            {hoveredCat === '__root' && (
              <div
                className="absolute left-1/2 top-full z-50 w-[680px] -translate-x-1/2 pt-2"
                onMouseEnter={() => handleCatEnter('__root')}
                onMouseLeave={handleCatLeave}
              >
                <div className="glass rounded-2xl border border-border/60 p-2 shadow-2xl animate-fade-in-scale">
                  <div className="grid grid-cols-2 gap-1">
                    {categories.map((cat) => {
                      const catTools = getToolsByCategory(cat.name);
                      const CatIcon = cat.icon;
                      return (
                        <div
                          key={cat.slug}
                          className="group/cat rounded-xl p-2 transition-colors hover:bg-muted/50"
                          onMouseEnter={() => handleCatEnter(cat.slug)}
                          onMouseLeave={handleCatLeave}
                        >
                          <Link
                            href={`/categories/${cat.slug}`}
                            className="flex items-center gap-2.5 px-2 py-1.5"
                          >
                            <span
                              className={cn(
                                'grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br text-white shadow-sm',
                                cat.gradient
                              )}
                            >
                              <CatIcon className="h-4 w-4" />
                            </span>
                            <span className="text-sm font-semibold tracking-tight">
                              {cat.name}
                            </span>
                            <span className="ml-auto text-xs text-muted-foreground">
                              {catTools.length}
                            </span>
                          </Link>
                          {/* Tool list under each category */}
                          <div
                            className={cn(
                              'mt-1 grid transition-all duration-200',
                              hoveredCat === cat.slug
                                ? 'grid-rows-[1fr] opacity-100'
                                : 'grid-rows-[0fr] opacity-0'
                            )}
                          >
                            <div className="overflow-hidden">
                              <div className="flex flex-wrap gap-1 px-2 pb-1">
                                {catTools.map((t) => (
                                  <Link
                                    key={t.slug}
                                    href={`/tools/${t.slug}`}
                                    className="rounded-md border border-border/40 bg-background/40 px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground hover:border-brand-purple/40"
                                  >
                                    {t.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <SearchCommandPalette />
          <Link
            href="/favorites"
            className={cn(
              'grid h-9 w-9 place-items-center rounded-xl transition-colors',
              pathname === '/favorites'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
            aria-label="Favorites"
          >
            <Heart className="h-5 w-5" />
          </Link>
          <ThemeToggle />
          <Button
            asChild
            className="hidden bg-gradient-brand text-white shadow-lg shadow-brand-purple/25 transition-transform duration-300 hover:scale-105 sm:inline-flex"
          >
            <Link href="/tools">All Tools</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'mx-auto max-w-7xl overflow-hidden px-4 transition-all duration-300 md:hidden',
          open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="glass mt-1 flex flex-col gap-1 rounded-2xl p-3" aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-gradient-brand text-white'
                    : 'text-foreground/80 hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Mobile categories accordion */}
          <div className="rounded-xl border border-border/40">
            <button
              onClick={() =>
                setMobileExpanded((p) => (p === '__cats' ? null : '__cats'))
              }
              className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted"
              aria-expanded={mobileExpanded === '__cats'}
            >
              Categories
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  mobileExpanded === '__cats' && 'rotate-180'
                )}
              />
            </button>
            <div
              className={cn(
                'grid transition-all duration-200',
                mobileExpanded === '__cats'
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col gap-1 px-2 pb-2">
                  {categories.map((cat) => {
                    const catTools = getToolsByCategory(cat.name);
                    const CatIcon = cat.icon;
                    const isExp = mobileExpanded === cat.slug;
                    return (
                      <div key={cat.slug} className="rounded-lg">
                        <button
                          onClick={() =>
                            setMobileExpanded((p) => (p === cat.slug ? null : cat.slug))
                          }
                          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
                          aria-expanded={isExp}
                        >
                          <span
                            className={cn(
                              'grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br text-white',
                              cat.gradient
                            )}
                          >
                            <CatIcon className="h-3.5 w-3.5" />
                          </span>
                          <span className="font-medium">{cat.name}</span>
                          <span className="ml-auto text-xs text-muted-foreground">
                            {catTools.length}
                          </span>
                          <ChevronDown
                            className={cn(
                              'h-3.5 w-3.5 transition-transform duration-200',
                              isExp && 'rotate-180'
                            )}
                          />
                        </button>
                        <div
                          className={cn(
                            'grid transition-all duration-200',
                            isExp ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                          )}
                        >
                          <div className="overflow-hidden">
                            <div className="flex flex-col gap-0.5 px-3 pb-1">
                              {catTools.map((t) => (
                                <Link
                                  key={t.slug}
                                  href={`/tools/${t.slug}`}
                                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                >
                                  {t.name}
                                </Link>
                              ))}
                              {catTools.length === 0 && (
                                <span className="px-3 py-2 text-xs text-muted-foreground">
                                  Coming soon
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/favorites"
            className={cn(
              'flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
              pathname === '/favorites'
                ? 'bg-gradient-brand text-white'
                : 'text-foreground/80 hover:bg-muted'
            )}
          >
            <Heart className="h-4 w-4" />
            Favorites
          </Link>
          <Button asChild className="mt-1 bg-gradient-brand text-white">
            <Link href="/tools">All Tools</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
