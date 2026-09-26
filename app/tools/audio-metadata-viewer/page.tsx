import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { AudioMetadataViewer } from '@/components/audio/audio-metadata-viewer';
import { audioToolConfigs } from '@/lib/audio-configs';

export const metadata = buildToolMetadata(
  'audio-metadata-viewer',
  'Audio Metadata Viewer',
  'View ID3 tags, bitrate, codec, sample rate, and more. Free, private, and works in your browser.'
);

const relatedSlugs = ['audio-metadata-remover', 'audio-converter', 'video-metadata-viewer'];

export default function AudioMetadataViewerPage() {
  return (
    <ToolPageTemplate
      slug="audio-metadata-viewer"
      relatedSlugs={relatedSlugs}
      blurColor="bg-teal-400/20"
      seo={{
        whatIs: `The Audio Metadata Viewer is a free online tool that extracts and displays detailed ID3 tags and technical metadata from audio files. Upload any audio file (MP3, WAV, OGG, M4A, FLAC) to instantly view title, artist, album, year, genre, duration, bitrate, codec, sample rate, channels, and more — all processing happens locally in your browser with no uploads or registration.`,
        howTo: [
          'Upload an audio file (MP3, WAV, OGG, M4A, FLAC) by dragging it into the upload area or clicking to browse.',
          'Click "Extract Metadata" to analyze the file using music-metadata library.',
          'View the complete metadata including title, artist, album, year, genre, duration, bitrate, codec, sample rate, and channels.',
          'Copy or download the metadata as JSON for your records.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using music-metadata. Your audio never leaves your device.' },
          { title: 'Comprehensive ID3 support', description: 'Reads ID3v1, ID3v2.3, ID3v2.4, Vorbis Comments, APE tags, and more.' },
          { title: 'Works on any device', description: 'Fully responsive and works on desktop, tablet, and mobile browsers.' },
        ],
        faqs: [
          { q: 'Is the Audio Metadata Viewer free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does the Audio Metadata Viewer work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser using music-metadata. Your audio never leaves your device.' },
          { q: 'What metadata fields are displayed?', a: 'Title, artist, album, year, genre, duration, bitrate, codec, sample rate, channels, file size, and file type.' },
          { q: 'What audio formats are supported?', a: 'MP3, WAV, OGG, M4A, FLAC, and other common formats supported by the music-metadata library.' },
        ],
      }}
    >
      <AudioMetadataViewer />
    </ToolPageTemplate>
  );
}