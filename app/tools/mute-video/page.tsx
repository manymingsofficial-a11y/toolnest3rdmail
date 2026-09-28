import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { MuteVideo } from '@/components/video/video-mute';
import { videoToolConfigs } from '@/lib/video-configs';

export const metadata = buildToolMetadata(
  'mute-video',
  'Mute Video',
  'Remove audio from any video file instantly. Free, fast, and runs in your browser.'
);

const relatedSlugs = ['extract-audio', 'video-converter', 'reverse-video'];

export default function MuteVideoPage() {
  return (
    <ToolPageTemplate
      slug="mute-video"
      relatedSlugs={relatedSlugs}
      blurColor="bg-red-400/20"
      seo={{
        whatIs: `The Mute Video tool is a free online tool that removes the audio track from any video file. Upload any video (MP4, WebM, MOV) and instantly get a copy without sound — all processing happens locally in your browser using FFmpeg.wasm with no uploads, no registration, and no paid APIs. The video stream is copied without re-encoding, preserving 100% original visual quality.`,
        howTo: [
          'Upload a video file (MP4, WebM, or MOV) by dragging it into the upload area or clicking to browse.',
          'Click "Mute Video" to strip the audio track using FFmpeg.wasm (video stream copied without re-encoding).',
          'Preview the muted video and download it as an MP4 file.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your video never leaves your device.' },
          { title: 'Lossless video quality', description: 'Uses stream copy (-c:v copy) so the video retains original quality; only the audio track is removed.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Mute Video tool free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does muting reduce video quality?', a: 'No. The video stream is copied directly (-c:v copy) without re-encoding, preserving 100% original visual quality.' },
          { q: 'Can I restore the audio later?', a: 'No, the audio track is permanently removed from the output file. Keep your original file if you need the audio.' },
          { q: 'What formats are supported?', a: 'MP4, WebM, and MOV input files. Output is always MP4 for maximum compatibility.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The Mute Video tool runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <MuteVideo />
    </ToolPageTemplate>
  );
}