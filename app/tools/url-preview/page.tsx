import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { WebTool } from '@/components/web/web-tool';
import { webToolConfigs } from '@/lib/web-configs';

export const metadata = buildToolMetadata(
  'url-preview',
  'URL Preview',
  'Preview meta tags and content for any URL.'
);

const relatedSlugs = ['open-graph-preview', 'website-screenshot', 'http-header-viewer'];

export default function UrlPreviewPage() {
  return (
    <ToolPageTemplate
      slug="url-preview"
      relatedSlugs={relatedSlugs}
      blurColor="bg-cyan-400/20"
      seo={{
        whatIs: `The URL Preview is a free online tool that works entirely in your browser. ToolNest's URL Preview lets you preview meta tags and content for any url. All processing happens locally — no uploads, no registration, no paid APIs.`,
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
        { q: 'Is the URL Preview free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does the URL Preview work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
        { q: 'Do I need to install any software?', a: 'No. The URL Preview runs entirely in your browser with no downloads or plugins required.' },
      ],
      }}
    >
      <WebTool config={webToolConfigs['url-preview']} />
    </ToolPageTemplate>
  );
}
