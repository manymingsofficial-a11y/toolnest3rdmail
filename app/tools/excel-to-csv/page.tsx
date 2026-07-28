import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { OfficeTool } from '@/components/office/office-tool';
import { officeToolConfigs } from '@/lib/office-configs';

export const metadata = buildToolMetadata(
  'excel-to-csv',
  'Excel to CSV',
  'Convert XLSX spreadsheets to CSV format.'
);

const relatedSlugs = ['csv-to-excel', 'csv-viewer', 'excel-viewer'];

export default function ExcelToCsvPage() {
  return (
    <ToolPageTemplate
      slug="excel-to-csv"
      relatedSlugs={relatedSlugs}
      blurColor="bg-green-400/20"
      seo={{
        whatIs: `The Excel to CSV is a free online tool that works entirely in your browser. ToolNest's Excel to CSV lets you convert xlsx spreadsheets to csv format. All processing happens locally — no uploads, no registration, no paid APIs.`,
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
        { q: 'Is the Excel to CSV free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does the Excel to CSV work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
        { q: 'Do I need to install any software?', a: 'No. The Excel to CSV runs entirely in your browser with no downloads or plugins required.' },
      ],
      }}
    >
      <OfficeTool config={officeToolConfigs['excel-to-csv']} />
    </ToolPageTemplate>
  );
}
