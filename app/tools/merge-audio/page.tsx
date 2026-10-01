import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { MergeAudio } from '@/components/audio/merge-audio';

export const metadata = buildToolMetadata(
  'merge-audio',
  'Merge Audio',
  'Combine multiple audio files into one track. Free, fast, runs in your browser with FFmpeg.'
);

const relatedSlugs = ['audio-converter', 'audio-trimmer', 'audio-merger'];

export default function MergeAudioPage() {
  return (
    <ToolPageTemplate
      slug="merge-audio"
      relatedSlugs={relatedSlugs}
      blurColor="bg-emerald-400/20"
      seo={{
        whatIs: `The Merge Audio tool is a free online tool that combines multiple audio files into a single track. Upload 2 or more audio files (MP3, WAV, OGG, M4A, FLAC), reorder them as needed, choose your output format, and merge them — all processing happens locally in your browser using FFmpeg.wasm with no uploads, no registration, and no paid APIs. The audio is re-encoded to your chosen output format for maximum compatibility.`,
        howTo: [
          'Upload 2 or more audio files (MP3, WAV, OGG, M4A, FLAC) by dragging them into the upload area or clicking to browse.',
          'Reorder files using the up/down arrows to set the desired sequence.',
          'Remove any unwanted files using the delete button.',
          'Select the output format: MP3, WAV, AAC, FLAC, Opus, or OGG.',
          'Click "Merge Audio" to concatenate and re-encode using FFmpeg.wasm.',
          'Preview the merged audio and download it.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your audio never leaves your device.' },
          { title: 'Lossless re-encoding', description: 'Audio is re-encoded to your chosen format for maximum compatibility across players.' },
          { title: 'Easy reordering', description: 'Up/down controls let you arrange clips in any order before merging.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Merge Audio tool free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Can I merge audio files with different formats?', a: 'Yes. The tool re-encodes all inputs to your selected output format, so input format differences are handled automatically.' },
          { q: 'Does merging reduce audio quality?', a: 'The audio is re-encoded to your chosen output format. For best quality, choose a lossless format (WAV, FLAC) or high-bitrate lossy format (MP3 320kbps).' },
          { q: 'How many audio files can I merge at once?', a: 'There is no fixed limit, but practical browser memory limits apply. Typically 10-20 files work well.' },
          { q: 'What output formats are supported?', a: 'MP3, WAV, AAC (M4A), FLAC, Opus, and OGG.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The Merge Audio tool runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <MergeAudio />
    </ToolPageTemplate>
  );
}