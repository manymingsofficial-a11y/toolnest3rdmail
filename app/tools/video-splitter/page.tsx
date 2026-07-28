import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { VideoTool } from '@/components/video/video-tool';
import { videoToolConfigs } from '@/lib/video-configs';

export const metadata = buildToolMetadata(
  'video-splitter',
  'Video Splitter',
  'Split a video into multiple equal or custom segments.'
);

const relatedSlugs = ['video-merger', 'video-cutter', 'video-trimmer'];

export default function VideoSplitterPage() {
  return (
    <ToolPageTemplate
      slug="video-splitter"
      relatedSlugs={relatedSlugs}
      blurColor="bg-rose-400/20"
      seo={{
        whatIs: `The Video Splitter is a free online tool that works entirely in your browser. ToolNest's Video Splitter lets you split a video into multiple equal or custom segments. All processing happens locally — no uploads, no registration, no paid APIs.`,
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
        { q: 'Is the Video Splitter free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does the Video Splitter work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
        { q: 'Do I need to install any software?', a: 'No. The Video Splitter runs entirely in your browser with no downloads or plugins required.' },
      ],
      }}
    >
      <VideoTool config={videoToolConfigs['video-splitter']} />
    </ToolPageTemplate>
  );
}
