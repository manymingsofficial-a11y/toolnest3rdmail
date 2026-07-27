import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { AiGenerator } from '@/components/ai/ai-generator';

export const metadata = buildToolMetadata(
  'ai-shopify-product-description-generator',
  'AI Shopify Product Description Generator',
  'Generate product descriptions for Shopify stores.'
);

const relatedSlugs = ['ai-amazon-listing-generator', 'ai-product-description-generator', 'ai-etsy-product-description-generator'];

export default function AiShopifyProductDescriptionGeneratorPage() {
  return (
    <ToolPageTemplate
      slug="ai-shopify-product-description-generator"
      relatedSlugs={relatedSlugs}
      blurColor="bg-green-400/20"
      seo={{
        whatIs: `The AI Shopify Product Description Generator is a free online AI tool that works entirely in your browser. ToolNest's AI Shopify Product Description Generator lets you generate product descriptions for shopify stores. All processing happens locally — no uploads, no registration, no paid APIs.`,
        howTo: [
        'Enter your topic or text in the input field.',
        'Click the Generate button.',
        'Review the generated content in the result area.',
        'Copy the result to your clipboard with one click.',
      ],
        benefits: [
        { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
        { title: 'Privacy first', description: 'All processing happens in your browser. Your data never leaves your device.' },
        { title: 'Fast and easy', description: 'No learning curve. Open the tool, use it, and get your result instantly.' },
        { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
      ],
        faqs: [
        { q: 'Is the AI Shopify Product Description Generator free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does this tool use paid AI APIs?', a: 'No. All generation happens in your browser using smart templates and rule-based logic. No OpenAI or paid services are used.' },
        { q: 'Does the AI Shopify Product Description Generator work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
      ],
      }}
    >
      <AiGenerator slug="ai-shopify-product-description-generator" />
    </ToolPageTemplate>
  );
}
