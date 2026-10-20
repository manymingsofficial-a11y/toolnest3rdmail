/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  poweredByHeader: false,
  compress: true,
  webpack: (config) => {
    config.parallelism = 1;
    return config;
  },
  async redirects() {
    return [
      // ai-writing-assistant (10 tools)
      { source: '/tools/ai-blog-title-generator', destination: '/tools/ai-writing-assistant?mode=blog-title', permanent: true },
      { source: '/tools/ai-blog-outline-generator', destination: '/tools/ai-writing-assistant?mode=blog-outline', permanent: true },
      { source: '/tools/ai-article-idea-generator', destination: '/tools/ai-writing-assistant?mode=article-idea', permanent: true },
      { source: '/tools/ai-paragraph-generator', destination: '/tools/ai-writing-assistant?mode=paragraph', permanent: true },
      { source: '/tools/ai-sentence-rewriter', destination: '/tools/ai-writing-assistant?mode=sentence-rewriter', permanent: true },
      { source: '/tools/ai-grammar-improver', destination: '/tools/ai-writing-assistant?mode=grammar-improver', permanent: true },
      { source: '/tools/ai-summarizer', destination: '/tools/ai-writing-assistant?mode=summarizer', permanent: true },
      { source: '/tools/ai-expand-text', destination: '/tools/ai-writing-assistant?mode=expand-text', permanent: true },
      { source: '/tools/ai-simplify-text', destination: '/tools/ai-writing-assistant?mode=simplify-text', permanent: true },
      { source: '/tools/ai-humanize-text', destination: '/tools/ai-writing-assistant?mode=humanize-text', permanent: true },

      // ai-seo-tools (8 tools)
      { source: '/tools/ai-meta-title-generator', destination: '/tools/ai-seo-tools?mode=meta-title', permanent: true },
      { source: '/tools/ai-meta-description-generator', destination: '/tools/ai-seo-tools?mode=meta-description', permanent: true },
      { source: '/tools/ai-keyword-generator', destination: '/tools/ai-seo-tools?mode=keywords', permanent: true },
      { source: '/tools/ai-faq-generator', destination: '/tools/ai-seo-tools?mode=faq', permanent: true },
      { source: '/tools/ai-seo-outline-generator', destination: '/tools/ai-seo-tools?mode=seo-outline', permanent: true },
      { source: '/tools/ai-slug-generator-pro', destination: '/tools/ai-seo-tools?mode=slug', permanent: true },
      { source: '/tools/ai-product-schema-writer', destination: '/tools/ai-seo-tools?mode=product-schema', permanent: true },
      { source: '/tools/ai-alt-text-generator', destination: '/tools/ai-seo-tools?mode=alt-text', permanent: true },

      // ai-social-media (8 tools)
      { source: '/tools/ai-instagram-caption-generator', destination: '/tools/ai-social-media?mode=instagram-caption', permanent: true },
      { source: '/tools/ai-facebook-caption-generator', destination: '/tools/ai-social-media?mode=facebook-caption', permanent: true },
      { source: '/tools/ai-linkedin-post-generator', destination: '/tools/ai-social-media?mode=linkedin-post', permanent: true },
      { source: '/tools/ai-tweet-generator', destination: '/tools/ai-social-media?mode=tweet', permanent: true },
      { source: '/tools/ai-pinterest-pin-title-generator', destination: '/tools/ai-social-media?mode=pinterest-title', permanent: true },
      { source: '/tools/ai-pinterest-description-generator', destination: '/tools/ai-social-media?mode=pinterest-description', permanent: true },
      { source: '/tools/ai-hashtag-generator', destination: '/tools/ai-social-media?mode=hashtags', permanent: true },
      { source: '/tools/ai-social-bio-generator', destination: '/tools/ai-social-media?mode=social-bio', permanent: true },

      // ai-youtube (6 tools)
      { source: '/tools/ai-youtube-title-generator', destination: '/tools/ai-youtube?mode=youtube-title', permanent: true },
      { source: '/tools/ai-youtube-description-generator', destination: '/tools/ai-youtube?mode=youtube-description', permanent: true },
      { source: '/tools/ai-video-hook-generator', destination: '/tools/ai-youtube?mode=video-hook', permanent: true },
      { source: '/tools/ai-video-script-generator', destination: '/tools/ai-youtube?mode=video-script', permanent: true },
      { source: '/tools/ai-shorts-caption-generator', destination: '/tools/ai-youtube?mode=shorts-caption', permanent: true },
      { source: '/tools/ai-thumbnail-text-generator', destination: '/tools/ai-youtube?mode=thumbnail-text', permanent: true },

      // ai-business (7 tools)
      { source: '/tools/ai-business-name-generator', destination: '/tools/ai-business?mode=business-name', permanent: true },
      { source: '/tools/ai-startup-name-generator', destination: '/tools/ai-business?mode=startup-name', permanent: true },
      { source: '/tools/ai-brand-name-generator', destination: '/tools/ai-business?mode=brand-name', permanent: true },
      { source: '/tools/ai-slogan-generator', destination: '/tools/ai-business?mode=slogan', permanent: true },
      { source: '/tools/ai-tagline-generator', destination: '/tools/ai-business?mode=tagline', permanent: true },
      { source: '/tools/ai-product-description-generator', destination: '/tools/ai-business?mode=product-description', permanent: true },
      { source: '/tools/ai-marketing-copy-generator', destination: '/tools/ai-business?mode=marketing-copy', permanent: true },

      // ai-email (4 tools)
      { source: '/tools/ai-email-writer', destination: '/tools/ai-email?mode=email-writer', permanent: true },
      { source: '/tools/ai-cold-email-generator', destination: '/tools/ai-email?mode=cold-email', permanent: true },
      { source: '/tools/ai-follow-up-email-generator', destination: '/tools/ai-email?mode=follow-up', permanent: true },
      { source: '/tools/ai-professional-reply-generator', destination: '/tools/ai-email?mode=professional-reply', permanent: true },

      // ai-career (4 tools)
      { source: '/tools/ai-resume-summary-generator', destination: '/tools/ai-career?mode=resume-summary', permanent: true },
      { source: '/tools/ai-cover-letter-generator', destination: '/tools/ai-career?mode=cover-letter', permanent: true },
      { source: '/tools/ai-job-description-generator', destination: '/tools/ai-career?mode=job-description', permanent: true },
      { source: '/tools/ai-interview-questions-generator', destination: '/tools/ai-career?mode=interview-questions', permanent: true },

      // ai-ecommerce (4 tools)
      { source: '/tools/ai-amazon-listing-generator', destination: '/tools/ai-ecommerce?mode=amazon-listing', permanent: true },
      { source: '/tools/ai-shopify-product-description-generator', destination: '/tools/ai-ecommerce?mode=shopify-description', permanent: true },
      { source: '/tools/ai-etsy-product-description-generator', destination: '/tools/ai-ecommerce?mode=etsy-description', permanent: true },
      { source: '/tools/ai-ebay-listing-generator', destination: '/tools/ai-ecommerce?mode=ebay-listing', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // Content Security Policy - Report Only mode for safe testing
          // Allows: inline scripts for JSON-LD, Google AdSense, Google Fonts, inline styles, Vercel Speed Insights, FFmpeg CDN
          {
            key: 'Content-Security-Policy-Report-Only',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://va.vercel-scripts.com https://unpkg.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://*.supabase.co https://vitals.vercel-insights.com https://pagead2.googlesyndication.com",
              "frame-src 'self' https://www.google.com https://googleads.g.doubleclick.net",
              "base-uri 'self'",
              "form-action 'self'",
              "report-uri /api/csp-report",
            ].join('; '),
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;