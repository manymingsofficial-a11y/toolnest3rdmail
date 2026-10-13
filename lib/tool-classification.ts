/**
 * Tool Classification System
 * 
 * Classifies tools by type, functionality, and content quality to determine:
 * - Ad eligibility (no ads on low-value/template pages)
 * - Indexing policy (noindex for low-value pages)
 * - Content quality tier
 */

export type ToolTier = 'premium' | 'standard' | 'template' | 'utility' | 'reference';

export type ToolClassification = {
  slug: string;
  tier: ToolTier;
  category: string;
  hasAds: boolean;
  index: boolean;
  follow: boolean;
  reason: string;
};

// Tools that are genuine utilities with real processing (PDF, image, video, audio, office, converter, etc.)
const PREMIUM_TOOLS: string[] = [
  // PDF tools with real processing
  'pdf-merge', 'pdf-split', 'pdf-compress', 'pdf-rotate', 'pdf-page-number',
  'pdf-watermark', 'pdf-metadata-editor', 'pdf-delete-pages', 'pdf-extract-pages',
  'pdf-reorder-pages', 'pdf-unlock', 'pdf-protect', 'pdf-to-word', 'pdf-to-excel',
  'pdf-to-powerpoint', 'word-to-pdf', 'excel-to-pdf', 'powerpoint-to-pdf',
  'pdf-viewer', 'pdf-to-word', 'pdf-to-excel', 'pdf-to-powerpoint',
  
  // Image tools with real processing
  'image-compressor', 'image-resizer', 'image-converter', 'image-cropper',
  'image-rotator', 'image-flipper', 'background-remover', 'image-watermark',
  'image-sharpen', 'image-blur', 'image-grayscale', 'image-sepia-filter',
  'image-color-picker', 'image-metadata-viewer', 'image-metadata-remover',
  'image-border-creator', 'image-rounded-corners', 'image-brightness-adjuster',
  'image-contrast-adjuster', 'image-placeholder-generator', 'favicon-generator',
  'svg-optimizer', 'svg-to-png', 'png-to-svg', 'svg-viewer',
  
  // Video tools with real processing
  'video-compressor', 'video-converter', 'video-trimmer', 'video-cutter',
  'video-merger', 'video-splitter', 'video-rotator', 'video-cropper',
  'video-speed-controller', 'reverse-video', 'mute-video', 'extract-audio',
  'video-to-gif', 'gif-to-video', 'video-watermark', 'video-thumbnail-generator',
  'video-metadata-viewer', 'video-metadata-remover',
  
  // Audio tools with real processing
  'audio-converter', 'audio-trimmer', 'audio-cutter', 'audio-merger',
  'audio-compressor', 'reverse-audio', 'volume-booster', 'audio-speed-changer',
  'pitch-changer', 'voice-recorder', 'merge-audio', 'audio-metadata-viewer',
  'audio-metadata-remover',
  
  // Office tools with real processing
  'docx-viewer', 'docx-editor', 'excel-viewer', 'csv-viewer', 'csv-editor',
  'csv-merge', 'csv-split', 'excel-to-csv', 'csv-to-excel', 'ppt-viewer',
  
  // Converter tools with real processing
  'color-converter', 'hex-to-rgb', 'rgb-to-hex', 'unit-converter', 'currency-converter',
  'base64-encoder', 'url-encoder', 'html-to-text', 'markdown-preview',
  'json-formatter', 'json-validator', 'xml-formatter', 'xml-validator',
  'yaml-formatter', 'yaml-validator', 'csv-to-json', 'json-to-csv',
  'csv-to-excel', 'excel-to-csv', 'sql-formatter',
  
  // QR/Barcode with real generation
  'qr-code-generator', 'qr-scanner', 'qr-history', 'qr-label-generator', 'barcode-generator',
  
  // Security tools with real crypto
  'password-generator', 'password-strength-checker', 'uuid-generator', 'uuid-bulk-generator',
  'hash-compare', 'bcrypt-generator', 'sha1-hash-generator', 'sha256-hash-generator',
  'md5-hash-generator', 'base32-encoder', 'base32-decoder',
  
  // Developer tools with real processing
  'js-minifier', 'css-minifier', 'html-formatter', 'json-formatter', 'xml-formatter',
  'yaml-formatter', 'sql-formatter', 'regex-tester',
  
  // Web tools with real network operations
  'ssl-checker', 'dns-lookup', 'http-header-viewer', 'redirect-checker',
  'url-preview', 'open-graph-preview', 'ip-address-checker', 'browser-information',
  'user-agent-parser', 'cookie-viewer', 'website-screenshot', 'website-manifest-generator',
];

