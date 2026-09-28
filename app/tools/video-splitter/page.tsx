import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { VideoSplitter } from '@/components/video/video-splitter';
import { videoToolConfigs } from '@/lib/video-configs';

export const metadata = buildToolMetadata(
  'video-splitter',
  'Video Splitter',
  'Split a video into multiple equal or custom segments. Free, fast, and runs in your browser.'
);

const relatedSlugs = ['video-merger', 'video-cutter', 'video-trimmer'];

export default function VideoSplitterPage() {
  return (
    <ToolPageTemplate
      slug="video-splitter"
      relatedSlugs={relatedSlugs}
      blurColor="bg-rose-400/20"
      seo={{
        whatIs: `The Video Splitter is a free online tool that splits a video into multiple segments. Upload any video file (MP4, WebM), choose between equal parts or custom time ranges, and extract each segment as a separate video file — all processing happens locally in your browser using FFmpeg.wasm with no uploads, no registration, and no paid APIs. Each segment is extracted using stream copy mode, preserving original quality.`,
        howTo: [
          'Upload a video file (MP4 or WebM) by dragging it into the upload area or clicking to browse.',
          'Choose split mode: "Equal Parts" to divide into N segments of equal duration, or "Custom Segments" to define exact start/end times for each part.',
          'For custom segments, add multiple segments with precise time ranges (they cannot overlap).',
          'Click "Split Video" to extract all segments using FFmpeg.wasm (stream copy mode preserves quality).',
          'Preview each segment and download them individually or all at once as MP4 files.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your video never leaves your device.' },
          { title: 'Lossless quality', description: 'Uses stream copy (-c:v copy -c:a copy) so each segment retains original quality without re-encoding.' },
          { title: 'Flexible splitting', description: 'Split into equal parts (2-100) or define custom time ranges for precise control.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Video Splitter free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Can I split into unequal parts?', a: 'Yes. Use "Custom Segments" mode to define exact start and end times for each segment.' },
          { q: 'Does splitting reduce video quality?', a: 'No. The tool uses FFmpeg stream copy mode, which extracts segments without re-encoding, preserving 100% original quality.' },
          { q: 'How many segments can I create?', a: 'Equal parts mode supports 2-100 segments. Custom mode has no fixed limit but practical limits apply.' },
          { q: 'What formats are supported?', a: 'MP4 and WebM input files. Output segments are always MP4 for maximum compatibility.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The Video Splitter runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <VideoSplitter />
    </ToolPageTemplate>
  );
}