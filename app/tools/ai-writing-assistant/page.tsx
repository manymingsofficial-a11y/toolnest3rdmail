import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { ConsolidatedAiGenerator } from '@/components/ai/consolidated-ai-generator';

export const metadata = buildToolMetadata(
  'ai-writing-assistant',
  'AI Writing Assistant (Template)',
  'generates blog titles, outlines, articles, paragraphs, and improves text with grammar, summarization, expansion, simplification, and humanization using templates'
);

const relatedSlugs = ['ai-seo-tools', 'ai-social-media', 'ai-email'];

export default function AiWritingAssistantPage() {
  return (
    <ToolPageTemplate
      slug="ai-writing-assistant"
      relatedSlugs={relatedSlugs}
      blurColor="bg-violet-400/20"
      seo={{
        whatIs: `The AI Writing Assistant (Template) is a free browser-based template generator that helps with various writing tasks including blog titles, outlines, article ideas, paragraphs, sentence rewriting, grammar improvement, text summarization, expansion, simplification, and humanization. All generation happens locally in your browser using predefined templates and rule-based logic — no AI models, no paid APIs, no server calls.`,
        howTo: [
          'Select a writing mode from the dropdown (e.g., Blog Title Generator, Paragraph Generator, Grammar Improver).',
          'Enter your input in the field provided — topic, text, or sentence depending on the mode.',
          'Click Generate to create the output using templates.',
          'Review the generated result and edit if needed.',
          'Copy the result to your clipboard or download it.'
        ],
        benefits: [
          { title: '10 writing tools in one', description: 'Access blog titles, outlines, articles, paragraphs, grammar, summarization, expansion, simplification, and humanization from a single interface.' },
          { title: 'Free and unlimited', description: 'Use all modes as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser. Your data never leaves your device.' },
          { title: 'Fast and easy', description: 'No learning curve. Select a mode, enter input, and get results instantly.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' }
        ],
        faqs: [
          { q: 'Is the AI Writing Assistant free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does this tool use AI?', a: 'No. This is a template-based generator that uses predefined patterns and rule-based logic. It does not use any AI models, LLMs, or paid APIs.' },
          { q: 'How many writing modes are included?', a: '10 modes: Blog Title Generator, Blog Outline Generator, Article Idea Generator, Paragraph Generator, Sentence Rewriter, Grammar Improver, Text Summarizer, Text Expander, Text Simplifier, and Text Humanizer.' },
          { q: 'Does the tool work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' }
        ],
      }}
    >
      <ConsolidatedAiGenerator slug="ai-writing-assistant" />
    </ToolPageTemplate>
  );
}