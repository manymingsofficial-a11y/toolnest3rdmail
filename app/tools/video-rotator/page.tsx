import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { VideoRotator } from '@/components/video/video-rotator';
import { videoToolConfigs } from '@/lib/video-configs';

export const metadata = buildToolMetadata(
  'video-rotator',
  'Video Rotator',
  'Rotate videos 90°, 180°, or 270° clockwise. Free, fast, runs in your browser with FFmpeg.'
);

const relatedSlugs = ['video-cropper', 'video-compressor', 'reverse-video'];

export default function VideoRotatorPage() {
  return (
    <ToolPageTemplate
      slug="video-rotator"
      relatedSlugs={relatedSlugs}
      blurColor="bg-orange-400/20"
      seo={{
        whatIs: `The Video Rotator is a free online tool that rotates videos by 90°, 180°, or 270° clockwise. Upload any video (MP4, WebM, MOV), select the rotation angle, and get a correctly oriented video — all processing happens locally in your browser using FFmpeg.wasm with no uploads, no registration, and no paid APIs. The video is re-encoded to apply the rotation transformation while preserving quality.`,
        howTo: [
          'Upload a video file (MP4, WebM, or MOV) by dragging it into the upload area or clicking to browse.',
          'Select the rotation angle: 90° clockwise, 180°, or 270° clockwise (90° counter-clockwise).',
          'Click "Rotate Video" to process the video using FFmpeg.wasm with the transpose filter.',
          'Preview the rotated video and download it as MP4.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your video never leaves your device.' },
          { title: 'Multiple rotation options', description: 'Rotate 90° CW, 180°, or 270° CW (equivalent to 90° CCW) with a single click.' },
          { title: 'Quality preserved', description: 'Re-encoded with libx264 at CRF 23 for high quality output.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Video Rotator free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does rotating reduce video quality?', a: 'The video is re-encoded with libx264 at CRF 23 (high quality). There may be minimal quality loss compared to the original.' },
          { q: 'Can I rotate by 90° counter-clockwise?', a: 'Yes, selecting 270° clockwise achieves the same result as 90° counter-clockwise.' },
          { q: 'What formats are supported?', a: 'MP4, WebM, and MOV input files. Output is always MP4 for maximum compatibility.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The Video Rotator runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <VideoRotator />
    </ToolPageTemplate>
  );
}