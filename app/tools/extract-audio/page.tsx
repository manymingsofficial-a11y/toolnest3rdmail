import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { ExtractAudio } from '@/components/video/extract-audio';
import { videoToolConfigs } from '@/lib/video-configs';

export const metadata = buildToolMetadata(
  'extract-audio',
  'Extract Audio',
  'Extract audio track from video files. Choose format and bitrate. Free, runs in browser with FFmpeg.'
);

const relatedSlugs = ['mute-video', 'audio-converter', 'mp3-cutter'];

export default function ExtractAudioPage() {
  return (
    <ToolPageTemplate
      slug="extract-audio"
      relatedSlugs={relatedSlugs}
      blurColor="bg-orange-400/20"
      seo={{
        whatIs: `The Extract Audio tool is a free online tool that extracts the audio track from any video file. Upload any video (MP4, WebM, MOV, AVI), choose output format (MP3, AAC, WAV, FLAC, Opus, OGG) and bitrate (64-320 kbps), and get the audio track — all processing happens locally in your browser using FFmpeg.wasm with no uploads, no registration, and no paid APIs. The audio is re-encoded to your chosen format and bitrate.`,
        howTo: [
          'Upload a video file (MP4, WebM, MOV, AVI) by dragging it into the upload area or clicking to browse.',
          'Choose output audio format: MP3, AAC (M4A), WAV, FLAC, Opus, or OGG.',
          'Select bitrate: 64, 128, 192, 256, or 320 kbps.',
          'Click "Extract Audio" to extract the audio track using FFmpeg.wasm.',
          'Preview and download the extracted audio file.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your video never leaves your device.' },
          { title: 'Multiple output formats', description: 'MP3, AAC (M4A), WAV, FLAC, Opus, OGG — choose the best format for your needs.' },
          { title: 'Adjustable bitrate', description: '64-320 kbps control for file size vs quality balance.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Extract Audio tool free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Can I extract audio without quality loss?', a: 'Choose WAV or FLAC output for lossless extraction. MP3/AAC/OGG will involve re-encoding with some quality loss depending on bitrate.' },
          { q: 'Can I extract audio from a specific time range?', a: 'This tool extracts the entire audio track. For partial extraction, use the Video Trimmer first, then extract audio from the trimmed clip.' },
          { q: 'What formats are supported?', a: 'MP4, WebM, MOV, AVI input. Output: MP3, AAC (M4A), WAV, FLAC, Opus, OGG.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The Extract Audio tool runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <ExtractAudio />
    </ToolPageTemplate>
  );
}