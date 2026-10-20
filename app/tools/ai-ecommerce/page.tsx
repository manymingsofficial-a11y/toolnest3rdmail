import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { ConsolidatedAiGenerator } from '@/components/ai/consolidated-ai-generator';

export const metadata = buildToolMetadata(
  'ai-ecommerce',
  'AI E-commerce Generator (Template)',
  'creates product listings for Amazon, Shopify, Etsy, and eBay with optimized titles, descriptions, and keywords using templates'
);

const relatedSlugs = ['ai-business', 'ai-seo-tools', 'ai-social-media'];

export default function AiEcommercePage() {
  return (
    <ToolPageTemplate
      slug="ai-ecommerce"
      relatedSlugs={relatedSlugs}
      blurColor="bg-orange-400/20"
      seo={{
        whatIs: `The AI E-commerce Generator (Template) is a free browser-based template generator that creates e-commerce product listings for Amazon, Shopify, Etsy, and eBay with optimized titles, descriptions, and keywords. All generation happens locally in your browser using predefined templates and rule-based logic — no AI models, no paid APIs, no server calls.`,
        howTo: [
          'Select an e-commerce mode from the dropdown (e.g., Amazon Listing, Shopify Description, Etsy Description, eBay Listing).',
          'Enter your product name and features (separated by |) in the field provided.',
          'Click Generate to create the product listing using templates.',
          'Review the generated result and edit if needed.',
          'Copy the result to your clipboard and use it for your product listing.'
        ],
        benefits: [
          { title: '4 e-commerce tools in one', description: 'Access Amazon, Shopify, Etsy, and eBay listing generators from a single interface.' },
          { title: 'Free and unlimited', description: 'Use all modes as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser. Your data never leaves your device.' },
          { title: 'Platform-optimized templates', description: 'Templates tailored for each marketplace\'s best practices and algorithms.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' }
        ],
        faqs: [
          { q: 'Is the AI E-commerce Generator free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does this tool use AI?', a: 'No. This is a template-based generator that uses predefined patterns and rule-based logic. It does not use any AI models, LLMs, or paid APIs.' },
          { q: 'How many e-commerce modes are included?', a: '4 modes: Amazon Listing Generator, Shopify Product Description Generator, Etsy Product Description Generator, and eBay Listing Generator.' },
          { q: 'What format should I use for product features?', a: 'Use "Product Name | feature1, feature2, feature3" format. Example: "Bluetooth Speaker | waterproof, 20h battery, deep bass"' },
          { q: 'Does the tool work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' }
        ],
      }}
    >
      <ConsolidatedAiGenerator slug="ai-ecommerce" />
    </ToolPageTemplate>
  );
}