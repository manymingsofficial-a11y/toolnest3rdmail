import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { Base32Decoder } from '@/components/security/security-tools-extra';

export const metadata = buildToolMetadata(
  'base32-decoder',
  'Base32 Decoder',
  'Decode Base32 encoded text back to plain text.'
);

const relatedSlugs = ['base32-encoder', 'url-encoder', 'password-decryptor'];

export default function Base32DecoderPage() {
  return (
    <ToolPageTemplate
      slug="base32-decoder"
      relatedSlugs={relatedSlugs}
      blurColor="bg-teal-400/20"
      seo={{
        whatIs: `The Base32 Decoder is a free online tool that works entirely in your browser. ToolNest's Base32 Decoder lets you decode base32 encoded text back to plain text. All processing happens locally — no uploads, no registration, no watermarks.`,
        howTo: [
        'Upload or enter your input data.',
        'Adjust any settings if needed.',
        'Click the action button to process.',
        'Download or copy your result.',
      ],
        benefits: [
        { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
        { title: 'Privacy first', description: 'All processing happens in your browser. Your data never leaves your device.' },
        { title: 'Fast and easy', description: 'No learning curve. Open the tool, use it, and get your result instantly.' },
        { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
      ],
        faqs: [
        { q: 'Is the Base32 Decoder free to use?', a: 'Yes, it is completely free with no limits, no registration, and no watermarks.' },
        { q: 'Does the tool upload my data?', a: 'No. All processing happens locally in your browser. Your data is never sent to a server.' },
        { q: 'Does the Base32 Decoder work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Do I need to create an account?', a: 'No account is needed. Just open the tool and start using it immediately.' },
      ],
      }}
    >
      <Base32Decoder />
    </ToolPageTemplate>
  );
}
