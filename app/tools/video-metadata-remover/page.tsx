import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { VideoMetadataRemover } from '@/components/video/video-metadata-remover';
import { videoToolConfigs } from '@/lib/video-configs';

export const metadata = buildToolMetadata(
  'video-metadata-remover',
  'Video Metadata Remover',
  'Strip metadata from video files for privacy. Fast, free, and runs entirely in your browser.'
);

const relatedSlugs = ['video-metadata-viewer', 'image-metadata-remover', 'mute-video'];

export default function VideoMetadataRemoverPage() {
  return (
    <ToolPageTemplate
      slug="video-metadata-remover"
      relatedSlugs={relatedSlugs}
      blurColor="bg-red-400/20"
      seo={{
        whatIs: `The Video Metadata Remover is a free online tool that strips all metadata from video files to protect your privacy. It removes EXIF data, GPS coordinates, camera information, timestamps, and other identifying metadata while preserving the original video and audio quality — all processing happens locally in your browser using FFmpeg.wasm.`,
        howTo: [
          'Upload a video file (MP4, WebM, or MOV) by dragging it into the upload area or clicking to browse.',
          'Click "Remove Metadata" to strip all metadata using FFmpeg.wasm.',
          'Download the cleaned video file with all metadata stripped.',
          'The video and audio streams are copied without re-encoding, preserving original quality.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your video never leaves your device.' },
          { title: 'Preserves quality', description: 'Metadata is stripped by remuxing — video and audio streams are copied without re-encoding.' },
          { title: 'Fast and lossless', description: 'Metadata removal is near-instant since no re-encoding is required.' },
        ],
        faqs: [
          { q: 'Is the Video Metadata Remover free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does the Video Metadata Remover work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser using FFmpeg.wasm. Your video never leaves your device.' },
          { q: 'Will removing metadata affect video quality?', a: 'No. The tool remuxes the video — it copies the video and audio streams without re-encoding, preserving 100% of the original quality.' },
          { q: 'What metadata is removed?', a: 'All metadata is stripped including EXIF data, GPS coordinates, camera information, creation timestamps, and any other metadata tags.' },
        ],
      }}
    >
      <VideoMetadataRemover />
    </ToolPageTemplate>
  );
}