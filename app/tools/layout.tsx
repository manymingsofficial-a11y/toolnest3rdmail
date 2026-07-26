import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Tools — Browse 500+ Free Online Tools',
  description:
    'Browse and search every free online tool on ToolNest — PDF, image, QR, SEO, AI, text, developer, calculators, converters and more.',
  alternates: {
    canonical: '/tools',
  },
  openGraph: {
    title: 'All Tools — Browse 500+ Free Online Tools | ToolNest',
    description:
      'Browse and search every free online tool on ToolNest. Filter by category or search by name.',
    type: 'website',
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
