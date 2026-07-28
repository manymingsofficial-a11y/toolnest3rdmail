import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { VideoTool } from '@/components/video/video-tool';
import { videoToolConfigs } from '@/lib/video-configs';

export const metadata = buildToolMetadata(
  'video-trimmer',
  'Video Trimmer',
  'Trim and cut video to keep only the parts you need.'
);

const relatedSlugs = ['video-cutter', 'video-splitter', 'video-speed-controller'];

export default function VideoTrimmerPage() {
  return (
    <ToolPageTemplate
      slug="video-trimmer"
      relatedSlugs={relatedSlugs}
      blurColor="bg-orange-400/20"
      seo={{
        whatIs: `The Video Trimmer is a free online tool that works entirely in your browser. ToolNest's Video Trimmer lets you trim and cut video to keep only the parts you need. All processing happens locally — no uploads, no registration, no paid APIs.`,
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
        { q: 'Is the Video Trimmer free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does the Video Trimmer work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
        { q: 'Do I need to install any software?', a: 'No. The Video Trimmer runs entirely in your browser with no downloads or plugins required.' },
      ],
      }}
    >
      <VideoTool config={videoToolConfigs['video-trimmer']} />
    </ToolPageTemplate>
  );
}
