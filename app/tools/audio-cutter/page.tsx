import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { AudioCutter } from '@/components/audio/audio-cutter';
import { audioToolConfigs } from '@/lib/audio-configs';

export const metadata = buildToolMetadata(
  'audio-cutter',
  'Audio Cutter',
  'Cut out unwanted sections from audio files. Keep multiple segments, merge them. Free, runs in browser.'
);

const relatedSlugs = ['audio-trimmer', 'audio-merger', 'mp3-cutter'];

export default function AudioCutterPage() {
  return (
    <ToolPageTemplate
      slug="audio-cutter"
      relatedSlugs={relatedSlugs}
      blurColor="bg-amber-400/20"
      seo={{
        whatIs: `The Audio Cutter is a free online tool that cuts out unwanted sections from audio files. Upload any audio file (MP3, WAV, OGG, M4A, FLAC), define multiple segments to keep using the intuitive interface, and merge them into a single audio file — all processing happens locally in your browser using FFmpeg.wasm with no uploads, no registration, and no paid APIs. The audio is re-encoded to MP3.`,
        howTo: [
          'Upload an audio file (MP3, WAV, OGG, M4A, FLAC) by dragging it into the upload area or clicking to browse.',
          'Add segments to keep by clicking "Add Segment" and setting start/end times for each section.',
          'Reorder or remove segments as needed. Segments cannot overlap.',
          'Click "Cut & Merge Audio" to extract and join the segments using FFmpeg.wasm.',
          'Preview the result and download it as MP3.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your audio never leaves your device.' },
          { title: 'Multiple segments', description: 'Keep multiple non-overlapping sections and merge them into one audio file in a single operation.' },
          { title: 'Lossless segment extraction', description: 'Uses stream copy (-c:a copy) so the kept segments retain original quality without re-encoding.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Audio Cutter free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Can I keep multiple separate sections?', a: 'Yes. Add as many segments as you need, and they will be merged in order into a single output audio file.' },
          { q: 'Does cutting reduce audio quality?', a: 'No. The tool uses FFmpeg stream copy mode, which extracts segments without re-encoding, preserving 100% original quality.' },
          { q: 'What formats are supported?', a: 'MP3, WAV, OGG, M4A, FLAC input files. Output is MP3 for maximum compatibility.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The Audio Cutter runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <AudioCutter />
    </ToolPageTemplate>
  );
}