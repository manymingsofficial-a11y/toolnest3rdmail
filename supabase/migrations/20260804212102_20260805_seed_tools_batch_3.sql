INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('base32-decoder', 'Base32 Decoder', 'Decode Base32 encoded text back to plain text.', 'Security Tools', 'Braces', 'from-teal-400 to-emerald-600', NULL, true, 64, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('uuid-bulk-generator', 'UUID Bulk Generator', 'Generate multiple UUIDs at once with custom count.', 'Developer Tools', 'Boxes', 'from-violet-400 to-indigo-600', NULL, true, 76, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('jwt-decoder', 'JWT Decoder', 'Decode JWT tokens and inspect header and payload.', 'Developer Tools', 'FileJson', 'from-indigo-400 to-purple-600', NULL, true, 78, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('jwt-encoder', 'JWT Encoder', 'Create JWT tokens from header and payload JSON.', 'Developer Tools', 'FileJson', 'from-purple-400 to-violet-600', NULL, true, 72, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('sql-formatter', 'SQL Formatter', 'Format and beautify SQL queries instantly.', 'Developer Tools', 'Database', 'from-blue-400 to-cyan-600', NULL, true, 75, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('xml-formatter', 'XML Formatter', 'Beautify and format XML documents.', 'Developer Tools', 'FileCode2', 'from-emerald-400 to-teal-600', NULL, true, 70, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('xml-validator', 'XML Validator', 'Validate XML syntax and find errors instantly.', 'Developer Tools', 'FileCheck', 'from-teal-400 to-cyan-600', NULL, true, 68, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('csv-to-json', 'CSV to JSON', 'Convert CSV data to structured JSON format.', 'Developer Tools', 'FileSpreadsheet', 'from-green-400 to-emerald-600', NULL, true, 74, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('json-to-csv', 'JSON to CSV', 'Convert JSON data to CSV format instantly.', 'Developer Tools', 'FileSpreadsheet', 'from-emerald-400 to-green-600', NULL, true, 73, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('yaml-formatter', 'YAML Formatter', 'Format and beautify YAML documents.', 'Developer Tools', 'Braces', 'from-rose-400 to-pink-600', NULL, true, 67, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('yaml-validator', 'YAML Validator', 'Validate YAML syntax and find errors quickly.', 'Developer Tools', 'FileCheck', 'from-pink-400 to-rose-600', NULL, true, 65, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('color-converter', 'Color Converter', 'Convert colors between HEX, RGB, HSL and CMYK.', 'Developer Tools', 'Palette', 'from-fuchsia-400 to-purple-600', NULL, true, 72, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('hex-to-rgb', 'HEX to RGB', 'Convert HEX color codes to RGB values.', 'Developer Tools', 'Palette', 'from-violet-400 to-fuchsia-600', NULL, true, 70, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('rgb-to-hex', 'RGB to HEX', 'Convert RGB color values to HEX codes.', 'Developer Tools', 'Palette', 'from-fuchsia-400 to-pink-600', NULL, true, 69, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('timestamp-converter', 'Timestamp Converter', 'Convert Unix timestamps to human-readable dates.', 'Developer Tools', 'Timer', 'from-cyan-400 to-blue-600', NULL, true, 76, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('unix-time-converter', 'Unix Time Converter', 'Convert dates to Unix timestamps and back.', 'Developer Tools', 'Timer', 'from-blue-400 to-indigo-600', NULL, true, 73, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('hreflang-generator', 'Hreflang Generator', 'Generate hreflang tags for international SEO.', 'SEO Tools', 'Globe', 'from-blue-400 to-cyan-600', NULL, true, 72, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('schema-markup-generator', 'Schema Markup Generator', 'Generate schema.org JSON-LD structured data.', 'SEO Tools', 'Braces', 'from-violet-400 to-indigo-600', NULL, true, 78, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('faq-schema-generator', 'FAQ Schema Generator', 'Generate FAQ schema markup for rich results.', 'SEO Tools', 'FileText', 'from-indigo-400 to-blue-600', NULL, true, 75, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('breadcrumb-schema-generator', 'Breadcrumb Schema Generator', 'Generate breadcrumb schema markup for SEO.', 'SEO Tools', 'ListTree', 'from-teal-400 to-cyan-600', NULL, true, 70, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('article-schema-generator', 'Article Schema Generator', 'Generate article schema markup for blog posts.', 'SEO Tools', 'FileText', 'from-cyan-400 to-blue-600', NULL, true, 71, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('product-schema-generator', 'Product Schema Generator', 'Generate product schema markup for e-commerce SEO.', 'SEO Tools', 'Package', 'from-emerald-400 to-teal-600', NULL, true, 74, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('website-schema-generator', 'Website Schema Generator', 'Generate website schema markup for your site.', 'SEO Tools', 'Globe', 'from-sky-400 to-blue-600', NULL, true, 69, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('meta-robots-generator', 'Meta Robots Generator', 'Generate meta robots tags for crawl control.', 'SEO Tools', 'Bot', 'from-amber-400 to-orange-600', NULL, true, 68, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('keyword-extractor', 'Keyword Extractor', 'Extract keywords and key phrases from any text.', 'SEO Tools', 'FileSearch', 'from-purple-400 to-violet-600', NULL, true, 73, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('serp-pixel-checker', 'SERP Pixel Checker', 'Check pixel width of titles and meta descriptions.', 'SEO Tools', 'Search', 'from-rose-400 to-pink-600', NULL, true, 70, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('speed-converter', 'Speed Converter', 'Convert between m/s, km/h, mph, knots and more.', 'Converters', 'Wind', 'from-sky-400 to-blue-600', NULL, true, 72, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('area-converter', 'Area Converter', 'Convert between square metres, acres, hectares and more.', 'Converters', 'AreaChart', 'from-emerald-400 to-teal-600', NULL, true, 68, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('volume-converter', 'Volume Converter', 'Convert between litres, gallons, cups and more.', 'Converters', 'Box', 'from-cyan-400 to-blue-600', NULL, true, 70, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('pressure-converter', 'Pressure Converter', 'Convert between pascals, bar, psi and atmospheres.', 'Converters', 'Gauge', 'from-violet-400 to-purple-600', NULL, true, 66, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('energy-converter', 'Energy Converter', 'Convert between joules, calories, kWh and more.', 'Converters', 'Zap', 'from-amber-400 to-orange-600', NULL, true, 67, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('power-converter', 'Power Converter', 'Convert between watts, horsepower and kilowatts.', 'Converters', 'Zap', 'from-yellow-400 to-amber-600', NULL, true, 65, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('fuel-converter', 'Fuel Converter', 'Convert between MPG, L/100km and km/L fuel economy.', 'Converters', 'Fuel', 'from-red-400 to-orange-600', NULL, true, 68, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('currency-converter', 'Currency Converter', 'Convert currencies using your own exchange rates.', 'Converters', 'Coins', 'from-green-400 to-emerald-600', NULL, true, 76, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('ai-blog-title-generator', 'AI Blog Title Generator', 'Generate catchy blog titles from your topic.', 'AI Tools', 'PenLine', 'from-violet-400 to-purple-600', NULL, true, 82, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('ai-blog-outline-generator', 'AI Blog Outline Generator', 'Create structured blog post outlines instantly.', 'AI Tools', 'ListTree', 'from-indigo-400 to-violet-600', NULL, true, 79, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('ai-article-idea-generator', 'AI Article Idea Generator', 'Brainstorm fresh article ideas from any keyword.', 'AI Tools', 'Lightbulb', 'from-amber-400 to-orange-600', NULL, true, 76, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('ai-paragraph-generator', 'AI Paragraph Generator', 'Generate well-structured paragraphs on any topic.', 'AI Tools', 'AlignLeft', 'from-sky-400 to-blue-600', NULL, true, 80, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('ai-sentence-rewriter', 'AI Sentence Rewriter', 'Rewrite sentences to improve flow and clarity.', 'AI Tools', 'RefreshCw', 'from-cyan-400 to-teal-600', NULL, true, 78, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('ai-grammar-improver', 'AI Grammar Improver', 'Fix grammar and spelling errors automatically.', 'AI Tools', 'SpellCheck', 'from-emerald-400 to-green-600', NULL, true, 81, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('ai-summarizer', 'AI Summarizer', 'Summarize long text into key points instantly.', 'AI Tools', 'FileMinus2', 'from-rose-400 to-pink-600', NULL, true, 84, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('ai-expand-text', 'AI Expand Text', 'Expand short text into detailed paragraphs.', 'AI Tools', 'FilePlus2', 'from-blue-400 to-indigo-600', NULL, true, 77, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('ai-simplify-text', 'AI Simplify Text', 'Simplify complex text into easy-to-read language.', 'AI Tools', 'Minimize2', 'from-teal-400 to-cyan-600', NULL, true, 75, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('ai-humanize-text', 'AI Humanize Text', 'Make AI-generated text sound natural and human.', 'AI Tools', 'UserCheck', 'from-fuchsia-400 to-pink-600', NULL, true, 83, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('ai-meta-title-generator', 'AI Meta Title Generator', 'Generate SEO-optimized meta titles for pages.', 'AI Tools', 'Tag', 'from-purple-400 to-violet-600', NULL, true, 80, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('ai-meta-description-generator', 'AI Meta Description Generator', 'Create compelling meta descriptions for SEO.', 'AI Tools', 'FileText', 'from-indigo-400 to-purple-600', NULL, true, 79, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('ai-keyword-generator', 'AI Keyword Generator', 'Generate targeted keywords for your content.', 'AI Tools', 'Hash', 'from-violet-400 to-indigo-600', NULL, true, 78, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('ai-faq-generator', 'AI FAQ Generator', 'Generate FAQs with answers from your topic.', 'AI Tools', 'HelpCircle', 'from-blue-400 to-cyan-600', NULL, true, 77, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('ai-seo-outline-generator', 'AI SEO Outline Generator', 'Create SEO-optimized content outlines instantly.', 'AI Tools', 'ListTree', 'from-cyan-400 to-blue-600', NULL, true, 74, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
INSERT INTO admin_tools (slug, name, description, category, icon_name, gradient, badge, is_new, popularity, added_days_ago, keywords)
VALUES ('ai-slug-generator-pro', 'AI Slug Generator Pro', 'Generate clean, SEO-friendly URL slugs.', 'AI Tools', 'Link2', 'from-teal-400 to-emerald-600', NULL, true, 72, NULL, ARRAY[]::text[])
ON CONFLICT (slug) DO NOTHING;
