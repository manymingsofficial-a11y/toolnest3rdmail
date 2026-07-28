import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { OfficeTool } from '@/components/office/office-tool';
import { officeToolConfigs } from '@/lib/office-configs';

export const metadata = buildToolMetadata(
  'csv-editor',
  'CSV Editor',
  'Edit CSV data in a spreadsheet-like interface.'
);

const relatedSlugs = ['csv-viewer', 'csv-split', 'csv-merge'];

export default function CsvEditorPage() {
  return (
    <ToolPageTemplate
      slug="csv-editor"
      relatedSlugs={relatedSlugs}
      blurColor="bg-cyan-400/20"
      seo={{
        whatIs: `The CSV Editor is a free online tool that works entirely in your browser. ToolNest's CSV Editor lets you edit csv data in a spreadsheet-like interface. All processing happens locally — no uploads, no registration, no paid APIs.`,
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
        { q: 'Is the CSV Editor free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does the CSV Editor work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
        { q: 'Do I need to install any software?', a: 'No. The CSV Editor runs entirely in your browser with no downloads or plugins required.' },
      ],
      }}
    >
      <OfficeTool config={officeToolConfigs['csv-editor']} />
    </ToolPageTemplate>
  );
}
