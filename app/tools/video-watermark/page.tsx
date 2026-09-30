import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { VideoWatermark } from '@/components/video/video-watermark';
import { videoToolConfigs } from '@/lib/video-configs';

export const metadata = buildToolMetadata(
  'video-watermark',
  'Video Watermark',
  'Add text or image watermarks to videos. Position, opacity, size controls. Free, runs in browser with FFmpeg.'
);

const relatedSlugs = ['video-cropper', 'video-merger', 'image-watermark'];

export default function VideoWatermarkPage() {
  return (
    <ToolPageTemplate
      slug="video-watermark"
      relatedSlugs={relatedSlugs}
      blurColor="bg-orange-400/20"
      seo={{
        whatIs: `The Video Watermark tool is a free online tool that adds text or image watermarks to videos. Upload any video (MP4, WebM, MOV), add custom text with adjustable font size, color, and opacity, or upload an image watermark (PNG, JPG, WebP, SVG), choose position (7 presets), and apply — all processing happens locally in your browser using FFmpeg.wasm with no uploads, no registration, and no paid APIs. The video is re-encoded with libx264 to apply the watermark.`,
        howTo: [
          'Upload a video file (MP4, WebM, MOV) by dragging it into the upload area or clicking to browse.',
          'Choose watermark type: Text (enter text, set font size, color, opacity) or Image (upload PNG/JPG/WebP/SVG, set width).',
          'Select position: Top Left, Top Center, Top Right, Center, Bottom Left, Bottom Center, Bottom Right.',
          'Adjust opacity (0-100%) for subtle or prominent watermarks.',
          'Click "Add Watermark" to process using FFmpeg.wasm (drawtext or overlay filter).',
          'Preview the watermarked video and download it as MP4.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your video never leaves your device.' },
          { title: 'Text and image watermarks', description: 'Add custom text with full styling, or upload logo/image watermarks with transparency support.' },
          { title: '7 position presets', description: 'Quick positioning: corners, edges, or center.' },
          { title: 'Adjustable opacity', description: '0-100% opacity for subtle or prominent watermarks.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Video Watermark tool free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does adding a watermark reduce video quality?', a: 'The video is re-encoded with libx264 at CRF 23 (high quality). There is minimal quality loss from re-encoding. The watermark itself is applied during encoding.' },
          { q: 'Can I use a transparent PNG as watermark?', a: 'Yes. PNG, JPG, WebP, and SVG images are supported. PNG with transparency works best for logos.' },
          { q: 'Can I watermark only part of the video?', a: 'This tool applies the watermark to the entire video duration. For partial watermarking, you would need a more advanced video editor.' },
          { q: 'What formats are supported?', a: 'MP4, WebM, MOV input. Output is MP4. Image watermarks: PNG, JPG, WebP, SVG.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The Video Watermark tool runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <VideoWatermark />
    </ToolPageTemplate>
  );
}