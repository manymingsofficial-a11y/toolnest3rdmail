import type { Metadata } from 'next';
import { categories, tools } from '@/lib/data';
import type { Tool } from '@/lib/data';
import { getToolEnhancement } from '@/lib/tool-metadata-enhancements';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://freetoolnest.vercel.app';
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

  const enh = getToolEnhancement(slug);
  const title = customTitle ?? enh?.titleSuffix ? `${tool.name} — ${enh!.titleSuffix}` : tool.name;
  const description = customDescription ?? enh?.description ?? tool.description;
  const url = `${SITE_URL}/tools/${slug}`;
  const keywords = generateToolKeywords(tool);

  return {
    title: { absolute: `${title} | ${SITE_NAME}` },
    description,
    keywords,
    alternates: { canonical: `/tools/${slug}` },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      type: 'website',
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      images: [{ url: SITE_LOGO, width: 1200, height: 630, alt: `${tool.name} — ${SITE_NAME}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      creator: '@toolnest',
      images: [SITE_LOGO],
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
    alternates: { canonical: `/categories?cat=${slug}` },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      type: 'website',
      url: `${SITE_URL}/categories`,
      siteName: SITE_NAME,
      locale: 'en_US',
      images: [{ url: SITE_LOGO, width: 1200, height: 630, alt: `${title} — ${SITE_NAME}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      creator: '@toolnest',
      images: [SITE_LOGO],
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
      images: [{ url: SITE_LOGO, width: 1200, height: 630, alt: `${SITE_NAME} Search` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@toolnest',
      images: [SITE_LOGO],
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
      images: [{ url: SITE_LOGO, width: 1200, height: 630, alt: `${SITE_NAME} Blog` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Blog — ${SITE_NAME}`,
      description: 'How-to guides, tutorials, and tips for free online tools.',
      creator: '@toolnest',
      images: [SITE_LOGO],
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
      images: [{ url: SITE_LOGO, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      creator: '@toolnest',
      images: [SITE_LOGO],
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
  {
    slug: 'compress-images-for-web-without-losing-quality',
    title: 'How to Compress Images for Web Without Losing Quality',
    description: 'Practical techniques to shrink image file sizes by up to 80% while keeping them looking sharp. Covers format selection, quality settings, and the best free tools.',
    category: 'Image Tools',
    tags: ['image compression', 'web performance', 'image optimization', 'WebP', 'SEO'],
    author: 'ToolNest Team',
    publishedAt: '2025-07-18',
    readingTime: 8,
    content: [
      {
        heading: 'Why Image Compression Is Critical for Web Performance',
        body: [
          'Images account for more than half of the average web page\'s total weight. Every extra kilobyte adds to load time, which directly impacts bounce rate, conversion rate, and search rankings. Google has confirmed that page speed is a ranking factor, and Core Web Vitals like Largest Contentful Paint are heavily influenced by how fast your hero image loads.',
          'The good news: most images can be reduced by 60-80% with no perceptible quality loss. The key is choosing the right format, the right compression level, and the right dimensions for the job.',
        ],
      },
      {
        heading: 'Step 1: Choose the Right Format',
        body: [
          'JPEG is the classic choice for photographs and images with many colors and gradients. It supports lossy compression that can dramatically reduce file size, but it does not support transparency.',
          'PNG is ideal for graphics with sharp edges, text, or transparency. It uses lossless compression, so file sizes tend to be larger than JPEG for photographic content.',
          'WebP is the modern best-of-both-worlds format. It supports both lossy and lossless compression, transparency, and produces files 25-35% smaller than JPEG at equivalent quality. All modern browsers support it. Use the Image Converter to convert your images to WebP before uploading.',
        ],
      },
      {
        heading: 'Step 2: Resize to Display Dimensions',
        body: [
          'A common mistake is uploading a 4000x3000 photo that will only be displayed at 800x600. The browser still downloads the full-resolution file, then scales it down. This wastes bandwidth and slows the page.',
          'Before compressing, resize the image to the largest dimensions it will actually be displayed at (or 2x for retina screens). The Image Resizer lets you set exact pixel dimensions and maintain aspect ratio automatically.',
        ],
      },
      {
        heading: 'Step 3: Apply the Right Compression Level',
        body: [
          'For JPEG and WebP, a quality setting of 75-85 is the sweet spot for most web images. At 80 quality, the difference from the original is virtually invisible to the human eye, but the file size drops by 60-70%.',
          'For images where every detail matters (product photos, medical images), use 90-95 quality. For decorative images, backgrounds, or social media graphics, you can go as low as 65 without noticeable degradation.',
          'The Image Compressor lets you adjust quality in real time and compare the result side-by-side with the original, so you can find the lowest acceptable quality for each image.',
        ],
      },
      {
        heading: 'Step 4: Strip Unnecessary Metadata',
        body: [
          'Cameras and editing software embed EXIF data — camera model, GPS coordinates, timestamps, color profiles — inside image files. This metadata can add 10-50 KB per image and is rarely needed on the web.',
          'The Image Metadata Remover strips all EXIF, IPTC, and XMP data from your images, reducing file size and protecting privacy. This is especially important for photos taken on phones that may embed location data.',
        ],
      },
      {
        heading: 'Recommended Workflow Summary',
        body: [
          '1. Start with the highest-quality source image available.',
          '2. Resize to 2x the display dimensions using the Image Resizer.',
          '3. Convert to WebP using the Image Converter.',
          '4. Compress at 80% quality using the Image Compressor.',
          '5. Strip metadata using the Image Metadata Remover.',
          '6. Verify visually — if it looks good, ship it.',
        ],
      },
    ],
  },
  {
    slug: 'converting-pdf-to-word-step-by-step-guide',
    title: 'Converting PDF to Word: A Step-by-Step Guide',
    description: 'Learn how to convert PDF documents into editable Word files for free, what to expect from the conversion, and how to fix common formatting issues.',
    category: 'PDF Tools',
    tags: ['PDF', 'Word', 'document conversion', 'office productivity', 'free tools'],
    author: 'ToolNest Team',
    publishedAt: '2025-08-02',
    readingTime: 7,
    content: [
      {
        heading: 'Why Convert PDF to Word?',
        body: [
          'PDF is a fixed-layout format designed for sharing and printing — not for editing. When you receive a contract, report, or form as a PDF and need to make changes, converting it to Word lets you edit the text, adjust formatting, and reuse the content.',
          'Common scenarios: updating an old proposal that only exists as PDF, extracting text from a scanned document, or repurposing content from a PDF report into a new document.',
        ],
      },
      {
        heading: 'Step 1: Prepare Your PDF',
        body: [
          'Before converting, check that your PDF is text-based, not a scanned image. You can verify by trying to select text in a PDF viewer — if you can highlight individual words, it\'s text-based. If the entire page selects as one block, it\'s likely a scanned image.',
          'For scanned PDFs, optical character recognition (OCR) is needed first. For text-based PDFs, conversion will be fast and accurate.',
        ],
      },
      {
        heading: 'Step 2: Convert with the PDF to Word Tool',
        body: [
          'The PDF to Word converter processes your file entirely in your browser — no upload to a server, no privacy concerns. Simply open the tool, select your PDF file, and the converter extracts the text and layout into an editable Word document.',
          'The conversion preserves headings, paragraphs, lists, and basic formatting. Complex layouts with multiple columns, text boxes, or embedded images may not convert perfectly, but the text content will be fully editable.',
        ],
      },
      {
        heading: 'Step 3: Review and Fix Formatting',
        body: [
          'After conversion, open the Word file and review the formatting. Most common issues and their fixes:',
          'Fonts: If the original PDF used a non-standard font, Word may substitute a similar font. You can reapply the correct font manually.',
          'Tables: Simple tables usually convert well. Complex merged-cell tables may need manual adjustment.',
          'Images: Embedded images are extracted and placed in approximately the right position. You may need to resize or reposition them.',
          'Headers and footers: These may appear as regular text at the top and bottom of pages rather than as true Word headers/footers. Copy them into the header/footer area manually.',
        ],
      },
      {
        heading: 'Alternative: Extract Just the Text',
        body: [
          'If you only need the text content without any formatting, using the PDF to Word converter and then selecting "Paste Special > Unformatted Text" in Word can give you clean text without any layout artifacts.',
          'For extracting specific pages, use PDF Extract Pages first to isolate the pages you need, then convert just those pages.',
        ],
      },
      {
        heading: 'Tips for Best Results',
        body: [
          'Start with a clean, text-based PDF for the most accurate conversion. If the PDF has annotations, form fields, or comments, remove them first with PDF Metadata Editor. For large PDFs, split the document with PDF Split and convert sections individually for faster processing.',
        ],
      },
    ],
  },
  {
    slug: 'csv-vs-json-which-data-format-should-you-use',
    title: 'CSV vs JSON: Which Data Format Should You Use?',
    description: 'A practical comparison of CSV and JSON — when to use each, their pros and cons, and how to convert between them with free online tools.',
    category: 'Developer Tools',
    tags: ['CSV', 'JSON', 'data formats', 'developer tools', 'API'],
    author: 'ToolNest Team',
    publishedAt: '2025-08-25',
    readingTime: 8,
    content: [
      {
        heading: 'What Are CSV and JSON?',
        body: [
          'CSV (Comma-Separated Values) is a plain-text format that stores tabular data — rows and columns — with each field separated by a comma. It is the simplest possible format for spreadsheet data and has been used since the early days of computing.',
          'JSON (JavaScript Object Notation) is a text format that stores structured data as nested objects and arrays. It supports hierarchies, mixed data types, and key-value pairs, making it far more expressive than CSV.',
        ],
      },
      {
        heading: 'When to Use CSV',
        body: [
          'CSV shines when your data is flat and tabular — think of a spreadsheet where every row has the same columns. It is ideal for: exporting data from databases, importing contacts or product lists into spreadsheets, sharing simple datasets, and log files.',
          'Advantages: extremely small file size, universal support (every spreadsheet app reads it), human-readable, and easy to generate programmatically. Disadvantages: no support for nested data, no data types (everything is a string), and escaping commas and newlines in fields is error-prone.',
        ],
      },
      {
        heading: 'When to Use JSON',
        body: [
          'JSON is the right choice when your data has structure — nested objects, arrays within arrays, or mixed types. It is the standard format for REST API responses, configuration files, and NoSQL databases.',
          'Advantages: supports nested structures, explicit data types (strings, numbers, booleans, null), self-documenting with key names, and native parsing in every programming language. Disadvantages: larger file size than CSV (due to repeated key names), harder to read in spreadsheet apps, and trailing commas cause errors.',
        ],
      },
      {
        heading: 'Performance and File Size Comparison',
        body: [
          'For a dataset with 10,000 rows and 5 columns, CSV is typically 40-60% smaller than JSON because it does not repeat field names on every row. If bandwidth is critical (e.g., serving data to mobile apps), CSV may be the better choice for flat data.',
          'However, for structured data with nesting, JSON eliminates the need for multiple files or complex join logic, which can actually reduce total data transferred compared to representing the same information in multiple CSV files.',
        ],
      },
      {
        heading: 'Converting Between CSV and JSON',
        body: [
          'ToolNest provides free tools to convert between formats instantly, all processed in your browser:',
          'CSV to JSON: The CSV to JSON converter takes your CSV data and generates a JSON array of objects, with the CSV header row as keys. It handles quoted fields, commas inside quotes, and various delimiters.',
          'JSON to CSV: The JSON to CSV converter flattens a JSON array of objects into CSV format. Note that deeply nested JSON structures will be flattened, which may lose some hierarchy.',
          'For validation before converting, use the JSON Validator to ensure your JSON is well-formed, or the CSV Viewer to inspect your CSV data visually.',
        ],
      },
      {
        heading: 'Quick Decision Guide',
        body: [
          'Use CSV when: data is flat and tabular, file size matters, the consumer is a spreadsheet, or you are exporting from a database.',
          'Use JSON when: data is nested or hierarchical, the consumer is an API or application, you need data types, or the structure is complex.',
          'Still unsure? Start with JSON for flexibility — you can always convert to CSV later if needed. Going from JSON to CSV is straightforward; the reverse is harder if your CSV has inconsistent columns.',
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
