import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { OfficeTool } from '@/components/office/office-tool';
import { officeToolConfigs } from '@/lib/office-configs';

export const metadata = buildToolMetadata(
  'pdf-to-powerpoint',
  'PDF to PowerPoint (Text Extraction)',
  'Extract text content from PDF for use in presentations.'
);

const relatedSlugs = ['pdf-to-word', 'pdf-to-excel', 'powerpoint-to-pdf'];

export default function PdfToPowerpointPage() {
  return (
    <ToolPageTemplate
      slug="pdf-to-powerpoint"
      relatedSlugs={relatedSlugs}
      blurColor="bg-red-400/20"
      seo={{
        whatIs: `The PDF to PowerPoint tool extracts text content from PDF files for use in presentation applications. It does not perform true page-to-slide conversion with preserved layout — it extracts text that you can then manually organize into slides. For actual PDF-to-PowerPoint conversion with preserved layouts, you would need a specialized conversion library or service. All processing happens locally in your browser.`,
        howTo: [
          'Upload a PDF file.',
          'Click Convert to extract text content.',
          'Download the extracted text and manually create slides in PowerPoint.'
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser. Your data never leaves your device.' },
          { title: 'Text extraction', description: 'Extracts text content from PDF for manual slide creation.' },
          { title: 'No software needed', description: 'Runs entirely in your browser with no downloads or plugins required.' },
        ],
        faqs: [
          { q: 'Is the PDF to PowerPoint tool free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does it preserve slide layouts and formatting?', a: 'No. This tool extracts raw text only. It does not convert PDF pages to PowerPoint slides with preserved layouts, images, or formatting. You will need to manually create slides in PowerPoint.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'What file formats are supported?', a: 'Input: .pdf. Output: .pptx (text content only, no slide layout).' },
        ],
      }}
    >
      <OfficeTool config={officeToolConfigs['pdf-to-powerpoint']} />
    </ToolPageTemplate>
  );
}
