import Link from 'next/link';
import { Github, Linkedin, Twitter, Wrench } from 'lucide-react';

import { Newsletter } from '@/components/ads/newsletter';
import type { Category, Tool } from '@/lib/data';

const quickLinks = [
  { label: 'All Tools', href: '/tools' },
  { label: 'Categories', href: '/categories' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms' },
];

const defaultSocials: { icon: typeof Twitter; label: string; href: string }[] = [];

export function Footer({
  categories = [],
  popularTools = [],
  latestTools = [],
  allTools = [],
  siteName = 'ToolNest',
  footerText = 'Built for everyone — free forever.',
  socialLinks,
}: {
  categories?: Category[];
  popularTools?: Tool[];
  latestTools?: Tool[];
  allTools?: Tool[];
  siteName?: string;
  footerText?: string;
  socialLinks?: {
    twitter: string;
    github: string;
    linkedin: string;
    instagram: string;
  };
}) {
  const socials = socialLinks
    ? [
        { icon: Twitter, label: 'Twitter', href: socialLinks.twitter || '#' },
        { icon: Github, label: 'GitHub', href: socialLinks.github || '#' },
        { icon: Linkedin, label: 'LinkedIn', href: socialLinks.linkedin || '#' },
      ].filter((s) => s.href !== '#')
    : defaultSocials;

  const toolCount = allTools.length > 0 ? allTools.length : popularTools.length > 0 ? popularTools.length : 0;
  const displayName = siteName;
  const brandParts = displayName.includes('Nest')
    ? { before: displayName.split('Nest')[0], after: 'Nest' }
    : { before: displayName, after: '' };

  return (
    <footer className="relative mt-24 border-t border-border/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-purple/60 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/30">
                <Wrench className="h-5 w-5" />
              </span>
              <span className="text-base tracking-tight">
                {brandParts.before}
                {brandParts.after && <span className="text-gradient">{brandParts.after}</span>}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {categories.length} categories and {toolCount > 0 ? `${toolCount}+ ` : ''}free online tools — PDF, image, QR, developer, calculators and more. Fast, secure, and no registration required.
            </p>
            <div className="mt-6">
              <Newsletter variant="inline" title="Newsletter" description="New tools and updates." />
            </div>
            {socials.length > 0 && (
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
            )}
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
              {popularTools.slice(0, 6).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
              {popularTools.length === 0 && (
                <li>
                  <Link
                    href="/tools"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Browse all tools
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Quick links */}
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
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <p className="text-center sm:text-right">
            {footerText}
          </p>
        </div>
      </div>
    </footer>
  );
}
