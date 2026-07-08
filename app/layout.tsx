import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';

import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://toolnest.com'),
  title: 'ToolNest — 500+ Free Online Tools in One Place',
  description:
    'A complete multi-tools platform with 500+ free online tools — PDF, image, QR & barcode, SEO, AI, text, developer, calculators, converters and more. Fast, secure, no registration required.',
  openGraph: {
    title: 'ToolNest — 500+ Free Online Tools in One Place',
    description:
      'PDF, image, QR, developer, calculators and more — 500+ free online tools in one place. Fast, secure, no sign-up.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ToolNest',
    description:
      '500+ free online tools in one place. Fast, secure, no registration required.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen page-fade">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
