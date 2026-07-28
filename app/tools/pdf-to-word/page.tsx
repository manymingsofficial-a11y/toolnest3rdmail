import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { OfficeTool } from '@/components/office/office-tool';
import { officeToolConfigs } from '@/lib/office-configs';

export const metadata = buildToolMetadata(
  'pdf-to-word',
  'PDF to Word',
  'Convert PDF documents to editable DOCX files.'
);

const relatedSlugs = ['pdf-to-excel', 'pdf-to-powerpoint', 'word-to-pdf'];

export default function PdfToWordPage() {
  return (
    <ToolPageTemplate
      slug="pdf-to-word"
      relatedSlugs={relatedSlugs}
      blurColor="bg-indigo-400/20"
      seo={{
        whatIs: `The PDF to Word is a free online tool that works entirely in your browser. ToolNest's PDF to Word lets you convert pdf documents to editable docx files. All processing happens locally — no uploads, no registration, no paid APIs.`,
        howTo: [
        'Upload your file or enter your input.',
        'Adjust any settings if needed.',
        'Click the action button to process.',
        'Download or copy the result.',
      ],
        benefits: [
        { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
        { title: 'Privacy first', description: 'All processing happens in your browser. Your data never leaves your device.' },
        { title: 'Fast and easy', description: 'No learning curve. Open the tool, use it, and get your result instantly.' },
        { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
      ],
        faqs: [
        { q: 'Is the PDF to Word free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does the PDF to Word work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
        { q: 'Do I need to install any software?', a: 'No. The PDF to Word runs entirely in your browser with no downloads or plugins required.' },
      ],
      }}
    >
      <OfficeTool config={officeToolConfigs['pdf-to-word']} />
    </ToolPageTemplate>
  );
}
