import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { AudioConverter } from '@/components/audio/audio-converter';

export const metadata = buildToolMetadata(
  'audio-converter',
  'Audio Converter',
  'Convert audio between MP3, WAV, OGG, AAC, FLAC, Opus and more. Free, fast, runs in your browser with FFmpeg.'
);

const relatedSlugs = ['audio-trimmer', 'audio-merger', 'mp3-cutter'];

export default function AudioConverterPage() {
  return (
    <ToolPageTemplate
      slug="audio-converter"
      relatedSlugs={relatedSlugs}
      blurColor="bg-green-400/20"
      seo={{
        whatIs: `The Audio Converter is a free online tool that converts audio files between multiple formats (MP3, WAV, AAC, FLAC, Opus, OGG). Upload any audio file, choose your output format and bitrate, and get a converted file — all processing happens locally in your browser using FFmpeg.wasm with no uploads, no registration, and no paid APIs. The audio is re-encoded to your chosen format and quality settings.`,
        howTo: [
          'Upload an audio file (MP3, WAV, OGG, M4A, FLAC) by dragging it into the upload area or clicking to browse.',
          'Select the output format: MP3, AAC (M4A), WAV, FLAC, Opus, or OGG Vorbis.',
          'Choose the bitrate: 64, 128, 192, 256, or 320 kbps.',
          'Click "Convert Audio" to process using FFmpeg.wasm with the selected codec.',
          'Preview the converted audio and download it.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using FFmpeg.wasm. Your audio never leaves your device.' },
          { title: 'Multiple output formats', description: 'Convert to MP3, AAC, WAV, FLAC, Opus, or OGG with configurable bitrate.' },
          { title: 'Quality control', description: 'Adjust bitrate from 64 to 320 kbps for MP3/AAC/OGG outputs.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Audio Converter free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'What output formats are supported?', a: 'MP3, AAC (M4A), WAV, FLAC, Opus, and OGG Vorbis.' },
          { q: 'Does converting reduce audio quality?', a: 'Converting between lossy formats (MP3, AAC, OGG, Opus) involves re-encoding which may reduce quality. For best quality, convert to lossless formats (WAV, FLAC) or use higher bitrates.' },
          { q: 'Can I convert to a specific bitrate?', a: 'Yes, you can choose from 64, 128, 192, 256, or 320 kbps for lossy formats.' },
          { q: 'What input formats are supported?', a: 'MP3, WAV, OGG, M4A (AAC), and FLAC.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser. Your input never leaves your device.' },
          { q: 'Do I need to install any software?', a: 'No. The Audio Converter runs entirely in your browser with no downloads or plugins required.' },
        ],
      }}
    >
      <AudioConverter />
    </ToolPageTemplate>
  );
}