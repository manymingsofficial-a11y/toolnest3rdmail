import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { AudioTrimmer } from '@/components/audio/audio-trimmer';
import { audioToolConfigs } from '@/lib/audio-configs';

export const metadata = buildToolMetadata(
  'audio-trimmer',
  'Audio Trimmer',
  'Trim and cut audio files precisely. Free, fast, runs in your browser with FFmpeg.'
);

const relatedSlugs = ['audio-cutter', 'audio-merger', 'mp3-cutter'];

export default function AudioTrimmerPage() {
  return (
    <ToolPageTemplate
      slug="audio-trimmer"
      relatedSlugs={relatedSlugs}
      blurColor="bg-teal-400/20"
      seo={{
        whatIs: `The Audio Trimmer is a free online tool that trims audio files to keep only the parts you need. Upload any audio file (MP3, WAV, OGG, M4A, FLAC), set the exact start and end time using the intuitive slider or precise inputs, and extract that segment — all processing happens locally in your browser using FFmpeg.wasm with no uploads, no registration, and no paid APIs. The audio is re-encoded to your chosen output format.`,
        howTo: [
          'Upload an audio file (MP3, WAV, OGG, M4A, FLAC) by dragging it into the upload area or clicking to browse.',
          'Use the time range slider or numeric inputs to set the exact start and end time of the segment you want to keep.',
          'Select output format (MP3, WAV, AAC, FLAC, Opus, OGG).',
          'Click "Trim Audio" to extract the segment using FFmpeg.wasm.',
          'Preview the trimmed audio and download it.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your audio never leaves your device.' },
          { title: 'Multiple output formats', description: 'Choose from MP3, WAV, AAC, FLAC, Opus, or OGG output.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Audio Trimmer free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Can I trim to milliseconds precision?', a: 'Yes. The slider and numeric inputs support 0.1 second precision.' },
          { q: 'What output formats are supported?', a: 'MP3, WAV, AAC, FLAC, Opus, and OGG.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The Audio Trimmer runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <AudioTrimmer />
    </ToolPageTemplate>
  );
}