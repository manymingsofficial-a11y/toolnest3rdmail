import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { AreaConverter } from '@/components/calc/converters-extra';

export const metadata = buildToolMetadata(
  'area-converter',
  'Area Converter',
  'Convert between square metres, acres, hectares and more.'
);

const relatedSlugs = ['length-converter', 'volume-converter', 'weight-converter'];

export default function AreaConverterPage() {
  return (
    <ToolPageTemplate
      slug="area-converter"
      relatedSlugs={relatedSlugs}
      blurColor="bg-emerald-400/20"
      seo={{
        whatIs: `The Area Converter is a free online tool that works entirely in your browser. ToolNest's Area Converter lets you convert between square metres, acres, hectares and more. All processing happens locally — no uploads, no registration, no watermarks.`,
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
        { q: 'Is the Area Converter free to use?', a: 'Yes, it is completely free with no limits, no registration, and no watermarks.' },
        { q: 'Does the tool upload my data?', a: 'No. All processing happens locally in your browser. Your data is never sent to a server.' },
        { q: 'Does the Area Converter work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Do I need to create an account?', a: 'No account is needed. Just open the tool and start using it immediately.' },
      ],
      }}
    >
      <AreaConverter />
    </ToolPageTemplate>
  );
}
