-- Restore the 17 original categories into the empty admin_categories table.
-- Safe: INSERT-only, ON CONFLICT DO NOTHING. Does not touch admin_tools or any other table.

INSERT INTO admin_categories (slug, name, count, icon_name, gradient, description, sort_order) VALUES
  ('pdf-tools', 'PDF Tools', 13, 'FileText', 'from-rose-400 to-red-600', 'Merge, split, convert and optimize PDF files.', 0),
  ('image-tools', 'Image Tools', 19, 'ImageIcon', 'from-fuchsia-400 to-purple-600', 'Compress, resize and convert images instantly.', 1),
  ('qr-tools', 'QR & Barcode Tools', 4, 'QrCode', 'from-emerald-400 to-teal-600', 'Generate QR codes and barcodes for anything.', 2),
  ('seo-tools', 'SEO Tools', 20, 'Search', 'from-orange-400 to-amber-600', 'Analyze and improve your search visibility.', 3),
  ('ai-tools', 'AI Tools', 51, 'Sparkles', 'from-sky-400 to-blue-600', 'Generate text, images and ideas with AI.', 4),
  ('text-tools', 'Text Tools', 16, 'Type', 'from-cyan-400 to-blue-500', 'Count, convert, format and transform text.', 5),
  ('developer-tools', 'Developer Tools', 25, 'Code2', 'from-violet-400 to-indigo-600', 'Format, encode and debug code faster.', 6),
  ('calculators', 'Calculators', 10, 'Calculator', 'from-blue-400 to-purple-500', 'Financial, health and everyday calculators.', 7),
  ('converters', 'Converters', 13, 'ArrowLeftRight', 'from-indigo-400 to-blue-600', 'Convert units, files and formats with ease.', 8),
  ('social-media-tools', 'Social Media Tools', 0, 'Share2', 'from-pink-400 to-rose-600', 'Optimize posts and grow your presence.', 9),
  ('security-tools', 'Security Tools', 14, 'ShieldCheck', 'from-cyan-400 to-blue-500', 'Generate passwords, UUIDs and check password strength.', 10),
  ('video-tools', 'Video Tools', 18, 'Video', 'from-red-400 to-rose-600', 'Compress, convert, trim and edit videos in your browser.', 11),
  ('audio-tools', 'Audio Tools', 14, 'AudioLines', 'from-green-400 to-emerald-600', 'Convert, trim, record and edit audio files instantly.', 12),
  ('office-tools', 'Office Tools', 16, 'FileSpreadsheet', 'from-blue-400 to-indigo-600', 'Convert and edit Word, Excel, PowerPoint and CSV files.', 13),
  ('design-tools', 'Design Tools', 14, 'Palette', 'from-fuchsia-400 to-pink-600', 'Generate palettes, gradients, shadows and CSS styles.', 14),
  ('web-utilities', 'Web Utilities', 12, 'Globe', 'from-cyan-400 to-teal-600', 'Check browsers, DNS, SSL and inspect web resources.', 15),
  ('productivity', 'Productivity', 10, 'ListTodo', 'from-amber-400 to-orange-600', 'Notes, timers, calendars and planning utilities.', 16)
ON CONFLICT (slug) DO NOTHING;
