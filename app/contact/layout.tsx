import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact ToolNest — Get in Touch',
  description:
    'Contact the ToolNest team with questions, feedback, or feature requests. We would love to hear from you.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
