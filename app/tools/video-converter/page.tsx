import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { VideoConverter } from '@/components/video/video-converter';
import { videoToolConfigs } from '@/lib/video-configs';

export const metadata = buildToolMetadata(
  'video-converter',
  'Video Converter',
  'Convert videos between MP4, WebM, MOV, AVI formats. Choose codecs. Free, runs in browser with FFmpeg.'
);

const relatedSlugs = ['video-compressor', 'video-merger', 'video-to-gif'];

export default function VideoConverterPage() {
  return (
    <ToolPageTemplate
      slug="video-converter"
      relatedSlugs={relatedSlugs}
      blurColor="bg-rose-400/20"
      seo={{
        whatIs: `The Video Converter is a free online tool that converts videos between different formats. Upload any video (MP4, WebM, MOV, AVI), choose output format (MP4, WebM, MOV, AVI), select video codec (H.264, VP9, MPEG-4, H.265) and audio codec (AAC, Opus, MP3), and convert — all processing happens locally in your browser using FFmpeg.wasm with no uploads, no registration, and no paid APIs. The video is re-encoded with your chosen codecs.`,
        howTo: [
          'Upload a video file (MP4, WebM, MOV, AVI) by dragging it into the upload area or clicking to browse.',
          'Select output format: MP4 (H.264), WebM (VP9), MOV (H.264), or AVI (MPEG-4).',
          'Choose video codec (H.264, VP9, MPEG-4, H.265) and audio codec (AAC, Opus, MP3, Copy).',
          'Click "Convert Video" to transcode using FFmpeg.wasm.',
          'Preview the converted video and download it.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your video never leaves your device.' },
          { title: 'Multiple formats & codecs', description: 'MP4, WebM, MOV, AVI output with H.264, VP9, MPEG-4, H.265 video and AAC, Opus, MP3 audio codecs.' },
          { title: 'Stream copy option', description: 'Use "Copy" audio codec to avoid audio re-encoding when container supports it.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Video Converter free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Can I convert without quality loss?', a: 'Use "Copy" for audio codec and match input video codec to container for stream copy where possible. Full re-encoding always involves some quality loss.' },
          { q: 'What is the difference between MP4 and WebM?', a: 'MP4 (H.264) has universal compatibility. WebM (VP9) offers better compression but less universal support (not in Safari iOS < 14).' },
          { q: 'Can I convert AVI to MP4?', a: 'Yes. AVI (MPEG-4) input is supported, output to MP4 (H.264) works well.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The Video Converter runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <VideoConverter />
    </ToolPageTemplate>
  );
}