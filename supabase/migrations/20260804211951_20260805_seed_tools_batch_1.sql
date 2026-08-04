INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('qr-code-generator', 'QR Code Generator', 'Create custom QR codes for links, text and more in seconds.', 'QR & Barcode Tools', 'QrCode', 'from-emerald-400 to-teal-600', 'Popular', false, 98, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('barcode-generator', 'Barcode Generator', 'Generate barcodes in multiple formats for products and labels.', 'QR & Barcode Tools', 'Barcode', 'from-emerald-400 to-green-600', NULL, false, 84, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('qr-scanner', 'QR Scanner', 'Scan QR codes with your camera or decode them from an image.', 'QR & Barcode Tools', 'ScanLine', 'from-sky-400 to-indigo-600', NULL, false, 88, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('qr-history', 'QR History', 'View, reopen and download every QR code you generated or scanned.', 'QR & Barcode Tools', 'History', 'from-slate-400 to-slate-600', NULL, false, 70, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('image-compressor', 'Image Compressor', 'Reduce image file size without losing visible quality.', 'Image Tools', 'Gauge', 'from-fuchsia-400 to-purple-600', 'Popular', false, 95, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('image-resizer', 'Image Resizer', 'Resize images to exact dimensions with aspect ratio lock.', 'Image Tools', 'Scaling', 'from-sky-400 to-blue-600', NULL, false, 86, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('image-converter', 'Image Converter', 'Convert images between JPG, PNG and WEBP formats.', 'Image Tools', 'Repeat', 'from-teal-400 to-cyan-600', NULL, false, 82, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('image-cropper', 'Image Cropper', 'Crop images into square, 16:9, 4:3 or circle shapes.', 'Image Tools', 'Crop', 'from-amber-400 to-orange-600', 'New', false, 80, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('pdf-merge', 'PDF Merge', 'Combine multiple PDF files into a single document.', 'PDF Tools', 'FilePlus', 'from-rose-400 to-red-600', 'Popular', false, 92, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('pdf-split', 'PDF Split', 'Extract pages or split a PDF into separate files.', 'PDF Tools', 'Scissors', 'from-rose-400 to-pink-600', NULL, false, 78, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('pdf-compress', 'PDF Compress', 'Reduce PDF file size with three compression levels.', 'PDF Tools', 'Archive', 'from-red-400 to-orange-600', 'Popular', false, 89, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('password-generator', 'Password Generator', 'Create strong, secure and random passwords instantly.', 'Security Tools', 'KeyRound', 'from-cyan-400 to-blue-500', 'Popular', false, 90, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('password-strength-checker', 'Password Strength Checker', 'Analyze password strength and estimate crack time.', 'Security Tools', 'ShieldCheck', 'from-emerald-400 to-teal-600', NULL, false, 85, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('username-generator', 'Username Generator', 'Generate unique random usernames with prefixes and suffixes.', 'Security Tools', 'UserPlus', 'from-violet-400 to-purple-600', NULL, false, 82, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('uuid-generator', 'UUID Generator', 'Generate random UUID v4 identifiers in bulk.', 'Security Tools', 'Fingerprint', 'from-blue-400 to-indigo-600', NULL, false, 78, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('word-counter', 'Word Counter', 'Count words, characters, sentences and reading time.', 'Text Tools', 'AlignLeft', 'from-sky-400 to-cyan-500', NULL, false, 88, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('json-formatter', 'JSON Formatter', 'Beautify, minify and validate JSON with syntax highlighting.', 'Developer Tools', 'Braces', 'from-violet-400 to-indigo-600', 'Popular', false, 93, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('base64-encoder', 'Base64 Encoder', 'Encode and decode text or files to and from Base64.', 'Developer Tools', 'Binary', 'from-indigo-400 to-blue-600', NULL, false, 80, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('age-calculator', 'Age Calculator', 'Calculate your exact age in years, months and days.', 'Calculators', 'Cake', 'from-pink-400 to-rose-600', 'Popular', false, 88, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('bmi-calculator', 'BMI Calculator', 'Calculate Body Mass Index from height and weight.', 'Calculators', 'HeartPulse', 'from-red-400 to-pink-600', NULL, false, 85, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('percentage-calculator', 'Percentage Calculator', 'Calculate percentages, increases and decreases instantly.', 'Calculators', 'Percent', 'from-blue-400 to-cyan-600', NULL, false, 84, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('loan-emi-calculator', 'Loan EMI Calculator', 'Calculate monthly loan EMI, total interest and payment.', 'Calculators', 'Landmark', 'from-emerald-400 to-green-600', 'Popular', false, 90, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('gst-calculator', 'GST Calculator', 'Calculate GST inclusive and exclusive amounts instantly.', 'Calculators', 'Receipt', 'from-indigo-400 to-blue-600', NULL, false, 82, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('discount-calculator', 'Discount Calculator', 'Calculate discount amounts and final prices after savings.', 'Calculators', 'BadgePercent', 'from-amber-400 to-orange-600', NULL, false, 80, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('tip-calculator', 'Tip Calculator', 'Calculate tips and split bills between any number of people.', 'Calculators', 'Utensils', 'from-teal-400 to-cyan-600', NULL, false, 78, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('simple-interest-calculator', 'Simple Interest Calculator', 'Calculate simple interest on loans and investments.', 'Calculators', 'TrendingUp', 'from-lime-400 to-green-600', NULL, false, 75, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('compound-interest-calculator', 'Compound Interest Calculator', 'Calculate compound interest with compounding frequency.', 'Calculators', 'Sigma', 'from-violet-400 to-purple-600', NULL, false, 77, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('scientific-calculator', 'Scientific Calculator', 'Advanced calculator with trig, log and exponential functions.', 'Calculators', 'Calculator', 'from-slate-400 to-gray-600', 'New', false, 83, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('length-converter', 'Length Converter', 'Convert between metres, feet, inches, miles and more.', 'Converters', 'Ruler', 'from-sky-400 to-blue-600', NULL, false, 82, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('weight-converter', 'Weight Converter', 'Convert between kilograms, pounds, ounces and tonnes.', 'Converters', 'Scale', 'from-orange-400 to-amber-600', NULL, false, 80, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('temperature-converter', 'Temperature Converter', 'Convert between Celsius, Fahrenheit and Kelvin.', 'Converters', 'Thermometer', 'from-red-400 to-orange-600', NULL, false, 81, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('time-converter', 'Time Converter', 'Convert between seconds, minutes, hours, days and weeks.', 'Converters', 'Clock', 'from-indigo-400 to-violet-600', NULL, false, 76, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('data-storage-converter', 'Data Storage Converter', 'Convert between bytes, KB, MB, GB, TB and PB.', 'Converters', 'HardDrive', 'from-teal-400 to-emerald-600', NULL, false, 74, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('url-encoder', 'URL Encoder', 'Encode and decode URLs to safely pass special characters.', 'Developer Tools', 'Link2', 'from-indigo-400 to-cyan-600', NULL, false, 76, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('regex-tester', 'Regex Tester', 'Test regular expressions with live match highlighting.', 'Developer Tools', 'Regex', 'from-violet-400 to-purple-600', 'New', false, 78, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('character-counter', 'Character Counter', 'Count characters, words and spaces in your text instantly.', 'Text Tools', 'Hash', 'from-sky-400 to-blue-500', NULL, false, 84, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('remove-duplicate-lines', 'Remove Duplicate Lines', 'Remove duplicate lines from any text instantly.', 'Text Tools', 'ListOrdered', 'from-teal-400 to-emerald-600', NULL, false, 72, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('text-sorter', 'Text Sorter', 'Sort lines alphabetically, reverse or remove empty lines.', 'Text Tools', 'ListOrdered', 'from-indigo-400 to-violet-600', NULL, false, 70, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('lorem-ipsum-generator', 'Lorem Ipsum Generator', 'Generate placeholder text in words, sentences or paragraphs.', 'Text Tools', 'Pilcrow', 'from-amber-400 to-yellow-600', NULL, false, 76, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('case-converter', 'Case Converter', 'Switch text between upper, lower, title, sentence and toggle case.', 'Text Tools', 'CaseSensitive', 'from-sky-400 to-indigo-500', 'New', false, 80, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('json-validator', 'JSON Validator', 'Validate JSON and find syntax errors instantly.', 'Developer Tools', 'CheckCircle2', 'from-green-400 to-emerald-600', NULL, false, 79, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('html-formatter', 'HTML Formatter', 'Beautify and minify HTML code with proper indentation.', 'Developer Tools', 'FileCode2', 'from-orange-400 to-red-600', NULL, false, 76, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('css-minifier', 'CSS Minifier', 'Minify CSS to reduce file size and improve load speed.', 'Developer Tools', 'Minimize2', 'from-sky-400 to-blue-600', NULL, false, 73, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('js-minifier', 'JavaScript Minifier', 'Minify JavaScript code to reduce file size instantly.', 'Developer Tools', 'FileCode2', 'from-yellow-400 to-amber-600', NULL, false, 75, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('sha256-hash-generator', 'SHA256 Hash Generator', 'Generate SHA-256 hashes from any text input.', 'Developer Tools', 'Fingerprint', 'from-indigo-400 to-violet-600', NULL, false, 72, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('md5-hash-generator', 'MD5 Hash Generator', 'Generate MD5 hashes from any text input instantly.', 'Developer Tools', 'Key', 'from-rose-400 to-pink-600', NULL, false, 70, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('meta-tag-generator', 'Meta Tag Generator', 'Generate SEO meta tags for title, description and more.', 'SEO Tools', 'Tags', 'from-orange-400 to-amber-600', 'Popular', false, 85, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('open-graph-generator', 'Open Graph Generator', 'Generate Open Graph tags for social media sharing.', 'SEO Tools', 'Share2', 'from-blue-400 to-indigo-600', NULL, false, 80, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('twitter-card-generator', 'Twitter Card Generator', 'Generate Twitter Card meta tags for better link previews.', 'SEO Tools', 'Twitter', 'from-sky-400 to-blue-600', NULL, false, 78, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('robots-txt-generator', 'Robots.txt Generator', 'Generate robots.txt files to control search engine crawlers.', 'SEO Tools', 'Bot', 'from-slate-400 to-gray-600', NULL, false, 76, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
