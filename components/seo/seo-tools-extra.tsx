'use client';

import * as React from 'react';
import { Copy, Check, Globe, Braces, FileText, ListTree, Package, Bot, FileSearch, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        });
      }}
      variant="outline"
      size="sm"
      className="rounded-xl"
      disabled={!text}
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      {copied ? 'Copied' : label}
    </Button>
  );
}

function ToolCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl glass-card p-6">
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">{title}</h3>
        <div className="mt-4 space-y-4">{children}</div>
      </div>
    </div>
  );
}

type HreflangEntry = { lang: string; url: string };

export function HreflangGenerator() {
  const [entries, setEntries] = React.useState<HreflangEntry[]>([
    { lang: 'en', url: 'https://example.com/' },
    { lang: 'es', url: 'https://example.com/es/' },
  ]);
  const [output, setOutput] = React.useState('');

  React.useEffect(() => {
    const tags = entries
      .filter((e) => e.lang && e.url)
      .map((e) => `<link rel="alternate" hreflang="${e.lang}" href="${e.url}" />`)
      .join('\n');
    const xdefault = '<link rel="alternate" hreflang="x-default" href="' + (entries[0]?.url ?? '') + '" />';
    setOutput(tags + (tags ? '\n' : '') + xdefault);
  }, [entries]);

  function update(i: number, field: keyof HreflangEntry, value: string) {
    setEntries((prev) => prev.map((e, idx) => (idx === i ? { ...e, [field]: value } : e)));
  }
  function addRow() {
    setEntries((prev) => [...prev, { lang: '', url: '' }]);
  }
  function removeRow(i: number) {
    setEntries((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <ToolCard title="Hreflang Generator">
      <div className="space-y-2">
        {entries.map((e, i) => (
          <div key={i} className="flex gap-2">
            <Input value={e.lang} onChange={(ev) => update(i, 'lang', ev.target.value)} placeholder="en" className="rounded-xl w-24" />
            <Input value={e.url} onChange={(ev) => update(i, 'url', ev.target.value)} placeholder="https://example.com/" className="rounded-xl flex-1" />
            <Button variant="outline" size="sm" className="rounded-xl" onClick={() => removeRow(i)}>Remove</Button>
          </div>
        ))}
        <Button variant="outline" size="sm" className="rounded-xl" onClick={addRow}>Add Row</Button>
      </div>
      {output && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Hreflang Tags</Label>
          <Textarea value={output} readOnly className="min-h-[100px] rounded-xl font-mono text-sm" />
          <CopyButton text={output} />
        </div>
      )}
    </ToolCard>
  );
}

export function SchemaMarkupGenerator() {
  const [type, setType] = React.useState<'Article' | 'Product' | 'FAQPage' | 'BreadcrumbList' | 'WebSite'>('Article');
  const [output, setOutput] = React.useState('');

  const schemas: Record<string, () => object> = {
    Article: () => ({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Article Title',
      author: { '@type': 'Person', name: 'Author Name' },
      datePublished: new Date().toISOString().slice(0, 10),
      image: 'https://example.com/image.jpg',
    }),
    Product: () => ({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Product Name',
      description: 'Product description',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    }),
    FAQPage: () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Question 1?', acceptedAnswer: { '@type': 'Answer', text: 'Answer 1' } },
      ],
    }),
    BreadcrumbList: () => ({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://example.com/' },
      ],
    }),
    WebSite: () => ({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Website Name',
      url: 'https://example.com/',
    }),
  };

  React.useEffect(() => {
    setOutput(JSON.stringify(schemas[type](), null, 2));
  }, [type]);

  return (
    <ToolCard title="Schema Markup Generator">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Schema Type</Label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as typeof type)}
          className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-sm"
        >
          <option value="Article">Article</option>
          <option value="Product">Product</option>
          <option value="FAQPage">FAQ Page</option>
          <option value="BreadcrumbList">Breadcrumb</option>
          <option value="WebSite">Website</option>
        </select>
      </div>
      {output && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">JSON-LD Output</Label>
          <Textarea value={output} readOnly className="min-h-[200px] rounded-xl font-mono text-sm" />
          <CopyButton text={output} />
        </div>
      )}
    </ToolCard>
  );
}

