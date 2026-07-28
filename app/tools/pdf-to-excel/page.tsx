import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { OfficeTool } from '@/components/office/office-tool';
import { officeToolConfigs } from '@/lib/office-configs';

export const metadata = buildToolMetadata(
  'pdf-to-excel',
  'PDF to Excel',
  'Extract tables from PDF into XLSX format.'
);

const relatedSlugs = ['pdf-to-word', 'csv-viewer', 'excel-to-pdf'];

export default function PdfToExcelPage() {
  return (
    <ToolPageTemplate
      slug="pdf-to-excel"
      relatedSlugs={relatedSlugs}
      blurColor="bg-blue-400/20"
      seo={{
        whatIs: `The PDF to Excel is a free online tool that works entirely in your browser. ToolNest's PDF to Excel lets you extract tables from pdf into xlsx format. All processing happens locally — no uploads, no registration, no paid APIs.`,
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
        { q: 'Is the PDF to Excel free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does the PDF to Excel work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
        { q: 'Do I need to install any software?', a: 'No. The PDF to Excel runs entirely in your browser with no downloads or plugins required.' },
      ],
      }}
    >
      <OfficeTool config={officeToolConfigs['pdf-to-excel']} />
    </ToolPageTemplate>
  );
}
