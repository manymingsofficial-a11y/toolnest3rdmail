import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { AudioTool } from '@/components/audio/audio-tool';
import { audioToolConfigs } from '@/lib/audio-configs';

export const metadata = buildToolMetadata(
  'audio-converter',
  'Audio Converter',
  'Convert audio between MP3, WAV, OGG and more.'
);

const relatedSlugs = ['mp3-cutter', 'audio-compressor', 'merge-audio'];

export default function AudioConverterPage() {
  return (
    <ToolPageTemplate
      slug="audio-converter"
      relatedSlugs={relatedSlugs}
      blurColor="bg-green-400/20"
      seo={{
        whatIs: `The Audio Converter is a free online tool that works entirely in your browser. ToolNest's Audio Converter lets you convert audio between mp3, wav, ogg and more. All processing happens locally — no uploads, no registration, no paid APIs.`,
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
        { q: 'Is the Audio Converter free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does the Audio Converter work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
        { q: 'Do I need to install any software?', a: 'No. The Audio Converter runs entirely in your browser with no downloads or plugins required.' },
      ],
      }}
    >
      <AudioTool config={audioToolConfigs['audio-converter']} />
    </ToolPageTemplate>
  );
}
