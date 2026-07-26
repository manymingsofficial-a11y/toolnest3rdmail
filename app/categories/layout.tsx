import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories — Browse Tools by Category',
  description:
    'Browse all tool categories on ToolNest — PDF, image, QR & barcode, SEO, AI, text, developer, calculators, converters and more.',
  alternates: {
    canonical: '/categories',
  },
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
