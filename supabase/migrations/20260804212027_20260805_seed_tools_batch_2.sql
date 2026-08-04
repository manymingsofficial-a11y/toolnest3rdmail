INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('sitemap-generator', 'Sitemap Generator', 'Generate XML sitemaps for search engine indexing.', 'SEO Tools', 'Network', 'from-emerald-400 to-teal-600', NULL, false, 77, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('keyword-density-checker', 'Keyword Density Checker', 'Analyze keyword density and frequency in your content.', 'SEO Tools', 'FileSearch', 'from-purple-400 to-violet-600', NULL, false, 74, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('slug-generator', 'Slug Generator', 'Generate SEO-friendly URL slugs from any text.', 'SEO Tools', 'Slash', 'from-cyan-400 to-blue-600', NULL, false, 73, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('canonical-url-generator', 'Canonical URL Generator', 'Generate canonical URL tags to avoid duplicate content.', 'SEO Tools', 'Link', 'from-teal-400 to-cyan-600', NULL, false, 71, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('search-snippet-preview', 'Search Snippet Preview', 'Preview how your page appears in Google search results.', 'SEO Tools', 'Search', 'from-indigo-400 to-blue-600', 'New', false, 82, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('redirect-checker', 'Redirect Checker', 'Check URL redirect chains and HTTP status codes.', 'SEO Tools', 'Route', 'from-amber-400 to-orange-600', NULL, false, 70, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('background-remover', 'Background Remover', 'Remove image backgrounds automatically in your browser.', 'Image Tools', 'Eraser', 'from-fuchsia-400 to-pink-600', NULL, true, 91, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('image-watermark', 'Image Watermark', 'Add text or logo watermarks to protect your images.', 'Image Tools', 'Droplets', 'from-cyan-400 to-blue-600', NULL, true, 76, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('image-rotator', 'Image Rotator', 'Rotate images by any angle with live preview.', 'Image Tools', 'RotateCw', 'from-sky-400 to-indigo-500', NULL, true, 70, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('image-flipper', 'Image Flipper', 'Flip images horizontally or vertically instantly.', 'Image Tools', 'FlipHorizontal2', 'from-teal-400 to-cyan-600', NULL, true, 68, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('image-color-picker', 'Image Color Picker', 'Pick exact colors from any point in an image.', 'Image Tools', 'Pipette', 'from-violet-400 to-purple-600', NULL, true, 72, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('image-blur', 'Image Blur', 'Apply adjustable blur effects to your images.', 'Image Tools', 'Droplets', 'from-blue-400 to-violet-600', NULL, true, 65, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('image-sharpen', 'Image Sharpen', 'Sharpen blurry images with adjustable intensity.', 'Image Tools', 'Contrast', 'from-amber-400 to-orange-600', NULL, true, 67, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('image-brightness-adjuster', 'Image Brightness Adjuster', 'Adjust the brightness of any image with a slider.', 'Image Tools', 'Sun', 'from-yellow-400 to-amber-600', NULL, true, 69, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('image-contrast-adjuster', 'Image Contrast Adjuster', 'Fine-tune image contrast with live preview.', 'Image Tools', 'Contrast', 'from-slate-400 to-gray-600', NULL, true, 66, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('image-grayscale', 'Image Grayscale', 'Convert images to grayscale instantly.', 'Image Tools', 'Contrast', 'from-gray-400 to-slate-600', NULL, true, 71, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('image-sepia-filter', 'Image Sepia Filter', 'Apply a vintage sepia tone to your images.', 'Image Tools', 'Sun', 'from-amber-400 to-yellow-600', NULL, true, 63, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('image-border-creator', 'Image Border Creator', 'Add custom borders with adjustable width and color.', 'Image Tools', 'Frame', 'from-rose-400 to-pink-600', NULL, true, 64, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('image-rounded-corners', 'Image Rounded Corners', 'Round the corners of any image with radius control.', 'Image Tools', 'Frame', 'from-fuchsia-400 to-rose-600', NULL, true, 62, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('image-metadata-viewer', 'Image Metadata Viewer', 'View EXIF and metadata embedded in your images.', 'Image Tools', 'Info', 'from-cyan-400 to-teal-600', NULL, true, 68, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('image-metadata-remover', 'Image Metadata Remover', 'Strip EXIF and metadata from images for privacy.', 'Image Tools', 'Eraser', 'from-emerald-400 to-green-600', NULL, true, 75, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('pdf-rotate', 'PDF Rotate', 'Rotate PDF pages 90, 180 or 270 degrees.', 'PDF Tools', 'RotateCw', 'from-orange-400 to-red-600', NULL, true, 80, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('pdf-unlock', 'PDF Unlock', 'Remove password protection from PDF files.', 'PDF Tools', 'Unlock', 'from-amber-400 to-orange-600', NULL, true, 78, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('pdf-protect', 'PDF Protect', 'Add password protection to your PDF documents.', 'PDF Tools', 'Lock', 'from-red-400 to-rose-600', NULL, true, 79, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('pdf-page-number', 'PDF Page Number', 'Add page numbers to PDF documents automatically.', 'PDF Tools', 'Hash', 'from-rose-400 to-pink-600', NULL, true, 72, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('pdf-delete-pages', 'PDF Delete Pages', 'Remove unwanted pages from PDF files.', 'PDF Tools', 'Scissors', 'from-red-400 to-orange-600', NULL, true, 77, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('pdf-extract-pages', 'PDF Extract Pages', 'Extract specific pages from a PDF into a new file.', 'PDF Tools', 'FileOutput', 'from-amber-400 to-yellow-600', NULL, true, 76, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('pdf-reorder-pages', 'PDF Reorder Pages', 'Rearrange PDF pages in any order with drag and drop.', 'PDF Tools', 'ArrowDownUp', 'from-orange-400 to-amber-600', NULL, true, 74, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('pdf-watermark', 'PDF Watermark', 'Add text watermarks to PDF documents.', 'PDF Tools', 'Droplets', 'from-rose-400 to-red-600', NULL, true, 70, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('pdf-metadata-editor', 'PDF Metadata Editor', 'Edit title, author, subject and keywords in PDFs.', 'PDF Tools', 'FileEdit', 'from-amber-400 to-orange-600', NULL, true, 68, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('pdf-viewer', 'PDF Viewer', 'View and read PDF files directly in your browser.', 'PDF Tools', 'Eye', 'from-yellow-400 to-amber-600', NULL, true, 73, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('text-repeater', 'Text Repeater', 'Repeat any text multiple times with custom separators.', 'Text Tools', 'Repeat2', 'from-sky-400 to-blue-600', NULL, true, 71, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('text-reverser', 'Text Reverser', 'Reverse text character by character or line by line.', 'Text Tools', 'ArrowDownUp', 'from-cyan-400 to-teal-600', NULL, true, 69, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('random-text-generator', 'Random Text Generator', 'Generate random words, sentences and paragraphs.', 'Text Tools', 'Shuffle', 'from-violet-400 to-purple-600', NULL, true, 67, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('line-counter', 'Line Counter', 'Count lines, words and characters in your text.', 'Text Tools', 'ListTree', 'from-blue-400 to-indigo-600', NULL, true, 66, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('remove-extra-spaces', 'Remove Extra Spaces', 'Clean up multiple spaces, tabs and blank lines.', 'Text Tools', 'Eraser', 'from-teal-400 to-cyan-600', NULL, true, 68, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('text-compare', 'Text Compare', 'Compare two text blocks and highlight differences.', 'Text Tools', 'FileDiff', 'from-indigo-400 to-violet-600', NULL, true, 74, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('find-and-replace', 'Find & Replace', 'Find and replace text with regex support.', 'Text Tools', 'Replace', 'from-purple-400 to-fuchsia-600', NULL, true, 72, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('text-cleaner', 'Text Cleaner', 'Remove formatting, special chars and clean up text.', 'Text Tools', 'Wand2', 'from-cyan-400 to-sky-600', NULL, true, 70, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('markdown-preview', 'Markdown Preview', 'Write Markdown and see live rendered output instantly.', 'Text Tools', 'Type', 'from-cyan-400 to-blue-500', NULL, true, 76, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('html-to-text', 'HTML to Text', 'Convert HTML markup to clean plain text.', 'Text Tools', 'FileCode2', 'from-orange-400 to-red-600', NULL, true, 68, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('password-encryptor', 'Password Encryptor', 'Encrypt text with AES-GCM and a password.', 'Security Tools', 'Lock', 'from-cyan-400 to-blue-600', NULL, true, 73, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('password-decryptor', 'Password Decryptor', 'Decrypt AES-GCM encrypted text with a password.', 'Security Tools', 'Unlock', 'from-blue-400 to-indigo-600', NULL, true, 71, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('random-pin-generator', 'Random PIN Generator', 'Generate secure random PINs of any length.', 'Security Tools', 'KeyRound', 'from-teal-400 to-cyan-600', NULL, true, 70, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('random-number-generator', 'Random Number Generator', 'Generate random numbers within a custom range.', 'Security Tools', 'Dices', 'from-violet-400 to-purple-600', NULL, true, 72, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('otp-generator', 'OTP Generator', 'Generate one-time passwords using TOTP/HOTP.', 'Security Tools', 'KeyRound', 'from-emerald-400 to-teal-600', NULL, true, 75, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('hash-compare', 'Hash Compare', 'Compare two hashes to check if they match.', 'Security Tools', 'ShieldAlert', 'from-rose-400 to-red-600', NULL, true, 66, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('bcrypt-generator', 'Bcrypt Generator', 'Generate bcrypt password hashes with adjustable rounds.', 'Security Tools', 'ShieldCheck', 'from-indigo-400 to-blue-600', NULL, true, 74, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('sha1-hash-generator', 'SHA1 Hash Generator', 'Generate SHA1 hashes from any text input.', 'Security Tools', 'Hash', 'from-purple-400 to-violet-600', NULL, true, 67, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('base32-encoder', 'Base32 Encoder', 'Encode text to Base32 format instantly.', 'Security Tools', 'Braces', 'from-cyan-400 to-teal-600', NULL, true, 65, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
