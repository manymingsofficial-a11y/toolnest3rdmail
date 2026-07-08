'use client';

import * as React from 'react';

import { DevShell, CodeArea, CopyButton, DownloadButton } from '@/components/dev/dev-ui';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}

export function MetaTagGenerator() {
  const [title, setTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [keywords, setKeywords] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [canonical, setCanonical] = React.useState('');

  const output = React.useMemo(() => {
    const tags: string[] = [];
    if (title) tags.push(`<title>${title}</title>`);
    if (desc) tags.push(`<meta name="description" content="${desc}" />`);
    if (keywords) tags.push(`<meta name="keywords" content="${keywords}" />`);
    if (author) tags.push(`<meta name="author" content="${author}" />`);
    if (canonical) tags.push(`<link rel="canonical" href="${canonical}" />`);
    tags.push(`<meta name="robots" content="index, follow" />`);
    tags.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`);
    return tags.join('\n');
  }, [title, desc, keywords, author, canonical]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold text-muted-foreground">Page details</h3>
          <div className="mt-4 space-y-4">
            <Field label="Page title"><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My Awesome Page" className="rounded-xl" /></Field>
            <Field label="Description"><Textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="A brief description of the page…" className="rounded-xl" rows={3} /></Field>
            <Field label="Keywords (comma separated)"><Input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="tool, free, online" className="rounded-xl" /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Author"><Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name" className="rounded-xl" /></Field>
              <Field label="Canonical URL"><Input value={canonical} onChange={(e) => setCanonical(e.target.value)} placeholder="https://example.com/page" className="rounded-xl" /></Field>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-muted-foreground">Generated meta tags</h3>
          <div className="flex gap-2">
            <CopyButton text={output} />
            <DownloadButton text={output} filename="meta-tags.html" />
          </div>
        </div>
        <CodeArea value={output} minHeight={300} />
      </div>
    </div>
  );
}

export function OpenGraphGenerator() {
  const [title, setTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [image, setImage] = React.useState('');
  const [siteName, setSiteName] = React.useState('');
  const [type, setType] = React.useState('website');

  const output = React.useMemo(() => {
    const tags: string[] = [`<meta property="og:title" content="${title}" />`];
    if (desc) tags.push(`<meta property="og:description" content="${desc}" />`);
    if (url) tags.push(`<meta property="og:url" content="${url}" />`);
    if (image) tags.push(`<meta property="og:image" content="${image}" />`);
    if (siteName) tags.push(`<meta property="og:site_name" content="${siteName}" />`);
    tags.push(`<meta property="og:type" content="${type}" />`);
    return tags.join('\n');
  }, [title, desc, url, image, siteName, type]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold text-muted-foreground">Open Graph details</h3>
          <div className="mt-4 space-y-4">
            <Field label="Title"><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My Page Title" className="rounded-xl" /></Field>
            <Field label="Description"><Textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Page description…" className="rounded-xl" rows={2} /></Field>
            <Field label="URL"><Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/page" className="rounded-xl" /></Field>
            <Field label="Image URL"><Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/image.jpg" className="rounded-xl" /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Site name"><Input value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="MySite" className="rounded-xl" /></Field>
              <Field label="Type">
                <select value={type} onChange={(e) => setType(e.target.value)} className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-sm">
                  <option value="website">website</option>
                  <option value="article">article</option>
                  <option value="product">product</option>
                  <option value="profile">profile</option>
                </select>
              </Field>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-muted-foreground">Generated OG tags</h3>
          <div className="flex gap-2">
            <CopyButton text={output} />
            <DownloadButton text={output} filename="og-tags.html" />
          </div>
        </div>
        <CodeArea value={output} minHeight={300} />
      </div>
    </div>
  );
}

export function TwitterCardGenerator() {
  const [card, setCard] = React.useState('summary_large_image');
  const [title, setTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [image, setImage] = React.useState('');
  const [site, setSite] = React.useState('');

  const output = React.useMemo(() => {
    const tags: string[] = [`<meta name="twitter:card" content="${card}" />`];
    if (title) tags.push(`<meta name="twitter:title" content="${title}" />`);
    if (desc) tags.push(`<meta name="twitter:description" content="${desc}" />`);
    if (image) tags.push(`<meta name="twitter:image" content="${image}" />`);
    if (site) tags.push(`<meta name="twitter:site" content="${site}" />`);
    return tags.join('\n');
  }, [card, title, desc, image, site]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold text-muted-foreground">Twitter Card details</h3>
          <div className="mt-4 space-y-4">
            <Field label="Card type">
              <select value={card} onChange={(e) => setCard(e.target.value)} className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-sm">
                <option value="summary">summary</option>
                <option value="summary_large_image">summary_large_image</option>
                <option value="player">player</option>
                <option value="app">app</option>
              </select>
            </Field>
            <Field label="Title"><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Card title" className="rounded-xl" /></Field>
            <Field label="Description"><Textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Card description…" className="rounded-xl" rows={2} /></Field>
            <Field label="Image URL"><Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/image.jpg" className="rounded-xl" /></Field>
            <Field label="Site (@username)"><Input value={site} onChange={(e) => setSite(e.target.value)} placeholder="@yoursite" className="rounded-xl" /></Field>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-muted-foreground">Generated Twitter tags</h3>
          <div className="flex gap-2">
            <CopyButton text={output} />
            <DownloadButton text={output} filename="twitter-card.html" />
          </div>
        </div>
        <CodeArea value={output} minHeight={300} />
      </div>
    </div>
  );
}

export function RobotsTxtGenerator() {
  const [userAgent, setUserAgent] = React.useState('*');
  const [disallow, setDisallow] = React.useState('');
  const [allow, setAllow] = React.useState('');
  const [sitemap, setSitemap] = React.useState('');
  const [crawlDelay, setCrawlDelay] = React.useState('');

  const output = React.useMemo(() => {
    const lines: string[] = [`User-agent: ${userAgent}`];
    if (allow) allow.split('\n').filter(Boolean).forEach((p) => lines.push(`Allow: ${p}`));
    if (disallow) disallow.split('\n').filter(Boolean).forEach((p) => lines.push(`Disallow: ${p}`));
    if (crawlDelay) lines.push(`Crawl-delay: ${crawlDelay}`);
    if (sitemap) lines.push(`\nSitemap: ${sitemap}`);
    return lines.join('\n');
  }, [userAgent, disallow, allow, sitemap, crawlDelay]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold text-muted-foreground">Robots.txt settings</h3>
          <div className="mt-4 space-y-4">
            <Field label="User-agent"><Input value={userAgent} onChange={(e) => setUserAgent(e.target.value)} placeholder="*" className="rounded-xl" /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Allow paths (one per line)"><Textarea value={allow} onChange={(e) => setAllow(e.target.value)} placeholder="/public/" className="rounded-xl" rows={3} /></Field>
              <Field label="Disallow paths (one per line)"><Textarea value={disallow} onChange={(e) => setDisallow(e.target.value)} placeholder="/admin/" className="rounded-xl" rows={3} /></Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Crawl delay (seconds)"><Input value={crawlDelay} onChange={(e) => setCrawlDelay(e.target.value)} placeholder="10" className="rounded-xl" /></Field>
              <Field label="Sitemap URL"><Input value={sitemap} onChange={(e) => setSitemap(e.target.value)} placeholder="https://example.com/sitemap.xml" className="rounded-xl" /></Field>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-muted-foreground">Generated robots.txt</h3>
          <div className="flex gap-2">
            <CopyButton text={output} />
            <DownloadButton text={output} filename="robots.txt" />
          </div>
        </div>
        <CodeArea value={output} minHeight={300} />
      </div>
    </div>
  );
}

export function SitemapGenerator() {
  const [urls, setUrls] = React.useState('');
  const [domain, setDomain] = React.useState('https://example.com');

  const output = React.useMemo(() => {
    const list = urls.split('\n').filter(Boolean).map((u) => u.trim());
    const today = new Date().toISOString().slice(0, 10);
    const entries = list.map((u) => {
      const fullUrl = u.startsWith('http') ? u : `${domain.replace(/\/$/, '')}/${u.replace(/^\//, '')}`;
      return `  <url>\n    <loc>${fullUrl}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
    });
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>`;
  }, [urls, domain]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="rounded-2xl glass-card p-6">
          <h3 className="text-sm font-semibold text-muted-foreground">Sitemap settings</h3>
          <div className="mt-4 space-y-4">
            <Field label="Domain"><Input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="https://example.com" className="rounded-xl" /></Field>
            <Field label="URLs (one per line)"><Textarea value={urls} onChange={(e) => setUrls(e.target.value)} placeholder="/&#10;/about&#10;/contact" className="rounded-xl font-mono text-sm" rows={8} /></Field>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-muted-foreground">Generated sitemap.xml</h3>
          <div className="flex gap-2">
            <CopyButton text={output} />
            <DownloadButton text={output} filename="sitemap.xml" />
          </div>
        </div>
        <CodeArea value={output} minHeight={300} />
      </div>
    </div>
  );
}
