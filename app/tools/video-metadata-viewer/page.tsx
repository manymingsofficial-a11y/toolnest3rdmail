import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { VideoMetadataViewer } from '@/components/video/video-metadata-viewer';
import { videoToolConfigs } from '@/lib/video-configs';

export const metadata = buildToolMetadata(
  'video-metadata-viewer',
  'Video Metadata Viewer',
  'Inspect codec, resolution, duration, bitrate, and more. Free, private, and works in your browser.'
);

const relatedSlugs = ['video-metadata-remover', 'video-thumbnail-generator', 'image-metadata-viewer'];

export default function VideoMetadataViewerPage() {
  return (
    <ToolPageTemplate
      slug="video-metadata-viewer"
      relatedSlugs={relatedSlugs}
      blurColor="bg-rose-400/20"
      seo={{
        whatIs: `The Video Metadata Viewer is a free online tool that extracts and displays detailed technical metadata from video files. Upload any video file (MP4, WebM, MOV) to instantly view codec information, resolution, duration, bitrate, frame rate, audio codec, sample rate, and more — all processing happens locally in your browser with no uploads or registration.`,
        howTo: [
          'Upload a video file (MP4, WebM, or MOV) by dragging it into the upload area or clicking to browse.',
          'Click "Extract Metadata" to analyze the file using FFmpeg.wasm.',
          'View the complete metadata output including codec, resolution, duration, bitrate, and audio details.',
          'Copy or download the metadata as JSON for your records.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your video never leaves your device.' },
          { title: 'Comprehensive metadata', description: 'View codec, resolution, duration, bitrate, frame rate, audio codec, sample rate, channels, and more.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Video Metadata Viewer free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does the Video Metadata Viewer work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser using FFmpeg.wasm. Your video never leaves your device.' },
          { q: 'What metadata fields are displayed?', a: 'Codec, resolution, duration, bitrate, frame rate, audio codec, sample rate, channels, file size, and container format.' },
          { q: 'Can I download the metadata?', a: 'Yes, you can copy the JSON output or download it for your records.' },
        ],
      }}
    >
      <VideoMetadataViewer />
    </ToolPageTemplate>
  );
}