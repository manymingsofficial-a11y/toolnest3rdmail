import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { VideoMerger } from '@/components/video/video-merger';
import { videoToolConfigs } from '@/lib/video-configs';

export const metadata = buildToolMetadata(
  'video-merger',
  'Video Merger',
  'Combine multiple video clips into one file. Free, fast, and runs in your browser.'
);

const relatedSlugs = ['video-splitter', 'video-converter', 'video-watermark'];

export default function VideoMergerPage() {
  return (
    <ToolPageTemplate
      slug="video-merger"
      relatedSlugs={relatedSlugs}
      blurColor="bg-red-400/20"
      seo={{
        whatIs: `The Video Merger is a free online tool that combines multiple video clips into a single file. Upload 2 or more video files (MP4, WebM), reorder them as needed, and merge them into one continuous video — all processing happens locally in your browser using FFmpeg.wasm with no uploads, no registration, and no paid APIs. Videos are concatenated using stream copy mode, preserving original quality.`,
        howTo: [
          'Upload 2 or more video files (MP4 or WebM) by dragging them into the upload area or clicking to browse.',
          'Reorder clips using the up/down arrows to set the desired sequence.',
          'Remove any unwanted clips using the delete button.',
          'Click "Merge Videos" to concatenate them using FFmpeg.wasm (stream copy mode preserves quality).',
          'Preview the merged video and download it as an MP4 file.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your videos never leave your device.' },
          { title: 'Lossless quality', description: 'Uses stream copy (-c copy) so the merged video retains original quality without re-encoding.' },
          { title: 'Easy reordering', description: 'Drag-and-drop style up/down controls let you arrange clips in any order before merging.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Video Merger free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Can I merge videos with different resolutions?', a: 'Yes, but the output will use the first video\'s resolution. For best results, use clips with matching resolution and frame rate.' },
          { q: 'Does merging reduce video quality?', a: 'No. The tool uses FFmpeg stream copy mode (-c copy), which concatenates without re-encoding, preserving 100% original quality.' },
          { q: 'How many videos can I merge at once?', a: 'There is no fixed limit, but practical browser memory limits apply. Typically 10-20 clips work well.' },
          { q: 'What formats are supported?', a: 'MP4 and WebM input files. Output is always MP4 for maximum compatibility.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The Video Merger runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <VideoMerger />
    </ToolPageTemplate>
  );
}