import type { Metadata } from 'next';
import { categories, tools } from '@/lib/data';
import type { Tool } from '@/lib/data';

export const SITE_URL = 'https://toolnest.com';
export const SITE_NAME = 'ToolNest';
export const SITE_LOGO = `${SITE_URL}/logo.png`;
export const SITE_DESCRIPTION = `${tools.length} free online tools — PDF, image, QR & barcode, SEO, AI, text, developer, calculators, converters and more. Fast, secure, no registration required.`;

/* ── JSON-LD generators ─────────────────────────────────────── */

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: SITE_LOGO,
    description: SITE_DESCRIPTION,
    sameAs: [
      'https://twitter.com/toolnest',
      'https://github.com/toolnest',
      'https://www.linkedin.com/company/toolnest',
    ],
  };
}

export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: SITE_LOGO,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateToolJsonLd(slug: string) {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Any',
    url: `${SITE_URL}/tools/${tool.slug}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    isAccessibleForFree: true,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function generateWebApplicationJsonLd(slug: string) {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    url: `${SITE_URL}/tools/${tool.slug}`,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires a modern web browser with JavaScript enabled.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    isAccessibleForFree: true,
  };
}

export function generateCategoryJsonLd(slug: string) {
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return null;
  const catTools = tools.filter((t) => t.category === cat.name);
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: cat.name,
    description: cat.description,
    url: `${SITE_URL}/categories?cat=${cat.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: catTools.length,
      itemListElement: catTools.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/tools/${t.slug}`,
        name: t.name,
      })),
    },
  };
}

export function generateItemListJsonLd(toolList: Tool[], baseUrl = '/tools') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: toolList.length,
    itemListElement: toolList.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/tools/${t.slug}`,
      name: t.name,
      description: t.description,
    })),
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateFaqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

export function generateHowToJsonLd(name: string, steps: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text: step,
    })),
  };
}

