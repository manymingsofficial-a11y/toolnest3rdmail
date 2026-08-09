-- ============================================================
-- RESTORE: Blog posts from lib/seo.ts blogPosts array
-- Using jsonb_build_object to avoid string escaping issues
-- Safety: ON CONFLICT (slug) DO NOTHING — will not overwrite
-- ============================================================

-- Post 1: how-to-choose-the-right-image-compressor
INSERT INTO admin_blog_posts (slug, title, description, category, tags, author, published_at, updated_at_text, reading_time, status, featured_image, content, seo_title, seo_description)
SELECT
  'how-to-choose-the-right-image-compressor',
  'How to Choose the Right Image Compressor for Your Website',
  'Learn how image compression works, the difference between lossy and lossless, and how to pick the best compressor for your needs.',
  'Image Tools',
  ARRAY['image compression', 'web performance', 'image optimization', 'SEO'],
  'ToolNest Team',
  '2025-01-15',
  '2025-06-01',
  7,
  'published',
  NULL,
  jsonb_build_array(
    jsonb_build_object(
      'heading', 'Why Image Compression Matters',
      'body', jsonb_build_array(
        'Images are often the largest assets on a web page. Unoptimized images can slow your site down, hurt your SEO rankings, and frustrate visitors. Compressing images before uploading them is one of the easiest performance wins you can get.',
        'Google''s Core Web Vitals measure loading performance through metrics like Largest Contentful Paint (LCP). Since images are frequently the largest element on a page, reducing their file size directly improves LCP.'
      )
    ),
    jsonb_build_object(
      'heading', 'Lossy vs Lossless Compression',
      'body', jsonb_build_array(
        'Lossless compression reduces file size without removing any data — the decompressed image is pixel-identical to the original. Use lossless when you need perfect fidelity, such as for medical or technical images.',
        'Lossy compression discards less-visible data to achieve much smaller file sizes. For most web use cases — blog images, product photos, social media graphics — lossy compression at 80-85% quality is visually indistinguishable from the original but can be 60-70% smaller.'
      )
    ),
    jsonb_build_object(
      'heading', 'Choosing the Right Format',
      'body', jsonb_build_array(
        'JPEG is best for photographs and complex images with many colors. PNG is ideal for images with transparency or sharp edges like logos. WebP offers superior compression for both photographic and graphic content and is supported by all modern browsers.',
        'ToolNest''s Image Converter lets you switch between JPG, PNG and WebP instantly, so you can test which format gives the best size-to-quality ratio for each image.'
      )
    ),
    jsonb_build_object(
      'heading', 'Recommended Workflow',
      'body', jsonb_build_array(
        '1. Start with the highest-quality source image you have.',
        '2. Resize the image to the maximum dimensions it will be displayed at using the Image Resizer.',
        '3. Convert to WebP if browser support allows.',
        '4. Compress with the Image Compressor at 80-85% quality.',
        '5. Verify the result visually — if it looks good, you''re done.'
      )
    )
  ),
  NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM admin_blog_posts WHERE slug = 'how-to-choose-the-right-image-compressor');

-- Post 2: qr-code-best-practices-for-businesses
INSERT INTO admin_blog_posts (slug, title, description, category, tags, author, published_at, updated_at_text, reading_time, status, featured_image, content, seo_title, seo_description)
SELECT
  'qr-code-best-practices-for-businesses',
  'QR Code Best Practices for Businesses in 2025',
  'Discover how to use QR codes effectively for marketing, menus, payments, and customer engagement with these practical tips.',
  'QR & Barcode Tools',
  ARRAY['QR codes', 'marketing', 'business', 'mobile'],
  'ToolNest Team',
  '2025-02-10',
  NULL,
  6,
  'published',
  NULL,
  jsonb_build_array(
    jsonb_build_object(
      'heading', 'Why QR Codes Are Still Relevant',
      'body', jsonb_build_array(
        'QR codes bridge the gap between physical and digital experiences. Since smartphones can now scan QR codes directly from the camera app without any third-party software, adoption has skyrocketed.',
        'Businesses use QR codes for contactless menus, payment links, product information, WiFi access, and marketing campaigns. The key is making the code easy to scan and the destination valuable.'
      )
    ),
    jsonb_build_object(
      'heading', 'Design Tips for Scannable Codes',
      'body', jsonb_build_array(
        'Maintain high contrast between the code and background — dark code on a light background works best. Keep a quiet zone (margin) of at least 4 modules around the code. If you embed a logo, keep it under 20% of the code area and use error correction level "High".',
        'Test your QR code on multiple devices before printing. A code that scans on your phone may fail on older devices with lower-resolution cameras.'
      )
    ),
    jsonb_build_object(
      'heading', 'Use Cases That Work',
      'body', jsonb_build_array(
        'Restaurant menus: Link to a digital menu that updates in real time. Product packaging: Direct customers to instructional videos or warranty registration. Business cards: Share your contact details as a vCard. WiFi access: Let guests connect without typing a password.',
        'With ToolNest''s QR Code Generator, you can create codes for all these use cases, customize colors to match your brand, add a logo, and download as SVG for print-quality output.'
      )
    )
  ),
  NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM admin_blog_posts WHERE slug = 'qr-code-best-practices-for-businesses');

