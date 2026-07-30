'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clock, Heart, Menu, Wrench, X} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { SearchCommandPalette } from '@/components/search-command-palette';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'All Tools' },
  { href: '/categories', label: 'Categories' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

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

        {/* Desktop nav */}
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
        </nav>

        <div className="flex items-center gap-2">
          <SearchCommandPalette />
          <Link
            href="/recent"
            className={cn(
              'grid h-9 w-9 place-items-center rounded-xl transition-colors',
              pathname === '/recent'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
            aria-label="Recently used tools"
          >
            <Clock className="h-5 w-5" />
          </Link>
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
        <nav
          className="glass mt-1 flex flex-col gap-1 rounded-2xl p-3"
          aria-label="Mobile navigation"
        >
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
          <Link
            href="/recent"
            className={cn(
              'flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
              pathname === '/recent'
                ? 'bg-gradient-brand text-white'
                : 'text-foreground/80 hover:bg-muted'
            )}
          >
            <Clock className="h-4 w-4" />
            Recent
          </Link>
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
