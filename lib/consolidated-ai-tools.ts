// Consolidated AI Tool Configurations
// Groups 51 template-based AI tools into 8 consolidated tools with mode selection

import type { GenConfig } from './ai-generators';
import { aiConfigs } from './ai-generators';

export type ConsolidatedToolMode = {
  id: string;
  label: string;
  description: string;
  configSlug: string; // References the original aiConfigs key
};

// 8 Consolidated AI Tools
export const consolidatedAiTools: Record<string, { 
  slug: string;
  label: string;
  description: string;
  category: string;
  modes: ConsolidatedToolMode[];
  placeholder: string;
  example: string;
  inputType: 'text' | 'textarea';
  showCharCounter: boolean;
}> = {
  'ai-writing-assistant': {
    slug: 'ai-writing-assistant',
    label: 'AI Writing Assistant',
    description: 'Generate blog titles, outlines, articles, paragraphs, and improve text with grammar, summarization, expansion, simplification, and humanization.',
    category: 'Content & Writing',
    modes: [
      { id: 'blog-title', label: 'Blog Title Generator', description: 'Generate catchy blog titles from a topic', configSlug: 'ai-blog-title-generator' },
      { id: 'blog-outline', label: 'Blog Outline Generator', description: 'Create structured blog outlines', configSlug: 'ai-blog-outline-generator' },
      { id: 'article-idea', label: 'Article Idea Generator', description: 'Generate article ideas for a topic', configSlug: 'ai-article-idea-generator' },
      { id: 'paragraph', label: 'Paragraph Generator', description: 'Generate full paragraphs on any topic', configSlug: 'ai-paragraph-generator' },
      { id: 'sentence-rewriter', label: 'Sentence Rewriter', description: 'Rewrite sentences with different phrasing', configSlug: 'ai-sentence-rewriter' },
      { id: 'grammar-improver', label: 'Grammar Improver', description: 'Fix grammar and punctuation errors', configSlug: 'ai-grammar-improver' },
      { id: 'summarizer', label: 'Text Summarizer', description: 'Summarize long text into key points', configSlug: 'ai-summarizer' },
      { id: 'expand-text', label: 'Text Expander', description: 'Expand short text into detailed content', configSlug: 'ai-expand-text' },
      { id: 'simplify-text', label: 'Text Simplifier', description: 'Simplify complex text for readability', configSlug: 'ai-simplify-text' },
      { id: 'humanize-text', label: 'Text Humanizer', description: 'Make AI-generated text sound more natural', configSlug: 'ai-humanize-text' },
    ],
    placeholder: 'Enter your topic, text, or sentence...',
    example: 'digital marketing',
    inputType: 'textarea',
    showCharCounter: true,
  },
  'ai-seo-tools': {
    slug: 'ai-seo-tools',
    label: 'AI SEO Tools',
    description: 'Generate meta titles, descriptions, keywords, FAQs, SEO outlines, slugs, schema markup, and alt text for better search visibility.',
    category: 'SEO',
    modes: [
      { id: 'meta-title', label: 'Meta Title Generator', description: 'Generate SEO-optimized meta titles', configSlug: 'ai-meta-title-generator' },
      { id: 'meta-description', label: 'Meta Description Generator', description: 'Create compelling meta descriptions', configSlug: 'ai-meta-description-generator' },
      { id: 'keywords', label: 'Keyword Generator', description: 'Generate keyword variations and long-tail keywords', configSlug: 'ai-keyword-generator' },
      { id: 'faq', label: 'FAQ Generator', description: 'Generate FAQ sections for any topic', configSlug: 'ai-faq-generator' },
      { id: 'seo-outline', label: 'SEO Outline Generator', description: 'Create SEO-optimized content outlines', configSlug: 'ai-seo-outline-generator' },
      { id: 'slug', label: 'Slug Generator Pro', description: 'Generate clean URL slugs from titles', configSlug: 'ai-slug-generator-pro' },
      { id: 'product-schema', label: 'Product Schema Writer', description: 'Generate Product JSON-LD schema markup', configSlug: 'ai-product-schema-writer' },
      { id: 'alt-text', label: 'Alt Text Generator', description: 'Generate descriptive alt text for images', configSlug: 'ai-alt-text-generator' },
    ],
    placeholder: 'Enter your topic, keyword, or product details...',
    example: 'organic gardening tips',
    inputType: 'text',
    showCharCounter: true,
  },
  'ai-social-media': {
    slug: 'ai-social-media',
    label: 'AI Social Media Generator',
    description: 'Create captions, posts, bios, hashtags, and pin titles for Instagram, Facebook, LinkedIn, Twitter, and Pinterest.',
    category: 'Social Media',
    modes: [
      { id: 'instagram-caption', label: 'Instagram Caption', description: 'Generate engaging Instagram captions', configSlug: 'ai-instagram-caption-generator' },
      { id: 'facebook-caption', label: 'Facebook Caption', description: 'Create Facebook posts with engagement', configSlug: 'ai-facebook-caption-generator' },
      { id: 'linkedin-post', label: 'LinkedIn Post', description: 'Generate professional LinkedIn posts', configSlug: 'ai-linkedin-post-generator' },
      { id: 'tweet', label: 'Tweet Generator', description: 'Create viral-worthy tweets', configSlug: 'ai-tweet-generator' },
      { id: 'pinterest-title', label: 'Pinterest Pin Title', description: 'Generate click-worthy Pinterest pin titles', configSlug: 'ai-pinterest-pin-title-generator' },
      { id: 'pinterest-description', label: 'Pinterest Description', description: 'Create Pinterest pin descriptions', configSlug: 'ai-pinterest-description-generator' },
      { id: 'hashtags', label: 'Hashtag Generator', description: 'Generate relevant hashtags for any niche', configSlug: 'ai-hashtag-generator' },
      { id: 'social-bio', label: 'Social Bio Generator', description: 'Create compelling social media bios', configSlug: 'ai-social-bio-generator' },
    ],
    placeholder: 'Enter your post topic, niche, or interests...',
    example: 'morning coffee routine',
    inputType: 'text',
    showCharCounter: true,
  },
  'ai-youtube': {
    slug: 'ai-youtube',
    label: 'AI YouTube Assistant',
    description: 'Generate video titles, descriptions, hooks, scripts, Shorts captions, and thumbnail text for YouTube growth.',
    category: 'YouTube',
    modes: [
      { id: 'youtube-title', label: 'Video Title Generator', description: 'Generate click-worthy YouTube titles', configSlug: 'ai-youtube-title-generator' },
      { id: 'youtube-description', label: 'Video Description', description: 'Create SEO-optimized video descriptions', configSlug: 'ai-youtube-description-generator' },
      { id: 'video-hook', label: 'Video Hook Generator', description: 'Generate attention-grabbing video hooks', configSlug: 'ai-video-hook-generator' },
      { id: 'video-script', label: 'Video Script Generator', description: 'Create structured video scripts', configSlug: 'ai-video-script-generator' },
      { id: 'shorts-caption', label: 'Shorts Caption', description: 'Generate captions for YouTube Shorts', configSlug: 'ai-shorts-caption-generator' },
      { id: 'thumbnail-text', label: 'Thumbnail Text', description: 'Generate high-CTR thumbnail text ideas', configSlug: 'ai-thumbnail-text-generator' },
    ],
    placeholder: 'Enter your video topic...',
    example: 'how to edit videos for beginners',
    inputType: 'text',
    showCharCounter: true,
  },
  'ai-business': {
    slug: 'ai-business',
    label: 'AI Business Generator',
    description: 'Generate business names, startup names, brand names, slogans, taglines, product descriptions, and marketing copy.',
    category: 'Business',
    modes: [
      { id: 'business-name', label: 'Business Name Generator', description: 'Generate professional business names', configSlug: 'ai-business-name-generator' },
      { id: 'startup-name', label: 'Startup Name Generator', description: 'Create catchy startup names with modern suffixes', configSlug: 'ai-startup-name-generator' },
      { id: 'brand-name', label: 'Brand Name Generator', description: 'Generate memorable brand names', configSlug: 'ai-brand-name-generator' },
      { id: 'slogan', label: 'Slogan Generator', description: 'Create memorable slogans for your brand', configSlug: 'ai-slogan-generator' },
      { id: 'tagline', label: 'Tagline Generator', description: 'Generate compelling brand taglines', configSlug: 'ai-tagline-generator' },
      { id: 'product-description', label: 'Product Description', description: 'Write compelling product descriptions', configSlug: 'ai-product-description-generator' },
      { id: 'marketing-copy', label: 'Marketing Copy', description: 'Generate persuasive marketing copy', configSlug: 'ai-marketing-copy-generator' },
    ],
    placeholder: 'Enter your industry, product, or brand details...',
    example: 'coffee shop',
    inputType: 'text',
    showCharCounter: true,
  },
  'ai-email': {
    slug: 'ai-email',
    label: 'AI Email Writer',
    description: 'Write professional emails, cold outreach, follow-ups, and professional replies for any business situation.',
    category: 'Email',
    modes: [
      { id: 'email-writer', label: 'Email Writer', description: 'Write professional emails for any purpose', configSlug: 'ai-email-writer' },
      { id: 'cold-email', label: 'Cold Email Generator', description: 'Create effective cold outreach emails', configSlug: 'ai-cold-email-generator' },
      { id: 'follow-up', label: 'Follow-up Email', description: 'Generate polite follow-up emails', configSlug: 'ai-follow-up-email-generator' },
      { id: 'professional-reply', label: 'Professional Reply', description: 'Craft professional email replies', configSlug: 'ai-professional-reply-generator' },
    ],
    placeholder: 'Enter email purpose, product details, or paste received email...',
    example: 'request a meeting with the design team',
    inputType: 'textarea',
    showCharCounter: true,
  },
  'ai-career': {
    slug: 'ai-career',
    label: 'AI Career Assistant',
    description: 'Generate resume summaries, cover letters, job descriptions, and interview questions for career advancement.',
    category: 'Career',
    modes: [
      { id: 'resume-summary', label: 'Resume Summary', description: 'Generate professional resume summaries', configSlug: 'ai-resume-summary-generator' },
      { id: 'cover-letter', label: 'Cover Letter', description: 'Create tailored cover letters', configSlug: 'ai-cover-letter-generator' },
      { id: 'job-description', label: 'Job Description', description: 'Write comprehensive job descriptions', configSlug: 'ai-job-description-generator' },
      { id: 'interview-questions', label: 'Interview Questions', description: 'Generate role-specific interview questions', configSlug: 'ai-interview-questions-generator' },
    ],
    placeholder: 'Enter job title, company, or your skills...',
    example: 'Software Engineer at Google',
    inputType: 'text',
    showCharCounter: true,
  },
  'ai-ecommerce': {
    slug: 'ai-ecommerce',
    label: 'AI E-commerce Generator',
    description: 'Create product listings for Amazon, Shopify, Etsy, and eBay with optimized titles, descriptions, and keywords.',
    category: 'E-commerce',
    modes: [
      { id: 'amazon-listing', label: 'Amazon Listing', description: 'Generate optimized Amazon product listings', configSlug: 'ai-amazon-listing-generator' },
      { id: 'shopify-description', label: 'Shopify Description', description: 'Create compelling Shopify product descriptions', configSlug: 'ai-shopify-product-description-generator' },
      { id: 'etsy-description', label: 'Etsy Description', description: 'Write Etsy product descriptions that sell', configSlug: 'ai-etsy-product-description-generator' },
      { id: 'ebay-listing', label: 'eBay Listing', description: 'Generate complete eBay listings', configSlug: 'ai-ebay-listing-generator' },
    ],
    placeholder: 'Enter product name and features (separated by |)...',
    example: 'Bluetooth Speaker | waterproof, 20h battery, deep bass',
    inputType: 'text',
    showCharCounter: true,
  },
};