export function FaqSchemaGenerator() {
  const [faqs, setFaqs] = React.useState([{ q: '', a: '' }]);
  const [output, setOutput] = React.useState('');

  React.useEffect(() => {
    const valid = faqs.filter((f) => f.q && f.a);
    if (valid.length === 0) {
      setOutput('');
      return;
    }
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: valid.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };
    setOutput(JSON.stringify(schema, null, 2));
  }, [faqs]);

  function update(i: number, field: 'q' | 'a', value: string) {
    setFaqs((prev) => prev.map((f, idx) => (idx === i ? { ...f, [field]: value } : f)));
  }
  function addRow() {
    setFaqs((prev) => [...prev, { q: '', a: '' }]);
  }
  function removeRow(i: number) {
    setFaqs((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <ToolCard title="FAQ Schema Generator">
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="space-y-2 rounded-xl border border-border/60 p-3">
            <Input value={f.q} onChange={(e) => update(i, 'q', e.target.value)} placeholder="Question" className="rounded-xl" />
            <Textarea value={f.a} onChange={(e) => update(i, 'a', e.target.value)} placeholder="Answer" className="rounded-xl text-sm" />
            <Button variant="outline" size="sm" className="rounded-xl" onClick={() => removeRow(i)}>Remove</Button>
          </div>
        ))}
        <Button variant="outline" size="sm" className="rounded-xl" onClick={addRow}>Add FAQ</Button>
      </div>
      {output && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">FAQ Schema (JSON-LD)</Label>
          <Textarea value={output} readOnly className="min-h-[150px] rounded-xl font-mono text-sm" />
          <CopyButton text={output} />
        </div>
      )}
    </ToolCard>
  );
}

export function BreadcrumbSchemaGenerator() {
  const [items, setItems] = React.useState([
    { name: 'Home', url: 'https://example.com/' },
    { name: 'Category', url: 'https://example.com/category/' },
  ]);
  const [output, setOutput] = React.useState('');

  React.useEffect(() => {
    const valid = items.filter((i) => i.name && i.url);
    if (valid.length === 0) {
      setOutput('');
      return;
    }
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: valid.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    };
    setOutput(JSON.stringify(schema, null, 2));
  }, [items]);

  function update(i: number, field: 'name' | 'url', value: string) {
    setItems((prev) => prev.map((item, idx) => (idx === i ? { ...item, [field]: value } : item)));
  }
  function addRow() {
    setItems((prev) => [...prev, { name: '', url: '' }]);
  }
  function removeRow(i: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <ToolCard title="Breadcrumb Schema Generator">
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <Input value={item.name} onChange={(e) => update(i, 'name', e.target.value)} placeholder="Page name" className="rounded-xl w-32" />
            <Input value={item.url} onChange={(e) => update(i, 'url', e.target.value)} placeholder="https://example.com/" className="rounded-xl flex-1" />
            <Button variant="outline" size="sm" className="rounded-xl" onClick={() => removeRow(i)}>Remove</Button>
          </div>
        ))}
        <Button variant="outline" size="sm" className="rounded-xl" onClick={addRow}>Add Item</Button>
      </div>
      {output && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Breadcrumb Schema (JSON-LD)</Label>
          <Textarea value={output} readOnly className="min-h-[150px] rounded-xl font-mono text-sm" />
          <CopyButton text={output} />
        </div>
      )}
    </ToolCard>
  );
}

