import { tools, categories } from '@/lib/data';

export const faqs = [
  {
    q: 'Is ToolNest really free to use?',
    a: 'Yes. Every tool on ToolNest is completely free with no hidden charges, no premium tiers, and no registration required. Just pick a tool and start using it.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No account needed. All tools work instantly in your browser — no sign-up, no login, no email required. Your data never leaves your device for most tools.',
  },
  {
    q: 'Are my files safe when using the tools?',
    a: 'For the vast majority of tools (QR codes, calculators, formatters, generators), everything runs locally in your browser. File-based tools like image compression and PDF merge are processed securely and deleted automatically.',
  },
  {
    q: 'How many tools does ToolNest have?',
    a: `We currently offer ${tools.length} free tools across ${categories.length} categories including PDF, image, QR & barcode, SEO, AI, text, developer, calculators, converters, and more — with new tools added every week.`,
  },
  {
    q: 'Can I request a new tool?',
    a: 'Absolutely. If you need a tool that is not in the nest yet, head to the Contact page and tell us about it. We build the most-requested tools first.',
  },
  {
    q: 'Do the tools work on mobile?',
    a: 'Yes. Every tool is fully responsive and works on phones, tablets, and desktops. No app install required — just open the tool in your browser.',
  },
];
