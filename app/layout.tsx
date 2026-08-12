import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Space_Grotesk } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { ThemeProvider } from '@/components/theme-provider';
import { PublicChrome } from '@/components/public-chrome';
import { AnalyticsHead, AnalyticsBody } from '@/components/analytics';
import { generateWebsiteJsonLd, generateOrganizationJsonLd } from '@/lib/seo';
import { fetchSiteSettings, fetchSeoSettings, fetchTools, fetchSearchIndex } from '@/lib/public-data';
import { tools as staticTools, categories as staticCategories } from '@/lib/data';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export async function generateMetadata(): Promise<Metadata> {
  const [siteSettings, seoSettings, tools] = await Promise.all([
    fetchSiteSettings(),
    fetchSeoSettings(),
    fetchTools(),
  ]);

  const siteName = siteSettings?.websiteName ?? 'ToolNest';
  const toolCount = tools.length;
  const defaultTitle = seoSettings?.defaultTitle ?? `${siteName} — Free Online Tools`;
  const defaultDescription = seoSettings?.defaultDescription ?? `${siteName} provides ${toolCount} free online tools across ${staticCategories.length} categories — PDF, image, QR & barcode, SEO, AI, text, developer, calculators, converters and more. Fast, secure, no registration required.`;
  const keywords = seoSettings?.defaultKeywords ?? ['free online tools', 'PDF tools', 'image tools', 'QR code generator', 'ToolNest'];
  const canonicalBaseUrl = seoSettings?.canonicalBaseUrl ?? 'https://freetoolnest.vercel.app';
  const ogSiteName = seoSettings?.openGraphDefaults.siteName ?? siteName;
  const ogLocale = seoSettings?.openGraphDefaults.locale ?? 'en_US';
  const twitterHandle = seoSettings?.twitterDefaults.handle ?? '@toolnest';

  return {
    metadataBase: new URL(canonicalBaseUrl),
    title: {
      default: defaultTitle,
      template: `%s — ${siteName}`,
    },
    description: defaultDescription,
    keywords,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    alternates: { canonical: '/' },
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      type: 'website',
      locale: ogLocale,
      siteName: ogSiteName,
      url: canonicalBaseUrl,
      images: [{ url: '/logo.png', width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description: defaultDescription,
      creator: twitterHandle,
      images: ['/logo.png'],
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
    category: 'technology',
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#ffffff' },
      { media: '(prefers-color-scheme: dark)', color: '#0a0e1a' },
    ],
    viewport: {
      width: 'device-width',
      initialScale: 1,
    },
    verification: {
      google: 'oiIIufhM955EapUquJhv6nTGmAS0HMn4cQkAi6P93QM',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteJsonLd = generateWebsiteJsonLd();
  const organizationJsonLd = generateOrganizationJsonLd();

  let searchIndex;
  try {
    searchIndex = await fetchSearchIndex();
    if (searchIndex.tools.length === 0 && searchIndex.categories.length === 0) {
      searchIndex = { tools: staticTools, categories: staticCategories };
    }
  } catch {
    searchIndex = { tools: staticTools, categories: staticCategories };
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="google-adsense-account" content="ca-pub-4962794944464816" />
        <AnalyticsHead />
        <Script
          id="adsbygoogle"
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4962794944464816"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg"
          >
            Skip to content
          </a>
          <PublicChrome searchIndex={searchIndex}>{children}</PublicChrome>
        </ThemeProvider>
        <AnalyticsBody />
        <SpeedInsights />
      </body>
    </html>
  );
}