// Standard tools - useful but simpler functionality
const STANDARD_TOOLS: string[] = [
  'qr-code-generator', 'barcode-generator',
  'color-palette-generator', 'gradient-generator', 'css-gradient-generator',
  'glassmorphism-generator', 'neumorphism-generator', 'css-button-generator',
  'css-shadow-generator', 'border-radius-generator',
  'word-counter', 'line-counter', 'character-counter', 'text-repeater',
  'text-reverser', 'remove-extra-spaces', 'remove-duplicate-lines',
  'find-and-replace', 'text-cleaner', 'text-compare', 'case-converter',
  'lorem-ipsum-generator', 'random-text-generator', 'random-number-generator',
  'random-pin-generator', 'otp-generator', 'password-generator',
  'password-strength-checker', 'username-generator',
  'slug-generator', 'canonical-url-generator', 'robots-txt-generator',
  'sitemap-generator', 'meta-tag-generator', 'meta-robots-generator',
  'open-graph-generator', 'twitter-card-generator', 'schema-markup-generator',
  'faq-schema-generator', 'breadcrumb-schema-generator', 'article-schema-generator',
  'product-schema-generator', 'website-schema-generator',
  'hreflang-generator', 'keyword-extractor', 'keyword-density-checker',
  'serp-pixel-checker', 'search-snippet-preview',
  'uuid-generator', 'uuid-bulk-generator', 'hash-compare',
  'bcrypt-generator', 'sha1-hash-generator', 'sha256-hash-generator',
  'md5-hash-generator', 'base32-encoder', 'base32-decoder',
  'js-minifier', 'css-minifier', 'html-formatter', 'json-formatter',
  'json-validator', 'xml-formatter', 'xml-validator', 'yaml-formatter',
  'yaml-validator', 'sql-formatter', 'regex-tester',
  'ssl-checker', 'dns-lookup', 'http-header-viewer', 'redirect-checker',
  'url-preview', 'open-graph-preview', 'ip-address-checker',
  'browser-information', 'user-agent-parser', 'cookie-viewer',
  'website-screenshot', 'website-manifest-generator',
  'color-converter', 'hex-to-rgb', 'rgb-to-hex',
  'length-converter', 'weight-converter', 'temperature-converter',
  'area-converter', 'volume-converter', 'speed-converter',
  'pressure-converter', 'energy-converter', 'power-converter',
  'fuel-converter', 'data-storage-converter', 'timezone-converter',
  'timestamp-converter', 'unix-time-converter', 'time-converter',
  'business-day-calculator', 'age-calculator', 'bmi-calculator',
  'percentage-calculator', 'compound-interest-calculator',
  'simple-interest-calculator', 'loan-emi-calculator',
  'discount-calculator', 'tip-calculator', 'gst-calculator',
  'scientific-calculator',
  'calendar', 'age-timeline', 'countdown-timer', 'stopwatch', 'pomodoro-timer',
  'meeting-planner', 'notes', 'to-do-list',
  'website-schema-generator',
  'svg-optimizer', 'svg-to-png', 'png-to-svg', 'svg-viewer',
];

// Template-based AI tools - LOW VALUE, should NOT have ads, should NOT be indexed as unique content
const TEMPLATE_AI_TOOLS: string[] = [
  // Content & Writing
  'ai-blog-title-generator', 'ai-blog-outline-generator', 'ai-article-idea-generator',
  'ai-paragraph-generator', 'ai-sentence-rewriter', 'ai-grammar-improver',
  'ai-summarizer', 'ai-expand-text', 'ai-simplify-text', 'ai-humanize-text',
  'ai-meta-title-generator', 'ai-meta-description-generator', 'ai-keyword-generator',
  'ai-faq-generator', 'ai-seo-outline-generator', 'ai-slug-generator-pro',
  'ai-product-schema-writer', 'ai-alt-text-generator',
  
  // Social Media
  'ai-instagram-caption-generator', 'ai-facebook-caption-generator',
  'ai-linkedin-post-generator', 'ai-tweet-generator',
  'ai-pinterest-pin-title-generator', 'ai-pinterest-description-generator',
  'ai-hashtag-generator', 'ai-social-bio-generator',
  
  // YouTube
  'ai-youtube-title-generator', 'ai-youtube-description-generator',
  'ai-video-hook-generator', 'ai-video-script-generator', 'ai-shorts-caption-generator',
  'ai-thumbnail-text-generator',
  
  // Business
  'ai-business-name-generator', 'ai-startup-name-generator', 'ai-brand-name-generator',
  'ai-slogan-generator', 'ai-tagline-generator', 'ai-product-description-generator',
  'ai-marketing-copy-generator',
  
  // Email
  'ai-email-writer', 'ai-cold-email-generator', 'ai-follow-up-email-generator',
  'ai-professional-reply-generator',
  
  // Career
  'ai-resume-summary-generator', 'ai-cover-letter-generator',
  'ai-job-description-generator', 'ai-interview-questions-generator',
  
  // E-commerce
  'ai-amazon-listing-generator', 'ai-shopify-product-description-generator',
  'ai-etsy-product-description-generator', 'ai-ebay-listing-generator',
];

