import Link from 'next/link';
import { Wrench } from 'lucide-react';

import { Newsletter } from '@/components/ads/newsletter';
import type { Category, Tool } from '@/lib/data';

const toolLinks = [
  { label: 'All Tools', href: '/tools' },
  { label: 'Categories', href: '/categories' },
  { label: 'Popular Tools', href: '/tools' },
  { label: 'Favorites', href: '/favorites' },
  { label: 'Recently Used', href: '/recent' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
];

export function Footer({
  categories = [],
  popularTools = [],
  latestTools = [],
  siteName = 'ToolNest',
  footerText = 'Built for everyone — free forever.',
}: {
  categories?: Category[];
  popularTools?: Tool[];
  latestTools?: Tool[];
  siteName?: string;
  footerText?: string;
  socialLinks?: {
    twitter: string;
    github: string;
    linkedin: string;
    instagram: string;
  };
}) {
  const brandParts = siteName.includes('Nest')
    ? { before: siteName.split('Nest')[0], after: 'Nest' }
    : { before: siteName, after: '' };

  return (
    <footer className="relative mt-24 border-t border-border/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-purple/60 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand + description + newsletter */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/30">
                <Wrench className="h-5 w-5" />
              </span>
              <span className="text-base tracking-tight">
                {brandParts.before}
                {brandParts.after && (
                  <span className="text-gradient">{brandParts.after}</span>
                )}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              ToolNest is a free collection of online tools for everyday
              digital tasks &mdash; PDF, image, QR &amp; barcode, SEO, AI,
              text, developer, calculators, and converters. Fast, secure, and
              no registration required.
            </p>
            <div className="mt-6">
              <Newsletter
                variant="inline"
                title="Newsletter"
                description="New tools and updates."
              />
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-foreground">
              Tools
            </h4>
            <ul className="mt-4 space-y-2.5">
              {toolLinks.map((link) => (
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
            {popularTools.length > 0 && (
              <ul className="mt-4 space-y-2.5">
                {popularTools.slice(0, 3).map((tool) => (
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
            )}
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-foreground">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
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
            {latestTools.length > 0 && (
              <>
                <h4 className="mt-6 text-sm font-semibold tracking-wide text-foreground">
                  Latest Tools
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {latestTools.slice(0, 3).map((tool) => (
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
              </>
            )}
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-foreground">
              Legal
            </h4>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((link) => (
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
            {categories.length > 0 && (
              <>
                <h4 className="mt-6 text-sm font-semibold tracking-wide text-foreground">
                  Top Categories
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {categories.slice(0, 5).map((cat) => (
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
              </>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© 2026 {siteName}. All rights reserved.</p>
          <p className="text-center sm:text-right">{footerText}</p>
        </div>
      </div>
    </footer>
  );
}