-- Post 3: pdf-tools-every-office-needs
INSERT INTO admin_blog_posts (slug, title, description, category, tags, author, published_at, updated_at_text, reading_time, status, featured_image, content, seo_title, seo_description)
SELECT
  'pdf-tools-every-office-needs',
  '5 PDF Tools Every Office Needs in 2025',
  'From merging contracts to compressing large files, these free PDF tools will save your team hours every week.',
  'PDF Tools',
  ARRAY['PDF', 'office productivity', 'document management', 'free tools'],
  'ToolNest Team',
  '2025-03-05',
  NULL,
  5,
  'published',
  NULL,
  jsonb_build_array(
    jsonb_build_object(
      'heading', 'PDF Merge: Combine Documents Effortlessly',
      'body', jsonb_build_array(
        'When you need to combine multiple PDFs into one — say, a cover letter, resume, and portfolio — the PDF Merge tool does it in seconds. Just drag and drop your files in the order you want, and download the combined document.'
      )
    ),
    jsonb_build_object(
      'heading', 'PDF Compress: Shrink Files for Email',
      'body', jsonb_build_array(
        'Email providers often limit attachments to 25MB. The PDF Compressor offers three compression levels, so you can find the right balance between file size and quality. Most documents can be reduced by 50-70% without visible quality loss.'
      )
    ),
    jsonb_build_object(
      'heading', 'PDF Split and Extract',
      'body', jsonb_build_array(
        'Need to send just one section of a large report? PDF Split lets you extract specific pages or break a document into individual files. PDF Extract Pages gives you even more control, letting you pick exactly which pages to keep.'
      )
    ),
    jsonb_build_object(
      'heading', 'PDF Protect and Unlock',
      'body', jsonb_build_array(
        'Add password protection to sensitive documents before sharing them externally. Conversely, if you have a password-protected PDF and permission to edit it, PDF Unlock removes the restriction so you can work freely.'
      )
    ),
    jsonb_build_object(
      'heading', 'PDF Rotate and Reorder',
      'body', jsonb_build_array(
        'Scanned documents often come in with pages rotated incorrectly. PDF Rotate fixes individual pages or the entire document. PDF Reorder Pages lets you drag and drop pages into the right sequence before finalizing.'
      )
    )
  ),
  NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM admin_blog_posts WHERE slug = 'pdf-tools-every-office-needs');

-- Post 4: seo-meta-tags-complete-guide
INSERT INTO admin_blog_posts (slug, title, description, category, tags, author, published_at, updated_at_text, reading_time, status, featured_image, content, seo_title, seo_description)
SELECT
  'seo-meta-tags-complete-guide',
  'The Complete Guide to SEO Meta Tags in 2025',
  'Master title tags, meta descriptions, Open Graph, Twitter Cards, canonical URLs, and robots directives with practical examples.',
  'SEO Tools',
  ARRAY['SEO', 'meta tags', 'open graph', 'twitter cards', 'canonical'],
  'ToolNest Team',
  '2025-04-12',
  '2025-07-01',
  10,
  'published',
  NULL,
  jsonb_build_array(
    jsonb_build_object(
      'heading', 'Title Tags: The Most Important On-Page Element',
      'body', jsonb_build_array(
        'The title tag is the single most important on-page SEO element. It appears in browser tabs, search results, and social shares. Keep it under 60 characters to avoid truncation in Google results.',
        'Place your primary keyword near the beginning of the title. Include your brand name at the end, separated by a pipe (|) or em dash (—). For example: "QR Code Generator — Free Online Tool | ToolNest".'
      )
    ),
    jsonb_build_object(
      'heading', 'Meta Descriptions: Your Search Snippet',
      'body', jsonb_build_array(
        'While meta descriptions are not a direct ranking factor, they influence click-through rate. Write a compelling 150-160 character summary that includes your target keyword and a call to action.',
        'Use ToolNest''s Search Snippet Preview tool to see exactly how your title and description will appear in Google results before publishing.'
      )
    ),
    jsonb_build_object(
      'heading', 'Open Graph Tags',
      'body', jsonb_build_array(
        'Open Graph tags control how your page appears when shared on Facebook, LinkedIn, and other platforms. The essential tags are og:title, og:description, og:image, and og:url.',
        'The Open Graph Generator creates all the necessary tags for you — just enter your page details and copy the generated HTML.'
      )
    ),
    jsonb_build_object(
      'heading', 'Twitter Card Tags',
      'body', jsonb_build_array(
        'Twitter Cards work similarly to Open Graph but are specific to Twitter. The summary_large_image card type gives the most visual impact in timelines.',
        'Use the Twitter Card Generator to create the complete set of Twitter meta tags in seconds.'
      )
    ),
    jsonb_build_object(
      'heading', 'Canonical URLs',
      'body', jsonb_build_array(
        'Canonical tags tell search engines which version of a page is the "master" copy. This prevents duplicate content issues when the same page is accessible via multiple URLs.',
        'Always set a canonical URL on every page. The Canonical URL Generator creates the tag for you, and ToolNest automatically sets canonicals on all tool pages.'
      )
    ),
    jsonb_build_object(
      'heading', 'Robots Meta Directives',
      'body', jsonb_build_array(
        'The robots meta tag controls whether search engines can index a page and follow its links. Use "index, follow" for pages you want in search results, and "noindex, follow" for pages like search results or filtered views.',
        'The Meta Robots Generator lets you create the exact directive you need, and the Robots.txt Generator handles site-wide crawl control.'
      )
    )
  ),
  NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM admin_blog_posts WHERE slug = 'seo-meta-tags-complete-guide');