// Helper to get the generation function for a mode
export function getConsolidatedGenerator(consolidatedSlug: string, modeId: string): ((input: string) => string) | undefined {
  const tool = consolidatedAiTools[consolidatedSlug];
  if (!tool) return undefined;
  
  const mode = tool.modes.find(m => m.id === modeId);
  if (!mode) return undefined;
  
  const originalConfig = aiConfigs[mode.configSlug];
  if (!originalConfig) return undefined;
  
  return originalConfig.generate;
}

// Helper to get mode config for UI
export function getModeConfig(consolidatedSlug: string, modeId: string): GenConfig | undefined {
  const tool = consolidatedAiTools[consolidatedSlug];
  if (!tool) return undefined;
  
  const mode = tool.modes.find(m => m.id === modeId);
  if (!mode) return undefined;
  
  return aiConfigs[mode.configSlug];
}

// Get all consolidated tool slugs
export function getConsolidatedToolSlugs(): string[] {
  return Object.keys(consolidatedAiTools);
}

// Check if a slug is a consolidated tool
export function isConsolidatedTool(slug: string): boolean {
  return slug in consolidatedAiTools;
}

// Get the default mode for a consolidated tool
export function getDefaultMode(consolidatedSlug: string): string | undefined {
  const tool = consolidatedAiTools[consolidatedSlug];
  return tool?.modes[0]?.id;
}