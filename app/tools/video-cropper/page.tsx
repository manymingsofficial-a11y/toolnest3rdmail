import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { VideoCropper } from '@/components/video/video-cropper';
import { videoToolConfigs } from '@/lib/video-configs';

export const metadata = buildToolMetadata(
  'video-cropper',
  'Video Cropper',
  'Crop video frames to custom dimensions/aspect ratios. Interactive crop selection with presets. Free, runs in browser.'
);

const relatedSlugs = ['video-rotator', 'video-trimmer', 'video-watermark'];

export default function VideoCropperPage() {
  return (
    <ToolPageTemplate
      slug="video-cropper"
      relatedSlugs={relatedSlugs}
      blurColor="bg-red-400/20"
      seo={{
        whatIs: `The Video Cropper is a free online tool that crops video frames to custom dimensions or aspect ratios. Upload any video (MP4, WebM, MOV), interactively select the crop area using the visual editor with drag-to-move and drag-to-resize, choose from presets (Square, 16:9, 9:16, 4:3, Center 80%), and crop the video — all processing happens locally in your browser using FFmpeg.wasm with no uploads, no registration, and no paid APIs. The crop filter is applied during re-encoding.`,
        howTo: [
          'Upload a video file (MP4, WebM, or MOV) by dragging it into the upload area or clicking to browse.',
          'Use the interactive crop editor: drag the crop rectangle to move it, drag the bottom-right corner to resize.',
          'Or click a preset button (Center 80%, Square, 16:9, 9:16, 4:3) for instant aspect ratios.',
          'Fine-tune X, Y, Width, Height values numerically if needed.',
          'Click "Crop Video" to process using FFmpeg.wasm crop filter (re-encoded with libx264).',
          'Preview the cropped video and download it as MP4.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your video never leaves your device.' },
          { title: 'Interactive visual editor', description: 'Drag-to-move, drag-to-resize crop selection with real-time preview on the video frame.' },
          { title: 'Aspect ratio presets', description: 'Instant Square, 16:9, 9:16, 4:3, and Center 80% crops with one click.' },
          { title: 'Precise numerical control', description: 'Fine-tune X, Y, Width, Height pixel values for pixel-perfect crops.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Video Cropper free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does cropping reduce video quality?', a: 'The cropped region is re-encoded with libx264 at CRF 23 (high quality). There is minimal quality loss from re-encoding.' },
          { q: 'Can I crop to a specific aspect ratio like 16:9?', a: 'Yes. Use the preset buttons for 16:9, 9:16, 4:3, Square, or Center 80%.' },
          { q: 'Can I fine-tune the crop position pixel-by-pixel?', a: 'Yes. The X, Y, Width, Height inputs allow precise numerical control.' },
          { q: 'What formats are supported?', a: 'MP4, WebM, and MOV input files. Output is always MP4 for maximum compatibility.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The Video Cropper runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <VideoCropper />
    </ToolPageTemplate>
  );
}