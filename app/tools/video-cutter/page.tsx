import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { VideoCutter } from '@/components/video/video-cutter';
import { videoToolConfigs } from '@/lib/video-configs';

export const metadata = buildToolMetadata(
  'video-cutter',
  'Video Cutter',
  'Cut out unwanted sections from any video file. Free, fast, and runs in your browser.'
);

const relatedSlugs = ['video-trimmer', 'video-splitter', 'video-merger'];

export default function VideoCutterPage() {
  return (
    <ToolPageTemplate
      slug="video-cutter"
      relatedSlugs={relatedSlugs}
      blurColor="bg-amber-400/20"
      seo={{
        whatIs: `The Video Cutter is a free online tool that cuts out unwanted sections from videos. Upload any video file (MP4, WebM), define multiple segments to keep using the intuitive interface, and merge them into a single video — all processing happens locally in your browser using FFmpeg.wasm with no uploads, no registration, and no paid APIs.`,
        howTo: [
          'Upload a video file (MP4 or WebM) by dragging it into the upload area or clicking to browse.',
          'Add segments to keep by clicking "Add Segment" and setting start/end times for each section.',
          'Reorder or remove segments as needed. Segments cannot overlap.',
          'Click "Cut & Merge Video" to extract and join the segments using FFmpeg.wasm (stream copy mode preserves quality).',
          'Preview the result and download it as an MP4 file.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your video never leaves your device.' },
          { title: 'Lossless quality', description: 'Uses stream copy (-c:v copy -c:a copy) so the kept segments retain original quality without re-encoding.' },
          { title: 'Multiple segments', description: 'Keep multiple non-overlapping sections and merge them into one video in a single operation.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Video Cutter free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Can I keep multiple separate sections?', a: 'Yes. Add as many segments as you need, and they will be merged in order into a single output video.' },
          { q: 'Does cutting reduce video quality?', a: 'No. The tool uses FFmpeg stream copy mode, which extracts segments without re-encoding, preserving 100% original quality.' },
          { q: 'What formats are supported?', a: 'MP4 and WebM input files. Output is always MP4 for maximum compatibility.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The Video Cutter runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <VideoCutter />
    </ToolPageTemplate>
  );
}