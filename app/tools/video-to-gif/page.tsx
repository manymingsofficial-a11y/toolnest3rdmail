import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { VideoToGif } from '@/components/video/video-to-gif';
import { videoToolConfigs } from '@/lib/video-configs';

export const metadata = buildToolMetadata(
  'video-to-gif',
  'Video to GIF',
  'Convert video clips to animated GIFs. Adjustable FPS, resolution, clip range. Free, runs in browser.'
);

const relatedSlugs = ['gif-to-video', 'video-trimmer', 'video-speed-controller'];

export default function VideoToGifPage() {
  return (
    <ToolPageTemplate
      slug="video-to-gif"
      relatedSlugs={relatedSlugs}
      blurColor="bg-rose-400/20"
      seo={{
        whatIs: `The Video to GIF tool is a free online tool that converts video clips into animated GIFs. Upload any video (MP4, WebM, MOV), select the clip range, adjust FPS (1-30), output width (100-1280px), and generate a true animated GIF using FFmpeg's palettegen/paletteuse filters for optimal color quality — all processing happens locally in your browser with no uploads, no registration, and no paid APIs.`,
        howTo: [
          'Upload a video file (MP4, WebM, or MOV) by dragging it into the upload area or clicking to browse.',
          'Use the start time slider to choose where the GIF begins, and the clip length slider for duration (0.5s to full remaining).',
          'Adjust FPS (1-30): higher = smoother but larger file. Adjust output width (100-1280px): height is auto-calculated.',
          'Click "Generate GIF" to process using FFmpeg.wasm with palettegen/paletteuse for optimal 256-color palette.',
          'Preview the generated GIF and download it as .gif file.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your video never leaves your device.' },
          { title: 'True GIF generation', description: 'Uses FFmpeg palettegen/paletteuse filters for optimal 256-color palette, not fake/renamed video.' },
          { title: 'Full control', description: 'Adjustable clip range, FPS (1-30), output width (100-1280px) with live size estimate.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Video to GIF tool free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Why is my GIF so large?', a: 'GIFs are inefficient for video. Reduce FPS, clip duration, or output width to shrink file size. Consider using video formats for longer clips.' },
          { q: 'What is the maximum clip length?', a: 'No hard limit, but large GIFs (>10MB) may cause browser memory issues. Recommended: keep clips under 5-10 seconds.' },
          { q: 'Can I create a GIF from a specific part of a video?', a: 'Yes. Use the start time and clip length sliders to select any segment.' },
          { q: 'What formats are supported?', a: 'MP4, WebM, and MOV input files. Output is always GIF.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The Video to GIF tool runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <VideoToGif />
    </ToolPageTemplate>
  );
}