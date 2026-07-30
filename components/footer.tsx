import Link from 'next/link';
import { Github, Linkedin, Twitter, Wrench } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { categories, mostPopularTools, latestTools } from '@/lib/data';

const quickLinks = [
  { label: 'All Tools', href: '/tools' },
  { label: 'Categories', href: '/categories' },
  { label: 'Favorites', href: '/favorites' },
  { label: 'Recently Used', href: '/recent' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const socials = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-purple/60 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/30">
                <Wrench className="h-5 w-5" />
              </span>
              <span className="text-base tracking-tight">
                Tool<span className="text-gradient">Nest</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {categories.length} categories and {mostPopularTools.length * 45}+ free
              online tools — PDF, image, QR, developer, calculators and more.
              Fast, secure, and no registration required.
            </p>
            <form className="mt-6 flex gap-2" id="newsletter">
              <Input
                type="email"
                placeholder="you@company.com"
                aria-label="Email"
                className="rounded-xl"
              />
              <Button
                type="submit"
                className="shrink-0 rounded-xl bg-gradient-brand text-white"
              >
                Subscribe
              </Button>
            </form>
            <div className="mt-6 flex gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border/60 bg-background/40 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-foreground">
              Categories
            </h4>
            <ul className="mt-4 space-y-2.5">
              {categories.slice(0, 8).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories?cat=${cat.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular tools */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-foreground">
              Popular Tools
            </h4>
            <ul className="mt-4 space-y-2.5">
              {mostPopularTools.slice(0, 6).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links + Latest */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-foreground">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="mt-6 text-sm font-semibold tracking-wide text-foreground">
              Latest Tools
            </h4>
            <ul className="mt-4 space-y-2.5">
              {latestTools.slice(0, 4).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} ToolNest. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Built for everyone — free forever.
          </p>
        </div>
      </div>
    </footer>
  );
}
