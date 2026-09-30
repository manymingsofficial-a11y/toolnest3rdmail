import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { AudioMerger } from '@/components/audio/audio-merger';
import { audioToolConfigs } from '@/lib/audio-configs';

export const metadata = buildToolMetadata(
  'audio-merger',
  'Audio Merger',
  'Combine multiple audio files into one. Reorder tracks, choose format. Free, runs in browser.'
);

const relatedSlugs = ['audio-cutter', 'audio-trimmer', 'merge-audio'];

export default function AudioMergerPage() {
  return (
    <ToolPageTemplate
      slug="audio-merger"
      relatedSlugs={relatedSlugs}
      blurColor="bg-emerald-400/20"
      seo={{
        whatIs: `The Audio Merger is a free online tool that combines multiple audio files into a single track. Upload 2 or more audio files (MP3, WAV, OGG, M4A, FLAC), reorder them as needed, choose output format (MP3, WAV, AAC, FLAC, Opus, OGG), and merge them into one continuous audio file — all processing happens locally in your browser using FFmpeg.wasm with no uploads, no registration, and no paid APIs.`,
        howTo: [
          'Upload 2 or more audio files (MP3, WAV, OGG, M4A, FLAC) by dragging them into the upload area or clicking to browse.',
          'Reorder clips using the up/down arrows to set the desired sequence.',
          'Remove any unwanted clips using the delete button.',
          'Select output format: MP3, WAV, AAC (M4A), FLAC, Opus, or OGG.',
          'Click "Merge Audio" to concatenate them using FFmpeg.wasm.',
          'Preview the merged audio and download it.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your audio never leaves your device.' },
          { title: 'Multiple format output', description: 'Choose from MP3, WAV, AAC, FLAC, Opus, or OGG output.' },
          { title: 'Easy reordering', description: 'Up/down controls let you arrange clips in any order before merging.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Audio Merger free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Can I merge audio files with different formats?', a: 'Yes. The tool handles format conversion internally. All inputs are decoded and re-encoded to the selected output format.' },
          { q: 'Does merging reduce audio quality?', a: 'The audio is re-encoded to the selected output format. Quality depends on the output format and codec settings.' },
          { q: 'How many audio files can I merge at once?', a: 'There is no fixed limit, but practical browser memory limits apply. Typically 10-20 files work well.' },
          { q: 'What formats are supported?', a: 'MP3, WAV, OGG, M4A, FLAC input. Output: MP3, WAV, AAC (M4A), FLAC, Opus, OGG.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The Audio Merger runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <AudioMerger />
    </ToolPageTemplate>
  );
}