import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { AudioReverser } from '@/components/audio/audio-reverser';
import { audioToolConfigs } from '@/lib/audio-configs';

export const metadata = buildToolMetadata(
  'audio-reverser',
  'Audio Reverser',
  'Play audio backwards. Reverse the entire audio file. Free, runs in browser with FFmpeg.'
);

const relatedSlugs = ['audio-trimmer', 'audio-cutter', 'reverse-audio'];

export default function AudioReverserPage() {
  return (
    <ToolPageTemplate
      slug="audio-reverser"
      relatedSlugs={relatedSlugs}
      blurColor="bg-purple-400/20"
      seo={{
        whatIs: `The Audio Reverser is a free online tool that plays audio backwards. Upload any audio file (MP3, WAV, OGG, M4A, FLAC) and get a fully reversed version — all processing happens locally in your browser using FFmpeg.wasm with no uploads, no registration, and no paid APIs. The audio samples are reversed using FFmpeg's areverse filter, and the output is re-encoded to your chosen format.`,
        howTo: [
          'Upload an audio file (MP3, WAV, OGG, M4A, FLAC) by dragging it into the upload area or clicking to browse.',
          'Select output format (MP3, WAV, AAC, FLAC, Opus, OGG).',
          'Click "Reverse Audio" to process using FFmpeg.wasm with the areverse filter.',
          'Preview the reversed audio and download it.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your audio never leaves your device.' },
          { title: 'True audio reversal', description: 'Uses FFmpeg\'s areverse filter to actually reverse the audio samples, not just play backwards.' },
          { title: 'Multiple output formats', description: 'Choose from MP3, WAV, AAC, FLAC, Opus, or OGG output.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Audio Reverser free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does reversing audio reduce quality?', a: 'The audio is re-encoded to the selected output format. For lossless formats (WAV, FLAC), quality is preserved. For lossy formats (MP3, AAC), there may be minimal quality loss from re-encoding.' },
          { q: 'Can I reverse just part of the audio?', a: 'This tool reverses the entire audio file. For partial reversal, use the Audio Trimmer first, then reverse the segment.' },
          { q: 'What formats are supported?', a: 'MP3, WAV, OGG, M4A, FLAC input. Output: MP3, WAV, AAC, FLAC, Opus, OGG.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The Audio Reverser runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <AudioReverser />
    </ToolPageTemplate>
  );
}