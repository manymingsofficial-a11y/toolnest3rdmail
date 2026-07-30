'use client';

import * as React from 'react';
import { Check, ChevronLeft, ChevronRight, Copy, Flag, Share2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { tools } from '@/lib/data';
import type { Tool } from '@/lib/data';

export function ToolActions({ slug }: { slug: string }) {
  const [copied, setCopied] = React.useState(false);
  const [shared, setShared] = React.useState(false);

  const idx = tools.findIndex((t) => t.slug === slug);
  const prev = idx > 0 ? tools[idx - 1] : null;
  const next = idx < tools.length - 1 ? tools[idx + 1] : null;

  function handleCopyUrl() {
    const url = typeof window !== 'undefined' ? window.location.href : `https://toolnest.com/tools/${slug}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
  }

  function handleShare() {
    const url = typeof window !== 'undefined' ? window.location.href : `https://toolnest.com/tools/${slug}`;
    const tool = tools[idx];
    if (typeof navigator !== 'undefined' && (navigator as any).share) {
      (navigator as any).share({
        title: `${tool?.name} — ToolNest`,
        text: tool?.description,
        url,
      }).catch(() => {});
    } else {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          setShared(true);
          setTimeout(() => setShared(false), 2000);
        }).catch(() => {});
      }
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {/* Prev / Next */}
      <div className="flex items-center justify-between gap-4">
        {prev ? (
          <Button asChild variant="ghost" className="gap-1.5 rounded-xl px-3">
            <a href={`/tools/${prev.slug}`} className="flex items-center gap-1.5">
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{prev.name}</span>
              <span className="sm:hidden">Previous</span>
            </a>
          </Button>
        ) : (
          <div />
        )}
        {next ? (
          <Button asChild variant="ghost" className="gap-1.5 rounded-xl px-3">
            <a href={`/tools/${next.slug}`} className="flex items-center gap-1.5">
              <span className="hidden sm:inline">{next.name}</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </Button>
        ) : (
          <div />
        )}
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button
          onClick={handleCopyUrl}
          variant="outline"
          size="sm"
          className="rounded-xl"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy URL
            </>
          )}
        </Button>
        <Button
          onClick={handleShare}
          variant="outline"
          size="sm"
          className="rounded-xl"
        >
          {shared ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              Link copied!
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              Share
            </>
          )}
        </Button>
        <Button asChild variant="ghost" size="sm" className="rounded-xl">
          <a
            href={`https://github.com/toolnest/toolnest/issues/new?title=Issue%20with%20${slug}&body=Tool%20slug:%20${slug}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Flag className="h-4 w-4" />
            Report issue
          </a>
        </Button>
      </div>
    </div>
  );
}