export function generateBlogPostJsonLd(post: {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: SITE_LOGO,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export function generateBreadcrumbJsonLdArray(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

/* ── Metadata helpers ───────────────────────────────────────── */

export function generateToolMetadata(slug: string, customTitle?: string, customDescription?: string): Metadata {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return {};

  const title = customTitle ?? tool.name;
  const description = customDescription ?? tool.description;
  const url = `${SITE_URL}/tools/${slug}`;
  const keywords = generateToolKeywords(tool);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `/tools/${slug}` },
    openGraph: {
      title: `${title} — Free Online Tool | ${SITE_NAME}`,
      description,
      type: 'website',
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — Free Online Tool | ${SITE_NAME}`,
      description,
      creator: '@toolnest',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateToolKeywords(tool: Tool): string[] {
  const base = [
    tool.name,
    tool.name.toLowerCase(),
    'free online tool',
    'toolnest',
  ];
  const categoryLower = tool.category.toLowerCase().replace(/ & /g, ' ').replace(/ /g, ', ');
  const words = tool.description
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(' ')
    .filter((w) => w.length > 4)
    .slice(0, 8);
  return Array.from(new Set([...base, ...words, categoryLower])).slice(0, 15);
}

export function generateCategoryMetadata(slug: string): Metadata {
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return {};

  const catTools = tools.filter((t) => t.category === cat.name);
  const title = `${cat.name} — ${catTools.length} Free Online Tools`;
  const description = `${cat.description} ${catTools.length} free tools available — no registration required.`;

  return {
    title,
    description,
    keywords: [cat.name, cat.name.toLowerCase(), 'free online tools', 'toolnest', ...catTools.slice(0, 10).map((t) => t.name)],
    alternates: { canonical: `/categories` },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      type: 'website',
      url: `${SITE_URL}/categories`,
      siteName: SITE_NAME,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      creator: '@toolnest',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateSearchMetadata(query: string): Metadata {
  const title = query
    ? `Search: ${query} — ${SITE_NAME}`
    : `Search Tools — ${SITE_NAME}`;
  const description = query
    ? `Search results for "${query}" across ${tools.length} free online tools.`
    : `Search across all ${tools.length} free online tools on ${SITE_NAME}.`;

  return {
    title,
    description,
    alternates: { canonical: '/search' },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${SITE_URL}/search`,
      siteName: SITE_NAME,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@toolnest',
    },
    robots: {
      index: query ? false : true,
      follow: true,
    },
  };
}

export function generateBlogMetadata(): Metadata {
  return {
    title: 'Blog — Guides, Tutorials & Tips',
    description: `How-to guides, tutorials, and tips for getting the most out of ${tools.length} free online tools on ${SITE_NAME}.`,
    keywords: ['toolnest blog', 'online tools guides', 'how to use tools', 'tool tutorials'],
    alternates: { canonical: '/blog' },
    openGraph: {
      title: `Blog — Guides, Tutorials & Tips | ${SITE_NAME}`,
      description: `How-to guides, tutorials, and tips for getting the most out of ${tools.length} free online tools.`,
      type: 'website',
      url: `${SITE_URL}/blog`,
      siteName: SITE_NAME,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Blog — ${SITE_NAME}`,
      description: 'How-to guides, tutorials, and tips for free online tools.',
      creator: '@toolnest',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateBlogPostMetadata(slug: string): Metadata {
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${post.title} | ${SITE_NAME} Blog`,
      description: post.description,
      type: 'article',
      url: `${SITE_URL}/blog/${slug}`,
      siteName: SITE_NAME,
      locale: 'en_US',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      creator: '@toolnest',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/* ── Blog data ──────────────────────────────────────────────── */

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  content: { heading: string; body: string[] }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-choose-the-right-image-compressor',
    title: 'How to Choose the Right Image Compressor for Your Website',
    description: 'Learn how image compression works, the difference between lossy and lossless, and how to pick the best compressor for your needs.',
    category: 'Image Tools',
    tags: ['image compression', 'web performance', 'image optimization', 'SEO'],
    author: 'ToolNest Team',
    publishedAt: '2025-01-15',
    updatedAt: '2025-06-01',
    readingTime: 7,
    content: [
      {
        heading: 'Why Image Compression Matters',
        body: [
          'Images are often the largest assets on a web page. Unoptimized images can slow your site down, hurt your SEO rankings, and frustrate visitors. Compressing images before uploading them is one of the easiest performance wins you can get.',
          'Google\'s Core Web Vitals measure loading performance through metrics like Largest Contentful Paint (LCP). Since images are frequently the largest element on a page, reducing their file size directly improves LCP.',
        ],
      },
      {
        heading: 'Lossy vs Lossless Compression',
        body: [
          'Lossless compression reduces file size without removing any data — the decompressed image is pixel-identical to the original. Use lossless when you need perfect fidelity, such as for medical or technical images.',
          'Lossy compression discards less-visible data to achieve much smaller file sizes. For most web use cases — blog images, product photos, social media graphics — lossy compression at 80-85% quality is visually indistinguishable from the original but can be 60-70% smaller.',
        ],
      },
      {
        heading: 'Choosing the Right Format',
        body: [
          'JPEG is best for photographs and complex images with many colors. PNG is ideal for images with transparency or sharp edges like logos. WebP offers superior compression for both photographic and graphic content and is supported by all modern browsers.',
          'ToolNest\'s Image Converter lets you switch between JPG, PNG and WebP instantly, so you can test which format gives the best size-to-quality ratio for each image.',
        ],
      },
      {
        heading: 'Recommended Workflow',
        body: [
          '1. Start with the highest-quality source image you have.',
          '2. Resize the image to the maximum dimensions it will be displayed at using the Image Resizer.',
          '3. Convert to WebP if browser support allows.',
          '4. Compress with the Image Compressor at 80-85% quality.',
          '5. Verify the result visually — if it looks good, you\'re done.',
        ],
      },
    ],
  },
  {
    slug: 'qr-code-best-practices-for-businesses',
    title: 'QR Code Best Practices for Businesses in 2025',
    description: 'Discover how to use QR codes effectively for marketing, menus, payments, and customer engagement with these practical tips.',
    category: 'QR & Barcode Tools',
    tags: ['QR codes', 'marketing', 'business', 'mobile'],
    author: 'ToolNest Team',
    publishedAt: '2025-02-10',
    readingTime: 6,
    content: [
      {
        heading: 'Why QR Codes Are Still Relevant',
        body: [
          'QR codes bridge the gap between physical and digital experiences. Since smartphones can now scan QR codes directly from the camera app without any third-party software, adoption has skyrocketed.',
          'Businesses use QR codes for contactless menus, payment links, product information, WiFi access, and marketing campaigns. The key is making the code easy to scan and the destination valuable.',
        ],
      },
      {
        heading: 'Design Tips for Scannable Codes',
        body: [
          'Maintain high contrast between the code and background — dark code on a light background works best. Keep a quiet zone (margin) of at least 4 modules around the code. If you embed a logo, keep it under 20% of the code area and use error correction level "High".',
          'Test your QR code on multiple devices before printing. A code that scans on your phone may fail on older devices with lower-resolution cameras.',
        ],
      },
      {
        heading: 'Use Cases That Work',
        body: [
          'Restaurant menus: Link to a digital menu that updates in real time. Product packaging: Direct customers to instructional videos or warranty registration. Business cards: Share your contact details as a vCard. WiFi access: Let guests connect without typing a password.',
          'With ToolNest\'s QR Code Generator, you can create codes for all these use cases, customize colors to match your brand, add a logo, and download as SVG for print-quality output.',
        ],
      },
    ],
  },
  {
    slug: 'pdf-tools-every-office-needs',
    title: '5 PDF Tools Every Office Needs in 2025',
    description: 'From merging contracts to compressing large files, these free PDF tools will save your team hours every week.',
    category: 'PDF Tools',
    tags: ['PDF', 'office productivity', 'document management', 'free tools'],
    author: 'ToolNest Team',
    publishedAt: '2025-03-05',
    readingTime: 5,
    content: [
      {
        heading: 'PDF Merge: Combine Documents Effortlessly',
        body: [
          'When you need to combine multiple PDFs into one — say, a cover letter, resume, and portfolio — the PDF Merge tool does it in seconds. Just drag and drop your files in the order you want, and download the combined document.',
        ],
      },
      {
        heading: 'PDF Compress: Shrink Files for Email',
        body: [
          'Email providers often limit attachments to 25MB. The PDF Compressor offers three compression levels, so you can find the right balance between file size and quality. Most documents can be reduced by 50-70% without visible quality loss.',
        ],
      },
      {
        heading: 'PDF Split and Extract',
        body: [
          'Need to send just one section of a large report? PDF Split lets you extract specific pages or break a document into individual files. PDF Extract Pages gives you even more control, letting you pick exactly which pages to keep.',
        ],
      },
      {
        heading: 'PDF Protect and Unlock',
        body: [
          'Add password protection to sensitive documents before sharing them externally. Conversely, if you have a password-protected PDF and permission to edit it, PDF Unlock removes the restriction so you can work freely.',
        ],
      },
      {
        heading: 'PDF Rotate and Reorder',
        body: [
          'Scanned documents often come in with pages rotated incorrectly. PDF Rotate fixes individual pages or the entire document. PDF Reorder Pages lets you drag and drop pages into the right sequence before finalizing.',
        ],
      },
    ],
  },
  {
    slug: 'seo-meta-tags-complete-guide',
    title: 'The Complete Guide to SEO Meta Tags in 2025',
    description: 'Master title tags, meta descriptions, Open Graph, Twitter Cards, canonical URLs, and robots directives with practical examples.',
    category: 'SEO Tools',
    tags: ['SEO', 'meta tags', 'open graph', 'twitter cards', 'canonical'],
    author: 'ToolNest Team',
    publishedAt: '2025-04-12',
    updatedAt: '2025-07-01',
    readingTime: 10,
    content: [
      {
        heading: 'Title Tags: The Most Important On-Page Element',
        body: [
          'The title tag is the single most important on-page SEO element. It appears in browser tabs, search results, and social shares. Keep it under 60 characters to avoid truncation in Google results.',
          'Place your primary keyword near the beginning of the title. Include your brand name at the end, separated by a pipe (|) or em dash (—). For example: "QR Code Generator — Free Online Tool | ToolNest".',
        ],
      },
      {
        heading: 'Meta Descriptions: Your Search Snippet',
        body: [
          'While meta descriptions are not a direct ranking factor, they influence click-through rate. Write a compelling 150-160 character summary that includes your target keyword and a call to action.',
          'Use ToolNest\'s Search Snippet Preview tool to see exactly how your title and description will appear in Google results before publishing.',
        ],
      },
      {
        heading: 'Open Graph Tags',
        body: [
          'Open Graph tags control how your page appears when shared on Facebook, LinkedIn, and other platforms. The essential tags are og:title, og:description, og:image, and og:url.',
          'The Open Graph Generator creates all the necessary tags for you — just enter your page details and copy the generated HTML.',
        ],
      },
      {
        heading: 'Twitter Card Tags',
        body: [
          'Twitter Cards work similarly to Open Graph but are specific to Twitter. The summary_large_image card type gives the most visual impact in timelines.',
          'Use the Twitter Card Generator to create the complete set of Twitter meta tags in seconds.',
        ],
      },
      {
        heading: 'Canonical URLs',
        body: [
          'Canonical tags tell search engines which version of a page is the "master" copy. This prevents duplicate content issues when the same page is accessible via multiple URLs.',
          'Always set a canonical URL on every page. The Canonical URL Generator creates the tag for you, and ToolNest automatically sets canonicals on all tool pages.',
        ],
      },
      {
        heading: 'Robots Meta Directives',
        body: [
          'The robots meta tag controls whether search engines can index a page and follow its links. Use "index, follow" for pages you want in search results, and "noindex, follow" for pages like search results or filtered views.',
          'The Meta Robots Generator lets you create the exact directive you need, and the Robots.txt Generator handles site-wide crawl control.',
        ],
      },
    ],
  },
  {
    slug: 'password-security-guide',
    title: 'Password Security: A Practical Guide for Everyone',
    description: 'Learn how to create strong passwords, why password managers matter, and how to audit your existing passwords for vulnerabilities.',
    category: 'Security Tools',
    tags: ['password security', 'cybersecurity', 'password manager', 'online safety'],
    author: 'ToolNest Team',
    publishedAt: '2025-05-20',
    readingTime: 8,
    content: [
      {
        heading: 'What Makes a Password Strong',
        body: [
          'A strong password has three properties: length (at least 16 characters), randomness (no dictionary words or patterns), and uniqueness (not reused across sites). The Password Strength Checker tool analyzes these factors and estimates how long it would take to crack.',
          'Contrary to popular belief, complexity rules (requiring mixed case, numbers, and symbols) matter less than length. A 20-character lowercase password is stronger than an 8-character password with every character type.',
        ],
      },
      {
        heading: 'Why You Need a Password Manager',
        body: [
          'Humans cannot remember 200 unique 16-character passwords. A password manager generates, stores, and auto-fills strong passwords for every site. You only need to remember one master password.',
          'If you\'re not ready for a password manager, use the Password Generator to create strong passwords and store them in an encrypted note or document.',
        ],
      },
      {
        heading: 'Auditing Your Existing Passwords',
        body: [
          'Run each of your current passwords through the Password Strength Checker. Any password that scores below "Strong" should be replaced immediately. Pay special attention to passwords for email, banking, and social media accounts.',
          'Common weak patterns to avoid: birthdays, pet names, "password123", keyboard walks (qwerty), and anything found in a dictionary.',
        ],
      },
    ],
  },
  {
    slug: 'json-formatting-and-validation-guide',
    title: 'JSON Formatting and Validation: A Developer\'s Guide',
    description: 'Understand JSON structure, learn how to format and validate it, and discover common pitfalls that cause API errors.',
    category: 'Developer Tools',
    tags: ['JSON', 'API', 'developer tools', 'data formats'],
    author: 'ToolNest Team',
    publishedAt: '2025-06-15',
    readingTime: 6,
    content: [
      {
        heading: 'What is JSON?',
        body: [
          'JSON (JavaScript Object Notation) is a lightweight data interchange format. It uses human-readable text to store and transmit data objects consisting of attribute-value pairs and arrays. It\'s the most common format for REST API responses.',
        ],
      },
      {
        heading: 'Common JSON Errors',
        body: [
          'Trailing commas are the #1 cause of JSON errors. Unlike JavaScript, JSON does not allow a comma after the last item in an array or object. Single quotes are not valid — JSON requires double quotes for strings and property names.',
          'The JSON Validator instantly catches these errors and tells you exactly where the problem is, saving you from debugging API responses manually.',
        ],
      },
      {
        heading: 'Formatting for Readability',
        body: [
          'Minified JSON saves bandwidth but is impossible to read. The JSON Formatter beautifies minified JSON with proper indentation and line breaks, making debugging and code review much faster.',
          'For production, use the minify option to strip whitespace and reduce payload size. For development, use 2-space indentation for readability.',
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((p) => p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
}

export function getRelatedBlogPosts(slug: string, count = 3): BlogPost[] {
  const post = getBlogPost(slug);
  if (!post) return [];
  return blogPosts
    .filter((p) => p.slug !== slug)
    .filter((p) => p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
    .slice(0, count);
}

export function getBlogCategories(): string[] {
  return Array.from(new Set(blogPosts.map((p) => p.category)));
}

export function getBlogTags(): string[] {
  return Array.from(new Set(blogPosts.flatMap((p) => p.tags)));
}
