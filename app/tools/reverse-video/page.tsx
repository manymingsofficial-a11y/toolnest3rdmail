import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { VideoReverser } from '@/components/video/video-reverser';
import { videoToolConfigs } from '@/lib/video-configs';

export const metadata = buildToolMetadata(
  'reverse-video',
  'Reverse Video',
  'Play video backwards with optional audio reversal. Free, fast, runs in browser with FFmpeg.'
);

const relatedSlugs = ['video-speed-controller', 'mute-video', 'video-rotator'];

export default function ReverseVideoPage() {
  return (
    <ToolPageTemplate
      slug="reverse-video"
      relatedSlugs={relatedSlugs}
      blurColor="bg-rose-400/20"
      seo={{
        whatIs: `The Reverse Video tool is a free online tool that plays videos backwards. Upload any video (MP4, WebM, MOV), choose whether to reverse the audio as well, and get a fully reversed video — all processing happens locally in your browser using FFmpeg.wasm with no uploads, no registration, and no paid APIs. Both video frames and audio samples are reversed using FFmpeg's reverse and areverse filters. The video is re-encoded with libx264 and audio with AAC.`,
        howTo: [
          'Upload a video file (MP4, WebM, or MOV) by dragging it into the upload area or clicking to browse.',
          'Choose whether to reverse the audio track (enabled by default) or remove it.',
          'Click "Reverse Video" to process using FFmpeg.wasm with reverse/areverse filters.',
          'Preview the reversed video and download it as MP4.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your video never leaves your device.' },
          { title: 'Full video + audio reversal', description: 'Both video frames and audio samples are reversed using FFmpeg reverse/areverse filters.' },
          { title: 'Optional audio reversal', description: 'Toggle audio reversal on/off. When disabled, audio is removed from output.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Reverse Video tool free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does reversing a video reduce quality?', a: 'The video is re-encoded with libx264 at CRF 23 (high quality). There is minimal quality loss from re-encoding.' },
          { q: 'Can I reverse just the video without audio?', a: 'Yes. Uncheck "Reverse Audio" to reverse only the video frames while removing the audio track.' },
          { q: 'How long does it take to reverse a video?', a: 'Reversing requires full re-encoding of both video and audio, so it takes longer than simple stream-copy operations. Large files may take several minutes.' },
          { q: 'What formats are supported?', a: 'MP4, WebM, and MOV input files. Output is always MP4 for maximum compatibility.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The Reverse Video tool runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <VideoReverser />
    </ToolPageTemplate>
  );
}