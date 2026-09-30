import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { VideoCompressor } from '@/components/video/video-compressor';
import { videoToolConfigs } from '@/lib/video-configs';

export const metadata = buildToolMetadata(
  'video-compressor',
  'Video Compressor',
  'Reduce video file size with adjustable quality presets. Free, fast, runs in browser with FFmpeg.'
);

const relatedSlugs = ['video-converter', 'video-trimmer', 'video-rotator'];

export default function VideoCompressorPage() {
  return (
    <ToolPageTemplate
      slug="video-compressor"
      relatedSlugs={relatedSlugs}
      blurColor="bg-red-400/20"
      seo={{
        whatIs: `The Video Compressor is a free online tool that reduces video file size while maintaining visual quality. Upload any video (MP4, WebM, MOV, AVI), choose a compression preset (High Quality, Balanced, Small File, Tiny) or set custom CRF/preset values, and get a smaller video — all processing happens locally in your browser using FFmpeg.wasm with no uploads, no registration, and no paid APIs. The video is re-encoded with libx264 at your chosen quality level.`,
        howTo: [
          'Upload a video file (MP4, WebM, MOV, AVI) by dragging it into the upload area or clicking to browse.',
          'Choose a compression preset: High Quality (CRF 20), Balanced (CRF 23), Small File (CRF 28), or Tiny (CRF 32).',
          'Or select "Custom" to manually set CRF (18-35) and encoding preset (veryfast to slower).',
          'Click "Compress Video" to process using FFmpeg.wasm with libx264 encoding.',
          'Preview the compressed video and download it as MP4. Compare before/after file sizes.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your video never leaves your device.' },
          { title: 'Flexible quality control', description: '4 presets plus full custom CRF/preset control for precise quality/size balance.' },
          { title: 'Shows savings', description: 'See exact before/after file sizes and percentage reduction.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Video Compressor free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Will compression reduce video quality?', a: 'Yes, compression always involves some quality loss. Higher CRF = more compression, lower quality. The "High Quality" preset (CRF 20) is nearly visually lossless.' },
          { q: 'Can I compress a video to a specific file size?', a: 'This tool uses CRF-based quality control, not target file size. For exact file size targeting, use a two-pass encoding tool.' },
          { q: 'What formats are supported?', a: 'MP4, WebM, MOV, AVI input. Output is always MP4 (H.264) for maximum compatibility.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The Video Compressor runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <VideoCompressor />
    </ToolPageTemplate>
  );
}