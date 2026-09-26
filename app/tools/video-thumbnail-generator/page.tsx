import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { VideoThumbnailGenerator } from '@/components/video/video-thumbnail-generator';
import { videoToolConfigs } from '@/lib/video-configs';

export const metadata = buildToolMetadata(
  'video-thumbnail-generator',
  'Video Thumbnail Generator',
  'Extract frames from videos as thumbnail images. Free, fast, and works entirely in your browser.'
);

const relatedSlugs = ['video-metadata-viewer', 'video-to-gif', 'image-cropper'];

export default function VideoThumbnailGeneratorPage() {
  return (
    <ToolPageTemplate
      slug="video-thumbnail-generator"
      relatedSlugs={relatedSlugs}
      blurColor="bg-red-400/20"
      seo={{
        whatIs: `The Video Thumbnail Generator is a free online tool that extracts frames from videos as high-quality thumbnail images. Upload any video file (MP4, WebM, MOV), select a timestamp, and generate a crisp PNG thumbnail — all processing happens locally in your browser with no uploads, no registration, and no paid APIs.`,
        howTo: [
          'Upload a video file (MP4, WebM, or MOV) by dragging it into the upload area or clicking to browse.',
          'Use the timestamp slider to choose the exact moment you want to capture as a thumbnail.',
          'Click "Generate Thumbnail" to extract the frame using FFmpeg.wasm.',
          'Preview the generated thumbnail and download it as a PNG file.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your video never leaves your device.' },
          { title: 'Precise frame selection', description: 'Select any timestamp with 0.1s precision to capture the perfect frame.' },
          { title: 'High-quality output', description: 'Generated thumbnails are extracted at the video\'s native resolution and saved as lossless PNG.' },
        ],
        faqs: [
          { q: 'Is the Video Thumbnail Generator free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does the Video Thumbnail Generator work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser using FFmpeg.wasm. Your video never leaves your device.' },
          { q: 'What video formats are supported?', a: 'MP4, WebM, and MOV files are supported. The tool uses FFmpeg.wasm which supports most common video codecs.' },
          { q: 'What image format is the thumbnail saved as?', a: 'Thumbnails are saved as high-quality PNG files to preserve image quality.' },
        ],
      }}
    >
      <VideoThumbnailGenerator />
    </ToolPageTemplate>
  );
}