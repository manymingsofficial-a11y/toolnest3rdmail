'use client';

import * as React from 'react';
import { ArrowRight, Search, Sparkles, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SearchCommandPalette } from '@/components/search-command-palette';

const quickAccess = [
  'QR Code',
  'Image Compressor',
  'PDF Merge',
  'Password Generator',
  'Loan EMI',
];

export function Hero() {
  const [openSearch, setOpenSearch] = React.useState(false);

  return (
    <section className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="absolute left-1/2 top-[-10%] h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-brand-blue/30 blur-[120px] animate-pulse-glow dark:bg-brand-blue/20" />
        <div className="absolute right-[5%] top-[20%] h-[320px] w-[320px] rounded-full bg-brand-purple/30 blur-[120px] animate-pulse-glow dark:bg-brand-purple/20" />
        <div className="absolute bottom-[10%] left-[10%] h-[280px] w-[280px] rounded-full bg-brand-blue/20 blur-[100px] animate-pulse-glow dark:bg-brand-blue/10" />
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <div className="mx-auto inline-flex animate-fade-in items-center gap-2 rounded-full border border-border/60 bg-background/40 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-brand-purple" />
          <span>500+ free online tools — no registration required</span>
        </div>

        <h1 className="mt-8 animate-fade-in text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl sm:leading-[1.02]">
          Every free tool you need,
          <br className="hidden sm:block" />{' '}
          <span className="text-gradient">in one nest</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl animate-fade-in text-base leading-relaxed text-muted-foreground sm:text-lg">
          ToolNest brings together PDF, image, QR & barcode, SEO, AI, text,
          developer, calculators and converters — fast, secure, and completely
          free. Search and launch any tool in seconds.
        </p>

        <button
          onClick={() => setOpenSearch(true)}
          className="mx-auto mt-10 flex w-full max-w-xl animate-fade-in items-center gap-3 rounded-2xl glass p-2 text-left shadow-lg shadow-foreground/5 transition-all hover:glow"
          aria-label="Search 500+ free tools"
        >
          <div className="grid flex-1 place-items-center pl-3 text-muted-foreground">
            <Search className="h-5 w-5" />
          </div>
          <span className="h-11 flex-1 bg-transparent text-sm text-muted-foreground">
            Search 500+ free tools…
          </span>
          <kbd className="mr-1 hidden rounded-lg border border-border/60 bg-muted px-2 py-1 text-xs font-mono sm:block">
            ⌘K
          </kbd>
        </button>

        <div className="mt-6 flex animate-fade-in flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-brand-blue" />
            Quick access:
          </span>
          {quickAccess.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/60 bg-background/40 px-3 py-1 backdrop-blur-md transition-colors hover:text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-10 flex animate-fade-in flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="group rounded-xl bg-gradient-brand text-white shadow-lg shadow-brand-purple/25 transition-transform duration-300 hover:scale-105"
          >
            <a href="#featured">
              Browse all tools
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-xl border-border/60 bg-background/40 backdrop-blur-md"
          >
            <a href="#categories">Explore categories</a>
          </Button>
        </div>
      </div>

      {openSearch && <SearchTrigger onClose={() => setOpenSearch(false)} />}
    </section>
  );
}

function SearchTrigger({ onClose }: { onClose: () => void }) {
  React.useEffect(() => {
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      bubbles: true,
    });
    window.dispatchEvent(event);
    onClose();
  }, [onClose]);
  return null;
}