export function ArticleSchemaGenerator() {
  const [data, setData] = React.useState({
    headline: '',
    author: '',
    datePublished: new Date().toISOString().slice(0, 10),
    image: '',
    url: '',
  });
  const [output, setOutput] = React.useState('');

  React.useEffect(() => {
    if (!data.headline) {
      setOutput('');
      return;
    }
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.headline,
      author: { '@type': 'Person', name: data.author },
      datePublished: data.datePublished,
      ...(data.image && { image: data.image }),
      ...(data.url && { mainEntityOfPage: { '@type': 'WebPage', '@id': data.url } }),
    };
    setOutput(JSON.stringify(schema, null, 2));
  }, [data]);

  return (
    <ToolCard title="Article Schema Generator">
      {([
        ['headline', 'Headline', 'text'],
        ['author', 'Author Name', 'text'],
        ['datePublished', 'Date Published', 'date'],
        ['image', 'Image URL', 'text'],
        ['url', 'Article URL', 'text'],
      ] as const).map(([key, label, type]) => (
        <div key={key} className="space-y-2">
          <Label className="text-sm font-medium">{label}</Label>
          <Input
            type={type}
            value={data[key as keyof typeof data]}
            onChange={(e) => setData({ ...data, [key]: e.target.value })}
            className="rounded-xl"
          />
        </div>
      ))}
      {output && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Article Schema (JSON-LD)</Label>
          <Textarea value={output} readOnly className="min-h-[150px] rounded-xl font-mono text-sm" />
          <CopyButton text={output} />
        </div>
      )}
    </ToolCard>
  );
}

export function ProductSchemaGenerator() {
  const [data, setData] = React.useState({
    name: '',
    description: '',
    price: '',
    currency: 'USD',
    availability: 'InStock',
    image: '',
  });
  const [output, setOutput] = React.useState('');

  React.useEffect(() => {
    if (!data.name) {
      setOutput('');
      return;
    }
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: data.name,
      description: data.description,
      offers: {
        '@type': 'Offer',
        price: data.price || '0',
        priceCurrency: data.currency,
        availability: `https://schema.org/${data.availability}`,
      },
      ...(data.image && { image: data.image }),
    };
    setOutput(JSON.stringify(schema, null, 2));
  }, [data]);

  return (
    <ToolCard title="Product Schema Generator">
      {([
        ['name', 'Product Name', 'text'],
        ['description', 'Description', 'text'],
        ['price', 'Price', 'number'],
        ['currency', 'Currency', 'text'],
        ['image', 'Image URL', 'text'],
      ] as const).map(([key, label, type]) => (
        <div key={key} className="space-y-2">
          <Label className="text-sm font-medium">{label}</Label>
          <Input
            type={type}
            value={data[key as keyof typeof data]}
            onChange={(e) => setData({ ...data, [key]: e.target.value })}
            className="rounded-xl"
          />
        </div>
      ))}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Availability</Label>
        <select
          value={data.availability}
          onChange={(e) => setData({ ...data, availability: e.target.value })}
          className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-sm"
        >
          <option value="InStock">In Stock</option>
          <option value="OutOfStock">Out of Stock</option>
          <option value="PreOrder">Pre-Order</option>
        </select>
      </div>
      {output && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Product Schema (JSON-LD)</Label>
          <Textarea value={output} readOnly className="min-h-[150px] rounded-xl font-mono text-sm" />
          <CopyButton text={output} />
        </div>
      )}
    </ToolCard>
  );
}

