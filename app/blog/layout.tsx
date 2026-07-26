import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — ToolNest Guides and Tutorials',
  description:
    'Read the ToolNest blog for guides, tutorials, and tips on using free online tools for PDF, image, QR, SEO, and more.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
