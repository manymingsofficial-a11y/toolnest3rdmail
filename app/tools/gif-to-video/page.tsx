import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { GifToVideo } from '@/components/video/gif-to-video';
import { videoToolConfigs } from '@/lib/video-configs';

export const metadata = buildToolMetadata(
  'gif-to-video',
  'GIF to Video',
  'Convert animated GIFs to MP4 or WebM video. Adjustable frame rate and output format. Free, runs in browser.'
);

const relatedSlugs = ['video-to-gif', 'video-converter', 'image-converter'];

export default function GifToVideoPage() {
  return (
    <ToolPageTemplate
      slug="gif-to-video"
      relatedSlugs={relatedSlugs}
      blurColor="bg-red-400/20"
      seo={{
        whatIs: `The GIF to Video tool is a free online tool that converts animated GIFs to video files (MP4 or WebM). Upload any animated GIF, choose output format (MP4 with H.264 for best compatibility, or WebM with VP9 for smaller files), set frame rate (10-60 FPS), and convert \u2014 all processing happens locally in your browser using FFmpeg.wasm with no uploads, no registration, and no paid APIs. The GIF frames are extracted and encoded into a proper video stream with yuv420p pixel format for maximum compatibility.`,
        howTo: [
          'Upload an animated GIF file by dragging it into the upload area or clicking to browse.',
          'Choose output format: MP4 (H.264) for maximum compatibility, or WebM (VP9) for smaller files.',
          'Adjust frame rate (10-60 FPS): GIFs have no native frame rate; this controls how many frames per second in the output video.',
          'Click "Convert to MP4/WebM" to process using FFmpeg.wasm (GIF frames extracted and encoded to video).',
          'Preview the video and download it as MP4 or WebM.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your GIF never leaves your device.' },
          { title: 'True video output', description: 'Produces a valid video file (MP4/WebM), not a renamed GIF. Uses proper video codecs (H.264/VP9).' },
          { title: 'Format choice', description: 'MP4 (H.264) for maximum compatibility, WebM (VP9) for smaller file sizes.' },
          { title: 'Adjustable frame rate', description: 'Set 10-60 FPS since GIFs have no native frame rate.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the GIF to Video tool free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'What is the difference between MP4 and WebM output?', a: 'MP4 (H.264) has universal compatibility across all devices and browsers. WebM (VP9) typically produces smaller files but has slightly less universal support (not supported in Safari on iOS 14 and earlier).' },
          { q: 'How does frame rate affect the output?', a: 'GIFs have no native frame rate. The FPS setting determines how many frames per second in the output video. Higher FPS = smoother playback but larger file. Typical GIFs are 10-15 FPS.' },
          { q: 'Does the output video have audio?', a: 'No. GIFs don\u2019t contain audio, so the output video is silent. Use a separate tool to add audio if needed.' },
          { q: 'What formats are supported?', a: 'Animated GIF input. Output is MP4 or WebM video.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The GIF to Video tool runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <GifToVideo />
    </ToolPageTemplate>
  );
}