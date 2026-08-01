import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { generateWebsiteJsonLd, generateOrganizationJsonLd } from '@/lib/seo';
import { tools } from '@/lib/data';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://toolnest.com'),
  title: {
    default: `ToolNest — ${tools.length} Free Online Tools in One Place`,
    template: '%s — ToolNest',
  },
  description:
    `A complete multi-tools platform with ${tools.length} free online tools — PDF, image, QR & barcode, SEO, AI, text, developer, calculators, converters and more. Fast, secure, no registration required.`,
  keywords: [
    'free online tools',
    'PDF tools',
    'image tools',
    'QR code generator',
    'barcode generator',
    'SEO tools',
    'developer tools',
    'calculators',
    'converters',
    'text tools',
    'password generator',
    'ToolNest',
  ],
  authors: [{ name: 'ToolNest' }],
  creator: 'ToolNest',
  publisher: 'ToolNest',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `ToolNest — ${tools.length} Free Online Tools in One Place`,
    description:
      `PDF, image, QR, developer, calculators and more — ${tools.length} free online tools in one place. Fast, secure, no sign-up.`,
    type: 'website',
    locale: 'en_US',
    siteName: 'ToolNest',
    url: 'https://toolnest.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: `ToolNest — ${tools.length} Free Online Tools`,
    description:
      `${tools.length} free online tools in one place. Fast, secure, no registration required.`,
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
  category: 'technology',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0e1a' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteJsonLd = generateWebsiteJsonLd();
  const organizationJsonLd = generateOrganizationJsonLd();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
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
          <Navbar />
          <main id="main-content" className="min-h-screen page-fade">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