// Utility/Reference tools - minimal unique value, no ads
const UTILITY_TOOLS: string[] = [
  'base64-encoder', 'url-encoder', 'html-to-text', 'markdown-preview',
  'csv-to-json', 'json-to-csv', 'csv-to-excel', 'excel-to-csv',
  'color-converter', 'hex-to-rgb', 'rgb-to-hex',
  'length-converter', 'weight-converter', 'temperature-converter',
  'area-converter', 'volume-converter', 'speed-converter',
  'pressure-converter', 'energy-converter', 'power-converter',
  'fuel-converter', 'data-storage-converter', 'timezone-converter',
  'timestamp-converter', 'unix-time-converter', 'time-converter',
  'business-day-calculator', 'age-calculator', 'bmi-calculator',
  'percentage-calculator', 'compound-interest-calculator',
  'simple-interest-calculator', 'loan-emi-calculator',
  'discount-calculator', 'tip-calculator', 'gst-calculator',
  'scientific-calculator',
  'calendar', 'age-timeline', 'countdown-timer', 'stopwatch', 'pomodoro-timer',
  'meeting-planner', 'notes', 'to-do-list',
];

// Reference pages - no ads, noindex
const REFERENCE_PAGES: string[] = [
  'about', 'contact', 'privacy-policy', 'terms', 'favorites', 'recent', 'search',
];

export function classifyTool(slug: string): ToolClassification {
  // Check template AI tools first (most restrictive)
  if (TEMPLATE_AI_TOOLS.includes(slug)) {
    return {
      slug,
      tier: 'template',
      category: 'AI Template',
      hasAds: false,
      index: true, // Keep indexed but with canonical
      follow: true,
      reason: 'Template-based generator using rule-based logic, not actual AI. Low unique value. No ads.',
    };
  }

  // Check utility tools
  if (UTILITY_TOOLS.includes(slug)) {
    return {
      slug,
      tier: 'utility',
      category: 'Utility',
      hasAds: false,
      index: true,
      follow: true,
      reason: 'Simple utility/converter tool with minimal unique content. No ads.',
    };
  }

  // Check reference pages
  if (REFERENCE_PAGES.includes(slug)) {
    return {
      slug,
      tier: 'reference',
      category: 'Reference',
      hasAds: false,
      index: false,
      follow: true,
      reason: 'Reference/navigation page. No ads, noindex.',
    };
  }

  // Check premium tools
  if (PREMIUM_TOOLS.includes(slug)) {
    return {
      slug,
      tier: 'premium',
      category: 'Premium',
      hasAds: true,
      index: true,
      follow: true,
      reason: 'Full-featured tool with real processing. Ads allowed.',
    };
  }

  // Check standard tools
  if (STANDARD_TOOLS.includes(slug)) {
    return {
      slug,
      tier: 'standard',
      category: 'Standard',
      hasAds: true,
      index: true,
      follow: true,
      reason: 'Standard tool with useful functionality. Ads allowed.',
    };
  }

  // Default: standard with ads
  return {
    slug,
    tier: 'standard',
    category: 'Standard',
    hasAds: true,
    index: true,
    follow: true,
    reason: 'Default classification. Ads allowed.',
  };
}

export function getAdEligibility(slug: string): boolean {
  return classifyTool(slug).hasAds;
}

export function getIndexPolicy(slug: string): { index: boolean; follow: boolean } {
  const c = classifyTool(slug);
  return { index: c.index, follow: c.follow };
}

export function getAllToolClassifications(): ToolClassification[] {
  const allSlugs = [
    ...PREMIUM_TOOLS,
    ...STANDARD_TOOLS,
    ...TEMPLATE_AI_TOOLS,
    ...UTILITY_TOOLS,
    ...REFERENCE_PAGES,
  ];
  return allSlugs.map(classifyTool);
}