'use client';

import * as React from 'react';
import { Eye, AlertCircle, CheckCircle2, XCircle, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type MetaTag = {
  property: string;
  value: string | null;
  found: boolean;
};

type ParsedMeta = {
  ogTitle: MetaTag;
  ogDescription: MetaTag;
  ogImage: MetaTag;
  ogUrl: MetaTag;
  ogType: MetaTag;
  ogSiteName: MetaTag;
  twitterCard: MetaTag;
  twitterTitle: MetaTag;
  twitterDescription: MetaTag;
  twitterImage: MetaTag;
};

const EMPTY_META: ParsedMeta = {
  ogTitle: { property: 'og:title', value: null, found: false },
  ogDescription: { property: 'og:description', value: null, found: false },
  ogImage: { property: 'og:image', value: null, found: false },
  ogUrl: { property: 'og:url', value: null, found: false },
  ogType: { property: 'og:type', value: null, found: false },
  ogSiteName: { property: 'og:site_name', value: null, found: false },
  twitterCard: { property: 'twitter:card', value: null, found: false },
  twitterTitle: { property: 'twitter:title', value: null, found: false },
  twitterDescription: { property: 'twitter:description', value: null, found: false },
  twitterImage: { property: 'twitter:image', value: null, found: false },
};

function parseHtml(html: string): ParsedMeta {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  function getMeta(attr: string, name: string): string | null {
    const el = doc.querySelector(`meta[${attr}="${name}"]`);
    return el?.getAttribute('content') ?? null;
  }

  return {
    ogTitle: { property: 'og:title', value: getMeta('property', 'og:title'), found: !!getMeta('property', 'og:title') },
    ogDescription: { property: 'og:description', value: getMeta('property', 'og:description'), found: !!getMeta('property', 'og:description') },
    ogImage: { property: 'og:image', value: getMeta('property', 'og:image'), found: !!getMeta('property', 'og:image') },
    ogUrl: { property: 'og:url', value: getMeta('property', 'og:url'), found: !!getMeta('property', 'og:url') },
    ogType: { property: 'og:type', value: getMeta('property', 'og:type'), found: !!getMeta('property', 'og:type') },
    ogSiteName: { property: 'og:site_name', value: getMeta('property', 'og:site_name'), found: !!getMeta('property', 'og:site_name') },
    twitterCard: { property: 'twitter:card', value: getMeta('name', 'twitter:card'), found: !!getMeta('name', 'twitter:card') },
    twitterTitle: { property: 'twitter:title', value: getMeta('name', 'twitter:title'), found: !!getMeta('name', 'twitter:title') },
    twitterDescription: { property: 'twitter:description', value: getMeta('name', 'twitter:description'), found: !!getMeta('name', 'twitter:description') },
    twitterImage: { property: 'twitter:image', value: getMeta('name', 'twitter:image'), found: !!getMeta('name', 'twitter:image') },
  };
}

export function OgPreview() {
  const [htmlInput, setHtmlInput] = React.useState('');
  const [parsed, setParsed] = React.useState<ParsedMeta | null>(null);
  const [urlInput, setUrlInput] = React.useState('');
  const [showUrlNotice, setShowUrlNotice] = React.useState(false);

  function handlePreview() {
    if (!htmlInput.trim()) {
      toast.error('Paste your page HTML to preview Open Graph tags');
      return;
    }

    const result = parseHtml(htmlInput);
    setParsed(result);
    setShowUrlNotice(false);

    const foundCount = Object.values(result).filter((t) => t.found).length;
    if (foundCount === 0) {
      toast.error('No Open Graph or Twitter Card meta tags found in the pasted HTML');
    } else {
      toast.success(`Found ${foundCount} meta tag${foundCount > 1 ? 's' : ''}`);
    }
  }

  function handleUrlCheck() {
    if (urlInput.trim()) {
      setShowUrlNotice(true);
    }
  }

  const allTags = parsed
    ? [
        parsed.ogTitle,
        parsed.ogDescription,
        parsed.ogImage,
        parsed.ogUrl,
        parsed.ogType,
        parsed.ogSiteName,
        parsed.twitterCard,
        parsed.twitterTitle,
        parsed.twitterDescription,
        parsed.twitterImage,
      ]
    : [];

  const foundCount = allTags.filter((t) => t.found).length;
  const missingCount = allTags.length - foundCount;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl glass-card p-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Paste your page HTML</Label>
          <p className="text-xs text-muted-foreground">
            Paste the <code className="rounded bg-muted px-1">&lt;head&gt;</code> section of your page
            (or the full HTML). The tool parses Open Graph and Twitter Card meta tags locally — no
            data is sent to a server.
          </p>
          <textarea
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            placeholder={'<head>\n  <meta property="og:title" content="Your Page Title" />\n  <meta property="og:description" content="Your page description" />\n  <meta property="og:image" content="https://example.com/image.jpg" />\n  ...\n</head>'}
            className="mt-2 w-full rounded-xl border border-border/60 bg-background/50 p-3 font-mono text-sm min-h-[160px] resize-y focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          />
        </div>

        <div className="mt-4">
          <Button
            onClick={handlePreview}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-600 hover:to-teal-700"
          >
            <Eye className="mr-1.5 h-4 w-4" />
            Preview Tags
          </Button>
        </div>

        <details className="mt-4 rounded-xl border border-border/60 bg-muted/20 p-3">
          <summary className="cursor-pointer text-sm font-medium text-muted-foreground">
            Have a URL instead of HTML?
          </summary>
          <div className="mt-3 space-y-2">
            <Input
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com"
              className="rounded-xl"
            />
            <Button onClick={handleUrlCheck} variant="outline" size="sm" className="rounded-xl">
              Check URL
            </Button>
            {showUrlNotice && (
              <div className="flex items-start gap-2 rounded-lg bg-amber-500/10 p-3 text-sm text-amber-600 dark:text-amber-400">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <p>
                  Browser JavaScript cannot fetch HTML from external URLs due to CORS (Cross-Origin
                  Resource Sharing) restrictions. To preview a page&apos;s Open Graph tags, either paste
                  its HTML above or use Facebook&apos;s{' '}
                  <a
                    href="https://developers.facebook.com/tools/debug/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Sharing Debugger
                  </a>{' '}
                  which fetches pages server-side.
                </p>
              </div>
            )}
          </div>
        </details>

        {parsed && (
          <div className="mt-6 space-y-6">
            {/* Social Preview Card */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Social Media Preview</Label>
              <div className="overflow-hidden rounded-xl border border-border/60 bg-white shadow-lg dark:bg-muted">
                {parsed.ogImage.found && parsed.ogImage.value ? (
                  <div className="relative aspect-[1.91/1] w-full bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={parsed.ogImage.value}
                      alt="Open Graph preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[1.91/1] w-full items-center justify-center bg-muted">
                    <div className="text-center text-muted-foreground">
                      <ImageIcon className="mx-auto h-8 w-8" />
                      <p className="mt-1 text-xs">No og:image found</p>
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <p className="text-xs uppercase text-muted-foreground">
                    {parsed.ogUrl.found && parsed.ogUrl.value
                      ? new URL(parsed.ogUrl.value).hostname
                      : parsed.ogSiteName.found && parsed.ogSiteName.value
                        ? parsed.ogSiteName.value
                        : 'your-domain.com'}
                  </p>
                  <p className="mt-1 line-clamp-2 font-semibold text-gray-900 dark:text-foreground">
                    {parsed.ogTitle.found && parsed.ogTitle.value
                      ? parsed.ogTitle.value
                      : 'No og:title found'}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {parsed.ogDescription.found && parsed.ogDescription.value
                      ? parsed.ogDescription.value
                      : 'No og:description found'}
                  </p>
                </div>
              </div>
            </div>

            {/* Tag Summary */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Label className="text-sm font-medium">Detected Tags</Label>
                <span className="flex items-center gap-1 text-sm text-green-500">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {foundCount} found
                </span>
                {missingCount > 0 && (
                  <span className="flex items-center gap-1 text-sm text-amber-500">
                    <XCircle className="h-3.5 w-3.5" />
                    {missingCount} missing
                  </span>
                )}
              </div>
              <div className="space-y-1">
                {allTags.map((tag) => (
                  <div
                    key={tag.property}
                    className={`flex items-start gap-3 rounded-lg px-3 py-2 text-sm ${
                      tag.found
                        ? 'bg-green-500/5 border border-green-500/20'
                        : 'bg-amber-500/5 border border-amber-500/20'
                    }`}
                  >
                    {tag.found ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                    )}
                    <div className="min-w-0 flex-1">
                      <span className="font-mono text-xs text-muted-foreground">
                        {tag.property}
                      </span>
                      {tag.found && tag.value && (
                        <p className="mt-0.5 break-all text-foreground">{tag.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Validation Messages */}
            {missingCount > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Recommendations</Label>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {!parsed.ogTitle.found && (
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-500" />
                      Add <code className="rounded bg-muted px-1">og:title</code> — the title shown
                      in social media link cards.
                    </li>
                  )}
                  {!parsed.ogDescription.found && (
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-500" />
                      Add <code className="rounded bg-muted px-1">og:description</code> — the
                      description text under the title in link previews.
                    </li>
                  )}
                  {!parsed.ogImage.found && (
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-500" />
                      Add <code className="rounded bg-muted px-1">og:image</code> — the preview
                      image. Recommended size: 1200x630 pixels.
                    </li>
                  )}
                  {!parsed.ogUrl.found && (
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-500" />
                      Add <code className="rounded bg-muted px-1">og:url</code> — the canonical URL
                      of the page.
                    </li>
                  )}
                  {!parsed.twitterCard.found && (
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-500" />
                      Add <code className="rounded bg-muted px-1">twitter:card</code> — set to{' '}
                      <code className="rounded bg-muted px-1">summary_large_image</code> for large
                      image previews on Twitter/X.
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
