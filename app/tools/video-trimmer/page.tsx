import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { VideoTrimmer } from '@/components/video/video-trimmer';
import { videoToolConfigs } from '@/lib/video-configs';

export const metadata = buildToolMetadata(
  'video-trimmer',
  'Video Trimmer',
  'Trim and cut video to keep only the parts you need. Free, fast, and runs in your browser.'
);

const relatedSlugs = ['video-cutter', 'video-splitter', 'video-speed-controller'];

export default function VideoTrimmerPage() {
  return (
    <ToolPageTemplate
      slug="video-trimmer"
      relatedSlugs={relatedSlugs}
      blurColor="bg-orange-400/20"
      seo={{
        whatIs: `The Video Trimmer is a free online tool that trims videos to keep only the parts you need. Upload any video file (MP4, WebM), set the start and end time using the intuitive slider or precise inputs, and extract that segment — all processing happens locally in your browser using FFmpeg.wasm with no uploads, no registration, and no paid APIs.`,
        howTo: [
          'Upload a video file (MP4 or WebM) by dragging it into the upload area or clicking to browse.',
          'Use the time range slider or numeric inputs to set the exact start and end time of the segment you want to keep.',
          'Click "Trim Video" to extract the segment using FFmpeg.wasm (stream copy mode preserves quality).',
          'Preview the trimmed video and download it as an MP4 file.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your video never leaves your device.' },
          { title: 'Lossless quality', description: 'Uses stream copy (-c:v copy -c:a copy) so the trimmed segment retains original quality without re-encoding.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Video Trimmer free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does trimming reduce video quality?', a: 'No. The tool uses FFmpeg stream copy mode, which extracts the segment without re-encoding, preserving 100% original quality.' },
          { q: 'What formats are supported?', a: 'MP4 and WebM input files. Output is always MP4 for maximum compatibility.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The Video Trimmer runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <VideoTrimmer />
    </ToolPageTemplate>
  );
}