export function WebsiteSchemaGenerator() {
  const [data, setData] = React.useState({
    name: '',
    url: '',
    description: '',
    searchUrl: '',
  });
  const [output, setOutput] = React.useState('');

  React.useEffect(() => {
    if (!data.name) {
      setOutput('');
      return;
    }
    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: data.name,
      url: data.url,
      description: data.description,
    };
    if (data.searchUrl) {
      schema.potentialAction = {
        '@type': 'SearchAction',
        target: `${data.searchUrl}?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      };
    }
    setOutput(JSON.stringify(schema, null, 2));
  }, [data]);

  return (
    <ToolCard title="Website Schema Generator">
      {([
        ['name', 'Website Name', 'text'],
        ['url', 'Website URL', 'text'],
        ['description', 'Description', 'text'],
        ['searchUrl', 'Search URL (optional)', 'text'],
      ] as const).map(([key, label, type]) => (
        <div key={key} className="space-y-2">
          <Label className="text-sm font-medium">{label}</Label>
          <Input
            type={type}
            value={data[key as keyof typeof data]}
            onChange={(e) => setData({ ...data, [key]: e.target.value })}
            className="rounded-xl"
          />
        </div>
      ))}
      {output && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Website Schema (JSON-LD)</Label>
          <Textarea value={output} readOnly className="min-h-[150px] rounded-xl font-mono text-sm" />
          <CopyButton text={output} />
        </div>
      )}
    </ToolCard>
  );
}

export function MetaRobotsGenerator() {
  const [index, setIndex] = React.useState(true);
  const [follow, setFollow] = React.useState(true);
  const [noarchive, setNoarchive] = React.useState(false);
  const [nosnippet, setNosnippet] = React.useState(false);
  const [output, setOutput] = React.useState('');

  React.useEffect(() => {
    const directives: string[] = [];
    directives.push(index ? 'index' : 'noindex');
    directives.push(follow ? 'follow' : 'nofollow');
    if (noarchive) directives.push('noarchive');
    if (nosnippet) directives.push('nosnippet');
    setOutput(`<meta name="robots" content="${directives.join(', ')}" />`);
  }, [index, follow, noarchive, nosnippet]);

  return (
    <ToolCard title="Meta Robots Generator">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={index} onChange={(e) => setIndex(e.target.checked)} />
          Allow Indexing
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={follow} onChange={(e) => setFollow(e.target.checked)} />
          Allow Following Links
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={noarchive} onChange={(e) => setNoarchive(e.target.checked)} />
          No Archive
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={nosnippet} onChange={(e) => setNosnippet(e.target.checked)} />
          No Snippet
        </label>
      </div>
      {output && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Meta Robots Tag</Label>
          <Textarea value={output} readOnly className="min-h-[60px] rounded-xl font-mono text-sm" />
          <CopyButton text={output} />
        </div>
      )}
    </ToolCard>
  );
}

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
  'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these',
  'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who', 'when', 'where',
  'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such',
  'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'as',
]);

export function KeywordExtractor() {
  const [text, setText] = React.useState('');
  const [keywords, setKeywords] = React.useState<{ word: string; count: number }[]>([]);

  React.useEffect(() => {
    if (!text) {
      setKeywords([]);
      return;
    }
    const words = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
    const freq: Record<string, number> = {};
    for (const w of words) {
      freq[w] = (freq[w] ?? 0) + 1;
    }
    const sorted = Object.entries(freq)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
    setKeywords(sorted);
  }, [text]);

  return (
    <ToolCard title="Keyword Extractor">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Input Text</Label>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your text here..." className="min-h-[150px] rounded-xl" />
      </div>
      {keywords.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Top Keywords</Label>
          <div className="space-y-1">
            {keywords.map((kw) => (
              <div key={kw.word} className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
                <span className="text-sm font-medium">{kw.word}</span>
                <span className="text-sm text-muted-foreground">{kw.count}×</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolCard>
  );
}

export function SerpPixelChecker() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const titlePx = React.useMemo(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;
    ctx.font = '20px Arial';
    return ctx.measureText(title).width;
  }, [title]);

  const descPx = React.useMemo(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;
    ctx.font = '14px Arial';
    return ctx.measureText(description).width;
  }, [description]);

  const titleLimit = 600;
  const descLimit = 960;

  return (
    <ToolCard title="SERP Pixel Checker">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Title Tag</Label>
          <span className={cn('text-sm', titlePx > titleLimit ? 'text-red-500' : 'text-muted-foreground')}>
            {Math.round(titlePx)}px / {titleLimit}px
          </span>
        </div>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter page title..." className="rounded-xl" />
        <div className="rounded-xl border border-border/60 bg-muted/30 p-3">
          <p className="text-lg font-medium text-blue-700 dark:text-blue-400">{title || 'Title preview'}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Meta Description</Label>
          <span className={cn('text-sm', descPx > descLimit ? 'text-red-500' : 'text-muted-foreground')}>
            {Math.round(descPx)}px / {descLimit}px
          </span>
        </div>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter meta description..." className="rounded-xl text-sm" />
        <div className="rounded-xl border border-border/60 bg-muted/30 p-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">{description || 'Description preview'}</p>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        Google typically truncates titles at ~600px and descriptions at ~960px.
      </div>
    </ToolCard>
  );
}
