import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { OgPreview } from '@/components/web/og-preview';

export const metadata = buildToolMetadata(
  'open-graph-preview',
  'Open Graph Preview',
  'Preview how your website appears on social media by pasting your page HTML.'
);

const relatedSlugs = ['url-preview', 'website-screenshot', 'open-graph-generator'];

export default function OpenGraphPreviewPage() {
  return (
    <ToolPageTemplate
      slug="open-graph-preview"
      relatedSlugs={relatedSlugs}
      blurColor="bg-teal-400/20"
      seo={{
        whatIs: `The Open Graph Preview tool parses Open Graph (og:) and Twitter Card (twitter:) meta tags from HTML you paste into the tool. It extracts og:title, og:description, og:image, og:url, og:type, twitter:card, and related tags, then renders a visual social media preview card showing how your page would appear when shared. The tool works entirely in your browser using DOMParser — no server-side fetching is involved.`,
        howTo: [
          'Copy the HTML of your page (or just the <head> section containing the meta tags).',
          'Paste the HTML into the text area.',
          'Click Preview Tags to parse the Open Graph and Twitter Card meta tags.',
          'Review the visual preview card and the detected/missing tags list.',
          'Follow the recommendations to add any missing og: or twitter: tags to your page.',
        ],
        benefits: [
          { title: 'Visual social preview', description: 'See a realistic preview card showing how your page title, description, and image will appear when shared on Facebook, LinkedIn, and other platforms that use Open Graph tags.' },
          { title: 'Detects missing tags', description: 'The tool lists all detected and missing Open Graph and Twitter Card tags, with specific recommendations for which tags to add and what values they should contain.' },
          { title: 'Paste HTML — no URL needed', description: 'Browser CORS restrictions prevent fetching HTML from external URLs. Instead, paste your page HTML directly. This gives you the same preview without any backend dependency.' },
          { title: 'Twitter Card support', description: 'In addition to Open Graph tags, the tool checks for twitter:card, twitter:title, twitter:description, and twitter:image tags used by Twitter/X for link previews.' },
        ],
        faqs: [
          { q: 'Why can\'t I enter a URL to preview?', a: 'Browser JavaScript cannot fetch HTML from external URLs due to CORS restrictions. To preview a page, paste its HTML into the tool. If you need to preview a URL you don\'t control, use Facebook\'s Sharing Debugger which fetches pages server-side.' },
          { q: 'What Open Graph tags should I have?', a: 'At minimum: og:title, og:description, og:image, and og:url. For best results, also include og:type and og:image:width and og:image:height. For Twitter/X, add twitter:card set to summary_large_image, plus twitter:title and twitter:description.' },
          { q: 'What image size should I use for social previews?', a: '1200x630 pixels for Open Graph (Facebook, LinkedIn). 1200x600 for Twitter summary_large_image cards. Use JPG or PNG, ideally under 1MB for fast loading.' },
          { q: 'Why does my preview not match what I see on Facebook?', a: 'Social platforms cache link previews. After updating your tags, use Facebook\'s Sharing Debugger to force a refresh. The cache may persist for 24-72 hours. This tool shows what your tags will produce — the social platform\'s cache may lag behind.' },
          { q: 'Can I preview a page that requires login?', a: 'No. Social platform crawlers fetch pages as public visitors. Pages behind authentication cannot be previewed. Paste the HTML directly if you have access to the page source.' },
        ],
      }}
    >
      <OgPreview />
    </ToolPageTemplate>
  );
}
