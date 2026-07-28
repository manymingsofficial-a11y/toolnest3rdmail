import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { OfficeTool } from '@/components/office/office-tool';
import { officeToolConfigs } from '@/lib/office-configs';

export const metadata = buildToolMetadata(
  'powerpoint-to-pdf',
  'PowerPoint to PDF',
  'Convert PPTX presentations to PDF.'
);

const relatedSlugs = ['word-to-pdf', 'excel-to-pdf', 'pdf-merge'];

export default function PowerpointToPdfPage() {
  return (
    <ToolPageTemplate
      slug="powerpoint-to-pdf"
      relatedSlugs={relatedSlugs}
      blurColor="bg-orange-400/20"
      seo={{
        whatIs: `The PowerPoint to PDF is a free online tool that works entirely in your browser. ToolNest's PowerPoint to PDF lets you convert pptx presentations to pdf. All processing happens locally — no uploads, no registration, no paid APIs.`,
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
        { q: 'Is the PowerPoint to PDF free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does the PowerPoint to PDF work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
        { q: 'Do I need to install any software?', a: 'No. The PowerPoint to PDF runs entirely in your browser with no downloads or plugins required.' },
      ],
      }}
    >
      <OfficeTool config={officeToolConfigs['powerpoint-to-pdf']} />
    </ToolPageTemplate>
  );
}
