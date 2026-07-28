import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { ProductivityTool } from '@/components/productivity/productivity-tool';
import { productivityToolConfigs } from '@/lib/productivity-configs';

export const metadata = buildToolMetadata(
  'to-do-list',
  'To Do List',
  'Create and manage tasks with a clean to-do list.'
);

const relatedSlugs = ['notes', 'pomodoro-timer', 'countdown-timer'];

export default function ToDoListPage() {
  return (
    <ToolPageTemplate
      slug="to-do-list"
      relatedSlugs={relatedSlugs}
      blurColor="bg-orange-400/20"
      seo={{
        whatIs: `The To Do List is a free online tool that works entirely in your browser. ToolNest's To Do List lets you create and manage tasks with a clean to-do list. All processing happens locally — no uploads, no registration, no paid APIs.`,
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
        { q: 'Is the To Do List free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does the To Do List work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
        { q: 'Do I need to install any software?', a: 'No. The To Do List runs entirely in your browser with no downloads or plugins required.' },
      ],
      }}
    >
      <ProductivityTool config={productivityToolConfigs['to-do-list']} />
    </ToolPageTemplate>
  );
}