-- Post 5: password-security-guide
INSERT INTO admin_blog_posts (slug, title, description, category, tags, author, published_at, updated_at_text, reading_time, status, featured_image, content, seo_title, seo_description)
SELECT
  'password-security-guide',
  'Password Security: A Practical Guide for Everyone',
  'Learn how to create strong passwords, why password managers matter, and how to audit your existing passwords for vulnerabilities.',
  'Security Tools',
  ARRAY['password security', 'cybersecurity', 'password manager', 'online safety'],
  'ToolNest Team',
  '2025-05-20',
  NULL,
  8,
  'published',
  NULL,
  jsonb_build_array(
    jsonb_build_object(
      'heading', 'What Makes a Password Strong',
      'body', jsonb_build_array(
        'A strong password has three properties: length (at least 16 characters), randomness (no dictionary words or patterns), and uniqueness (not reused across sites). The Password Strength Checker tool analyzes these factors and estimates how long it would take to crack.',
        'Contrary to popular belief, complexity rules (requiring mixed case, numbers, and symbols) matter less than length. A 20-character lowercase password is stronger than an 8-character password with every character type.'
      )
    ),
    jsonb_build_object(
      'heading', 'Why You Need a Password Manager',
      'body', jsonb_build_array(
        'Humans cannot remember 200 unique 16-character passwords. A password manager generates, stores, and auto-fills strong passwords for every site. You only need to remember one master password.',
        'If you''re not ready for a password manager, use the Password Generator to create strong passwords and store them in an encrypted note or document.'
      )
    ),
    jsonb_build_object(
      'heading', 'Auditing Your Existing Passwords',
      'body', jsonb_build_array(
        'Run each of your current passwords through the Password Strength Checker. Any password that scores below "Strong" should be replaced immediately. Pay special attention to passwords for email, banking, and social media accounts.',
        'Common weak patterns to avoid: birthdays, pet names, "password123", keyboard walks (qwerty), and anything found in a dictionary.'
      )
    )
  ),
  NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM admin_blog_posts WHERE slug = 'password-security-guide');

-- Post 6: json-formatting-and-validation-guide
INSERT INTO admin_blog_posts (slug, title, description, category, tags, author, published_at, updated_at_text, reading_time, status, featured_image, content, seo_title, seo_description)
SELECT
  'json-formatting-and-validation-guide',
  'JSON Formatting and Validation: A Developer''s Guide',
  'Understand JSON structure, learn how to format and validate it, and discover common pitfalls that cause API errors.',
  'Developer Tools',
  ARRAY['JSON', 'API', 'developer tools', 'data formats'],
  'ToolNest Team',
  '2025-06-15',
  NULL,
  6,
  'published',
  NULL,
  jsonb_build_array(
    jsonb_build_object(
      'heading', 'What is JSON?',
      'body', jsonb_build_array(
        'JSON (JavaScript Object Notation) is a lightweight data interchange format. It uses human-readable text to store and transmit data objects consisting of attribute-value pairs and arrays. It''s the most common format for REST API responses.'
      )
    ),
    jsonb_build_object(
      'heading', 'Common JSON Errors',
      'body', jsonb_build_array(
        'Trailing commas are the #1 cause of JSON errors. Unlike JavaScript, JSON does not allow a comma after the last item in an array or object. Single quotes are not valid — JSON requires double quotes for strings and property names.',
        'The JSON Validator instantly catches these errors and tells you exactly where the problem is, saving you from debugging API responses manually.'
      )
    ),
    jsonb_build_object(
      'heading', 'Formatting for Readability',
      'body', jsonb_build_array(
        'Minified JSON saves bandwidth but is impossible to read. The JSON Formatter beautifies minified JSON with proper indentation and line breaks, making debugging and code review much faster.',
        'For production, use the minify option to strip whitespace and reduce payload size. For development, use 2-space indentation for readability.'
      )
    )
  ),
  NULL, NULL
WHERE NOT EXISTS (SELECT 1 FROM admin_blog_posts WHERE slug = 'json-formatting-and-validation-guide');