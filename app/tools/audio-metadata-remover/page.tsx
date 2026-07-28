import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { AudioTool } from '@/components/audio/audio-tool';
import { audioToolConfigs } from '@/lib/audio-configs';

export const metadata = buildToolMetadata(
  'audio-metadata-remover',
  'Audio Metadata Remover',
  'Remove ID3 tags and metadata from audio files.'
);

const relatedSlugs = ['audio-metadata-viewer', 'audio-compressor', 'video-metadata-remover'];

export default function AudioMetadataRemoverPage() {
  return (
    <ToolPageTemplate
      slug="audio-metadata-remover"
      relatedSlugs={relatedSlugs}
      blurColor="bg-green-400/20"
      seo={{
        whatIs: `The Audio Metadata Remover is a free online tool that works entirely in your browser. ToolNest's Audio Metadata Remover lets you remove id3 tags and metadata from audio files. All processing happens locally — no uploads, no registration, no paid APIs.`,
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
        { q: 'Is the Audio Metadata Remover free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
        { q: 'Does the Audio Metadata Remover work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
        { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
        { q: 'Do I need to install any software?', a: 'No. The Audio Metadata Remover runs entirely in your browser with no downloads or plugins required.' },
      ],
      }}
    >
      <AudioTool config={audioToolConfigs['audio-metadata-remover']} />
    </ToolPageTemplate>
  );
}
