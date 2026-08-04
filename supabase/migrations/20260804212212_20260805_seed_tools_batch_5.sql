INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('video-thumbnail-generator', 'Video Thumbnail Generator', 'Extract frames from videos as thumbnail images.', 'Video Tools', 'FileImage', 'from-red-400 to-amber-600', NULL, true, 69, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('video-metadata-viewer', 'Video Metadata Viewer', 'Inspect codec, resolution, duration and more.', 'Video Tools', 'Info', 'from-rose-400 to-red-600', NULL, true, 65, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('video-metadata-remover', 'Video Metadata Remover', 'Strip metadata from video files for privacy.', 'Video Tools', 'Eraser', 'from-red-400 to-orange-600', NULL, true, 63, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('audio-converter', 'Audio Converter', 'Convert audio between MP3, WAV, OGG and more.', 'Audio Tools', 'AudioLines', 'from-green-400 to-emerald-600', NULL, true, 80, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('mp3-cutter', 'MP3 Cutter', 'Cut MP3 files to keep only the parts you need.', 'Audio Tools', 'Scissors', 'from-emerald-400 to-teal-600', NULL, true, 82, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('audio-trimmer', 'Audio Trimmer', 'Trim silence and unwanted parts from audio files.', 'Audio Tools', 'Scissors', 'from-teal-400 to-cyan-600', NULL, true, 75, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('audio-compressor', 'Audio Compressor', 'Reduce audio file size without losing quality.', 'Audio Tools', 'Archive', 'from-green-400 to-teal-600', NULL, true, 73, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('merge-audio', 'Merge Audio', 'Combine multiple audio files into one track.', 'Audio Tools', 'FilePlus', 'from-emerald-400 to-green-600', NULL, true, 70, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('reverse-audio', 'Reverse Audio', 'Play any audio file in reverse instantly.', 'Audio Tools', 'Repeat', 'from-teal-400 to-emerald-600', NULL, true, 66, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('volume-booster', 'Volume Booster', 'Increase audio volume up to 3x without distortion.', 'Audio Tools', 'Volume2', 'from-green-400 to-lime-600', NULL, true, 78, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('audio-speed-changer', 'Audio Speed Changer', 'Change audio playback speed without changing pitch.', 'Audio Tools', 'Gauge', 'from-emerald-400 to-cyan-600', NULL, true, 72, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('pitch-changer', 'Pitch Changer', 'Shift the pitch of any audio file up or down.', 'Audio Tools', 'Music', 'from-green-400 to-emerald-600', NULL, true, 68, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('voice-recorder', 'Voice Recorder', 'Record audio from your microphone in the browser.', 'Audio Tools', 'Mic', 'from-teal-400 to-green-600', NULL, true, 81, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('text-to-speech', 'Text to Speech', 'Convert written text into natural-sounding speech.', 'Audio Tools', 'AudioLines', 'from-emerald-400 to-teal-600', NULL, true, 84, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('speech-to-text', 'Speech to Text', 'Transcribe spoken audio into text using your browser.', 'Audio Tools', 'Mic', 'from-green-400 to-cyan-600', NULL, true, 79, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('audio-metadata-viewer', 'Audio Metadata Viewer', 'View ID3 tags, bitrate and codec info.', 'Audio Tools', 'Info', 'from-teal-400 to-emerald-600', NULL, true, 64, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('audio-metadata-remover', 'Audio Metadata Remover', 'Remove ID3 tags and metadata from audio files.', 'Audio Tools', 'Eraser', 'from-green-400 to-teal-600', NULL, true, 62, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('word-to-pdf', 'Word to PDF', 'Convert DOCX documents to PDF in your browser.', 'Office Tools', 'FileText', 'from-blue-400 to-indigo-600', NULL, true, 86, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('excel-to-pdf', 'Excel to PDF', 'Convert XLSX spreadsheets to PDF format.', 'Office Tools', 'FileSpreadsheet', 'from-green-400 to-blue-600', NULL, true, 80, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('powerpoint-to-pdf', 'PowerPoint to PDF', 'Convert PPTX presentations to PDF.', 'Office Tools', 'Presentation', 'from-orange-400 to-red-600', NULL, true, 76, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('pdf-to-word', 'PDF to Word', 'Convert PDF documents to editable DOCX files.', 'Office Tools', 'FileText', 'from-indigo-400 to-blue-600', NULL, true, 84, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('pdf-to-excel', 'PDF to Excel', 'Extract tables from PDF into XLSX format.', 'Office Tools', 'FileSpreadsheet', 'from-blue-400 to-green-600', NULL, true, 78, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('pdf-to-powerpoint', 'PDF to PowerPoint', 'Convert PDF pages to editable PPTX slides.', 'Office Tools', 'Presentation', 'from-red-400 to-orange-600', NULL, true, 72, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('docx-viewer', 'DOCX Viewer', 'View Word documents directly in your browser.', 'Office Tools', 'FileText', 'from-blue-400 to-cyan-600', NULL, true, 74, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('docx-editor', 'DOCX Editor', 'Edit Word documents online without any software.', 'Office Tools', 'FileEdit', 'from-indigo-400 to-violet-600', NULL, true, 77, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('excel-viewer', 'Excel Viewer', 'View XLSX spreadsheets in your browser.', 'Office Tools', 'FileSpreadsheet', 'from-green-400 to-emerald-600', NULL, true, 73, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('csv-viewer', 'CSV Viewer', 'View CSV files in a clean, sortable table.', 'Office Tools', 'Table', 'from-teal-400 to-cyan-600', NULL, true, 76, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('csv-editor', 'CSV Editor', 'Edit CSV data in a spreadsheet-like interface.', 'Office Tools', 'Table', 'from-cyan-400 to-blue-600', NULL, true, 75, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('csv-merge', 'CSV Merge', 'Combine multiple CSV files into one dataset.', 'Office Tools', 'FilePlus', 'from-blue-400 to-teal-600', NULL, true, 70, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('csv-split', 'CSV Split', 'Split a large CSV into multiple smaller files.', 'Office Tools', 'Scissors', 'from-teal-400 to-blue-600', NULL, true, 68, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('excel-to-csv', 'Excel to CSV', 'Convert XLSX spreadsheets to CSV format.', 'Office Tools', 'FileSpreadsheet', 'from-green-400 to-teal-600', NULL, true, 74, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('csv-to-excel', 'CSV to Excel', 'Convert CSV data into XLSX spreadsheet files.', 'Office Tools', 'FileSpreadsheet', 'from-teal-400 to-green-600', NULL, true, 72, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('ppt-viewer', 'PPT Viewer', 'View PowerPoint presentations in your browser.', 'Office Tools', 'Presentation', 'from-orange-400 to-amber-600', NULL, true, 66, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('color-palette-generator', 'Color Palette Generator', 'Generate beautiful color palettes from any base color.', 'Design Tools', 'Palette', 'from-fuchsia-400 to-pink-600', NULL, true, 85, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('gradient-generator', 'Gradient Generator', 'Create smooth CSS gradients with live preview.', 'Design Tools', 'Blend', 'from-violet-400 to-purple-600', NULL, true, 82, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('css-gradient-generator', 'CSS Gradient Generator', 'Generate CSS linear and radial gradient code.', 'Design Tools', 'Brush', 'from-purple-400 to-indigo-600', NULL, true, 79, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('glassmorphism-generator', 'Glassmorphism Generator', 'Create frosted glass UI effects with CSS.', 'Design Tools', 'Layers', 'from-cyan-400 to-blue-600', NULL, true, 76, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('neumorphism-generator', 'Neumorphism Generator', 'Generate soft UI neumorphism CSS styles.', 'Design Tools', 'Box', 'from-slate-400 to-gray-600', NULL, true, 73, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('css-button-generator', 'CSS Button Generator', 'Design and generate CSS buttons with live preview.', 'Design Tools', 'MousePointerClick', 'from-amber-400 to-orange-600', NULL, true, 81, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('css-shadow-generator', 'CSS Shadow Generator', 'Create box-shadow CSS code with visual preview.', 'Design Tools', 'Square', 'from-indigo-400 to-violet-600', NULL, true, 78, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('border-radius-generator', 'Border Radius Generator', 'Generate border-radius CSS with visual preview.', 'Design Tools', 'Spline', 'from-teal-400 to-cyan-600', NULL, true, 70, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('svg-viewer', 'SVG Viewer', 'View and inspect SVG files with code preview.', 'Design Tools', 'FileCode2', 'from-violet-400 to-purple-600', NULL, true, 72, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('svg-optimizer', 'SVG Optimizer', 'Minify and optimize SVG files for the web.', 'Design Tools', 'Minimize2', 'from-purple-400 to-indigo-600', NULL, true, 69, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('svg-to-png', 'SVG to PNG', 'Convert SVG files to PNG images instantly.', 'Design Tools', 'FileImage', 'from-fuchsia-400 to-violet-600', NULL, true, 75, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('png-to-svg', 'PNG to SVG', 'Convert PNG images to SVG vector format.', 'Design Tools', 'FileImage', 'from-violet-400 to-fuchsia-600', NULL, true, 67, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('favicon-generator', 'Favicon Generator', 'Create favicons from any image for your website.', 'Design Tools', 'Star', 'from-amber-400 to-yellow-600', NULL, true, 77, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('image-placeholder-generator', 'Image Placeholder Generator', 'Generate placeholder images for mockups and prototypes.', 'Design Tools', 'ImageIcon', 'from-pink-400 to-rose-600', NULL, true, 71, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('browser-information', 'Browser Information', 'View your browser, OS, screen and capability details.', 'Web Utilities', 'Monitor', 'from-cyan-400 to-teal-600', NULL, true, 72, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('user-agent-parser', 'User Agent Parser', 'Parse and decode any user agent string.', 'Web Utilities', 'Info', 'from-teal-400 to-cyan-600', NULL, true, 68, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('ip-address-checker', 'IP Address Checker', 'Check your IP address and network details.', 'Web Utilities', 'Server', 'from-blue-400 to-cyan-600', NULL, true, 75, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
