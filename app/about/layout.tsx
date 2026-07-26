import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About ToolNest — Free Online Tools for Everyone',
  description:
    'ToolNest is a free platform with 500+ online tools for PDF, image, QR, SEO, AI, text, developer, calculators and more. Learn about our mission.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
