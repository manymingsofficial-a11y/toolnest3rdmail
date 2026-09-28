import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { VideoSpeedChanger } from '@/components/video/video-speed-changer';
import { videoToolConfigs } from '@/lib/video-configs';

export const metadata = buildToolMetadata(
  'video-speed-controller',
  'Video Speed Controller',
  'Speed up or slow down video playback. Change speed from 0.1x to 8x with audio sync. Free, fast, runs in browser.'
);

const relatedSlugs = ['reverse-video', 'video-trimmer', 'video-to-gif'];

export default function VideoSpeedControllerPage() {
  return (
    <ToolPageTemplate
      slug="video-speed-controller"
      relatedSlugs={relatedSlugs}
      blurColor="bg-amber-400/20"
      seo={{
        whatIs: `The Video Speed Controller is a free online tool that changes video playback speed from 0.1x (slow motion) to 8x (fast forward). Upload any video (MP4, WebM, MOV), select your desired speed using the slider or presets, and get a new video with perfectly synchronized audio — all processing happens locally in your browser using FFmpeg.wasm with no uploads, no registration, and no paid APIs. Both video and audio are re-encoded to maintain perfect sync at the new speed.`,
        howTo: [
          'Upload a video file (MP4, WebM, or MOV) by dragging it into the upload area or clicking to browse.',
          'Adjust the speed slider (0.1x to 8x) or click a preset button (0.25x, 0.5x, 0.75x, 1x, 1.5x, 2x, 4x, 8x).',
          'Click "Apply Speed" to process the video using FFmpeg.wasm (both video and audio are re-encoded for perfect sync).',
          'Preview the result and download the speed-adjusted video as MP4.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your video never leaves your device.' },
          { title: 'Full speed range', description: 'Supports 0.1x (extreme slow motion) to 8x (fast forward) with precise 0.05x increments.' },
          { title: 'Audio sync guaranteed', description: 'Both video and audio streams are re-encoded using atempo/setpts filters for perfect synchronization.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Video Speed Controller free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does changing speed affect audio pitch?', a: 'No. The atempo filter maintains the original audio pitch while changing playback speed.' },
          { q: 'Can I slow down a video to 0.1x?', a: 'Yes. The tool supports speeds from 0.1x (extreme slow motion) to 8x (fast forward).' },
          { q: 'What formats are supported?', a: 'MP4, WebM, and MOV input files. Output is always MP4 for maximum compatibility.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The Video Speed Controller runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <VideoSpeedChanger />
    </ToolPageTemplate>
  );
}