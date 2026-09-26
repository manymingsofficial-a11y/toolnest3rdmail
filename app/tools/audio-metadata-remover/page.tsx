import { ToolPageTemplate, buildToolMetadata } from '@/components/tool-page-template';
import { AudioMetadataRemover } from '@/components/audio/audio-metadata-remover';
import { audioToolConfigs } from '@/lib/audio-configs';

export const metadata = buildToolMetadata(
  'audio-metadata-remover',
  'Audio Metadata Remover',
  'Remove ID3 tags and metadata from audio files. Fast, free, and runs entirely in your browser.'
);

const relatedSlugs = ['audio-metadata-viewer', 'audio-compressor', 'video-metadata-remover'];

export default function AudioMetadataRemoverPage() {
  return (
    <ToolPageTemplate
      slug="audio-metadata-remover"
      relatedSlugs={relatedSlugs}
      blurColor="bg-green-400/20"
      seo={{
        whatIs: `The Audio Metadata Remover is a free online tool that strips all ID3 tags and metadata from audio files to protect your privacy. It removes title, artist, album, year, genre, cover art, and all other ID3 tags while preserving the original audio quality — all processing happens locally in your browser using music-metadata.`,
        howTo: [
          'Upload an audio file (MP3, WAV, OGG, M4A, FLAC) by dragging it into the upload area or clicking to browse.',
          'Click "Remove Metadata" to strip all ID3 tags and metadata using music-metadata library.',
          'Download the cleaned audio file with all metadata stripped.',
          'The audio data is preserved without re-encoding, maintaining original quality.',
        ],
        benefits: [
          { title: 'Free and unlimited', description: 'Use this tool as many times as you want, completely free with no sign-up required.' },
          { title: 'Privacy first', description: 'All processing happens in your browser using music-metadata. Your audio never leaves your device.' },
          { title: 'Preserves quality', description: 'Metadata is stripped by rewriting the file — audio data is preserved without re-encoding.' },
          { title: 'Fast and lossless', description: 'Metadata removal is fast since no audio re-encoding is required.' },
        ],
        faqs: [
          { q: 'Is the Audio Metadata Remover free to use?', a: 'Yes, it is completely free with no limits, no registration, and no API keys required.' },
          { q: 'Does the Audio Metadata Remover work on mobile?', a: 'Yes, the tool is fully responsive and works on any modern mobile browser.' },
          { q: 'Is my data sent to a server?', a: 'No. All processing happens locally in your browser using music-metadata. Your audio never leaves your device.' },
          { q: 'Will removing metadata affect audio quality?', a: 'No. The tool rewrites the file without the metadata tags — audio data is preserved without re-encoding, maintaining 100% of the original quality.' },
          { q: 'What metadata is removed?', a: 'All ID3 tags are stripped including title, artist, album, year, genre, cover art, track number, and any custom tags.' },
        ],
      }}
    >
      <AudioMetadataRemover />
    </ToolPageTemplate>
  );
}