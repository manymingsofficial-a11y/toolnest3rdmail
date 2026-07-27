import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { TextRepeater } from '@/components/text/text-tools-extra';

export const metadata = buildToolMetadata(
  'text-repeater',
  'Text Repeater',
  'Repeat any text multiple times with custom separators.'
);

const relatedSlugs = ['word-counter', 'text-reverser', 'case-converter'];

export default function TextRepeaterPage() {
  return (
    <ToolPageTemplate
      slug="text-repeater"
      relatedSlugs={relatedSlugs}
      blurColor="bg-sky-400/20"
      seo={{
        whatIs: `The Text Repeater is a free online tool that works entirely in your browser. ToolNest's Text Repeater lets you repeat any text multiple times with custom separators. All processing happens locally — no uploads, no registration, no watermarks.`,
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
        { q: 'Is the Text Repeater free to use?', a: 'Yes, it is completely free with no limits, no registration, and no watermarks.' },
        { q: 'Does the tool upload my data?', a: 'No. All processing happens locally in your browser. Your data is never sent to a server.' },
        { q: 'Does the Text Repeater work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Do I need to create an account?', a: 'No account is needed. Just open the tool and start using it immediately.' },
      ],
      }}
    >
      <TextRepeater />
    </ToolPageTemplate>
  );
}
