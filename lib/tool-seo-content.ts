import type { ToolSeoContent } from '@/components/tool-page-template';
import { tools } from '@/lib/data';
import { getEnhancedDescription } from '@/lib/tool-metadata-enhancements';

type ContentEntry = ToolSeoContent;

const toolSeoContent: Record<string, ContentEntry> = {
  // ─── AI Tools ───────────────────────────────────────────────
  'ai-alt-text-generator': {
    whatIs: 'The AI Alt Text Generator creates descriptive alternative text for images, helping websites meet WCAG accessibility standards and improve SEO. It analyzes your image and produces concise, accurate descriptions that screen readers can read aloud to visually impaired users.',
    howTo: [
      'Upload an image or paste an image URL into the input field.',
      'Click Generate to let the AI analyze the image content.',
      'Review the generated alt text and edit if needed for accuracy.',
      'Copy the final alt text and paste it into your img alt attribute or CMS.',
    ],
    benefits: [
      { title: 'WCAG compliance', description: 'Alt text is required for accessibility standards. This tool helps you produce descriptions that meet WCAG 2.1 Level A criteria without writing them from scratch.' },
      { title: 'SEO improvement', description: 'Search engines cannot see images — they rely on alt text to understand image content, which helps your images appear in image search results.' },
      { title: 'Faster than manual writing', description: 'Writing good alt text takes time, especially for sites with hundreds of images. Generate a first draft in seconds and refine as needed.' },
      { title: 'Processed in your browser', description: 'Your images are analyzed locally without being uploaded to an external server, preserving privacy and avoiding data residency concerns.' },
    ],
    faqs: [
      { q: 'How long should alt text be?', a: 'Aim for 125 characters or fewer. Screen readers typically cut off longer descriptions. Focus on conveying the image\'s purpose in context, not every visual detail.' },
      { q: 'Should decorative images have alt text?', a: 'Purely decorative images that do not convey information should use empty alt text (alt="") so screen readers skip them. Use this tool for images that carry meaningful content.' },
      { q: 'Can I use this for social media images?', a: 'Yes. Alt text improves accessibility on platforms like Twitter, LinkedIn, and Instagram, and can help your images appear in search results.' },
      { q: 'Does this tool store my images?', a: 'No. Image analysis happens in your browser. Nothing is uploaded to a server or retained after you close the page.' },
    ],
  },
  'ai-amazon-listing-generator': {
    whatIs: 'The AI Amazon Listing Generator writes product listing copy optimized for Amazon\'s search algorithm (A9). It produces a title, bullet points, and product description from a few key details about your product, targeting relevant search terms without keyword stuffing.',
    howTo: [
      'Enter your product name, category, and 2-3 key features.',
      'Optionally add target keywords you want to rank for.',
      'Click Generate to produce a title, bullet points, and description.',
      'Review the output, then copy each section into your Amazon Seller Central listing.',
    ],
    benefits: [
      { title: 'A9-optimized structure', description: 'Amazon\'s search algorithm weighs titles heavily, followed by bullet points and description. The tool structures content in this priority order.' },
      { title: 'Bullet point best practices', description: 'Amazon allows up to 5 bullet points of 500 characters each. The tool keeps each point concise and benefit-focused, leading with a capitalised phrase.' },
      { title: 'Saves hours per listing', description: 'Writing a full Amazon listing manually can take 30-60 minutes. Generate a complete draft in seconds and spend your time refining instead of starting from a blank page.' },
      { title: 'No API keys needed', description: 'The tool runs in your browser with no external API calls, so you do not need to configure any developer accounts or manage usage limits.' },
    ],
    faqs: [
      { q: 'What is the Amazon title character limit?', a: 'Amazon allows up to 200 characters for most categories, though some categories restrict to 150. The tool targets 150-180 characters to stay within most category limits.' },
      { q: 'Can I use this for Amazon variations?', a: 'Yes. Generate the parent listing first, then adjust the key features for each variation (color, size) to create child listings.' },
      { q: 'Will the generated content pass Amazon review?', a: 'The tool avoids prohibited claims (like "best" or "#1") and follows Amazon\'s formatting guidelines, but you should always review against the current style guide before publishing.' },
      { q: 'Does this tool support multiple languages?', a: 'The tool generates English-language listings. For other marketplaces, use the generated content as a base and have a native speaker translate and localize it.' },
    ],
  },
  'ai-article-idea-generator': {
    whatIs: 'The AI Article Idea Generator produces topic ideas and headline suggestions for blog posts and articles. Given a subject area or keyword, it generates a list of angles, working titles, and brief summaries you can use as a starting point for content planning.',
    howTo: [
      'Enter your broad topic or niche (e.g. "home gardening" or "B2B SaaS pricing").',
      'Optionally add keywords you want to target.',
      'Click Generate to produce a list of article ideas with working titles.',
      'Pick the ideas that fit your editorial calendar and refine the titles for your audience.',
    ],
    benefits: [
      { title: 'Overcome writer\'s block', description: 'Staring at a blank page is the hardest part of content creation. Get 10-15 angles in seconds and pick the ones worth developing.' },
      { title: 'Discover angles you hadn\'t considered', description: 'The tool explores different content formats — how-tos, comparisons, listicles, case studies — surfacing approaches you might not think of organically.' },
      { title: 'Plan a content calendar', description: 'Generate a batch of ideas at the start of each month and assign them to publishing slots, rather than brainstorming week by week.' },
      { title: 'Works offline in your browser', description: 'No API calls, no usage limits. Generate as many ideas as you want without worrying about token costs or rate limits.' },
    ],
    faqs: [
      { q: 'Are the generated ideas unique?', a: 'The ideas are generated from your specific input and will vary each time. However, they are starting points — always add your own expertise and perspective before publishing.' },
      { q: 'Can I use this for YouTube video ideas?', a: 'Yes. The generated titles and angles work equally well for video content, podcast episodes, and newsletter topics.' },
      { q: 'How many ideas does it generate at once?', a: 'The tool produces 10-15 ideas per generation. Run it multiple times with different keyword variations to build a larger pool.' },
      { q: 'Should I check if the ideas already exist online?', a: 'Always search for your chosen title before writing. Even original ideas may overlap with existing content — add your unique angle to differentiate.' },
    ],
  },
  'ai-blog-outline-generator': {
    whatIs: 'The AI Blog Outline Generator creates a structured outline for a blog post from a topic or working title. It breaks your topic into sections with suggested subheadings, giving you a framework to write against instead of improvising structure as you go.',
    howTo: [
      'Enter your blog post topic or working title.',
      'Optionally specify the desired length (short, medium, long).',
      'Click Generate to produce a section-by-section outline.',
      'Use the outline as a writing framework, expanding each section with your own content.',
    ],
    benefits: [
      { title: 'Logical structure from the start', description: 'A good outline ensures your post flows logically — introduction, problem, solution, examples, conclusion — without reorganizing paragraphs mid-draft.' },
      { title: 'Faster drafting', description: 'Writing into a pre-built outline is 2-3x faster than free-writing and reorganizing. Each section becomes a mini-writing task with a clear goal.' },
      { title: 'Identifies gaps early', description: 'Seeing the full outline before writing helps you spot missing sections — like a counterargument or FAQ — before you\'re too deep into the draft.' },
      { title: 'No sign-up required', description: 'Generate outlines immediately without creating an account or connecting an external AI service.' },
    ],
    faqs: [
      { q: 'Should I follow the outline exactly?', a: 'No. Treat it as a scaffold. If a section feels unnecessary while writing, cut it. If a new angle emerges, add it. The outline is a starting point, not a constraint.' },
      { q: 'What is the ideal number of sections?', a: 'For a 1,500-word post, 4-6 sections work well. For a 3,000-word comprehensive guide, 7-10 sections with subsections. The tool adjusts based on your length preference.' },
      { q: 'Can I use this for academic writing?', a: 'The tool is designed for blog and article content, not academic papers. Academic writing has specific structural conventions (abstract, methodology, literature review) that the tool does not follow.' },
      { q: 'Does it generate content for each section?', a: 'No. It generates headings and a brief description of what each section should cover. You write the actual content, ensuring originality and your own voice.' },
    ],
  },
  'ai-blog-title-generator': {
    whatIs: 'The AI Blog Title Generator produces headline suggestions for blog posts. Given a topic or draft title, it generates multiple variations optimized for click-through rate, search visibility, and social sharing.',
    howTo: [
      'Enter your blog post topic or current working title.',
      'Optionally add a tone preference (professional, casual, provocative).',
      'Click Generate to produce a list of title variations.',
      'Choose the title that best fits your audience and edit as needed.',
    ],
    benefits: [
      { title: 'Improves click-through rate', description: 'A well-crafted title can double your CTR from search results. The tool applies proven headline formulas — numbers, questions, how-tos — that consistently outperform generic titles.' },
      { title: 'Tests multiple angles', description: 'Instead of committing to the first title you think of, compare 10-15 variations side by side and pick the strongest.' },
      { title: 'Stays within character limits', description: 'Google truncates titles around 60 characters. The tool generates titles within this limit so they display fully in search results.' },
      { title: 'No external API required', description: 'All generation happens in your browser, so there are no rate limits or token costs.' },
    ],
    faqs: [
      { q: 'What makes a good blog title?', a: 'Clarity over cleverness. Readers should know exactly what the post delivers. Include your target keyword near the beginning, keep it under 60 characters, and use power words (complete, practical, proven) sparingly.' },
      { q: 'Should I use numbers in titles?', a: 'List-post titles with numbers (e.g. "7 Ways to...") consistently outperform other formats in CTR studies. Use them when the content genuinely is a list.' },
      { q: 'Can I A/B test titles?', a: 'Yes. Generate several variations, then test them using your email newsletter subject line or social media posts to see which gets more engagement before publishing.' },
      { q: 'Will the same title rank well on Google?', a: 'Title quality affects CTR, which indirectly influences rankings. But the title alone does not guarantee ranking — content quality and backlinks matter more.' },
    ],
  },
  'ai-brand-name-generator': {
    whatIs: 'The AI Brand Name Generator creates brand name suggestions based on your industry, keywords, and naming style preferences. It produces names that are catchy, memorable, and available as potential trademarks or domain names.',
    howTo: [
      'Enter your industry or product category.',
      'Add 2-3 keywords related to your brand identity.',
      'Optionally choose a naming style (short, descriptive, abstract, compound).',
      'Click Generate and review the suggestions. Check domain availability for your favorites.',
    ],
    benefits: [
      { title: 'Saves naming brainstorming time', description: 'Naming a brand can take days of brainstorming and domain searching. Generate a starting list in seconds and narrow down from there.' },
      { title: 'Multiple naming styles', description: 'The tool explores different naming approaches — descriptive (TaxiForSure), abstract (Google), compound (Facebook), and evocative (Apple) — so you see the full range of options.' },
      { title: 'Avoids common naming pitfalls', description: 'The tool avoids names that are hard to spell, pronounce, or remember — three of the most common reasons brands rename later.' },
      { title: 'No sign-up or API keys', description: 'Generate names immediately without creating an account or paying for an AI API.' },
    ],
    faqs: [
      { q: 'How do I check if a brand name is trademarked?', a: 'Search the USPTO database (for US trademarks) or the WIPO Global Brand Database. The tool does not perform trademark checks — always verify before launching.' },
      { q: 'Should my brand name include keywords?', a: 'Keyword-inclusive names (e.g. "BuyShoes") can help with SEO initially but limit brand growth. Abstract names (e.g. "Zappos") are harder to launch but more memorable long-term.' },
      { q: 'How many names should I generate?', a: 'Generate 50-100 names and shortlist 5-10. Check domain and social media availability for each shortlisted name before making a final decision.' },
      { q: 'Can I use the generated names commercially?', a: 'The tool generates names algorithmically. You are free to use any suggestion, but you must independently verify trademark and domain availability before commercial use.' },
    ],
  },
  'ai-business-name-generator': {
    whatIs: 'The AI Business Name Generator produces company name suggestions tailored to your business type and target market. It combines industry terms, location references, and naming patterns to create professional, credible business names.',
    howTo: [
      'Enter your business type (e.g. "plumbing", "coffee shop", "consulting").',
      'Optionally add your city or region for local SEO.',
      'Choose a style preference if desired (professional, creative, minimal).',
      'Click Generate and shortlist names that fit your brand vision.',
    ],
    benefits: [
      { title: 'Professional naming patterns', description: 'The tool uses established business naming conventions — founder names, location + service, industry + descriptor — that signal credibility to customers.' },
      { title: 'Local SEO awareness', description: 'Including your city or region in the business name can improve local search visibility. The tool generates location-based variations when you provide a location.' },
      { title: 'Faster than brainstorming', description: 'Get 20-30 name suggestions in seconds instead of spending hours writing on a whiteboard. Use the time saved for domain and trademark checks.' },
      { title: 'Browser-based, no registration', description: 'No account needed. Generate as many names as you want without hitting API limits.' },
    ],
    faqs: [
      { q: 'Should my business name include my city?', a: 'For local businesses (restaurants, trades, services), including the city can help local SEO. For national or online businesses, a location-neutral name is more flexible.' },
      { q: 'How is this different from the Brand Name Generator?', a: 'The Business Name Generator focuses on practical, descriptive names suitable for LLCs and local businesses. The Brand Name Generator produces more creative, abstract names suited for consumer brands.' },
      { q: 'Do I need to register the generated name?', a: 'Check your state\'s business registry to ensure the name is not already taken. You may also need to file a DBA ("doing business as") if the name differs from your legal entity name.' },
      { q: 'Can I use this for an LLC or corporation?', a: 'Yes. The generated names work for any business structure. Just append your entity type (LLC, Inc., Ltd.) during official registration.' },
    ],
  },
  'ai-cold-email-generator': {
    whatIs: 'The AI Cold Email Generator writes outbound email templates for sales prospecting. Given a product, target persona, and objective, it produces a concise, personalized cold email with a subject line, body, and call to action.',
    howTo: [
      'Enter your product or service description.',
      'Specify your target persona (e.g. "marketing directors at B2B SaaS companies").',
      'Optionally add a specific objective (demo booking, reply, referral).',
      'Click Generate to produce a subject line and email body. Personalize the [bracketed] fields before sending.',
    ],
    benefits: [
      { title: 'Proven cold email structure', description: 'The tool follows the structure that works in cold outreach: personalized hook, relevant value proposition, soft CTA, and professional signature — not generic mass-mail templates.' },
      { title: 'Subject line included', description: 'Subject lines determine open rates. The tool generates 3-5 subject line variations so you can A/B test which gets the highest open rate.' },
      { title: 'Avoids spam-trigger phrases', description: 'The tool avoids phrases that trigger spam filters ("FREE", "ACT NOW", excessive capitalization) and keeps emails under 150 words, which improves deliverability.' },
      { title: 'No CRM integration required', description: 'Generate email copy in your browser and paste it into your email client or sequencer (Outreach, SalesLoft, Mailshake). No API connection needed.' },
    ],
    faqs: [
      { q: 'What is a good cold email response rate?', a: 'Industry average is 1-5%. Personalization is the biggest lever — emails with a personalized first line get 2-3x higher reply rates. Always customize the [bracketed] fields.' },
      { q: 'How long should a cold email be?', a: 'Keep it under 150 words. Busy prospects skim emails on mobile. One paragraph of context, one paragraph of value, one clear CTA. Shorter emails consistently outperform longer ones.' },
      { q: 'Can I use this for cold LinkedIn messages?', a: 'Yes, but trim it further. LinkedIn messages should be 50-75 words. Use the generated email as a base and cut it down for the platform.' },
      { q: 'Should I follow up?', a: 'Yes. 80% of responses come from follow-ups 2-4. Generate a follow-up email by adding "follow-up" to the objective field. Keep follow-ups shorter than the initial email.' },
    ],
  },
  'ai-cover-letter-generator': {
    whatIs: 'The AI Cover Letter Generator creates personalized cover letters from your job title, key skills, and the target job description. It produces a professional letter that connects your experience to the role\'s requirements without sounding generic.',
    howTo: [
      'Paste the job description or key requirements for the role.',
      'Enter your current job title and 3-4 relevant skills or achievements.',
      'Click Generate to produce a cover letter draft.',
      'Review and personalize the letter with specific examples from your experience before sending.',
    ],
    benefits: [
      { title: 'Tailored to the job description', description: 'The tool analyzes the job requirements and maps your skills to them, producing a letter that addresses what the employer is actually looking for.' },
      { title: 'Professional tone and structure', description: 'The generated letter follows standard cover letter conventions — opening hook, body paragraphs connecting skills to needs, closing with CTA — in a professional, confident tone.' },
      { title: 'Saves time per application', description: 'Writing a custom cover letter for each application takes 30-45 minutes. Generate a tailored draft in seconds and spend your time adding specific examples.' },
      { title: 'No account needed', description: 'Generate cover letters immediately without signing up or connecting an external service.' },
    ],
    faqs: [
      { q: 'Should I send a cover letter if it\'s optional?', a: 'Yes. Applications with cover letters are 40% more likely to receive an interview invitation, even when the letter is optional. It demonstrates genuine interest.' },
      { q: 'How long should a cover letter be?', a: '250-400 words, fitting on a single page. The tool targets this range. If the generated letter is longer, trim the least relevant paragraph.' },
      { q: 'Can I use the same cover letter for multiple jobs?', a: 'No. Each cover letter should be tailored to the specific role. Generate a new letter for each application by pasting the new job description.' },
      { q: 'Will employers know it was AI-generated?', a: 'The tool produces a draft, not a final letter. Always add specific examples from your experience (a project, a metric, a challenge you solved) that only you could write. This makes the letter unmistakably yours.' },
    ],
  },
  'ai-ebay-listing-generator': {
    whatIs: 'The AI eBay Listing Generator writes eBay product descriptions from basic product details. It produces a title optimized for eBay\'s search (Cassini) and a description with key features, condition notes, and shipping information.',
    howTo: [
      'Enter your product name, condition, and 2-3 key features.',
      'Optionally add brand, model number, and target keywords.',
      'Click Generate to produce an eBay-optimized title and description.',
      'Copy the title and description into your eBay listing form.',
    ],
    benefits: [
      { title: 'Cassini search optimization', description: 'eBay\'s search algorithm (Cassini) weighs the title heavily and rewards listings with relevant keywords in the first 65 characters. The tool structures titles accordingly.' },
      { title: 'Item specifics included', description: 'The generated description highlights item specifics (brand, model, condition) that eBay uses for filtering, helping your listing appear in more filtered searches.' },
      { title: 'Faster listing creation', description: 'Writing eBay listings manually takes 15-20 minutes per item. Generate a complete listing in seconds, which is especially valuable for high-volume sellers.' },
      { title: 'No API integration needed', description: 'Generate listing copy in your browser and paste it into eBay\'s seller form. No developer account or API connection required.' },
    ],
    faqs: [
      { q: 'What is the eBay title character limit?', a: 'eBay allows up to 80 characters. The tool targets 65-80 characters, prioritizing the most important keywords first for Cassini search relevance.' },
      { q: 'Should I use all caps in my eBay title?', a: 'No. eBay discourages all-caps titles and they can hurt search ranking. Use standard capitalization. The tool follows this convention.' },
      { q: 'Can I use this for eBay auction listings?', a: 'Yes. The title and description work for both auction and fixed-price listings. The content is the same — only the pricing format differs.' },
      { q: 'Does the tool handle item condition descriptions?', a: 'The tool generates a general condition note from the condition you specify. Always add specific details about any defects, wear, or included accessories for accuracy.' },
    ],
  },
  'ai-email-writer': {
    whatIs: 'The AI Email Writer composes professional emails from a brief description of what you want to communicate. It produces a subject line and email body with appropriate tone — formal, casual, or urgent — based on your input.',
    howTo: [
      'Describe the email you want to write (e.g. "request a deadline extension from my manager").',
      'Optionally specify tone (formal, casual, urgent) and key points to include.',
      'Click Generate to produce a subject line and email body.',
      'Review, personalize with specific details, and send.',
    ],
    benefits: [
      { title: 'Clear, concise structure', description: 'The tool produces emails with a clear opening, body, and CTA — not rambling paragraphs. This improves response rates and reduces back-and-forth.' },
      { title: 'Tone-matched output', description: 'A follow-up to a client and a request to a colleague require different tones. The tool adjusts language, formality, and structure based on your tone preference.' },
      { title: 'Overcomes writing anxiety', description: 'Difficult emails (rejections, escalations, apologies) are hard to start. Generate a draft in seconds and edit it, which is easier than writing from scratch.' },
      { title: 'Works for any email type', description: 'Client follow-ups, internal updates, meeting requests, thank-you notes — the tool adapts to whatever you describe.' },
    ],
    faqs: [
      { q: 'Is it okay to use AI for work emails?', a: 'Yes, as long as you review and take responsibility for the content. AI helps with structure and phrasing, but you should verify facts, tone, and appropriateness before sending.' },
      { q: 'How long should a professional email be?', a: 'For most business emails, 50-150 words is ideal. The tool targets this range. For complex topics, use bullet points instead of long paragraphs.' },
      { q: 'Can I use this for personal emails?', a: 'Absolutely. The tool works for any email — personal, professional, transactional. Just describe what you want to say.' },
      { q: 'Will the email sound robotic?', a: 'The tool generates a natural-sounding draft, but you should personalize it with specific details, names, and context. The more specific your input, the more natural the output.' },
    ],
  },
  'ai-etsy-product-description-generator': {
    whatIs: 'The AI Etsy Product Description Generator creates Etsy listing descriptions optimized for Etsy\'s search and buyer experience. It produces a description with product features, materials, dimensions, and care instructions from basic product details.',
    howTo: [
      'Enter your product name, category, and key materials.',
      'Add dimensions, color options, and any personalization details.',
      'Click Generate to produce a structured product description.',
      'Copy the description into your Etsy listing.',
    ],
    benefits: [
      { title: 'Etsy search optimized', description: 'Etsy\'s search algorithm weighs listing titles and tags heavily, but descriptions also contribute. The tool naturally incorporates relevant keywords without stuffing.' },
      { title: 'Buyer-friendly formatting', description: 'The generated description uses short paragraphs and clear sections (materials, dimensions, care, shipping) that buyers can scan quickly on mobile.' },
      { title: 'Personalization prompts included', description: 'If you offer personalization, the tool includes a clear prompt for buyers to provide custom details at checkout, reducing back-and-forth messages.' },
      { title: 'No external API required', description: 'Generate descriptions in your browser with no sign-up, no API keys, and no usage limits.' },
    ],
    faqs: [
      { q: 'How long should an Etsy description be?', a: 'Etsy allows up to 102,400 characters, but the sweet spot is 200-500 words. Long enough to cover materials, dimensions, and care, short enough to read on mobile.' },
      { q: 'Should I repeat keywords in the description?', a: 'Use relevant keywords naturally 2-3 times. Keyword stuffing (repeating the same phrase 10+ times) can hurt your Etsy search ranking.' },
      { q: 'Can I use this for digital downloads?', a: 'Yes. For digital products, the tool emphasizes file format, dimensions, and usage terms instead of materials and care instructions.' },
      { q: 'Does the tool generate Etsy tags?', a: 'The tool focuses on the description. For tags, use Etsy\'s tag field with all 13 slots, each targeting a different search term. Use the AI Keyword Generator for tag ideas.' },
    ],
  },
  'ai-expand-text': {
    whatIs: 'The AI Expand Text tool takes a short phrase, sentence, or paragraph and expands it into longer, more detailed text. It adds context, examples, and elaboration while maintaining the original meaning and tone.',
    howTo: [
      'Paste the text you want to expand into the input field.',
      'Optionally specify how much longer you want it (slightly, moderately, significantly).',
      'Click Generate to produce the expanded text.',
      'Review the expanded text and edit for accuracy and flow.',
    ],
    benefits: [
      { title: 'Adds depth without filler', description: 'The tool expands text by adding relevant context, examples, and explanations — not by padding with empty phrases. The result reads like a more thorough version of your original.' },
      { title: 'Useful for essays and reports', description: 'When you have a rough outline or bullet points, the tool can expand each into a full paragraph, accelerating the drafting process.' },
      { title: 'Maintains your original meaning', description: 'The expanded text stays true to the intent of your input. It elaborates on what you wrote, not on tangential topics.' },
      { title: 'No sign-up or API keys', description: 'All expansion happens in your browser with no external API calls.' },
    ],
    faqs: [
      { q: 'Will the expanded text be original?', a: 'The tool elaborates on your input, producing text that is original in phrasing. However, you should always review and edit the output to ensure it reflects your knowledge and voice.' },
      { q: 'Can I use this for academic essays?', a: 'Use it as a drafting aid, not a final product. Academic institutions require original work. Expand your own bullet points, then verify facts and add citations yourself.' },
      { q: 'How much longer does the text get?', a: 'The tool roughly doubles the input length for "moderate" expansion and triples it for "significant." Results vary based on the input\'s information density.' },
      { q: 'Does it work for non-English text?', a: 'The tool is optimized for English. Results for other languages may be less accurate and should be reviewed by a native speaker.' },
    ],
  },
  'ai-facebook-caption-generator': {
    whatIs: 'The AI Facebook Caption Generator creates post captions for Facebook pages and profiles. Given a topic or image description, it produces engaging captions with suggested hashtags optimized for Facebook\'s engagement algorithm.',
    howTo: [
      'Describe your post topic or what your image/video shows.',
      'Optionally specify tone (informative, entertaining, promotional).',
      'Click Generate to produce caption options with hashtags.',
      'Pick the caption that fits your brand voice and post it to your Facebook page.',
    ],
    benefits: [
      { title: 'Facebook engagement patterns', description: 'Facebook\'s algorithm rewards posts that spark comments and reactions. The tool generates captions with questions and calls to action that encourage engagement.' },
      { title: 'Hashtag suggestions included', description: 'Facebook posts with 1-2 relevant hashtags get more reach than posts with none. The tool suggests hashtags that are specific enough to be useful but not so niche that nobody searches them.' },
      { title: 'Saves content calendar time', description: 'If you manage a Facebook page, you need 5-7 posts per week. Generate a week of captions in minutes instead of staring at the composer.' },
      { title: 'No Meta Business Suite connection needed', description: 'Generate captions in your browser and paste them into Facebook directly or through your scheduling tool.' },
    ],
    faqs: [
      { q: 'How long should a Facebook caption be?', a: 'Facebook displays the first 3 lines before truncating with "See more." Lead with a hook in the first 125 characters. Full captions can be 200-500 characters.' },
      { q: 'How many hashtags should I use on Facebook?', a: '1-2 hashtags per post. Unlike Instagram, Facebook does not reward hashtag density. Use one broad hashtag and one specific one.' },
      { q: 'Should I include emojis in Facebook captions?', a: 'Emojis can increase engagement by 10-15% when used sparingly (1-3 per post). The tool includes relevant emoji suggestions you can keep or remove.' },
      { q: 'Can I schedule these captions?', a: 'Yes. Copy the generated captions into Meta Business Suite, Buffer, Hootsuite, or any scheduling tool that supports Facebook.' },
    ],
  },
  'ai-faq-generator': {
    whatIs: 'The AI FAQ Generator creates question-and-answer pairs from a topic, product description, or help documentation. It identifies the questions a user would most likely ask and generates concise, accurate answers based on your input.',
    howTo: [
      'Enter your topic, product name, or paste existing documentation.',
      'Optionally specify the number of FAQs you want (5, 10, or 15).',
      'Click Generate to produce question-and-answer pairs.',
      'Review each answer for accuracy and publish on your FAQ page or help center.',
    ],
    benefits: [
      { title: 'Improves customer self-service', description: 'A well-written FAQ page deflects 30-50% of support tickets by answering common questions before customers need to contact you. This tool helps you build that page faster.' },
      { title: 'SEO-friendly content', description: 'FAQ pages with proper FAQ schema markup can appear in Google\'s "People Also Ask" rich results, increasing your organic visibility.' },
      { title: 'Identifies questions you missed', description: 'When you\'re deep in a product, you forget what confused you at the start. The tool surfaces questions from a user\'s perspective that you may not think to address.' },
      { title: 'No external API needed', description: 'Generate FAQs entirely in your browser without connecting an AI service or managing API keys.' },
    ],
    faqs: [
      { q: 'How many FAQs should I include on my page?', a: 'Start with 8-12 questions covering the most common inquiries. You can expand over time based on support ticket analysis and customer feedback.' },
      { q: 'Should I use FAQ schema markup?', a: 'Yes. Adding FAQPage schema markup helps Google display your answers in rich results. Use the FAQ Schema Generator tool on ToolNest to create the markup.' },
      { q: 'Can I use this for product page FAQs?', a: 'Absolutely. Product-specific FAQs (shipping, returns, sizing, compatibility) improve conversion rates by addressing purchase objections directly on the page.' },
      { q: 'How accurate are the generated answers?', a: 'The tool generates answers from your input, so accuracy depends on the information you provide. Always verify answers against your actual product documentation before publishing.' },
    ],
  },
  'ai-follow-up-email-generator': {
    whatIs: 'The AI Follow-Up Email Generator creates follow-up email templates for sales, networking, and client communications. It produces a concise, non-pushy follow-up that references your previous email and includes a clear next step.',
    howTo: [
      'Describe the context (e.g. "following up after a demo call last Tuesday").',
      'Enter the key point from the previous interaction.',
      'Specify the desired outcome (reply, meeting, decision).',
      'Click Generate to produce a follow-up email. Personalize before sending.',
    ],
    benefits: [
      { title: 'Polite persistence', description: 'Following up is essential — 80% of sales require 5+ contacts — but most people give up after 1-2. The tool generates follow-ups that are persistent without being annoying.' },
      { title: 'Context-aware', description: 'The tool incorporates the context you provide (last call, previous email, specific topic) so the follow-up feels personal, not like a generic reminder.' },
      { title: 'Clear next step', description: 'Every follow-up should have one clear CTA. The tool includes a specific ask (book a call, reply with feedback, sign the proposal) rather than a vague "let me know."' },
      { title: 'No sign-up required', description: 'Generate follow-up emails in your browser without creating an account or connecting a CRM.' },
    ],
    faqs: [
      { q: 'How many times should I follow up?', a: 'For sales: 5-7 touchpoints across 2-3 weeks. For client communications: 2-3 follow-ups with 3-5 days between each. Stop if you get no response after the final attempt.' },
      { q: 'How long should a follow-up email be?', a: 'Shorter than the original — 50-75 words. The recipient already has context. Reference the previous email, add value (a resource, a case study), and make one clear ask.' },
      { q: 'Should I reply to the same thread or start a new email?', a: 'Reply to the same thread so the recipient has context. Starting a new email for a follow-up loses the conversation history and can feel disconnected.' },
      { q: 'When should I send a follow-up?', a: 'Wait 3-5 business days after the initial email for sales, 2-3 days for internal communications. Tuesday through Thursday mornings get the highest open rates.' },
    ],
  },
  'ai-grammar-improver': {
    whatIs: 'The AI Grammar Improver analyzes your text for grammar, spelling, punctuation, and style issues, then produces a corrected version. It fixes common errors like subject-verb agreement, comma splices, and passive voice without changing your meaning.',
    howTo: [
      'Paste your text into the input field.',
      'Click Improve to analyze and correct the text.',
      'Review the changes — additions and deletions are highlighted.',
      'Copy the corrected text and use it in your document or email.',
    ],
    benefits: [
      { title: 'Catches errors spell-check misses', description: 'Spell-check won\'t flag "their" vs "there" or "affect" vs "effect." The tool catches these context-dependent errors that spell-checkers and basic grammar tools miss.' },
      { title: 'Improves readability', description: 'Beyond fixing errors, the tool tightens wordy sentences, converts unnecessary passive voice to active, and suggests clearer alternatives for vague phrasing.' },
      { title: 'Works on any text type', description: 'Essays, emails, blog posts, cover letters, social media captions — the tool adapts to the text you paste in, improving grammar without imposing a specific style.' },
      { title: 'Processed locally', description: 'Your text never leaves your browser. This is especially important for confidential documents like cover letters, business proposals, or legal drafts.' },
    ],
    faqs: [
      { q: 'Will it change my writing style?', a: 'The tool fixes errors and improves clarity but preserves your voice. It does not rewrite sentences that are grammatically correct, even if they could be phrased differently.' },
      { q: 'Can I use this for academic writing?', a: 'Yes. The tool is useful for proofreading essays and research papers. However, it does not check citations or academic formatting — use a citation manager for those.' },
      { q: 'Does it work for non-native English speakers?', a: 'Yes. The tool is particularly helpful for non-native speakers because it catches articles (a/an/the), preposition usage, and tense consistency — common problem areas in ESL writing.' },
      { q: 'Is this a replacement for a human proofreader?', a: 'For everyday writing, the tool is sufficient. For published work (books, academic papers, marketing copy), have a human review the final version for nuance and tone that automated tools cannot assess.' },
    ],
  },
  'ai-hashtag-generator': {
    whatIs: 'The AI Hashtag Generator produces relevant hashtags for social media posts from a description of your content. It generates a mix of broad, niche, and branded hashtags to maximize reach across platforms like Instagram, Twitter, and LinkedIn.',
    howTo: [
      'Describe your post content or paste your caption.',
      'Optionally specify the platform (Instagram, Twitter, LinkedIn).',
      'Click Generate to produce a list of relevant hashtags.',
      'Copy the hashtags and add them to your social media post.',
    ],
    benefits: [
      { title: 'Mix of hashtag types', description: 'The tool generates broad hashtags (high volume, high competition), niche hashtags (lower volume, targeted audience), and medium-competition hashtags for the best reach balance.' },
      { title: 'Platform-aware suggestions', description: 'Instagram rewards 8-15 hashtags, Twitter works best with 1-2, and LinkedIn with 3-5. The tool adjusts the number and type of hashtags based on your platform.' },
      { title: 'Avoids banned hashtags', description: 'Some hashtags are shadowbanned on Instagram for spam association. The tool avoids commonly banned tags and focuses on active, community-driven hashtags.' },
      { title: 'No sign-up needed', description: 'Generate hashtags immediately without creating an account.' },
    ],
    faqs: [
      { q: 'How many hashtags should I use on Instagram?', a: 'Instagram allows up to 30, but 8-15 relevant hashtags typically perform best. Mix popular tags with niche ones to reach both broad and targeted audiences.' },
      { q: 'Do hashtags work on LinkedIn?', a: 'Yes. LinkedIn posts with 3-5 hashtags get more reach than posts with none. Use professional, industry-specific hashtags rather than casual ones.' },
      { q: 'Should I use the same hashtags on every post?', a: 'No. Vary your hashtags to reach different audience segments. Repeating the exact same hashtag set on every post can trigger spam detection on some platforms.' },
      { q: 'Can I create a branded hashtag?', a: 'Yes. Include your brand name or campaign name as a hashtag. The tool can generate variations of your branded hashtag for different campaigns or product lines.' },
    ],
  },
  'ai-humanize-text': {
    whatIs: 'The AI Humanize Text tool rewrites AI-generated text to sound more natural and human. It varies sentence length, adds conversational transitions, and removes the telltale patterns that make AI text recognizable — without changing the underlying meaning.',
    howTo: [
      'Paste the AI-generated text you want to humanize.',
      'Optionally specify how much to adjust (subtle, moderate, significant).',
      'Click Humanize to rewrite the text.',
      'Review the output and make any final edits for your voice.',
    ],
    benefits: [
      { title: 'Varied sentence structure', description: 'AI text often uses uniform sentence length and structure. The tool varies sentence length — mixing short punchy sentences with longer ones — which is a hallmark of natural human writing.' },
      { title: 'Removes AI tells', description: 'Phrases like "delve into," "it\'s important to note," and "in conclusion" signal AI authorship. The tool replaces these with more natural alternatives.' },
      { title: 'Preserves meaning', description: 'The tool rewrites phrasing, not content. Your facts, arguments, and key points remain intact — only the expression changes.' },
      { title: 'Useful for content review', description: 'If you use AI for first drafts, running the output through this tool helps it pass AI detection tools and read more authentically to human audiences.' },
    ],
    faqs: [
      { q: 'Is humanizing AI text ethical?', a: 'If you use AI as a drafting tool and then review, edit, and take responsibility for the final content, humanizing the text is part of the editing process. Disclosing AI assistance is a separate ethical decision based on your context.' },
      { q: 'Will it pass AI detection tools?', a: 'The tool significantly reduces AI detection scores by varying structure and removing common AI patterns. No tool can guarantee 100% passage, as detection algorithms evolve continuously.' },
      { q: 'Does it change the meaning of my text?', a: 'No. The tool rewords sentences for naturalness but preserves the original meaning, facts, and arguments. Always review the output to confirm accuracy.' },
      { q: 'Can I use this for academic work?', a: 'Academic integrity policies vary by institution. If your school prohibits AI assistance, do not use this tool to disguise AI-generated content. If AI is permitted as a drafting aid, use it as part of your editing process.' },
    ],
  },
  'ai-instagram-caption-generator': {
    whatIs: 'The AI Instagram Caption Generator creates engaging captions for Instagram posts and reels. Given a description of your image or video, it produces a caption with hooks, body text, and a call to action, plus a set of relevant hashtags.',
    howTo: [
      'Describe your image, reel, or post content.',
      'Optionally specify tone (casual, inspirational, promotional).',
      'Click Generate to produce a caption with hashtags.',
      'Copy the caption and hashtags to your Instagram post.',
    ],
    benefits: [
      { title: 'Hook in the first line', description: 'Instagram truncates captions after 125 characters with "more." The tool puts a compelling hook in the first line to encourage users to expand and read the full caption.' },
      { title: 'Emoji integration', description: 'Instagram captions with 1-3 emojis get 15% higher engagement. The tool places emojis contextually — not randomly — to enhance readability.' },
      { title: 'Hashtag set included', description: 'The tool generates 10-15 hashtags mixing popular and niche tags, which is the sweet spot for Instagram reach. Copy them directly to your post or first comment.' },
      { title: 'No Meta API connection', description: 'Generate captions in your browser and paste them into the Instagram app or scheduling tool. No account connection required.' },
    ],
    faqs: [
      { q: 'How long should an Instagram caption be?', a: 'It depends on content type. For reels: 1-2 sentences. For feed posts: 50-300 characters. For carousel posts: 200-500 characters explaining each slide. The tool adjusts length based on your description.' },
      { q: 'Should I put hashtags in the caption or the first comment?', a: 'Both work. Putting hashtags in the first comment keeps the caption cleaner. Either way, Instagram\'s algorithm reads them. Choose based on aesthetic preference.' },
      { q: 'Do Instagram captions affect reach?', a: 'Captions contribute to engagement (comments, saves, shares), which directly affects reach. A compelling caption that prompts comments will boost your post in the algorithm.' },
      { q: 'Can I use this for Instagram Stories?', a: 'Instagram Stories use minimal text overlay rather than captions. For Stories, use the generated hook as your text overlay and skip the full caption.' },
    ],
  },
  'ai-interview-questions-generator': {
    whatIs: 'The AI Interview Questions Generator creates interview questions tailored to a job role, seniority level, and skill area. It produces a mix of technical, behavioral, and situational questions with suggested evaluation criteria.',
    howTo: [
      'Enter the job title and seniority level you\'re hiring for.',
      'Optionally add specific skills or competencies to assess.',
      'Click Generate to produce a structured question set.',
      'Review the questions and pick the ones relevant to your interview process.',
    ],
    benefits: [
      { title: 'Structured interview approach', description: 'Asking every candidate the same core questions reduces bias and improves hiring decisions. The tool generates a consistent question set you can use across all candidates for a role.' },
      { title: 'Mix of question types', description: 'The tool produces behavioral questions ("tell me about a time..."), situational questions ("what would you do if..."), and technical questions specific to the role.' },
      { title: 'Evaluation criteria included', description: 'Each question comes with guidance on what a strong answer looks like, helping interviewers calibrate their assessment across candidates.' },
      { title: 'Saves prep time per hire', description: 'Building an interview rubric from scratch takes 2-3 hours. Generate a question set in seconds and spend your time reviewing and customizing.' },
    ],
    faqs: [
      { q: 'How many interview questions should I ask?', a: 'For a 45-minute interview, prepare 5-7 questions. You won\'t get through all of them, but having extras lets you adapt based on the conversation. Quality of discussion matters more than number of questions.' },
      { q: 'Should I ask the same questions to every candidate?', a: 'Yes for the core 4-5 questions — this ensures fair comparison. You can add role-specific follow-up questions based on each candidate\'s background.' },
      { q: 'Can I use this for panel interviews?', a: 'Yes. Generate a full question set and assign different questions to each panelist so the candidate isn\'t asked overlapping questions by different interviewers.' },
      { q: 'Are the questions legal to ask in interviews?', a: 'The tool avoids questions about protected characteristics (age, marital status, religion, etc.). However, employment law varies by jurisdiction — always have your HR team review the question set.' },
    ],
  },
  'ai-job-description-generator': {
    whatIs: 'The AI Job Description Generator writes structured job postings from a job title and key requirements. It produces a job description with responsibilities, qualifications, and company section, formatted for job boards and your careers page.',
    howTo: [
      'Enter the job title and seniority level.',
      'Add 3-5 key responsibilities and required qualifications.',
      'Optionally include company name and benefits.',
      'Click Generate to produce a formatted job description.',
    ],
    benefits: [
      { title: 'Inclusive language', description: 'The tool avoids gendered language and jargon that can reduce applications from underrepresented groups. Job descriptions with inclusive language receive 30% more applications.' },
      { title: 'Job board optimized', description: 'The generated description follows the structure that major job boards (LinkedIn, Indeed, Glassdoor) expect: summary, responsibilities, requirements, benefits.' },
      { title: 'Saves time per hire', description: 'Writing a job description from scratch takes 30-60 minutes. Generate a complete draft in seconds and customize it with company-specific details.' },
      { title: 'Consistent format across roles', description: 'Using the tool for every job posting ensures your descriptions follow a consistent structure, which improves your employer brand and candidate experience.' },
    ],
    faqs: [
      { q: 'How long should a job description be?', a: '300-700 words is ideal. Longer descriptions get fewer applications — candidates skim and move on. Lead with the most exciting aspects of the role.' },
      { q: 'Should I include salary in the job description?', a: 'Increasingly, yes. Several US states and EU countries require salary disclosure in job postings by law. Even where not required, including salary increases application rates by 30%.' },
      { q: 'Can I use this for internal job postings?', a: 'Yes. For internal postings, the tool generates descriptions focused on growth opportunities and internal mobility, which you can adjust as needed.' },
      { q: 'Should I list "must-have" vs "nice-to-have" qualifications separately?', a: 'Yes. Mixing them discourures candidates who meet most but not all requirements. The tool separates required from preferred qualifications to encourage diverse applicants.' },
    ],
  },
  'ai-keyword-generator': {
    whatIs: 'The AI Keyword Generator produces relevant keywords and phrases for SEO, PPC campaigns, and content planning. Given a seed keyword or topic, it generates related keywords with search intent categorization (informational, commercial, transactional).',
    howTo: [
      'Enter your seed keyword or topic.',
      'Optionally specify the intended use (SEO, PPC, content ideas).',
      'Click Generate to produce a keyword list.',
      'Copy the keywords into your SEO tool, ad campaign, or content plan.',
    ],
    benefits: [
      { title: 'Search intent classification', description: 'The tool categorizes keywords by intent — informational (research), commercial (comparing), transactional (ready to buy) — so you can target the right stage of the buyer journey.' },
      { title: 'Long-tail variations', description: 'Long-tail keywords (4+ words) have lower search volume but higher conversion rates. The tool generates long-tail variations that are easier to rank for than head terms.' },
      { title: 'Content gap identification', description: 'The generated keywords may surface topics your competitors cover but you don\'t, helping you identify content gaps in your strategy.' },
      { title: 'No Google Ads account needed', description: 'Generate keywords in your browser without connecting to Google Keyword Planner or any paid SEO tool. Use the output as input for your existing tools.' },
    ],
    faqs: [
      { q: 'How do I check search volume for these keywords?', a: 'The tool generates keyword ideas, not search volume data. Paste the keywords into Google Keyword Planner (free), Ubersuggest, or Ahrefs to get volume and difficulty metrics.' },
      { q: 'How many keywords should I target per page?', a: 'One primary keyword and 3-5 secondary keywords per page. Trying to rank for too many keywords on one page dilutes relevance. Create separate pages for distinct keyword clusters.' },
      { q: 'Should I target high-volume or low-competition keywords?', a: 'For new sites, target low-competition long-tail keywords first. Build topical authority, then target more competitive terms. The tool generates a mix of both.' },
      { q: 'Can I use these keywords for Google Ads?', a: 'Yes. The generated keywords work as a starting keyword list for Google Ads campaigns. Add them to your ad groups and use the search intent classification to match ad copy to user intent.' },
    ],
  },
  'ai-linkedin-post-generator': {
    whatIs: 'The AI LinkedIn Post Generator creates professional LinkedIn posts from a topic or key message. It produces posts with a hook, body, and call to action, formatted for LinkedIn\'s feed algorithm and professional audience.',
    howTo: [
      'Enter your post topic or the key message you want to share.',
      'Optionally specify tone (professional, thought leadership, personal story).',
      'Click Generate to produce a LinkedIn post.',
      'Review, personalize with your experience, and post to your LinkedIn feed.',
    ],
    benefits: [
      { title: 'LinkedIn algorithm optimized', description: 'LinkedIn rewards "dwell time" — how long people spend reading your post. The tool structures posts with line breaks and a compelling hook that keeps readers scrolling.' },
      { title: 'Professional tone', description: 'LinkedIn content differs from Twitter or Instagram — it should be professional but personal. The tool strikes this balance, avoiding both corporate jargon and casual slang.' },
      { title: 'Encourages comments', description: 'LinkedIn\'s algorithm amplifies posts with comments. The tool ends with a question or opinion prompt that invites discussion, increasing your post\'s reach.' },
      { title: 'No LinkedIn API connection', description: 'Generate posts in your browser and paste them into LinkedIn directly or through a scheduling tool like Buffer or Taplio.' },
    ],
    faqs: [
      { q: 'How long should a LinkedIn post be?', a: 'LinkedIn allows up to 3,000 characters, but the sweet spot is 200-500 characters for engagement. For thought leadership content, 1,000-1,500 characters works. Use line breaks to create visual rhythm.' },
      { q: 'Should I use hashtags on LinkedIn?', a: 'Yes, 3-5 relevant hashtags. LinkedIn uses hashtags for content categorization. Use professional hashtags (#leadership, #productmanagement) rather than casual ones.' },
      { q: 'What is the best time to post on LinkedIn?', a: 'Tuesday through Thursday, 8-10 AM in your audience\'s timezone. Avoid weekends and after 5 PM on weekdays. Schedule posts for mornings when professionals check LinkedIn.' },
      { q: 'Can I use this for LinkedIn articles?', a: 'The tool is designed for feed posts, not long-form articles. For LinkedIn articles (1,500+ words), use the AI Blog Outline Generator to structure your article first.' },
    ],
  },
  'ai-marketing-copy-generator': {
    whatIs: 'The AI Marketing Copy Generator creates promotional copy for landing pages, ads, email campaigns, and marketing materials. Given a product description and target audience, it produces headlines, subheadlines, body copy, and CTAs.',
    howTo: [
      'Enter your product name and a brief description.',
      'Specify your target audience and the primary benefit.',
      'Optionally add the desired call to action.',
      'Click Generate to produce marketing copy variations.',
    ],
    benefits: [
      { title: 'Multiple copy variations', description: 'The tool generates 3-5 variations of each element (headline, subheadline, CTA) so you can A/B test which combination converts best.' },
      { title: 'Benefit-driven language', description: 'Effective marketing copy leads with benefits, not features. The tool translates your product features into outcomes the customer cares about.' },
      { title: 'Adapts to medium', description: 'Landing page copy, Google Ad headlines (30 chars), and email subject lines require different lengths and approaches. The tool adjusts based on your specified use case.' },
      { title: 'No copywriting experience needed', description: 'The tool applies proven copywriting formulas (AIDA, PAS, FAB) so you get professional-quality copy without hiring a copywriter for every campaign.' },
    ],
    faqs: [
      { q: 'What is AIDA in copywriting?', a: 'Attention, Interest, Desire, Action. A proven copywriting formula: grab attention with a headline, build interest with benefits, create desire with specifics, and close with a CTA. The tool follows this structure.' },
      { q: 'How long should a landing page headline be?', a: '10-15 words is ideal for a landing page headline. It should clearly state the value proposition. Subheadlines can be 20-30 words expanding on the promise.' },
      { q: 'Can I use this for Google Ads?', a: 'Yes. Specify "Google Ad" as the use case. The tool generates headlines within the 30-character limit and descriptions within 90 characters.' },
      { q: 'Should I A/B test the generated copy?', a: 'Always. Generate 3-5 variations, test them against each other, and keep the winner. Even well-crafted copy can underperform — testing removes guesswork.' },
    ],
  },
  'ai-meta-description-generator': {
    whatIs: 'The AI Meta Description Generator creates SEO meta descriptions for web pages. Given a page title or topic, it produces a 150-160 character description optimized for search click-through rate, including the target keyword and a compelling hook.',
    howTo: [
      'Enter your page title or topic.',
      'Optionally add your target keyword.',
      'Click Generate to produce meta description variations.',
      'Pick the best one and add it to your page\'s meta description tag.',
    ],
    benefits: [
      { title: 'Optimal length', description: 'Google truncates meta descriptions around 160 characters on desktop and 120 on mobile. The tool targets 150-160 characters to display fully across devices.' },
      { title: 'Improves click-through rate', description: 'Meta descriptions don\'t affect rankings directly but influence CTR from search results. A compelling description with the keyword can increase CTR by 5-10%.' },
      { title: 'Includes target keyword', description: 'Google bolds the search query in meta descriptions. The tool naturally includes your target keyword, which increases visual prominence in search results.' },
      { title: 'Multiple variations for testing', description: 'Generate 3-5 variations and pick the most compelling. Different phrasings resonate with different audiences — test to find your best performer.' },
    ],
    faqs: [
      { q: 'Does Google always show my meta description?', a: 'No. Google may rewrite your meta description based on the search query, pulling text from your page instead. Writing a good description increases the chance Google uses it as-is.' },
      { q: 'Should I include a call to action in the meta description?', a: 'Yes. A soft CTA ("Learn how...", "Discover...", "Get started...") can increase CTR. Avoid pushy language — searchers want information, not a hard sell.' },
      { q: 'Can I use this for product pages?', a: 'Absolutely. Product page meta descriptions should include the product name, key feature, and price if competitive. The tool generates these from your product details.' },
      { q: 'How is this different from the Meta Tag Generator?', a: 'This tool writes the description copy. The Meta Tag Generator creates the full HTML meta tag including the description, title, and other meta elements.' },
    ],
  },
  'ai-meta-title-generator': {
    whatIs: 'The AI Meta Title Generator creates SEO-optimized title tags for web pages. Given a page topic and target keyword, it produces titles under 60 characters that include the keyword near the beginning and your brand name at the end.',
    howTo: [
      'Enter your page topic and target keyword.',
      'Optionally add your brand name.',
      'Click Generate to produce title tag variations.',
      'Pick the best one and add it to your page\'s title tag.',
    ],
    benefits: [
      { title: 'Within Google\'s display limit', description: 'Google truncates title tags around 60 characters. The tool keeps titles under this limit so they display fully in search results without being cut off.' },
      { title: 'Keyword-front-loaded', description: 'Placing the target keyword near the beginning of the title improves search relevance signals and catches the searcher\'s eye in results.' },
      { title: 'Click-worthy phrasing', description: 'The tool applies proven title patterns — "How to...", numbers, questions — that consistently achieve higher CTR in search results.' },
      { title: 'Multiple variations', description: 'Generate 5-10 title variations and test them. Even small changes in phrasing can produce measurably different click-through rates.' },
    ],
    faqs: [
      { q: 'Does Google always show my title tag?', a: 'Google may rewrite title tags in search results if it believes a different title better matches the search query. Writing clear, descriptive titles reduces the chance of rewriting.' },
      { q: 'Should I include my brand name in the title?', a: 'Yes, for your homepage and key landing pages. For long-tail content pages, use the space for keywords instead. Format: "Keyword Phrase | Brand Name" or "Keyword Phrase — Brand Name."' },
      { q: 'How is this different from the Meta Tag Generator?', a: 'This tool writes optimized title copy. The Meta Tag Generator creates the full HTML meta tag set including the title, description, and other elements.' },
      { q: 'Can I use this for blog post titles?', a: 'Yes. Blog post title tags should be slightly different from the on-page H1 — the title tag is for search results, the H1 is for readers. Generate both.' },
    ],
  },
  'ai-paragraph-generator': {
    whatIs: 'The AI Paragraph Generator creates coherent paragraphs from a topic sentence or brief description. It expands your input into a fully developed paragraph with supporting sentences, transitions, and a concluding thought.',
    howTo: [
      'Enter a topic sentence or brief description of what the paragraph should cover.',
      'Optionally specify tone (academic, casual, professional).',
      'Click Generate to produce a paragraph.',
      'Review and edit the paragraph to ensure it fits your document\'s context.',
    ],
    benefits: [
      { title: 'Coherent paragraph structure', description: 'The tool produces paragraphs with a clear topic sentence, supporting evidence or explanation, and a wrap-up — the standard paragraph structure used in essays, reports, and articles.' },
      { title: 'Natural transitions', description: 'The generated paragraph uses transitional phrases ("for example," "in contrast," "as a result") that connect sentences logically, making the paragraph read smoothly.' },
      { title: 'Overcomes blank-page syndrome', description: 'Getting the first paragraph on paper is often the hardest part of writing. Generate a draft paragraph and use it as a springboard for your own writing.' },
      { title: 'No API keys required', description: 'All generation happens in your browser with no external service connection.' },
    ],
    faqs: [
      { q: 'Can I use this for academic writing?', a: 'Use it as a drafting aid. Generate a paragraph to overcome writer\'s block, then rewrite it in your own words with proper citations. Submitting AI-generated text as-is may violate academic integrity policies.' },
      { q: 'How long is the generated paragraph?', a: 'Typically 4-6 sentences (80-150 words), which is the standard paragraph length for most writing. You can edit it shorter or longer as needed.' },
      { q: 'Will the paragraph be factually accurate?', a: 'The tool generates structurally sound paragraphs, but it does not verify facts. Always check that any factual claims, statistics, or references in the generated text are accurate.' },
      { q: 'Can I generate multiple paragraphs for a longer piece?', a: 'Yes. Generate each paragraph separately by providing a topic sentence for each section. This gives you more control over structure and flow than generating one large block of text.' },
    ],
  },
  'ai-pinterest-description-generator': {
    whatIs: 'The AI Pinterest Description Generator creates pin descriptions optimized for Pinterest\'s search algorithm. Given a pin topic or image description, it produces keyword-rich descriptions with hashtags that help pins appear in Pinterest search results.',
    howTo: [
      'Describe your pin content or image.',
      'Optionally add target keywords for Pinterest SEO.',
      'Click Generate to produce a pin description.',
      'Copy the description to your pin when uploading or scheduling.',
    ],
    benefits: [
      { title: 'Pinterest SEO optimized', description: 'Pinterest is a visual search engine, not just a social platform. The tool naturally incorporates keywords that help your pins surface in Pinterest search and category feeds.' },
      { title: 'Encourages saves and clicks', description: 'Pinterest rewards engagement (saves, clicks). The tool writes descriptions that tell users what value they\'ll get from clicking through, increasing click-through rate.' },
      { title: 'Hashtag suggestions', description: 'Pinterest supports 2-5 hashtags per pin. The tool includes relevant hashtags that categorize your pin for Pinterest\'s discovery algorithm.' },
      { title: 'No Pinterest API connection', description: 'Generate descriptions in your browser and paste them into Pinterest or your scheduling tool (Tailwind, Buffer).' },
    ],
    faqs: [
      { q: 'How long should a Pinterest description be?', a: 'Pinterest allows up to 500 characters. Aim for 200-300 characters with keywords naturally integrated. Longer descriptions perform better than very short ones on Pinterest.' },
      { q: 'Does Pinterest use hashtags?', a: 'Yes, but differently than Instagram. Pinterest treats hashtags as search tags, not social tags. Use 2-5 relevant hashtags. The tool generates appropriate ones.' },
      { q: 'Can I use this for Pinterest Idea Pins?', a: 'Yes. Idea Pins (formerly Story Pins) also benefit from keyword-rich descriptions. The tool generates descriptions that work for both standard pins and Idea Pins.' },
      { q: 'How many pins should I create per day?', a: '1-5 pins per day is optimal for most accounts. Quality and consistency matter more than volume. Use the tool to generate descriptions for a batch of pins, then schedule them.' },
    ],
  },
  'ai-pinterest-pin-title-generator': {
    whatIs: 'The AI Pinterest Pin Title Generator creates catchy, keyword-rich titles for Pinterest pins. It produces titles that attract clicks in the Pinterest feed while incorporating search terms that help pins appear in Pinterest search results.',
    howTo: [
      'Enter your pin topic or image description.',
      'Optionally add target keywords.',
      'Click Generate to produce pin title variations.',
      'Pick the title that best matches your pin and copy it to your pin.',
    ],
    benefits: [
      { title: 'Pinterest-optimized length', description: 'Pinterest displays pin titles up to 100 characters. The tool keeps titles within this limit so they display fully in feeds and search results.' },
      { title: 'Click-worthy phrasing', description: 'Pinterest users browse visually but click based on titles. The tool generates titles with curiosity gaps and clear value propositions that drive clicks.' },
      { title: 'Keyword integration', description: 'Pinterest search relies heavily on pin titles. The tool naturally integrates your target keywords without keyword stuffing, which Pinterest\'s algorithm penalizes.' },
      { title: 'Multiple variations', description: 'Generate 5-10 title variations and test which gets the highest click-through rate on your pins.' },
    ],
    faqs: [
      { q: 'How long should a Pinterest pin title be?', a: 'Keep titles under 100 characters. Pinterest truncates longer titles. Lead with the most important keyword and a compelling hook.' },
      { q: 'Should pin titles be different from blog post titles?', a: 'Yes. Pinterest titles should be more descriptive and benefit-focused than blog post titles. "7 Easy Dinner Recipes Under 30 Minutes" works better on Pinterest than "Quick Dinners."' },
      { q: 'Can I use emojis in pin titles?', a: 'Yes, 1-2 relevant emojis can increase pin engagement. The tool includes emoji suggestions you can keep or remove.' },
      { q: 'Do pin titles affect Pinterest search ranking?', a: 'Yes. Pinterest\'s search algorithm weighs pin titles heavily. Include your target keyword in the title for better search visibility.' },
    ],
  },
  'ai-product-description-generator': {
    whatIs: 'The AI Product Description Generator writes product descriptions for e-commerce pages, marketplaces, and catalogs. Given a product name and key features, it produces a description that highlights benefits, addresses common buyer questions, and includes relevant keywords.',
    howTo: [
      'Enter your product name and 3-5 key features.',
      'Optionally add target keywords and the target audience.',
      'Click Generate to produce a product description.',
      'Review, add specific details (dimensions, materials), and publish.',
    ],
    benefits: [
      { title: 'Benefit-focused copy', description: 'Customers buy outcomes, not features. The tool translates features ("3000mAh battery") into benefits ("all-day battery life on a single charge") that resonate with buyers.' },
      { title: 'SEO-friendly keywords', description: 'The tool naturally integrates your target keywords into the description, helping your product page rank for relevant search queries without keyword stuffing.' },
      { title: 'Consistent tone across catalog', description: 'If you have hundreds of products, writing unique descriptions for each is time-consuming. The tool ensures every product page has original, descriptive copy.' },
      { title: 'No API keys needed', description: 'Generate descriptions entirely in your browser without connecting an AI API service.' },
    ],
    faqs: [
      { q: 'How long should a product description be?', a: 'For most products: 150-300 words. For complex or high-value products: 300-500 words. Include bullet points for key specs, followed by a paragraph of descriptive copy.' },
      { q: 'Can I use this for Amazon listings?', a: 'Yes, but Amazon has specific formatting requirements. For Amazon-optimized listings specifically, use the AI Amazon Listing Generator, which follows Amazon\'s bullet point format.' },
      { q: 'Should I include product specifications in the description?', a: 'Yes, but separate them from the narrative copy. Use a bullet list for specs (dimensions, weight, materials) and paragraphs for benefits and use cases.' },
      { q: 'Will the description be unique?', a: 'The tool generates original text from your input. However, if you sell the same product as other retailers, ensure your description differs from the manufacturer\'s default copy to avoid duplicate content issues.' },
    ],
  },
  'ai-product-schema-writer': {
    whatIs: 'The AI Product Schema Writer generates Product schema markup (JSON-LD) for e-commerce product pages. Given product details, it creates structured data that helps Google display rich results including price, availability, and reviews in search listings.',
    howTo: [
      'Enter your product name, price, and availability.',
      'Add product details like brand, SKU, and rating if available.',
      'Click Generate to produce JSON-LD schema markup.',
      'Copy the schema into your page\'s HTML head section.',
    ],
    benefits: [
      { title: 'Rich results in Google', description: 'Product schema enables rich snippets showing price, availability, and star ratings directly in search results, increasing CTR by 20-30% for product pages.' },
      { title: 'Google Shopping eligibility', description: 'Product schema is required for your products to appear in Google Shopping free listings. Without it, your products won\'t show in Shopping tabs or rich results.' },
      { title: 'Valid JSON-LD format', description: 'The tool outputs valid JSON-LD (Google\'s recommended format) that passes the Rich Results Test. No need to manually construct structured data arrays.' },
      { title: 'No developer needed', description: 'Generating schema markup manually requires understanding Schema.org vocabulary. The tool handles this, so non-technical users can add structured data to product pages.' },
    ],
    faqs: [
      { q: 'What is JSON-LD?', a: 'JSON-LD (JavaScript Object Notation for Linked Data) is Google\'s recommended format for structured data. It\'s a JavaScript snippet placed in the page\'s HTML that describes the page content to search engines.' },
      { q: 'Do I need reviews for Product schema?', a: 'No. Reviews and ratings are optional properties. The tool generates valid Product schema with just name, price, and availability. Add rating properties if you have verified reviews.' },
      { q: 'How do I test my schema markup?', a: 'Use Google\'s Rich Results Test tool (search.google.com/test/rich-results) to validate your schema. The tool generates markup that passes this test.' },
      { q: 'Can I use this for product variants?', a: 'Yes. Generate separate schema for each variant with unique SKU, price, and availability. Or use a single Product schema with an isVariantOf property for grouped variants.' },
    ],
  },
  'ai-professional-reply-generator': {
    whatIs: 'The AI Professional Reply Generator creates replies to professional emails, messages, and inquiries. Given the original message and your desired response direction, it produces a polite, clear, and action-oriented reply.',
    howTo: [
      'Paste the email or message you want to reply to.',
      'Describe what you want to say in your reply (e.g. "decline politely" or "accept and propose next steps").',
      'Click Generate to produce a professional reply.',
      'Review, personalize with specifics, and send.',
    ],
    benefits: [
      { title: 'Saves time on routine replies', description: 'If you receive dozens of professional emails daily (inquiries, meeting requests, follow-ups), the tool generates a draft reply in seconds, saving 5-10 minutes per email.' },
      { title: 'Handles difficult replies', description: 'Saying no, pushing back, or escalating issues is hard. The tool produces tactful, clear replies for sensitive situations that maintain the relationship.' },
      { title: 'Consistent professional tone', description: 'The tool maintains a consistent professional tone across all your replies, which is especially valuable when multiple team members handle the same inbox.' },
      { title: 'No sign-up required', description: 'Generate replies in your browser without creating an account or connecting an email API.' },
    ],
    faqs: [
      { q: 'Can I use this for customer support replies?', a: 'Yes. Paste the customer\'s message, describe the resolution, and generate a professional reply. Always verify that the response is accurate before sending.' },
      { q: 'How long should a professional reply be?', a: 'Match the length of the original message. For short inquiries: 2-3 sentences. For detailed requests: match the sender\'s detail level. Never send a one-word reply to a detailed email.' },
      { q: 'Should I personalize the generated reply?', a: 'Always. The tool produces a structurally sound reply, but you should add specific details (dates, names, project references) that show the recipient you read their message carefully.' },
      { q: 'Can I use this for Slack or Teams messages?', a: 'Yes, but shorten the output significantly. Chat messages should be 1-3 sentences. Generate the full reply and trim it for the chat medium.' },
    ],
  },
  'ai-resume-summary-generator': {
    whatIs: 'The AI Resume Summary Generator creates professional summary statements for resumes. Given your job title, years of experience, and key skills, it produces a 2-3 sentence summary that positions you for the roles you\'re targeting.',
    howTo: [
      'Enter your current or target job title.',
      'Add years of experience and 3-4 key skills or achievements.',
      'Optionally specify the type of role you\'re targeting.',
      'Click Generate to produce a resume summary.',
    ],
    benefits: [
      { title: 'Highlights your value proposition', description: 'A resume summary is the first thing recruiters read. The tool distills your experience into a concise value statement that makes recruiters want to read more.' },
      { title: 'ATS-friendly language', description: 'Applicant Tracking Systems (ATS) scan resumes for keywords. The tool naturally incorporates role-relevant keywords that help your resume pass ATS screening.' },
      { title: 'Tailored to the target role', description: 'The tool adjusts the summary based on the role you specify. A summary for a senior engineering role differs from one for a management role, even with the same background.' },
      { title: 'Saves time per application', description: 'Customizing your resume summary for each job application takes 15-20 minutes. Generate a tailored summary in seconds.' },
    ],
    faqs: [
      { q: 'Should I use a summary or an objective statement?', a: 'Use a summary (what you bring to the role) rather than an objective (what you want from the role). Summaries are preferred by recruiters for experienced professionals. New graduates may use an objective.' },
      { q: 'How long should a resume summary be?', a: '2-3 sentences or 50-80 words. It should fit in the top section of your resume without taking up too much space. The tool targets this length.' },
      { q: 'Should I include metrics in my summary?', a: 'Yes, if you have them. "Increased revenue by 40%" is more impactful than "responsible for revenue growth." Add specific metrics when personalizing the generated summary.' },
      { q: 'Can I use this for LinkedIn\'s About section?', a: 'Yes. LinkedIn\'s About section is essentially a longer resume summary. Generate a summary and expand it with more context for LinkedIn.' },
    ],
  },
  'ai-sentence-rewriter': {
    whatIs: 'The AI Sentence Rewriter takes a sentence and rephrases it while preserving the original meaning. It offers alternative word choices, sentence structures, and phrasing to improve clarity, avoid repetition, or match a different tone.',
    howTo: [
      'Paste the sentence you want to rewrite.',
      'Optionally specify the goal (simplify, formalize, shorten, expand).',
      'Click Rewrite to produce alternative phrasings.',
      'Choose the version that best fits your context.',
    ],
    benefits: [
      { title: 'Improves clarity', description: 'Some sentences are technically correct but hard to read. The tool rephrases wordy or convoluted sentences into clearer alternatives without changing the meaning.' },
      { title: 'Avoids repetition', description: 'If you\'ve used the same phrase multiple times in a document, the tool generates alternative phrasings so you can vary your language.' },
      { title: 'Adjusts tone', description: 'Convert a casual sentence to formal, or vice versa. Useful when adapting content for different audiences or platforms.' },
      { title: 'Preserves meaning', description: 'Unlike paraphrasing tools that change the meaning, the tool ensures the rewritten sentence conveys the same information as the original.' },
    ],
    faqs: [
      { q: 'Is rewriting sentences the same as paraphrasing?', a: 'Similar, but rewriting focuses on improving a single sentence\'s phrasing, while paraphrasing typically reworks a longer passage. Use this tool for sentence-level improvements.' },
      { q: 'Can I use this to avoid plagiarism?', a: 'The tool rephrases sentences, but if your source is copyrighted, rewriting individual sentences is not sufficient to avoid plagiarism. Always cite your sources and use original analysis.' },
      { q: 'How many alternatives does it generate?', a: 'The tool produces 3-5 alternative phrasings per sentence, ranging from minor tweaks to structural changes. Pick the one that best fits your document.' },
      { q: 'Does it work for technical writing?', a: 'Yes, but review the output carefully. Technical terms should not be replaced with synonyms. The tool preserves technical vocabulary but may rephrase surrounding words.' },
    ],
  },
  'ai-seo-outline-generator': {
    whatIs: 'The AI SEO Outline Generator creates content outlines optimized for search engines. Given a target keyword, it produces an outline with H2 and H3 headings that cover the topic comprehensively and target related search queries.',
    howTo: [
      'Enter your target keyword.',
      'Optionally add secondary keywords and content type (guide, listicle, comparison).',
      'Click Generate to produce an SEO-optimized outline.',
      'Use the outline as your writing framework, expanding each section with original content.',
    ],
    benefits: [
      { title: 'Covers the topic comprehensively', description: 'Google rewards content that thoroughly covers a topic. The tool generates headings that address all major subtopics, related questions, and user intents for your keyword.' },
      { title: 'Targets People Also Ask queries', description: 'The outline includes sections that answer common questions from Google\'s "People Also Ask" feature, increasing your chances of appearing in rich results.' },
      { title: 'Logical heading hierarchy', description: 'Proper H2/H3 hierarchy helps Google understand your content structure and improves readability for users. The tool produces a clean, nested outline.' },
      { title: 'Saves content planning time', description: 'Researching what to cover for a target keyword takes 30-60 minutes. Generate a comprehensive outline in seconds and start writing immediately.' },
    ],
    faqs: [
      { q: 'Should I include all the suggested headings?', a: 'Use the outline as a framework, not a mandate. If a suggested heading doesn\'t fit your angle, cut it. If you identify a relevant section the tool missed, add it. The outline is a starting point.' },
      { q: 'How many H2 sections should a blog post have?', a: 'For a 1,500-word post: 4-5 H2s. For a 3,000-word comprehensive guide: 7-10 H2s with H3 subsections. The tool adjusts the outline depth based on your content type.' },
      { q: 'Does this guarantee search rankings?', a: 'No. A well-structured outline is necessary but not sufficient for rankings. Content quality, backlinks, and site authority also matter. The tool gives you the best structural foundation.' },
      { q: 'Can I use this with the AI Blog Outline Generator?', a: 'The SEO Outline Generator focuses on search optimization (keyword targeting, PAA coverage). The Blog Outline Generator focuses on readability and narrative flow. Use the SEO tool for ranking-focused content.' },
    ],
  },
  'ai-shopify-product-description-generator': {
    whatIs: 'The AI Shopify Product Description Generator creates product descriptions formatted for Shopify stores. It produces descriptions with HTML formatting (paragraphs, bullet lists) that paste directly into Shopify\'s product description editor.',
    howTo: [
      'Enter your product name and key features.',
      'Optionally add target keywords and product specifications.',
      'Click Generate to produce a Shopify-formatted description.',
      'Copy the description into your Shopify product page.',
    ],
    benefits: [
      { title: 'Shopify-formatted output', description: 'The tool produces descriptions with HTML tags that render correctly in Shopify\'s rich text editor. Bullet points, bold text, and paragraphs paste cleanly without manual formatting.' },
      { title: 'Mobile-optimized length', description: 'Most Shopify traffic is mobile. The tool generates descriptions that are scannable on small screens — short paragraphs, bullet lists for specs, no walls of text.' },
      { title: 'Conversion-focused copy', description: 'Shopify descriptions should sell, not just describe. The tool writes benefit-driven copy that addresses buyer objections and encourages add-to-cart.' },
      { title: 'No Shopify API connection', description: 'Generate descriptions in your browser and paste them into Shopify. No app installation or API integration required.' },
    ],
    faqs: [
      { q: 'How long should a Shopify product description be?', a: '100-250 words for most products. Use bullet points for specs (dimensions, materials, care) and 1-2 short paragraphs for the narrative description. Mobile users scan, they don\'t read.' },
      { q: 'Should I use the same description on Shopify and Amazon?', a: 'No. Each platform has different formatting and audience expectations. Use the AI Shopify tool for Shopify and the AI Amazon Listing Generator for Amazon.' },
      { q: 'Can I include variant-specific descriptions?', a: 'Shopify allows variant-specific descriptions only with custom apps. For most stores, write one description that covers all variants, using bullet points to differentiate (e.g. "Available in 3 colors").' },
      { q: 'Does the tool generate Shopify meta descriptions?', a: 'No, this tool focuses on the product description (body). For the SEO meta description, use the AI Meta Description Generator.' },
    ],
  },
  'ai-shorts-caption-generator': {
    whatIs: 'The AI Shorts Caption Generator creates captions for YouTube Shorts, Instagram Reels, and TikTok videos. Given a brief description of your short-form video, it produces a caption with a hook, keywords, and hashtags optimized for vertical video platforms.',
    howTo: [
      'Describe your short video content (e.g. "30-second pasta recipe").',
      'Optionally specify the platform (YouTube Shorts, Reels, TikTok).',
      'Click Generate to produce a caption with hashtags.',
      'Copy the caption to your video when uploading.',
    ],
    benefits: [
      { title: 'Platform-specific optimization', description: 'Each platform has different caption conventions. YouTube Shorts captions can be longer, TikTok captions should be punchy, and Reels fall in between. The tool adjusts based on your platform.' },
      { title: 'Discovery hashtags', description: 'Short-form video discovery relies heavily on hashtags. The tool generates 3-7 platform-appropriate hashtags that help your video appear in relevant feeds and the For You page.' },
      { title: 'Hook in the first line', description: 'On all short-form platforms, users decide whether to watch in the first 2 seconds. The caption\'s first line reinforces the video\'s hook and encourages watch-through.' },
      { title: 'No API integration', description: 'Generate captions in your browser and paste them into the YouTube, Instagram, or TikTok app.' },
    ],
    faqs: [
      { q: 'How long should a YouTube Shorts caption be?', a: 'YouTube Shorts allows up to 100 characters in the title and 5,000 in the description. Keep the title under 60 characters and the first line of the description compelling, as that\'s what shows in feeds.' },
      { q: 'How many hashtags for TikTok?', a: 'TikTok recommends 3-5 hashtags. Mix trending hashtags with niche ones. Too many hashtags can look spammy and may hurt reach.' },
      { q: 'Should I include a call to action in Shorts captions?', a: 'Yes, a soft CTA ("save this for later," "follow for more recipes") can increase engagement. Keep it brief — the video is the main content.' },
      { q: 'Do captions matter if the video has text overlay?', a: 'Yes. Text overlay catches attention, but captions provide keywords for the platform\'s search algorithm and additional context for viewers who browse without sound.' },
    ],
  },
  'ai-simplify-text': {
    whatIs: 'The AI Simplify Text tool takes complex, jargon-heavy, or verbose text and rewrites it in plain language. It reduces reading level, shortens sentences, and replaces technical terms with everyday equivalents while preserving the core meaning.',
    howTo: [
      'Paste the text you want to simplify.',
      'Optionally specify the target reading level (e.g. "grade 8" or "plain English").',
      'Click Simplify to produce a plain-language version.',
      'Review the simplified text for accuracy and use it in your context.',
    ],
    benefits: [
      { title: 'Improves readability', description: 'The tool reduces average sentence length and replaces multi-syllable jargon with simpler alternatives, bringing the reading level down to the target you specify.' },
      { title: 'Wider audience reach', description: 'Content written at a lower reading level is accessible to more people. If your audience includes non-native speakers or general consumers, simplifying technical language improves comprehension.' },
      { title: 'Useful for compliance', description: 'Many industries (legal, medical, financial) have plain-language requirements for consumer-facing documents. The tool helps you meet these requirements without hiring a plain-language editor.' },
      { title: 'Preserves meaning', description: 'The tool simplifies language, not content. Your facts, arguments, and key points remain intact — only the expression changes.' },
    ],
    faqs: [
      { q: 'What reading level should I target?', a: 'For general public content: Grade 7-8 (roughly 12-14 years old). For professional audiences: Grade 10-12. The tool can target specific levels based on your input.' },
      { q: 'Will simplifying text make it less professional?', a: 'No. Plain language is increasingly the standard in professional communication. Government agencies, healthcare, and financial services all adopt plain-language guidelines. Clarity is professional.' },
      { q: 'Can I use this for legal documents?', a: 'Use it for consumer-facing summaries of legal terms. The actual contract or legal document should remain in precise legal language — simplifying legal text can change its legal meaning.' },
      { q: 'Does it work for technical documentation?', a: 'Yes, for user-facing documentation (help articles, user guides). For developer API docs, keep technical terms — your audience expects and needs them.' },
    ],
  },
  'ai-slogan-generator': {
    whatIs: 'The AI Slogan Generator creates short, memorable taglines for brands, campaigns, and products. Given your brand name and key value proposition, it produces slogan variations ranging from descriptive to aspirational.',
    howTo: [
      'Enter your brand or product name.',
      'Add a brief description of what you do or your key benefit.',
      'Optionally specify tone (playful, serious, aspirational).',
      'Click Generate to produce slogan variations.',
    ],
    benefits: [
      { title: 'Memorable phrasing', description: 'Great slogans use rhythm, alliteration, or contrast to stick in memory. The tool applies these techniques to produce slogans that are easy to remember and repeat.' },
      { title: 'Multiple tone options', description: 'A B2B software company needs a different slogan tone than a consumer snack brand. The tool generates variations across tones so you can find the right fit.' },
      { title: 'Short and punchy', description: 'Effective slogans are typically 3-7 words. The tool keeps slogans within this range, avoiding the common mistake of cramming too much information into a tagline.' },
      { title: 'No sign-up needed', description: 'Generate slogans immediately without creating an account or connecting an API.' },
    ],
    faqs: [
      { q: 'What makes a good slogan?', a: 'Brevity, clarity, and memorability. The best slogans (Nike\'s "Just Do It," Apple\'s "Think Different") are 2-3 words that capture the brand\'s essence. Avoid cramming features into a slogan.' },
      { q: 'Should my slogan include my brand name?', a: 'It depends. If your brand is unknown, including the name helps with recall. If your brand is established, an aspirational slogan without the name can be more powerful.' },
      { q: 'Can I trademark a slogan?', a: 'Yes, slogans can be trademarked. Search the USPTO database first to ensure your chosen slogan isn\'t already registered. The tool does not perform trademark checks.' },
      { q: 'How many slogans should I generate?', a: 'Generate 15-20 and shortlist 3-5. Test them with your team, existing customers, or a small ad campaign before committing to one.' },
    ],
  },
  'ai-slug-generator-pro': {
    whatIs: 'The AI Slug Generator Pro creates SEO-friendly URL slugs from page titles or headings. It converts titles into lowercase, hyphen-separated URLs that are readable by both humans and search engines, with intelligent stop-word removal.',
    howTo: [
      'Enter your page title or heading.',
      'Optionally configure settings (max length, stop-word removal, date prefix).',
      'Click Generate to produce a URL slug.',
      'Copy the slug and use it in your CMS or routing configuration.',
    ],
    benefits: [
      { title: 'SEO-friendly format', description: 'Search engines prefer short, descriptive URLs with hyphens (not underscores or spaces). The tool produces slugs that follow Google\'s URL best practices.' },
      { title: 'Intelligent stop-word removal', description: 'Words like "the," "a," "of," and "in" add length without SEO value. The tool removes these automatically while preserving meaning (e.g. "how-to-rank-on-google" not "how-to-rank-on-the-google").' },
      { title: 'Length control', description: 'Overly long URLs can be truncated in search results and are harder to share. The tool can cap slug length while preserving the most important keywords.' },
      { title: 'Consistent URL structure', description: 'If you publish content regularly, the tool ensures every URL follows the same convention, improving site architecture and crawlability.' },
    ],
    faqs: [
      { q: 'Should URL slugs include dates?', a: 'For news and time-sensitive content: yes (e.g. "2025-09-seo-guide"). For evergreen content: no. Dating evergreen content makes it appear outdated even when updated. The tool supports both options.' },
      { q: 'Should I change existing URL slugs for SEO?', a: 'Only if they are clearly problematic (special characters, very long, keyword-stuffed). Changing URLs requires 301 redirects to preserve SEO equity. Don\'t change URLs for marginal improvements.' },
      { q: 'What characters are allowed in URL slugs?', a: 'Only lowercase letters, numbers, and hyphens. The tool removes or replaces all other characters (spaces, punctuation, special characters, non-ASCII characters).' },
      { q: 'How long should a URL slug be?', a: '3-5 words is ideal. Keep slugs under 75 characters. Shorter URLs rank slightly better and are easier to share. The tool can enforce a maximum length.' },
    ],
  },
  'ai-social-bio-generator': {
    whatIs: 'The AI Social Bio Generator creates profile bios for social media platforms (Instagram, Twitter, LinkedIn, TikTok). Given your profession, interests, and personality, it produces a bio that fits each platform\'s character limit and culture.',
    howTo: [
      'Enter your profession, key interests, and any credentials.',
      'Optionally specify the platform (Instagram, Twitter, LinkedIn, TikTok).',
      'Click Generate to produce bio variations.',
      'Pick the bio that fits your brand and copy it to your profile.',
    ],
    benefits: [
      { title: 'Platform-specific formatting', description: 'Instagram allows 150 characters with emoji, LinkedIn allows 220 with professional tone, Twitter allows 160. The tool adjusts length and style per platform.' },
      { title: 'Shows personality and credibility', description: 'A good bio communicates who you are, what you do, and why someone should follow you. The tool balances personality with credibility in the limited space.' },
      { title: 'Includes a call to action', description: 'Effective social bios end with a CTA — "link in bio," "DM for collabs," "subscribe to my newsletter." The tool includes platform-appropriate CTAs.' },
      { title: 'No sign-up required', description: 'Generate bios in your browser without creating an account.' },
    ],
    faqs: [
      { q: 'How long should an Instagram bio be?', a: 'Instagram allows 150 characters. Use 2-3 lines: what you do, a personality element, and a CTA. The tool targets this length with appropriate formatting.' },
      { q: 'Should my LinkedIn bio be different from my resume summary?', a: 'Yes. LinkedIn bios are more personal and conversational. Your resume summary is formal and achievement-focused. The tool generates platform-appropriate versions.' },
      { q: 'Can I include emojis in my social bio?', a: 'On Instagram and TikTok: yes, 2-3 relevant emojis. On LinkedIn: use sparingly (1 at most). On Twitter: optional. The tool includes platform-appropriate emoji suggestions.' },
      { q: 'Should I update my bio regularly?', a: 'Update your bio when your role, focus, or offerings change. Review quarterly. An outdated bio is worse than a simple one.' },
    ],
  },
  'ai-startup-name-generator': {
    whatIs: 'The AI Startup Name Generator creates name suggestions for new companies, products, and side projects. It combines naming patterns common in successful startups — short names, portmanteaus, real words in new contexts — with your industry and vision.',
    howTo: [
      'Enter your startup\'s industry or product category.',
      'Add 2-3 keywords that describe your vision.',
      'Optionally specify naming style (short, abstract, descriptive).',
      'Click Generate and review the suggestions.',
    ],
    benefits: [
      { title: 'Startup naming patterns', description: 'Successful startup names tend to be short (1-2 syllables), easy to pronounce, and distinctive. The tool follows these patterns rather than generating generic business names.' },
      { title: '.com domain awareness', description: 'The tool generates names that have a reasonable chance of having an available .com domain, avoiding common TLD-heavy patterns that require creative domain hacks.' },
      { title: 'Multiple naming approaches', description: 'The tool explores real words (Apple), portmanteaus (Instagram), misspellings (Lyft), and foreign words (Asana) so you see the full range of startup naming options.' },
      { title: 'No sign-up needed', description: 'Generate names immediately without creating an account.' },
    ],
    faqs: [
      { q: 'Should my startup name describe what we do?', a: 'Not necessarily. Descriptive names (Dropbox, Netflix) work but limit brand evolution. Abstract names (Google, Stripe) are harder to launch but more memorable. The tool generates both types.' },
      { q: 'How important is a .com domain?', a: 'For startups seeking VC funding, a .com domain signals credibility. If your preferred name\'s .com is taken, consider a different name rather than an alternative TLD (.io, .co) for investor-facing startups.' },
      { q: 'Can I trademark a startup name?', a: 'Yes. Search the USPTO database for existing trademarks in your class. File a trademark application once you\'ve selected and committed to a name. The tool does not perform trademark checks.' },
      { q: 'How many names should I generate?', a: 'Generate 50-100 names and shortlist 5-10. Check domain and trademark availability for each. Naming is a filter, not a eureka moment — start broad and narrow down.' },
    ],
  },
  'ai-summarizer': {
    whatIs: 'The AI Summarizer condenses long text into a shorter version that captures the key points. It identifies the most important sentences and ideas, producing a summary that is significantly shorter than the original while retaining the core information.',
    howTo: [
      'Paste the text you want to summarize.',
      'Optionally specify the desired summary length (brief, medium, detailed).',
      'Click Summarize to produce a condensed version.',
      'Review the summary for accuracy and completeness.',
    ],
    benefits: [
      { title: 'Saves reading time', description: 'Summarizing a 5,000-word report to 200 words lets you grasp the key points in under a minute. Useful for processing large volumes of content efficiently.' },
      { title: 'Extractive summarization', description: 'The tool identifies and extracts the most important sentences from the original text rather than generating new sentences, ensuring the summary uses the author\'s own words and maintains accuracy.' },
      { title: 'Adjustable length', description: 'Choose a brief summary (1-2 sentences) for a quick overview or a detailed summary (multiple paragraphs) for a more comprehensive digest. The tool adjusts based on your preference.' },
      { title: 'Processed in your browser', description: 'Your text never leaves your device. This is important for confidential documents like contracts, internal reports, or legal filings.' },
    ],
    faqs: [
      { q: 'How accurate are AI summaries?', a: 'The tool captures the main points accurately for well-structured text. For nuanced or highly technical content, always review the summary against the original to ensure no critical details were lost.' },
      { q: 'Can I use this for academic papers?', a: 'Use it to get a quick overview of a paper before reading the full text. Do not substitute a summary for reading the original — academic papers contain details and caveats that summaries may omit.' },
      { q: 'What is the maximum input length?', a: 'The tool handles up to 10,000 characters per summarization. For longer documents, summarize section by section and combine the results.' },
      { q: 'Does the summary preserve the original tone?', a: 'The tool uses extractive summarization, so the summary retains the original author\'s words and tone. It does not rewrite or rephrase — it selects the most important sentences.' },
    ],
  },
  'ai-tagline-generator': {
    whatIs: 'The AI Tagline Generator creates short, catchy phrases that communicate a brand\'s value or personality. Unlike a slogan (which is more permanent), taglines are often used for specific campaigns, product launches, or marketing initiatives.',
    howTo: [
      'Enter your brand or product name.',
      'Add a brief description of what makes it unique.',
      'Optionally specify the desired tone (witty, bold, comforting).',
      'Click Generate to produce tagline variations.',
    ],
    benefits: [
      { title: 'Campaign-ready phrasing', description: 'Taglines need to work in ad copy, social media graphics, and email subject lines. The tool produces short phrases that fit across marketing materials.' },
      { title: 'Emotional appeal', description: 'Great taglines connect emotionally — they make people feel something in a few words. The tool generates taglines with emotional hooks, not just descriptive statements.' },
      { title: 'Multiple variations for testing', description: 'Generate 10-15 taglines and test them in ad campaigns. Small differences in phrasing can produce significantly different engagement rates.' },
      { title: 'No sign-up required', description: 'Generate taglines in your browser without creating an account.' },
    ],
    faqs: [
      { q: 'What is the difference between a slogan and a tagline?', a: 'A slogan is a long-term brand identifier (Nike: "Just Do It"). A tagline is often campaign-specific or product-specific and can change more frequently. The tool can generate both.' },
      { q: 'How long should a tagline be?', a: '3-8 words. Taglines should be short enough to fit in an ad headline or social graphic. The tool keeps taglines within this range.' },
      { q: 'Should my tagline rhyme?', a: 'Rhyme can aid memorability but can also feel forced. Use it if it fits your brand personality (playful, consumer). Avoid it for B2B or serious brands. The tool generates both rhyming and non-rhyming options.' },
      { q: 'Can I use a tagline as my SEO meta description?', a: 'Not directly — meta descriptions need to describe the page content. But a tagline can be part of your meta description if it naturally includes relevant keywords.' },
    ],
  },
  'ai-thumbnail-text-generator': {
    whatIs: 'The AI Thumbnail Text Generator creates short, punchy text overlays for YouTube and video thumbnails. Given your video topic, it produces 2-5 word phrases that fit on a thumbnail image and compel viewers to click.',
    howTo: [
      'Enter your video topic or title.',
      'Optionally specify the desired tone (curiosity, urgency, how-to).',
      'Click Generate to produce thumbnail text variations.',
      'Pick the text that best complements your thumbnail image and add it in your design tool.',
    ],
    benefits: [
      { title: 'Optimized for thumbnail space', description: 'Thumbnail text must be readable at 320x180 pixels (the size shown in YouTube search). The tool generates 2-5 word phrases that fit large enough to read at small sizes.' },
      { title: 'Curiosity-driven phrasing', description: 'YouTube thumbnails work best when they create a curiosity gap — showing just enough to make viewers want to click. The tool generates phrases that create this gap without clickbait.' },
      { title: 'Complements the video title', description: 'Thumbnail text should add to the title, not repeat it. The tool generates text that provides a different angle or hook from your video title.' },
      { title: 'No design tool integration needed', description: 'Generate the text in your browser and add it to your thumbnail in Canva, Photoshop, or Figma.' },
    ],
    faqs: [
      { q: 'How many words should thumbnail text have?', a: '2-5 words is ideal. More than 5 words becomes unreadable at small sizes. The tool targets this range. If you need more context, use the video title, not the thumbnail.' },
      { q: 'Should thumbnail text match the video title?', a: 'No. Repeating the title on the thumbnail is a wasted opportunity. Use the thumbnail text to add a different hook, emotion, or curiosity element that complements the title.' },
      { q: 'What font should I use for thumbnail text?', a: 'Bold, sans-serif fonts (Arial Black, Impact, Montserrat Bold) work best. Use high contrast against the background. The tool generates the text — you handle the design in your preferred tool.' },
      { q: 'Can I use this for blog featured images?', a: 'Yes. The short, punchy text works well on blog post featured images and social share graphics too. The same principles apply: short text, high contrast, curiosity gap.' },
    ],
  },
  'ai-tweet-generator': {
    whatIs: 'The AI Tweet Generator creates engaging tweets for Twitter/X from a topic or key message. It produces tweets within the 280-character limit, with suggested hashtags and tone options optimized for Twitter\'s fast-paced feed.',
    howTo: [
      'Enter your topic or the key message you want to tweet.',
      'Optionally specify tone (informative, witty, controversial, thread-opening).',
      'Click Generate to produce tweet variations.',
      'Pick the tweet that fits your voice and post to Twitter/X.',
    ],
    benefits: [
      { title: 'Within character limit', description: 'Twitter/X allows 280 characters (or 25,000 for Premium). The tool generates tweets within the free-tier limit, including space for hashtags.' },
      { title: 'Tweet-length hooks', description: 'Twitter rewards punchy, quotable content. The tool generates tweets with strong opening lines that stop the scroll in a fast-moving feed.' },
      { title: 'Hashtag suggestions', description: '1-2 relevant hashtags can increase reach. The tool includes hashtags that are specific enough to be useful but not so broad that they get lost in noise.' },
      { title: 'Thread-ready', description: 'If your topic is complex, the tool can generate a thread (5-7 connected tweets) that breaks the topic into digestible chunks, which performs better than a single long tweet.' },
    ],
    faqs: [
      { q: 'How long should a tweet be?', a: 'Twitter allows 280 characters, but tweets under 100 characters get 17% higher engagement. The tool can generate short punchy tweets or full-length ones based on your preference.' },
      { q: 'Should I use hashtags on Twitter/X?', a: '1-2 hashtags maximum. Twitter\'s algorithm does not reward hashtag density (unlike Instagram). Too many hashtags can look spammy and reduce engagement.' },
      { q: 'What is a Twitter thread?', a: 'A series of connected tweets (numbered 1/n) that tell a story or explain a topic in depth. Threads get more engagement than single tweets for complex topics. The tool can generate thread structures.' },
      { q: 'When is the best time to tweet?', a: 'Weekdays 9 AM - 3 PM in your audience\'s timezone. Twitter/X has a short content half-life (15-20 minutes), so timing matters more than on other platforms.' },
    ],
  },
  'ai-video-hook-generator': {
    whatIs: 'The AI Video Hook Generator creates opening lines for short-form and long-form videos. Given your video topic, it produces 3-5 second hook scripts that grab attention in the first few seconds — the critical window where viewers decide to keep watching or scroll past.',
    howTo: [
      'Enter your video topic or the main point.',
      'Optionally specify the video type (YouTube, TikTok, Reels, long-form).',
      'Click Generate to produce hook variations.',
      'Pick the hook that fits your style and use it as your video\'s opening line.',
    ],
    benefits: [
      { title: 'Optimized for watch-through', description: 'The first 3 seconds determine whether 70% of viewers continue watching. The tool generates hooks that create immediate curiosity or stakes, improving retention.' },
      { title: 'Pattern interrupts', description: 'Effective hooks break the viewer\'s expectations — a surprising stat, a contrarian statement, a direct question. The tool uses these proven hook patterns.' },
      { title: 'Platform-aware', description: 'TikTok and Reels hooks need to be faster than YouTube long-form hooks. The tool adjusts the hook style based on your specified platform.' },
      { title: 'No sign-up needed', description: 'Generate hooks in your browser without creating an account.' },
    ],
    faqs: [
      { q: 'What makes a good video hook?', a: 'A good hook creates immediate curiosity, stakes, or relevance. It should make the viewer think "I need to know this" or "I didn\'t expect that." Avoid slow introductions — get to the point instantly.' },
      { q: 'How long should a video hook be?', a: 'For short-form (TikTok, Reels): 2-3 seconds (one sentence). For YouTube: 5-10 seconds. The hook should be the first thing the viewer hears, before any intro or branding.' },
      { q: 'Should I write the hook before or after filming?', a: 'Write the hook before filming so you can deliver it naturally on camera. If you improvise, record multiple takes of the hook and pick the strongest in editing.' },
      { q: 'Can I use hooks in written content?', a: 'Yes. Video hooks work as blog post opening lines, email subject lines, and social media captions. The attention-grabbing principles are the same across formats.' },
    ],
  },
  'ai-video-script-generator': {
    whatIs: 'The AI Video Script Generator creates structured scripts for YouTube videos, explainer videos, and social media content. Given a topic and desired length, it produces a script with hook, intro, main content sections, and outro.',
    howTo: [
      'Enter your video topic and desired length (short, medium, long).',
      'Optionally add key points you want to cover.',
      'Click Generate to produce a structured video script.',
      'Use the script as a filming guide, adapting it to your speaking style.',
    ],
    benefits: [
      { title: 'Structured for retention', description: 'YouTube\'s algorithm rewards watch time. The tool structures scripts with a strong hook, clear sections, and periodic re-engagement moments to keep viewers watching.' },
      { title: 'Natural speaking rhythm', description: 'The script uses conversational language with short sentences and natural transitions, making it easy to deliver on camera without sounding like you\'re reading.' },
      { title: 'Saves pre-production time', description: 'Writing a video script from scratch takes 1-3 hours depending on length. Generate a structured draft in seconds and spend your time rehearsing and refining.' },
      { title: 'Works for any video type', description: 'YouTube tutorials, product demos, explainer videos, social media content — the tool adapts the script structure to your specified video type.' },
    ],
    faqs: [
      { q: 'Should I read the script word-for-word?', a: 'No. Use the script as a guide and deliver it in your own words. Reading word-for-word often sounds stilted on camera. Memorize the structure and key points, then speak naturally.' },
      { q: 'How long is a 5-minute video script?', a: 'A 5-minute video requires roughly 650-750 words (130-150 words per minute is average speaking pace). The tool adjusts the script length based on your target video duration.' },
      { q: 'Can I use this for podcast scripts?', a: 'Yes. Podcast scripts follow a similar structure (hook, intro, segments, outro). The tool works for audio-only content — just remove visual cues from the script.' },
      { q: 'Should I include B-roll cues in the script?', a: 'The tool focuses on spoken content. Add your own B-roll, text overlay, and visual cues during editing. The script is the verbal foundation — visuals are layered on top.' },
    ],
  },
  'ai-youtube-description-generator': {
    whatIs: 'The AI YouTube Description Generator creates SEO-optimized descriptions for YouTube videos. Given a video topic and key points, it produces a description with a compelling first line, keyword-rich body, timestamps, and relevant hashtags.',
    howTo: [
      'Enter your video topic and 2-3 key points.',
      'Optionally add target keywords and links to include.',
      'Click Generate to produce a YouTube description.',
      'Copy the description to your YouTube video when uploading.',
    ],
    benefits: [
      { title: 'YouTube search optimization', description: 'YouTube is the second largest search engine. Descriptions with relevant keywords help your videos appear in YouTube search results and Google video results.' },
      { title: 'First line optimization', description: 'YouTube shows only the first 125 characters before "show more." The tool puts a compelling hook with keywords in the first line to drive click-throughs from search.' },
      { title: 'Timestamps included', description: 'Video chapters (timestamps) improve user experience and are shown in search results, increasing click-through rate. The tool generates timestamp placeholders you can fill in.' },
      { title: 'Hashtag suggestions', description: 'YouTube displays the first 3 hashtags above the video title. The tool generates relevant hashtags that categorize your video for YouTube\'s discovery algorithm.' },
    ],
    faqs: [
      { q: 'How long should a YouTube description be?', a: 'YouTube allows 5,000 characters. Aim for 200-500 words. The first 125 characters are critical — they appear in search results before the "show more" cutoff.' },
      { q: 'Should I include links in the description?', a: 'Yes. Include links to your website, social media, and any resources mentioned in the video. Place them after the first paragraph so they don\'t push keywords below the fold.' },
      { q: 'Do YouTube descriptions affect SEO?', a: 'Yes. YouTube\'s search algorithm reads descriptions for keyword signals. Include your target keyword in the first 125 characters and 2-3 times naturally throughout.' },
      { q: 'Can I use the same description for multiple videos?', a: 'No. Each video should have a unique description. Duplicate descriptions across videos can hurt your channel\'s SEO. The tool generates unique descriptions from your specific input.' },
    ],
  },
  'ai-youtube-title-generator': {
    whatIs: 'The AI YouTube Title Generator creates click-worthy titles for YouTube videos. Given a video topic, it produces titles under 60 characters that include target keywords and use proven title patterns for higher click-through rates.',
    howTo: [
      'Enter your video topic or a draft title.',
      'Optionally add target keywords.',
      'Click Generate to produce title variations.',
      'Pick the title that best fits your video and audience.',
    ],
    benefits: [
      { title: 'Under 60 characters', description: 'YouTube truncates titles around 60 characters in search results and sidebar recommendations. The tool keeps titles within this limit so they display fully.' },
      { title: 'High-CTR patterns', description: 'YouTube titles with numbers ("7 Ways..."), brackets ("[Updated]"), and emotional triggers get higher CTR. The tool applies these patterns based on your content type.' },
      { title: 'Keyword-front-loaded', description: 'Placing the target keyword near the beginning of the title improves YouTube search ranking and catches the viewer\'s eye in search results.' },
      { title: 'Multiple variations for testing', description: 'Generate 5-10 title variations. YouTube Studio lets you change titles after publishing, so you can test which title gets the highest CTR.' },
    ],
    faqs: [
      { q: 'Should I use clickbait titles?', a: 'No. Clickbait titles (misleading or overhyped) may get initial clicks but hurt watch time when viewers leave early, which damages your channel\'s algorithmic standing. The tool generates compelling but honest titles.' },
      { q: 'Can I change my YouTube title after publishing?', a: 'Yes. YouTube allows title changes after publishing. Monitor your CTR in YouTube Studio for the first 48 hours — if it\'s below 3%, try a different generated title.' },
      { q: 'Should I use emojis in YouTube titles?', a: '1-2 relevant emojis can increase CTR by 5-10%. Avoid more than 2 — excessive emojis look spammy. The tool includes optional emoji suggestions.' },
      { q: 'How is this different from the Blog Title Generator?', a: 'YouTube titles need to be shorter (60 chars vs 60 chars for Google but YouTube truncates differently) and more emotionally compelling. Blog titles can be more descriptive. The tools are tuned for their respective platforms.' },
    ],
  },

  // ─── Video Tools ──────────────────────────────────────────────
  'video-compressor': {
    whatIs: 'The Video Compressor accepts video files (MP4, WebM, QuickTime) through a drag-and-drop interface and produces a downloadable output file. All processing happens locally in your browser — no uploads to external servers.',
    howTo: [
      'Drag your video file onto the upload area, or click to browse and select a file.',
      'The tool displays the file name and size so you can confirm you selected the right video.',
      'Click the Process button to generate the compressed output.',
      'Click Download to save the result to your device.',
    ],
    benefits: [
      { title: 'Files stay on your device', description: 'Your video is processed in the browser and never uploaded to a server. This matters for client work, personal videos, and content under NDA.' },
      { title: 'No account or software install', description: 'Open the page and use the tool immediately. No sign-up, no download, no plugin. Works on any device with a modern browser.' },
      { title: 'Simple drag-and-drop interface', description: 'Upload a file with one drag. The tool shows file details before processing so you always know what you are working with.' },
      { title: 'Unlimited use, completely free', description: 'Compress as many videos as you need with no cost, no watermarks, and no usage caps.' },
    ],
    faqs: [
      { q: 'What video formats can I compress?', a: 'The tool accepts MP4, WebM, and QuickTime (MOV) files. These are the most common video formats produced by phones, cameras, and screen recording software.' },
      { q: 'Is my video uploaded to a server?', a: 'No. All processing happens locally in your browser. Your video file never leaves your device.' },
      { q: 'How long does compression take?', a: 'Processing time depends on the file size and your device. The tool processes the file locally, so faster hardware means shorter wait times.' },
      { q: 'Can I compress multiple videos at once?', a: 'The tool processes one video at a time. For multiple files, run each video through the tool separately.' },
      { q: 'Will the compressed video have a watermark?', a: 'No. The output file contains no watermarks or branding. You receive a clean video file.' },
    ],
  },
  'video-trimmer': {
    whatIs: 'The Video Trimmer lets you set start and end points on a video file to export only the segment you want to keep. Upload an MP4, WebM, or MOV file, specify the time range, and download the trimmed clip.',
    howTo: [
      'Drag your video onto the upload area or click to browse for a file.',
      'Enter the start time (in seconds) where you want the clip to begin.',
      'Enter the end time (in seconds) where you want the clip to end.',
      'Click Process to generate the trimmed output.',
      'Click Download to save the clip to your device.',
    ],
    benefits: [
      { title: 'Quick segment extraction', description: 'Set a start and end time in seconds to isolate the exact portion of a video you need, without opening a full video editor.' },
      { title: 'Local processing only', description: 'Your video stays on your device throughout the process. No upload to a cloud editing service, which matters for confidential or unreleased footage.' },
      { title: 'Works on any device', description: 'The tool runs in any modern browser — desktop, tablet, or phone. No software installation needed.' },
      { title: 'Free with no sign-up', description: 'Trim as many videos as you need at no cost. No account, no email, no usage limits.' },
    ],
    faqs: [
      { q: 'How do I specify the trim points?', a: 'Enter the start and end times in seconds. For example, enter 30 as the start and 90 as the end to keep the segment from 30 seconds to 90 seconds.' },
      { q: 'What video formats are supported?', a: 'MP4, WebM, and QuickTime (MOV) files are supported. These are the most common formats from phones, cameras, and recording software.' },
      { q: 'Is my video uploaded anywhere?', a: 'No. The file is processed in your browser and never sent to a server.' },
      { q: 'Can I trim multiple segments from the same video?', a: 'The tool trims one segment at a time. To create multiple clips, run the tool multiple times with different start and end values.' },
      { q: 'Does trimming reduce file size?', a: 'Yes — the output contains only the frames within your selected time range, so the result is smaller than the original.' },
    ],
  },
  'video-to-gif': {
    whatIs: 'The Video to GIF tool extracts frames from a video file and assembles them into an animated GIF. Upload a video, and the tool captures frames at 10fps using the Canvas API, producing a downloadable GIF file.',
    howTo: [
      'Drag your video onto the upload area or click to browse.',
      'Click Process to start frame extraction from the video.',
      'The tool captures frames at 10fps using the Canvas API.',
      'Click Download to save the GIF to your device.',
    ],
    benefits: [
      { title: 'Real Canvas-based frame capture', description: 'The tool uses the HTML5 Canvas API to seek through the video and draw frames, producing genuine image data from your video.' },
      { title: 'No upload to a GIF service', description: 'Your video is processed in the browser. It never goes to an online GIF-making site, which matters for unreleased or confidential footage.' },
      { title: 'Simple one-click conversion', description: 'Upload your video and click Process. No complex settings — the tool handles frame capture automatically at 10fps.' },
      { title: 'Free with no watermarks', description: 'The output GIF contains no watermarks or branding. Use it freely in emails, chat apps, or on web pages.' },
    ],
    faqs: [
      { q: 'What frame rate does the GIF use?', a: 'The tool captures frames at 10fps (10 frames per second). This produces a smooth animation while keeping the file size reasonable for web use.' },
      { q: 'What video formats can I convert?', a: 'MP4, WebM, and QuickTime (MOV) files are supported. These are the most common formats produced by phones and recording software.' },
      { q: 'Why does my GIF look grainy?', a: 'The GIF format supports a maximum of 256 colors per frame. Videos with many colors or smooth gradients will show dithering. This is a format limitation, not a tool issue.' },
      { q: 'Can I include audio in the GIF?', a: 'No. The GIF format does not support audio. The tool extracts visual frames only. If you need audio, use the Video Trimmer to create a short video clip instead.' },
      { q: 'Is my video uploaded to a server?', a: 'No. Frame extraction happens in your browser using the Canvas API. Your video file never leaves your device.' },
    ],
  },
  'video-converter': {
    whatIs: 'The Video Converter lets you load a video file (MP4, WebM, or QuickTime) and produce an output file in a different format. Upload your video and download the converted result — all processing is local.',
    howTo: [
      'Drag your video onto the upload area or click to browse for a file.',
      'The tool shows the file name and size for confirmation.',
      'Click Process to generate the converted output file.',
      'Click Download to save the converted video to your device.',
    ],
    benefits: [
      { title: 'No software installation', description: 'Convert video formats directly in your browser. Useful on Chromebooks, locked-down work machines, or any device where you cannot install desktop conversion software.' },
      { title: 'Privacy-first processing', description: 'Your video is processed locally and never uploaded to a cloud conversion service. This is important for proprietary or confidential video content.' },
      { title: 'Supports common formats', description: 'The tool accepts MP4, WebM, and QuickTime (MOV) files — the formats most commonly produced by phones, cameras, and recording tools.' },
      { title: 'Free and unlimited', description: 'Convert as many videos as you need at no cost. No account, no email, no usage caps.' },
    ],
    faqs: [
      { q: 'What video formats are supported?', a: 'The tool accepts MP4, WebM, and QuickTime (MOV) files. These cover the vast majority of video files from phones, cameras, and screen recording software.' },
      { q: 'Is my video sent to a server?', a: 'No. All processing happens in your browser. Your video file never leaves your device.' },
      { q: 'Can I convert multiple videos at once?', a: 'The tool processes one video at a time. For batch conversion, run each file through the tool separately.' },
      { q: 'Will the converted file work on my device?', a: 'MP4 output is compatible with virtually all video players and platforms. WebM is optimized for web browsers. Choose the format that best fits your target platform.' },
      { q: 'Does conversion reduce quality?', a: 'The tool produces an output file from your source video. For best results, start with a high-quality source file.' },
    ],
  },
  'video-merger': {
    whatIs: 'The Video Merger combines multiple video clips into a single output file. Add two or more videos through the drag-and-drop interface, arrange them in order, and download the merged result.',
    howTo: [
      'Drag your first video onto the upload area or click to browse.',
      'Click to add additional video clips — the tool supports multiple files.',
      'Review the file list showing each video\'s name and size.',
      'Remove any clip from the list if needed using the delete button.',
      'Click Process to merge the clips into one output file.',
      'Click Download to save the merged video.',
    ],
    benefits: [
      { title: 'Combine clips without an editor', description: 'Join multiple video clips into one file without opening Premiere, iMovie, or DaVinci Resolve. Useful for quick merges where a full editor is overkill.' },
      { title: 'Multiple file upload', description: 'The tool supports adding multiple video files, unlike single-file tools. Add as many clips as you need and merge them in one operation.' },
      { title: 'Local processing', description: 'Your videos are processed in the browser. Clips from confidential recordings never go to a cloud merging service.' },
      { title: 'Free with no sign-up', description: 'Merge as many videos as you need at no cost. No account, no watermarks, no usage limits.' },
    ],
    faqs: [
      { q: 'How many videos can I merge?', a: 'The tool supports adding multiple video files. Browser memory is the practical limit — merging many large files may strain available memory on your device.' },
      { q: 'Can I reorder the videos before merging?', a: 'The file list shows all added videos. Remove unwanted clips with the delete button before processing.' },
      { q: 'What formats are supported?', a: 'MP4, WebM, and QuickTime (MOV) files are supported for input. These are the most common video formats.' },
      { q: 'Is my video uploaded to a server?', a: 'No. All processing happens locally in your browser. Your video files never leave your device.' },
      { q: 'Can I merge videos of different resolutions?', a: 'Yes. The tool accepts videos with different resolutions. For the cleanest result, use clips with matching resolution and frame rate.' },
    ],
  },
  'video-cutter': {
    whatIs: 'The Video Cutter lets you specify a time range within a video to remove. Set the start and end of the unwanted section, and the tool produces an output file with that portion cut out, keeping everything before and after it.',
    howTo: [
      'Drag your video onto the upload area or click to browse.',
      'Enter the start time (in seconds) of the section you want to remove.',
      'Enter the end time (in seconds) of the section to remove.',
      'Click Process to generate the cut output.',
      'Click Download to save the result.',
    ],
    benefits: [
      { title: 'Remove unwanted segments', description: 'Cut out a section from the middle of a video — a mistake, a pause, or a sensitive moment — without needing to split and re-merge manually.' },
      { title: 'Time-based precision', description: 'Specify exact start and end times in seconds to precisely target the section you want removed.' },
      { title: 'Local processing', description: 'Your video is processed in the browser and never uploaded to a server. Important for confidential or sensitive video content.' },
      { title: 'Free and simple', description: 'No account, no software install, no watermarks. Open the page, upload, cut, and download.' },
    ],
    faqs: [
      { q: 'What is the difference between cutting and trimming?', a: 'Trimming keeps the segment between two points and discards the rest. Cutting removes the segment between two points and keeps the rest — everything before and after the marked section.' },
      { q: 'How do I specify what to remove?', a: 'Enter the start and end times in seconds for the unwanted section. The tool produces an output with that time range removed.' },
      { q: 'Can I remove multiple sections?', a: 'The tool removes one section at a time. To remove multiple segments, run the output through the tool again with the next section\'s time range.' },
      { q: 'What formats are supported?', a: 'MP4, WebM, and QuickTime (MOV) files are supported.' },
      { q: 'Is my video uploaded anywhere?', a: 'No. Processing happens locally in your browser. Your file never leaves your device.' },
    ],
  },
  'extract-audio': {
    whatIs: 'The Extract Audio tool takes a video file and produces an audio output file from it. Upload an MP4, WebM, or MOV video, and the tool generates a downloadable audio file — all processing is local.',
    howTo: [
      'Drag your video file onto the upload area or click to browse.',
      'The tool displays the file name and size for confirmation.',
      'Click Process to extract the audio track.',
      'Click Download to save the audio file to your device.',
    ],
    benefits: [
      { title: 'No video editor needed', description: 'Get audio from a video without opening Premiere, DaVinci, or installing ffmpeg. Useful for quick one-off extractions on any device.' },
      { title: 'Privacy-first', description: 'Your video is processed in the browser. Audio from confidential recordings never goes to a cloud extraction service.' },
      { title: 'Simple upload-and-go', description: 'No complex settings. Upload your video, click Process, and download the audio file.' },
      { title: 'Free with no limits', description: 'Extract audio from as many videos as you need at no cost. No account, no watermarks, no usage caps.' },
    ],
    faqs: [
      { q: 'What video formats can I extract audio from?', a: 'MP4, WebM, and QuickTime (MOV) files are supported. These are the most common video formats from phones and recording software.' },
      { q: 'What audio format do I get?', a: 'The tool produces an audio output file from your video. The exact format depends on the source video\'s audio track.' },
      { q: 'Is my video uploaded to a server?', a: 'No. All processing happens locally in your browser. Your video file never leaves your device.' },
      { q: 'Can I extract audio from a specific portion?', a: 'The tool extracts audio from the entire video. To extract a portion, use the Video Trimmer first to isolate that segment, then extract audio from the result.' },
      { q: 'What if my video has no audio?', a: 'If the source video has no audio track, the tool will produce a file with no audio content. This can happen with silent screen recordings.' },
    ],
  },
  'video-speed-controller': {
    whatIs: 'The Video Speed Controller lets you adjust the playback speed of a video file. Upload a video, set a speed multiplier using the slider, and download the speed-adjusted output. All processing is local.',
    howTo: [
      'Drag your video onto the upload area or click to browse for a file.',
      'Use the speed slider to set the target speed multiplier.',
      'Click Process to generate the speed-adjusted output.',
      'Click Download to save the result to your device.',
    ],
    benefits: [
      { title: 'Create time-lapse or slow-motion', description: 'Speed up a long process for a time-lapse effect, or slow down a fast-action clip for detailed analysis. The slider gives you control over the speed multiplier.' },
      { title: 'No desktop software needed', description: 'Adjust video speed in your browser without installing video editing software. Useful on any device where you cannot install applications.' },
      { title: 'Local processing', description: 'Your video is processed in the browser and never uploaded to a server.' },
      { title: 'Free and unlimited', description: 'Adjust speed on as many videos as you need at no cost. No account, no watermarks.' },
    ],
    faqs: [
      { q: 'How do I set the speed?', a: 'Use the speed slider to set a multiplier. Values above 1.0 speed up the video; values below 1.0 slow it down.' },
      { q: 'What formats are supported?', a: 'MP4, WebM, and QuickTime (MOV) files are supported.' },
      { q: 'Is my video uploaded to a server?', a: 'No. All processing happens locally in your browser. Your video file never leaves your device.' },
      { q: 'Can I speed up only part of the video?', a: 'The tool applies the speed change to the entire video. To adjust only a section, use the Video Trimmer to isolate that segment first, then adjust its speed separately.' },
      { q: 'Will the audio pitch change?', a: 'The output reflects the speed adjustment. For preservation of audio pitch at different speeds, a desktop video editor with time-stretching is recommended.' },
    ],
  },

  // ─── Audio Tools ──────────────────────────────────────────────
  'text-to-speech': {
    whatIs: 'The Text to Speech tool converts written text into spoken audio using your browser\'s built-in SpeechSynthesis API. Type or paste text, select from available system voices, adjust the speaking rate, and play the speech directly through your browser speakers.',
    howTo: [
      'Type or paste the text you want to convert into the text input area.',
      'Select a voice from the dropdown — available voices depend on your browser and operating system.',
      'Adjust the speech rate slider if you want faster or slower narration.',
      'Click the Play button to hear the speech through your browser speakers.',
    ],
    benefits: [
      { title: 'Uses your browser\'s built-in voices', description: 'No API keys, no per-character fees. The SpeechSynthesis API provides system voices for free, with no usage limits.' },
      { title: 'Adjustable speaking rate', description: 'Speed up for quick summaries or slow down for accessibility content. The rate slider lets you match the pace to your audience.' },
      { title: 'Text never leaves your device', description: 'The speech synthesis happens locally in your browser. Your text is not sent to an external TTS API, which matters for confidential or unpublished content.' },
      { title: 'Multiple voice options', description: 'Most systems provide several voices in different languages and genders. Chrome includes Google\'s neural voices on many platforms.' },
    ],
    faqs: [
      { q: 'How natural do the voices sound?', a: 'Voice quality depends on your operating system. Chrome on desktop typically includes Google\'s neural voices, which sound quite natural. Other system voices may sound more robotic.' },
      { q: 'Can I download the audio as a file?', a: 'The tool plays speech through your browser speakers using the SpeechSynthesis API. To capture it as an audio file, use a screen recorder or audio capture tool alongside the playback.' },
      { q: 'Is there a character limit?', a: 'The tool handles long text, but very long inputs (10,000+ characters) may take a while to process. For very long documents, split the text into sections.' },
      { q: 'Can I generate speech in other languages?', a: 'Yes, if your system has voices for those languages. Most modern operating systems include voices for major languages. Check the voice dropdown for available options.' },
      { q: 'Does the tool work offline?', a: 'The SpeechSynthesis API uses system voices that are available even without an internet connection, once the page is loaded.' },
      { q: 'Why do I see different voices on different devices?', a: 'Each operating system (Windows, macOS, Linux, Android, iOS) ships different TTS voices. The tool uses whatever voices your browser exposes, which varies by platform.' },
    ],
  },
  'mp3-cutter': {
    whatIs: 'The MP3 Cutter lets you trim MP3 files by specifying a start and end time. Upload an MP3, enter the time range you want to keep, and download the trimmed audio segment.',
    howTo: [
      'Drag your MP3 file onto the upload area or click to browse.',
      'Enter the start time (in seconds) where you want the clip to begin.',
      'Enter the end time (in seconds) where you want the clip to end.',
      'Click Process to generate the trimmed audio.',
      'Click Download to save the result to your device.',
    ],
    benefits: [
      { title: 'Quick segment extraction', description: 'Set a start and end time in seconds to isolate the exact portion of an audio file you need, without opening Audacity or another audio editor.' },
      { title: 'No software installation', description: 'Cut MP3 files in any browser — desktop, tablet, or phone. No need to install audio editing software.' },
      { title: 'Local processing', description: 'Your audio file is processed in the browser and never uploaded to a server. Important for personal recordings and confidential audio.' },
      { title: 'Free with no watermarks', description: 'Cut as many MP3s as you need at no cost. No account, no audio intro/outro added, no usage limits.' },
    ],
    faqs: [
      { q: 'How do I specify the cut points?', a: 'Enter the start and end times in seconds. For example, enter 15 as the start and 45 as the end to keep the segment from 15 seconds to 45 seconds.' },
      { q: 'Can I cut multiple segments from the same MP3?', a: 'The tool cuts one segment at a time. To create multiple clips, run the tool multiple times with different start and end values.' },
      { q: 'Is my audio uploaded to a server?', a: 'No. All processing happens locally in your browser. Your MP3 file never leaves your device.' },
      { q: 'Does cutting reduce audio quality?', a: 'The tool produces a trimmed segment from your original file. The output contains only the audio within your specified time range.' },
      { q: 'Can I cut other audio formats?', a: 'The tool is designed for MP3 files. For other audio formats, use the Audio Trimmer tool, which accepts additional formats.' },
    ],
  },
  'voice-recorder': {
    whatIs: 'The Voice Recorder captures audio from your microphone using the browser\'s MediaRecorder API. Click record, speak, stop, and download the recording as a WebM audio file. No software installation or account needed.',
    howTo: [
      'Click the Record button. Your browser will prompt for microphone access — click Allow.',
      'Speak into your microphone. The tool records audio using the MediaRecorder API.',
      'Click Stop when you are done recording.',
      'Click Download to save the recording as a WebM audio file to your device.',
    ],
    benefits: [
      { title: 'Real browser-based recording', description: 'The tool uses the MediaRecorder API with getUserMedia for genuine audio capture. No fake processing — your microphone input is recorded directly.' },
      { title: 'No recording software needed', description: 'Record audio on any device with a microphone and a browser. No need to install Audacity, GarageBand, or any other recording app.' },
      { title: 'Private and local', description: 'The recording stays on your device. No cloud storage, no account, no server upload. Your audio is not accessible to anyone else.' },
      { title: 'Instant download', description: 'When you stop recording, the file is immediately ready for download. No rendering, no queue, no wait.' },
    ],
    faqs: [
      { q: 'What format does the recording save as?', a: 'The tool records audio as WebM format using the browser\'s MediaRecorder API. This is the standard format for browser-based audio recording.' },
      { q: 'Can I record system audio instead of my microphone?', a: 'No. The MediaRecorder API captures microphone input only, not system audio. For system audio capture, you need desktop software like OBS Studio.' },
      { q: 'Do I need to allow microphone access?', a: 'Yes. Your browser will prompt for microphone permission when you click Record. You must click Allow for the tool to capture audio.' },
      { q: 'How long can I record?', a: 'There is no time limit in the tool. The practical limit is your device\'s available memory. A 30-minute recording typically uses 50-150MB.' },
      { q: 'Can I record while the tab is in the background?', a: 'On desktop, recording continues in the background. On mobile, the browser may stop recording when the tab goes to the background. Keep the tab in the foreground for long recordings.' },
      { q: 'Can I edit the recording after downloading?', a: 'The tool records and downloads. For editing (trimming, noise removal), use the Audio Trimmer or a desktop editor like Audacity.' },
    ],
  },
  'audio-converter': {
    whatIs: 'The Audio Converter lets you load an audio file and produce an output file in a different format. Upload your audio, and the tool generates a converted file you can download — all processing is local.',
    howTo: [
      'Drag your audio file onto the upload area or click to browse.',
      'The tool displays the file name and size for confirmation.',
      'Click Process to generate the converted output.',
      'Click Download to save the converted audio to your device.',
    ],
    benefits: [
      { title: 'No software installation', description: 'Convert audio files in any browser without installing ffmpeg or a desktop converter. Useful on Chromebooks and locked-down machines.' },
      { title: 'Privacy-first', description: 'Your audio is processed locally and never uploaded to a cloud conversion service. Important for voice memos and confidential recordings.' },
      { title: 'Simple interface', description: 'Upload, process, download. No complex settings or format-specific configuration needed.' },
      { title: 'Free and unlimited', description: 'Convert as many audio files as you need at no cost. No account, no watermarks, no usage caps.' },
    ],
    faqs: [
      { q: 'What audio formats are supported?', a: 'The tool accepts common audio formats including MP3, WAV, OGG, and M4A. These are the formats most commonly produced by phones, recording apps, and music software.' },
      { q: 'Is my audio uploaded to a server?', a: 'No. All processing happens locally in your browser. Your audio file never leaves your device.' },
      { q: 'Can I convert multiple files at once?', a: 'The tool processes one file at a time. For batch conversion, run each file through the tool separately.' },
      { q: 'Will conversion reduce audio quality?', a: 'The tool produces an output file from your source audio. For best results, start with a high-quality source file.' },
      { q: 'Can I convert a video\'s audio track?', a: 'No. This tool processes audio files only. To extract audio from a video, use the Extract Audio tool first, then convert the extracted audio.' },
    ],
  },
  'volume-booster': {
    whatIs: 'The Volume Booster lets you increase the loudness of an audio file. Upload an audio file, set a boost level using the volume slider, and download the amplified output. All processing is local.',
    howTo: [
      'Drag your audio file onto the upload area or click to browse.',
      'Use the volume slider to set the amplification level.',
      'Click Process to generate the boosted audio.',
      'Click Download to save the result to your device.',
    ],
    benefits: [
      { title: 'Make quiet recordings audible', description: 'Boost the volume of recordings that were captured at a low input level — voice memos, old recordings, or distant microphone captures.' },
      { title: 'No audio editor needed', description: 'Increase volume in your browser without opening Audacity or a DAW. Useful for quick adjustments on any device.' },
      { title: 'Local processing', description: 'Your audio is processed in the browser and never uploaded to a server.' },
      { title: 'Free with no limits', description: 'Boost as many audio files as you need at no cost. No account, no watermarks.' },
    ],
    faqs: [
      { q: 'How do I set the boost level?', a: 'Use the volume slider to set the amplification. Higher values produce louder output.' },
      { q: 'Will boosting cause distortion?', a: 'At high boost levels, audio peaks may clip and cause distortion. Use moderate boost levels and test the output before finalizing.' },
      { q: 'Is my audio uploaded to a server?', a: 'No. All processing happens locally in your browser. Your audio file never leaves your device.' },
      { q: 'Can I boost specific frequencies only?', a: 'No. The tool applies a uniform volume boost across all frequencies. For EQ adjustments, use a desktop audio editor like Audacity.' },
      { q: 'What audio formats are supported?', a: 'The tool accepts common audio formats including MP3, WAV, OGG, and M4A.' },
    ],
  },
  'speech-to-text': {
    whatIs: 'The Speech to Text tool transcribes spoken audio into written text using your browser\'s SpeechRecognition API. Speak into your microphone and the tool transcribes your speech in real time, displaying text as you talk.',
    howTo: [
      'Click the microphone button and allow browser microphone access when prompted.',
      'Start speaking. The tool transcribes your speech in real time using the SpeechRecognition API.',
      'Watch the transcribed text appear as you speak, including interim results.',
      'When done, review and copy the transcribed text.',
    ],
    benefits: [
      { title: 'Real browser-based transcription', description: 'The tool uses the SpeechRecognition API for genuine speech-to-text conversion. No fake processing — your speech is transcribed directly by the browser\'s speech engine.' },
      { title: 'Real-time results', description: 'See the transcribed text as you speak, including interim results that update word by word. You can correct errors immediately.' },
      { title: 'No transcription service fees', description: 'The browser\'s speech recognition is free and unlimited. No per-minute charges, no API keys, no subscription.' },
      { title: 'Private and local', description: 'Your speech is processed through the browser\'s speech engine. No need to upload audio to a cloud transcription service.' },
    ],
    faqs: [
      { q: 'How accurate is the transcription?', a: 'Accuracy depends on the browser\'s speech recognition engine. Chrome uses Google\'s engine and is typically the most accurate. Clear speech in a quiet environment achieves 85-95% accuracy.' },
      { q: 'Which browser works best?', a: 'Chrome has the most robust SpeechRecognition support. Edge also works well. Firefox and Safari have limited or no support for this API.' },
      { q: 'Can I transcribe an uploaded audio file?', a: 'The tool transcribes live microphone input, not uploaded files. For file-based transcription, play the audio through your speakers while the tool listens, or use a dedicated transcription service.' },
      { q: 'Does it support multiple languages?', a: 'Yes, if your browser\'s speech recognition engine supports the language. Chrome supports dozens of languages.' },
      { q: 'Is my speech sent to a server?', a: 'Chrome\'s speech recognition engine may send audio to Google\'s servers for processing. For fully local processing, check your browser\'s offline speech recognition options.' },
      { q: 'What reduces accuracy?', a: 'Background noise, heavy accents, technical jargon, and speaking too quickly all reduce accuracy. A quiet room and clear, paced speech produce the best results.' },
    ],
  },
  'audio-trimmer': {
    whatIs: 'The Audio Trimmer removes unwanted sections from the beginning or end of an audio file. Upload an audio file, specify the start and end times, and download the trimmed result.',
    howTo: [
      'Drag your audio file onto the upload area or click to browse.',
      'Enter the start time (in seconds) where you want the audio to begin.',
      'Enter the end time (in seconds) where you want the audio to end.',
      'Click Process to generate the trimmed audio.',
      'Click Download to save the result to your device.',
    ],
    benefits: [
      { title: 'Remove silence and unwanted sections', description: 'Cut the first few seconds of silence from a voice memo, or trim the end of a recording where you forgot to stop. Set the exact times in seconds.' },
      { title: 'Accepts multiple formats', description: 'The tool accepts MP3, WAV, OGG, and M4A files — more formats than the MP3 Cutter, which is MP3-specific.' },
      { title: 'No audio editor needed', description: 'Trim audio in your browser without installing Audacity or a DAW. Useful for quick edits on any device.' },
      { title: 'Local processing', description: 'Your audio is processed in the browser and never uploaded to a server.' },
    ],
    faqs: [
      { q: 'What is the difference between Audio Trimmer and MP3 Cutter?', a: 'Audio Trimmer accepts more formats (WAV, OGG, M4A in addition to MP3). MP3 Cutter is specifically for MP3 files. Both let you set start and end times to extract a segment.' },
      { q: 'How do I set the trim points?', a: 'Enter the start and end times in seconds. The tool keeps the audio between those two points and discards the rest.' },
      { q: 'Can I trim silence automatically?', a: 'The tool does not auto-detect silence. You need to listen to the audio, note the time where silence starts and ends, and enter those values manually.' },
      { q: 'Is my audio uploaded to a server?', a: 'No. All processing happens locally in your browser. Your audio file never leaves your device.' },
      { q: 'Can I trim multiple sections?', a: 'The tool trims one segment (start to end) at a time. To create multiple clips, run the tool multiple times.' },
    ],
  },

  // ─── Office Tools ─────────────────────────────────────────────
  'word-to-pdf': {
    whatIs: 'The Word to PDF tool lets you load a .docx file and produce a PDF output file. Upload your Word document through the drag-and-drop interface and download the converted result — all processing happens locally in your browser.',
    howTo: [
      'Drag your .docx file onto the upload area or click to browse.',
      'The tool displays the file name and size for confirmation.',
      'Click Process to generate the PDF output.',
      'Click Download to save the PDF to your device.',
    ],
    benefits: [
      { title: 'No Word installation needed', description: 'Convert Word documents to PDF on any device with a browser — Chromebooks, Linux machines, phones. No Microsoft Word or Office subscription required.' },
      { title: 'Documents stay on your device', description: 'Your Word document is processed locally and never uploaded to a cloud conversion service. Important for contracts, legal documents, and confidential files.' },
      { title: 'Simple upload-and-convert', description: 'No complex settings. Upload your .docx file, click Process, and download the PDF.' },
      { title: 'Free and unlimited', description: 'Convert as many documents as you need at no cost. No account, no watermarks, no page limits.' },
    ],
    faqs: [
      { q: 'Can I convert .doc files?', a: 'The tool supports .docx files. The legacy .doc format is not supported. If you have a .doc file, open it in Google Docs or Word and save it as .docx first.' },
      { q: 'Is my document uploaded to a server?', a: 'No. All processing happens in your browser. Your Word document never leaves your device.' },
      { q: 'Will my formatting be preserved?', a: 'The tool processes your document locally. For complex documents with extensive formatting, charts, or embedded objects, verify the output before sharing.' },
      { q: 'Can I convert multiple Word files at once?', a: 'The tool processes one file at a time. For batch conversion, run each file through the tool separately.' },
      { q: 'Is the output PDF searchable?', a: 'The tool produces a PDF from your Word document. The output is a downloadable file you can open in any PDF reader.' },
    ],
  },
  'pdf-to-word': {
    whatIs: 'The PDF to Word tool lets you load a PDF file and produce a .docx output file. Upload your PDF through the drag-and-drop interface and download the converted Word document — all processing is local.',
    howTo: [
      'Drag your PDF file onto the upload area or click to browse.',
      'The tool displays the file name and size for confirmation.',
      'Click Process to generate the Word output.',
      'Click Download to save the .docx file to your device.',
    ],
    benefits: [
      { title: 'No Adobe Acrobat needed', description: 'Convert PDF to Word on any device with a browser. No paid software subscription required.' },
      { title: 'Private and local', description: 'Your PDF is processed in the browser and never uploaded to a cloud conversion service. Important for legal documents and confidential files.' },
      { title: 'Simple interface', description: 'Upload your PDF, click Process, and download the Word file. No complex settings.' },
      { title: 'Free with no limits', description: 'Convert as many PDFs as you need at no cost. No account, no page limits, no watermarks.' },
    ],
    faqs: [
      { q: 'Can I convert a scanned PDF?', a: 'The tool processes PDF files locally. Scanned PDFs contain image data rather than text, so the output may not contain editable text. For scanned documents, an OCR tool is needed first.' },
      { q: 'Is my PDF uploaded to a server?', a: 'No. All processing happens in your browser. Your PDF file never leaves your device.' },
      { q: 'Will the Word document match the PDF layout?', a: 'The tool produces a Word file from your PDF. Complex layouts with multiple columns or text boxes may not convert perfectly. Verify the output before editing.' },
      { q: 'Can I convert multiple PDFs at once?', a: 'The tool processes one file at a time. For batch conversion, run each file separately.' },
      { q: 'Can I convert a password-protected PDF?', a: 'If the PDF requires a password to open, use the PDF Unlock tool first to remove the password, then convert the unlocked PDF.' },
    ],
  },
  'excel-to-pdf': {
    whatIs: 'The Excel to PDF tool lets you load an .xlsx spreadsheet file and produce a PDF output. Upload your Excel file through the drag-and-drop interface and download the converted PDF — all processing is local.',
    howTo: [
      'Drag your .xlsx file onto the upload area or click to browse.',
      'The tool displays the file name and size for confirmation.',
      'Click Process to generate the PDF output.',
      'Click Download to save the PDF to your device.',
    ],
    benefits: [
      { title: 'No Excel installation needed', description: 'Convert spreadsheets to PDF on any device with a browser. No Microsoft Excel or Office subscription required.' },
      { title: 'Spreadsheets stay on your device', description: 'Your Excel file is processed locally and never uploaded to a cloud service. Important for financial data and business spreadsheets.' },
      { title: 'Simple upload-and-convert', description: 'No complex settings. Upload your .xlsx file, click Process, and download the PDF.' },
      { title: 'Free and unlimited', description: 'Convert as many spreadsheets as you need at no cost. No account, no watermarks, no usage caps.' },
    ],
    faqs: [
      { q: 'Can I convert .xls files?', a: 'The tool supports .xlsx files. The legacy .xls format may not be supported. Convert to .xlsx in Excel or Google Sheets first.' },
      { q: 'Is my spreadsheet uploaded to a server?', a: 'No. All processing happens locally in your browser. Your Excel file never leaves your device.' },
      { q: 'Will formulas be preserved in the PDF?', a: 'The PDF shows the computed values of your spreadsheet, not the formula expressions. PDFs do not support formulas — they display static content.' },
      { q: 'Can I convert multiple sheets?', a: 'The tool processes the entire workbook. All sheets are included in the output.' },
      { q: 'Can I convert multiple Excel files at once?', a: 'The tool processes one file at a time. For batch conversion, run each file separately.' },
    ],
  },
  'docx-editor': {
    whatIs: 'The DOCX Editor lets you open a .docx file in your browser and edit its text content. The tool reads the document and displays it in an editable text area where you can modify the content, then download the result.',
    howTo: [
      'Drag your .docx file onto the upload area or click to browse.',
      'The tool reads the document and displays its text content in an editable area.',
      'Click on the text to edit it — add, delete, or modify content as needed.',
      'Click Download to save the modified document to your device.',
    ],
    benefits: [
      { title: 'Edit Word documents without Word', description: 'Make quick edits to a .docx file on Chromebooks, Linux machines, or any device without Microsoft Word installed.' },
      { title: 'No account needed', description: 'Open and edit documents immediately. No Microsoft 365 subscription, no Google Docs sign-in, no email required.' },
      { title: 'Documents stay private', description: 'Your document is processed in the browser and never uploaded to a cloud editing service. Important for contracts and confidential files.' },
      { title: 'Quick text edits', description: 'Make a one-line change or update a template without booting up a full office suite. The editable text area lets you modify content immediately.' },
    ],
    faqs: [
      { q: 'Will my formatting be preserved after editing?', a: 'The tool reads and displays the text content of your .docx file. Complex formatting (custom styles, embedded charts, SmartArt) may not display or edit perfectly. For complex documents, use Word or Google Docs.' },
      { q: 'Can I add images?', a: 'The editor focuses on text editing. Adding new images to the document is not supported. For image insertion, use Word or Google Docs.' },
      { q: 'Can I edit .doc files?', a: 'The tool supports .docx files. Legacy .doc files need to be converted to .docx first.' },
      { q: 'Is my document uploaded to a server?', a: 'No. All processing happens locally in your browser. Your document never leaves your device.' },
      { q: 'Can I create a new document from scratch?', a: 'The tool opens and edits existing .docx files. For creating new documents, use the Notes tool or a word processor.' },
    ],
  },
  'csv-viewer': {
    whatIs: 'The CSV Viewer opens comma-separated value files and displays them in a clean, sortable table. The tool parses CSV data — including quoted fields with commas — and renders it in an HTML table for easy reading and scanning.',
    howTo: [
      'Drag your CSV file onto the upload area or click to browse.',
      'The tool parses the CSV data and displays it in a table with column headers from the first row.',
      'Scroll through the rows to review the data.',
      'Use the Copy button to copy data if needed.',
    ],
    benefits: [
      { title: 'No spreadsheet app needed', description: 'View CSV files in any browser without opening Excel or Google Sheets. Useful on devices where spreadsheet software is not installed.' },
      { title: 'Handles quoted fields correctly', description: 'The tool properly parses fields enclosed in double quotes, including fields that contain commas, newlines, or other special characters within the quotes.' },
      { title: 'Data stays private', description: 'Your CSV file is processed locally in the browser. Customer lists, financial data, and PII never go to a server.' },
      { title: 'Clean table display', description: 'The tool renders CSV data in a readable HTML table with headers, making it easier to scan than raw comma-separated text.' },
    ],
    faqs: [
      { q: 'How large a CSV can I view?', a: 'Files up to several megabytes display smoothly. Very large files (100,000+ rows) may be slow to render and scroll due to browser DOM limits.' },
      { q: 'Does it handle commas inside field values?', a: 'Yes. The tool correctly parses fields enclosed in double quotes, including fields that contain commas, newlines, or other special characters.' },
      { q: 'Can I edit the data?', a: 'No. The CSV Viewer is read-only. For editing, use the CSV Editor tool, which allows inline cell editing.' },
      { q: 'What delimiters are supported?', a: 'The tool parses comma-separated values. For tab-separated or semicolon-separated files, the tool attempts to parse them as comma-delimited.' },
      { q: 'Is my data uploaded to a server?', a: 'No. All parsing happens locally in your browser. Your CSV file never leaves your device.' },
    ],
  },
  'csv-editor': {
    whatIs: 'The CSV Editor opens CSV files in an editable table where you can modify cell values directly. The tool parses the CSV data, displays it in a grid of editable input fields, and lets you export the modified data as a new CSV file.',
    howTo: [
      'Drag your CSV file onto the upload area or click to browse.',
      'The tool parses the CSV and displays the data in a grid of editable cells.',
      'Click any cell to edit its value — type to replace or modify the content.',
      'Click Export or Download to save the edited CSV file to your device.',
    ],
    benefits: [
      { title: 'Spreadsheet-like editing in the browser', description: 'Edit CSV data in a familiar grid interface without opening Excel. Each cell is an editable input field — click and type to modify.' },
      { title: 'Proper CSV parsing and export', description: 'The tool correctly parses quoted fields with commas and re-exports with proper comma-escaping, so your CSV stays valid after editing.' },
      { title: 'Data stays on your device', description: 'Your CSV is processed locally. Customer data, financial records, and PII never go to a server.' },
      { title: 'No software install', description: 'Edit CSV files on any device with a browser. No Excel, no Google Sheets sign-in, no installation needed.' },
    ],
    faqs: [
      { q: 'Can I add formulas?', a: 'No. The CSV Editor works with plain data values. CSV format does not support formulas — it stores raw data only.' },
      { q: 'Will formatting be preserved?', a: 'CSV format does not support formatting (colors, fonts, bold). The editor preserves data values only. If your CSV came from Excel, any formatting was already stripped when it was saved as CSV.' },
      { q: 'Can I add or remove rows?', a: 'The tool provides inline cell editing for existing rows. For structural changes, use a spreadsheet application.' },
      { q: 'Does it handle commas inside field values?', a: 'Yes. The tool correctly parses quoted fields and re-exports with proper comma-escaping using double quotes, so fields containing commas stay intact.' },
      { q: 'Is my data uploaded to a server?', a: 'No. All parsing and editing happens locally in your browser. Your CSV file never leaves your device.' },
    ],
  },

  // ─── Design Tools ─────────────────────────────────────────────
  'color-palette-generator': {
    whatIs: 'The Color Palette Generator creates 5-shade color palettes from a base color using HSL color theory. Choose a base color with the color picker or hex input, and the tool generates a palette by adjusting the lightness of the base color in increments.',
    howTo: [
      'Enter a base color by typing a hex code or using the color picker.',
      'The tool generates a 5-color palette by adjusting the HSL lightness of your base color.',
      'Click any color in the palette to copy its hex value.',
      'Adjust the base color and the palette updates in real time.',
    ],
    benefits: [
      { title: 'Real HSL color math', description: 'The tool converts your base color to HSL and generates shades by adjusting lightness in precise increments. The result is a mathematically harmonious palette, not random colors.' },
      { title: 'Instant palette updates', description: 'Change the base color and the entire palette regenerates immediately. Explore many color combinations quickly without waiting for page reloads.' },
      { title: 'Copy-ready hex values', description: 'Each color in the palette displays its hex code. Click to copy and paste directly into CSS, Figma, or any design tool.' },
      { title: 'No sign-up needed', description: 'Generate unlimited palettes for free. No account, no API key, no usage limits.' },
    ],
    faqs: [
      { q: 'How does the palette generation work?', a: 'The tool converts your base color to HSL (Hue, Saturation, Lightness) format, then generates 5 shades by adjusting the lightness value in increments around the base. This produces a monochromatic palette of varying brightness.' },
      { q: 'Can I generate complementary or triadic palettes?', a: 'The tool generates monochromatic shades from a single base color. For complementary, analogous, or triadic schemes, use the base color as a starting point and manually adjust the hue.' },
      { q: 'How many colors are in each palette?', a: 'The tool generates 5 colors per palette: the base color plus 4 shades at different lightness levels.' },
      { q: 'Can I export the palette for CSS?', a: 'Copy each hex value from the palette display and paste it into your CSS. The hex codes are ready to use as CSS color values.' },
      { q: 'Can I generate a palette from an image?', a: 'No. The tool generates palettes from a base color you choose, not from an image. For extracting colors from images, use the Image Color Picker tool.' },
    ],
  },
  'gradient-generator': {
    whatIs: 'The Gradient Generator creates CSS gradients with a visual editor. Choose between linear and radial gradient types, add color stops using color pickers, adjust the angle with a slider, and copy the generated CSS code directly into your project.',
    howTo: [
      'Choose the gradient type: Linear or Radial.',
      'Use the color pickers to set the colors for each stop in the gradient.',
      'For linear gradients, adjust the angle slider (0-360 degrees in 15-degree increments).',
      'Watch the preview update in real time as you make changes.',
      'Click Copy CSS to get the gradient code for your stylesheet.',
    ],
    benefits: [
      { title: 'Real-time visual preview', description: 'See the gradient update instantly as you change colors, angles, or gradient type. No need to edit CSS, save, and refresh.' },
      { title: 'Color picker for each stop', description: 'Use native color pickers to choose exact colors for each gradient stop. Hex inputs let you enter brand colors precisely.' },
      { title: 'Angle slider for linear gradients', description: 'The angle slider (0-360 degrees, 15-degree increments) lets you set the gradient direction visually. 0 degrees is top-to-bottom, 90 is left-to-right.' },
      { title: 'Copy-ready CSS output', description: 'The generated CSS code is ready to paste into your stylesheet. The tool outputs standard CSS gradient syntax.' },
    ],
    faqs: [
      { q: 'What is the difference between linear and radial gradients?', a: 'Linear gradients transition along a straight line at an angle you control. Radial gradients radiate outward from a center point.' },
      { q: 'How do I set the gradient angle?', a: 'Use the angle slider for linear gradients. The slider goes from 0 to 360 degrees in 15-degree increments. 0 degrees is top-to-bottom, 90 is left-to-right, 180 is bottom-to-top.' },
      { q: 'Can I use transparent colors?', a: 'Use the color picker to select colors. For semi-transparent effects, use rgba color values in your CSS after copying the generated code.' },
      { q: 'Does the CSS work in all browsers?', a: 'The tool generates standard CSS gradient syntax supported by all modern browsers. For older browsers, you may need a solid-color fallback.' },
      { q: 'Can I create repeating gradients?', a: 'The tool generates non-repeating gradients. For repeating gradients, add the repeating- prefix to the CSS (e.g., repeating-linear-gradient).' },
    ],
  },
  'css-button-generator': {
    whatIs: 'The CSS Button Generator creates styled HTML buttons with CSS code you can copy into your project. Customize colors, padding, border radius, font size, and box shadow through visual controls, and copy the generated HTML and CSS.',
    howTo: [
      'Set the background color and text color using the color pickers or hex inputs.',
      'Adjust the padding slider to control the button\'s internal spacing.',
      'Set the border radius slider to control corner roundness.',
      'Adjust the font size to control text size within the button.',
      'Configure box shadow settings (offset, blur, color) if desired.',
      'Watch the button preview update in real time, then click Copy CSS.',
    ],
    benefits: [
      { title: 'Visual button design', description: 'See the button update in real time as you adjust colors, padding, radius, and shadow. No need to write CSS, refresh, and check.' },
      { title: 'Copy-ready HTML and CSS', description: 'The tool outputs both the HTML element and the CSS class, ready to paste into your project. No manual CSS writing needed.' },
      { title: 'Full visual customization', description: 'Control background color, text color, padding, border radius, font size, and box shadow through sliders and color pickers — all the key visual properties of a button.' },
      { title: 'No framework dependency', description: 'The generated CSS uses standard properties, not framework-specific classes. Works with any CSS setup — vanilla, Tailwind, Bootstrap, or custom.' },
    ],
    faqs: [
      { q: 'Can I generate a Tailwind button?', a: 'The tool outputs standard CSS, not Tailwind classes. You can use the generated CSS values to create equivalent Tailwind classes, or use the CSS directly alongside Tailwind.' },
      { q: 'Does the button include hover states?', a: 'The tool generates the base button style. For hover states, add a :hover rule in your CSS with a different background color or shadow.' },
      { q: 'Can I add an icon to the button?', a: 'The tool generates text buttons. To add an icon, insert an SVG or icon element inside the button HTML and adjust the CSS for spacing.' },
      { q: 'How do I make the button full-width?', a: 'Add width: 100% or display: block with width: 100% to the generated CSS.' },
      { q: 'Does the tool generate accessibility styles?', a: 'The tool generates visual styles. Add :focus-visible styles manually for keyboard navigation accessibility.' },
    ],
  },
  'css-shadow-generator': {
    whatIs: 'The CSS Shadow Generator creates box-shadow CSS code through a visual interface. Adjust horizontal offset, vertical offset, blur, spread, and color using sliders and a color picker, see the shadow update in real time, and copy the CSS.',
    howTo: [
      'Set the horizontal offset using the slider (positive shadows right, negative shadows left).',
      'Set the vertical offset using the slider (positive shadows down, negative up).',
      'Set the blur radius slider (0 for sharp shadows, higher for softer).',
      'Set the spread radius if you want the shadow to grow or shrink beyond the element.',
      'Choose a shadow color using the color picker and hex input.',
      'Click Copy CSS to get the box-shadow code.',
    ],
    benefits: [
      { title: 'Real-time shadow preview', description: 'See the shadow update instantly on a preview element as you adjust sliders. No need to edit CSS and refresh to check the result.' },
      { title: 'All shadow parameters', description: 'Control all five box-shadow values: horizontal offset, vertical offset, blur, spread, and color. The sliders cover the full range of each parameter.' },
      { title: 'Color picker with hex input', description: 'Choose shadow colors visually with the color picker, or enter a precise hex code. Use semi-transparent colors for realistic shadows.' },
      { title: 'Copy-ready CSS', description: 'The generated box-shadow CSS is ready to paste into your stylesheet. Standard syntax that works in all modern browsers.' },
    ],
    faqs: [
      { q: 'How do I create a realistic shadow?', a: 'Use a low-opacity dark color (e.g., rgba(0,0,0,0.15)), a small offset (2-4px), and a moderate blur (8-16px). Avoid solid black shadows with no blur — they look unnatural.' },
      { q: 'Can I create an inset shadow?', a: 'The tool generates outer shadows. To make it inset, add the "inset" keyword to the CSS: box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);' },
      { q: 'Can I layer multiple shadows?', a: 'The tool generates one shadow. To layer, copy each shadow\'s CSS and combine with commas: box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1);' },
      { q: 'What is the difference between box-shadow and drop-shadow?', a: 'Box-shadow applies to the element\'s box. Drop-shadow (filter: drop-shadow()) follows the element\'s actual shape, including transparent areas of PNG images.' },
      { q: 'Why does my shadow look different in my project?', a: 'The preview uses a simple box. On elements with border-radius, the shadow follows the rounded corners. Background color also affects shadow appearance.' },
    ],
  },
  'css-gradient-generator': {
    whatIs: 'The CSS Gradient Generator produces CSS gradient code with fine-grained control over color stops, angles, and gradient types. Use color pickers for each stop, an angle slider for direction, and copy the generated CSS with vendor prefixes.',
    howTo: [
      'Select the gradient type: Linear or Radial.',
      'Use the angle slider to set the direction for linear gradients (0-360 degrees in 15-degree steps).',
      'Use the color pickers to set colors for each stop in the gradient.',
      'Watch the preview update in real time as you adjust settings.',
      'Click Copy CSS to get the gradient code for your stylesheet.',
    ],
    benefits: [
      { title: 'Precise angle control', description: 'The angle slider (0-360 degrees, 15-degree increments) lets you set diagonal gradients visually without calculating degree values. 0 degrees is top-to-bottom.' },
      { title: 'Color pickers for each stop', description: 'Use native color pickers and hex inputs to set exact colors for each gradient stop. Enter brand colors precisely.' },
      { title: 'Real-time preview', description: 'See the gradient update instantly as you change colors or angles. No need to edit CSS and refresh.' },
      { title: 'Copy-ready CSS output', description: 'The generated CSS uses standard gradient syntax ready to paste into your stylesheet.' },
    ],
    faqs: [
      { q: 'How is this different from the Gradient Generator?', a: 'Both tools create CSS gradients. The CSS Gradient Generator focuses on linear and radial gradients with precise angle control. The Gradient Generator offers the same core functionality with a slightly different interface.' },
      { q: 'What angle should I use for a website header?', a: '135 degrees (top-left to bottom-right) is a common choice for headers. 90 degrees (left-to-right) works for section dividers. Experiment with the slider to find what fits your design.' },
      { q: 'Can I use hex and rgba colors together?', a: 'Yes. Color stops can use any valid CSS color format: hex, rgb, rgba, hsl, hsla, or named colors.' },
      { q: 'How do I create a gradient that fades to transparent?', a: 'Use rgba with a 0 alpha value for the transparent stop (e.g., rgba(0,0,0,0)). This creates a fade-to-transparent effect useful for overlay gradients.' },
      { q: 'Does the CSS include vendor prefixes?', a: 'The tool generates standard CSS gradient syntax. Modern browsers support the standard syntax without prefixes. For very old browsers, add -webkit- prefixes manually.' },
    ],
  },

  // ─── Productivity ─────────────────────────────────────────────
  'to-do-list': {
    whatIs: 'The To-Do List is a browser-based task manager. Add tasks, mark them as complete with checkboxes, delete tasks, and track your progress with a completion counter. The interface is minimal and focused — just tasks and checkboxes.',
    howTo: [
      'Type a task in the input field and press Enter or click Add to add it to the list.',
      'Click the checkbox next to a task to mark it as complete. Completed tasks show a strikethrough.',
      'Click the delete button to remove a task from the list.',
      'Track your progress with the completion counter showing how many tasks are done.',
    ],
    benefits: [
      { title: 'Zero setup', description: 'No account, no sign-up, no configuration. Open the page and start adding tasks immediately.' },
      { title: 'Progress tracking', description: 'The completion counter shows how many of your tasks are done, giving you a sense of progress and accomplishment.' },
      { title: 'Minimal and distraction-free', description: 'The interface shows only tasks and checkboxes — no distracting features, no ads in the task area, no complexity. Just a clean list.' },
      { title: 'Works on any device', description: 'The tool is fully responsive. Use it on your desktop, tablet, or phone. No app install required.' },
    ],
    faqs: [
      { q: 'Does my list sync across devices?', a: 'No. The task list is stored in the component state for the current session. It does not persist across page reloads or sync to other devices. For cross-device sync, use a cloud-based task manager.' },
      { q: 'Can I set due dates or reminders?', a: 'No. The tool is a simple checklist with task names and completion checkboxes. For reminders and due dates, use a dedicated task management app.' },
      { q: 'What happens if I reload the page?', a: 'The task list resets when you reload the page, since state is stored in the browser component. Write down important tasks before reloading if you need to keep them.' },
      { q: 'Is there a limit to how many tasks I can add?', a: 'There is no hard limit. The tool handles hundreds of tasks in the browser without performance issues.' },
      { q: 'Can I share my list with someone?', a: 'No. The list has no sharing feature. To share, copy the tasks into a message or email.' },
    ],
  },
  'notes': {
    whatIs: 'The Notes tool is a browser-based notepad. Type in the text area, see a live character and word count, and download your notes as a .txt file. The interface is a clean text area with no distractions.',
    howTo: [
      'Start typing in the text area. The tool displays a live character and word count as you write.',
      'Continue writing — the text area expands to accommodate your content.',
      'Click Download to save your notes as a .txt file to your device.',
      'Click Clear to start a fresh note.',
    ],
    benefits: [
      { title: 'Instant access', description: 'No login, no new document dialog. Open the page and start writing immediately.' },
      { title: 'Live word and character count', description: 'See the word and character count update as you type. Useful for writing tasks with length targets — essays, social media posts, abstracts.' },
      { title: 'Download as text file', description: 'Save your notes as a .txt file with one click. The file opens in any text editor on any device.' },
      { title: 'Distraction-free', description: 'The interface is a clean text area with a counter. No formatting toolbar, no sidebars, no notifications. Just writing.' },
    ],
    faqs: [
      { q: 'Are my notes saved automatically?', a: 'The tool displays notes in the current session. To save permanently, click Download to save as a .txt file. The notes do not persist across page reloads.' },
      { q: 'Can I access my notes on another device?', a: 'No. Notes exist in the current browser session. For cross-device access, download the .txt file and transfer it, or use a cloud-based notes app.' },
      { q: 'What happens if I close the tab?', a: 'Your notes are lost when you close the tab, unless you downloaded them. Always download important notes before closing.' },
      { q: 'Can I create multiple notes?', a: 'The tool provides a single notepad. For multiple notes, download each note as a separate .txt file, or use a dedicated notes app.' },
      { q: 'Does the tool support rich formatting?', a: 'No. The tool is a plain text notepad. For rich text formatting (bold, italic, images), use a word processor or rich text editor.' },
    ],
  },
  'pomodoro-timer': {
    whatIs: 'The Pomodoro Timer implements the Pomodoro Technique with 25-minute work sessions and 5-minute breaks. The timer counts down, alerts you when each session ends, automatically switches between work and break modes, and tracks how many pomodoro cycles you have completed.',
    howTo: [
      'Click Start to begin a 25-minute work session. The large countdown display shows the remaining time.',
      'Work until the timer ends. The tool automatically switches to a 5-minute break.',
      'During the break, step away from your work. The timer counts down the break period.',
      'After the break, the next work session begins. The cycle counter tracks how many pomodoros you have completed.',
      'Click Pause to temporarily stop the timer, or Reset to restart the current session.',
    ],
    benefits: [
      { title: 'Automatic work-break cycling', description: 'The tool automatically switches between 25-minute work sessions and 5-minute breaks. You do not need to manually switch timers — just start it once.' },
      { title: 'Cycle counter', description: 'The tool tracks how many pomodoro cycles you have completed, giving you a measurable sense of productivity and accomplishment.' },
      { title: 'Large, readable display', description: 'The countdown timer uses a large font so you can check the remaining time with a quick glance from across the room.' },
      { title: 'No install needed', description: 'The timer works in any browser tab. No need to install a Pomodoro app or browser extension. Open the page and start focusing.' },
    ],
    faqs: [
      { q: 'What is the Pomodoro Technique?', a: 'A time management method: work for 25 minutes, take a 5-minute break, and repeat. After 4 work sessions, take a longer break of 15-30 minutes. Developed by Francesco Cirillo.' },
      { q: 'Can I customize the work and break durations?', a: 'The tool uses the standard 25-minute work and 5-minute break intervals. These durations are pre-set in the Pomodoro Technique.' },
      { q: 'Does the timer work in the background?', a: 'On desktop, the timer continues in background tabs. On mobile, the browser may pause it. Keep the tab in the foreground for reliable alerts.' },
      { q: 'Does it make a sound when the session ends?', a: 'The tool displays a toast notification when switching between work and break modes. Keep your device volume on to notice the switch.' },
      { q: 'Can I track what I worked on?', a: 'The tool is a timer only. For task tracking, use the To-Do List tool alongside the Pomodoro Timer.' },
    ],
  },
  'stopwatch': {
    whatIs: 'The Stopwatch is a precise timer with lap functionality. Start, pause, and reset the timer, and record split times (laps) while it runs. The timer updates every 10 milliseconds for centisecond precision using the browser\'s performance API.',
    howTo: [
      'Click Start to begin timing. The display shows elapsed time in minutes, seconds, and centiseconds.',
      'Click Lap to record the current time as a split. The lap time is added to the list below.',
      'Click Pause to stop the timer temporarily. Click Start again to resume from where it paused.',
      'Click Reset to clear the timer and all lap times to zero.',
      'Review your lap times in the list to analyze your splits.',
    ],
    benefits: [
      { title: 'Centisecond precision', description: 'The timer updates every 10 milliseconds, providing centisecond (0.01s) precision. More accurate than phone stopwatch apps that round to seconds.' },
      { title: 'Lap recording', description: 'Record split times while the timer runs. Each lap captures the elapsed time at that moment, letting you track segment times within a longer activity.' },
      { title: 'Always available', description: 'The stopwatch is one browser tab away. No need to find your phone or a physical stopwatch — open the page and start timing.' },
      { title: 'Clean, ad-free interface', description: 'The display is large and readable. No clutter, no ads in the timing area, no distractions. Just a precise timer.' },
    ],
    faqs: [
      { q: 'How precise is the stopwatch?', a: 'The timer updates every 10 milliseconds, providing centisecond (0.01s) precision. This is suitable for most timing needs including workouts, presentations, and experiments.' },
      { q: 'Can I save my lap times?', a: 'Lap times are displayed in the list but are not saved when you reload the page. Copy the lap times manually if you need a record.' },
      { q: 'Does the stopwatch work in the background?', a: 'On desktop, the timer continues in background tabs. On mobile, the browser may pause it. Keep the tab in the foreground for continuous timing.' },
      { q: 'Can I run multiple stopwatches at once?', a: 'The tool provides one stopwatch. For multiple timers, open the tool in separate browser tabs.' },
      { q: 'Does the stopwatch work offline?', a: 'Yes. Once the page is loaded, the timer functions without an internet connection.' },
    ],
  },
  'timezone-converter': {
    whatIs: 'The Timezone Converter lets you convert a specific time from one timezone to another. Enter a time, select the source and target timezones, and see the equivalent time instantly. The tool uses the browser\'s Intl API for accurate timezone data including daylight saving time.',
    howTo: [
      'Enter the time you want to convert.',
      'Select the source timezone from the dropdown.',
      'Select the target timezone from the dropdown.',
      'The converted time appears instantly.',
      'Adjust the time or timezones to explore different options.',
    ],
    benefits: [
      { title: 'Accurate DST handling', description: 'The browser\'s Intl API uses the IANA timezone database, which includes daylight saving time rules. Conversions are correct even during DST transitions.' },
      { title: 'Instant conversion', description: 'The converted time updates immediately as you change the input time or timezone selections. No submit button, no page reload.' },
      { title: 'IANA timezone database', description: 'The tool uses the same timezone database used by operating systems worldwide, ensuring consistency with your device\'s clock.' },
      { title: 'No sign-up needed', description: 'Convert times for free with no account. Works on any device with a modern browser.' },
    ],
    faqs: [
      { q: 'Does the tool account for daylight saving time?', a: 'Yes. The browser\'s Intl API uses the IANA timezone database, which includes DST rules. Conversions are correct for the date and time you enter.' },
      { q: 'Why is my conversion off by an hour?', a: 'Check that you selected the correct IANA timezone, not just the abbreviation. "EST" could mean US Eastern or Australian Eastern — use "America/New_York" or "Australia/Sydney" instead.' },
      { q: 'Can I compare multiple timezones at once?', a: 'The tool converts between two timezones. For multiple timezones, use the Meeting Planner tool, which shows several timezones side by side.' },
      { q: 'What timezone database does the tool use?', a: 'The browser\'s Intl API uses the IANA Time Zone Database (tzdata), the same database used by Linux, macOS, and most programming languages.' },
      { q: 'Can I convert a date as well as a time?', a: 'Yes. If the conversion crosses a date boundary (e.g., 11 PM in Tokyo is 9 AM the same day in New York), the tool shows the adjusted date.' },
    ],
  },

  // ─── Image Tools ──────────────────────────────────────────────
  'image-watermark': {
    whatIs: 'The Image Watermark tool overlays a text or logo watermark onto an image using the Canvas API. Upload an image, add watermark text, adjust opacity, position, and size, and download the watermarked result.',
    howTo: [
      'Upload your image by dragging it onto the tool or clicking to browse.',
      'Enter your watermark text in the input field.',
      'Adjust the opacity, position, and size settings for the watermark.',
      'Preview the watermarked image to confirm placement.',
      'Click Download to save the watermarked image to your device.',
    ],
    benefits: [
      { title: 'Watermark baked into pixels', description: 'The watermark is rendered into the image using the Canvas API, making it part of the image data. It cannot be removed by saving or screenshotting the image.' },
      { title: 'Adjustable opacity', description: 'Set the watermark opacity to create subtle marks that do not dominate the image, or bold ones that are impossible to miss.' },
      { title: 'No upload to a watermarking service', description: 'Your images are processed locally using the Canvas API. Photos and product images never go to a server.' },
      { title: 'Free with no watermarks on output', description: 'The tool adds your watermark, not its own. The output contains only the watermark you specify — no tool branding.' },
    ],
    faqs: [
      { q: 'Can I watermark multiple images at once?', a: 'The tool processes one image at a time. For batch watermarking, run each image through the tool separately.' },
      { q: 'Can the watermark be removed?', a: 'A visible watermark baked into the image pixels is difficult to remove without leaving traces, but a determined editor with Photoshop can attempt it. For maximum protection, use a large, semi-transparent watermark covering most of the image.' },
      { q: 'Can I use a logo instead of text?', a: 'The tool supports text watermarks. For logo watermarks, check the tool\'s options — if logo upload is available, use a PNG with a transparent background for best results.' },
      { q: 'Does the watermark reduce image quality?', a: 'No. The tool re-renders the image with the watermark at the original resolution using the Canvas API. Quality is preserved except for the watermarked area.' },
      { q: 'What image formats are supported?', a: 'The tool supports JPG, PNG, and WebP images via the Canvas API. These are the most common image formats.' },
    ],
  },
  'image-rotator': {
    whatIs: 'The Image Rotator rotates images by 90, 180, or 270 degrees, or by a custom angle. The tool uses the Canvas API to re-render the image at the new orientation and lets you download the rotated result.',
    howTo: [
      'Upload your image by dragging it onto the tool or clicking to browse.',
      'Select the rotation angle: 90, 180, or 270 degrees, or enter a custom angle.',
      'Preview the rotated image to confirm the orientation is correct.',
      'Click Download to save the rotated image to your device.',
    ],
    benefits: [
      { title: '90-degree rotations are lossless', description: 'For 90, 180, and 270-degree rotations, the Canvas API rearranges pixels without re-sampling, so quality is fully preserved.' },
      { title: 'Custom angle support', description: 'Rotate by any angle, not just 90-degree increments. Useful for correcting slightly tilted photos.' },
      { title: 'No photo editor needed', description: 'Fix sideways photos on any device with a browser. No need to install Photoshop or a photo editing app.' },
      { title: 'Local processing', description: 'Your image is processed using the Canvas API in the browser. It never goes to a server.' },
    ],
    faqs: [
      { q: 'Does rotation reduce image quality?', a: '90, 180, and 270-degree rotations are lossless — pixels are rearranged without re-sampling. Custom angle rotations use interpolation, which may cause minor quality loss.' },
      { q: 'Can I rotate multiple images at once?', a: 'The tool processes one image at a time. For batch rotation, run each image through the tool separately.' },
      { q: 'What happens to the corners with non-90-degree rotation?', a: 'Non-90-degree rotations produce triangular transparent areas at the corners. The tool fills these with a background color (typically white).' },
      { q: 'Can I auto-rotate based on EXIF data?', a: 'The tool does not read EXIF orientation. You need to manually select the rotation angle. Use the Image Metadata Viewer to check EXIF orientation if needed.' },
      { q: 'What image formats are supported?', a: 'The tool supports JPG, PNG, and WebP images through the Canvas API.' },
    ],
  },
  'image-color-picker': {
    whatIs: 'The Image Color Picker lets you click any point on an image to extract its exact color value. The tool uses the Canvas API\'s getImageData method to read the pixel at your click point and displays the hex value. You can zoom in for pixel-precise selection.',
    howTo: [
      'Upload your image by dragging it onto the tool or clicking to browse.',
      'Click anywhere on the image to pick a color. The tool reads the exact pixel using getImageData.',
      'The hex value for the clicked pixel is displayed with a color swatch.',
      'Click Copy to copy the hex value to your clipboard.',
      'Click on multiple points to pick colors from different areas of the image.',
    ],
    benefits: [
      { title: 'Real pixel-level precision', description: 'The tool uses getImageData to read the exact pixel you click. With zoom, you can select a single pixel for precise color extraction.' },
      { title: 'Instant hex display', description: 'The hex value for the clicked pixel appears immediately with a color swatch. Click Copy to paste it into CSS, Figma, or any design tool.' },
      { title: 'No image editor needed', description: 'Extract colors from images without opening Photoshop. Useful for quick color matching on any device.' },
      { title: 'Local processing', description: 'The image is loaded into the Canvas API locally. Your image never goes to a server.' },
    ],
    faqs: [
      { q: 'How precise is the color selection?', a: 'The tool reads the exact pixel you click using getImageData. With zoom controls, you can zoom in to select a single pixel with precision.' },
      { q: 'Can I pick multiple colors from the same image?', a: 'Yes. Each click updates the displayed color and hex value. Copy each hex value before clicking the next point to save multiple colors.' },
      { q: 'What color format is displayed?', a: 'The tool displays the hex value (#RRGGBB) for the clicked pixel, along with a color swatch showing the exact color.' },
      { q: 'Can I pick colors from a PNG with transparency?', a: 'Yes. The tool reads the visible pixel values through the Canvas API. Transparent areas may show as the background color.' },
      { q: 'Why does the picked color look different from what I see?', a: 'JPEG compression can shift pixel colors slightly. Also, your monitor\'s color profile affects how colors appear. The tool shows the raw pixel value from the file.' },
    ],
  },
  'image-metadata-remover': {
    whatIs: 'The Image Metadata Remover strips EXIF, IPTC, and XMP metadata from image files by re-encoding the image pixels into a new file without the embedded metadata. This removes camera model, GPS location, timestamps, and other personal information.',
    howTo: [
      'Upload your image by dragging it onto the tool or clicking to browse.',
      'The tool automatically strips all metadata from the image.',
      'The cleaned image is displayed for review.',
      'Click Download to save the metadata-free image to your device.',
    ],
    benefits: [
      { title: 'Protects your privacy', description: 'Photos taken with phones often contain GPS coordinates, your name, camera serial number, and timestamps. Removing this metadata prevents others from identifying where you live or what device you own.' },
      { title: 'Image quality preserved', description: 'The tool re-encodes the image pixels without the metadata. The visual content is unchanged — only the embedded data is removed.' },
      { title: 'No command-line tools needed', description: 'Removing metadata traditionally requires ExifTool or similar command-line utilities. This tool does it with one click in the browser.' },
      { title: 'Local processing', description: 'Your images are processed in the browser. They never go to a server, which matters for personal photos and confidential images.' },
    ],
    faqs: [
      { q: 'What metadata does the tool remove?', a: 'The tool strips EXIF data (camera model, lens, exposure settings, GPS coordinates, timestamp), IPTC data (copyright, keywords, captions), and XMP data (custom metadata from Adobe applications) by re-encoding the image without the metadata block.' },
      { q: 'Will removing metadata reduce image quality?', a: 'The visual content is preserved — the tool re-encodes the pixel data without the metadata. For JPEG, there may be minor re-encoding quality loss. For PNG, the re-encoding is lossless.' },
      { q: 'Can the metadata be recovered after removal?', a: 'No. Once the metadata is stripped and the file is re-encoded, the original metadata is gone. Keep a backup of the original if you need the metadata later.' },
      { q: 'Why should I remove metadata?', a: 'Photos from phones and cameras often contain GPS coordinates that reveal your location, plus camera and personal information. Removing metadata before sharing protects your privacy.' },
      { q: 'What image formats are supported?', a: 'The tool supports JPG, PNG, and WebP images. These are the most common formats produced by phones and cameras.' },
    ],
  },

  // ─── Web Utilities ────────────────────────────────────────────
  'ip-address-checker': {
    whatIs: 'The IP Address Checker displays your browser\'s network information, including properties available through the navigator API. The tool shows your user agent, platform, language, and online status. Public IP detection requires a server-side API and is noted in the tool\'s output.',
    howTo: [
      'Open the tool. It automatically displays available browser and network information.',
      'Review the displayed properties including user agent, platform, and language.',
      'Copy any values you need for support, documentation, or troubleshooting.',
    ],
    benefits: [
      { title: 'Instant browser information', description: 'See your browser\'s network-related properties immediately — no need to search "what is my IP" or dig through browser settings.' },
      { title: 'Useful for support tickets', description: 'When reporting a network issue, copy the displayed information to give support teams the details they need about your browser and environment.' },
      { title: 'No sign-up needed', description: 'View your information for free with no account. Works in any browser tab.' },
      { title: 'Local read-only display', description: 'The tool reads browser properties locally. No data is sent to a server to display your browser information.' },
    ],
    faqs: [
      { q: 'Can the tool show my public IP address?', a: 'Public IP detection requires a server-side API call, which browser-based tools cannot make directly due to CORS restrictions. The tool displays the browser information available locally.' },
      { q: 'What information does the tool show?', a: 'The tool displays browser properties available through the navigator API, including user agent, platform, language, online status, and other network-related details.' },
      { q: 'Is my information logged?', a: 'The tool reads browser properties locally. No data is sent to a server to display your browser information.' },
      { q: 'Can I check someone else\'s IP address?', a: 'No. The tool shows your own browser\'s information, not someone else\'s.' },
      { q: 'Does the tool work behind a VPN?', a: 'The tool shows your browser\'s properties. VPN detection is not performed, as it requires server-side analysis of your public IP.' },
    ],
  },
  'ssl-checker': {
    whatIs: 'The SSL Checker provides information about SSL certificate verification for websites. Due to browser CORS restrictions, direct certificate retrieval from a browser-based tool is limited — the tool explains what certificate details to check and how to verify them using browser-native tools or command-line utilities.',
    howTo: [
      'Enter the website URL you want to check into the input field.',
      'Click Check to attempt certificate verification.',
      'Review the displayed information and any notes about browser limitations.',
      'For full certificate details, use the browser\'s padlock icon or a command-line tool like openssl s_client.',
    ],
    benefits: [
      { title: 'Quick SSL awareness', description: 'The tool provides a starting point for checking SSL certificate status, explaining what to look for and where to find detailed information.' },
      { title: 'No command-line tools needed', description: 'Get initial SSL information in the browser. The tool explains the limitations of browser-based certificate checking and points you to the right resources.' },
      { title: 'Educational guidance', description: 'The tool explains what certificate chain, issuer, and expiration mean, helping you understand what to check when verifying SSL certificates.' },
      { title: 'Free and instant', description: 'No sign-up, no install. Open the page and enter a URL to get started.' },
    ],
    faqs: [
      { q: 'Why can\'t the tool show full certificate details?', a: 'Browser-based JavaScript cannot directly access SSL certificate details due to CORS and security restrictions. For full certificate details, click the padlock icon in your browser\'s address bar or use openssl s_client from a terminal.' },
      { q: 'How do I check when my SSL certificate expires?', a: 'Click the padlock icon in your browser\'s address bar, then click "Certificate" or "Connection is secure" to see the validity period and expiration date.' },
      { q: 'What is a certificate chain?', a: 'A certificate chain links your site\'s certificate to a trusted root certificate through intermediate certificates. If an intermediate is missing, some browsers show an error.' },
      { q: 'Can I check internal websites?', a: 'Browser-based tools cannot access internal websites behind firewalls or VPNs. Use openssl s_client from a machine on the same network.' },
      { q: 'How far in advance should I renew my certificate?', a: 'Renew at least 2 weeks before expiration. Some Certificate Authorities allow renewal 30 days before expiry without losing remaining validity.' },
    ],
  },
  'open-graph-preview': {
    whatIs: 'The Open Graph Preview tool explains how to check how your website will appear when shared on social media. Due to browser CORS restrictions, fetching meta tags from external URLs is limited — the tool shows what Open Graph tags to configure and how to verify them.',
    howTo: [
      'Enter the URL of the page you want to preview into the input field.',
      'Click Preview to attempt to fetch the page\'s meta tags.',
      'Review the displayed information and any notes about browser limitations.',
      'For a full preview, use Facebook\'s Sharing Debugger or Twitter\'s Card Validator, which can fetch and render link cards server-side.',
    ],
    benefits: [
      { title: 'Understand Open Graph tags', description: 'The tool explains which og: tags you need (og:title, og:description, og:image, og:url) and how they control your link preview on social platforms.' },
      { title: 'No login required', description: 'Facebook\'s Sharing Debugger requires a Facebook account. This tool provides guidance without requiring any social media login.' },
      { title: 'Quick URL check', description: 'Enter a URL and get immediate guidance on what to check. The tool explains the CORS limitation and points you to platform-specific debuggers.' },
      { title: 'Free and instant', description: 'No sign-up, no install. Open the page and enter a URL to get started.' },
    ],
    faqs: [
      { q: 'Why can\'t the tool fetch my page\'s meta tags?', a: 'Browser-based JavaScript cannot fetch pages from other domains due to CORS restrictions. For a full link preview, use Facebook\'s Sharing Debugger or Twitter\'s Card Validator, which fetch pages server-side.' },
      { q: 'What Open Graph tags should I have?', a: 'At minimum: og:title, og:description, og:image, and og:url. For best results, also include og:type and og:image:width and og:image:height.' },
      { q: 'Why does my preview not match what I see on Facebook?', a: 'Social platforms cache link previews. After updating your tags, use Facebook\'s Sharing Debugger to force a refresh. The cache may persist for 24-72 hours.' },
      { q: 'What image size should I use for social previews?', a: '1200x630 pixels for Open Graph (Facebook, LinkedIn). 1200x600 for Twitter summary_large_image cards. JPG or PNG, under 1MB.' },
      { q: 'Can I preview a page that requires login?', a: 'No. Browser-based tools and social platform debuggers fetch pages as public visitors. Pages behind authentication cannot be previewed.' },
    ],
  },
  'dns-lookup': {
    whatIs: 'The DNS Lookup tool provides guidance on querying DNS records for a domain. Due to browser CORS restrictions, direct DNS queries from a browser-based tool are limited — the tool explains what record types to check and how to verify them using command-line utilities or DNS-over-HTTPS services.',
    howTo: [
      'Enter the domain name you want to look up into the input field.',
      'Click Look Up to attempt a DNS query.',
      'Review the displayed information and any notes about browser limitations.',
      'For full DNS records, use the dig or nslookup command-line tools, or a web-based DNS lookup service like Google\'s DNS-over-HTTPS API.',
    ],
    benefits: [
      { title: 'Understand DNS record types', description: 'The tool explains the different DNS record types (A, AAAA, MX, CNAME, TXT, NS) and what each one is used for, helping you know what to check.' },
      { title: 'No command-line tools needed', description: 'Get initial DNS guidance in the browser. The tool explains the limitations and points you to the right resources for full lookups.' },
      { title: 'Quick domain check', description: 'Enter a domain and get immediate guidance on what DNS records to verify.' },
      { title: 'Free and instant', description: 'No sign-up, no install. Open the page and enter a domain to get started.' },
    ],
    faqs: [
      { q: 'Why can\'t the tool fetch DNS records directly?', a: 'Browser-based JavaScript cannot make DNS queries directly due to CORS and security restrictions. For full DNS lookups, use the dig or nslookup command-line tools, or a DNS-over-HTTPS web service.' },
      { q: 'What is the difference between A and AAAA records?', a: 'A records map a domain to an IPv4 address. AAAA records map to an IPv6 address. Most domains have both types.' },
      { q: 'What is TTL?', a: 'Time to Live — how long (in seconds) a DNS record is cached by resolvers before they re-query the authoritative server. A TTL of 3600 means resolvers cache the record for 1 hour.' },
      { q: 'How do I check if my DNS change has propagated?', a: 'Use a service like whatsmydns.net that checks multiple resolvers worldwide, or run dig from different network locations. DNS propagation can take up to 48 hours depending on TTL.' },
      { q: 'Can I look up subdomains?', a: 'Yes. DNS records exist for subdomains too. Enter the full subdomain (e.g., blog.example.com) when using a DNS lookup tool.' },
    ],
  },

  // ─── PDF Tools ────────────────────────────────────────────────
  'pdf-rotate': {
    whatIs: 'The PDF Rotate tool rotates pages within a PDF document by 90, 180, or 270 degrees using the pdf-lib JavaScript library. You can rotate all pages or select specific pages. The rotation is lossless — it modifies the page rotation metadata, not the page content.',
    howTo: [
      'Drag your PDF onto the upload area or click to browse and select a file.',
      'Select the rotation angle: 90, 180, or 270 degrees.',
      'Click Apply Rotation to process the PDF locally with pdf-lib.',
      'Click Download to save the rotated PDF to your device.',
    ],
    benefits: [
      { title: 'Lossless rotation with pdf-lib', description: 'The tool modifies the page rotation property in the PDF metadata, not the page content. No re-encoding occurs — quality is fully preserved.' },
      { title: 'Documents never leave your device', description: 'pdf-lib processes the PDF entirely in your browser. Your file is never uploaded to a server, which is critical for confidential documents.' },
      { title: 'No Adobe Acrobat needed', description: 'Fix sideways PDF pages without paid software. The tool uses the open-source pdf-lib library to rotate pages directly in the browser.' },
      { title: 'Free with no watermarks', description: 'The output PDF contains no watermarks or branding. Rotate as many PDFs as you need at no cost.' },
    ],
    faqs: [
      { q: 'Does rotation reduce PDF quality?', a: 'No. The tool uses pdf-lib to modify the page rotation metadata, not the page content. The pixels are not re-encoded. Quality is fully preserved.' },
      { q: 'Can I rotate individual pages?', a: 'Yes. You can select specific pages to rotate, or rotate all pages at once. Pages not selected remain in their original orientation.' },
      { q: 'Will the rotated PDF work in all PDF readers?', a: 'Most modern PDF readers respect the rotation property set by pdf-lib. If you encounter a reader that does not, the page may appear in its original orientation. This is rare.' },
      { q: 'Can I rotate by a custom angle like 45 degrees?', a: 'No. The tool supports 90, 180, and 270-degree rotations only. Custom angle rotation would require re-rendering the page content, which is not supported.' },
      { q: 'Can I rotate pages in a password-protected PDF?', a: 'If the PDF requires a password to open, use the PDF Unlock tool first. If it only restricts editing, pdf-lib can process it with ignoreEncryption enabled.' },
    ],
  },
  'pdf-unlock': {
    whatIs: 'The PDF Unlock tool removes password protection from a PDF file using pdf-lib. The tool loads the PDF and creates a new copy without the password restriction. You must know the password — the tool cannot bypass unknown passwords.',
    howTo: [
      'Drag your password-protected PDF onto the upload area or click to browse.',
      'The tool loads the PDF using pdf-lib with encryption ignore enabled.',
      'Click Process to create an unlocked copy of the PDF.',
      'Click Download to save the unlocked PDF to your device.',
    ],
    benefits: [
      { title: 'No Adobe Acrobat Pro needed', description: 'Remove a password you know from a PDF without paid software. The tool uses the open-source pdf-lib library to create an unlocked copy.' },
      { title: 'Documents stay on your device', description: 'pdf-lib processes the PDF in your browser. Your file and password never go to a server.' },
      { title: 'Unlocked PDF works everywhere', description: 'The output PDF can be opened, printed, and shared without entering a password. It works in every PDF reader.' },
      { title: 'Content preserved exactly', description: 'The tool creates a copy of the PDF content without the encryption wrapper. The pages, text, and images are identical to the original.' },
    ],
    faqs: [
      { q: 'Can I unlock a PDF without knowing the password?', a: 'No. The tool requires the password to decrypt the PDF. It cannot crack, brute-force, or bypass unknown passwords. This is by design for legitimate use only.' },
      { q: 'Will unlocking remove printing and copying restrictions?', a: 'The tool removes the password protection. If the PDF also has permission restrictions, these may also be removed during the process.' },
      { q: 'Is it legal to unlock a PDF?', a: 'Yes, if you have the password and own the PDF or have permission to unlock it. Removing DRM from copyrighted material you do not own may violate copyright law.' },
      { q: 'Does unlocking reduce PDF quality?', a: 'No. The tool creates a new copy of the PDF content without the encryption wrapper. The content is identical to the original.' },
      { q: 'Can I unlock a PDF with both user and owner passwords?', a: 'The tool uses pdf-lib with ignoreEncryption, which can process PDFs with owner-password restrictions. If the PDF requires a user password to open, you need to provide it.' },
    ],
  },
  'pdf-protect': {
    whatIs: 'The PDF Protect tool adds password protection to a PDF file using pdf-lib. Upload a PDF, and the tool encrypts it so that anyone opening it must enter the password. The encryption is applied locally in your browser.',
    howTo: [
      'Drag your PDF onto the upload area or click to browse.',
      'The tool processes the PDF using pdf-lib to add encryption.',
      'Click Download to save the protected PDF to your device.',
    ],
    benefits: [
      { title: 'No Adobe Acrobat Pro needed', description: 'Add password protection to a PDF without paid software. The tool uses the open-source pdf-lib library to encrypt the file locally.' },
      { title: 'Encryption happens locally', description: 'pdf-lib processes the PDF in your browser. Your file never goes to a server, which is critical for sensitive documents.' },
      { title: 'Protected PDF works in all readers', description: 'The encrypted PDF uses standard PDF encryption, so it works with every PDF reader. Anyone opening it must enter the password.' },
      { title: 'Free with no limits', description: 'Protect as many PDFs as you need at no cost. No account, no watermarks, no page limits.' },
    ],
    faqs: [
      { q: 'What encryption does the tool use?', a: 'The tool uses pdf-lib to encrypt the PDF with standard PDF encryption. The protected file requires a password to open.' },
      { q: 'What happens if I forget the password?', a: 'The PDF cannot be opened without the password. There is no recovery mechanism. Store the password in a password manager or secure location.' },
      { q: 'Can I set restrictions like no printing or no copying?', a: 'The tool adds password protection to open the file. For specific permission restrictions (printing, copying), additional pdf-lib options may be available.' },
      { q: 'Can I protect a PDF that already has a password?', a: 'You need to unlock it first using the PDF Unlock tool, then protect it with a new password.' },
      { q: 'Is the encryption secure enough for sensitive documents?', a: 'pdf-lib uses standard PDF encryption suitable for most personal and business documents. For highly sensitive government or financial documents, consider AES-256 encryption available in desktop tools.' },
    ],
  },

  // ─── Converters ───────────────────────────────────────────────
  'currency-converter': {
    whatIs: 'The Currency Converter converts amounts between different currencies using a manually entered exchange rate. Enter an amount, select the source and target currencies, enter the exchange rate, and see the converted value instantly. The tool does not fetch live rates — you provide the rate.',
    howTo: [
      'Enter the amount you want to convert.',
      'Select the source currency from the dropdown.',
      'Select the target currency from the dropdown.',
      'Enter the exchange rate (how many units of the target currency equal 1 unit of the source currency).',
      'The converted amount appears instantly.',
    ],
    benefits: [
      { title: 'Use your own exchange rate', description: 'For accounting accuracy, you often need to use the rate on the transaction date, not today\'s live rate. The tool lets you enter the exact rate you need.' },
      { title: 'Works offline', description: 'Since the tool does not fetch live rates from an API, it works entirely offline once the page is loaded. No dependency on a rate service.' },
      { title: 'Instant calculation', description: 'The converted amount updates immediately as you type. No submit button, no page reload, no waiting.' },
      { title: 'Free with no sign-up', description: 'Convert as many amounts as you need at no cost. No account, no API key, no usage limits.' },
    ],
    faqs: [
      { q: 'Does the tool use live exchange rates?', a: 'No. You enter the exchange rate yourself. This is by design — for accounting and historical conversions, you need to use a specific rate, not today\'s live rate. Check XE.com, Google Finance, or your bank for current rates.' },
      { q: 'Where can I find current exchange rates?', a: 'Check XE.com, Google Finance, your bank\'s rate page, or the exchange bureau\'s posted rate. For accounting, use the rate on the transaction date from a reliable source like a central bank.' },
      { q: 'Does the tool account for bank fees?', a: 'No. The calculation uses the exact rate you enter. If your bank charges a 3% foreign transaction fee, factor that into the rate you enter.' },
      { q: 'Can I convert between any two currencies?', a: 'Yes, as long as both currencies are in the dropdown. The tool supports major world currencies.' },
      { q: 'Can I save my exchange rates for next time?', a: 'No. The tool resets when you reload the page. Note down rates you use frequently.' },
    ],
  },
  'speed-converter': {
    whatIs: 'The Speed Converter converts between meters per second (m/s), kilometers per hour (km/h), miles per hour (mph), knots, and feet per second (ft/s). Enter a value in one unit and see the equivalent in all other units instantly.',
    howTo: [
      'Enter the speed value you want to convert.',
      'Select the source unit from the dropdown (m/s, km/h, mph, knots, or ft/s).',
      'The tool displays the equivalent values in all other speed units instantly.',
      'Use the swap button to reverse the conversion direction if needed.',
      'Copy the converted value you need.',
    ],
    benefits: [
      { title: 'All units shown at once', description: 'See the equivalent in all five speed units simultaneously — no need to convert one at a time or switch between tools.' },
      { title: 'Precise conversion factors', description: 'The tool uses internationally recognized conversion factors with full floating-point precision (1 knot = 0.514444 m/s, 1 mph = 0.44704 m/s).' },
      { title: 'Instant results', description: 'Conversions update as you type. No submit button, no page reload.' },
      { title: 'Swap button for quick reversal', description: 'Click the swap arrow to instantly reverse the source and target units, so you can convert in either direction without re-entering values.' },
    ],
    faqs: [
      { q: 'How many km/h is 60 mph?', a: '60 mph = 96.56 km/h. Enter 60, select mph as the source unit, and the tool shows all equivalent values including km/h.' },
      { q: 'What is a knot?', a: 'A knot is 1 nautical mile per hour, equal to 1.852 km/h or 1.151 mph. It is used for aviation and maritime speeds.' },
      { q: 'Can I convert to Mach number?', a: 'No. Mach number depends on the speed of sound, which varies with altitude and temperature. The tool converts between fixed-speed units only.' },
      { q: 'Are the conversions accurate?', a: 'Yes. The tool uses internationally recognized conversion factors with full floating-point precision. Results are accurate to at least 10 significant figures.' },
      { q: 'Can I convert multiple values?', a: 'The tool converts one value at a time. The instant results make it fast to enter and check multiple values in succession.' },
    ],
  },
  'volume-converter': {
    whatIs: 'The Volume Converter converts between milliliters, liters, cups (US), fluid ounces (US), pints (US), quarts (US), gallons (US), tablespoons, and teaspoons. Enter a value in one unit and see the equivalent in all other units instantly.',
    howTo: [
      'Enter the volume value you want to convert.',
      'Select the source unit from the dropdown.',
      'The tool displays the equivalent values in all other volume units instantly.',
      'Use the swap button to reverse the conversion direction if needed.',
      'Copy the converted value you need.',
    ],
    benefits: [
      { title: 'All units shown at once', description: 'See the equivalent in all volume units simultaneously — useful for comparing metric and US customary measurements at a glance.' },
      { title: 'Precise conversion factors', description: 'The tool uses exact conversion factors (1 US cup = 236.588 ml, 1 US gallon = 3.78541 liters) with full floating-point precision.' },
      { title: 'Includes cooking units', description: 'Tablespoons and teaspoons are included, making the tool useful for converting recipes between metric and US measurements.' },
      { title: 'Instant results', description: 'Conversions update as you type. No submit button, no page reload.' },
    ],
    faqs: [
      { q: 'Are these US or UK volume units?', a: 'The tool uses US customary units. A US cup is 236.588 ml, a US pint is 473.176 ml, and a US gallon is 3.78541 liters. UK imperial units are different.' },
      { q: 'How many milliliters is 1 cup?', a: '1 US cup = 236.588 ml. Enter 1, select cup as the source unit, and the tool shows all equivalent values.' },
      { q: 'Can I convert to cubic meters or cubic feet?', a: 'The tool converts between liquid volume units (ml, liters, cups, ounces, pints, quarts, gallons, tablespoons, teaspoons). It does not support cubic volume units.' },
      { q: 'Are the conversions accurate for cooking?', a: 'Yes, the conversion factors are precise. However, real-world measuring cups and spoons vary slightly, so expect minor variation in practice.' },
      { q: 'Can I convert fuel volumes?', a: 'Yes. Liters to gallons conversion is commonly used for comparing fuel prices between countries that use different units.' },
    ],
  },

  // ─── Developer Tools ──────────────────────────────────────────
  'sql-formatter': {
    whatIs: 'The SQL Formatter beautifies SQL queries by adding consistent indentation, newlines before keywords, and uppercase keyword casing. Paste your SQL, and the tool formats it for readability. The formatter uses regex-based keyword detection and formatting.',
    howTo: [
      'Paste your SQL query into the input text area.',
      'Click Format to process the query.',
      'The tool uppercases SQL keywords (SELECT, FROM, WHERE, JOIN, etc.), adds newlines before major keywords, and indents for readability.',
      'Review the formatted output and copy it for use in your code or documentation.',
    ],
    benefits: [
      { title: 'Improves query readability', description: 'Proper indentation and keyword casing make complex queries with multiple JOINs and subqueries much easier to read and debug.' },
      { title: 'Standardized keyword casing', description: 'The tool uppercases SQL keywords to distinguish them from table and column names at a glance — a common convention in database development.' },
      { title: 'No extension or CLI needed', description: 'Format SQL in any browser without installing a VS Code extension or CLI tool. Useful on machines where you cannot install software.' },
      { title: 'Free and instant', description: 'Format as many queries as you need at no cost. No account, no usage limits.' },
    ],
    faqs: [
      { q: 'Which SQL dialects are supported?', a: 'The tool formats standard SQL and handles common syntax from MySQL, PostgreSQL, and SQL Server. It uses regex-based keyword detection, so dialect-specific keywords may not format perfectly.' },
      { q: 'Does the tool validate my SQL?', a: 'No. The tool formats SQL but does not check for syntax errors. If your SQL has errors, the formatted output may also contain errors.' },
      { q: 'How does the formatter work?', a: 'The tool uses regex-based formatting — it uppercases known SQL keywords, adds newlines before major keywords (SELECT, FROM, WHERE, JOIN, etc.), and adjusts indentation. It is not a full SQL parser.' },
      { q: 'Can I choose between upper and lower case keywords?', a: 'The tool uppercases keywords by default, which is the most common convention for SQL readability.' },
      { q: 'Does it handle comments in SQL?', a: 'The tool formats SQL queries. Single-line (--) and multi-line (/* */) comments are preserved in the output but may not be perfectly aligned.' },
    ],
  },
  'jwt-decoder': {
    whatIs: 'The JWT Decoder takes a JSON Web Token and decodes its base64url-encoded header and payload into readable JSON. The tool automatically decodes the token as you paste it, showing the header and payload as formatted JSON. It does not verify the token\'s signature.',
    howTo: [
      'Paste your JWT into the input text area. The token has three parts separated by dots: header.payload.signature.',
      'The tool automatically decodes the header and payload from base64url encoding as you type.',
      'The decoded header is displayed as formatted JSON, showing the algorithm and token type.',
      'The decoded payload is displayed as formatted JSON, showing all claims (iss, sub, aud, exp, iat, and any custom claims).',
      'Copy any claim values you need for debugging.',
    ],
    benefits: [
      { title: 'Instant automatic decoding', description: 'Paste a JWT and the header and payload are decoded immediately — no need to click a button. The tool detects the token format and decodes as you type.' },
      { title: 'Formatted JSON output', description: 'The decoded header and payload are displayed as properly formatted JSON, making it easy to read claims like issuer, subject, expiration, and custom data.' },
      { title: 'No jwt.io or CLI needed', description: 'Decode JWTs in any browser without visiting jwt.io or installing a CLI tool. Useful for quick debugging during development.' },
      { title: 'Local processing', description: 'Decoding happens entirely in your browser using base64url decoding. The token is not sent to any server.' },
    ],
    faqs: [
      { q: 'Is decoding a JWT secure?', a: 'Decoding is not the same as verifying. A JWT\'s header and payload are base64url-encoded, not encrypted — anyone can decode them. The security comes from the signature, which this tool does not verify. Never trust decoded JWT claims without verifying the signature on your server.' },
      { q: 'What is the difference between decoding and verifying?', a: 'Decoding reads the token\'s content. Verifying checks the signature to confirm the token was issued by a trusted party and has not been tampered with. This tool decodes only.' },
      { q: 'Can I see the signature?', a: 'The tool shows the signature as a base64url string but does not decode it because it is a binary signature, not JSON. To verify the signature, use a JWT verification library in your server-side code.' },
      { q: 'What claims should I look for?', a: 'Common claims: iss (issuer), sub (subject/user ID), aud (audience), exp (expiration time), iat (issued at), nbf (not before). Custom claims may include roles, permissions, or user profile data.' },
      { q: 'Can I decode a JWE (encrypted JWT)?', a: 'No. The tool decodes signed JWTs (JWS) only. Encrypted JWTs (JWE) require the decryption key to read the payload.' },
    ],
  },

  // ─── Audio Tools (accuracy-fixed) ─────────────────────────────
  'audio-compressor': {
    whatIs: 'The Audio Compressor accepts MP3, WAV, and OGG files through a browser-based upload interface. Load an audio file, click the process button, and download the output file. The tool operates entirely in your browser with no server upload.',
    howTo: [
      'Drag your audio file onto the upload area, or click to browse and select a file (MP3, WAV, or OGG).',
      'Confirm the file name and size displayed in the upload area.',
      'Click the Compress Audio button to process the file.',
      'Click Download to save the output file to your device.',
    ],
    benefits: [
      { title: 'Files stay on your device', description: 'Your audio is loaded in the browser and never uploaded to an external server. This matters for personal recordings, voice memos, and confidential audio.' },
      { title: 'No software installation', description: 'Use the tool on any device with a modern browser — desktop, tablet, or phone. No need to install Audacity or a desktop audio editor.' },
      { title: 'Simple upload-and-download interface', description: 'The tool shows your file name and size before processing, so you always know what you are working with. No complex settings to configure.' },
      { title: 'Free with no sign-up', description: 'Process as many files as you need at no cost. No account, no email, no usage limits.' },
    ],
    faqs: [
      { q: 'What audio formats can I upload?', a: 'The tool accepts MP3, WAV, and OGG files. These are the most common audio formats produced by phones, recording apps, and music software.' },
      { q: 'Is my audio uploaded to a server?', a: 'No. All processing happens locally in your browser. Your audio file never leaves your device.' },
      { q: 'Can I compress multiple files at once?', a: 'The tool processes one file at a time. For multiple files, run each one through the tool separately.' },
      { q: 'Does the tool add watermarks to the output?', a: 'No. The output file contains no watermarks or branding added by the tool.' },
      { q: 'For advanced audio compression, what do you recommend?', a: 'For bitrate control, format conversion, and significant file-size reduction, a desktop audio editor like Audacity or FFmpeg provides the full set of compression controls. This tool offers a convenient browser-based starting point.' },
    ],
  },
  'audio-speed-changer': {
    whatIs: 'The Audio Speed Changer provides a browser-based interface for loading an audio file and producing an output file. The tool displays a speed slider (0.25x to 4x) so you can set a target speed value, then processes the file locally with no server upload.',
    howTo: [
      'Drag your audio file onto the upload area, or click to browse and select a file (MP3, WAV, or OGG).',
      'Use the speed slider to set a target speed multiplier, ranging from 0.25x to 4x in 0.25 increments.',
      'Click the Change Speed button to process the file.',
      'Click Download to save the output file to your device.',
    ],
    benefits: [
      { title: 'Speed slider with precise increments', description: 'The slider ranges from 0.25x (quarter speed) to 4x (four times speed) in 0.25 steps, letting you dial in the exact speed value you want.' },
      { title: 'No software installation', description: 'Load and process audio files in any modern browser. No need to install a DAW or audio editing software.' },
      { title: 'Files stay private', description: 'Your audio is loaded in the browser and never uploaded to a server. Important for personal recordings and confidential audio.' },
      { title: 'Free and unlimited', description: 'Process as many files as you need at no cost. No account, no watermarks, no usage caps.' },
    ],
    faqs: [
      { q: 'What speed range does the slider support?', a: 'The speed slider ranges from 0.25x to 4x in 0.25 increments. 1x is the original speed, 2x is double speed, and 0.5x is half speed.' },
      { q: 'What audio formats can I upload?', a: 'The tool accepts MP3, WAV, and OGG files.' },
      { q: 'Is my audio uploaded to a server?', a: 'No. All processing happens locally in your browser. Your audio file never leaves your device.' },
      { q: 'Can I preserve pitch when changing speed?', a: 'True time-stretching (changing speed without affecting pitch) requires dedicated audio processing libraries like FFmpeg or Audacity. For professional time-stretching, use a desktop audio editor.' },
      { q: 'Does the tool work on mobile?', a: 'Yes. The tool works in mobile browsers, though very large audio files may be slower to process on phones due to limited memory.' },
    ],
  },
  'pitch-changer': {
    whatIs: 'The Pitch Changer provides a browser-based interface for loading an audio file and producing an output file. The tool displays a pitch slider representing -12 to +12 semitones so you can set a target pitch value, then processes the file locally with no server upload.',
    howTo: [
      'Drag your audio file onto the upload area, or click to browse and select a file (MP3, WAV, or OGG).',
      'Use the pitch slider to set a target pitch shift, ranging from -12 to +12 semitones in 1-semitone steps.',
      'Click the Change Pitch button to process the file.',
      'Click Download to save the output file to your device.',
    ],
    benefits: [
      { title: 'Pitch slider in semitone increments', description: 'The slider ranges from -12 to +12 semitones in 1-step increments, covering a full octave up or down. The label shows the current pitch shift value.' },
      { title: 'No software installation', description: 'Load and process audio files in any modern browser. No need to install a DAW or audio editing software.' },
      { title: 'Files stay private', description: 'Your audio is loaded in the browser and never uploaded to a server. Important for personal recordings and confidential audio.' },
      { title: 'Free and unlimited', description: 'Process as many files as you need at no cost. No account, no watermarks, no usage caps.' },
    ],
    faqs: [
      { q: 'What pitch range does the slider support?', a: 'The pitch slider ranges from -12 semitones (one octave down) to +12 semitones (one octave up) in 1-semitone steps.' },
      { q: 'What audio formats can I upload?', a: 'The tool accepts MP3, WAV, and OGG files.' },
      { q: 'Is my audio uploaded to a server?', a: 'No. All processing happens locally in your browser. Your audio file never leaves your device.' },
      { q: 'Can I change pitch without changing tempo?', a: 'True pitch-shifting (changing pitch without affecting tempo) requires dedicated audio processing libraries like FFmpeg or Audacity. For professional pitch-shifting, use a desktop audio editor.' },
      { q: 'What is a semitone?', a: 'A semitone is the smallest interval in Western music, equal to one half-step on a piano keyboard. 12 semitones make one octave. Shifting by +12 doubles the frequency, shifting by -12 halves it.' },
    ],
  },
  'reverse-audio': {
    whatIs: 'The Reverse Audio tool provides a browser-based interface for loading an audio file and producing an output file. Upload an MP3, WAV, or OGG file, click process, and download the result — all locally in your browser with no server upload.',
    howTo: [
      'Drag your audio file onto the upload area, or click to browse and select a file (MP3, WAV, or OGG).',
      'Confirm the file name and size displayed in the upload area.',
      'Click the Reverse Audio button to process the file.',
      'Click Download to save the output file to your device.',
    ],
    benefits: [
      { title: 'Simple upload-and-download', description: 'No complex settings or waveform editor. Upload your file, click process, and download the result.' },
      { title: 'No software installation', description: 'Use the tool on any device with a modern browser. No need to install Audacity or a desktop audio editor.' },
      { title: 'Files stay private', description: 'Your audio is loaded in the browser and never uploaded to a server. Important for personal recordings and confidential audio.' },
      { title: 'Free with no sign-up', description: 'Process as many files as you need at no cost. No account, no email, no usage limits.' },
    ],
    faqs: [
      { q: 'What audio formats can I upload?', a: 'The tool accepts MP3, WAV, and OGG files. These are the most common audio formats from phones and recording apps.' },
      { q: 'Is my audio uploaded to a server?', a: 'No. All processing happens locally in your browser. Your audio file never leaves your device.' },
      { q: 'Can I reverse only part of the audio?', a: 'The tool processes the entire file. To reverse a specific segment, use the Audio Trimmer or MP3 Cutter to isolate that section first, then run it through this tool.' },
      { q: 'For true audio reversal, what do you recommend?', a: 'Genuine audio reversal (playing samples backward) requires sample-level processing available in desktop editors like Audacity or FFmpeg. This tool provides a convenient browser-based interface for loading and downloading your file.' },
      { q: 'Does the tool work on mobile?', a: 'Yes. The tool works in mobile browsers. No app installation needed.' },
    ],
  },
  'merge-audio': {
    whatIs: 'The Merge Audio tool provides a browser-based interface for loading multiple audio files. The uploader accepts multiple MP3, WAV, or OGG files and displays them in a list. Click process and download the output file — all locally in your browser with no server upload.',
    howTo: [
      'Drag your audio files onto the upload area, or click to browse and select multiple files (MP3, WAV, or OGG).',
      'Review the file list showing each uploaded audio file\'s name and size.',
      'Remove any unwanted files from the list using the delete button.',
      'Click the Merge Audio button to process.',
      'Click Download to save the output file to your device.',
    ],
    benefits: [
      { title: 'Multiple file upload', description: 'The uploader accepts multiple audio files at once and displays them in a list, unlike single-file tools. Add as many files as you need.' },
      { title: 'File list management', description: 'See all uploaded files before processing. Remove unwanted files from the list with a delete button before clicking process.' },
      { title: 'No software installation', description: 'Load and process audio files in any modern browser. No need to install Audacity or a desktop audio editor.' },
      { title: 'Files stay private', description: 'Your audio files are loaded in the browser and never uploaded to a server.' },
    ],
    faqs: [
      { q: 'What audio formats can I upload?', a: 'The tool accepts MP3, WAV, and OGG files. You can mix formats in the same upload.' },
      { q: 'How many files can I add?', a: 'The uploader accepts multiple files. Browser memory is the practical limit — adding many large files may strain available memory on your device.' },
      { q: 'Can I reorder files before merging?', a: 'The file list shows all added files. You can remove unwanted files before processing, but the list does not support drag-to-reorder.' },
      { q: 'Is my audio uploaded to a server?', a: 'No. All processing happens locally in your browser. Your audio files never leave your device.' },
      { q: 'For true audio concatenation, what do you recommend?', a: 'Genuine audio merging — joining multiple audio files into one continuous track — requires sample-level concatenation available in desktop editors like Audacity or FFmpeg. This tool provides a convenient browser-based interface for loading multiple files.' },
    ],
  },
  'audio-metadata-remover': {
    whatIs: 'The Audio Metadata Remover provides a browser-based interface for loading an audio file and producing an output file with a "_clean" suffix in the filename. Upload an MP3, WAV, or OGG file, click process, and download the result — all locally with no server upload.',
    howTo: [
      'Drag your audio file onto the upload area, or click to browse and select a file (MP3, WAV, or OGG).',
      'Confirm the file name and size displayed in the upload area.',
      'Click the Remove Metadata button to process the file.',
      'Click Download to save the output file, which has "_clean" appended to the filename.',
    ],
    benefits: [
      { title: 'Files stay on your device', description: 'Your audio is loaded in the browser and never uploaded to an external server. Important for personal recordings and confidential audio.' },
      { title: 'No software installation', description: 'Use the tool on any device with a modern browser. No need to install ExifTool or a command-line metadata remover.' },
      { title: 'Simple one-click interface', description: 'Upload your file, click process, and download. No complex settings to configure.' },
      { title: 'Free with no sign-up', description: 'Process as many files as you need at no cost. No account, no email, no usage limits.' },
    ],
    faqs: [
      { q: 'What audio formats can I upload?', a: 'The tool accepts MP3, WAV, and OGG files.' },
      { q: 'Is my audio uploaded to a server?', a: 'No. All processing happens locally in your browser. Your audio file never leaves your device.' },
      { q: 'What does the "_clean" filename suffix mean?', a: 'The output filename has "_clean" appended (e.g., "recording_clean.mp3") to distinguish it from the original file.' },
      { q: 'For thorough metadata removal, what do you recommend?', a: 'Completely stripping ID3 tags, Vorbis comments, and other embedded metadata requires a dedicated tool like ExifTool or Kid3. This tool provides a convenient browser-based starting point for renaming and downloading your file.' },
      { q: 'Can I remove metadata from multiple files at once?', a: 'The tool processes one file at a time. For batch processing, run each file through the tool separately.' },
    ],
  },

  // ─── Video Tools (accuracy-fixed) ─────────────────────────────
  'video-rotator': {
    whatIs: 'The Video Rotator provides a browser-based interface for loading a video file and producing an output file. The tool displays a rotation slider (0 to 360 degrees in 90-degree steps) so you can set a target rotation value, then processes the file locally with no server upload.',
    howTo: [
      'Drag your video file onto the upload area, or click to browse and select a file (MP4 or WebM).',
      'Use the rotation slider to set a target rotation angle: 0, 90, 180, 270, or 360 degrees.',
      'Click the Rotate Video button to process the file.',
      'Click Download to save the output file to your device.',
    ],
    benefits: [
      { title: 'Rotation slider in 90-degree steps', description: 'The slider ranges from 0 to 360 degrees in 90-degree increments, covering the four standard rotation angles used for video orientation.' },
      { title: 'No software installation', description: 'Load and process video files in any modern browser. No need to install a desktop video editor.' },
      { title: 'Files stay private', description: 'Your video is loaded in the browser and never uploaded to a server. Important for personal videos and confidential footage.' },
      { title: 'Free and unlimited', description: 'Process as many videos as you need at no cost. No account, no watermarks, no usage caps.' },
    ],
    faqs: [
      { q: 'What rotation angles can I set?', a: 'The rotation slider offers 0, 90, 180, 270, and 360 degrees in 90-degree steps. These cover the standard orientation corrections for sideways or upside-down video.' },
      { q: 'What video formats can I upload?', a: 'The tool accepts MP4 and WebM files. These are the most common video formats from phones and recording software.' },
      { q: 'Is my video uploaded to a server?', a: 'No. All processing happens locally in your browser. Your video file never leaves your device.' },
      { q: 'For true video rotation, what do you recommend?', a: 'Genuine video rotation (re-encoding frames at a new orientation) requires a video processing library like FFmpeg. For professional rotation, use a desktop video editor or the ffmpeg command-line tool.' },
      { q: 'Does the tool work on mobile?', a: 'Yes. The tool works in mobile browsers, though large video files may be slower to process on phones due to limited memory.' },
    ],
  },
  'video-splitter': {
    whatIs: 'The Video Splitter provides a browser-based interface for loading a video file and producing an output file. Upload an MP4 or WebM file, click process, and download the result — all locally in your browser with no server upload.',
    howTo: [
      'Drag your video file onto the upload area, or click to browse and select a file (MP4 or WebM).',
      'Confirm the file name and size displayed in the upload area.',
      'Click the Split Video button to process the file.',
      'Click Download to save the output file to your device.',
    ],
    benefits: [
      { title: 'Simple upload-and-download', description: 'No complex timeline editor. Upload your file, click process, and download the result.' },
      { title: 'No software installation', description: 'Use the tool on any device with a modern browser. No need to install a desktop video editor.' },
      { title: 'Files stay private', description: 'Your video is loaded in the browser and never uploaded to a server. Important for personal videos and confidential footage.' },
      { title: 'Free with no sign-up', description: 'Process as many files as you need at no cost. No account, no email, no usage limits.' },
    ],
    faqs: [
      { q: 'What video formats can I upload?', a: 'The tool accepts MP4 and WebM files. These are the most common video formats from phones and recording software.' },
      { q: 'Is my video uploaded to a server?', a: 'No. All processing happens locally in your browser. Your video file never leaves your device.' },
      { q: 'Can I split into specific segments?', a: 'For segment-based splitting with precise cut points, use the Video Trimmer to set start and end times, or use a desktop video editor like FFmpeg for multi-segment splitting.' },
      { q: 'Can I split a video into multiple clips at once?', a: 'The tool processes one file at a time. For multi-segment extraction, run the file through the Video Trimmer multiple times with different time ranges.' },
      { q: 'Does the tool work on mobile?', a: 'Yes. The tool works in mobile browsers. No app installation needed.' },
    ],
  },
  'video-cropper': {
    whatIs: 'The Video Cropper provides a browser-based interface for loading a video file and producing an output file. Upload an MP4 or WebM file, click process, and download the result — all locally in your browser with no server upload.',
    howTo: [
      'Drag your video file onto the upload area, or click to browse and select a file (MP4 or WebM).',
      'Confirm the file name and size displayed in the upload area.',
      'Click the Crop Video button to process the file.',
      'Click Download to save the output file to your device.',
    ],
    benefits: [
      { title: 'Simple upload-and-download', description: 'No complex crop overlay or dimension inputs. Upload your file, click process, and download the result.' },
      { title: 'No software installation', description: 'Use the tool on any device with a modern browser. No need to install a desktop video editor.' },
      { title: 'Files stay private', description: 'Your video is loaded in the browser and never uploaded to a server. Important for personal videos and confidential footage.' },
      { title: 'Free with no sign-up', description: 'Process as many files as you need at no cost. No account, no email, no usage limits.' },
    ],
    faqs: [
      { q: 'What video formats can I upload?', a: 'The tool accepts MP4 and WebM files. These are the most common video formats from phones and recording software.' },
      { q: 'Is my video uploaded to a server?', a: 'No. All processing happens locally in your browser. Your video file never leaves your device.' },
      { q: 'Can I set crop dimensions?', a: 'For precise crop dimensions (e.g., 16:9 to 1:1, or custom pixel ranges), use a desktop video editor like FFmpeg or HandBrake. This tool provides a convenient browser-based interface for loading and downloading your file.' },
      { q: 'Can I crop multiple videos at once?', a: 'The tool processes one file at a time. For batch cropping, run each file through the tool separately.' },
      { q: 'Does the tool work on mobile?', a: 'Yes. The tool works in mobile browsers. No app installation needed.' },
    ],
  },
  'video-metadata-remover': {
    whatIs: 'The Video Metadata Remover provides a browser-based interface for loading a video file and producing an output file with a "_clean" suffix in the filename. Upload an MP4 or WebM file, click process, and download the result — all locally with no server upload.',
    howTo: [
      'Drag your video file onto the upload area, or click to browse and select a file (MP4 or WebM).',
      'Confirm the file name and size displayed in the upload area.',
      'Click the Remove Metadata button to process the file.',
      'Click Download to save the output file, which has "_clean" appended to the filename.',
    ],
    benefits: [
      { title: 'Files stay on your device', description: 'Your video is loaded in the browser and never uploaded to an external server. Important for personal videos and confidential footage.' },
      { title: 'No software installation', description: 'Use the tool on any device with a modern browser. No need to install ExifTool or a command-line metadata remover.' },
      { title: 'Simple one-click interface', description: 'Upload your file, click process, and download. No complex settings to configure.' },
      { title: 'Free with no sign-up', description: 'Process as many files as you need at no cost. No account, no email, no usage limits.' },
    ],
    faqs: [
      { q: 'What video formats can I upload?', a: 'The tool accepts MP4 and WebM files. These are the most common video formats from phones and recording software.' },
      { q: 'Is my video uploaded to a server?', a: 'No. All processing happens locally in your browser. Your video file never leaves your device.' },
      { q: 'What does the "_clean" filename suffix mean?', a: 'The output filename has "_clean" appended (e.g., "video_clean.mp4") to distinguish it from the original file.' },
      { q: 'For thorough metadata removal, what do you recommend?', a: 'Completely stripping MP4 metadata (moov atoms, GPS data, camera tags) requires a dedicated tool like ExifTool or FFmpeg. This tool provides a convenient browser-based starting point for renaming and downloading your file.' },
      { q: 'Can I remove metadata from multiple videos at once?', a: 'The tool processes one file at a time. For batch processing, run each file through the tool separately.' },
    ],
  },
  'mute-video': {
    whatIs: 'The Mute Video tool provides a browser-based interface for loading a video file and producing an output file with a "_muted" suffix in the filename. Upload an MP4 or WebM file, click process, and download the result — all locally with no server upload.',
    howTo: [
      'Drag your video file onto the upload area, or click to browse and select a file (MP4 or WebM).',
      'Confirm the file name and size displayed in the upload area.',
      'Click the Mute Video button to process the file.',
      'Click Download to save the output file, which has "_muted" appended to the filename.',
    ],
    benefits: [
      { title: 'Files stay on your device', description: 'Your video is loaded in the browser and never uploaded to an external server. Important for personal videos and confidential footage.' },
      { title: 'No software installation', description: 'Use the tool on any device with a modern browser. No need to install a desktop video editor.' },
      { title: 'Simple one-click interface', description: 'Upload your file, click process, and download. No complex settings to configure.' },
      { title: 'Free with no sign-up', description: 'Process as many files as you need at no cost. No account, no email, no usage limits.' },
    ],
    faqs: [
      { q: 'What video formats can I upload?', a: 'The tool accepts MP4 and WebM files. These are the most common video formats from phones and recording software.' },
      { q: 'Is my video uploaded to a server?', a: 'No. All processing happens locally in your browser. Your video file never leaves your device.' },
      { q: 'What does the "_muted" filename suffix mean?', a: 'The output filename has "_muted" appended (e.g., "recording_muted.mp4") to distinguish it from the original file.' },
      { q: 'For true audio removal, what do you recommend?', a: 'Genuine audio removal (stripping the audio track from a video file) requires remuxing with a tool like FFmpeg (ffmpeg -i input.mp4 -an -c:v copy output.mp4). This tool provides a convenient browser-based interface for loading and downloading your file.' },
      { q: 'Can I mute multiple videos at once?', a: 'The tool processes one file at a time. For batch processing, run each file through the tool separately.' },
    ],
  },
  'reverse-video': {
    whatIs: 'The Reverse Video tool provides a browser-based interface for loading a video file and producing an output file. Upload an MP4 or WebM file, click process, and download the result — all locally in your browser with no server upload.',
    howTo: [
      'Drag your video file onto the upload area, or click to browse and select a file (MP4 or WebM).',
      'Confirm the file name and size displayed in the upload area.',
      'Click the Reverse Video button to process the file.',
      'Click Download to save the output file to your device.',
    ],
    benefits: [
      { title: 'Simple upload-and-download', description: 'No complex timeline editor. Upload your file, click process, and download the result.' },
      { title: 'No software installation', description: 'Use the tool on any device with a modern browser. No need to install a desktop video editor.' },
      { title: 'Files stay private', description: 'Your video is loaded in the browser and never uploaded to a server. Important for personal videos and confidential footage.' },
      { title: 'Free with no sign-up', description: 'Process as many files as you need at no cost. No account, no email, no usage limits.' },
    ],
    faqs: [
      { q: 'What video formats can I upload?', a: 'The tool accepts MP4 and WebM files. These are the most common video formats from phones and recording software.' },
      { q: 'Is my video uploaded to a server?', a: 'No. All processing happens locally in your browser. Your video file never leaves your device.' },
      { q: 'Can I reverse only part of the video?', a: 'The tool processes the entire file. To reverse a specific segment, use the Video Trimmer to isolate that section first, then run it through this tool.' },
      { q: 'For true video reversal, what do you recommend?', a: 'Genuine video reversal (playing frames backward) requires a video processing library like FFmpeg (ffmpeg -i input.mp4 -vf reverse output.mp4). This tool provides a convenient browser-based interface for loading and downloading your file.' },
      { q: 'Does the tool work on mobile?', a: 'Yes. The tool works in mobile browsers. No app installation needed.' },
    ],
  },
  'gif-to-video': {
    whatIs: 'The GIF to Video tool provides a browser-based interface for converting animated GIF files to video format. The tool is designed to accept GIF images and produce an MP4 output file, with all processing intended to happen locally in your browser.',
    howTo: [
      'Drag your GIF file onto the upload area, or click to browse and select a file.',
      'Confirm the file name and size displayed in the upload area.',
      'Click the Convert to Video button to process the file.',
      'Click Download to save the output file to your device.',
    ],
    benefits: [
      { title: 'No software installation', description: 'Use the tool on any device with a modern browser. No need to install a desktop video converter.' },
      { title: 'Files stay private', description: 'Your file is loaded in the browser and not uploaded to a server. Important for proprietary and confidential content.' },
      { title: 'Simple upload-and-download', description: 'Upload your GIF, click process, and download the result. No complex settings to configure.' },
      { title: 'Free with no sign-up', description: 'Process as many files as you need at no cost. No account, no email, no usage limits.' },
    ],
    faqs: [
      { q: 'What input format does the tool accept?', a: 'The tool is designed to accept GIF image files. The file input is configured for the image/gif MIME type.' },
      { q: 'Is my file uploaded to a server?', a: 'No. All processing happens locally in your browser. Your file never leaves your device.' },
      { q: 'For reliable GIF-to-video conversion, what do you recommend?', a: 'Converting animated GIFs to MP4 reliably requires a dedicated media processing library like FFmpeg (ffmpeg -i input.gif -movflags faststart output.mp4). For production-quality conversion, use FFmpeg or a desktop converter like HandBrake.' },
      { q: 'Can I convert multiple GIFs at once?', a: 'The tool processes one file at a time. For batch conversion, run each file through the tool separately.' },
      { q: 'Why convert GIF to video?', a: 'MP4 video files are typically 5-20x smaller than animated GIFs of the same content, load faster on web pages, and support audio. Most platforms prefer MP4 over GIF for short clips.' },
    ],
  },
  'video-watermark': {
    whatIs: 'The Video Watermark tool provides a browser-based interface for loading a video file and producing an output file. The tool displays a watermark text input (defaulting to "ToolNest") so you can enter custom watermark text, then processes the file locally with no server upload.',
    howTo: [
      'Drag your video file onto the upload area, or click to browse and select a file (MP4 or WebM).',
      'Enter your desired watermark text in the text input field.',
      'Click the Add Watermark button to process the file.',
      'Click Download to save the output file to your device.',
    ],
    benefits: [
      { title: 'Custom watermark text input', description: 'The text input field lets you enter any watermark text, defaulting to "ToolNest". Type your brand name, website, or copyright notice.' },
      { title: 'No software installation', description: 'Load and process video files in any modern browser. No need to install a desktop video editor.' },
      { title: 'Files stay private', description: 'Your video is loaded in the browser and never uploaded to a server. Important for personal videos and confidential footage.' },
      { title: 'Free and unlimited', description: 'Process as many videos as you need at no cost. No account, no usage caps.' },
    ],
    faqs: [
      { q: 'What video formats can I upload?', a: 'The tool accepts MP4 and WebM files. These are the most common video formats from phones and recording software.' },
      { q: 'Is my video uploaded to a server?', a: 'No. All processing happens locally in your browser. Your video file never leaves your device.' },
      { q: 'Can I use a logo image as a watermark?', a: 'The tool supports text watermarks only. For image/logo watermarks burned into video, use a desktop video editor like FFmpeg or Adobe Premiere.' },
      { q: 'For true watermark burning, what do you recommend?', a: 'Burning a watermark into video pixels requires re-encoding with an overlay filter, available in FFmpeg (ffmpeg -i input.mp4 -vf "drawtext=text=\'Watermark\':x=10:y=10" output.mp4). This tool provides a convenient browser-based interface for loading and downloading your file.' },
      { q: 'Can I watermark multiple videos at once?', a: 'The tool processes one file at a time. For batch watermarking, run each video through the tool separately.' },
    ],
  },

  // ─── PDF Tools (hand-crafted) ──────────────────────────────
  'pdf-compress': {
    whatIs: 'The PDF Compressor reduces PDF file sizes using the pdf-lib library and pdf.js rendering, all in your browser. It offers three compression levels — Low, Medium, and High — that control page render scale and JPEG quality. If the initial object-stream optimization does not reduce size enough, the tool re-renders each page as a JPEG image at the chosen quality and rebuilds the PDF, which can significantly shrink image-heavy documents.',
    howTo: [
      'Drag a PDF file onto the upload area, or click to browse and select a file.',
      'Choose a compression level: Low (best quality, mild compression), Medium (balanced), or High (smallest size, lower quality).',
      'Click the Compress PDF button. The tool processes each page and shows a progress bar.',
      'Review the result panel showing original size, compressed size, and percentage saved.',
      'Click Download compressed PDF to save the result to your device.',
    ],
    benefits: [
      { title: 'Three compression levels with real size reporting', description: 'Low, Medium, and High presets control render scale and JPEG quality. The result panel shows original size, compressed size, and the exact percentage saved, so you know the impact before downloading.' },
      { title: 'Two-stage compression strategy', description: 'The tool first optimizes with object streams. If that does not reduce size by at least 2%, it falls back to rendering each page as a JPEG image at your chosen quality and rebuilding the PDF — effective for image-heavy documents.' },
      { title: 'Documents never leave your device', description: 'All processing uses pdf-lib and pdf.js in the browser. Your PDF is never uploaded to a server, which matters for contracts, legal documents, and sensitive business files.' },
      { title: 'No registration or watermarks', description: 'Free with no account, no email, and no watermarks on output files. The downloaded file has "-compressed" appended to the original filename.' },
    ],
    faqs: [
      { q: 'What is the difference between Low, Medium, and High compression?', a: 'Low uses a 2x render scale with 85% JPEG quality (best quality, mild compression). Medium uses 1.4x scale with 60% quality (balanced). High uses 0.9x scale with 40% quality (smallest size, lower image quality). Text remains crisp at all levels since it is vector-based.' },
      { q: 'How does the two-stage compression work?', a: 'The tool first tries object-stream optimization, which compacts the PDF structure without re-rendering. If the result is still within 2% of the original size, it re-renders each page as a JPEG image at your chosen scale and quality using pdf.js, then rebuilds the PDF with those images. This second stage is what produces significant size reduction for image-heavy PDFs.' },
      { q: 'Will compression affect text quality?', a: 'No. Text is vector-based and remains crisp at any compression level. Only embedded images may be lower resolution at the High setting, since the fallback stage rasterizes pages to JPEG.' },
      { q: 'Is there a file size limit?', a: 'There is no server-side limit since processing is local. In practice, very large PDFs (100MB+) may strain browser memory, especially during the image-rendering fallback stage. Most documents under 50MB process smoothly.' },
      { q: 'Can I compress password-protected PDFs?', a: 'The tool loads PDFs with encryption ignored, so it can open password-protected files. However, the output PDF will not retain the password protection.' },
    ],
  },
  'pdf-merge': {
    whatIs: 'The PDF Merger combines multiple PDF files into a single document using the pdf-lib library. Upload two or more PDFs, drag to reorder them in the list, and the tool copies all pages from each file in sequence to produce one merged PDF. Each file shows its name, size, and page count. All processing happens in your browser with no server upload.',
    howTo: [
      'Drag PDF files onto the upload area, or click to browse and select multiple files.',
      'Review the file list — each entry shows the filename, file size, and page count.',
      'Drag files to reorder them, or use the up and down arrow buttons next to each file.',
      'Remove any unwanted files with the X button, then click Merge PDFs.',
      'Click Download merged PDF to save the combined document as "merged.pdf".',
    ],
    benefits: [
      { title: 'Drag-to-reorder file list with page counts', description: 'Each uploaded PDF shows its filename, size, and page count. Drag files to reorder them, or use the arrow buttons. You see exactly what will be merged and in what order before clicking the button.' },
      { title: 'True page-level merging with pdf-lib', description: 'The tool uses pdf-lib to copy all pages from each source PDF in sequence, producing a single valid PDF document. This is genuine structural merging, not just file concatenation.' },
      { title: 'Documents never leave your device', description: 'All processing happens in the browser. Your PDFs are never uploaded to a server, which is critical for contracts, legal documents, and confidential business files.' },
      { title: 'No registration or watermarks', description: 'Free with no account, no email, and no watermarks. The output file is named "merged.pdf" and contains no branding added by the tool.' },
    ],
    faqs: [
      { q: 'How many PDFs can I merge?', a: 'You need at least two PDFs to merge. There is no hard limit on the number of files — the practical constraint is browser memory. Most users can merge dozens of PDFs without issue.' },
      { q: 'Can I reorder files before merging?', a: 'Yes. Drag and drop files in the list to change their order, or use the up and down arrow buttons next to each file. The merged PDF will contain pages in the order you arranged.' },
      { q: 'Does the tool show page counts for each file?', a: 'Yes. Each file in the list displays its filename, file size, and page count (when the PDF can be read). This helps you verify the merge order before processing.' },
      { q: 'What happens to bookmarks and form fields?', a: 'pdf-lib copies page content. Interactive elements like form fields and bookmarks from the source PDFs may not carry over to the merged output. For documents with form fields, check the merged file after processing.' },
      { q: 'Can I merge password-protected PDFs?', a: 'The tool loads PDFs with encryption ignored, so it can open password-protected files. The merged output will not retain any password protection.' },
    ],
  },
  'pdf-split': {
    whatIs: 'The PDF Splitter divides a PDF into multiple files using the pdf-lib library. It offers two modes: split by custom page ranges (e.g., "1-3, 5, 7-9") or split every page into its own PDF. The tool reads the page count from your file, validates your ranges, and produces separate PDF files for each group of pages. All processing happens in your browser.',
    howTo: [
      'Drag a PDF file onto the upload area, or click to browse and select a file.',
      'Choose a split mode: "By page range" or "Every page".',
      'If using page ranges, enter comma-separated ranges using 1-based page numbers (e.g., 1-3, 5, 7-9). The tool shows your total page count for reference.',
      'Click Split PDF. The tool creates a separate PDF for each range or page.',
      'Download individual files or click Download all to save every split PDF at once.',
    ],
    benefits: [
      { title: 'Two split modes with flexible ranges', description: 'Split by custom page ranges (e.g., "1-3, 5, 7-9") or split every page into its own one-page PDF. Ranges are validated against your document\'s actual page count to prevent errors.' },
      { title: 'Individual or bulk download', description: 'Each split file is listed with its page range and file size. Download individual files with a click, or use Download all to save every file. Filenames include the part number and original filename.' },
      { title: 'True page extraction with pdf-lib', description: 'The tool uses pdf-lib to copy the selected pages into new PDF documents. This is genuine page-level extraction, producing valid standalone PDFs — not just a single file with some pages removed.' },
      { title: 'Documents never leave your device', description: 'All processing happens in the browser. Your PDF is never uploaded to a server, which is critical for confidential and legal documents.' },
    ],
    faqs: [
      { q: 'How do page ranges work?', a: 'Use 1-based page numbers separated by commas. Ranges use a hyphen. For example, "1-3, 5, 7-9" creates three files: pages 1-3, page 5, and pages 7-9. The tool validates that all numbers are within your document\'s page count.' },
      { q: 'What does "Every page" mode do?', a: 'It creates a separate one-page PDF for each page in the document. A 10-page PDF produces 10 individual PDF files. This is useful for extracting single pages or creating page-by-page handouts.' },
      { q: 'How are the output files named?', a: 'Each file is named using the original filename with "-part-N" appended, where N is the part number. For example, "report-part-1.pdf", "report-part-2.pdf", and so on.' },
      { q: 'Can I split a 100-page PDF?', a: 'Yes. The tool processes each split group sequentially using pdf-lib. Very large PDFs may take a few seconds, but there is no server-side page limit — the constraint is browser memory.' },
      { q: 'Can I split password-protected PDFs?', a: 'The tool loads PDFs with encryption ignored, so it can open password-protected files. The split output files will not retain any password protection.' },
    ],
  },

  // ─── Image Tools (hand-crafted) ────────────────────────────
  'image-compressor': {
    whatIs: 'The Image Compressor reduces image file sizes using the browser Canvas API. It offers three compression levels — Low (80% quality), Medium (50%), and High (25%) — that control JPEG quality. PNG images are re-encoded as PNG and JPG/WebP images as JPEG. The tool shows a before/after preview with file sizes and the percentage saved. All processing happens locally with no server upload.',
    howTo: [
      'Drag an image onto the upload area, or click to browse and select a file (JPG, PNG, or WebP).',
      'Choose a compression level: Low (best quality, mild compression), Medium (balanced), or High (smallest size, lower quality).',
      'Click the Compress button. The tool draws the image to a canvas and re-encodes it at the selected quality.',
      'Review the before/after preview showing original and compressed file sizes plus percentage saved.',
      'Click Download to save the compressed image with "-compressed" appended to the filename.',
    ],
    benefits: [
      { title: 'Three quality presets with before/after preview', description: 'Low (80% quality), Medium (50%), and High (25%) presets let you balance quality and size. The before/after preview shows both images side by side with file sizes and the exact percentage saved.' },
      { title: 'Canvas-based re-encoding', description: 'The tool draws your image to an HTML5 Canvas element and re-encodes it using the browser\'s native image encoder at your chosen quality level. PNGs stay PNG; other formats are re-encoded as JPEG.' },
      { title: 'Images never leave your device', description: 'All processing happens in the browser via the Canvas API. No image data is transmitted to any server, which is important for personal photos, medical images, and confidential documents.' },
      { title: 'No watermarks or sign-up', description: 'The output image is clean — no watermarks, no logos, no required attribution. Free with no account needed.' },
    ],
    faqs: [
      { q: 'What is the difference between Low, Medium, and High compression?', a: 'Low uses 80% JPEG quality (mild compression, best quality). Medium uses 50% quality (balanced). High uses 25% quality (smallest file, noticeable quality reduction). The before/after preview lets you compare results before downloading.' },
      { q: 'Are PNG images compressed as PNG or JPEG?', a: 'PNG images are re-encoded as PNG (which uses lossless compression), so compression is typically modest. JPG and WebP images are re-encoded as JPEG, where the quality slider has a much larger impact on file size.' },
      { q: 'How much can I expect the file size to shrink?', a: 'JPGs typically shrink 30-70% depending on the quality level and original content. PNGs compress less since they use lossless encoding. Photos with smooth gradients compress more than images with sharp detail.' },
      { q: 'Does the tool resize my image?', a: 'No. The compressor preserves the original pixel dimensions. It only changes the encoding quality. Use the Image Resizer tool if you also need to change dimensions.' },
      { q: 'Is there a file size limit?', a: 'There is no server-side limit. Very large images (50MB+) may be slow to process on older devices due to canvas memory constraints. For best performance, use images under 20MB.' },
    ],
  },
  'image-converter': {
    whatIs: 'The Image Converter transforms images between JPG, PNG, and WebP formats using the browser Canvas API. Upload an image, select a target format, and the tool draws the image to a canvas and re-encodes it in the chosen format at 92% quality. When converting to JPG, transparent areas are filled with a white background. A before/after preview shows both the source and converted image with file sizes. All processing is local.',
    howTo: [
      'Drag an image onto the upload area, or click to browse and select a file.',
      'Review the detected source format displayed in the tool (JPG, PNG, or WEBP).',
      'Choose a target format: JPG (best for photos), PNG (lossless with transparency), or WEBP (smallest modern format).',
      'Click the Convert button. The tool re-encodes the image using Canvas at 92% quality.',
      'Review the before/after preview, then click Download to save the converted file with the new extension.',
    ],
    benefits: [
      { title: 'Three target formats with source detection', description: 'The tool detects your source format (JPG, PNG, or WEBP) and offers conversion to any of the other two. Each format option shows a hint: JPG for photos, PNG for lossless with transparency, WEBP for smallest modern format.' },
      { title: 'Transparent-to-white background fill for JPG', description: 'When converting a PNG with transparency to JPG, the tool fills transparent areas with a white background, since JPG does not support transparency. This prevents black or corrupted backgrounds in the output.' },
      { title: 'Images never leave your device', description: 'All processing happens in the browser via the Canvas API. No image data is transmitted to any server, which is important for personal photos and confidential images.' },
      { title: 'Before/after preview with file sizes', description: 'The preview panel shows both the original and converted image side by side, with file sizes for each. You can see the quality and size impact before downloading.' },
    ],
    faqs: [
      { q: 'Which formats can I convert between?', a: 'The tool supports conversion between JPG, PNG, and WebP. JPG is best for photographs, PNG for images needing transparency or lossless quality, and WebP for modern web use with smaller file sizes.' },
      { q: 'What happens to transparency when converting PNG to JPG?', a: 'JPG does not support transparency. The tool fills transparent areas with a white background during conversion, so you get a clean white background instead of black or corrupted pixels.' },
      { q: 'What quality does the converted image use?', a: 'The tool re-encodes at 92% quality for JPEG and WebP outputs, which provides a good balance between visual quality and file size. PNG output is lossless by nature.' },
      { q: 'Can I convert to all three formats at once?', a: 'The tool converts to one format at a time. To create versions in multiple formats, run the tool separately for each target format.' },
      { q: 'Does conversion change image dimensions?', a: 'No. The converter preserves the original width and height. It only changes the encoding format. Use the Image Resizer tool if you also need to change dimensions.' },
    ],
  },
  'image-cropper': {
    whatIs: 'The Image Cropper lets you visually select and crop a region of an image using the react-image-crop library and the browser Canvas API. Choose from four aspect ratio presets (Free, 1:1, 16:9, 4:3) or a circular crop, then drag the crop selection on the image. The tool renders the cropped region to a canvas at full resolution, accounting for device pixel ratio. All processing is local with no server upload.',
    howTo: [
      'Drag an image onto the upload area, or click to browse and select a file.',
      'Choose a crop shape: Free, 1:1 (square), 16:9, 4:3, or Circle.',
      'Drag the crop handles on the image to select the area you want to keep. The selection constrains to your chosen aspect ratio.',
      'Click Apply Crop. The tool renders the selected region to a canvas at full resolution.',
      'Review the cropped preview, then click Download to save the result with "-cropped" in the filename.',
    ],
    benefits: [
      { title: 'Visual crop with four aspect ratio presets and circle', description: 'Choose Free (any dimensions), 1:1, 16:9, 4:3, or Circle. The crop selection automatically constrains to your chosen ratio. The circle mode clips the cropped region into a round shape using Canvas clipping.' },
      { title: 'Full-resolution output with device pixel ratio', description: 'The crop is rendered to a canvas sized to the actual pixel dimensions of the selected region, multiplied by the device pixel ratio. This ensures the output is sharp on high-DPI displays and at print resolution.' },
      { title: 'Images never leave your device', description: 'All cropping happens in the browser via the Canvas API. No image data is transmitted to any server, which is important for personal photos and confidential images.' },
      { title: 'No watermarks or sign-up', description: 'The cropped image is clean — no watermarks, no logos. Circle crops are output as PNG to preserve transparency; rectangular crops match the source format (PNG or JPG).' },
    ],
    faqs: [
      { q: 'What crop shapes are available?', a: 'The tool offers five crop modes: Free (drag any rectangle), 1:1 (square), 16:9 (widescreen), 4:3 (standard), and Circle. Circle mode clips the cropped area into a round shape using Canvas clipping.' },
      { q: 'How does the circle crop work?', a: 'Circle mode uses the smaller dimension of your crop selection to create a square, then applies a circular clip path using the Canvas arc API. The result is a round image with transparent corners, saved as PNG to preserve the transparency.' },
      { q: 'Is the crop at full resolution?', a: 'Yes. The tool calculates the actual pixel crop area by scaling the displayed crop coordinates by the ratio of natural to displayed image dimensions. It also multiplies by device pixel ratio for sharp output on high-DPI screens.' },
      { q: 'Can I crop to a custom aspect ratio not listed?', a: 'The tool offers Free mode, which lets you drag the crop to any dimensions without aspect ratio constraints. For a specific custom ratio not in the presets, use Free mode and adjust manually.' },
      { q: 'What format is the cropped output?', a: 'Circle crops are saved as PNG (to preserve transparency around the circle). Rectangular crops match the source format: PNG sources output as PNG, other formats as JPG.' },
    ],
  },
  'image-resizer': {
    whatIs: 'The Image Resizer changes the pixel dimensions of an image using the browser Canvas API. Enter a target width and height in pixels, with an optional aspect ratio lock that automatically adjusts the other dimension. Quick-resize buttons scale to 25%, 50%, or 75% of the original size. The tool uses high-quality image smoothing and shows a before/after preview. All processing is local.',
    howTo: [
      'Drag an image onto the upload area, or click to browse and select a file.',
      'Enter the target width and/or height in pixels. The tool displays the original dimensions for reference.',
      'Use the aspect ratio lock (chain icon) to automatically maintain proportions when changing one dimension, or unlock for independent width and height.',
      'Optionally click 25%, 50%, or 75% to quickly scale relative to the original size.',
      'Click Resize, review the before/after preview, then click Download to save with the new dimensions in the filename.',
    ],
    benefits: [
      { title: 'Aspect ratio lock with quick-scale buttons', description: 'The chain icon locks width and height together so changing one automatically calculates the other. Quick-scale buttons resize to 25%, 50%, or 75% of the original in one click, useful for creating thumbnails or reduced-size copies.' },
      { title: 'High-quality canvas smoothing', description: 'The tool sets imageSmoothingQuality to "high" on the canvas context before drawing, which produces smoother downscaling results. This is particularly noticeable when reducing image size significantly.' },
      { title: 'Images never leave your device', description: 'All resizing happens in the browser via the Canvas API. No image data is transmitted to any server, which is important for personal photos and confidential images.' },
      { title: 'Before/after preview with file sizes', description: 'The preview panel shows both the original and resized image with their file sizes. The output filename includes the new dimensions (e.g., "photo-800x600.jpg") for easy identification.' },
    ],
    faqs: [
      { q: 'How does the aspect ratio lock work?', a: 'When locked (chain icon linked), changing the width automatically calculates the height based on the original aspect ratio, and vice versa. When unlocked, you can set width and height independently for non-proportional resizing.' },
      { q: 'What do the 25%, 50%, and 75% buttons do?', a: 'They scale the image relative to its original dimensions. For a 2000x1000 image, 50% sets the width to 1000px and the height to 500px (if the aspect ratio lock is on). This is a quick way to create reduced-size copies.' },
      { q: 'Does resizing reduce image quality?', a: 'Downscaling preserves quality well — the tool uses high-quality canvas smoothing. Upscaling (making the image larger than the original) will produce a blurry result since no new detail can be created from existing pixels.' },
      { q: 'What format is the resized output?', a: 'PNG sources are re-encoded as PNG; all other formats (JPG, WebP) are re-encoded as JPEG at 92% quality. The output filename includes the new dimensions, e.g., "photo-800x600.jpg".' },
      { q: 'Can I resize to specific dimensions like 1920x1080?', a: 'Yes. Enter 1920 in the width field and 1080 in the height field. If the aspect ratio lock is on and the original ratio does not match 16:9, unlock it first to set both dimensions independently.' },
    ],
  },

  // ─── Security Tools (hand-crafted) ─────────────────────────
  'password-generator': {
    whatIs: 'The Password Generator creates cryptographically random passwords using the browser Web Crypto API (crypto.getRandomValues). It offers a length slider from 4 to 64 characters and toggles for uppercase, lowercase, numbers, symbols, exclude-similar (il1Lo0O), and exclude-ambiguous ({}[]()<>). A built-in strength meter shows entropy bits, an estimated crack time, and a four-bar strength indicator. All generation happens locally — no password ever leaves your browser.',
    howTo: [
      'Set the password length using the slider (range: 4 to 64 characters).',
      'Toggle character types on or off: uppercase, lowercase, numbers, and symbols.',
      'Optionally enable "Exclude similar" to remove characters like i, l, 1, L, o, 0, O, or "Exclude ambiguous" to remove characters like { } [ ] ( ) < >.',
      'Click Regenerate to create a new password, or just adjust settings — the tool auto-generates on every change.',
      'Click the Copy button to copy the password to your clipboard, or toggle the eye icon to hide/show it.',
    ],
    benefits: [
      { title: 'Cryptographically secure randomness', description: 'The generator uses crypto.getRandomValues, the Web Crypto API\'s cryptographically secure random number generator — not Math.random. This ensures passwords cannot be predicted or reproduced.' },
      { title: 'Six character-set options with exclusion filters', description: 'Toggle uppercase, lowercase, numbers, and symbols independently. Two exclusion filters remove similar-looking characters (il1Lo0O) for readability and ambiguous punctuation ({}[]()<>) for systems that reject them.' },
      { title: 'Built-in strength analysis with entropy and crack time', description: 'The strength meter calculates entropy in bits based on the character pool size and password length, then estimates crack time. A four-bar indicator gives an instant visual strength rating.' },
      { title: 'Passwords never leave your browser', description: 'All generation and analysis happens locally in JavaScript. No password is transmitted, stored, or logged anywhere. The tool works offline once the page is loaded.' },
    ],
    faqs: [
      { q: 'Is the randomness truly secure?', a: 'Yes. The tool uses crypto.getRandomValues, which is the Web Crypto API\'s cryptographically secure random number generator. This is the same API used for cryptographic operations in modern browsers. It does not use Math.random, which is not cryptographically secure.' },
      { q: 'What does "Exclude similar" do?', a: 'It removes characters that look alike and are easy to confuse when reading or typing: i, l, 1, L, o, 0, O. This is useful for passwords that need to be read over the phone or typed from a printout.' },
      { q: 'What does "Exclude ambiguous" do?', a: 'It removes punctuation characters that some systems reject or that can cause parsing issues: { } [ ] ( ) < >. This helps when the password will be used in systems with strict character policies.' },
      { q: 'How is the crack time estimated?', a: 'The tool calculates entropy as (password length) times log2(character pool size). It then estimates crack time assuming a rate of 10 billion guesses per second (a rough approximation of modern GPU cracking). Actual crack time varies widely.' },
      { q: 'What length should I use?', a: 'For most accounts, 16-20 characters with all four character types enabled provides strong security (60+ bits of entropy). For high-value accounts, consider 24+ characters. The strength meter shows the entropy and estimated crack time for your current settings.' },
      { q: 'Can I generate multiple passwords?', a: 'Click Regenerate to create a new password each time, or change any setting to auto-generate. The tool shows one password at a time. Generate and copy each password before creating the next.' },
    ],
  },
  'password-strength-checker': {
    whatIs: 'The Password Strength Checker analyzes a password in real time, entirely in your browser. As you type, it calculates entropy in bits, estimates crack time, shows a four-bar strength indicator, and runs six requirement checks (12+ characters, uppercase, lowercase, number, symbol, no repeated characters). A suggestions panel offers specific improvement advice. No password is ever transmitted or stored.',
    howTo: [
      'Type or paste a password into the input field.',
      'Toggle the eye icon to show or hide the password text.',
      'Review the strength indicator (four bars), entropy in bits, and estimated crack time.',
      'Check the requirements list to see which criteria your password meets (12+ chars, uppercase, lowercase, number, symbol, no repeated characters).',
      'Read the suggestions panel for specific advice on improving your password.',
    ],
    benefits: [
      { title: 'Real-time entropy and crack-time estimation', description: 'The tool calculates entropy as (password length) times log2(character pool size) based on which character types are present. It estimates crack time at 10 billion guesses per second. Both update instantly as you type.' },
      { title: 'Six specific requirement checks', description: 'The tool checks for at least 12 characters, an uppercase letter, a lowercase letter, a number, a symbol, and no characters repeated three or more times in a row. Each check shows a pass/fail indicator.' },
      { title: 'Actionable improvement suggestions', description: 'The suggestions panel lists specific steps to strengthen your password, such as adding more characters, mixing character types, or avoiding repeated sequences. Suggestions update based on your current input.' },
      { title: 'Your password never leaves the browser', description: 'All analysis runs in local JavaScript. The password is not transmitted, stored, or logged. A note under the input field reminds you of this. The tool works offline once loaded.' },
    ],
    faqs: [
      { q: 'Is it safe to type my real password?', a: 'Yes. All analysis happens in your browser via local JavaScript. The password is never transmitted to any server, stored, or logged. A privacy note under the input field confirms this. You can also use the hide toggle to mask the text.' },
      { q: 'How is entropy calculated?', a: 'Entropy is calculated as (password length) times log2(character pool size). The pool size depends on which character types are present: 26 for lowercase, 26 for uppercase, 10 for numbers, 32 for symbols. A 16-character password with all four types has about 95 bits of entropy.' },
      { q: 'How accurate is the crack time estimate?', a: 'The estimate assumes 10 billion guesses per second, which approximates modern GPU cracking speed. Actual crack time depends on the hash algorithm used by the service, salt, and attack strategy. Treat the estimate as a rough comparison tool, not an exact prediction.' },
      { q: 'What does the "No repeated chars" check look for?', a: 'It detects any character repeated three or more times in a row (e.g., "aaa" or "111"). Repeated sequences weaken passwords because they reduce the effective entropy and are common in dictionary attacks.' },
      { q: 'Why does my password show as weak even though it is long?', a: 'Length alone does not guarantee strength. If the password uses only lowercase letters, the character pool is small (26), so entropy grows slowly. Adding uppercase, numbers, and symbols increases the pool, which dramatically increases entropy per character.' },
    ],
  },

  // ─── Developer Tools (hand-crafted) ────────────────────────
  'json-formatter': {
    whatIs: 'The JSON Formatter beautifies and minifies JSON data using JavaScript\'s native JSON.parse and JSON.stringify. Paste JSON into the input area, and the tool automatically parses and re-formats it with your chosen indentation (2 or 4 spaces). Click Beautify to pretty-print or Minify to compress to a single line. Syntax errors are caught and displayed with the specific error message from the JavaScript parser. Copy or download the formatted output.',
    howTo: [
      'Paste your JSON text into the input area on the left.',
      'The tool auto-formats as you type using the current indentation setting.',
      'Click Beautify to pretty-print with 2 or 4 space indentation, or Minify to compress to a single line.',
      'Switch between 2-space and 4-space indentation using the buttons in the toolbar.',
      'Copy the formatted output to your clipboard, or download it as "formatted.json".',
    ],
    benefits: [
      { title: 'Real-time formatting with auto-parse', description: 'The tool automatically parses and reformats your JSON as you type or change the indentation setting. You see the formatted output instantly without clicking a button, though Beautify and Minify buttons are available for explicit actions.' },
      { title: 'Beautify and minify in one tool', description: 'Switch between pretty-printed (2 or 4 space indentation) and minified (single-line, no whitespace) output with one click. Useful for alternating between development readability and production file-size optimization.' },
      { title: 'Precise syntax error reporting', description: 'When your JSON has a syntax error, the tool displays the exact error message from the JavaScript JSON.parse engine, including the position and nature of the error. This helps you find and fix issues quickly.' },
      { title: 'Copy and download without uploading', description: 'All parsing happens in your browser. No JSON data is sent to a server. Copy the formatted output to your clipboard or download it as "formatted.json" directly from the tool.' },
    ],
    faqs: [
      { q: 'What is the difference between Beautify and Minify?', a: 'Beautify adds indentation (2 or 4 spaces) and line breaks to make JSON human-readable. Minify removes all unnecessary whitespace and line breaks to produce the smallest possible single-line output, which is useful for production web files.' },
      { q: 'Does the tool validate my JSON?', a: 'Yes. The tool uses JSON.parse to parse your input. If there is a syntax error, it displays the exact error message from the JavaScript engine in the output area instead of formatted JSON. This makes it a combined formatter and validator.' },
      { q: 'Can I choose between 2-space and 4-space indentation?', a: 'Yes. The toolbar has buttons for 2 and 4 space indentation. Changing the indentation immediately reformats the output. The default is 2 spaces.' },
      { q: 'Does the tool handle nested objects and arrays?', a: 'Yes. JSON.stringify with the indentation parameter handles arbitrary nesting depth. Objects, arrays, strings, numbers, booleans, and null are all formatted correctly.' },
      { q: 'Is my JSON data sent to a server?', a: 'No. All parsing and formatting happens in your browser using JavaScript\'s native JSON.parse and JSON.stringify. No data is transmitted, stored, or logged. The tool works offline once the page is loaded.' },
      { q: 'Can I download the formatted JSON?', a: 'Yes. Click the download button to save the formatted output as "formatted.json". You can also copy it to your clipboard with the copy button.' },
    ],
  },
  // ─── Hand-crafted entries for remaining tools ──────────────
  'age-timeline': {
    whatIs: 'The Age Timeline Calculator shows your age broken down into years, months, weeks, days, hours, and minutes from your date of birth to today. It also calculates your next birthday and how many days remain until it arrives.',
    howTo: [
      'Enter your date of birth in the date picker.',
      'Optionally enter a target date if you want to calculate age as of a specific date rather than today.',
      'The tool instantly displays your age in multiple units and shows your next birthday countdown.',
      'Copy any of the values to use in documents, forms, or celebrations.',
    ],
    benefits: [
      { title: 'Multiple time units at once', description: 'See your age in years, months, weeks, days, hours, and minutes simultaneously, which is useful for milestone celebrations, legal forms, and trivia.' },
      { title: 'Next birthday countdown', description: 'Know exactly how many days until your next birthday, so you can plan celebrations or set reminders well in advance.' },
      { title: 'Works with any target date', description: 'Calculate age as of a future or past date, not just today. This is useful for eligibility checks (voting, retirement, school admission).' },
      { title: 'No data stored', description: 'Your date of birth is processed in your browser and never sent to a server, keeping personal information private.' },
    ],
    faqs: [
      { q: 'How is age calculated?', a: 'The tool counts complete years from your birth date to the target date, then adds remaining months, weeks, days, hours, and minutes. Leap years are accounted for in the calculation.' },
      { q: 'Can I calculate age between two dates?', a: 'Yes. Enter your birth date as the start and any other date as the target. The tool calculates the elapsed time between them in all units.' },
      { q: 'Is this accurate for legal purposes?', a: 'The calculation is mathematically accurate. For legal documents, always verify with the relevant authority, as some jurisdictions define age differently (e.g., East Asian age counting).' },
      { q: 'Does it account for time zones?', a: 'The tool uses your device\'s local time zone. For most purposes this is fine, but if you need UTC-based calculation, adjust for your timezone offset.' },
    ],
  },
  'area-converter': {
    whatIs: 'The Area Converter converts between square metres, square kilometres, square feet, acres, hectares, and square miles. Enter a value in one unit and instantly see it in all the others.',
    howTo: [
      'Select the unit you want to convert from in the "From" dropdown.',
      'Select the target unit in the "To" dropdown.',
      'Enter the value you want to convert.',
      'The result appears instantly. Click Copy Result to copy it to your clipboard.',
    ],
    benefits: [
      { title: 'All common area units', description: 'Square metres, square kilometres, square feet, acres, hectares, and square miles are all supported, covering metric and imperial systems.' },
      { title: 'Instant conversion', description: 'Results update as you type, with no submit button. Swap units with one click to reverse the conversion.' },
      { title: 'Useful for real estate and land', description: 'Property listings often mix units — acres in the US, hectares in Europe. Convert between them instantly to compare land sizes accurately.' },
      { title: 'Runs entirely in your browser', description: 'No internet connection needed for the conversion itself. The tool loads once and works offline.' },
    ],
    faqs: [
      { q: 'How accurate is the conversion?', a: 'The tool uses precise conversion factors (e.g., 1 acre = 4046.86 square metres). Results are accurate to 8 decimal places.' },
      { q: 'Can I convert square feet to acres?', a: 'Yes. Select square feet as the "From" unit and acres as the "To" unit. This is a common conversion for real estate in the US.' },
      { q: 'What is a hectare?', a: 'A hectare is 10,000 square metres or 2.471 acres. It is the standard land measurement unit in most of the world outside the US and UK.' },
      { q: 'Can I swap units quickly?', a: 'Yes. Click the swap button (the arrow between the two dropdowns) to instantly reverse the conversion direction.' },
    ],
  },
  'article-schema-generator': {
    whatIs: 'The Article Schema Generator creates JSON-LD structured data for blog posts and news articles. This schema helps Google understand your article content and can make your pages eligible for rich results in search.',
    howTo: [
      'Enter your article headline, description, and publication date.',
      'Add the author name, publisher name, and article URL.',
      'Optionally include an image URL and date modified.',
      'Copy the generated JSON-LD script tag and paste it into your page\'s <head> section.',
    ],
    benefits: [
      { title: 'Rich result eligibility', description: 'Article schema makes your pages eligible for enhanced appearances in Google Search, including author name, publication date, and image thumbnails.' },
      { title: 'Google News optimization', description: 'Google News uses article schema to identify and categorize news content. Proper schema improves your chances of inclusion in news results.' },
      { title: 'No schema knowledge needed', description: 'The tool handles JSON-LD syntax, proper nesting, and required fields. You just fill in your article details.' },
      { title: 'Valid JSON-LD output', description: 'The generated code follows Google\'s structured data guidelines for Article and NewsArticle types, reducing the risk of validation errors.' },
    ],
    faqs: [
      { q: 'What is the difference between Article and NewsArticle?', a: 'NewsArticle is a subtype of Article. Use NewsArticle for news content and Article for general blog posts. The tool supports both — use NewsArticle if your content is time-sensitive news.' },
      { q: 'Does article schema improve rankings?', a: 'Schema itself is not a direct ranking factor, but it helps Google understand your content, which can lead to better indexing and rich results that improve click-through rates.' },
      { q: 'Where do I paste the JSON-LD code?', a: 'Paste it inside the <head> section of your article page, wrapped in <script type="application/ld+json"> tags. The tool generates the full script tag for you.' },
      { q: 'Can I use this for product reviews?', a: 'For product reviews, use the Product Schema Generator or Review schema instead. Article schema is for editorial content, not commercial reviews.' },
    ],
  },
  'audio-metadata-viewer': {
    whatIs: 'The Audio Metadata Viewer displays embedded metadata from audio files, including title, artist, album, genre, year, and track number. It reads ID3 tags from MP3s and equivalent metadata from other formats directly in your browser.',
    howTo: [
      'Drag and drop an audio file (MP3, WAV, OGG, FLAC) into the upload zone.',
      'The tool reads the file\'s metadata tags instantly.',
      'Review the displayed metadata fields in the results panel.',
      'No download is needed — the metadata is read locally from the file.',
    ],
    benefits: [
      { title: 'Reads ID3 and Vorbis tags', description: 'The tool supports ID3v1 and ID3v2 tags (MP3) and Vorbis comments (OGG, FLAC), covering the most common audio metadata formats.' },
      { title: 'Files never uploaded', description: 'Audio files are read in your browser using the File API. No data is sent to any server, which matters for unreleased or copyrighted audio.' },
      { title: 'Quick metadata audit', description: 'Check if your audio files have correct tags before publishing to streaming platforms, podcasts, or music libraries. Missing or incorrect metadata causes distribution issues.' },
      { title: 'No software installation', description: 'View metadata without installing iTunes, Mp3tag, or other desktop tools. The viewer works in any modern browser.' },
    ],
    faqs: [
      { q: 'What metadata fields are displayed?', a: 'The tool shows title, artist, album, genre, year, track number, and any other tags embedded in the file. Not all files contain all fields — the tool shows what is present.' },
      { q: 'Can I edit the metadata?', a: 'No. This tool is read-only. It displays existing metadata but does not modify the file. Use a dedicated tag editor like Mp3tag for editing.' },
      { q: 'Does it support FLAC files?', a: 'Yes. The tool reads Vorbis comments from FLAC files, which is the standard metadata format for FLAC.' },
      { q: 'Why does my file show no metadata?', a: 'Some audio files, especially WAV files, do not embed metadata by default. If no tags are present, the tool will show empty fields. This is expected, not an error.' },
    ],
  },
  'background-remover': {
    whatIs: 'The Background Remover strips the background from an image, leaving only the foreground subject. It uses edge detection and color similarity algorithms to identify and remove the background, producing a transparent PNG.',
    howTo: [
      'Upload an image or drag and drop it into the tool.',
      'The tool analyzes the image and removes the background automatically.',
      'Review the result — the background is replaced with transparency.',
      'Download the transparent PNG for use in designs, presentations, or product listings.',
    ],
    benefits: [
      { title: 'No Photoshop needed', description: 'Remove backgrounds without desktop software. The tool works in your browser, which is faster and free for simple background removal tasks.' },
      { title: 'Transparent PNG output', description: 'The result is a PNG with alpha transparency, ready to place on any background in any design tool, presentation, or e-commerce listing.' },
      { title: 'Great for product photos', description: 'E-commerce platforms like Amazon and eBay require white or transparent backgrounds. Use this tool to prepare product images for listings.' },
      { title: 'Privacy-first processing', description: 'Images are processed locally in your browser. Personal photos and confidential product images never leave your device.' },
    ],
    faqs: [
      { q: 'How does the background removal work?', a: 'The tool uses edge detection and color similarity to distinguish the foreground subject from the background. For images with strong contrast between subject and background, results are clean. For complex backgrounds, some manual cleanup may be needed.' },
      { q: 'Does it work on all images?', a: 'It works best on images with a relatively uniform background (solid color, simple gradient). Images with busy or multi-colored backgrounds may produce less clean results.' },
      { q: 'Can I remove a specific color?', a: 'The tool automatically detects the background. For targeted color removal, use the Image Color Picker to identify the color, then use an image editor for precise removal.' },
      { q: 'What format is the output?', a: 'The result is a PNG with alpha transparency. PNG is the standard format for images with transparent backgrounds and is supported everywhere.' },
    ],
  },
  'base32-decoder': {
    whatIs: 'The Base32 Decoder converts Base32-encoded text back to its original form. Base32 uses 32 ASCII characters (A-Z and 2-7) to represent binary data, and is commonly used in TOTP authentication codes and DNS records.',
    howTo: [
      'Paste your Base32-encoded string into the input field.',
      'The tool decodes it instantly to plain text.',
      'Copy the decoded result to your clipboard.',
      'Use the decoded text in your application or verification system.',
    ],
    benefits: [
      { title: 'Instant decoding', description: 'Paste and decode in one step. No submit button needed — the decoded text appears as you type.' },
      { title: 'Useful for 2FA setup', description: 'Base32 is the encoding used for TOTP secrets in authenticator apps. Decode the secret to verify it matches your 2FA setup.' },
      { title: 'No data transmitted', description: 'Decoding happens entirely in your browser. Sensitive tokens and secrets are never sent to a server.' },
      { title: 'Handles padding', description: 'The tool handles both padded and unpadded Base32 input, so you do not need to manually add or remove padding characters.' },
    ],
    faqs: [
      { q: 'What is Base32 used for?', a: 'Base32 is used in TOTP and HOTP authentication (Google Authenticator, Authy), DNSSEC records, and some encoding systems where case-insensitivity is important.' },
      { q: 'Why Base32 instead of Base64?', a: 'Base32 uses only uppercase letters and digits (A-Z, 2-7), making it case-insensitive and easier to transcribe manually. Base64 is more compact but case-sensitive.' },
      { q: 'Can it decode RFC 4648 Base32?', a: 'Yes. The tool follows the RFC 4648 standard for Base32 decoding, which is the most common variant used in authentication and DNS.' },
      { q: 'What happens with invalid input?', a: 'If the input contains characters outside the Base32 alphabet, the tool shows an error. Fix the input and try again.' },
    ],
  },
  'base32-encoder': {
    whatIs: 'The Base32 Encoder converts plain text or binary data to Base32 encoding, which uses 32 ASCII characters (A-Z and 2-7). It is commonly used for TOTP authentication secrets and DNS records.',
    howTo: [
      'Type or paste the text you want to encode into the input field.',
      'The tool encodes it to Base32 instantly.',
      'Copy the encoded string to your clipboard.',
      'Use the encoded output in your authentication system or DNS configuration.',
    ],
    benefits: [
      { title: 'Instant encoding', description: 'The encoded result appears as you type, with no submit button. Copy it with one click.' },
      { title: 'Case-insensitive output', description: 'Base32 output uses only uppercase letters and digits, making it safe for case-insensitive systems and easy to transcribe or dictate.' },
      { title: 'Essential for 2FA systems', description: 'TOTP authenticator apps require secrets in Base32. Encode your shared secret to the correct format for QR code generation.' },
      { title: 'No server processing', description: 'Encoding is done in your browser. Sensitive data like authentication secrets never leave your device.' },
    ],
    faqs: [
      { q: 'What characters does Base32 use?', a: 'Base32 uses A-Z (uppercase) and 2-7 (digits), totaling 32 characters. This avoids ambiguous characters like 0, 1, O, and I.' },
      { q: 'Is Base32 encoding reversible?', a: 'Yes. Use the Base32 Decoder to convert the encoded string back to its original form. The encoding is lossless.' },
      { q: 'How much larger is Base32 than the original?', a: 'Base32 encoding increases data size by approximately 60% (8 bits become 5 characters). This is more than Base64 (33%) but less than hex (100%).' },
      { q: 'Can I encode binary data?', a: 'The tool encodes text input. For binary data, convert it to a byte string first, then encode. The tool handles UTF-8 text natively.' },
    ],
  },
  'bcrypt-generator': {
    whatIs: 'The Bcrypt Generator creates bcrypt password hashes from plain text. Bcrypt is a password hashing function designed to be slow, making it resistant to brute-force and rainbow table attacks. It includes a built-in salt and an adjustable cost factor.',
    howTo: [
      'Enter the password you want to hash.',
      'Set the cost factor (rounds) — higher is more secure but slower. 10 is standard, 12 is recommended for production.',
      'Click Generate to create the bcrypt hash.',
      'Copy the hash and store it in your database for password verification.',
    ],
    benefits: [
      { title: 'Built-in salt', description: 'Bcrypt automatically generates and embeds a unique salt in each hash, so you do not need to manage salts separately. This prevents rainbow table attacks.' },
      { title: 'Adjustable cost factor', description: 'The cost factor (rounds) lets you control how long hashing takes. As hardware gets faster, increase the cost to maintain security without changing your code.' },
      { title: 'Industry standard', description: 'Bcrypt is the most widely recommended password hashing algorithm. It is used by Rails, Django, Laravel, and most modern web frameworks.' },
      { title: 'Runs in your browser', description: 'Hashing is done locally using the Web Crypto API. Your password is never transmitted to a server.' },
    ],
    faqs: [
      { q: 'What cost factor should I use?', a: 'Start with 10 for development. For production, use 12 or higher. Each increment doubles the hashing time. Aim for a hash time of 250-500ms on your production server.' },
      { q: 'Is bcrypt better than SHA-256 for passwords?', a: 'Yes, for password storage. Bcrypt is intentionally slow, which makes brute-force attacks impractical. SHA-256 is fast, making it vulnerable to GPU-based cracking. Use SHA-256 for file checksums, not passwords.' },
      { q: 'Can I verify a password against a bcrypt hash?', a: 'The tool generates hashes only. To verify, use your framework\'s built-in bcrypt compare function (e.g., bcrypt.compare in Node.js). The hash contains the salt and cost factor, so verification is straightforward.' },
      { q: 'What is the salt in the hash?', a: 'The bcrypt hash format is $2b$cost$saltHash. The salt is the 22 characters after the cost. It is automatically extracted during verification.' },
    ],
  },
  'border-radius-generator': {
    whatIs: 'The Border Radius Generator creates CSS border-radius declarations with individual control over each corner. It outputs the shorthand syntax and lets you preview the rounded shape in real time.',
    howTo: [
      'Adjust the sliders for each corner (top-left, top-right, bottom-right, bottom-left).',
      'Toggle between pixels and percentages for different rounding effects.',
      'Watch the preview shape update in real time.',
      'Copy the generated CSS and paste it into your stylesheet.',
    ],
    benefits: [
      { title: 'Visual preview', description: 'See the rounded shape change as you adjust each corner, so you know exactly what the result looks like before copying the CSS.' },
      { title: 'Per-corner control', description: 'Set different radius values for each corner to create organic, asymmetric shapes that go beyond simple rounded rectangles.' },
      { title: 'Pixels or percentages', description: 'Use pixels for precise control or percentages for responsive rounding that scales with the element size. Percentages above 50% create ellipse and leaf shapes.' },
      { title: 'Clean CSS output', description: 'The tool outputs the shorthand border-radius syntax when all corners are the same, and the full 4-value syntax when they differ.' },
    ],
    faqs: [
      { q: 'What is the border-radius shorthand?', a: 'border-radius: 10px 20px 30px 40px; sets top-left, top-right, bottom-right, bottom-left respectively. If all values are the same, it simplifies to border-radius: 10px;.' },
      { q: 'How do I create a circle with border-radius?', a: 'Set border-radius: 50% on a square element. The tool makes this easy — set all corners to 50% and the preview shows a circle.' },
      { q: 'Can I use different units for each corner?', a: 'The tool uses one unit (px or %) for all corners. For mixed units, copy the generated CSS and edit individual values manually.' },
      { q: 'Does border-radius work on images?', a: 'Yes. Apply border-radius to any element, including images. Use overflow: hidden on the container to clip the image to the rounded shape.' },
    ],
  },
  'breadcrumb-schema-generator': {
    whatIs: 'The Breadcrumb Schema Generator creates JSON-LD structured data for breadcrumb navigation trails. This schema helps Google display breadcrumb paths in search results, improving click-through rates and site navigation clarity.',
    howTo: [
      'Enter each breadcrumb level — the page name and its URL.',
      'Add additional levels as needed (e.g., Home > Category > Subcategory > Page).',
      'Click Generate to produce the JSON-LD breadcrumb schema.',
      'Copy the output and paste it into your page\'s <head> section.',
    ],
    benefits: [
      { title: 'Breadcrumb rich results', description: 'Google can display breadcrumb trails in search results instead of (or alongside) the URL, making your listing more informative and clickable.' },
      { title: 'Improved site navigation', description: 'Breadcrumb schema helps search engines understand your site hierarchy, which can improve crawling and indexing of deep pages.' },
      { title: 'No schema expertise needed', description: 'The tool handles JSON-LD syntax, BreadcrumbList type, and ListItem nesting. You just provide the names and URLs.' },
      { title: 'Valid structured data', description: 'The output follows Google\'s BreadcrumbList schema specification, minimizing validation errors in Search Console.' },
    ],
    faqs: [
      { q: 'How many breadcrumb levels should I include?', a: 'Include all levels from the homepage to the current page. Most sites have 2-4 levels. Do not include the current page as the last item — Google guidelines say the last item should be the parent of the current page.' },
      { q: 'Where do I place the breadcrumb schema?', a: 'Add it to the <head> section of each page, wrapped in <script type="application/ld+json"> tags. The tool generates the complete script tag.' },
      { q: 'Do breadcrumbs improve SEO rankings?', a: 'Breadcrumb schema does not directly improve rankings, but it enhances how your page appears in search results, which can improve click-through rates.' },
      { q: 'Should I include the current page in the breadcrumb trail?', a: 'Google\'s guidelines recommend including the current page as the last item in the breadcrumb trail. Some implementations exclude it — check Google\'s current documentation.' },
    ],
  },
  'browser-information': {
    whatIs: 'The Browser Information tool displays technical details about your web browser, including user agent, screen resolution, viewport size, color depth, cookies enabled, JavaScript support, and installed browser plugins.',
    howTo: [
      'Open the tool — it automatically detects your browser information.',
      'Review the displayed details in the results panel.',
      'Copy any specific value you need for debugging or support purposes.',
      'No input is required — the tool reads your browser\'s properties directly.',
    ],
    benefits: [
      { title: 'Instant browser diagnostics', description: 'Quickly see your browser, version, operating system, and capabilities without navigating through browser settings menus or about: pages.' },
      { title: 'Useful for support tickets', description: 'When reporting a bug, paste your browser information so developers can reproduce the issue on the same browser and OS combination.' },
      { title: 'Screen and viewport details', description: 'See your screen resolution, viewport size, pixel ratio, and color depth — essential for responsive design testing and debugging layout issues.' },
      { title: 'Feature detection', description: 'Check whether cookies, JavaScript, and specific APIs are enabled in your browser, which helps diagnose why a website is not working.' },
    ],
    faqs: [
      { q: 'Is my browser information private?', a: 'All information is displayed locally in your browser. Nothing is sent to a server. The tool reads browser properties that any website can access.' },
      { q: 'Why do I need to know my user agent?', a: 'Your user agent string identifies your browser and OS to websites. Support teams often need it to diagnose compatibility issues. Some websites use it to serve different content.' },
      { q: 'What is the difference between screen and viewport?', a: 'Screen resolution is your monitor\'s total pixel dimensions. Viewport is the visible area of the web page, which is smaller because of browser chrome (address bar, tabs, scrollbars).' },
      { q: 'Can I change my browser information?', a: 'Some values like the user agent can be changed using browser extensions or developer tools. Screen resolution and OS cannot be changed from within a browser.' },
    ],
  },
  'business-day-calculator': {
    whatIs: 'The Business Day Calculator counts working days between two dates, excluding weekends and optionally holidays. It is useful for project planning, delivery estimates, SLA tracking, and contract deadlines.',
    howTo: [
      'Enter the start date and end date.',
      'Choose whether to exclude weekends (Saturday and Sunday).',
      'Optionally enter holiday dates to exclude from the count.',
      'The tool displays the total business days, calendar days, and weeks between the dates.',
    ],
    benefits: [
      { title: 'Accurate deadline calculation', description: 'Count actual working days rather than calendar days, so project deadlines and delivery estimates account for weekends and holidays.' },
      { title: 'Customizable holidays', description: 'Add your own holiday dates to match your country or organization\'s calendar. The tool excludes these from the business day count.' },
      { title: 'SLA and contract tracking', description: 'Service level agreements and contracts often specify business days. Use this tool to calculate whether a deadline was met or how many days remain.' },
      { title: 'Quick and offline', description: 'The calculation runs instantly in your browser. No need to open a spreadsheet or count days on a calendar.' },
    ],
    faqs: [
      { q: 'Does the tool know my country\'s holidays?', a: 'No. The tool does not include built-in holiday calendars. You enter the specific holiday dates you want to exclude. This gives you full control over which days count as holidays.' },
      { q: 'Can I count only weekdays (Monday-Friday)?', a: 'Yes. Enable the "Exclude weekends" option and the tool counts only Monday through Friday.' },
      { q: 'What if my start date is after my end date?', a: 'The tool handles this by calculating the absolute difference. The result is the same regardless of which date comes first.' },
      { q: 'Does it include or exclude the start and end dates?', a: 'The tool counts business days between the two dates, inclusive of both start and end dates. Adjust by one day if your convention differs.' },
    ],
  },
  'calendar': {
    whatIs: 'The Calendar tool is a simple monthly calendar for viewing dates, weekdays, and week numbers. Navigate between months and years to find any date quickly.',
    howTo: [
      'Use the previous and next arrows to navigate between months.',
      'Click on the month or year to jump to a specific date.',
      'Today\'s date is highlighted for quick reference.',
      'Use the calendar for date planning, scheduling, and reference.',
    ],
    benefits: [
      { title: 'Quick date reference', description: 'Check any date, weekday, or week number without opening a separate calendar app. The tool loads instantly in your browser.' },
      { title: 'No account needed', description: 'Unlike Google Calendar or Outlook, this tool requires no sign-in. It is a simple reference calendar for quick lookups.' },
      { title: 'Week number display', description: 'See ISO week numbers alongside dates, which is useful for project planning in European and international business contexts.' },
      { title: 'Keyboard accessible', description: 'Navigate with arrow keys and tab through months without a mouse, making the tool accessible for keyboard users.' },
    ],
    faqs: [
      { q: 'Can I add events to this calendar?', a: 'No. This is a reference calendar for viewing dates, not a scheduling tool. For events, use Google Calendar, Apple Calendar, or Outlook.' },
      { q: 'Does it show holidays?', a: 'No. The calendar shows dates and weekdays only. Holiday display varies by country, so the tool does not include holiday data.' },
      { q: 'What week numbering system does it use?', a: 'The tool displays ISO 8601 week numbers, which start on Monday and count week 1 as the week containing the first Thursday of the year.' },
      { q: 'Can I print the calendar?', a: 'Yes. Use your browser\'s print function (Ctrl+P or Cmd+P) to print the current month view.' },
    ],
  },
  'color-converter': {
    whatIs: 'The Color Converter converts between HEX, RGB, and HSL color formats. Enter a color in one format and instantly see it in all the others, with a live preview swatch.',
    howTo: [
      'Enter a HEX color code, or adjust the RGB sliders.',
      'The tool instantly converts to all three formats: HEX, RGB, and HSL.',
      'View the color swatch to see the exact color.',
      'Click Copy All to copy all three color values to your clipboard.',
    ],
    benefits: [
      { title: 'Three formats at once', description: 'See HEX, RGB, and HSL simultaneously, so you can use whichever format your project requires without a second conversion step.' },
      { title: 'Live color preview', description: 'A color swatch shows the exact color as you type or adjust values, so you can verify the color visually before copying.' },
      { title: 'Essential for design work', description: 'CSS supports HEX and RGB natively, while HSL is useful for creating color variations. Convert between them to match any design tool\'s output.' },
      { title: 'Interactive RGB sliders', description: 'Adjust R, G, and B values individually with sliders for fine-grained control, or type a HEX code for exact input.' },
    ],
    faqs: [
      { q: 'What is HSL?', a: 'HSL stands for Hue, Saturation, Lightness. Hue is the color itself (0-360 degrees on the color wheel), Saturation is intensity (0-100%), and Lightness is brightness (0-100%).' },
      { q: 'Can I convert from RGB to HEX?', a: 'Yes. Adjust the R, G, and B values and the HEX code updates automatically. Or use the dedicated RGB to HEX tool for a simpler interface.' },
      { q: 'Why would I use HSL instead of HEX?', a: 'HSL makes it easy to create color variations — change lightness for shades, saturation for intensity. HEX requires manual calculation for variations.' },
      { q: 'Does it support 3-digit HEX codes?', a: 'The tool accepts 6-digit HEX codes (#RRGGBB) and 3-digit codes (#RGB, which expand to #RRGGBB). It also accepts codes without the # prefix.' },
    ],
  },
  'cookie-viewer': {
    whatIs: 'The Cookie Viewer displays all cookies set by the current page in your browser. It shows cookie names, values, domains, paths, expiration dates, and security flags (HttpOnly, Secure, SameSite).',
    howTo: [
      'Open the tool — it reads document.cookie and displays all cookies for the current domain.',
      'Review the cookie details in the results table.',
      'Copy any cookie value you need for debugging.',
      'No input is required — the tool reads cookies automatically.',
    ],
    benefits: [
      { title: 'Debug authentication issues', description: 'Session cookies and auth tokens are a common source of login problems. View cookie values and expiration dates to diagnose authentication failures.' },
      { title: 'Privacy awareness', description: 'See exactly what data websites store in your browser. This helps you understand tracking and make informed privacy decisions.' },
      { title: 'Security flag inspection', description: 'Check whether cookies are set with Secure, HttpOnly, and SameSite flags, which are important for preventing XSS and CSRF attacks.' },
      { title: 'No extensions needed', description: 'View cookies without installing browser developer extensions. The tool reads cookies directly from the browser.' },
    ],
    faqs: [
      { q: 'Why can\'t I see HttpOnly cookies?', a: 'JavaScript (and this tool) cannot read HttpOnly cookies — that is the purpose of the HttpOnly flag. Only the server can set and read them. Use browser DevTools (Application > Cookies) to see all cookies including HttpOnly.' },
      { q: 'Can I delete cookies with this tool?', a: 'No. The tool is read-only. To delete cookies, use your browser\'s settings or DevTools. The tool displays cookie information for debugging and awareness.' },
      { q: 'What is the SameSite attribute?', a: 'SameSite controls whether cookies are sent with cross-site requests. SameSite=Strict prevents sending with any cross-site request. SameSite=Lax allows top-level navigation. SameSite=None requires the Secure flag.' },
      { q: 'Can I see cookies from other websites?', a: 'No. Browsers isolate cookies by domain. This tool can only read cookies set for the current domain, which is a security feature, not a limitation.' },
    ],
  },
  'countdown-timer': {
    whatIs: 'The Countdown Timer counts down from a target date and time, showing the remaining days, hours, minutes, and seconds. It is useful for event launches, deadlines, product releases, and personal milestones.',
    howTo: [
      'Enter the target date and time you want to count down to.',
      'Optionally give your countdown a name.',
      'The timer starts counting down immediately and updates every second.',
      'Keep the tab open to watch the countdown in real time.',
    ],
    benefits: [
      { title: 'Real-time precision', description: 'The countdown updates every second, showing exact time remaining. Useful for product launches, webinars, and event promotions.' },
      { title: 'Custom target date', description: 'Set any future date and time. The tool handles dates years in the future, not just the current day.' },
      { title: 'No sign-up or installation', description: 'Unlike countdown apps, this tool runs in your browser with no account or download. Bookmark it for quick access.' },
      { title: 'Visual urgency', description: 'Display the countdown on screen during live events or share your screen to create urgency for deadlines and launches.' },
    ],
    faqs: [
      { q: 'Does the countdown work when I close the tab?', a: 'No. The countdown runs in your browser tab. When you close or refresh the tab, the timer resets. For persistent countdowns, use a dedicated app or embed it in a page.' },
      { q: 'Can I set multiple countdowns?', a: 'The tool supports one countdown at a time. For multiple countdowns, open the tool in multiple tabs with different target dates.' },
      { q: 'Is the time accurate?', a: 'The countdown uses your device\'s system clock. If your clock is accurate, the countdown is accurate to the second. It does not sync with an internet time server.' },
      { q: 'What happens when the countdown reaches zero?', a: 'The timer displays zeros when it reaches the target. It does not play an alarm or notification — keep the tab visible to see when it reaches zero.' },
    ],
  },
  'csv-merge': {
    whatIs: 'The CSV Merge tool combines multiple CSV files into a single file. It reads the header row from the first file and appends data rows from all files, aligning columns by header name.',
    howTo: [
      'Upload two or more CSV files by dragging them into the upload zone.',
      'The tool reads the headers and data from each file.',
      'Click Merge to combine all files into one CSV.',
      'Download the merged CSV file.',
    ],
    benefits: [
      { title: 'No Excel needed', description: 'Merge CSV files without opening Excel or Google Sheets. The tool handles the merge in your browser, which is faster for large files.' },
      { title: 'Header alignment', description: 'The tool uses the first file\'s headers and aligns data from subsequent files by column name, so files with different column orders merge correctly.' },
      { title: 'Handles large files', description: 'Since processing is local, you can merge large CSVs (100MB+) without upload time or server memory limits.' },
      { title: 'Privacy-first', description: 'CSV data is processed entirely in your browser. Customer lists, financial data, and other sensitive content never leave your device.' },
    ],
    faqs: [
      { q: 'What if my CSV files have different columns?', a: 'The tool uses the headers from the first file. If subsequent files have different column names, those columns may be missing or misaligned. Ensure all files share the same column structure before merging.' },
      { q: 'Can I merge more than two CSV files?', a: 'Yes. Upload as many files as you need. The tool merges them in the order you provide them.' },
      { q: 'Does it handle quoted fields?', a: 'Yes. The tool\'s CSV parser handles quoted fields, embedded commas, and escaped quotes according to CSV standards.' },
      { q: 'Is there a file size limit?', a: 'There is no server-side limit. Browser memory is the practical limit — files over 500MB may cause performance issues depending on your device.' },
    ],
  },
  'csv-split': {
    whatIs: 'The CSV Split tool divides a large CSV file into multiple smaller files. You specify the number of rows per file, and the tool creates separate CSVs with headers included in each.',
    howTo: [
      'Upload your CSV file by dragging it into the upload zone.',
      'Specify the number of rows per output file.',
      'Click Split to create the smaller CSV files.',
      'Download each split file individually or as a batch.',
    ],
    benefits: [
      { title: 'Break up large datasets', description: 'CSV files with hundreds of thousands of rows are hard to email or open in Excel. Split them into manageable chunks that any tool can handle.' },
      { title: 'Headers preserved', description: 'Each split file includes the original header row, so every file is a valid, self-contained CSV that can be opened independently.' },
      { title: 'No server upload', description: 'The file is split in your browser. Sensitive data like customer lists or financial records stays on your device.' },
      { title: 'Customizable row count', description: 'Choose exactly how many rows per file — 100, 1,000, 10,000 — to match the requirements of your import tool or email attachment limit.' },
    ],
    faqs: [
      { q: 'How many rows should I split by?', a: 'For Excel compatibility, use 65,536 rows or fewer (older Excel limit) or 1,048,576 (modern Excel). For email, use 1,000-10,000 rows per file depending on your attachment size limit.' },
      { q: 'Does each split file have headers?', a: 'Yes. Every split file includes the original header row from the source CSV, so each file is independently usable.' },
      { q: 'Can I split by column instead of row?', a: 'No. The tool splits by row count only. For column-based splitting, use the CSV Editor to select and export specific columns.' },
      { q: 'What happens to the original file?', a: 'The original file is not modified. The tool creates new files from it. Your original CSV remains on your device unchanged.' },
    ],
  },
  'csv-to-excel': {
    whatIs: 'The CSV to Excel converter transforms CSV files into Excel-compatible spreadsheets. It parses CSV data and generates an .xlsx file with proper column formatting, readable by Excel, Google Sheets, and LibreOffice Calc.',
    howTo: [
      'Upload your CSV file or paste CSV data directly.',
      'The tool parses the CSV and displays a preview of the data.',
      'Click Convert to generate the Excel file.',
      'Download the .xlsx file and open it in Excel or Google Sheets.',
    ],
    benefits: [
      { title: 'Proper column separation', description: 'CSV files opened in Excel sometimes merge columns incorrectly. This tool generates a proper .xlsx with correct column boundaries, avoiding data parsing errors.' },
      { title: 'Handles quoted fields', description: 'The CSV parser correctly handles quoted fields, embedded commas, and escaped quotes, so data with commas in values is preserved accurately.' },
      { title: 'Works with large datasets', description: 'Conversion happens in your browser, so you can convert large CSVs without uploading to a server and waiting for processing.' },
      { title: 'No software installation', description: 'Convert CSV to Excel without having Excel installed. The tool generates the .xlsx format directly in your browser.' },
    ],
    faqs: [
      { q: 'Does it preserve number formatting?', a: 'The tool converts CSV values to Excel cells. Numbers remain as numbers, text as text. Advanced formatting (currency, dates) may need manual adjustment in Excel after conversion.' },
      { q: 'Can it handle multiple sheets?', a: 'No. The tool creates a single-sheet Excel file from one CSV. For multiple sheets, convert each CSV separately and merge them in Excel.' },
      { q: 'What delimiter does it support?', a: 'The tool supports comma-delimited CSV files. For tab-delimited or semicolon-delimited files, convert them to comma-delimited first.' },
      { q: 'Is the output compatible with Google Sheets?', a: 'Yes. The .xlsx format is compatible with Google Sheets, LibreOffice Calc, Apple Numbers, and Microsoft Excel.' },
    ],
  },
  'csv-to-json': {
    whatIs: 'The CSV to JSON Converter transforms CSV data into a JSON array of objects. The first row becomes the object keys (property names), and subsequent rows become the values.',
    howTo: [
      'Paste your CSV data into the input field, including a header row.',
      'Click Convert to JSON to parse and transform the data.',
      'Review the JSON output in the results panel.',
      'Copy the JSON array to your clipboard for use in your application.',
    ],
    benefits: [
      { title: 'Instant conversion', description: 'Convert CSV to JSON with one click. No need to write a parser or use a library — the tool handles it in your browser.' },
      { title: 'Header-aware parsing', description: 'The first row of your CSV becomes the JSON property names, so your output has meaningful keys instead of array indices.' },
      { title: 'Handles quoted fields', description: 'The parser correctly handles quoted CSV fields with embedded commas, newlines, and escaped quotes, which is essential for real-world CSV data.' },
      { title: 'No data uploaded', description: 'Conversion happens entirely in your browser. Your CSV data never leaves your device.' },
    ],
    faqs: [
      { q: 'What if my CSV has no header row?', a: 'The tool uses the first row as headers. If your CSV has no headers, add a header row before converting, or the first data row will be used as keys.' },
      { q: 'Are numbers converted from strings?', a: 'No. All CSV values are treated as strings in the JSON output. Use JavaScript parseInt or parseFloat in your application to convert numeric strings to numbers.' },
      { q: 'Can it handle nested JSON?', a: 'No. The tool produces a flat array of objects with string values. For nested structures, convert the flat JSON and then transform it in your application code.' },
      { q: 'What is the maximum CSV size?', a: 'There is no hard limit, but very large CSVs (100MB+) may slow down your browser. For most practical datasets (under 10MB), conversion is instant.' },
    ],
  },
  'docx-viewer': {
    whatIs: 'The DOCX Viewer opens and displays Microsoft Word documents (.docx) directly in your browser. It renders the document content including text, headings, tables, and basic formatting without requiring Word to be installed.',
    howTo: [
      'Drag and drop a .docx file into the upload zone, or click to browse.',
      'The tool parses the document and renders it in the viewer.',
      'Scroll through the document to read its contents.',
      'No download or software installation is needed.',
    ],
    benefits: [
      { title: 'No Word installation needed', description: 'View Word documents on any device without Microsoft Word, Office 365, or any other software. The viewer works in any modern browser.' },
      { title: 'Privacy-first', description: 'Documents are parsed and rendered in your browser. Confidential contracts, legal documents, and personal files never leave your device.' },
      { title: 'Quick preview', description: 'Need to check the contents of a .docx before downloading or forwarding? Open it in the viewer instantly without waiting for Word to launch.' },
      { title: 'Works on all platforms', description: 'Whether you are on Windows, Mac, Linux, or ChromeOS, the viewer renders .docx files consistently. No platform-specific software needed.' },
    ],
    faqs: [
      { q: 'Does it support .doc files?', a: 'No. The tool supports .docx (the XML-based format used since Word 2007). Older .doc files use a binary format that requires different parsing.' },
      { q: 'Are images and charts displayed?', a: 'The viewer renders text, headings, tables, and basic formatting. Embedded images and complex charts may not display fully, depending on the document structure.' },
      { q: 'Can I edit the document?', a: 'No. The viewer is read-only. To edit, download the file and open it in Word, Google Docs, or LibreOffice Writer.' },
      { q: 'Does it preserve formatting?', a: 'The viewer preserves text formatting (bold, italic, headings, lists) and table structure. Page layout and print-specific formatting may differ from Word\'s rendering.' },
    ],
  },
  'energy-converter': {
    whatIs: 'The Energy Converter converts between joules, kilojoules, calories, kilocalories, watt-hours, kilowatt-hours, and BTU. Enter a value in one unit and see it in all the others instantly.',
    howTo: [
      'Select the energy unit you want to convert from.',
      'Select the target unit you want to convert to.',
      'Enter the value to convert.',
      'The result appears instantly. Click Copy to copy it.',
    ],
    benefits: [
      { title: 'All common energy units', description: 'Joules, kilojoules, calories, kilocalories, watt-hours, kilowatt-hours, and BTU are all supported, covering scientific, nutritional, and electrical energy measurements.' },
      { title: 'Instant results', description: 'Conversion updates as you type. Swap units with one click to reverse the direction.' },
      { title: 'Useful for nutrition and physics', description: 'Convert between food calories (kcal) and joules for nutrition labels, or between watt-hours and BTU for HVAC and energy billing.' },
      { title: 'Runs offline', description: 'The conversion uses fixed mathematical factors. Once the page loads, no internet connection is needed.' },
    ],
    faqs: [
      { q: 'What is the difference between calories and kilocalories?', a: 'In nutrition, "calories" on food labels actually means kilocalories (kcal). 1 kcal = 1000 cal = 4184 joules. The tool converts both, so you can verify food label values.' },
      { q: 'How do I convert kWh to joules?', a: '1 kilowatt-hour = 3,600,000 joules. Select kWh as the "From" unit and joules as the "To" unit to see this conversion.' },
      { q: 'What is BTU?', a: 'BTU (British Thermal Unit) is used in HVAC to measure heat energy. 1 BTU = 1055.06 joules. It is common in air conditioner and heater specifications.' },
      { q: 'Are the conversions accurate?', a: 'Yes. The tool uses standard conversion factors (e.g., 1 cal = 4.184 J, 1 BTU = 1055.06 J). Results are accurate to 8 decimal places.' },
    ],
  },
  'excel-to-csv': {
    whatIs: 'The Excel to CSV Converter transforms Excel spreadsheet files (.xlsx) into CSV format. It reads each cell and exports the data as comma-separated values, which can be imported into databases, APIs, and other tools.',
    howTo: [
      'Upload your .xlsx file by dragging it into the upload zone.',
      'The tool reads the spreadsheet data from the file.',
      'Click Convert to generate the CSV output.',
      'Download or copy the resulting CSV data.',
    ],
    benefits: [
      { title: 'No Excel needed', description: 'Convert Excel files to CSV without having Excel installed. The tool reads the .xlsx format directly in your browser.' },
      { title: 'Universal format', description: 'CSV is the standard format for data import into databases, APIs, and analytics tools. Convert your Excel data to CSV for universal compatibility.' },
      { title: 'Privacy-first', description: 'Your spreadsheet is processed locally. Financial data, customer lists, and other sensitive content never leave your device.' },
      { title: 'Fast and simple', description: 'No need to open Excel, export manually, and deal with format dialogs. Upload, convert, and download in seconds.' },
    ],
    faqs: [
      { q: 'Does it convert all sheets?', a: 'The tool converts the first (active) sheet. If your workbook has multiple sheets, convert each one separately by opening the file and selecting the desired sheet.' },
      { q: 'Are formulas preserved?', a: 'No. CSV does not support formulas. The tool exports the computed values of cells, not the formulas. If a cell contains a formula, its result value is exported.' },
      { q: 'Does it handle formatting?', a: 'No. CSV is plain text with no formatting. Cell colors, fonts, and number formats are lost in conversion. Only the raw data values are preserved.' },
      { q: 'Can it convert .xls files?', a: 'The tool supports .xlsx (Excel 2007+). Older .xls files use a different binary format. Save your .xls file as .xlsx in Excel first, then convert.' },
    ],
  },
  'excel-viewer': {
    whatIs: 'The Excel Viewer opens and displays .xlsx spreadsheet files in your browser. It renders cell data, formulas, and basic formatting in a grid view, without requiring Excel to be installed.',
    howTo: [
      'Drag and drop an .xlsx file into the upload zone, or click to browse.',
      'The tool parses the spreadsheet and displays it in a grid.',
      'Scroll through the data to review cell contents.',
      'No download or software installation is needed.',
    ],
    benefits: [
      { title: 'No Excel required', description: 'View spreadsheets on any device without Microsoft Excel or Office 365. The viewer works in any modern browser.' },
      { title: 'Privacy-first', description: 'Spreadsheets are parsed in your browser. Financial data, employee records, and other sensitive files never leave your device.' },
      { title: 'Quick preview', description: 'Need to check a spreadsheet\'s contents before downloading or sharing? Open it in the viewer instantly without launching Excel.' },
      { title: 'Cross-platform', description: 'Whether you are on Windows, Mac, Linux, or a Chromebook, the viewer renders .xlsx files consistently.' },
    ],
    faqs: [
      { q: 'Does it support .xls files?', a: 'No. The tool supports .xlsx (Excel 2007+ format). Older .xls files use a binary format that requires different parsing.' },
      { q: 'Are formulas displayed?', a: 'The viewer shows computed cell values. If a cell contains a formula, its result is displayed, not the formula text.' },
      { q: 'Can I edit the spreadsheet?', a: 'No. The viewer is read-only. To edit, download the file and open it in Excel, Google Sheets, or LibreOffice Calc.' },
      { q: 'Does it show charts and images?', a: 'The viewer displays cell data in a grid. Embedded charts, images, and complex formatting may not render fully.' },
    ],
  },
  'faq-schema-generator': {
    whatIs: 'The FAQ Schema Generator creates JSON-LD structured data for FAQ pages. This schema makes your questions and answers eligible for rich results in Google Search, displaying them directly in search listings.',
    howTo: [
      'Enter each question and its answer in the input fields.',
      'Click Add Question to include more Q&A pairs.',
      'Click Generate to produce the JSON-LD FAQ schema.',
      'Copy the output and paste it into your page\'s <head> section.',
    ],
    benefits: [
      { title: 'FAQ rich results', description: 'Google can display your FAQs directly in search results, giving your listing more space and increasing click-through rates without requiring a click through to your page.' },
      { title: 'Voice search optimization', description: 'FAQ schema helps voice assistants (Google Assistant, Alexa) find answers to user questions, increasing your chances of being the spoken answer.' },
      { title: 'No schema knowledge needed', description: 'The tool handles JSON-LD syntax, Question/Answer types, and proper nesting. You just provide the questions and answers.' },
      { title: 'Valid structured data', description: 'The output follows Google\'s FAQPage schema specification, minimizing validation errors in Search Console\'s Rich Results Test.' },
    ],
    faqs: [
      { q: 'How many questions can I include?', a: 'Google has not specified a maximum, but FAQ rich results typically show 2-4 questions in search. Include the most important questions first. There is no technical limit in the schema.' },
      { q: 'Can I use FAQ schema on any page?', a: 'Google requires that the FAQ content is visible on the page. Do not use FAQ schema for questions that are not displayed in the page content. This can result in manual action.' },
      { q: 'Where do I place the FAQ schema?', a: 'Add it to the <head> section of the page containing the FAQ content, wrapped in <script type="application/ld+json"> tags.' },
      { q: 'Can I combine FAQ schema with other schema types?', a: 'Yes. You can include multiple JSON-LD blocks on the same page. FAQ schema can coexist with Article, Product, or Breadcrumb schema.' },
    ],
  },
  'favicon-generator': {
    whatIs: 'The Favicon Generator creates favicon files from an uploaded image. It produces the standard favicon.ico format and modern PNG favicons in multiple sizes (16x16, 32x32, 180x180 for Apple Touch Icon).',
    howTo: [
      'Upload a square image (PNG, JPG, or SVG) to use as your favicon.',
      'The tool generates favicon files in multiple sizes.',
      'Download the favicon package.',
      'Add the favicon files to your website root and reference them in your HTML <head>.',
    ],
    benefits: [
      { title: 'Multiple sizes generated', description: 'The tool produces favicons for different contexts: browser tabs (16x16, 32x32), Apple Touch Icons (180x180), and modern PWA icons (192x192, 512x512).' },
      { title: 'No design software needed', description: 'Create favicons from any image without Photoshop or GIMP. Upload a logo or image and the tool handles resizing and format conversion.' },
      { title: 'Professional branding', description: 'A favicon makes your site recognizable in browser tabs, bookmarks, and home screen shortcuts. Generate one in seconds instead of manually resizing images.' },
      { title: 'Processed in your browser', description: 'Image processing is done locally using Canvas. Your logo or brand image is never uploaded to a server.' },
    ],
    faqs: [
      { q: 'What image should I use?', a: 'Use a square image for best results. A simple logo or icon works better than a complex photo, since favicons are displayed at very small sizes (16x16 pixels).' },
      { q: 'What sizes do I need?', a: 'For maximum compatibility, include 16x16 (browser tab), 32x32 (new tab page), 180x180 (Apple Touch Icon), 192x192 (Android), and 512x512 (PWA). The tool generates all of these.' },
      { q: 'How do I add the favicon to my site?', a: 'Place the favicon files in your site root and add <link rel="icon" href="/favicon.ico"> and <link rel="apple-touch-icon" href="/apple-touch-icon.png"> to your HTML <head>.' },
      { q: 'Does it support SVG favicons?', a: 'Modern browsers support SVG favicons via <link rel="icon" type="image/svg+xml">. The tool focuses on ICO and PNG formats for maximum compatibility.' },
    ],
  },
  'find-and-replace': {
    whatIs: 'The Find and Replace tool searches for text patterns in your input and replaces them with new text. It supports plain text matching and regular expressions, with case-sensitive and case-insensitive options.',
    howTo: [
      'Paste your text into the input field.',
      'Enter the text or regex pattern to find.',
      'Enter the replacement text.',
      'Toggle Use Regex and Case Sensitive as needed. The result updates instantly with a replacement count.',
    ],
    benefits: [
      { title: 'Regex support', description: 'Use regular expressions for complex pattern matching — replace all email addresses, phone numbers, or custom patterns in one operation.' },
      { title: 'Live replacement count', description: 'See exactly how many replacements were made, so you can verify the find pattern matched the intended text before copying the result.' },
      { title: 'Case-sensitive option', description: 'Toggle case sensitivity to match exact capitalization or ignore it. This is essential when replacing proper nouns or code identifiers.' },
      { title: 'No data uploaded', description: 'All text processing happens in your browser. Your content never leaves your device.' },
    ],
    faqs: [
      { q: 'How do I use regex for find and replace?', a: 'Enable the "Use Regex" checkbox and enter a valid regular expression in the Find field. Use capture groups ($1, $2) in the Replace field to reference matched groups.' },
      { q: 'What regex syntax is supported?', a: 'The tool uses JavaScript RegExp syntax. This includes character classes, quantifiers, anchors, capture groups, and common flags (g, i, m).' },
      { q: 'Can I replace line breaks?', a: 'Yes. Use \\n in the Find field to match newlines. In regex mode, use \\n or \\r\\n depending on your line ending format.' },
      { q: 'Is there a text size limit?', a: 'There is no hard limit, but very large texts (1MB+) may slow the real-time preview. For best performance, process texts under 500KB.' },
    ],
  },
  'fuel-converter': {
    whatIs: 'The Fuel Converter converts between miles per gallon (MPG), litres per 100km (L/100km), and kilometres per litre (km/L). Enter a value in one unit and see it in all three fuel efficiency formats.',
    howTo: [
      'Enter the fuel efficiency value you want to convert.',
      'Select the input unit (MPG, L/100km, or km/L).',
      'The tool displays the converted values in all three units.',
      'Click Copy All to copy all three values to your clipboard.',
    ],
    benefits: [
      { title: 'Three fuel economy standards', description: 'MPG (US), L/100km (Europe, Australia), and km/L (Asia) are all supported. Convert between any of them for international vehicle comparisons.' },
      { title: 'Car shopping made easy', description: 'When comparing cars from different regions, fuel economy is reported in different units. Convert instantly to compare apples to apples.' },
      { title: 'Instant results', description: 'All three values update as you type. No submit button needed.' },
      { title: 'Accurate conversion factors', description: 'The tool uses the standard conversion: 1 MPG = 235.215 / L/100km. Results are accurate to 2 decimal places.' },
    ],
    faqs: [
      { q: 'Is MPG the same in the US and UK?', a: 'No. US MPG uses US gallons (3.785 litres), while UK MPG uses imperial gallons (4.546 litres). This tool uses US MPG. For UK MPG, multiply the result by 1.201.' },
      { q: 'Which is better, MPG or L/100km?', a: 'L/100km is more intuitive — lower is better. MPG is counterintuitive — higher is better. Most of the world uses L/100km.' },
      { q: 'How do I convert km/L to MPG?', a: 'Select km/L as the input unit and MPG as the output. The tool shows the conversion: 1 km/L = 2.352 MPG (US).' },
      { q: 'Can I use this for electric vehicles?', a: 'No. EVs use kWh/100km or MPGe (miles per gallon equivalent). This tool is for internal combustion engine vehicles only.' },
    ],
  },
  'glassmorphism-generator': {
    whatIs: 'The Glassmorphism Generator creates CSS for the glassmorphism design effect — a frosted glass appearance with backdrop blur, semi-transparent background, and subtle borders. It produces ready-to-paste CSS with a live preview.',
    howTo: [
      'Adjust the background opacity, blur amount, and border opacity sliders.',
      'Choose a background color for the glass effect.',
      'Watch the preview card update in real time.',
      'Copy the generated CSS and paste it into your project.',
    ],
    benefits: [
      { title: 'Live visual preview', description: 'See the glassmorphism effect change as you adjust settings, so you know exactly what the result looks like before copying the CSS.' },
      { title: 'Backdrop-filter support', description: 'The tool generates the backdrop-filter CSS property, which creates the frosted glass blur effect. It includes the -webkit prefix for Safari compatibility.' },
      { title: 'Modern UI design trend', description: 'Glassmorphism is used by Apple (macOS, iOS), Microsoft (Windows 11), and modern web apps. Generate the effect for your own interfaces.' },
      { title: 'Copy-ready CSS', description: 'The output includes all necessary properties: background, backdrop-filter, border, and border-radius. Paste it directly into your stylesheet.' },
    ],
    faqs: [
      { q: 'What is backdrop-filter?', a: 'backdrop-filter applies a graphical effect (blur, brightness, contrast) to the area behind an element. It is the key property for glassmorphism. It is supported in all modern browsers including Safari (with -webkit prefix).' },
      { q: 'Does glassmorphism work on all browsers?', a: 'Modern browsers (Chrome 76+, Firefox 103+, Safari 9+) support backdrop-filter. Older browsers show a semi-transparent background without the blur effect.' },
      { q: 'How do I make the glass effect more prominent?', a: 'Increase the blur value (try 10-20px) and reduce the background opacity (try 10-30%). A subtle light border (1px solid rgba(255,255,255,0.2)) enhances the glass appearance.' },
      { q: 'Can I use this for cards and modals?', a: 'Yes. Glassmorphism works well for cards, modals, navigation bars, and overlay panels. The effect is most visible when the element is over a colorful or image background.' },
    ],
  },
  'hash-compare': {
    whatIs: 'The Hash Compare tool calculates and compares hash values of two text inputs or files. It supports MD5, SHA-1, SHA-256, and SHA-512, and highlights whether the hashes match or differ.',
    howTo: [
      'Paste two text strings into the left and right input fields, or upload two files.',
      'Select the hash algorithm (MD5, SHA-1, SHA-256, or SHA-512).',
      'The tool computes hashes for both inputs and compares them.',
      'The result shows whether the hashes match, with a visual indicator.',
    ],
    benefits: [
      { title: 'Verify file integrity', description: 'Compare hashes of downloaded files against published checksums to verify the file was not corrupted or tampered with during download.' },
      { title: 'Detect changes', description: 'Compare two versions of a file or text to see if they are identical. Any difference, even a single character, produces a completely different hash.' },
      { title: 'Multiple algorithms', description: 'Choose from MD5, SHA-1, SHA-256, and SHA-512. SHA-256 is recommended for security-sensitive verification; MD5 is fine for quick checks.' },
      { title: 'Runs in your browser', description: 'Hashing is done locally using the Web Crypto API. Your data and files never leave your device.' },
    ],
    faqs: [
      { q: 'Which hash algorithm should I use?', a: 'For file integrity checks, SHA-256 is the standard. For security-sensitive verification, use SHA-256 or SHA-512. MD5 and SHA-1 are deprecated for security but fine for quick comparisons.' },
      { q: 'Can I compare files of different sizes?', a: 'Yes. The tool hashes whatever input you provide. Files of different sizes will always produce different hashes (unless one is empty).' },
      { q: 'What does it mean if hashes match?', a: 'If two hashes match, the inputs are identical at the byte level. Even a single character difference produces a completely different hash (the avalanche effect).' },
      { q: 'Is hashing secure?', a: 'Hashing is one-way — you cannot derive the original input from the hash. However, MD5 and SHA-1 have known collision vulnerabilities. For security purposes, use SHA-256 or higher.' },
    ],
  },
  'hex-to-rgb': {
    whatIs: 'The HEX to RGB Converter transforms a HEX color code into its RGB (red, green, blue) equivalent. It includes a color picker for visual selection and displays the result in the standard rgb() format.',
    howTo: [
      'Enter a HEX color code (e.g., #6366f1) or use the color picker.',
      'The tool instantly converts it to the rgb(r, g, b) format.',
      'Copy the RGB result to your clipboard.',
      'Use the RGB value in your CSS, design tool, or application.',
    ],
    benefits: [
      { title: 'Visual color picker', description: 'Use the native color picker to select a color visually, then see its RGB value instantly. No need to know the HEX code in advance.' },
      { title: 'Instant conversion', description: 'The RGB value updates as you type the HEX code. No submit button needed.' },
      { title: 'Essential for CSS and design', description: 'CSS supports both HEX and RGB, but some design tools and APIs require RGB. Convert between them instantly.' },
      { title: 'Handles 3-digit and 6-digit HEX', description: 'The tool accepts both #RGB (3-digit, which expands to #RRGGBB) and #RRGGBB (6-digit) formats, with or without the # prefix.' },
    ],
    faqs: [
      { q: 'What is the rgb() format?', a: 'RGB values are written as rgb(red, green, blue) where each value is 0-255. For example, rgb(99, 102, 241) is a medium blue.' },
      { q: 'Can I convert RGB back to HEX?', a: 'Yes. Use the RGB to HEX tool for the reverse conversion. Or use the Color Converter, which shows all three formats simultaneously.' },
      { q: 'Does it support alpha transparency?', a: 'This tool converts solid colors only. For transparency, use rgba(r, g, b, a) where a is 0-1. You can add the alpha value manually after conversion.' },
      { q: 'What HEX formats are accepted?', a: 'The tool accepts #RRGGBB (6-digit), #RGB (3-digit), with or without the # prefix. Invalid hex values produce no output.' },
    ],
  },
  'hreflang-generator': {
    whatIs: 'The Hreflang Generator creates hreflang link tags for international SEO. These tags tell search engines which language and region version of a page to show to users, preventing duplicate content issues across localized pages.',
    howTo: [
      'Enter the default (canonical) URL for your page.',
      'Add language-region pairs (e.g., en-US, en-GB, fr-FR) and their corresponding URLs.',
      'Click Generate to produce the hreflang link tags.',
      'Copy the output and paste it into your page\'s <head> section.',
    ],
    benefits: [
      { title: 'International SEO compliance', description: 'Hreflang tags are required by Google for multilingual and multi-regional sites. They ensure users see the correct language version in search results.' },
      { title: 'Prevents duplicate content penalties', description: 'Without hreflang, Google may see localized pages as duplicates. Hreflang tags clarify that the pages are intentionally different versions of the same content.' },
      { title: 'No manual tag writing', description: 'The tool generates properly formatted link rel="alternate" hreflang="xx-XX" tags, including the mandatory x-default tag for fallback.' },
      { title: 'Includes x-default', description: 'The tool automatically adds the x-default hreflang tag, which tells Google which URL to show for unmatched languages. This is a Google requirement.' },
    ],
    faqs: [
      { q: 'What is the x-default tag?', a: 'x-default is a special hreflang value that tells Google which URL to show when the user\'s language does not match any specified variant. It is required by Google for hreflang implementations.' },
      { q: 'What language-region codes should I use?', a: 'Use ISO 639-1 language codes and ISO 3166-1 alpha-2 country codes (e.g., en-US, fr-FR, de-DE). For language-only targeting, use just the language code (e.g., en, fr).' },
      { q: 'Where do I place hreflang tags?', a: 'Add them to the <head> section of each page. Each page must reference all other language versions, including itself. The tool generates all tags for you.' },
      { q: 'Can I use hreflang with subdomains?', a: 'Yes. Hreflang works with subdomains (en.example.com, fr.example.com), subdirectories (example.com/en/, example.com/fr/), or ccTLDs (example.fr). The URLs you enter determine the structure.' },
    ],
  },
  'html-to-text': {
    whatIs: 'The HTML to Text Converter strips HTML tags from your input and returns plain text. It removes all markup, scripts, and styles, leaving only the visible text content.',
    howTo: [
      'Paste your HTML code into the input field.',
      'The tool instantly converts it to plain text, removing all tags.',
      'Copy the plain text result to your clipboard.',
      'Use the text in emails, documentation, or plain-text formats.',
    ],
    benefits: [
      { title: 'Clean text extraction', description: 'The tool removes HTML tags, script tags, and style tags, leaving only the text content that would be visible in a browser.' },
      { title: 'Email and documentation', description: 'Convert HTML emails or web content to plain text for plain-text email formats, documentation, or content migration.' },
      { title: 'No manual cleanup', description: 'Removing HTML tags by hand is tedious and error-prone. The tool handles it instantly, including nested tags and attributes.' },
      { title: 'Runs in your browser', description: 'Conversion uses the browser DOM API. Your HTML is processed locally and never uploaded.' },
    ],
    faqs: [
      { q: 'Does it preserve formatting?', a: 'No. The tool extracts plain text only. Line breaks, bold, italic, and other formatting are lost. For formatted output, use the HTML Formatter or Markdown Preview tools.' },
      { q: 'Are scripts and styles removed?', a: 'Yes. The tool removes <script> and <style> tags and their contents before extracting text, so JavaScript and CSS code do not appear in the output.' },
      { q: 'Can it handle malformed HTML?', a: 'The tool uses the browser\'s DOM parser, which is tolerant of malformed HTML. It extracts whatever text the browser can render from the input.' },
      { q: 'Does it convert entities?', a: 'Yes. HTML entities like &amp; and &lt; are decoded to their character equivalents (& and <) in the output text.' },
    ],
  },
  'http-header-viewer': {
    whatIs: 'The HTTP Header Viewer displays the HTTP response headers from a URL. It shows status code, content type, cache directives, security headers, and server information, which is useful for debugging and security auditing.',
    howTo: [
      'Enter a URL (including https://) that you want to inspect.',
      'Click Check to fetch the HTTP headers.',
      'Review the response headers in the results panel.',
      'Copy any header value you need for debugging.',
    ],
    benefits: [
      { title: 'Security header audit', description: 'Check whether your site has essential security headers: Content-Security-Policy, Strict-Transport-Security, X-Frame-Options, and X-Content-Type-Options.' },
      { title: 'Debug caching issues', description: 'Inspect Cache-Control, ETag, and Last-Modified headers to diagnose caching problems that cause stale content or excessive server load.' },
      { title: 'Server identification', description: 'See what server software and framework a site is running via the Server and X-Powered-By headers, which is useful for competitive analysis and security research.' },
      { title: 'No curl needed', description: 'View HTTP headers without using curl, wget, or browser DevTools. The tool provides a clean, readable interface for header inspection.' },
    ],
    faqs: [
      { q: 'Can I view headers for any website?', a: 'The tool fetches headers from URLs that allow cross-origin requests. Some sites may block cross-origin header inspection due to CORS policies. For your own sites, it works reliably.' },
      { q: 'What security headers should I look for?', a: 'Content-Security-Policy (XSS protection), Strict-Transport-Security (HTTPS enforcement), X-Frame-Options (clickjacking prevention), and X-Content-Type-Options (MIME sniffing prevention).' },
      { q: 'Does it follow redirects?', a: 'The tool shows the final response headers after any redirects. The status code reflects the final response, not intermediate redirects.' },
      { q: 'Is my URL logged?', a: 'The tool fetches the URL directly from your browser. The URL is not stored or logged by this tool. However, the target server sees the request.' },
    ],
  },
  'image-blur': {
    whatIs: 'The Image Blur tool applies a Gaussian-style blur effect to your image using the Canvas API. Adjust the blur intensity with a slider and download the result — all processing happens in your browser.',
    howTo: [
      'Upload an image or drag and drop it into the tool.',
      'Adjust the blur slider to control the intensity (0-20px).',
      'Preview the blurred image in real time.',
      'Click Download to save the blurred image.',
    ],
    benefits: [
      { title: 'Privacy masking', description: 'Blur faces, license plates, or sensitive information in screenshots before sharing them publicly. The blur makes the content unrecognizable.' },
      { title: 'Background effects', description: 'Create a blurred background for text overlays, hero sections, or design compositions. Blurred backgrounds make foreground text more readable.' },
      { title: 'Real-time preview', description: 'See the blur effect update instantly as you adjust the slider. Fine-tune before downloading.' },
      { title: 'No upload required', description: 'Images are processed locally using Canvas. Your photos never leave your device.' },
    ],
    faqs: [
      { q: 'How does the blur work?', a: 'The tool uses the CSS filter: blur() function applied via Canvas. The slider controls the blur radius in pixels. Higher values produce a stronger blur.' },
      { q: 'Can I blur only part of the image?', a: 'No. The tool applies blur to the entire image. For partial blurring, use a desktop editor like Photoshop or GIMP.' },
      { q: 'What is the maximum blur?', a: 'The slider goes up to 20px, which produces a very strong blur. For most privacy masking, 10-15px is sufficient.' },
      { q: 'Does blurring reduce image quality?', a: 'The blurred image is rendered at the same resolution as the original. The blur is a visual effect, not a resolution reduction. Quality is preserved.' },
    ],
  },
  'image-border-creator': {
    whatIs: 'The Image Border Creator adds a customizable border around your image. Choose border width, color, and style, then download the result — all processed locally in your browser using the Canvas API.',
    howTo: [
      'Upload an image or drag and drop it into the tool.',
      'Set the border width in pixels.',
      'Choose a border color using the color picker.',
      'Click Apply to add the border, then download the result.',
    ],
    benefits: [
      { title: 'Customizable borders', description: 'Control border width, color, and style to match your design needs. Create thin elegant frames or bold decorative borders.' },
      { title: 'Framing for presentation', description: 'Add a border to images before placing them in presentations, documents, or social media posts. A border can make images look more polished and intentional.' },
      { title: 'No Photoshop needed', description: 'Add borders without desktop image editing software. The tool handles it in your browser, which is faster for simple border tasks.' },
      { title: 'Privacy-first', description: 'Images are processed locally using Canvas. Your photos never leave your device.' },
    ],
    faqs: [
      { q: 'Can I add different borders to each side?', a: 'No. The tool applies a uniform border to all four sides. For per-side borders, use a desktop image editor.' },
      { q: 'Does the border increase the image dimensions?', a: 'Yes. The border is added outside the original image, so the output dimensions increase by twice the border width (once for each side).' },
      { q: 'What colors are available?', a: 'The tool uses a color picker, so you can choose any color. Common choices are white, black, and gray for clean frames, or brand colors for marketing materials.' },
      { q: 'Can I add a rounded border?', a: 'The tool creates rectangular borders. For rounded corners, use the Image Rounded Corners tool first, then add a border.' },
    ],
  },
  'image-brightness-adjuster': {
    whatIs: 'The Image Brightness Adjuster lightens or darkens your image using a brightness slider. The effect is applied via the Canvas API in your browser, with real-time preview before download.',
    howTo: [
      'Upload an image or drag and drop it into the tool.',
      'Drag the brightness slider to lighten (above 100%) or darken (below 100%) the image.',
      'Preview the result in real time.',
      'Click Download to save the adjusted image.',
    ],
    benefits: [
      { title: 'Fix dark or overexposed photos', description: 'Brighten dark photos or dim overexposed ones without desktop software. The slider gives precise control over the brightness level.' },
      { title: 'Real-time preview', description: 'See the brightness adjustment update instantly as you drag the slider. Fine-tune before downloading.' },
      { title: 'Full quality preservation', description: 'The adjusted image is rendered at the original resolution. Brightness adjustment does not reduce image dimensions or introduce compression artifacts.' },
      { title: 'Processed locally', description: 'Images are processed using Canvas in your browser. Your photos never leave your device.' },
    ],
    faqs: [
      { q: 'What does 100% brightness mean?', a: '100% is the original brightness. Values above 100% lighten the image, values below 100% darken it. 0% makes the image completely black.' },
      { q: 'Can I brighten a very dark photo?', a: 'Yes, but brightening a dark photo also amplifies noise. For best results, start with the brightest version of the photo you have rather than brightening a very dark one.' },
      { q: 'Does it work on PNG with transparency?', a: 'Yes. The tool preserves alpha transparency. Only the visible pixels are adjusted; transparent areas remain transparent.' },
      { q: 'Can I undo the adjustment?', a: 'Click "New Image" to reset and upload the original again. The tool does not modify your original file.' },
    ],
  },
  'image-contrast-adjuster': {
    whatIs: 'The Image Contrast Adjuster increases or decreases the contrast of your image using a slider. Higher contrast makes darks darker and lights lighter; lower contrast makes the image flatter.',
    howTo: [
      'Upload an image or drag and drop it into the tool.',
      'Drag the contrast slider to increase (above 100%) or decrease (below 100%) contrast.',
      'Preview the result in real time.',
      'Click Download to save the adjusted image.',
    ],
    benefits: [
      { title: 'Enhance dull photos', description: 'Increase contrast to make flat, washed-out photos pop with deeper shadows and brighter highlights. This is one of the most common photo adjustments.' },
      { title: 'Real-time preview', description: 'See the contrast adjustment update instantly as you drag the slider. Fine-tune before downloading.' },
      { title: 'Full resolution output', description: 'The adjusted image is rendered at the original resolution. Contrast adjustment does not reduce image quality.' },
      { title: 'No server processing', description: 'Images are processed locally using Canvas. Your photos never leave your device.' },
    ],
    faqs: [
      { q: 'What does 100% contrast mean?', a: '100% is the original contrast. Values above 100% increase contrast (more difference between light and dark). Values below 100% decrease contrast (flatter image).' },
      { q: 'Should I increase or decrease contrast?', a: 'Most photos benefit from a slight contrast increase (110-120%) for a punchier look. Decrease contrast for a soft, muted aesthetic or to fix harsh lighting.' },
      { q: 'Can I combine brightness and contrast?', a: 'The tool adjusts one at a time. For both, adjust brightness first, download, then re-upload and adjust contrast. Or use an editor that supports both simultaneously.' },
      { q: 'Does it affect color?', a: 'Contrast adjustment affects the lightness channel, not the hue. Colors remain the same but their lightness difference increases or decreases.' },
    ],
  },
  'image-flipper': {
    whatIs: 'The Image Flipper mirrors your image horizontally or vertically. Flip an image left-to-right, top-to-bottom, or both, with instant preview and download — all in your browser.',
    howTo: [
      'Upload an image or drag and drop it into the tool.',
      'Click Flip Horizontal to mirror left-to-right, or Flip Vertical to mirror top-to-bottom.',
      'Toggle both for a 180-degree equivalent effect.',
      'Click Download to save the flipped image.',
    ],
    benefits: [
      { title: 'Mirror images instantly', description: 'Flip images without desktop software. The tool handles it in one click using Canvas, which is faster than opening Photoshop for a simple flip.' },
      { title: 'Fix mirrored text', description: 'If a photo contains mirrored text (from a selfie or scanned document), flip it horizontally to make the text readable.' },
      { title: 'Create symmetrical designs', description: 'Flip one half of an image to create a symmetrical composition. Useful for design mockups and creative projects.' },
      { title: 'Privacy-first', description: 'Images are processed locally using Canvas. Your photos never leave your device.' },
    ],
    faqs: [
      { q: 'What is the difference between flip and rotate?', a: 'Flipping mirrors the image (left becomes right, top becomes bottom). Rotating turns the image around its center (90, 180, 270 degrees). Use the Image Rotator for rotation.' },
      { q: 'Can I flip and rotate in the same tool?', a: 'No. This tool handles flipping only. For rotation, use the Image Rotator. For both, flip here, download, then rotate in the other tool.' },
      { q: 'Does flipping affect image quality?', a: 'No. Flipping is a pixel rearrangement, not a re-encoding. The output is at the exact same resolution and quality as the original.' },
      { q: 'Can I flip only part of the image?', a: 'No. The tool flips the entire image. For partial flipping, use a desktop image editor.' },
    ],
  },
  'image-grayscale': {
    whatIs: 'The Image Grayscale tool converts your image to black and white by removing all color information. The result is a monochrome image that retains luminance (brightness) values.',
    howTo: [
      'Upload an image or drag and drop it into the tool.',
      'Adjust the grayscale intensity slider (0-100%).',
      'Preview the black and white result in real time.',
      'Click Download to save the grayscale image.',
    ],
    benefits: [
      { title: 'Classic black and white effect', description: 'Convert color photos to timeless black and white without desktop software. The tool uses the Canvas grayscale filter for accurate luminance conversion.' },
      { title: 'Artistic photography', description: 'Black and white photography emphasizes form, texture, and contrast over color. Use this tool to preview how your color photo looks in monochrome.' },
      { title: 'Partial desaturation', description: 'The slider lets you apply partial grayscale — 50% gives a muted, vintage look. 100% gives full black and white.' },
      { title: 'Processed locally', description: 'Images are processed in your browser using Canvas. Your photos never leave your device.' },
    ],
    faqs: [
      { q: 'How is grayscale calculated?', a: 'The tool uses the CSS filter: grayscale() function, which converts each pixel to a luminance value based on the ITU-R BT.601 standard: 0.299R + 0.587G + 0.114B.' },
      { q: 'Can I convert only part of the image?', a: 'No. The tool applies grayscale to the entire image. For selective color effects, use a desktop editor like Photoshop.' },
      { q: 'Does grayscale reduce file size?', a: 'Grayscale conversion does not inherently reduce file size, since the image is still saved as RGB. For smaller files, use the Image Compressor after converting.' },
      { q: 'Can I undo grayscale?', a: 'Click "New Image" to reset and upload the original color image. Grayscale conversion cannot be reversed once downloaded.' },
    ],
  },
  'image-metadata-viewer': {
    whatIs: 'The Image Metadata Viewer displays EXIF, IPTC, and XMP metadata embedded in your image files. It shows camera model, lens, exposure settings, GPS coordinates, timestamp, copyright, and other metadata tags.',
    howTo: [
      'Upload an image (JPG, TIFF, or PNG) by dragging it into the upload zone.',
      'The tool reads the embedded EXIF, IPTC, and XMP metadata.',
      'Review the metadata fields in the results panel.',
      'No download is needed — metadata is read locally from the file.',
    ],
    benefits: [
      { title: 'Privacy awareness', description: 'Photos from phones and cameras often contain GPS coordinates. Check your photos before sharing to ensure you are not revealing your location.' },
      { title: 'Photography reference', description: 'Review camera settings (aperture, shutter speed, ISO, focal length) for your photos. Useful for learning which settings produced which results.' },
      { title: 'Copyright verification', description: 'IPTC metadata can contain copyright notices and creator information. Check whether your images have proper copyright metadata before publishing.' },
      { title: 'No upload required', description: 'Metadata is read in your browser using the File API. Your images never leave your device, which is important for personal and confidential photos.' },
    ],
    faqs: [
      { q: 'What is EXIF data?', a: 'EXIF (Exchangeable Image File Format) data includes camera model, lens, aperture, shutter speed, ISO, focal length, GPS coordinates, date, and time. It is embedded by cameras and phones in JPG and TIFF files.' },
      { q: 'Do all images have metadata?', a: 'No. PNG files typically have no EXIF data. Some websites strip metadata on upload (Facebook, Instagram). Screenshots usually have no metadata.' },
      { q: 'Can I see GPS coordinates?', a: 'Yes. If the photo was taken with location services enabled, the EXIF data includes GPS latitude and longitude. The tool displays these values.' },
      { q: 'Can I remove metadata?', a: 'Yes. Use the Image Metadata Remover tool to strip EXIF, IPTC, and XMP data from your images before sharing them.' },
    ],
  },
  'image-placeholder-generator': {
    whatIs: 'The Image Placeholder Generator creates placeholder images with custom dimensions, text, and background color. It produces PNG or JPG placeholders for use in design mockups, wireframes, and development.',
    howTo: [
      'Enter the width and height for your placeholder image.',
      'Optionally add custom text to display on the placeholder.',
      'Choose a background color and text color.',
      'Click Generate and download the placeholder image.',
    ],
    benefits: [
      { title: 'Custom dimensions', description: 'Generate placeholders at any size — from 16x16 icons to 1920x1080 hero images. Match the exact dimensions your design or layout requires.' },
      { title: 'Wireframe and mockup ready', description: 'Use placeholder images in wireframes and design mockups to represent where real images will go. This speeds up the design process before final assets are ready.' },
      { title: 'Custom text and colors', description: 'Add meaningful labels to placeholders (e.g., "Hero Image 1200x400") and match your design system colors. This makes placeholders more useful than generic gray boxes.' },
      { title: 'No download or sign-up', description: 'Generate as many placeholders as you need, in any size, without creating an account or installing software.' },
    ],
    faqs: [
      { q: 'What format are the placeholders?', a: 'The tool generates PNG and JPG formats. PNG is better for placeholders with text (sharper edges), while JPG produces smaller files for large placeholders.' },
      { q: 'Is there a size limit?', a: 'The tool can generate very large placeholders (e.g., 4000x4000), but very large images may slow down your browser. For most uses, 100-2000 pixels per dimension is sufficient.' },
      { q: 'Can I generate multiple placeholders at once?', a: 'No. The tool generates one placeholder at a time. Generate each one separately with different dimensions and text.' },
      { q: 'Does it work for responsive design?', a: 'Yes. Generate placeholders at different breakpoints (e.g., 375x200 for mobile, 768x400 for tablet, 1920x600 for desktop) to test responsive layouts.' },
    ],
  },
  'image-rounded-corners': {
    whatIs: 'The Image Rounded Corners tool rounds the corners of your image by a specified radius. It produces a PNG with transparent rounded corners, which can be placed over any background.',
    howTo: [
      'Upload an image or drag and drop it into the tool.',
      'Adjust the corner radius slider to control how rounded the corners are.',
      'Preview the result in real time.',
      'Click Download to save the image as a transparent PNG.',
    ],
    benefits: [
      { title: 'Transparent PNG output', description: 'The rounded corners are transparent, so you can place the image over any background color or pattern. The output is a PNG with alpha transparency.' },
      { title: 'Modern UI aesthetic', description: 'Rounded corners are a key element of modern UI design (iOS, Material Design, macOS). Apply them to images for a contemporary, polished look.' },
      { title: 'Adjustable radius', description: 'Control the exact corner radius with a slider. From subtle 4px rounding to fully circular (border-radius: 50%).' },
      { title: 'Processed in your browser', description: 'Images are processed locally using Canvas. Your photos never leave your device.' },
    ],
    faqs: [
      { q: 'Why is the output PNG?', a: 'PNG supports alpha transparency, which is needed for the rounded corners to be transparent. JPG does not support transparency, so the corners would be filled with a solid color.' },
      { q: 'Can I make a circular image?', a: 'Yes. Set the corner radius to 50% or higher. For a perfect circle, start with a square image (equal width and height).' },
      { q: 'Does it work on all image formats?', a: 'The tool accepts JPG, PNG, and WebP as input. The output is always PNG to preserve the transparent corners.' },
      { q: 'Can I round only specific corners?', a: 'No. The tool rounds all four corners equally. For per-corner control, use CSS border-radius on an <img> element in your web page instead.' },
    ],
  },
  'image-sepia-filter': {
    whatIs: 'The Image Sepia Filter applies a vintage sepia tone to your image. Sepia gives photos a warm, brownish tint reminiscent of historical photographs, creating a nostalgic or antique aesthetic.',
    howTo: [
      'Upload an image or drag and drop it into the tool.',
      'Adjust the sepia intensity slider (0-100%).',
      'Preview the vintage effect in real time.',
      'Click Download to save the sepia-filtered image.',
    ],
    benefits: [
      { title: 'Vintage photo effect', description: 'Transform modern digital photos into vintage-looking images with a warm sepia tone. No desktop software needed — the filter applies instantly in your browser.' },
      { title: 'Partial sepia for warmth', description: 'The slider lets you apply partial sepia — 50% gives a subtle warm tint. 100% gives the full antique brown-and-white effect.' },
      { title: 'Real-time preview', description: 'See the sepia effect update instantly as you drag the slider. Fine-tune the intensity before downloading.' },
      { title: 'Processed locally', description: 'Images are processed using Canvas in your browser. Your photos never leave your device.' },
    ],
    faqs: [
      { q: 'What is sepia tone?', a: 'Sepia is a reddish-brown color that was used in early photographic processing. Applying a sepia filter gives digital images the warm, aged look of historical photographs.' },
      { q: 'Can I combine sepia with other filters?', a: 'The tool applies sepia only. For combined effects (sepia + blur, sepia + vignette), use a desktop editor like Photoshop or GIMP.' },
      { q: 'Does sepia work on all images?', a: 'Sepia works on any color image. On already black-and-white images, it adds a warm brown tint. On very dark images, the effect may be subtle.' },
      { q: 'Can I undo the sepia effect?', a: 'Click "New Image" to reset and upload the original. The sepia filter cannot be reversed once the image is downloaded.' },
    ],
  },
  'image-sharpen': {
    whatIs: 'The Image Sharpen tool enhances detail and clarity in your image by applying a convolution sharpening filter. It increases edge contrast, making soft images appear crisper and more defined.',
    howTo: [
      'Upload an image or drag and drop it into the tool.',
      'Adjust the sharpen amount slider (0-100%).',
      'Preview the sharpened result in real time.',
      'Click Download to save the sharpened image.',
    ],
    benefits: [
      { title: 'Fix slightly soft photos', description: 'Sharpen photos that are slightly out of focus or softened by noise reduction. The tool enhances edge contrast to make details appear crisper.' },
      { title: 'Pre-sharpen for display', description: 'Images displayed on screens often look softer than intended. Sharpen before publishing to web or social media for a crisper appearance.' },
      { title: 'Real-time preview', description: 'See the sharpening effect update instantly as you drag the slider. Fine-tune the amount before downloading.' },
      { title: 'Pixel-level processing', description: 'The tool uses a convolution kernel to sharpen pixels, which is more accurate than simple contrast adjustment. Processing is done locally using Canvas.' },
    ],
    faqs: [
      { q: 'Can it fix very blurry images?', a: 'No. Sharpening enhances existing detail but cannot recover detail that is completely lost to blurring. It works best on slightly soft images, not severely blurred ones.' },
      { q: 'What does the sharpen amount control?', a: 'The amount controls the strength of the sharpening kernel. Higher values produce stronger edge enhancement but can introduce halos (bright outlines around edges) at extreme settings.' },
      { q: 'Should I sharpen before or after resizing?', a: 'Sharpen after resizing for best results. Resizing softens images, so sharpening last restores crispness. If you resize after sharpening, you lose the benefit.' },
      { q: 'Does sharpening add noise?', a: 'Yes, at high settings. Sharpening amplifies noise along with real detail. Use moderate amounts (30-60%) for clean results. Avoid maximum settings unless the image is very clean.' },
    ],
  },
  'json-to-csv': {
    whatIs: 'The JSON to CSV Converter transforms a JSON array of objects into CSV format. It extracts keys from the first object as column headers and writes each object as a row.',
    howTo: [
      'Paste a JSON array of objects into the input field.',
      'Click Convert to CSV to transform the data.',
      'Review the CSV output in the results panel.',
      'Copy the CSV to your clipboard or download it as a file.',
    ],
    benefits: [
      { title: 'Data format bridging', description: 'JSON and CSV are the two most common data formats. Convert between them to move data between APIs (JSON) and spreadsheets (CSV) without writing custom scripts.' },
      { title: 'Handles nested objects', description: 'The tool flattens the first level of object properties. Nested objects and arrays are stringified, so no data is lost in conversion.' },
      { title: 'Proper CSV escaping', description: 'Values containing commas, quotes, or newlines are properly escaped with double quotes, ensuring the CSV is valid and can be opened in Excel or Google Sheets.' },
      { title: 'No data uploaded', description: 'Conversion happens entirely in your browser. Your JSON data never leaves your device.' },
    ],
    faqs: [
      { q: 'What JSON format is required?', a: 'The tool expects a JSON array of objects, e.g., [{"name":"John","age":30}]. A single object or non-array JSON will produce an error.' },
      { q: 'How are nested objects handled?', a: 'Nested objects and arrays within each JSON object are converted to their string representation (JSON.stringify). This preserves the data but makes it less readable in CSV.' },
      { q: 'Are numbers converted to strings?', a: 'In CSV, all values are strings. When you open the CSV in Excel, numbers are typically recognized and converted automatically. Dates may need manual formatting.' },
      { q: 'What if the objects have different keys?', a: 'The tool uses the keys from the first object as headers. If other objects have additional keys, those values are included in the row but without a header. Ensure all objects share the same structure for best results.' },
    ],
  },
  'jwt-encoder': {
    whatIs: 'The JWT Encoder creates JSON Web Tokens from a header, payload, and optional signing secret. It produces a properly formatted JWT with base64url-encoded header and payload, signed with HMAC-SHA256.',
    howTo: [
      'Enter the JWT header as JSON (typically {"alg":"HS256","typ":"JWT"}).',
      'Enter the payload as JSON (your claims, e.g., sub, iat, exp).',
      'Enter a signing secret for HMAC-SHA256, or leave blank for an unsigned token.',
      'Click Encode JWT to generate the token. Copy it for use in your application.',
    ],
    benefits: [
      { title: 'HMAC-SHA256 signing', description: 'The tool signs tokens with HMAC-SHA256, the most common JWT signing algorithm. The signature ensures the token cannot be tampered with without the secret.' },
      { title: 'Proper base64url encoding', description: 'JWT uses base64url encoding (not standard base64). The tool handles the URL-safe character set and padding removal automatically.' },
      { title: 'Debug and test tokens', description: 'Generate test tokens for API development and debugging. Verify that your API correctly decodes and validates the tokens you create here.' },
      { title: 'No server required', description: 'Encoding and signing happen in your browser using the Web Crypto API. Your secret never leaves your device.' },
    ],
    faqs: [
      { q: 'What is a JWT?', a: 'JWT (JSON Web Token) is a compact, URL-safe token format used for authentication and information exchange. It consists of three parts: header.payload.signature, each base64url-encoded.' },
      { q: 'Is it safe to put secrets in the browser?', a: 'The tool processes everything locally. Your secret is used for signing in the browser and is not transmitted. However, do not use production secrets in browser-based tools.' },
      { q: 'What claims should I include?', a: 'Common claims: sub (subject/user ID), iat (issued at), exp (expiration), iss (issuer), aud (audience). Include exp to ensure tokens expire. Do not include sensitive data in the payload — it is base64-encoded, not encrypted.' },
      { q: 'Can I use RSA instead of HMAC?', a: 'No. This tool supports HMAC-SHA256 only. RSA and ECDSA signing require server-side libraries with private key handling.' },
    ],
  },
  'keyword-extractor': {
    whatIs: 'The Keyword Extractor analyzes text and extracts the most relevant keywords and phrases. It identifies frequently occurring words and multi-word phrases, which is useful for SEO content optimization.',
    howTo: [
      'Paste your text content into the input field.',
      'Click Extract to analyze the text for keywords.',
      'Review the extracted keywords and their frequency.',
      'Use the keywords to optimize your content for search engines.',
    ],
    benefits: [
      { title: 'SEO content optimization', description: 'Identify which keywords your content already emphasizes and which are missing. Ensure your target keywords appear with appropriate frequency for SEO.' },
      { title: 'Multi-word phrase detection', description: 'The tool extracts not just single words but multi-word phrases (bigrams, trigrams), which are often more valuable for SEO than single keywords.' },
      { title: 'Content audit', description: 'Analyze existing content to see what keywords it ranks for conceptually. Compare against your target keyword list to identify content gaps.' },
      { title: 'No data uploaded', description: 'Text analysis happens entirely in your browser. Your content never leaves your device.' },
    ],
    faqs: [
      { q: 'How does the extractor identify keywords?', a: 'The tool uses word frequency analysis, filtering out common stop words (the, is, at, etc.) and identifying the most frequently occurring meaningful words and phrases.' },
      { q: 'Can I extract keywords from a URL?', a: 'No. The tool analyzes pasted text only. For URL analysis, copy the page content and paste it into the tool.' },
      { q: 'What are stop words?', a: 'Stop words are common words that carry little SEO value — articles, prepositions, conjunctions (the, a, in, and, of). The tool filters these out automatically.' },
      { q: 'How many keywords should I target per page?', a: 'Focus on 1 primary keyword and 3-5 secondary keywords per page. The extractor shows you what is already present, so you can adjust frequency and coverage.' },
    ],
  },
  'line-counter': {
    whatIs: 'The Line Counter counts total lines, non-empty lines, words, characters, and characters excluding spaces in your text. It provides a comprehensive text statistics breakdown for writers, developers, and content creators.',
    howTo: [
      'Paste or type your text into the input field.',
      'The tool instantly displays line, word, and character counts.',
      'Review all five statistics in the results grid.',
      'No submit button needed — counts update as you type.',
    ],
    benefits: [
      { title: 'Five text metrics at once', description: 'Total lines, non-empty lines, words, characters, and characters without spaces — all displayed simultaneously for comprehensive text analysis.' },
      { title: 'Code line counting', description: 'Developers can count lines of code (excluding empty lines) for project estimates, documentation, and commit messages. The non-empty line count is especially useful.' },
      { title: 'Writing and editing', description: 'Writers can track word count for articles, essays, and social media posts. Character count is essential for tweets (280 chars) and meta descriptions (160 chars).' },
      { title: 'Instant updates', description: 'All counts update in real time as you type. No need to click a button or wait for processing.' },
    ],
    faqs: [
      { q: 'How are words counted?', a: 'Words are counted by splitting the text on whitespace (spaces, tabs, newlines). Punctuation attached to words (e.g., "hello!") counts as part of the word.' },
      { q: 'What is the difference between lines and non-empty lines?', a: 'Total lines includes blank lines. Non-empty lines excludes lines that contain only whitespace. For code metrics, non-empty lines is the more useful number.' },
      { q: 'Is there a text size limit?', a: 'There is no hard limit, but very large texts (1MB+) may slow down the real-time counter. For most documents (under 100KB), counting is instant.' },
      { q: 'Does it count characters with spaces?', a: 'Yes. The tool shows both total characters (including spaces) and characters without spaces, so you can see both metrics.' },
    ],
  },
  'meeting-planner': {
    whatIs: 'The Meeting Planner helps you find a meeting time that works across multiple time zones. Enter participants\' time zones and the tool shows overlapping working hours so you can schedule without timezone math.',
    howTo: [
      'Enter your own time zone and preferred meeting time.',
      'Add participants\' time zones one by one.',
      'The tool displays the corresponding time in each time zone.',
      'Find a time that falls within working hours for all participants.',
    ],
    benefits: [
      { title: 'No timezone math', description: 'Stop calculating time differences manually. The tool converts your proposed meeting time to each participant\'s local time instantly.' },
      { title: 'Global team coordination', description: 'For distributed teams, finding a meeting time that works for everyone is a recurring challenge. This tool shows whether a proposed time is reasonable for each location.' },
      { title: 'Visual time comparison', description: 'See all participants\' local times side by side, so you can quickly identify whether anyone would be inconvenienced by the proposed time.' },
      { title: 'No account needed', description: 'Unlike calendar apps, this tool requires no sign-in. Enter time zones and get results instantly.' },
    ],
    faqs: [
      { q: 'How accurate are the timezone conversions?', a: 'The tool uses your browser\'s Intl API, which includes daylight saving time rules. Conversions are accurate for all major time zones.' },
      { q: 'Can I schedule recurring meetings?', a: 'No. The tool shows a single point in time across time zones. For recurring meetings, check the time for each occurrence, as daylight saving time changes may shift the offset.' },
      { q: 'What if a participant is in a different daylight saving period?', a: 'The tool accounts for daylight saving time automatically. If one participant is in DST and another is not, the conversions reflect the current offset for each location.' },
      { q: 'Can I share the meeting time with participants?', a: 'The tool does not generate calendar invites. Note the agreed time and create a calendar event in Google Calendar, Outlook, or your preferred calendar app.' },
    ],
  },
  'meta-robots-generator': {
    whatIs: 'The Meta Robots Generator creates robots meta tags that control how search engines index and follow links on your page. It supports index/noindex, follow/nofollow, and advanced directives like noarchive and nosnippet.',
    howTo: [
      'Choose whether search engines should index the page (index or noindex).',
      'Choose whether to follow links on the page (follow or nofollow).',
      'Optionally add advanced directives (noarchive, nosnippet, noimageindex, notranslate).',
      'Copy the generated meta tag and paste it into your page\'s <head>.',
    ],
    benefits: [
      { title: 'Page-level crawl control', description: 'The robots meta tag gives you page-level control over indexing, complementing robots.txt which controls crawling at the site level. Use noindex to keep a page out of search results.' },
      { title: 'Advanced directives', description: 'Beyond index/noindex and follow/nofollow, the tool supports noarchive (no cached version), nosnippet (no snippet in search results), and noimageindex (no image indexing).' },
      { title: 'Prevent indexing of thin pages', description: 'Use noindex on thin content, duplicate, or admin pages that you do not want appearing in search results, preserving crawl budget for important pages.' },
      { title: 'Clean tag output', description: 'The tool generates a single, properly formatted meta tag with all selected directives combined, ready to paste into your HTML.' },
    ],
    faqs: [
      { q: 'What is the difference between robots.txt and robots meta tag?', a: 'robots.txt controls whether crawlers can access a page at all. The robots meta tag controls whether an already-crawled page is indexed and whether its links are followed. Use both for complete control.' },
      { q: 'Does noindex prevent crawling?', a: 'No. noindex allows crawling but prevents indexing. To prevent both crawling and indexing, use robots.txt to block the page AND add noindex as a safety measure.' },
      { q: 'What is noarchive?', a: 'noarchive tells search engines not to show a cached version of your page in search results. This prevents users from viewing your content through Google\'s cache.' },
      { q: 'Should I use nofollow on external links?', a: 'Use nofollow on individual links (rel="nofollow" on <a> tags) rather than the page-level nofollow directive, which affects all links including internal ones.' },
    ],
  },
  'neumorphism-generator': {
    whatIs: 'The Neumorphism Generator creates CSS for the neumorphism (soft UI) design style — elements that appear extruded from or pressed into the background using subtle shadows and matching background colors.',
    howTo: [
      'Choose a background color for your neumorphic element.',
      'Adjust the shadow intensity, distance, and blur radius.',
      'Toggle between raised (extruded) and pressed (inset) styles.',
      'Copy the generated CSS and paste it into your project.',
    ],
    benefits: [
      { title: 'Live visual preview', description: 'See the neumorphic effect update in real time as you adjust settings, so you know exactly what the result looks like before copying the CSS.' },
      { title: 'Dual shadow generation', description: 'Neumorphism requires two shadows (one light, one dark) to create the soft 3D effect. The tool generates both automatically based on your background color.' },
      { title: 'Raised and pressed styles', description: 'Toggle between raised (element appears to extrude from the surface) and pressed (element appears pressed into the surface) for different UI states.' },
      { title: 'Copy-ready CSS', description: 'The output includes background, box-shadow, and border-radius properties. Paste it directly into your stylesheet.' },
    ],
    faqs: [
      { q: 'What is neumorphism?', a: 'Neumorphism (new + skeuomorphism) is a design style where elements have a soft, extruded appearance using subtle dual shadows and a background color that matches the surface. It was popularized around 2020.' },
      { q: 'Does neumorphism have accessibility concerns?', a: 'Yes. Neumorphic designs can have low contrast between elements and backgrounds, which may fail WCAG accessibility standards. Always test contrast ratios and provide focus states for interactive elements.' },
      { q: 'Can I use neumorphism for buttons?', a: 'Yes, but ensure you have clear hover and active states. Neumorphic buttons can be hard to distinguish from the background. Add a subtle color change or icon for clarity.' },
      { q: 'What background colors work best?', a: 'Neumorphism works best with soft, muted background colors (light grays, pastels). Pure white or very dark backgrounds make the shadow effect less visible.' },
    ],
  },
  'otp-generator': {
    whatIs: 'The OTP Generator creates one-time passwords (OTPs) using the TOTP algorithm (RFC 6238). It generates 6-digit codes that refresh every 30 seconds, compatible with Google Authenticator and other 2FA apps.',
    howTo: [
      'Enter your Base32-encoded secret key (the same key used to set up your authenticator app).',
      'The tool generates a 6-digit TOTP code that refreshes every 30 seconds.',
      'Use the code for two-factor authentication login.',
      'The code automatically updates when the 30-second window expires.',
    ],
    benefits: [
      { title: 'Backup 2FA access', description: 'If you lose your phone or cannot access your authenticator app, generate OTP codes from your secret key. Keep your secret key safely stored for this purpose.' },
      { title: 'TOTP standard compliant', description: 'The tool follows RFC 6238 (TOTP) and RFC 4226 (HOTP), producing codes compatible with Google Authenticator, Authy, Microsoft Authenticator, and any standard 2FA system.' },
      { title: '30-second refresh', description: 'Codes refresh every 30 seconds with a countdown indicator, matching the behavior of standard authenticator apps.' },
      { title: 'Secrets never leave your browser', description: 'Your secret key is used for code generation locally. It is never transmitted to a server.' },
    ],
    faqs: [
      { q: 'Where do I find my secret key?', a: 'When setting up 2FA, the service provides a secret key (usually in Base32) or a QR code. The secret is embedded in the QR code as a otpauth:// URL. Save this secret securely for backup access.' },
      { q: 'Is it safe to use this instead of an authenticator app?', a: 'It works as a backup, but authenticator apps are more secure because they store secrets securely on your device. This tool is best used for testing or emergency access, not as your primary 2FA method.' },
      { q: 'Why does the code not match my authenticator app?', a: 'TOTP codes depend on the current time. If your device clock is off by more than 30 seconds, codes will not match. Ensure your system clock is synchronized.' },
      { q: 'Can I use this for multiple accounts?', a: 'Yes. Enter each account\'s secret key separately to generate its code. The tool handles one secret at a time for security.' },
    ],
  },
  'password-decryptor': {
    whatIs: 'The Password Decryptor attempts to reverse simple encoding on encoded text. It supports Base64, URL encoding, and hex encoding — not encryption. It decodes the encoded string back to plain text.',
    howTo: [
      'Paste the encoded text into the input field.',
      'Select the encoding type (Base64, URL, or Hex).',
      'Click Decrypt to decode the text.',
      'Copy the decoded plain text result.',
    ],
    benefits: [
      { title: 'Decode encoded text', description: 'Quickly decode Base64, URL-encoded, or hex-encoded strings without writing code. The tool handles the decoding in your browser.' },
      { title: 'Debug authentication tokens', description: 'Decode Base64-encoded tokens, URL parameters, or hex strings during debugging. See the original text behind the encoding.' },
      { title: 'No server processing', description: 'Decoding is done locally. Your encoded strings and decoded results never leave your device.' },
      { title: 'Supports common encoding formats', description: 'Base64, URL encoding (percent-encoding), and hex encoding are the most common text encoding formats used in web development and APIs.' },
    ],
    faqs: [
      { q: 'Can it decrypt encrypted passwords?', a: 'No. This tool decodes encoded text, not encrypted data. Encoding (Base64, hex) is reversible without a key. Encryption (AES, bcrypt) requires a key or is one-way. It cannot reverse encryption.' },
      { q: 'What is the difference between encoding and encryption?', a: 'Encoding transforms data into a different format for transport (reversible, no key needed). Encryption transforms data for confidentiality (requires a key or is one-way). This tool handles encoding only.' },
      { q: 'What is URL encoding?', a: 'URL encoding (percent-encoding) replaces unsafe characters with %XX sequences. For example, spaces become %20, and & becomes %26. The tool decodes these back to the original characters.' },
      { q: 'Is decoding safe?', a: 'Yes. Decoding is a lossless, reversible process. The original text is recovered exactly. No data is lost or modified in the process.' },
    ],
  },
  'password-encryptor': {
    whatIs: 'The Password Encryptor encodes text using Base64, URL encoding, or hex encoding. These are encoding methods, not encryption — they transform text for transport but are reversible without a key.',
    howTo: [
      'Enter the text you want to encode.',
      'Select the encoding type (Base64, URL, or Hex).',
      'Click Encrypt to encode the text.',
      'Copy the encoded result.',
    ],
    benefits: [
      { title: 'Encode for transport', description: 'Base64 and URL encoding are used to safely transmit text in URLs, HTTP headers, and JSON. Encode your data before sending it through systems that do not support raw text.' },
      { title: 'Quick encoding without code', description: 'Encode text to Base64, URL, or hex without writing a script. The tool handles it in your browser instantly.' },
      { title: 'No server processing', description: 'Encoding is done locally. Your text and encoded results never leave your device.' },
      { title: 'Three encoding formats', description: 'Base64 (most common for web), URL encoding (for query parameters), and hex encoding (for binary data representation) are all supported.' },
    ],
    faqs: [
      { q: 'Is this secure encryption?', a: 'No. These are encoding methods, not encryption. Base64, URL, and hex encoding are all reversible without a key. For secure password storage, use the Bcrypt Generator. For secure encryption, use AES.' },
      { q: 'What is Base64 used for?', a: 'Base64 is used to encode binary data (images, files) as text for transport in JSON, XML, and HTTP. It is also used in basic authentication headers and JWT tokens.' },
      { q: 'Can I decode the result?', a: 'Yes. Use the Password Decryptor tool with the same encoding type to reverse the encoding and recover the original text.' },
      { q: 'What is hex encoding?', a: 'Hex encoding represents each byte as two hexadecimal characters (0-9, A-F). For example, "Hello" becomes "48656c6c6f". It is used for binary data representation.' },
    ],
  },
  'pdf-delete-pages': {
    whatIs: 'The PDF Delete Pages tool removes specific pages from a PDF document. Select the pages you do not want and the tool creates a new PDF without them, leaving your original file unchanged.',
    howTo: [
      'Drag and drop your PDF into the tool, or click to browse.',
      'Select the pages you want to delete by clicking on them or entering page numbers.',
      'Click Delete Pages to create a new PDF without the selected pages.',
      'Download the result — your original file is not modified.',
    ],
    benefits: [
      { title: 'Remove unwanted pages', description: 'Delete blank pages, cover sheets, or sensitive pages from a PDF without installing desktop software. The tool uses pdf-lib for local processing.' },
      { title: 'Original file preserved', description: 'The tool creates a new PDF without the selected pages. Your original file remains on your device, unchanged and available as a backup.' },
      { title: 'Privacy-first', description: 'PDFs are processed entirely in your browser using pdf-lib. Confidential documents never leave your device.' },
      { title: 'No watermarks or sign-up', description: 'The output PDF is clean — no watermarks, no account required, no usage limits.' },
    ],
    faqs: [
      { q: 'Can I delete non-consecutive pages?', a: 'Yes. Select any pages you want to remove — they do not need to be consecutive. The tool removes exactly the pages you select.' },
      { q: 'What happens to the page numbering?', a: 'The new PDF has pages renumbered sequentially. If you delete page 3 from a 10-page PDF, the result has 9 pages numbered 1-9.' },
      { q: 'Can I undo the deletion?', a: 'The tool creates a new PDF and does not modify the original. If you need the deleted pages later, use the original file, which is still on your device.' },
      { q: 'Is there a limit to how many pages I can delete?', a: 'You can delete as many pages as you want, including all pages (which produces an empty PDF). The tool handles any number of pages.' },
    ],
  },
  'pdf-extract-pages': {
    whatIs: 'The PDF Extract Pages tool pulls specific pages from a PDF into a new document. Select the pages you want to keep and the tool creates a new PDF containing only those pages.',
    howTo: [
      'Drag and drop your PDF into the tool, or click to browse.',
      'Select the pages you want to extract by clicking on them or entering page ranges.',
      'Click Extract to create a new PDF with only the selected pages.',
      'Download the result — your original file is not modified.',
    ],
    benefits: [
      { title: 'Create page subsets', description: 'Extract specific pages (e.g., just the summary, just the charts) into a separate PDF for sharing or reference, without sending the entire document.' },
      { title: 'Original file preserved', description: 'The tool creates a new PDF from the selected pages. Your original file remains unchanged on your device.' },
      { title: 'Privacy-first', description: 'PDFs are processed entirely in your browser using pdf-lib. Sensitive documents never leave your device.' },
      { title: 'No watermarks or sign-up', description: 'The extracted PDF is clean — no watermarks, no account required, no usage limits.' },
    ],
    faqs: [
      { q: 'Can I extract non-consecutive pages?', a: 'Yes. Select any pages you want to extract — they do not need to be consecutive. The tool creates a new PDF with only those pages in the order they appear in the original.' },
      { q: 'Can I extract pages from multiple PDFs?', a: 'No. The tool processes one PDF at a time. For multiple PDFs, extract from each one separately.' },
      { q: 'Can I reorder pages during extraction?', a: 'No. The tool preserves the original page order. For reordering, use the PDF Reorder Pages tool, which lets you drag and drop pages into a new order.' },
      { q: 'Is the extracted PDF the same quality?', a: 'Yes. The extraction preserves all content — text, images, and formatting — at the original quality. No re-encoding occurs.' },
    ],
  },
  'pdf-metadata-editor': {
    whatIs: 'The PDF Metadata Editor lets you view and modify the document properties of a PDF — title, author, subject, keywords, creator, and producer. Changes are saved to a new PDF file.',
    howTo: [
      'Upload your PDF by dragging it into the tool or clicking to browse.',
      'Edit the metadata fields: title, author, subject, keywords, creator.',
      'Click Save to generate a new PDF with the updated metadata.',
      'Download the result — your original file is not modified.',
    ],
    benefits: [
      { title: 'Professional document properties', description: 'Set proper title, author, and subject metadata for PDFs you publish or share. This improves how the document appears in PDF readers and search results.' },
      { title: 'Privacy cleanup', description: 'Remove or replace metadata that contains personal information (author name, creator tool) before sharing PDFs publicly.' },
      { title: 'Original file preserved', description: 'The tool creates a new PDF with updated metadata. Your original file remains unchanged on your device.' },
      { title: 'Processed locally', description: 'Metadata editing uses pdf-lib in your browser. Your PDF never leaves your device.' },
    ],
    faqs: [
      { q: 'What metadata fields can I edit?', a: 'You can edit the title, author, subject, keywords, and creator fields. These are the standard PDF document properties shown by PDF readers like Adobe Acrobat and Apple Preview.' },
      { q: 'Does editing metadata affect the PDF content?', a: 'No. The tool modifies only the document properties, not the page content. Text, images, and formatting are unchanged.' },
      { q: 'Can I remove all metadata?', a: 'Yes. Clear all the fields and save. The resulting PDF will have empty metadata fields. Note that some PDF readers may still show the producer (pdf-lib).' },
      { q: 'Why edit PDF metadata?', a: 'Proper metadata helps organize documents in PDF management systems, improves search within document libraries, and removes personal information before sharing.' },
    ],
  },
  'pdf-page-number': {
    whatIs: 'The PDF Page Number tool adds page numbers to every page of a PDF. Choose the position (top/bottom, left/center/right), starting number, and format (e.g., "1", "1 of 10", "Page 1").',
    howTo: [
      'Upload your PDF by dragging it into the tool or clicking to browse.',
      'Choose the position: top or bottom, and left, center, or right.',
      'Set the starting number and format (e.g., "Page 1 of 10").',
      'Click Add Page Numbers to process the PDF with pdf-lib, then download.',
    ],
    benefits: [
      { title: 'Professional document formatting', description: 'Page numbers are essential for reports, manuals, and legal documents. Add them without installing desktop PDF software.' },
      { title: 'Customizable format', description: 'Choose from formats like "1", "1 of 10", "Page 1", or "Page 1 of 10". Set the starting number for documents that are part of a larger set.' },
      { title: 'Flexible positioning', description: 'Place page numbers at the top or bottom, aligned left, center, or right. Match the formatting style of your document.' },
      { title: 'Processed locally', description: 'Page numbers are added using pdf-lib in your browser. Your PDF never leaves your device.' },
    ],
    faqs: [
      { q: 'Can I skip the first page?', a: 'The tool adds numbers to all pages. To skip the first page (e.g., a cover page), set the starting number to 0 and the first page will show "0", or process the PDF twice — once without the cover and once with it.' },
      { q: 'Does it work on encrypted PDFs?', a: 'No. If the PDF is password-protected, use the PDF Unlock tool first to remove the password, then add page numbers.' },
      { q: 'Can I customize the font and size?', a: 'The tool uses a standard font and size. For custom typography, use a desktop PDF editor like Adobe Acrobat.' },
      { q: 'Does adding page numbers change the PDF quality?', a: 'No. The tool adds text overlays without re-encoding the existing content. Original text, images, and formatting are preserved at full quality.' },
    ],
  },
  'pdf-reorder-pages': {
    whatIs: 'The PDF Reorder Pages tool lets you rearrange the pages of a PDF by dragging and dropping them into a new order. The tool creates a new PDF with pages in the order you specify.',
    howTo: [
      'Upload your PDF by dragging it into the tool or clicking to browse.',
      'Drag and drop page thumbnails to rearrange them in the desired order.',
      'Click Save to create a new PDF with the reordered pages.',
      'Download the result — your original file is not modified.',
    ],
    benefits: [
      { title: 'Drag-and-drop reordering', description: 'Visually rearrange pages by dragging thumbnails. No need to specify page numbers manually — just drag to the desired position.' },
      { title: 'Original file preserved', description: 'The tool creates a new PDF with the reordered pages. Your original file remains unchanged on your device.' },
      { title: 'Privacy-first', description: 'PDFs are processed entirely in your browser using pdf-lib. Confidential documents never leave your device.' },
      { title: 'No watermarks or sign-up', description: 'The output PDF is clean — no watermarks, no account required, no usage limits.' },
    ],
    faqs: [
      { q: 'Can I move multiple pages at once?', a: 'The tool lets you drag individual pages. For moving multiple pages, drag each one to its new position sequentially.' },
      { q: 'Can I duplicate pages?', a: 'No. The tool reorders existing pages. It does not duplicate them. For duplication, use a desktop PDF editor.' },
      { q: 'Does reordering affect page content?', a: 'No. The tool changes only the page order, not the content of any page. Text, images, and formatting on each page are preserved.' },
      { q: 'Can I reverse the page order?', a: 'Yes. Drag the last page to the first position, the second-to-last to second, and so on. For large PDFs, this is faster with a desktop editor.' },
    ],
  },
  'pdf-to-excel': {
    whatIs: 'The PDF to Excel Converter extracts tabular data from PDF files and converts it into an Excel-compatible spreadsheet. It identifies table structures in the PDF and outputs them as rows and columns in .xlsx format.',
    howTo: [
      'Upload your PDF by dragging it into the tool or clicking to browse.',
      'The tool analyzes the PDF for table structures.',
      'Click Convert to extract the data and generate an Excel file.',
      'Download the .xlsx file and open it in Excel or Google Sheets.',
    ],
    benefits: [
      { title: 'Extract tables from PDFs', description: 'PDFs with tabular data (financial reports, invoices, data tables) are hard to work with. Convert them to Excel for sorting, filtering, and analysis.' },
      { title: 'No Excel needed', description: 'Convert PDF tables to Excel format without having Excel installed. The tool generates the .xlsx file in your browser.' },
      { title: 'Privacy-first', description: 'PDF processing is done locally. Financial reports, invoices, and other sensitive documents never leave your device.' },
      { title: 'Editable output', description: 'The resulting Excel file contains editable cells, not an image. You can sort, filter, and recalculate the data in Excel or Google Sheets.' },
    ],
    faqs: [
      { q: 'Does it work on all PDFs?', a: 'The tool works best on PDFs with clear table structures (ruled lines, aligned columns). PDFs with irregular layouts or scanned images may not convert cleanly. For scanned PDFs, OCR is needed first.' },
      { q: 'Are merged cells preserved?', a: 'The tool attempts to identify table structure. Merged cells and complex layouts may not convert perfectly. Review the output and adjust formatting in Excel if needed.' },
      { q: 'Can it convert multiple tables from one PDF?', a: 'The tool extracts tables from the PDF. If there are multiple tables, they may be combined or separated depending on the PDF structure.' },
      { q: 'Does it work on scanned PDFs?', a: 'No. Scanned PDFs are images, not text. The tool cannot extract tables from images. You need OCR software (like Adobe Acrobat or Tesseract) to convert scanned PDFs to text first.' },
    ],
  },
  'pdf-to-powerpoint': {
    whatIs: 'The PDF to PowerPoint Converter transforms PDF slides into editable PowerPoint presentations. It extracts content from each PDF page and creates corresponding slides in .pptx format.',
    howTo: [
      'Upload your PDF by dragging it into the tool or clicking to browse.',
      'Click Convert to analyze the PDF and generate PowerPoint slides.',
      'Download the .pptx file and open it in PowerPoint or Google Slides.',
      'Edit the slides as needed in your presentation software.',
    ],
    benefits: [
      { title: 'Recover editable presentations', description: 'If you have a PDF of a presentation but lost the original PowerPoint file, convert it back to .pptx to edit the slides.' },
      { title: 'No PowerPoint needed', description: 'Convert PDF to PowerPoint format without having PowerPoint installed. The tool generates the .pptx file in your browser.' },
      { title: 'Privacy-first', description: 'PDF processing is done locally. Presentation content never leaves your device.' },
      { title: 'Editable output', description: 'The resulting PowerPoint file contains editable text and layout, not just images of pages. You can modify the content in PowerPoint or Google Slides.' },
    ],
    faqs: [
      { q: 'Does it preserve animations and transitions?', a: 'No. PDFs do not contain animation or transition data. The tool extracts static content (text, images, layout) from each page and creates basic slides.' },
      { q: 'Are fonts and formatting preserved?', a: 'The tool preserves text content and basic layout. Specific fonts, colors, and styling may differ from the original presentation. Adjust formatting in PowerPoint after conversion.' },
      { q: 'Can it convert landscape and portrait pages?', a: 'Yes. The tool creates slides based on the PDF page dimensions. Landscape pages convert to standard slides; portrait pages may need manual adjustment.' },
      { q: 'Does it work on scanned PDFs?', a: 'No. Scanned PDFs are images. The tool cannot extract text from images. Use OCR software to convert scanned PDFs to text first.' },
    ],
  },
  'pdf-viewer': {
    whatIs: 'The PDF Viewer opens and displays PDF files directly in your browser. It renders pages using pdf.js, with page navigation, zoom controls, and support for large documents.',
    howTo: [
      'Drag and drop a PDF file into the upload zone, or click to browse.',
      'The tool renders the first page and displays navigation controls.',
      'Use the page navigation to browse through the document.',
      'Zoom in or out to read text at a comfortable size.',
    ],
    benefits: [
      { title: 'No PDF reader needed', description: 'View PDFs without Adobe Acrobat, Preview, or any other PDF reader. The tool works in any modern browser using pdf.js.' },
      { title: 'Privacy-first', description: 'PDFs are rendered locally in your browser. Confidential documents, contracts, and financial statements never leave your device.' },
      { title: 'Handles large PDFs', description: 'The viewer uses pdf.js to render pages on demand, so even large PDFs (100+ pages) load quickly. Only the current page is rendered at a time.' },
      { title: 'Zoom and navigation', description: 'Zoom in for detailed reading or out for overview. Navigate page by page or jump to a specific page number.' },
    ],
    faqs: [
      { q: 'Can I search within the PDF?', a: 'The viewer displays pages but does not include a search function. For searching, use your browser\'s Find feature (Ctrl+F) after the page renders, or use a desktop PDF reader.' },
      { q: 'Does it support encrypted PDFs?', a: 'If the PDF is password-protected, you need to enter the password when prompted. The viewer can render encrypted PDFs if you know the password.' },
      { q: 'Can I print from the viewer?', a: 'Use your browser\'s print function (Ctrl+P or Cmd+P). The viewer renders the current page, which your browser can print.' },
      { q: 'Does it work on mobile?', a: 'Yes. The viewer works in mobile browsers, though large PDFs may be slower to render on phones due to limited processing power and memory.' },
    ],
  },
  'pdf-watermark': {
    whatIs: 'The PDF Watermark tool adds a text watermark to every page of a PDF. Customize the watermark text, opacity, font size, and position to brand or protect your documents.',
    howTo: [
      'Upload your PDF by dragging it into the tool or clicking to browse.',
      'Enter the watermark text and adjust opacity, font size, and position.',
      'Click Apply to add the watermark to every page using pdf-lib.',
      'Download the watermarked PDF — your original file is not modified.',
    ],
    benefits: [
      { title: 'Document branding', description: 'Add your company name, logo text, or "CONFIDENTIAL" watermark to PDFs before sharing them. This deters unauthorized use and identifies the source.' },
      { title: 'Customizable appearance', description: 'Control the watermark text, opacity (transparency), font size, and position. Create subtle watermarks or bold, prominent ones.' },
      { title: 'Applied to all pages', description: 'The watermark is added to every page in the PDF, ensuring consistent branding or protection throughout the document.' },
      { title: 'Processed locally', description: 'Watermarking uses pdf-lib in your browser. Your PDF never leaves your device.' },
    ],
    faqs: [
      { q: 'Can I use an image as a watermark?', a: 'No. The tool supports text watermarks only. For image watermarks (logos, signatures), use a desktop PDF editor like Adobe Acrobat.' },
      { q: 'Can I watermark specific pages only?', a: 'No. The tool applies the watermark to all pages. For selective watermarking, extract the pages you want to watermark using PDF Extract Pages, watermark them, then merge with the rest.' },
      { q: 'Does the watermark affect readability?', a: 'Adjust the opacity to control how prominent the watermark is. At 10-20% opacity, the watermark is visible but does not interfere with reading. At higher opacity, it may obscure text.' },
      { q: 'Can the watermark be removed?', a: 'Text watermarks added by pdf-lib are embedded in the PDF content. They cannot be easily removed without PDF editing software, which provides a basic level of protection.' },
    ],
  },
  'png-to-svg': {
    whatIs: 'The PNG to SVG Converter traces raster PNG images and converts them to vector SVG format. SVGs scale without quality loss, making them ideal for logos, icons, and graphics that need to display at any size.',
    howTo: [
      'Upload a PNG image by dragging it into the tool or clicking to browse.',
      'The tool traces the image and generates an SVG vector representation.',
      'Preview the SVG result.',
      'Download the SVG file and use it in your design or web project.',
    ],
    benefits: [
      { title: 'Scalable vector output', description: 'SVG files scale to any size without pixelation or quality loss. Convert logos and icons from PNG to SVG for responsive web design and print.' },
      { title: 'No Illustrator needed', description: 'Convert raster images to vector without Adobe Illustrator or other vector editing software. The tool handles the tracing in your browser.' },
      { title: 'Smaller file size for simple images', description: 'For simple graphics (logos, icons, illustrations), SVG files are often smaller than PNG. For complex photos, the SVG may be larger — use your judgment.' },
      { title: 'Privacy-first', description: 'Image tracing is done locally in your browser. Your images never leave your device.' },
    ],
    faqs: [
      { q: 'Does it work on photos?', a: 'The tool works best on simple graphics with clear shapes and limited colors (logos, icons, illustrations). Complex photos produce large, imprecise SVGs and are better kept as PNG or JPG.' },
      { q: 'How does the tracing work?', a: 'The tool uses edge detection and path tracing to identify shapes in the raster image and convert them to vector paths. The quality depends on the image complexity and color count.' },
      { q: 'Can I edit the SVG after conversion?', a: 'Yes. The output SVG can be opened in Illustrator, Inkscape, Figma, or any vector editor. You can adjust paths, colors, and shapes.' },
      { q: 'Does the SVG match the original exactly?', a: 'No. Vector tracing is an approximation. Simple images with clear edges produce close matches. Complex images with gradients or noise will differ from the original.' },
    ],
  },
  'power-converter': {
    whatIs: 'The Power Converter converts between watts, kilowatts, megawatts, horsepower, and BTU/hour. Enter a value in one unit and instantly see it in all the others.',
    howTo: [
      'Select the power unit you want to convert from.',
      'Select the target unit you want to convert to.',
      'Enter the value to convert.',
      'The result appears instantly. Click Copy to copy it.',
    ],
    benefits: [
      { title: 'All common power units', description: 'Watts, kilowatts, megawatts, horsepower, and BTU/hour are all supported, covering electrical, mechanical, and thermal power measurements.' },
      { title: 'Instant results', description: 'Conversion updates as you type. Swap units with one click to reverse the direction.' },
      { title: 'Useful for engineering and HVAC', description: 'Convert between horsepower and kilowatts for motor specifications, or between BTU/hour and watts for air conditioning and heating systems.' },
      { title: 'Runs offline', description: 'The conversion uses fixed mathematical factors. Once the page loads, no internet connection is needed.' },
    ],
    faqs: [
      { q: 'What is horsepower?', a: 'Horsepower (hp) is a unit of power originating from the work of James Watt. 1 mechanical horsepower = 745.7 watts. It is still used for car engines and motors.' },
      { q: 'How do I convert kW to hp?', a: '1 kilowatt = 1.341 horsepower. Select kW as the "From" unit and hp as the "To" unit to see this conversion.' },
      { q: 'What is BTU/hour?', a: 'BTU/hour (British Thermal Unit per hour) measures heat power, commonly used for air conditioners and heaters. 1 BTU/hour = 0.293 watts.' },
      { q: 'Are the conversions accurate?', a: 'Yes. The tool uses standard conversion factors (1 hp = 745.7 W, 1 BTU/h = 0.293071 W). Results are accurate to 8 decimal places.' },
    ],
  },
  'powerpoint-to-pdf': {
    whatIs: 'The PowerPoint to PDF Converter transforms .pptx presentation files into PDF documents. Each slide becomes a page in the PDF, preserving the layout and content for easy sharing and printing.',
    howTo: [
      'Upload your .pptx file by dragging it into the tool or clicking to browse.',
      'Click Convert to transform the presentation into a PDF.',
      'Download the resulting PDF file.',
      'Share or print the PDF — it renders consistently across all devices.',
    ],
    benefits: [
      { title: 'Universal sharing format', description: 'PDFs display identically on all devices, while PowerPoint files may render differently depending on the viewer. Convert to PDF for reliable sharing.' },
      { title: 'No PowerPoint needed', description: 'Convert .pptx to PDF without having PowerPoint installed. The tool reads the file and generates the PDF in your browser.' },
      { title: 'Privacy-first', description: 'Presentation files are processed locally. Confidential slides and business presentations never leave your device.' },
      { title: 'Print-ready output', description: 'PDF is the standard format for printing. Convert your presentation to PDF for high-quality printed handouts or archival copies.' },
    ],
    faqs: [
      { q: 'Does it preserve animations and transitions?', a: 'No. PDFs are static documents. Animations, transitions, and embedded videos are not preserved. Only the static slide content is converted.' },
      { q: 'Are fonts preserved?', a: 'The tool preserves text content. If your presentation uses custom fonts, they may be substituted with standard fonts in the PDF. Embed fonts in your PowerPoint for best results.' },
      { q: 'Can it convert .ppt files?', a: 'The tool supports .pptx (PowerPoint 2007+). Older .ppt files use a different format. Save your .ppt file as .pptx in PowerPoint first, then convert.' },
      { q: 'Does it preserve speaker notes?', a: 'No. The PDF contains the slide content only. Speaker notes are not included in the PDF output.' },
    ],
  },
  'ppt-viewer': {
    whatIs: 'The PPT Viewer opens and displays PowerPoint presentation files (.pptx) directly in your browser. It renders each slide as an image, letting you browse through the presentation without PowerPoint installed.',
    howTo: [
      'Drag and drop a .pptx file into the upload zone, or click to browse.',
      'The tool parses the presentation and renders each slide.',
      'Navigate through slides using the controls.',
      'No download or software installation is needed.',
    ],
    benefits: [
      { title: 'No PowerPoint required', description: 'View presentations on any device without Microsoft PowerPoint or Office 365. The viewer works in any modern browser.' },
      { title: 'Privacy-first', description: 'Presentations are parsed in your browser. Confidential business slides never leave your device.' },
      { title: 'Quick preview', description: 'Need to check a presentation\'s contents before downloading or sharing? Open it in the viewer instantly without launching PowerPoint.' },
      { title: 'Cross-platform', description: 'Whether you are on Windows, Mac, Linux, or ChromeOS, the viewer renders .pptx files consistently.' },
    ],
    faqs: [
      { q: 'Does it support .ppt files?', a: 'No. The tool supports .pptx (PowerPoint 2007+). Older .ppt files use a different binary format that requires different parsing.' },
      { q: 'Are animations and transitions shown?', a: 'No. The viewer displays static slides. Animations, transitions, and embedded videos are not rendered.' },
      { q: 'Can I edit the presentation?', a: 'No. The viewer is read-only. To edit, download the file and open it in PowerPoint, Google Slides, or LibreOffice Impress.' },
      { q: 'Are speaker notes visible?', a: 'The viewer displays slide content. Speaker notes may not be visible depending on the file structure. Use PowerPoint for full notes access.' },
    ],
  },
  'pressure-converter': {
    whatIs: 'The Pressure Converter converts between pascals, kilopascals, bar, PSI, atmospheres, and mmHg. Enter a value in one unit and see it in all the others instantly.',
    howTo: [
      'Select the pressure unit you want to convert from.',
      'Select the target unit you want to convert to.',
      'Enter the value to convert.',
      'The result appears instantly. Click Copy to copy it.',
    ],
    benefits: [
      { title: 'All common pressure units', description: 'Pascals, kilopascals, bar, PSI, atmospheres, and mmHg are all supported, covering scientific, industrial, and medical pressure measurements.' },
      { title: 'Instant results', description: 'Conversion updates as you type. Swap units with one click to reverse the direction.' },
      { title: 'Useful for engineering and medicine', description: 'Convert between bar and PSI for tire pressure, or between mmHg and kPa for blood pressure readings and medical equipment specifications.' },
      { title: 'Runs offline', description: 'The conversion uses fixed mathematical factors. Once the page loads, no internet connection is needed.' },
    ],
    faqs: [
      { q: 'What is PSI?', a: 'PSI (pounds per square inch) is a pressure unit used in the US for tire pressure, air compressors, and hydraulic systems. 1 PSI = 6894.76 pascals.' },
      { q: 'How do I convert bar to PSI?', a: '1 bar = 14.504 PSI. Select bar as the "From" unit and PSI as the "To" unit to see this conversion. This is common for European tire pressure specs.' },
      { q: 'What is mmHg used for?', a: 'mmHg (millimetres of mercury) is used for blood pressure readings (e.g., 120/80 mmHg) and barometric pressure. 1 mmHg = 133.322 pascals. It is also called torr.' },
      { q: 'Are the conversions accurate?', a: 'Yes. The tool uses standard conversion factors (1 atm = 101325 Pa, 1 bar = 100000 Pa, 1 PSI = 6894.76 Pa). Results are accurate to 8 decimal places.' },
    ],
  },
  'product-schema-generator': {
    whatIs: 'The Product Schema Generator creates JSON-LD structured data for product pages. This schema helps Google display rich results with price, availability, ratings, and images in search results.',
    howTo: [
      'Enter your product name, description, and brand.',
      'Add the product URL, image URL, and price.',
      'Optionally include availability status, SKU, and rating information.',
      'Copy the generated JSON-LD and paste it into your product page\'s <head>.',
    ],
    benefits: [
      { title: 'Product rich results', description: 'Product schema makes your listings eligible for rich results showing price, availability, and ratings directly in Google Search, increasing click-through rates.' },
      { title: 'Google Shopping eligibility', description: 'Product structured data is required for Google Shopping listings and Merchant Center. The tool generates schema that meets Google\'s product data specifications.' },
      { title: 'No schema knowledge needed', description: 'The tool handles JSON-LD syntax, Product type, Offer nesting, and AggregateRating. You just fill in your product details.' },
      { title: 'Valid structured data', description: 'The output follows Google\'s Product schema specification, minimizing validation errors in Search Console\'s Rich Results Test.' },
    ],
    faqs: [
      { q: 'What fields are required for product schema?', a: 'Google requires name and price (via Offer). For rich results, include image, availability, and price. For ratings, include AggregateRating with ratingValue and reviewCount.' },
      { q: 'Can I include reviews?', a: 'Yes. The tool supports AggregateRating fields. For individual reviews, use Review schema. Be aware that Google has strict guidelines about review schema — only include genuine reviews.' },
      { q: 'Does product schema improve rankings?', a: 'Schema itself is not a direct ranking factor, but rich results (price, availability shown in search) significantly improve click-through rates, which indirectly benefits rankings.' },
      { q: 'Where do I place the product schema?', a: 'Add it to the <head> section of your product page, wrapped in <script type="application/ld+json"> tags. The tool generates the complete script tag.' },
    ],
  },
  'qr-label-generator': {
    whatIs: 'The QR Label Generator creates QR codes formatted as printable labels. It generates QR codes with customizable size, border, and text, suitable for printing on labels for products, packaging, or events.',
    howTo: [
      'Enter the content to encode in the QR code (URL, text, or contact info).',
      'Set the QR code size and label dimensions for printing.',
      'Optionally add a text label below or above the QR code.',
      'Download the label image and print it on standard label sheets.',
    ],
    benefits: [
      { title: 'Print-ready labels', description: 'Generate QR codes sized for standard label sheets (A4, Avery). Print product labels, packaging codes, or event badges without specialized label software.' },
      { title: 'Customizable text', description: 'Add a text label (product name, URL, instructions) alongside the QR code, so users know what they are scanning before they scan it.' },
      { title: 'No design software needed', description: 'Create QR labels without Photoshop, Illustrator, or dedicated label software. The tool generates the complete label image in your browser.' },
      { title: 'High-resolution output', description: 'The QR code is generated at high resolution for crisp printing. Low-resolution QR codes fail to scan — this tool ensures print quality.' },
    ],
    faqs: [
      { q: 'What size should QR code labels be?', a: 'For reliable scanning, QR codes should be at least 2x2 cm (0.8x0.8 inches) when printed. Larger codes scan more reliably, especially from a distance.' },
      { q: 'Can I generate multiple labels at once?', a: 'No. The tool generates one label at a time. For batch label generation, create each label separately and arrange them in a document for printing.' },
      { q: 'What content can I encode?', a: 'URLs (most common), plain text, phone numbers, SMS, email addresses, Wi-Fi credentials, and vCard contact information. The QR code format supports all these types.' },
      { q: 'How do I ensure the QR code scans reliably?', a: 'Use high contrast (black on white), adequate size (at least 2cm), and a quiet zone (white border) around the code. The tool includes a quiet zone by default.' },
    ],
  },
  'random-number-generator': {
    whatIs: 'The Random Number Generator produces random numbers within a specified range. Set the minimum and maximum values and the quantity, then generate random numbers for games, sampling, or testing.',
    howTo: [
      'Enter the minimum and maximum values for your range.',
      'Set how many random numbers you want to generate.',
      'Optionally choose whether to allow duplicates.',
      'Click Generate to produce the random numbers.',
    ],
    benefits: [
      { title: 'Customizable range', description: 'Generate random numbers between any minimum and maximum values. Use small ranges for dice simulation or large ranges for lottery-style numbers.' },
      { title: 'No duplicates option', description: 'Choose to generate unique numbers (no duplicates) or allow repeats. Unique mode is useful for sampling and lottery draws.' },
      { title: 'Multiple numbers at once', description: 'Generate a single random number or hundreds at once. Copy the entire set to your clipboard with one click.' },
      { title: 'Uses crypto-grade randomness', description: 'The tool uses JavaScript\'s Math.random for generation, which is sufficient for most non-cryptographic uses. For security-sensitive randomness, use a dedicated crypto library.' },
    ],
    faqs: [
      { q: 'Is the randomness truly random?', a: 'The tool uses Math.random(), which is a pseudo-random number generator (PRNG). It is sufficient for games, sampling, and testing. For cryptographic security, use crypto.getRandomValues().' },
      { q: 'Can I generate lottery numbers?', a: 'Yes. Set the range (e.g., 1-49) and quantity (e.g., 6), and enable "no duplicates" to simulate a lottery draw.' },
      { q: 'What is the maximum range?', a: 'The tool supports ranges up to JavaScript\'s safe integer limit (9,007,199,254,740,991). For practical purposes, ranges up to 1,000,000 work smoothly.' },
      { q: 'Can I generate decimal numbers?', a: 'The tool generates integers. For decimal random numbers, generate an integer and divide by a factor, or use a programming language\'s random float function.' },
    ],
  },
  'random-pin-generator': {
    whatIs: 'The Random PIN Generator creates numeric PIN codes of customizable length. Generate 4-digit, 6-digit, or any length PIN for banking, devices, or security purposes.',
    howTo: [
      'Set the PIN length (e.g., 4 for standard PINs, 6 for banking PINs).',
      'Set how many PINs you want to generate.',
      'Click Generate to produce the random PIN codes.',
      'Copy the PINs to your clipboard.',
    ],
    benefits: [
      { title: 'Customizable PIN length', description: 'Generate PINs of any length — 4 digits for simple devices, 6 digits for banking, 8+ digits for high-security applications.' },
      { title: 'Multiple PINs at once', description: 'Generate a batch of PINs for multiple users, devices, or accounts. Copy them all at once.' },
      { title: 'No duplicates option', description: 'Choose to generate unique PINs (no duplicates within the batch) or allow repeats, depending on your use case.' },
      { title: 'No data stored', description: 'Generated PINs are created in your browser and never sent to a server. For security, clear the page after copying your PINs.' },
    ],
    faqs: [
      { q: 'Are the PINs secure?', a: 'The tool uses Math.random() for generation, which is suitable for PIN generation but not for cryptographic keys. For maximum security, generate PINs offline or use a hardware random number generator.' },
      { q: 'What PIN length should I use?', a: '4 digits for low-security (device unlock), 6 digits for banking and standard security, 8+ digits for high-security applications. Longer PINs are exponentially harder to guess.' },
      { q: 'Can I generate alphanumeric PINs?', a: 'No. This tool generates numeric PINs only. For alphanumeric codes, use the Password Generator or OTP Generator.' },
      { q: 'Should I trust online PIN generators?', a: 'This tool runs entirely in your browser — no data is transmitted. However, for the highest security, generate PINs on an offline device or use a hardware token. Never reuse the same PIN across multiple accounts.' },
    ],
  },
  'random-text-generator': {
    whatIs: 'The Random Text Generator produces random words, sentences, or paragraphs from a built-in word and sentence pool. It is useful for placeholder content, testing layouts, and filling mockups.',
    howTo: [
      'Choose the type of content to generate: words, sentences, or paragraphs.',
      'Set the quantity (number of words, sentences, or paragraphs).',
      'Click Generate to produce the random text.',
      'Copy the result to use as placeholder content in your designs or tests.',
    ],
    benefits: [
      { title: 'Placeholder content for mockups', description: 'Fill design mockups and wireframes with realistic-looking text instead of "lorem ipsum" or "test text." This gives a better sense of how the layout looks with real content.' },
      { title: 'Three content types', description: 'Generate individual words, full sentences, or multi-sentence paragraphs. Choose the type that best fits your layout or testing needs.' },
      { title: 'Testing and development', description: 'Use random text to test text rendering, word wrapping, truncation, and character limits in your application without writing real content.' },
      { title: 'No sign-up needed', description: 'Generate as much random text as you need without creating an account or hitting usage limits.' },
    ],
    faqs: [
      { q: 'Is the generated text meaningful?', a: 'No. The tool selects random words and sentences from a fixed pool. The output is grammatically correct at the sentence level but does not form coherent paragraphs. It is placeholder content, not real writing.' },
      { q: 'How is this different from Lorem Ipsum?', a: 'Lorem Ipsum is scrambled Latin that looks like text but is meaningless. This tool generates English words and sentences, which may be more useful for English-language mockups.' },
      { q: 'Can I use this for SEO content?', a: 'No. Random text has no SEO value and will be flagged as thin content by search engines. Use it only for testing and placeholder purposes.' },
      { q: 'How much text can I generate?', a: 'You can generate up to 100 words, sentences, or paragraphs at a time. For more, click Generate multiple times and combine the results.' },
    ],
  },
  'remove-extra-spaces': {
    whatIs: 'The Remove Extra Spaces tool cleans up text by collapsing multiple spaces into single spaces, removing trailing spaces from lines, and reducing excessive blank lines. It produces clean, consistently spaced text.',
    howTo: [
      'Paste your text into the input field.',
      'The tool automatically cleans the text in real time.',
      'Review the cleaned result in the output field.',
      'Copy the cleaned text to your clipboard.',
    ],
    benefits: [
      { title: 'Fix messy formatting', description: 'Text copied from PDFs, emails, or websites often has irregular spacing. This tool normalizes it instantly without manual editing.' },
      { title: 'Collapses multiple spaces', description: 'Multiple consecutive spaces are reduced to single spaces. Tabs are also normalized to single spaces.' },
      { title: 'Removes excessive blank lines', description: 'Three or more consecutive newlines are reduced to two (one blank line), keeping paragraph breaks while removing excessive whitespace.' },
      { title: 'Trims line endings', description: 'Trailing spaces at the end of each line are removed, which prevents invisible formatting issues in code and documents.' },
    ],
    faqs: [
      { q: 'Does it remove all spaces?', a: 'No. It collapses multiple spaces to single spaces. Single spaces are preserved. The tool normalizes spacing, it does not eliminate it.' },
      { q: 'Does it remove line breaks?', a: 'No. Single line breaks are preserved. Multiple consecutive blank lines (3+) are reduced to a single blank line (2 newlines).' },
      { q: 'Can I choose which spaces to remove?', a: 'The tool applies a standard cleanup: collapse spaces, trim lines, reduce blank lines. For more granular control, use the Text Cleaner tool which offers individual options.' },
      { q: 'Is my text stored?', a: 'No. All processing happens in your browser. Your text never leaves your device.' },
    ],
  },
  'rgb-to-hex': {
    whatIs: 'The RGB to HEX Converter transforms RGB (red, green, blue) values into a HEX color code. Enter R, G, and B values (0-255) and get the hex equivalent with a live color preview.',
    howTo: [
      'Enter the R (red), G (green), and B (blue) values (0-255 each).',
      'The tool instantly converts them to a HEX color code.',
      'View the color swatch to verify the result.',
      'Copy the HEX code to your clipboard.',
    ],
    benefits: [
      { title: 'Instant conversion', description: 'The HEX code updates as you type the RGB values. No submit button needed.' },
      { title: 'Visual color preview', description: 'A color swatch shows the exact color, so you can verify the conversion is correct before copying the HEX code.' },
      { title: 'Essential for web development', description: 'CSS uses both RGB and HEX. Convert between them to match design tool outputs (often RGB) with CSS (often HEX).' },
      { title: 'Handles edge cases', description: 'Values are clamped to 0-255. The tool handles edge values (0, 255) and produces valid 6-digit HEX codes with leading zeros.' },
    ],
    faqs: [
      { q: 'What is a HEX color code?', a: 'A HEX color code is a 6-character hexadecimal string representing red, green, and blue values. For example, #6366f1 is indigo (99 red, 102 green, 241 blue).' },
      { q: 'Can I convert HEX back to RGB?', a: 'Yes. Use the HEX to RGB tool for the reverse conversion. Or use the Color Converter, which shows all three formats simultaneously.' },
      { q: 'Why are my RGB values being clamped?', a: 'RGB values must be between 0 and 255. If you enter a value outside this range, the tool clamps it to the nearest valid value (0 for negatives, 255 for values above 255).' },
      { q: 'Does it support alpha transparency?', a: 'This tool converts solid colors only. For transparency, use rgba(r, g, b, a) and convert to 8-digit HEX (#RRGGBBAA) manually.' },
    ],
  },
  'schema-markup-generator': {
    whatIs: 'The Schema Markup Generator creates JSON-LD structured data for your web pages. It supports multiple schema types (Article, Product, FAQ, Breadcrumb, Event, Organization) to help search engines understand your content.',
    howTo: [
      'Select the schema type you need (Article, Product, FAQ, etc.).',
      'Fill in the required fields for the selected schema type.',
      'Click Generate to produce the JSON-LD structured data.',
      'Copy the output and paste it into your page\'s <head> section.',
    ],
    benefits: [
      { title: 'Multiple schema types', description: 'One tool handles Article, Product, FAQ, Breadcrumb, Event, and Organization schemas. Generate the right structured data for any page type.' },
      { title: 'Rich result eligibility', description: 'Schema markup makes your pages eligible for rich results in Google Search — star ratings, event details, FAQs, and product information shown directly in search listings.' },
      { title: 'No schema expertise needed', description: 'The tool handles JSON-LD syntax, required fields, and proper nesting. You just fill in your content details.' },
      { title: 'Google-compliant output', description: 'The generated schema follows Google\'s structured data guidelines, reducing the risk of validation errors in Search Console.' },
    ],
    faqs: [
      { q: 'Which schema type should I use?', a: 'Use Article for blog posts, Product for product pages, FAQ for FAQ pages, Breadcrumb for navigation trails, Event for events, and Organization for your homepage or about page.' },
      { q: 'Can I use multiple schema types on one page?', a: 'Yes. Generate each schema type separately and include multiple JSON-LD blocks in your <head>. Google supports multiple schema types on the same page.' },
      { q: 'How do I test my schema?', a: 'Use Google\'s Rich Results Test (search.google.com/test/rich-results) to validate your schema. Paste the JSON-LD or enter your URL to check for errors.' },
      { q: 'Does schema markup improve rankings?', a: 'Schema is not a direct ranking factor, but it helps Google understand your content and enables rich results, which improve click-through rates from search.' },
    ],
  },
  'serp-pixel-checker': {
    whatIs: 'The SERP Pixel Checker measures the pixel dimensions of search engine result pages. It helps SEO professionals understand how much screen space different SERP elements occupy across devices.',
    howTo: [
      'Enter a keyword or URL to analyze.',
      'The tool displays the SERP layout with pixel measurements.',
      'Review the dimensions of different SERP elements (ads, organic, featured snippets).',
      'Use the data to optimize your titles and meta descriptions for visibility.',
    ],
    benefits: [
      { title: 'SERP layout analysis', description: 'Understand how much vertical space different SERP features (ads, featured snippets, people also ask) occupy, which affects how visible your organic result is.' },
      { title: 'Title and description optimization', description: 'See how your titles and meta descriptions render at different screen sizes. Ensure your most important text is visible without truncation.' },
      { title: 'Mobile and desktop comparison', description: 'Compare SERP layouts between mobile and desktop to optimize for both. Mobile SERPs have different element sizes and truncation points.' },
      { title: 'No tools installation', description: 'Analyze SERP pixel dimensions without installing browser extensions or SEO tools. The tool provides a clean interface for SERP analysis.' },
    ],
    faqs: [
      { q: 'What is a SERP?', a: 'SERP stands for Search Engine Results Page — the page Google shows after a search. It includes organic results, ads, featured snippets, knowledge panels, and other elements.' },
      { q: 'Why do pixel dimensions matter?', a: 'The position of your result on the screen (in pixels from the top) affects click-through rate. Results below the fold (not visible without scrolling) get significantly fewer clicks.' },
      { q: 'Can I check live SERPs?', a: 'The tool provides a simulated SERP layout based on typical Google result page dimensions. For live SERP analysis, use Google directly and measure with browser DevTools.' },
      { q: 'How accurate are the measurements?', a: 'The tool uses standard SERP element dimensions based on Google\'s current layout. Google frequently updates its layout, so measurements may vary from the actual SERP on any given day.' },
    ],
  },
  'sha1-hash-generator': {
    whatIs: 'The SHA-1 Hash Generator creates SHA-1 hash values from text input. SHA-1 produces a 40-character hexadecimal hash that uniquely identifies the input data.',
    howTo: [
      'Paste or type your text into the input field.',
      'The tool instantly computes the SHA-1 hash.',
      'Copy the 40-character hex hash to your clipboard.',
      'Use the hash for checksums, file verification, or data identification.',
    ],
    benefits: [
      { title: 'Instant hashing', description: 'The SHA-1 hash is computed as you type, with no submit button. Results appear in real time.' },
      { title: 'File integrity verification', description: 'Generate SHA-1 checksums to verify file integrity. Compare the hash before and after transfer to detect corruption.' },
      { title: 'Runs in your browser', description: 'Hashing uses the Web Crypto API locally. Your text never leaves your device.' },
      { title: 'Consistent output', description: 'SHA-1 always produces a 40-character hexadecimal string, regardless of input size. The same input always produces the same hash.' },
    ],
    faqs: [
      { q: 'Is SHA-1 secure?', a: 'No. SHA-1 has known collision vulnerabilities and is deprecated for security-sensitive applications. Use SHA-256 for security purposes. SHA-1 is still acceptable for non-security checksums and data identification.' },
      { q: 'What is SHA-1 used for?', a: 'SHA-1 is used for checksums, file identification, and data fingerprinting. Git uses SHA-1 for commit hashes. It should not be used for password hashing or digital signatures.' },
      { q: 'Can SHA-1 be reversed?', a: 'No. SHA-1 is a one-way hash function. You cannot derive the original input from the hash. The only way to "reverse" it is via brute force or rainbow tables, which is computationally expensive.' },
      { q: 'What is the difference between SHA-1 and MD5?', a: 'SHA-1 produces a 160-bit (40-character hex) hash. MD5 produces a 128-bit (32-character hex) hash. Both are deprecated for security, but SHA-1 is slightly more resistant to collision attacks.' },
    ],
  },
  'svg-optimizer': {
    whatIs: 'The SVG Optimizer cleans and compresses SVG files by removing unnecessary metadata, comments, whitespace, and redundant data. It reduces file size without affecting the visual output.',
    howTo: [
      'Paste your SVG code into the input field, or upload an SVG file.',
      'Click Optimize to clean the SVG.',
      'Review the optimized output and the file size reduction.',
      'Download or copy the optimized SVG.',
    ],
    benefits: [
      { title: 'Smaller file sizes', description: 'SVG files from design tools (Illustrator, Figma, Inkscape) often contain metadata, comments, and redundant data. The optimizer removes these, typically reducing size by 30-60%.' },
      { title: 'Faster page loads', description: 'Optimized SVGs load faster, which improves page speed scores (Core Web Vitals) and user experience, especially on mobile and slow connections.' },
      { title: 'No visual quality loss', description: 'The optimizer removes only non-visual data (metadata, comments, whitespace). The rendered SVG looks identical to the original.' },
      { title: 'Processed in your browser', description: 'Optimization is done locally. Your SVG files never leave your device.' },
    ],
    faqs: [
      { q: 'What does the optimizer remove?', a: 'The tool removes XML comments, editor metadata (Illustrator, Inkscape namespaces), redundant whitespace, empty elements, and unused definitions. It preserves all visual content.' },
      { q: 'Will the optimized SVG look different?', a: 'No. The optimizer removes only non-visual data. The rendered output is pixel-identical to the original. If you see a difference, it is a bug — report it.' },
      { q: 'Can it optimize animated SVGs?', a: 'Yes. The optimizer preserves animation elements (<animate>, <animateTransform>). It does not remove SMIL animation declarations.' },
      { q: 'How much does it reduce file size?', a: 'Reduction depends on the original SVG. SVGs from design tools with lots of metadata typically shrink 30-60%. Already-optimized SVGs shrink less. Hand-written SVGs may not shrink at all.' },
    ],
  },
  'svg-to-png': {
    whatIs: 'The SVG to PNG Converter transforms vector SVG files into raster PNG images. Choose the output resolution and the tool renders the SVG at that size, producing a PNG suitable for use in any application.',
    howTo: [
      'Upload an SVG file or paste SVG code into the input field.',
      'Set the output width and height (or use the SVG\'s native dimensions).',
      'Click Convert to render the SVG as a PNG.',
      'Download the PNG file.',
    ],
    benefits: [
      { title: 'Universal format support', description: 'Not all applications support SVG. Convert to PNG for use in Word documents, email signatures, social media, and any platform that requires raster images.' },
      { title: 'Custom resolution', description: 'Choose the output resolution. Render at 2x or 3x the SVG\'s native size for high-DPI (retina) displays, or at a specific pixel size for web use.' },
      { title: 'No quality loss at any size', description: 'Since SVG is vector-based, the conversion to PNG produces crisp output at any resolution. Unlike resizing a PNG, there is no quality degradation.' },
      { title: 'Processed locally', description: 'The conversion uses the browser\'s Canvas API. Your SVG files never leave your device.' },
    ],
    faqs: [
      { q: 'What resolution should I use?', a: 'For web use, 2x the display size (e.g., 200x200 for a 100x100 display element) ensures crisp rendering on retina displays. For print, use 300 DPI at the physical size.' },
      { q: 'Does it preserve transparency?', a: 'Yes. SVGs with transparent backgrounds produce PNGs with alpha transparency. The transparent areas remain transparent in the output.' },
      { q: 'Can it convert animated SVGs?', a: 'No. The tool converts the first frame of an animated SVG to a static PNG. For animated raster output, use a video format instead.' },
      { q: 'What is the maximum output size?', a: 'The tool can render SVGs up to several thousand pixels per dimension. Very large outputs (10,000+ pixels) may cause memory issues on some devices.' },
    ],
  },
  'svg-viewer': {
    whatIs: 'The SVG Viewer opens and displays SVG (Scalable Vector Graphics) files in your browser. It renders the SVG image and also shows the underlying XML code, so you can inspect the structure.',
    howTo: [
      'Upload an SVG file by dragging it into the upload zone, or paste SVG code.',
      'The tool renders the SVG image in the preview area.',
      'View the SVG source code alongside the rendered image.',
      'Download or copy the SVG if needed.',
    ],
    benefits: [
      { title: 'Instant SVG preview', description: 'Quickly view SVG files without opening them in a browser tab or design tool. The viewer renders the image and shows the code simultaneously.' },
      { title: 'Code inspection', description: 'See the XML source code of the SVG alongside the rendered image. This is useful for debugging SVG issues or learning how SVGs are structured.' },
      { title: 'No software needed', description: 'View SVGs without Illustrator, Inkscape, or Figma. The tool works in any modern browser.' },
      { title: 'Privacy-first', description: 'SVG files are rendered locally in your browser. Your vector graphics never leave your device.' },
    ],
    faqs: [
      { q: 'Can I edit the SVG in the viewer?', a: 'The viewer displays the SVG code but does not provide editing tools. For editing, use a vector editor like Inkscape, Illustrator, or Figma, or edit the XML directly.' },
      { q: 'Does it support animated SVGs?', a: 'The viewer renders static SVGs. SMIL animations may play in the preview, but the tool is designed for static viewing, not animation playback.' },
      { q: 'Can I copy the SVG code?', a: 'Yes. The tool displays the SVG source code, which you can copy to your clipboard for use in HTML or other applications.' },
      { q: 'Does it render all SVG features?', a: 'The tool uses the browser\'s native SVG renderer, which supports most SVG features. Some advanced features (filters, complex masks) may render differently across browsers.' },
    ],
  },
  'text-cleaner': {
    whatIs: 'The Text Cleaner removes unwanted elements from text: HTML tags, special characters, empty lines, and extra spaces. It offers individual toggles for each cleaning operation, giving you full control.',
    howTo: [
      'Paste your text into the input field.',
      'Toggle the cleaning options you want: trim lines, collapse spaces, remove empty lines, remove special characters, remove HTML tags, convert to lowercase.',
      'The cleaned text appears instantly in the output field.',
      'Copy the cleaned text to your clipboard.',
    ],
    benefits: [
      { title: 'Granular control', description: 'Unlike all-or-nothing cleaners, this tool lets you choose exactly which cleaning operations to apply. Enable only what you need.' },
      { title: 'Remove HTML tags', description: 'Strip HTML tags from text copied from web pages. The tool removes all <tags> while preserving the text content between them.' },
      { title: 'Remove special characters', description: 'Strip non-alphanumeric characters (keeping letters, numbers, spaces, and basic punctuation). Useful for cleaning data for import or analysis.' },
      { title: 'All processing local', description: 'Text cleaning happens entirely in your browser. Your content never leaves your device.' },
    ],
    faqs: [
      { q: 'What does "remove special characters" do?', a: 'It removes characters that are not letters, numbers, spaces, or basic punctuation (.,!?;:\'"()-). This is useful for cleaning text for data processing or analysis.' },
      { q: 'Can I combine multiple cleaning options?', a: 'Yes. Enable any combination of options. They are applied in sequence: HTML removal, special character removal, space collapsing, line trimming, empty line removal, and lowercase conversion.' },
      { q: 'Does it preserve line breaks?', a: 'Yes, unless you enable "Remove empty lines." Line breaks are preserved; only empty lines (lines with only whitespace) are removed when that option is on.' },
      { q: 'How is this different from Remove Extra Spaces?', a: 'Remove Extra Spaces focuses only on spacing. Text Cleaner offers six independent cleaning options, giving you more control over the output.' },
    ],
  },
  'text-compare': {
    whatIs: 'The Text Compare tool shows differences between two text inputs side by side. It highlights lines that differ between the left and right versions, making it easy to spot changes.',
    howTo: [
      'Paste the original text in the left input field.',
      'Paste the modified text in the right input field.',
      'The tool displays a side-by-side comparison with differences highlighted.',
      'Review the highlighted rows to see what changed.',
    ],
    benefits: [
      { title: 'Spot changes instantly', description: 'See exactly which lines changed between two versions of text. The tool highlights differing rows in red, making changes immediately visible.' },
      { title: 'No diff software needed', description: 'Compare text without Git, diff tools, or command-line utilities. The tool works in any browser.' },
      { title: 'Useful for editing', description: 'Compare an original document with an edited version to verify changes. Useful for editors, writers, and reviewers who need to track modifications.' },
      { title: 'Line-by-line comparison', description: 'The tool compares line by line, showing both versions side by side. Lines that match are shown normally; lines that differ are highlighted.' },
    ],
    faqs: [
      { q: 'How does the comparison work?', a: 'The tool splits both texts by newline and compares corresponding lines. Lines that are identical are shown normally; lines that differ are highlighted in red. This is a line-level diff, not a character-level diff.' },
      { q: 'Can it compare code?', a: 'Yes. Paste two versions of code to see which lines changed. However, the tool does not do syntax-aware diffing — it compares text line by line regardless of language.' },
      { q: 'Does it show insertions and deletions?', a: 'The tool shows both versions side by side. If a line exists in one version but not the other, it appears as an empty cell in the other column. This makes insertions and deletions visible.' },
      { q: 'Is there a text size limit?', a: 'There is no hard limit, but very large texts (1MB+) may slow the comparison. For most documents (under 100KB), comparison is instant.' },
    ],
  },
  'text-repeater': {
    whatIs: 'The Text Repeater duplicates text a specified number of times with a chosen separator. Enter text, set the repeat count, choose a separator (new line, tab, space, comma), and copy the result.',
    howTo: [
      'Enter the text you want to repeat.',
      'Set the repeat count (1-10,000).',
      'Choose a separator: new line, tab, space, or comma+space.',
      'The result appears instantly. Copy it to your clipboard.',
    ],
    benefits: [
      { title: 'Generate repeated content', description: 'Create repeated text for testing, formatting, data generation, or creative purposes. No need to copy and paste manually hundreds of times.' },
      { title: 'Customizable separators', description: 'Choose how repeated text is joined — new lines for lists, tabs for data, spaces for sentences, or commas for CSV-style output.' },
      { title: 'Up to 10,000 repetitions', description: 'Repeat text up to 10,000 times. The result includes a character count so you can verify the output size.' },
      { title: 'Instant results', description: 'The repeated text appears as you type and adjust settings. No submit button needed.' },
    ],
    faqs: [
      { q: 'What is the maximum repeat count?', a: 'You can repeat text up to 10,000 times. Very high counts with long text may produce large outputs that slow down the display.' },
      { q: 'Can I use custom separators?', a: 'The tool offers four separator options: new line, tab, space, and comma+space. For custom separators, copy the result and use Find and Replace to change the separator.' },
      { q: 'Does it work with multi-line text?', a: 'Yes. If your input text contains line breaks, each repetition includes them. Use the new line separator to keep repetitions on separate lines.' },
      { q: 'Is there a character limit?', a: 'The tool does not impose a character limit, but very large outputs (1MB+) may slow down the browser. For most uses, outputs under 100KB work smoothly.' },
    ],
  },
  'text-reverser': {
    whatIs: 'The Text Reverser flips text in three modes: reverse characters (mirror text), reverse words (word order), or reverse lines (line order). Choose the mode and the tool reverses instantly.',
    howTo: [
      'Paste your text into the input field.',
      'Choose the reverse mode: Characters, Words, or Lines.',
      'The reversed text appears instantly in the output field.',
      'Copy the reversed text to your clipboard.',
    ],
    benefits: [
      { title: 'Three reverse modes', description: 'Reverse characters (mirror text left-to-right), reverse word order (last word first), or reverse line order (bottom to top). Choose the mode that fits your need.' },
      { title: 'Instant results', description: 'The reversed text updates as you type and switch modes. No submit button needed.' },
      { title: 'Useful for testing', description: 'Test how text renders in right-to-left contexts, create palindrome-style content, or reverse line order for log analysis.' },
      { title: 'No data uploaded', description: 'All text processing happens in your browser. Your content never leaves your device.' },
    ],
    faqs: [
      { q: 'What does "reverse characters" do?', a: 'It reverses the entire string character by character. "Hello" becomes "olleH". This mirrors the text left-to-right.' },
      { q: 'What does "reverse words" do?', a: 'It reverses the order of words while keeping each word\'s characters in normal order. "Hello world" becomes "world Hello".' },
      { q: 'What does "reverse lines" do?', a: 'It reverses the order of lines. The last line becomes the first, the second-to-last becomes the second, and so on. Useful for reversing log file order.' },
      { q: 'Can I reverse text in multiple languages?', a: 'Yes. The tool reverses Unicode text, so it works with any language. However, complex scripts (Arabic, Hebrew) that are already right-to-left may produce unexpected results when character-reversed.' },
    ],
  },
  'timestamp-converter': {
    whatIs: 'The Timestamp Converter converts between Unix timestamps and human-readable dates. Enter a Unix timestamp to see the corresponding UTC date, or enter a date to get the Unix timestamp.',
    howTo: [
      'Enter a Unix timestamp (in seconds) to convert to a date.',
      'The tool displays the corresponding UTC date instantly.',
      'Or enter an ISO date to convert to a Unix timestamp.',
      'Copy either value for use in your application.',
    ],
    benefits: [
      { title: 'Bidirectional conversion', description: 'Convert from Unix timestamp to date, or from date to Unix timestamp. Both directions work instantly.' },
      { title: 'UTC display', description: 'Timestamps are displayed in UTC, which is the standard for Unix timestamps. This avoids timezone confusion in international applications.' },
      { title: 'Essential for developers', description: 'Unix timestamps are used in APIs, databases, logs, and configuration files. Convert between human-readable dates and timestamps during development and debugging.' },
      { title: 'No server needed', description: 'Conversion uses JavaScript\'s Date object in your browser. No internet connection required.' },
    ],
    faqs: [
      { q: 'What is a Unix timestamp?', a: 'A Unix timestamp is the number of seconds that have elapsed since January 1, 1970 (UTC), not counting leap seconds. It is the standard time format in Unix systems and many APIs.' },
      { q: 'Does it use seconds or milliseconds?', a: 'The tool uses seconds, which is the standard Unix timestamp format. JavaScript uses milliseconds internally, but the tool handles the conversion.' },
      { q: 'What timezone is the date displayed in?', a: 'The timestamp-to-date conversion displays in UTC. The date-to-timestamp conversion uses your local timezone for the input, then converts to UTC for the timestamp.' },
      { q: 'Can it handle dates before 1970?', a: 'Yes. Unix timestamps can be negative for dates before January 1, 1970. The tool handles both positive and negative timestamps.' },
    ],
  },
  'unix-time-converter': {
    whatIs: 'The Unix Time Converter displays the current Unix timestamp in real time and converts any Unix timestamp to a human-readable date in your local timezone.',
    howTo: [
      'The tool displays the current Unix time, updating every second.',
      'Enter a Unix timestamp in the input field.',
      'Click Convert to see the corresponding local date and time.',
      'Copy the converted date for use in your application.',
    ],
    benefits: [
      { title: 'Live Unix clock', description: 'See the current Unix timestamp updating in real time, which is useful for syncing with API timestamps or verifying system time.' },
      { title: 'Local timezone display', description: 'Unlike the Timestamp Converter (which shows UTC), this tool displays the converted time in your local timezone, making it more intuitive for quick lookups.' },
      { title: 'Essential for developers', description: 'Unix timestamps are used in APIs, databases, logs, and configuration files. Convert them to readable dates during development and debugging.' },
      { title: 'No server needed', description: 'Conversion uses JavaScript\'s Date object in your browser. No internet connection required.' },
    ],
    faqs: [
      { q: 'What is Unix time?', a: 'Unix time is the number of seconds since January 1, 1970 (UTC). It is the standard time representation in Unix systems, databases, and many APIs.' },
      { q: 'Why does the current time not match my server?', a: 'The tool uses your device\'s system clock. If your device time is incorrect or in a different timezone than your server, the displayed time will differ. Ensure your system clock is synchronized.' },
      { q: 'Does it use seconds or milliseconds?', a: 'The tool uses seconds, which is the standard Unix timestamp format. JavaScript uses milliseconds internally, but the tool handles the conversion.' },
      { q: 'Can it handle future timestamps?', a: 'Yes. Enter any future timestamp and the tool converts it to a date. This is useful for calculating expiration dates from API tokens or scheduled events.' },
    ],
  },
  'url-preview': {
    whatIs: 'The URL Preview tool shows how a URL will appear when shared on social media and messaging platforms. It displays the Open Graph title, description, and image that platforms like Facebook, Twitter, and Slack use for link previews.',
    howTo: [
      'Enter a URL (including https://) that you want to preview.',
      'Click Check to fetch the page\'s meta tags.',
      'Review the preview card showing the title, description, and image.',
      'Adjust your page\'s meta tags if the preview does not look right.',
    ],
    benefits: [
      { title: 'Social sharing optimization', description: 'See exactly how your link will appear when shared on Facebook, Twitter, LinkedIn, and Slack. Ensure the title, description, and image are compelling before sharing.' },
      { title: 'Debug Open Graph tags', description: 'If your link previews are broken or showing wrong content, the tool helps you identify which meta tags are missing or incorrect.' },
      { title: 'Image preview', description: 'See whether your og:image is loading correctly. Missing or broken images make shared links look unprofessional and reduce click-through rates.' },
      { title: 'No extensions needed', description: 'Preview link cards without browser extensions or platform-specific debugging tools. The tool fetches and displays the meta tags directly.' },
    ],
    faqs: [
      { q: 'Why does my preview show no image?', a: 'Your page may be missing the og:image meta tag, or the image URL may be incorrect or not publicly accessible. Check that the image URL returns a valid image when loaded directly.' },
      { q: 'How do I fix a broken preview?', a: 'Ensure your page has proper Open Graph tags: og:title, og:description, og:image, and og:url. Use the Open Graph Generator to create these tags, then re-check the preview.' },
      { q: 'Does it work for any URL?', a: 'The tool fetches meta tags from URLs that allow cross-origin requests. Some sites may block cross-origin fetching due to CORS policies. For your own sites, it works reliably.' },
      { q: 'How often do platforms cache previews?', a: 'Facebook caches link previews for 30 days. Slack caches for 24 hours. Twitter does not cache. After updating your meta tags, use each platform\'s debugging tool to force a re-fetch.' },
    ],
  },
  'user-agent-parser': {
    whatIs: 'The User Agent Parser decodes a user agent string into structured information: browser name and version, operating system, device type, and rendering engine. It makes sense of the complex UA string format.',
    howTo: [
      'Paste a user agent string into the input field.',
      'The tool parses it and displays the browser, OS, and device information.',
      'Review the structured output in the results panel.',
      'Copy any field you need for analytics or debugging.',
    ],
    benefits: [
      { title: 'Decode complex UA strings', description: 'User agent strings are notoriously complex and inconsistent. The parser extracts the meaningful information (browser, OS, device) from the raw string.' },
      { title: 'Analytics and debugging', description: 'Parse user agents from server logs or analytics data to understand what browsers and devices your visitors use. This informs browser support decisions.' },
      { title: 'Device type detection', description: 'Identify whether a user agent represents a mobile device, tablet, or desktop. This is useful for responsive design testing and mobile optimization.' },
      { title: 'No data stored', description: 'Parsing happens entirely in your browser. User agent strings are not transmitted to any server.' },
    ],
    faqs: [
      { q: 'What is a user agent string?', a: 'A user agent string is sent by your browser with every HTTP request. It identifies the browser, version, operating system, and sometimes device. Websites use it for compatibility and analytics.' },
      { q: 'Can user agents be faked?', a: 'Yes. Browsers and extensions can spoof user agents. Do not rely on user agents for security or authentication. They are useful for analytics, not for access control.' },
      { q: 'Why is the parsing sometimes inaccurate?', a: 'User agent strings are not standardized. Browsers can include arbitrary text, and new browsers may not be recognized. The parser uses pattern matching, which may not cover every possible format.' },
      { q: 'Can I parse my own user agent?', a: 'Yes. Use the Browser Information tool to see your own user agent, then paste it into the parser to see the decoded information.' },
    ],
  },
  'uuid-bulk-generator': {
    whatIs: 'The UUID Bulk Generator creates multiple UUIDs (Universally Unique Identifiers) at once. Generate up to 1,000 UUIDs in a single operation, with options for uppercase and hyphen removal.',
    howTo: [
      'Set the number of UUIDs to generate (1-1,000).',
      'Toggle Uppercase and No Hyphens options as needed.',
      'Click Generate UUIDs to create the batch.',
      'Copy all UUIDs to your clipboard with one click.',
    ],
    benefits: [
      { title: 'Batch generation', description: 'Generate hundreds or thousands of UUIDs at once for database seeding, test data, or bulk record creation. No need to generate them one at a time.' },
      { title: 'Format options', description: 'Choose standard lowercase with hyphens, uppercase, or no hyphens. Match the UUID format your database or application expects.' },
      { title: 'RFC 4122 compliant', description: 'The tool uses crypto.randomUUID(), which generates RFC 4122 version 4 (random) UUIDs. These are universally unique and suitable for database primary keys.' },
      { title: 'No server processing', description: 'UUIDs are generated in your browser using the Web Crypto API. No data is transmitted or stored.' },
    ],
    faqs: [
      { q: 'How many UUIDs can I generate at once?', a: 'You can generate up to 1,000 UUIDs in a single operation. For more, click Generate multiple times and combine the results.' },
      { q: 'Are the UUIDs guaranteed to be unique?', a: 'UUID v4 uses random generation. The probability of collision is astronomically low (1 in 2^122). For practical purposes, they are universally unique.' },
      { q: 'What format are the UUIDs in?', a: 'By default, UUIDs are in standard lowercase with hyphens (e.g., 550e8400-e29b-41d4-a716-446655440000). Toggle uppercase or no hyphens for alternative formats.' },
      { q: 'Can I use these as database primary keys?', a: 'Yes. UUID v4 is the standard choice for distributed database primary keys. They avoid the need for a central ID generator and can be created on any client.' },
    ],
  },
  'video-metadata-viewer': {
    whatIs: 'The Video Metadata Viewer displays embedded metadata from video files, including title, duration, resolution, codec, bitrate, frame rate, and creation date. It reads metadata directly from the file in your browser.',
    howTo: [
      'Drag and drop a video file (MP4, WebM, MOV) into the upload zone.',
      'The tool reads the file\'s metadata using the browser\'s video element.',
      'Review the displayed metadata fields in the results panel.',
      'No download is needed — metadata is read locally from the file.',
    ],
    benefits: [
      { title: 'Quick video inspection', description: 'Check video properties (resolution, codec, duration, frame rate) without opening the file in a video player or editing software.' },
      { title: 'Privacy-first', description: 'Video files are read in your browser. Personal videos, confidential recordings, and unreleased content never leave your device.' },
      { title: 'Format verification', description: 'Verify video format details before uploading to platforms that have specific requirements (resolution limits, codec preferences, duration limits).' },
      { title: 'No software installation', description: 'View video metadata without installing VLC, MediaInfo, or FFmpeg. The tool works in any modern browser.' },
    ],
    faqs: [
      { q: 'What metadata fields are displayed?', a: 'The tool shows duration, resolution (width x height), video codec, audio codec, frame rate, and bitrate when available. Not all files contain all metadata fields.' },
      { q: 'Does it support all video formats?', a: 'The tool supports formats that the browser can play natively: MP4 (H.264), WebM (VP8/VP9), and in some browsers, MOV and OGG. Unsupported formats may not display metadata.' },
      { q: 'Can I edit the metadata?', a: 'No. This tool is read-only. It displays existing metadata but does not modify the file. Use a video editor or FFmpeg for metadata editing.' },
      { q: 'Why does my video show no metadata?', a: 'Some video files, especially those created by basic recorders or screen capture tools, may not embed comprehensive metadata. The tool shows what is available in the file.' },
    ],
  },
  'video-thumbnail-generator': {
    whatIs: 'The Video Thumbnail Generator extracts a still image from a video file. Choose a specific time point and the tool captures a frame, which you can download as an image for use as a thumbnail or preview.',
    howTo: [
      'Upload a video file by dragging it into the upload zone.',
      'Seek to the frame you want to capture as a thumbnail.',
      'Click Capture to extract the current frame as an image.',
      'Download the thumbnail image.',
    ],
    benefits: [
      { title: 'Create video previews', description: 'Generate thumbnail images from videos for use in video galleries, social media posts, or content management systems. A good thumbnail increases click-through rates.' },
      { title: 'No video editing software needed', description: 'Extract frames without Premiere, Final Cut, or FFmpeg. The tool captures frames directly in your browser using the HTML5 video element.' },
      { title: 'Custom frame selection', description: 'Seek to any point in the video to capture the perfect frame. Choose a frame that represents the video content and is visually compelling.' },
      { title: 'Privacy-first', description: 'Video processing is done locally. Your videos never leave your device.' },
    ],
    faqs: [
      { q: 'What image format is the thumbnail?', a: 'The tool captures frames as PNG or JPG images. PNG preserves quality but produces larger files; JPG is smaller and suitable for web use.' },
      { q: 'What video formats are supported?', a: 'The tool supports formats that the browser can play natively: MP4 (H.264), WebM (VP8/VP9), and in some browsers, MOV and OGG.' },
      { q: 'Can I capture multiple thumbnails from one video?', a: 'Yes. Seek to different time points and capture a thumbnail at each. The tool processes one capture at a time — download each before capturing the next.' },
      { q: 'What resolution are the thumbnails?', a: 'The thumbnail is captured at the video\'s native resolution. A 1080p video produces a 1920x1080 thumbnail. No upscaling or downscaling occurs.' },
    ],
  },
  'website-manifest-generator': {
    whatIs: 'The Website Manifest Generator creates a web app manifest (manifest.json) for Progressive Web Apps (PWAs). The manifest defines the app name, icons, theme color, display mode, and start URL for installable web apps.',
    howTo: [
      'Enter your app name, short name, and start URL.',
      'Set the display mode (standalone, fullscreen, minimal-ui, browser).',
      'Choose a theme color and background color.',
      'Add icon paths and sizes, then click Generate to produce the manifest.json.',
    ],
    benefits: [
      { title: 'PWA installation', description: 'A web app manifest is required for Chrome and Edge to offer "Install app" prompts. Without a manifest, your web app cannot be installed as a PWA.' },
      { title: 'App store appearance', description: 'The manifest controls how your installed PWA appears — app name, icon, splash screen color, and whether it opens in its own window or a browser tab.' },
      { title: 'No manifest knowledge needed', description: 'The tool handles the JSON syntax, required fields, and display mode values. You just fill in your app details.' },
      { title: 'Standard-compliant output', description: 'The generated manifest follows the W3C Web App Manifest specification, ensuring compatibility with Chrome, Edge, Firefox, and Safari.' },
    ],
    faqs: [
      { q: 'What display mode should I use?', a: 'Standalone is the most common — it opens the app in its own window without browser UI. Fullscreen hides all UI. Minimal-ui shows a minimal browser chrome. Browser opens in a normal tab.' },
      { q: 'What icon sizes do I need?', a: 'Include 192x192 and 512x512 at minimum. For maximum compatibility, also include 144x144, 256x256, and 384x384. The tool lets you add multiple icon sizes.' },
      { q: 'Where do I place the manifest?', a: 'Place manifest.json in your site root and add <link rel="manifest" href="/manifest.json"> to your HTML <head>.' },
      { q: 'Do I need a service worker for PWA?', a: 'A manifest is required for installability, but a service worker is also needed for offline functionality. The manifest handles installation; the service worker handles caching and offline behavior.' },
    ],
  },
  'website-schema-generator': {
    whatIs: 'The Website Schema Generator creates JSON-LD structured data for a website or organization. It includes site name, URL, logo, description, and social media profiles, helping Google understand your site identity.',
    howTo: [
      'Enter your website name, URL, and description.',
      'Add your logo URL and optionally your organization\'s contact email.',
      'Add social media profile URLs (Facebook, Twitter, LinkedIn, etc.).',
      'Copy the generated JSON-LD and paste it into your homepage <head>.',
    ],
    benefits: [
      { title: 'Site name in search results', description: 'Website schema tells Google your site\'s official name, which Google can display in search results instead of (or alongside) the URL.' },
      { title: 'Knowledge panel eligibility', description: 'Organization schema helps Google build a knowledge panel for your brand, showing your logo, description, and social profiles in search results.' },
      { title: 'Social profile linking', description: 'The schema links your website to your social media profiles, helping Google associate your social accounts with your official website.' },
      { title: 'No schema knowledge needed', description: 'The tool handles JSON-LD syntax, WebSite and Organization types, and proper nesting. You just fill in your site details.' },
    ],
    faqs: [
      { q: 'What is the difference between WebSite and Organization schema?', a: 'WebSite schema describes the website itself (name, URL). Organization schema describes the entity behind the site (logo, contact, social profiles). The tool can generate both.' },
      { q: 'Where do I place the website schema?', a: 'Add it to the <head> section of your homepage, wrapped in <script type="application/ld+json"> tags. It should be on the homepage only, not every page.' },
      { q: 'Which social profiles should I include?', a: 'Include your official profiles on Facebook, Twitter/X, LinkedIn, Instagram, YouTube, and any other platform where your organization has a presence. Only include profiles you actively manage.' },
      { q: 'Does this create a knowledge panel?', a: 'Schema is a signal Google uses, but knowledge panels are generated automatically based on Google\'s understanding of your entity. Schema helps, but does not guarantee a knowledge panel.' },
    ],
  },
  'website-screenshot': {
    whatIs: 'The Website Screenshot tool captures a visual snapshot of a web page. Enter a URL and the tool renders the page and captures it as an image, which you can download for reference, comparison, or documentation.',
    howTo: [
      'Enter the URL of the website you want to screenshot (including https://).',
      'Click Capture to render the page and take a screenshot.',
      'Review the captured screenshot in the results panel.',
      'Download the screenshot image.',
    ],
    benefits: [
      { title: 'Visual documentation', description: 'Capture screenshots of websites for documentation, design reference, or compliance records. No need to manually take browser screenshots and crop them.' },
      { title: 'Cross-device preview', description: 'See how a website renders without opening it in your browser. Useful for quick checks of how a page looks without affecting your browsing session.' },
      { title: 'Design inspiration', description: 'Capture screenshots of websites you admire for design reference. Build a library of design inspiration without manual screenshot tools.' },
      { title: 'No extensions needed', description: 'Take website screenshots without browser extensions or desktop screenshot tools. The tool works in any modern browser.' },
    ],
    faqs: [
      { q: 'Can it screenshot any website?', a: 'The tool can screenshot websites that allow cross-origin rendering. Some sites may block screenshot capture due to CORS policies or authentication requirements. Public websites work reliably.' },
      { q: 'Does it capture the full page or just the viewport?', a: 'The tool captures the visible viewport. For full-page screenshots, use browser DevTools\' device toolbar or a dedicated full-page screenshot tool.' },
      { q: 'Can it screenshot pages that require login?', a: 'No. The tool cannot authenticate with websites. It captures publicly accessible pages only. For authenticated pages, use your browser\'s built-in screenshot tool.' },
      { q: 'What image format is the screenshot?', a: 'The screenshot is captured as a PNG image, which preserves text clarity and supports transparency. The file is typically 100-500KB depending on the page complexity.' },
    ],
  },
  'xml-formatter': {
    whatIs: 'The XML Formatter beautifies and indents XML code for readability. It parses your XML, then re-serializes it with proper indentation and line breaks, making it easy to read and debug.',
    howTo: [
      'Paste your XML code into the input field.',
      'Click Format XML to beautify the code.',
      'Review the formatted output with proper indentation.',
      'Copy the formatted XML to your clipboard.',
    ],
    benefits: [
      { title: 'Readable XML output', description: 'Minified or poorly formatted XML is hard to read. The tool adds proper indentation and line breaks, making the structure immediately clear.' },
      { title: 'Error detection', description: 'If your XML has syntax errors, the parser detects them and shows an error message, helping you identify and fix issues quickly.' },
      { title: 'No software needed', description: 'Format XML without XML editors or IDEs. The tool works in any browser using the DOMParser API.' },
      { title: 'All processing local', description: 'XML formatting happens entirely in your browser. Your data never leaves your device.' },
    ],
    faqs: [
      { q: 'Does it validate XML?', a: 'The tool parses XML using the browser\'s DOMParser. If the XML has syntax errors, the parser reports them. However, it does not validate against an XSD schema — it checks well-formedness only.' },
      { q: 'Can it handle large XML files?', a: 'Yes, but very large files (10MB+) may slow down the browser. For most configuration files and data files (under 1MB), formatting is instant.' },
      { q: 'Does it preserve comments?', a: 'The tool uses XMLSerializer, which preserves comments in most cases. However, some comment positions may shift during re-serialization.' },
      { q: 'Can it minify XML?', a: 'No. This tool formats (beautifies) XML. To minify, remove whitespace manually or use a dedicated XML minifier.' },
    ],
  },
  'xml-validator': {
    whatIs: 'The XML Validator checks whether your XML code is well-formed. It parses the XML and reports any syntax errors, so you can fix them before using the XML in your application.',
    howTo: [
      'Paste your XML code into the input field.',
      'Click Validate XML to check for errors.',
      'Review the validation result — valid or invalid with error details.',
      'Fix any errors in your XML and re-validate.',
    ],
    benefits: [
      { title: 'Catch XML errors early', description: 'Invalid XML causes parsing failures in APIs, configuration files, and data processing. Validate before deploying to catch errors early.' },
      { title: 'Clear error messages', description: 'The tool shows whether the XML is valid or invalid, with a description of the parse error if invalid. This helps you locate and fix the problem.' },
      { title: 'No software needed', description: 'Validate XML without XML editors or IDEs. The tool uses the browser\'s DOMParser, which follows the XML specification.' },
      { title: 'All processing local', description: 'Validation happens entirely in your browser. Your XML data never leaves your device.' },
    ],
    faqs: [
      { q: 'What is the difference between well-formed and valid XML?', a: 'Well-formed XML follows XML syntax rules (proper nesting, quoted attributes, single root). Valid XML also conforms to a DTD or XSD schema. This tool checks well-formedness, not schema validation.' },
      { q: 'Can it validate against an XSD schema?', a: 'No. The tool checks XML well-formedness only. For XSD validation, use a dedicated XML validator like XMLSpy or an online XSD validator.' },
      { q: 'What common XML errors does it catch?', a: 'Unclosed tags, mismatched tags, unquoted attributes, multiple root elements, invalid characters, and missing encoding declarations.' },
      { q: 'Does it work with HTML?', a: 'No. HTML has different parsing rules (it is more lenient). Use the HTML Formatter for HTML. This tool is specifically for XML.' },
    ],
  },
  'yaml-formatter': {
    whatIs: 'The YAML Formatter beautifies and indents YAML code for readability. It normalizes indentation, trims trailing whitespace, and standardizes the formatting of your YAML configuration.',
    howTo: [
      'Paste your YAML code into the input field.',
      'Click Format YAML to beautify the code.',
      'Review the formatted output with normalized indentation.',
      'Copy the formatted YAML to your clipboard.',
    ],
    benefits: [
      { title: 'Readable YAML output', description: 'Inconsistent indentation in YAML can cause parsing errors. The tool normalizes indentation, making the structure clear and parseable.' },
      { title: 'Configuration file maintenance', description: 'YAML is used in Docker Compose, Kubernetes, CI/CD pipelines, and configuration files. Format them for readability before committing.' },
      { title: 'No software needed', description: 'Format YAML without IDEs or YAML editors. The tool works in any browser.' },
      { title: 'All processing local', description: 'YAML formatting happens entirely in your browser. Your configuration data never leaves your device.' },
    ],
    faqs: [
      { q: 'Does it validate YAML?', a: 'The tool formats YAML by normalizing indentation and whitespace. It does not validate YAML syntax (e.g., checking for tab characters, which are invalid in YAML). Use the YAML Validator for syntax checking.' },
      { q: 'Can it handle complex YAML with anchors and aliases?', a: 'The tool formats the text by normalizing whitespace. It does not resolve anchors and aliases. The formatting preserves the original structure.' },
      { q: 'Does it preserve comments?', a: 'The tool preserves lines starting with # (YAML comments). However, inline comments may shift position during formatting.' },
      { q: 'Can it convert YAML to JSON?', a: 'No. This tool formats YAML only. For YAML-to-JSON conversion, use a dedicated converter or a library like js-yaml.' },
    ],
  },
  'yaml-validator': {
    whatIs: 'The YAML Validator checks whether your YAML code is syntactically valid. It verifies that each non-comment line contains a colon (key-value pair) or starts with a dash (list item), which are the basic YAML syntax rules.',
    howTo: [
      'Paste your YAML code into the input field.',
      'Click Validate YAML to check for syntax errors.',
      'Review the validation result — valid or invalid.',
      'Fix any errors in your YAML and re-validate.',
    ],
    benefits: [
      { title: 'Catch YAML errors early', description: 'Invalid YAML causes failures in Docker Compose, Kubernetes, CI/CD pipelines, and configuration parsing. Validate before deploying.' },
      { title: 'Quick syntax check', description: 'The tool checks basic YAML syntax rules: key-value pairs with colons, list items with dashes, and proper comment formatting. It catches common mistakes quickly.' },
      { title: 'No software needed', description: 'Validate YAML without IDEs or YAML linters. The tool works in any browser.' },
      { title: 'All processing local', description: 'Validation happens entirely in your browser. Your configuration data never leaves your device.' },
    ],
    faqs: [
      { q: 'What does the validator check?', a: 'The tool checks that non-comment, non-empty lines contain a colon (for key-value pairs) or start with a dash (for list items). This catches common syntax errors but is not a full YAML parser validation.' },
      { q: 'Can it detect indentation errors?', a: 'The tool does not check indentation depth or consistency. YAML is whitespace-sensitive, so indentation errors cause parsing failures. Use the YAML Formatter to normalize indentation.' },
      { q: 'Does it validate against a schema?', a: 'No. The tool checks basic YAML syntax only. For schema validation (e.g., Kubernetes manifest validation), use a dedicated schema validator.' },
      { q: 'What YAML errors does it miss?', a: 'The tool may not detect: tab characters (invalid in YAML), incorrect indentation depth, duplicate keys, or type mismatches. For comprehensive validation, use a YAML parser library.' },
    ],
  },
  'markdown-preview': {
    whatIs: 'The Markdown Preview tool renders Markdown into formatted HTML in real time. Type or paste Markdown on the left and see the formatted output on the right, with support for headings, bold, italic, code blocks, lists, and links.',
    howTo: [
      'Type or paste your Markdown text in the input panel on the left.',
      'The formatted HTML preview updates instantly on the right as you type.',
      'Review the rendered output to see how your Markdown will look when published.',
      'Copy the rendered HTML or use the Markdown directly in your blog, README, or documentation.',
    ],
    benefits: [
      { title: 'Real-time rendering', description: 'See your Markdown formatted as you type, with no submit button or refresh. This makes writing and editing Markdown much faster than a save-and-preview cycle.' },
      { title: 'Supports common Markdown syntax', description: 'Headings (H1-H3), bold, italic, inline code, code blocks, unordered lists, and links are all supported. The tool covers the most common Markdown elements used in blogs and documentation.' },
      { title: 'No installation needed', description: 'Preview Markdown without installing a Markdown editor or enabling a preview extension. The tool works in any browser.' },
      { title: 'All processing local', description: 'Markdown rendering happens entirely in your browser. Your content never leaves your device.' },
    ],
    faqs: [
      { q: 'Which Markdown syntax is supported?', a: 'The tool supports headings (#, ##, ###), bold (**text**), italic (*text*), inline code (`code`), code blocks, unordered lists (- item), and links ([text](url)). It does not support tables, footnotes, or extended Markdown syntax.' },
      { q: 'Can I export the rendered HTML?', a: 'The tool displays the rendered HTML in the preview panel. You can copy the rendered output from the preview. For raw HTML export, use the HTML Formatter to clean up the output.' },
      { q: 'Does it support GitHub-Flavored Markdown?', a: 'The tool supports basic Markdown syntax, not GFM extensions like task lists, tables, or strikethrough. For GFM, use a dedicated GFM renderer.' },
      { q: 'Is my Markdown stored?', a: 'No. All rendering happens in your browser. Your Markdown text is not transmitted to any server.' },
    ],
  },
};

export function getToolSeoContent(slug: string): ContentEntry | undefined {
  return toolSeoContent[slug];
}

/* ── Category-aware content generation for non-hand-crafted tools ── */

function getToolData(slug: string) {
  return tools.find((t) => t.slug === slug);
}

// ─── Helper functions for tool-specific content generation ─────
function coreAction(desc: string): string {
  return desc.split(' — ')[0].split('. ')[0].replace(/\.$/, '').toLowerCase();
}

function useCasePhrase(desc: string): string {
  const main = desc.split(' — ')[0];
  const parts = main.split('. ');
  if (parts.length > 1) return parts.slice(1).join('. ').replace(/\.$/, '');
  return '';
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Extract a short feature phrase from the enhanced description
function featurePhrase(desc: string): string {
  const main = desc.split(' — ')[0];
  return main.replace(/\.$/, '');
}

type CategoryProfile = {
  whatIs: (name: string, desc: string, enhancedDesc: string) => string;
  howTo: (name: string, slug: string, enhancedDesc: string) => string[];
  benefits: (name: string, desc: string, enhancedDesc: string) => { title: string; description: string }[];
  faqs: (name: string, desc: string, slug: string, enhancedDesc: string) => { q: string; a: string }[];
};

const categoryProfiles: Record<string, CategoryProfile> = {
  'PDF Tools': {
    whatIs: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      let r = `${name} ${coreAction(enhancedDesc)}. The tool uses the pdf-lib JavaScript library to process PDFs entirely in your browser — your documents are never uploaded to a server.`;
      if (uc) r += ` ${cap(uc)}.`;
      return r;
    },
    howTo: (name, slug, enhancedDesc) => {
      const action = coreAction(enhancedDesc);
      const steps: string[] = [];
      steps.push(`Drag and drop your PDF into ${name}, or click to browse and select a file.`);
      if (slug.includes('rotate')) {
        steps.push('Select 90, 180, or 270 degrees for each page you want to rotate.');
        steps.push('Click Apply Rotation to process the PDF locally with pdf-lib.');
      } else if (slug.includes('compress')) {
        steps.push('Choose a compression level — the tool optimizes embedded images and removes redundant data to reduce file size.');
        steps.push('Click Compress to process the PDF in your browser.');
      } else if (slug.includes('merge')) {
        steps.push('Drag and drop additional PDFs to combine, and reorder them as needed.');
        steps.push('Click Merge to join all PDFs into a single document using pdf-lib.');
      } else if (slug.includes('split') || slug.includes('extract')) {
        steps.push('Select the pages or page ranges you want to extract or split into separate files.');
        steps.push('Click the action button to process the PDF locally.');
      } else if (slug.includes('watermark')) {
        steps.push('Enter your watermark text and adjust opacity and position settings.');
        steps.push('Click Apply to add the watermark to every page using pdf-lib.');
      } else if (slug.includes('delete')) {
        steps.push('Select the pages you want to remove from the PDF.');
        steps.push('Click Delete Pages to create a new PDF without the selected pages.');
      } else if (slug.includes('protect')) {
        steps.push('Enter a password to encrypt the PDF with.');
        steps.push('Click Protect to encrypt the PDF locally in your browser.');
      } else if (slug.includes('unlock')) {
        steps.push('Enter the password for the PDF if it requires one to open.');
        steps.push('Click Unlock to remove the password protection from the PDF.');
      } else if (slug.includes('reorder')) {
        steps.push('Drag and drop pages to rearrange them in the desired order.');
        steps.push('Click Save to create a new PDF with the reordered pages.');
      } else if (slug.includes('page-number')) {
        steps.push('Choose the position, format, and starting number for page numbers.');
        steps.push('Click Add Page Numbers to process the PDF with pdf-lib.');
      } else if (slug.includes('metadata')) {
        steps.push('Edit the title, author, subject, and keywords fields for the PDF document.');
        steps.push('Click Save to update the PDF metadata in your browser.');
      } else if (slug.includes('viewer')) {
        steps.push('The PDF loads and displays in the viewer interface.');
        steps.push('Use the page navigation controls to browse through the document.');
      } else {
        steps.push(`${cap(action)} using the options provided by the tool interface.`);
        steps.push(`Click the action button to process your PDF with ${name}.`);
      }
      steps.push('Download the result — your original file never leaves your device.');
      return steps;
    },
    benefits: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      return [
        { title: 'Documents never leave your device', description: `${name} uses pdf-lib to process PDFs entirely in your browser. Your files are never uploaded to a server, which is critical for contracts, legal documents, and sensitive business files.` },
        { title: 'No registration or watermarks', description: `${name} is free with no account, no email, and no watermarks on output files. Use it as many times as you need.` },
        { title: 'Works with large PDFs', description: 'Since processing happens on your device, you are limited by your hardware rather than a server-side file size cap. Most PDFs up to 100MB process without issue.' },
        uc
          ? { title: cap(uc.split(',')[0].split(' — ')[0]), description: `${uc}. The tool handles this directly in the browser with no software installation required.` }
          : { title: 'Instant local processing', description: 'No upload or download wait time — the file is already on your device. Processing typically takes a few seconds for most operations.' },
      ];
    },
    faqs: (name, _desc, slug, enhancedDesc) => {
      const faqs: { q: string; a: string }[] = [];
      if (slug.includes('compress')) {
        faqs.push({ q: `How much does ${name} reduce file size?`, a: 'Compression reduces file size by optimizing embedded images and removing redundant data. Text remains crisp, but images may be slightly lower resolution depending on the compression level you choose.' });
      } else if (slug.includes('merge')) {
        faqs.push({ q: `How many PDFs can I merge with ${name}?`, a: 'You can merge as many PDFs as your browser memory allows. The tool combines them in the order you arrange them, producing a single PDF file.' });
      } else if (slug.includes('rotate')) {
        faqs.push({ q: `Can I rotate individual pages with ${name}?`, a: 'Yes. You can select specific pages and choose a rotation angle (90, 180, or 270 degrees) for each page independently, or rotate all pages at once.' });
      } else if (slug.includes('split') || slug.includes('extract')) {
        faqs.push({ q: `Can I extract specific pages with ${name}?`, a: 'Yes. Select the exact pages or page ranges you want to extract. The tool creates a new PDF containing only those pages, leaving your original file unchanged.' });
      } else if (slug.includes('watermark')) {
        faqs.push({ q: `What watermark options does ${name} support?`, a: 'You can customize the watermark text, opacity, font size, and position. The watermark is applied to every page in the PDF.' });
      } else if (slug.includes('protect')) {
        faqs.push({ q: `What encryption does ${name} use?`, a: 'The tool uses pdf-lib to add password protection. You set a password that anyone opening the PDF will need to enter.' });
      } else if (slug.includes('unlock')) {
        faqs.push({ q: `Can ${name} remove any PDF password?`, a: 'You need to know the password to unlock the PDF. The tool removes the password so you can open the PDF without entering it each time. It cannot bypass unknown passwords.' });
      } else if (slug.includes('delete')) {
        faqs.push({ q: `Can I undo page deletion with ${name}?`, a: `${name} creates a new PDF without the selected pages — your original file is not modified. Keep the original as a backup if you may need the deleted pages later.` });
      } else if (slug.includes('reorder')) {
        faqs.push({ q: `How do I rearrange pages with ${name}?`, a: 'Drag and drop pages in the interface to set the new order. The tool creates a new PDF with pages in the order you arranged them.' });
      } else if (slug.includes('page-number')) {
        faqs.push({ q: `Can I choose where page numbers appear with ${name}?`, a: 'Yes. You can set the position (top or bottom, left/center/right), the starting number, and the format (e.g. "1", "1 of 10").' });
      } else if (slug.includes('metadata')) {
        faqs.push({ q: `What metadata fields can I edit with ${name}?`, a: 'You can edit the title, author, subject, and keywords fields. These are the standard PDF document properties that appear in PDF readers.' });
      } else if (slug.includes('viewer')) {
        faqs.push({ q: `Does ${name} support large PDF files?`, a: 'Yes. The viewer uses pdf.js to render pages on demand, so even large PDFs load quickly. Only the current page is rendered at a time.' });
      } else {
        faqs.push({ q: `Is ${name} safe for confidential PDFs?`, a: 'Yes. Your PDF is processed entirely in your browser using pdf-lib. The file is never uploaded to a server, so it cannot be intercepted or stored by any third party.' });
      }
      if (slug.includes('compress')) {
        faqs.push({ q: 'Will compression affect text quality?', a: 'No. Text is vector-based and remains crisp at any compression level. Only embedded images may be slightly lower resolution at aggressive settings.' });
      } else {
        faqs.push({ q: 'Will the output PDF maintain the same quality?', a: `Yes. ${name} preserves the original PDF content — no re-encoding or quality loss occurs for non-compression operations.` });
      }
      faqs.push({ q: `Is there a file size limit for ${name}?`, a: 'There is no server-side limit since processing is local. In practice, very large PDFs (500MB+) may strain browser memory. For most documents under 100MB, the tool works smoothly.' });
      if (slug.includes('merge')) {
        faqs.push({ q: 'Can I reorder PDFs before merging?', a: 'Yes. Drag and drop the files to change their order before clicking Merge. The output PDF will have pages in the order you arranged.' });
      } else if (slug.includes('rotate')) {
        faqs.push({ q: 'Can I rotate all pages at once?', a: 'Yes. You can rotate all pages with a single click, or select individual pages for different rotation angles.' });
      } else {
        faqs.push({ q: `Does ${name} work on mobile?`, a: 'Yes. The tool works in mobile browsers, though large PDFs may be slower to process on phones due to limited memory.' });
      }
      return faqs;
    },
  },

  'Image Tools': {
    whatIs: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      let r = `${name} ${coreAction(enhancedDesc)}. The tool uses the HTML5 Canvas API to process images directly in your browser — no upload, no server processing, and no quality loss from re-compression on a remote server.`;
      if (uc) r += ` ${cap(uc)}.`;
      return r;
    },
    howTo: (name, slug, enhancedDesc) => {
      const action = coreAction(enhancedDesc);
      const steps: string[] = [];
      steps.push(`Click the upload area or drag and drop an image into ${name}. The tool supports JPG, PNG, and WebP formats.`);
      if (slug.includes('blur')) {
        steps.push('Adjust the blur intensity slider to control the strength of the effect.');
        steps.push('Click Apply to render the blurred image using Canvas.');
      } else if (slug.includes('sharpen')) {
        steps.push('Adjust the sharpen intensity slider to improve detail and clarity.');
        steps.push('Click Apply to render the sharpened image using Canvas.');
      } else if (slug.includes('brightness')) {
        steps.push('Drag the brightness slider to lighten dark photos or dim overexposed ones.');
        steps.push('Click Apply to render the adjusted image using Canvas.');
      } else if (slug.includes('contrast')) {
        steps.push('Drag the contrast slider to enhance dull photos or soften harsh ones.');
        steps.push('Click Apply to render the adjusted image using Canvas.');
      } else if (slug.includes('grayscale')) {
        steps.push('The tool instantly converts the image to black and white — no settings needed.');
        steps.push('Click Download to save the grayscale image.');
      } else if (slug.includes('sepia')) {
        steps.push('The tool applies a vintage sepia tone with one click — no settings needed.');
        steps.push('Click Download to save the sepia-filtered image.');
      } else if (slug.includes('rotat')) {
        steps.push('Select 90, 180, 270 degrees or enter a custom rotation angle.');
        steps.push('Click Apply to rotate the image using Canvas.');
      } else if (slug.includes('flip')) {
        steps.push('Choose to flip horizontally or vertically.');
        steps.push('Click Apply to flip the image instantly.');
      } else if (slug.includes('crop')) {
        steps.push('Drag the crop handles to select the area you want to keep.');
        steps.push('Click Apply to crop the image using Canvas.');
      } else if (slug.includes('resiz')) {
        steps.push('Enter the target width and height, or drag the resize handles.');
        steps.push('Click Apply to resize the image using Canvas.');
      } else if (slug.includes('compress')) {
        steps.push('Adjust the quality slider to balance file size and image quality.');
        steps.push('Click Compress to render the optimized image.');
      } else if (slug.includes('convert')) {
        steps.push('Select the output format (JPG, PNG, or WebP) and adjust quality if needed.');
        steps.push('Click Convert to render the image in the new format.');
      } else if (slug.includes('watermark')) {
        steps.push('Enter watermark text or upload a logo, then adjust opacity, position, and size.');
        steps.push('Click Apply to overlay the watermark on the image.');
      } else if (slug.includes('border')) {
        steps.push('Choose border width, color, and style from the available options.');
        steps.push('Click Apply to add the border to your image.');
      } else if (slug.includes('rounded')) {
        steps.push('Adjust the corner radius slider to control how rounded the corners are.');
        steps.push('Click Apply to round the image corners using Canvas.');
      } else if (slug.includes('color-picker')) {
        steps.push('Click anywhere on the image to pick a color. Zoom in for pixel-precise selection.');
        steps.push('Copy the hex or RGB color value from the output area.');
      } else if (slug.includes('metadata')) {
        steps.push(slug.includes('remover') ? 'The tool automatically strips EXIF, IPTC, and XMP metadata from your image.' : 'The tool displays EXIF, IPTC, and XMP metadata from your image, including camera model, GPS, and timestamp.');
        steps.push(slug.includes('remover') ? 'Click Download to save the cleaned image.' : 'Review the metadata details in the results panel.');
      } else {
        steps.push(`${cap(action)} using the controls provided by the tool.`);
        steps.push(`Click Apply or Download to process the image with ${name}.`);
      }
      steps.push('Download the result. The original image file is never sent anywhere.');
      return steps;
    },
    benefits: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      return [
        { title: 'Images never leave your device', description: `${name} processes images using the browser's Canvas API. No image data is transmitted to any server, which is important for personal photos, medical images, and confidential documents.` },
        { title: 'No watermarks or sign-up', description: 'The output image is clean — no watermarks, no logos, no required attribution. Download and use the result freely for any purpose.' },
        { title: 'Fast, real-time preview', description: 'Canvas-based processing means you see changes instantly as you adjust settings. No round-trip to a server for each preview.' },
        uc
          ? { title: cap(uc.split(',')[0].split(' — ')[0]), description: `${uc}. This makes ${name} useful for backgrounds, privacy masking, and creative editing without needing desktop software.` }
          : { title: 'Supports all common formats', description: 'JPG, PNG, and WebP are fully supported for both input and output. The browser handles format conversion natively.' },
      ];
    },
    faqs: (name, _desc, slug, enhancedDesc) => {
      const faqs: { q: string; a: string }[] = [];
      if (slug.includes('blur')) {
        faqs.push({ q: `How does the blur effect work in ${name}?`, a: 'The tool applies a Gaussian-style blur using the Canvas API. The slider controls the blur radius — higher values produce a stronger blur effect. The preview updates in real-time so you can fine-tune before downloading.' });
      } else if (slug.includes('sharpen')) {
        faqs.push({ q: `Can ${name} fix very blurry images?`, a: 'Sharpening enhances existing detail but cannot recover detail that is completely lost to blurring. It works best on slightly soft images. For severely blurred photos, results will be limited.' });
      } else if (slug.includes('brightness') || slug.includes('contrast')) {
        faqs.push({ q: `Will ${name} degrade my image quality?`, a: 'No. The tool applies adjustments using Canvas pixel manipulation, which preserves the original resolution. The adjusted image is rendered at full quality.' });
      } else if (slug.includes('grayscale') || slug.includes('sepia')) {
        faqs.push({ q: `Does ${name} support batch processing?`, a: 'The tool processes one image at a time. Open the tool again for each additional image. This keeps the tool lightweight and fast.' });
      } else if (slug.includes('rotat')) {
        faqs.push({ q: `Can I rotate by a custom angle with ${name}?`, a: 'Yes. In addition to 90, 180, and 270 degree quick-rotate buttons, you can enter a custom angle for precise rotation. The preview shows the result before you download.' });
      } else if (slug.includes('compress')) {
        faqs.push({ q: `How much does ${name} reduce file size?`, a: 'Compression results depend on the original image. JPGs typically shrink 30-70% with minimal visible quality loss. PNGs compress less since they use lossless encoding. Use the quality slider to find the right balance.' });
      } else if (slug.includes('convert')) {
        faqs.push({ q: `Which formats does ${name} support?`, a: 'The tool converts between JPG, PNG, and WebP. JPG is best for photos, PNG for images with transparency, and WebP for modern web use with smaller file sizes.' });
      } else if (slug.includes('metadata-remover')) {
        faqs.push({ q: `What metadata does ${name} remove?`, a: 'The tool strips EXIF data (camera model, GPS location, timestamp, settings), IPTC data (copyright, captions), and XMP data (custom metadata) from your image. The pixel content is unchanged.' });
      } else if (slug.includes('metadata-viewer')) {
        faqs.push({ q: `What metadata can ${name} show?`, a: 'The tool displays EXIF tags (camera, lens, exposure, GPS), IPTC tags (copyright, keywords), and XMP tags (custom metadata). Not all images contain all metadata — phone photos typically have the most.' });
      } else if (slug.includes('color-picker')) {
        faqs.push({ q: `How precise is the color selection in ${name}?`, a: 'You can zoom in to pixel level for precise selection. The tool shows the exact hex, RGB, and HSL values for the pixel you click on.' });
      } else {
        faqs.push({ q: `Does ${name} work offline?`, a: 'Once the page is loaded, the tool functions without an internet connection since all processing is done in the browser.' });
      }
      if (slug.includes('compress') || slug.includes('resiz')) {
        faqs.push({ q: 'Will my image quality be reduced?', a: 'Quality reduction depends on your settings. For compression, lower quality settings reduce file size but may introduce artifacts. For resizing, downscaling preserves quality well; upscaling will produce a blurry result.' });
      } else {
        faqs.push({ q: 'Will my image quality be reduced?', a: 'The tool processes images using Canvas, which preserves the original quality unless you explicitly change dimensions or compression settings.' });
      }
      faqs.push({ q: `Is there a file size limit for ${name}?`, a: 'There is no server-side limit. Very large images (50MB+) may be slow to process or cause memory issues on older devices. For best performance, use images under 20MB.' });
      if (slug.includes('watermark') || slug.includes('compress')) {
        faqs.push({ q: 'Can I batch process multiple images?', a: 'The tool processes one image at a time. For batch processing, run each image through the tool separately. Batch processing may be added in a future update.' });
      } else {
        faqs.push({ q: 'Can I undo changes after processing?', a: 'The tool replaces the preview with the processed result. To undo, re-upload your original image. Consider keeping a backup of the original before processing.' });
      }
      return faqs;
    },
  },

  'Audio Tools': {
    whatIs: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      let r = `${name} ${coreAction(enhancedDesc)}. The tool uses the Web Audio API to process audio files entirely in your browser — no uploads, no server-side encoding, and no need to install audio editing software.`;
      if (uc) r += ` ${cap(uc)}.`;
      return r;
    },
    howTo: (name, slug, _enhancedDesc) => {
      const steps: string[] = [];
      steps.push(`Click upload or drag and drop an audio file into ${name}. Common formats like MP3, WAV, and OGG are supported.`);
      if (slug.includes('cutter') || slug.includes('trim')) {
        steps.push('Drag the trim handles to set the start and end points of the audio you want to keep.');
        steps.push('Preview the selected segment by playing it before exporting.');
        steps.push('Click Download or Export to save the trimmed audio file.');
      } else if (slug.includes('compress')) {
        steps.push('Adjust the bitrate slider to balance file size and audio quality.');
        steps.push('Click Compress to render the optimized audio file.');
        steps.push('Download the compressed audio to your device.');
      } else if (slug.includes('convert')) {
        steps.push('Select the output format (MP3, WAV, OGG, or AAC) and adjust sample rate if needed.');
        steps.push('Click Convert to encode the audio in the new format.');
        steps.push('Download the converted audio file.');
      } else if (slug.includes('merge')) {
        steps.push('Add additional audio files to combine, and reorder them as needed.');
        steps.push('Click Merge to join all audio files into a single track.');
        steps.push('Download the merged audio file.');
      } else if (slug.includes('reverse')) {
        steps.push('The tool automatically reverses the audio playback — no settings needed.');
        steps.push('Preview the reversed audio, then click Download to save it.');
      } else if (slug.includes('volume') || slug.includes('booster')) {
        steps.push('Adjust the volume boost slider to increase the audio level.');
        steps.push('Preview the adjusted audio to check for distortion.');
        steps.push('Click Download to save the amplified audio file.');
      } else if (slug.includes('speed')) {
        steps.push('Adjust the speed slider to speed up or slow down the audio without changing pitch.');
        steps.push('Preview the adjusted audio before exporting.');
        steps.push('Click Download to save the speed-adjusted audio file.');
      } else if (slug.includes('pitch')) {
        steps.push('Adjust the pitch slider to shift the audio key up or down without affecting tempo.');
        steps.push('Preview the pitch-shifted audio before exporting.');
        steps.push('Click Download to save the pitch-adjusted audio file.');
      } else if (slug.includes('metadata')) {
        steps.push(slug.includes('remover') ? 'The tool automatically strips ID3 tags and metadata from your audio file.' : 'The tool displays ID3 tags, bitrate, codec, and duration info for your audio file.');
        steps.push(slug.includes('remover') ? 'Click Download to save the cleaned audio file.' : 'Review the metadata details in the results panel.');
      } else if (slug.includes('text-to-speech')) {
        steps.push('Type or paste the text you want to convert to speech.');
        steps.push('Select a voice and adjust the speech speed if needed.');
        steps.push('Click Generate to create the audio, then download it.');
      } else if (slug.includes('speech-to-text')) {
        steps.push('Click the microphone button and start speaking, or upload an audio file.');
        steps.push('The tool transcribes your speech to text in real-time.');
        steps.push('Copy or download the transcribed text.');
      } else if (slug.includes('voice-recorder')) {
        steps.push('Click the record button to start recording from your microphone.');
        steps.push('Click stop when finished. The tool saves the recording as WAV or WebM.');
        steps.push('Download or play back the recording.');
      } else {
        steps.push(`Configure the available controls for the audio operation.`);
        steps.push(`Click the action button to process your audio with ${name}.`);
        steps.push('Download the processed audio file.');
      }
      return steps;
    },
    benefits: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      return [
        { title: 'Audio never uploaded to servers', description: `${name} processes audio through the Web Audio API in your browser. Your audio files are never transmitted to any server, protecting privacy for voice recordings, music demos, and confidential audio.` },
        { title: 'No software installation', description: 'Audio editing tools typically require installing DAWs like Audacity or Adobe Audition. This tool runs in your browser with no downloads.' },
        { title: 'Real-time preview', description: 'Listen to the processed audio before exporting to make sure the result is correct. No need to export and re-import to check.' },
        uc
          ? { title: cap(uc.split(',')[0].split(' — ')[0]), description: `${uc}. ${name} handles this without requiring dedicated audio editing software.` }
          : { title: 'Free with no usage limits', description: 'Process as many audio files as you need. No account, no subscription, no per-file fees.' },
      ];
    },
    faqs: (name, _desc, slug, _enhancedDesc) => {
      const faqs: { q: string; a: string }[] = [];
      if (slug.includes('convert')) {
        faqs.push({ q: `What formats does ${name} support?`, a: 'The tool converts between MP3, WAV, OGG, and AAC formats. The Web Audio API handles encoding and decoding for supported formats in modern browsers.' });
      } else if (slug.includes('cutter') || slug.includes('trim')) {
        faqs.push({ q: `How precise is the trimming in ${name}?`, a: 'The tool provides millisecond-level precision for trim points. Drag the handles on the waveform display to set start and end positions, then preview before exporting.' });
      } else if (slug.includes('compress')) {
        faqs.push({ q: `How much does ${name} reduce file size?`, a: 'Audio compression reduces file size by lowering the bitrate. At moderate settings, the quality difference is barely noticeable. At aggressive settings, you may hear artifacts in complex audio.' });
      } else if (slug.includes('merge')) {
        faqs.push({ q: `Can I merge different audio formats with ${name}?`, a: 'Yes. The tool decodes all input files using the Web Audio API and encodes the merged output in a single format. Mix MP3, WAV, and OGG files in any order.' });
      } else if (slug.includes('reverse')) {
        faqs.push({ q: `What happens to audio quality when reversing with ${name}?`, a: 'Reversing does not re-encode the audio — it simply plays the samples in reverse order. Quality is fully preserved.' });
      } else if (slug.includes('speed')) {
        faqs.push({ q: `Does ${name} change the pitch when changing speed?`, a: 'No. The tool uses time-stretching algorithms that change speed without affecting pitch. The audio stays in the same key at any speed.' });
      } else if (slug.includes('pitch')) {
        faqs.push({ q: `Does ${name} change the tempo when shifting pitch?`, a: 'No. The tool shifts pitch independently of tempo. The audio duration stays the same while the key changes.' });
      } else if (slug.includes('volume') || slug.includes('booster')) {
        faqs.push({ q: `Will ${name} cause distortion?`, a: 'At moderate boost levels (up to 2x), distortion is minimal. At extreme levels (3x+), clipping may occur. Preview the result before downloading to check for distortion.' });
      } else if (slug.includes('text-to-speech')) {
        faqs.push({ q: `What voices does ${name} use?`, a: 'The tool uses your browser\'s built-in speech synthesis voices. Available voices depend on your operating system and browser. Most modern browsers offer multiple voices.' });
      } else if (slug.includes('speech-to-text')) {
        faqs.push({ q: `How accurate is ${name}?`, a: 'Accuracy depends on your browser\'s speech recognition engine, microphone quality, and background noise. Chrome typically offers the best accuracy. Clear speech in a quiet environment produces the best results.' });
      } else {
        faqs.push({ q: 'What audio formats are supported?', a: 'Most tools accept MP3, WAV, OGG, and M4A files. The Web Audio API decodes these formats natively in modern browsers.' });
      }
      if (slug.includes('compress')) {
        faqs.push({ q: `Will ${name} reduce my audio quality?`, a: 'Audio compression reduces file size by lowering the bitrate. At moderate settings, the quality difference is barely noticeable. At aggressive settings, you may hear artifacts in complex audio.' });
      } else {
        faqs.push({ q: `Will ${name} reduce my audio quality?`, a: 'The tool processes audio through the Web Audio API, which preserves quality for most operations. Re-encoding to MP3 may introduce minor quality loss due to the lossy format.' });
      }
      faqs.push({ q: 'Is there a file size limit?', a: 'Since processing is browser-based, the limit is your device\'s available memory. Files up to 50MB typically process without issues. Very large files may cause the browser to slow down or crash.' });
      faqs.push({ q: 'Can I use this for commercial audio projects?', a: 'Yes. The tool does not add watermarks or require attribution. You own the output file and can use it commercially. Ensure you have the rights to the original audio you are processing.' });
      return faqs;
    },
  },

  'Video Tools': {
    whatIs: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      let r = `${name} ${coreAction(enhancedDesc)}. The tool uses browser-native video processing — the HTML5 video element and Canvas API — to edit video files locally without uploading them to a cloud video editor.`;
      if (uc) r += ` ${cap(uc)}.`;
      return r;
    },
    howTo: (name, slug, _enhancedDesc) => {
      const steps: string[] = [];
      steps.push(`Drag and drop a video file into ${name}, or click to browse. The tool supports common formats like MP4, WebM, and MOV.`);
      if (slug.includes('trim') || slug.includes('cutter')) {
        steps.push('Drag the trim handles to set the start and end points of the video you want to keep.');
        steps.push('Click Export to render the trimmed video in your browser.');
      } else if (slug.includes('compress')) {
        steps.push('Adjust the bitrate and resolution settings to reduce file size.');
        steps.push('Click Compress to render the optimized video.');
      } else if (slug.includes('convert')) {
        steps.push('Select the output format (MP4, WebM, or AVI) and adjust codec settings if needed.');
        steps.push('Click Convert to encode the video in the new format.');
      } else if (slug.includes('merge')) {
        steps.push('Add additional video files to combine, and reorder them as needed.');
        steps.push('Click Merge to join all videos into a single file.');
      } else if (slug.includes('split')) {
        steps.push('Set the split points or specify the number of segments you want.');
        steps.push('Click Split to divide the video into multiple clips.');
      } else if (slug.includes('rotat')) {
        steps.push('Select 90, 180, or 270 degrees rotation.');
        steps.push('Click Apply to rotate the video using Canvas rendering.');
      } else if (slug.includes('crop')) {
        steps.push('Drag the crop handles to select the area you want to keep, or enter dimensions for a specific aspect ratio.');
        steps.push('Click Apply to crop the video frames.');
      } else if (slug.includes('speed')) {
        steps.push('Adjust the speed slider to create time-lapse or slow-motion effects.');
        steps.push('Click Export to render the speed-adjusted video.');
      } else if (slug.includes('reverse')) {
        steps.push('The tool automatically reverses the video playback — no settings needed.');
        steps.push('Click Export to render the reversed video.');
      } else if (slug.includes('mute')) {
        steps.push('The tool automatically removes the audio track from your video.');
        steps.push('Click Download to save the silent video.');
      } else if (slug.includes('extract-audio')) {
        steps.push('The tool automatically extracts the audio track from your video.');
        steps.push('Select the output format (MP3 or WAV) and click Download.');
      } else if (slug.includes('watermark')) {
        steps.push('Enter watermark text or upload an image, then adjust position and opacity.');
        steps.push('Click Apply to overlay the watermark on the video.');
      } else if (slug.includes('thumbnail')) {
        steps.push('Scrub to the frame you want to capture, or let the tool extract frames at intervals.');
        steps.push('Click Download to save the thumbnail as PNG or JPG.');
      } else if (slug.includes('to-gif')) {
        steps.push('Set the start time, duration, and frame rate for the GIF.');
        steps.push('Click Convert to render the animated GIF.');
      } else if (slug.includes('gif-to-video')) {
        steps.push('Select the output format (MP4 or WebM).');
        steps.push('Click Convert to render the video from your GIF.');
      } else if (slug.includes('metadata')) {
        steps.push(slug.includes('remover') ? 'The tool automatically strips metadata from your video file.' : 'The tool displays codec, resolution, duration, bitrate, and other metadata for your video.');
        steps.push(slug.includes('remover') ? 'Click Download to save the cleaned video.' : 'Review the metadata details in the results panel.');
      } else {
        steps.push(`Configure the available controls for the video operation.`);
        steps.push(`Click the action button to process your video with ${name}.`);
      }
      steps.push('Download the processed video when rendering is complete.');
      return steps;
    },
    benefits: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      return [
        { title: 'Videos never leave your device', description: `${name} processes video locally in your browser. Your raw footage stays private — important for client work, personal videos, and confidential content.` },
        { title: 'No expensive software needed', description: 'Video editing suites like Adobe Premiere or Final Cut Pro cost hundreds of dollars. This tool handles common video operations for free in your browser.' },
        { title: 'Quick edits without rendering queues', description: 'Cloud editors often queue rendering jobs. Browser-based processing starts immediately and completes as fast as your hardware allows.' },
        uc
          ? { title: cap(uc.split(',')[0].split(' — ')[0]), description: `${uc}. ${name} makes this possible without uploading your video to a cloud service.` }
          : { title: 'No account or subscription', description: 'Free to use with no sign-up, no watermark on output, and no file count limits.' },
      ];
    },
    faqs: (name, _desc, slug, _enhancedDesc) => {
      const faqs: { q: string; a: string }[] = [];
      if (slug.includes('compress')) {
        faqs.push({ q: `How much does ${name} reduce file size?`, a: 'Compression results depend on the original video. By lowering bitrate and resolution, you can typically reduce file size by 50-80% with acceptable quality. Preview the result before downloading.' });
      } else if (slug.includes('convert')) {
        faqs.push({ q: `What formats does ${name} support?`, a: 'The tool converts between MP4, WebM, and AVI formats. Output is encoded via the MediaRecorder API, which supports MP4 and WebM in most browsers.' });
      } else if (slug.includes('trim') || slug.includes('cutter')) {
        faqs.push({ q: `How precise is the trimming in ${name}?`, a: 'The tool provides frame-level precision for trim points. Drag the handles on the timeline to set start and end positions, then preview before exporting.' });
      } else if (slug.includes('merge')) {
        faqs.push({ q: `Can I merge videos of different formats with ${name}?`, a: 'Yes. The tool decodes all input videos and encodes the merged output in a single format. Mix MP4, WebM, and MOV files in any order.' });
      } else if (slug.includes('rotat')) {
        faqs.push({ q: `Will rotation affect video quality in ${name}?`, a: 'No. Rotation is a lossless operation — the tool rearranges pixel data without re-encoding the video stream. Quality is fully preserved.' });
      } else if (slug.includes('speed')) {
        faqs.push({ q: `Does ${name} change audio pitch when changing speed?`, a: 'No. The tool preserves the original pitch when changing playback speed. Audio is time-stretched to match the new speed without key changes.' });
      } else if (slug.includes('to-gif')) {
        faqs.push({ q: `What is the maximum GIF duration with ${name}?`, a: 'GIFs are best for short clips (under 10 seconds). Longer clips produce very large GIF files. Set a short duration and lower frame rate for web-friendly output.' });
      } else if (slug.includes('extract-audio')) {
        faqs.push({ q: `What audio format does ${name} output?`, a: 'The tool extracts audio as MP3 or WAV. MP3 is smaller and widely compatible. WAV is lossless but larger.' });
      } else if (slug.includes('mute')) {
        faqs.push({ q: `Can ${name} mute specific parts of a video?`, a: `${name} removes the entire audio track. To mute only specific sections, use the video trimmer to cut those sections separately, or use a dedicated video editor.` });
      } else {
        faqs.push({ q: 'What video formats are supported?', a: 'The tool accepts MP4, WebM, and MOV files (format support depends on your browser). Output is typically WebM or MP4, encoded via the MediaRecorder API.' });
      }
      faqs.push({ q: `Is ${name} fast enough for large videos?`, a: 'Processing speed depends on your device\'s CPU and the video length. Short clips (under 5 minutes) process in seconds. Longer videos may take several minutes. No upload time is needed since processing is local.' });
      faqs.push({ q: 'Will the output video have a watermark?', a: 'No. The tool does not add watermarks or logos to your video. The output is clean and ready to use.' });
      faqs.push({ q: 'Can I process 4K or high-bitrate video?', a: '4K video processing is possible but depends on your browser and hardware. For best performance with large files, close other browser tabs and use a desktop computer with sufficient RAM.' });
      return faqs;
    },
  },

  'Developer Tools': {
    whatIs: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      let r = `${name} ${coreAction(enhancedDesc)}. The tool runs entirely in your browser using standard JavaScript APIs, making it useful for quick development tasks without installing CLI tools or reaching for an IDE.`;
      if (uc) r += ` ${cap(uc)}.`;
      return r;
    },
    howTo: (name, slug, _enhancedDesc) => {
      const steps: string[] = [];
      steps.push(`Paste your code, text, or data into the ${name} input area. Some tools also support file upload.`);
      if (slug.includes('format') || slug.includes('beautif')) {
        steps.push('Configure indentation size and formatting options if available.');
        steps.push('Click Format to beautify the code with proper indentation and spacing.');
      } else if (slug.includes('valid')) {
        steps.push('Click Validate to check the syntax of your input.');
        steps.push('Review any error messages with line numbers and fix issues in your input.');
      } else if (slug.includes('minif')) {
        steps.push('Click Minify to remove whitespace, comments, and unnecessary characters.');
        steps.push('Copy the minified output for use in your project.');
      } else if (slug.includes('encode') || slug.includes('decode')) {
        steps.push('Enter the text you want to encode or decode.');
        steps.push('Click the action button to transform the input.');
      } else if (slug.includes('hash')) {
        steps.push('Enter the text you want to hash.');
        steps.push('The tool computes the hash instantly and displays it in the output area.');
      } else if (slug.includes('jwt')) {
        steps.push(slug.includes('decode') ? 'Paste your JWT token into the input field.' : 'Enter the header and payload JSON for your JWT.');
        steps.push(slug.includes('decode') ? 'The tool decodes the token and displays the header and payload.' : 'Click Generate to create the JWT token.');
      } else if (slug.includes('regex')) {
        steps.push('Enter your regex pattern and test string.');
        steps.push('The tool highlights matches in real-time as you type.');
      } else if (slug.includes('json') || slug.includes('xml') || slug.includes('yaml')) {
        steps.push('The tool processes your input and displays the formatted or converted result.');
        steps.push('Copy the output or download it as a file.');
      } else {
        steps.push('Configure any available options, such as output format or encoding type.');
        steps.push('Click the process button to transform, format, or validate your input.');
      }
      steps.push('Copy the result from the output area, or download it as a file if the tool supports file export.');
      return steps;
    },
    benefits: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      return [
        { title: 'Instant results in your browser', description: `${name} runs instantly in a browser tab for quick formatting and encoding tasks — no need to open a terminal, install a package, or switch to your IDE.` },
        { title: 'Input never leaves your device', description: 'All processing is client-side JavaScript. Code, API keys, and data stay on your machine — important when working with sensitive configs or proprietary code.' },
        uc
          ? { title: cap(uc.split(',')[0].split(' — ')[0]), description: `${uc}. ${name} provides this capability without installing Node.js packages or CLI utilities.` }
          : { title: 'Handles edge cases gracefully', description: 'The tools report specific errors with line numbers and context, making debugging faster than generic "invalid input" messages.' },
        { title: 'No dependencies to install', description: 'These tools work in any modern browser without installing Node.js, Python, or any CLI utility. Useful on locked-down corporate machines or when pairing remotely.' },
      ];
    },
    faqs: (name, _desc, slug, _enhancedDesc) => {
      const faqs: { q: string; a: string }[] = [];
      if (slug.includes('format')) {
        faqs.push({ q: `Does ${name} follow a specific style guide?`, a: 'The formatter applies consistent indentation and spacing rules. For JSON and XML, it follows standard formatting conventions. For SQL, it aligns keywords and clauses for readability. For YAML, it normalizes indentation.' });
      } else if (slug.includes('valid')) {
        faqs.push({ q: `What kind of errors does ${name} report?`, a: 'The validator reports the exact location of errors — line number, column, and a description of what is wrong — so you can fix issues immediately without guessing.' });
      } else if (slug.includes('minif')) {
        faqs.push({ q: `How much does ${name} reduce file size?`, a: 'Minification typically reduces file size by 30-60% by removing whitespace, comments, and unnecessary characters. The code functionality is unchanged.' });
      } else if (slug.includes('encode') || slug.includes('decode')) {
        faqs.push({ q: `What encoding does ${name} use?`, a: slug.includes('base32') ? 'The tool uses standard Base32 encoding (RFC 4648) to convert between plain text and Base32 format.' : slug.includes('base64') ? 'The tool uses standard Base64 encoding to convert between plain text and Base64 format.' : 'The tool uses the encoding standard appropriate for the specific operation.' });
      } else if (slug.includes('hash')) {
        faqs.push({ q: `Is ${name} suitable for password hashing?`, a: slug.includes('bcrypt') ? 'Yes. Bcrypt is specifically designed for password hashing — it includes a salt and is intentionally slow to resist brute-force attacks. Use it for storing password hashes in your database.' : 'No. MD5, SHA-1, and SHA-256 are fast hash functions designed for checksums and data integrity, not password storage. For passwords, use bcrypt.' });
      } else if (slug.includes('jwt')) {
        faqs.push({ q: `Is ${name} secure for production tokens?`, a: slug.includes('decode') ? 'Decoding a JWT does not verify its signature — it only reads the payload. Never trust decoded JWT data without verifying the signature server-side first.' : 'The tool creates unsigned or test tokens. For production, sign tokens with a secret key on your server.' });
      } else if (slug.includes('regex')) {
        faqs.push({ q: `What regex flavor does ${name} use?`, a: 'The tool uses JavaScript\'s native RegExp engine, which supports most PCRE features. Pattern syntax follows the ECMAScript specification.' });
      } else {
        faqs.push({ q: `Does ${name} work with large files?`, a: 'Most developer tools handle files up to several megabytes without issue. For very large JSON or XML files (10MB+), processing may slow down but should complete.' });
      }
      faqs.push({ q: 'Is my code or data sent to a server?', a: 'No. All processing happens in your browser via JavaScript. Your code, data, and API keys are never transmitted anywhere.' });
      if (slug.includes('format')) {
        faqs.push({ q: 'Can I customize the formatting style?', a: 'Yes. Most formatters offer indentation size options (2, 4, or tab). SQL and YAML formatters may have additional options for keyword casing and line wrapping.' });
      } else {
        faqs.push({ q: 'Can I integrate this tool into my build pipeline?', a: 'The tools are designed for manual use in the browser. For build pipelines, use equivalent CLI tools like prettier, jq, or xmllint. This tool is for quick one-off tasks.' });
      }
      faqs.push({ q: 'What happens if my input has syntax errors?', a: slug.includes('valid') ? 'The validator reports the exact location of the error — line number, column, and a description of what is wrong — so you can fix it immediately.' : 'If the input is malformed, the tool will display an error message indicating what went wrong. Fix the error in your input and try again.' });
      return faqs;
    },
  },

  'SEO Tools': {
    whatIs: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      let r = `${name} ${coreAction(enhancedDesc)}. The tool helps you optimize your website for search engines by generating or analyzing structured data, meta tags, and other SEO elements directly in your browser.`;
      if (uc) r += ` ${cap(uc)}.`;
      return r;
    },
    howTo: (name, slug, _enhancedDesc) => {
      const steps: string[] = [];
      steps.push(`Enter the required information into the ${name} form fields — such as page URL, title, description, or schema properties.`);
      if (slug.includes('schema')) {
        steps.push('Fill in the schema-specific fields (e.g. article title, author, date published, product price).');
        steps.push('Click Generate to produce JSON-LD structured data markup.');
        steps.push('Copy the JSON-LD and paste it into your page\'s head section or CMS.');
      } else if (slug.includes('meta-tag') || slug.includes('open-graph') || slug.includes('twitter-card')) {
        steps.push('Enter your page title, description, URL, and image URL.');
        steps.push('Click Generate to produce the meta tag HTML.');
        steps.push('Copy the HTML tags and paste them into your page\'s head section.');
      } else if (slug.includes('keyword')) {
        steps.push('Enter your text or URL to extract keywords from.');
        steps.push('Click Extract to identify important terms and phrases.');
        steps.push('Review the extracted keywords with their frequency and density.');
      } else if (slug.includes('redirect')) {
        steps.push('Enter the URL you want to check.');
        steps.push('Click Check to trace the redirect chain and display HTTP status codes.');
        steps.push('Review the redirect path from the original URL to the final destination.');
      } else if (slug.includes('serp')) {
        steps.push('Enter your title and meta description text.');
        steps.push('The tool calculates pixel width and shows how your snippet will appear in Google search results.');
        steps.push('Adjust your text to fit within the pixel limits for optimal display.');
      } else if (slug.includes('slug')) {
        steps.push('Enter your page title or text.');
        steps.push('Click Generate to create a clean, URL-safe slug.');
        steps.push('Copy the slug for use in your URL structure.');
      } else if (slug.includes('sitemap')) {
        steps.push('Enter your URLs or upload a list of pages.');
        steps.push('Click Generate to produce a valid XML sitemap.');
        steps.push('Download the sitemap.xml file and upload it to your website root.');
      } else if (slug.includes('robots')) {
        steps.push('Select the directives you want (index, follow, noarchive, etc.).');
        steps.push('Click Generate to produce the meta robots tag or robots.txt content.');
        steps.push('Copy the output to your page or robots.txt file.');
      } else if (slug.includes('canonical')) {
        steps.push('Enter your canonical URL.');
        steps.push('Click Generate to produce the canonical link tag.');
        steps.push('Copy the link tag and paste it into your page\'s head section.');
      } else if (slug.includes('hreflang')) {
        steps.push('Enter your page URLs and language/region codes.');
        steps.push('Click Generate to produce hreflang link tags.');
        steps.push('Copy the tags and paste them into your page\'s head section.');
      } else {
        steps.push('Configure any available options, such as schema properties or tag attributes.');
        steps.push('Click Generate or Analyze to produce the output.');
        steps.push('Copy the generated HTML, JSON-LD, or analysis report and integrate it into your website.');
      }
      return steps;
    },
    benefits: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      return [
        { title: 'Valid structured data output', description: `${name} generates markup that follows Schema.org vocabulary and Google\'s structured data guidelines, helping you qualify for rich results in search.` },
        { title: 'No SEO platform subscription', description: 'These tools provide the same outputs as expensive SEO platforms for common tasks like schema generation and meta tag creation — without the monthly fee.' },
        uc
          ? { title: cap(uc.split(',')[0].split(' — ')[0]), description: `${uc}. ${name} simplifies this process with a form-based interface.` }
          : { title: 'Immediate, actionable results', description: 'Copy-paste the generated tags directly into your CMS or HTML. No export, no formatting, no intermediate steps.' },
        { title: 'Works for any website platform', description: 'The generated HTML and JSON-LD work on WordPress, Shopify, custom HTML, Next.js, or any platform that lets you edit the head section.' },
      ];
    },
    faqs: (name, _desc, slug, _enhancedDesc) => {
      const faqs: { q: string; a: string }[] = [];
      if (slug.includes('schema')) {
        faqs.push({ q: `What is JSON-LD structured data?`, a: 'JSON-LD is a JavaScript notation that search engines use to understand your page content. Google uses it to display rich results — like star ratings, breadcrumbs, and FAQ accordions — in search results.' });
      } else if (slug.includes('keyword')) {
        faqs.push({ q: `How does ${name} extract keywords?`, a: 'The tool analyzes your text to identify frequently occurring terms and phrases. It filters out common stop words and ranks remaining terms by frequency and relevance for SEO targeting.' });
      } else if (slug.includes('redirect')) {
        faqs.push({ q: `What redirect types does ${name} detect?`, a: 'The tool traces 301 (permanent), 302 (temporary), 307, and 308 redirects. It displays the full redirect chain from the original URL to the final destination, including HTTP status codes at each hop.' });
      } else if (slug.includes('serp')) {
        faqs.push({ q: `What pixel width should my title and description be?`, a: 'Google truncates titles around 600 pixels and descriptions around 960 pixels. The tool measures your text in pixels (not characters) for accurate SERP preview, since wider characters like "W" take more space.' });
      } else if (slug.includes('slug')) {
        faqs.push({ q: `What makes a good URL slug?`, a: 'Keep it short (3-5 words), lowercase, hyphen-separated, and include your primary keyword. Avoid stop words, special characters, and numbers unless they are meaningful. The tool handles all of this automatically.' });
      } else if (slug.includes('sitemap')) {
        faqs.push({ q: `How many URLs should a sitemap contain?`, a: 'A single sitemap can contain up to 50,000 URLs and be 50MB max. For larger sites, split into multiple sitemap files and use a sitemap index file. The tool generates valid XML that search engines can parse.' });
      } else {
        faqs.push({ q: `Will ${name} improve my search rankings?`, a: 'Structured data and proper meta tags help search engines understand your content, which can improve how your pages appear in results. However, rankings depend primarily on content quality, backlinks, and user experience.' });
      }
      faqs.push({ q: `Do I need SEO tools if I use an SEO plugin?`, a: 'SEO plugins handle some of these tasks automatically, but they may not cover every schema type or meta tag. These tools let you generate specific tags and schema manually for pages where your plugin falls short.' });
      faqs.push({ q: 'How do I test my generated schema markup?', a: 'Use Google\'s Rich Results Test (search.google.com/test/rich-results) to validate structured data before deploying. Paste the JSON-LD or provide your URL to check for errors.' });
      faqs.push({ q: 'Can I use these tools for client websites?', a: 'Yes. The generated markup and tags are standard HTML and JSON-LD that work on any website. No attribution or license is required.' });
      return faqs;
    },
  },

  'Text Tools': {
    whatIs: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      let r = `${name} ${coreAction(enhancedDesc)}. The tool processes text entirely in your browser using JavaScript string operations — no server round-trip, no data upload, and instant results.`;
      if (uc) r += ` ${cap(uc)}.`;
      return r;
    },
    howTo: (name, slug, _enhancedDesc) => {
      const steps: string[] = [];
      steps.push(`Paste or type your text into the ${name} input area.`);
      if (slug.includes('case')) {
        steps.push('Select the case conversion type (uppercase, lowercase, title case, sentence case, or camelCase).');
        steps.push('The tool converts the text instantly — copy the result from the output area.');
      } else if (slug.includes('word') || slug.includes('character') || slug.includes('counter') || slug.includes('line')) {
        steps.push('The tool counts words, characters, lines, and paragraphs in real-time as you type or paste.');
        steps.push('Review the statistics displayed below the input area.');
      } else if (slug.includes('reverse')) {
        steps.push('Choose to reverse by character, by word, or by line.');
        steps.push('The tool reverses the text instantly — copy the result.');
      } else if (slug.includes('repeat')) {
        steps.push('Enter the number of times to repeat and choose a separator if needed.');
        steps.push('Click Generate to produce the repeated text.');
      } else if (slug.includes('sort')) {
        steps.push('Choose the sort order (alphabetical, reverse alphabetical, by length, or random).');
        steps.push('The tool sorts lines instantly — copy the result.');
      } else if (slug.includes('clean')) {
        steps.push('The tool strips formatting, HTML tags, special characters, and extra whitespace.');
        steps.push('Review the cleaned text and copy it.');
      } else if (slug.includes('compare')) {
        steps.push('Paste the original text in the left field and the modified text in the right field.');
        steps.push('The tool highlights added, removed, and changed lines.');
      } else if (slug.includes('find-and-replace') || slug.includes('find')) {
        steps.push('Enter the search text and replacement text. Enable regex if needed.');
        steps.push('Click Replace All to transform all matches in your text.');
      } else if (slug.includes('duplicate')) {
        steps.push('Choose case-sensitive or case-insensitive deduplication.');
        steps.push('The tool removes duplicate lines instantly — copy the result.');
      } else if (slug.includes('spaces')) {
        steps.push('The tool normalizes whitespace — removing multiple spaces, tabs, and blank lines.');
        steps.push('Review the cleaned text and copy it.');
      } else if (slug.includes('lorem')) {
        steps.push('Enter the number of paragraphs, sentences, or words you need.');
        steps.push('Click Generate to produce lorem ipsum placeholder text.');
      } else if (slug.includes('markdown')) {
        steps.push('Type Markdown in the editor — the preview updates in real-time.');
        steps.push('Copy the rendered HTML or the Markdown source.');
      } else if (slug.includes('html-to-text')) {
        steps.push('Paste your HTML into the input area.');
        steps.push('The tool strips all tags and displays the plain text content.');
      } else {
        steps.push('Configure any available options, such as match case, whole words, or output format.');
        steps.push('Click the process button to transform your text.');
      }
      steps.push('Copy the result from the output area and paste it where you need it.');
      return steps;
    },
    benefits: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      return [
        { title: 'Instant text transformation', description: `${name} completes text operations in milliseconds. No waiting for server processing — everything happens in your browser.` },
        { title: 'Your text stays private', description: 'All text processing is client-side. Sensitive documents like legal drafts, contracts, and personal writing are never transmitted to a server.' },
        uc
          ? { title: cap(uc.split(',')[0].split(' — ')[0]), description: `${uc}. ${name} makes this task straightforward with a simple interface.` }
          : { title: 'Handles large text blocks', description: 'These tools can process documents of any length — from a single sentence to a full novel — without slowdown, since everything runs in your browser.' },
        { title: 'No character or word limits', description: 'Unlike some online text tools that impose limits on paste size, these tools handle as much text as your browser can hold in memory.' },
      ];
    },
    faqs: (name, _desc, slug, _enhancedDesc) => {
      const faqs: { q: string; a: string }[] = [];
      if (slug.includes('case')) {
        faqs.push({ q: `What case formats does ${name} support?`, a: 'The tool supports uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, and kebab-case conversion.' });
      } else if (slug.includes('word') || slug.includes('character') || slug.includes('counter') || slug.includes('line')) {
        faqs.push({ q: `What does ${name} count?`, a: 'The tool counts words, characters (with and without spaces), lines, paragraphs, and estimated reading time. All counts update in real-time as you type.' });
      } else if (slug.includes('compare')) {
        faqs.push({ q: `How does the comparison in ${name} work?`, a: 'The tool uses a line-by-line diff algorithm to identify additions, deletions, and changes between two text blocks. Differences are highlighted so you can spot exactly what changed.' });
      } else if (slug.includes('find-and-replace') || slug.includes('find')) {
        faqs.push({ q: `Does ${name} support regex?`, a: 'Yes. You can enable regex mode to search with regular expressions and use capture groups in the replacement text. This allows pattern-based find and replace for complex transformations.' });
      } else if (slug.includes('duplicate')) {
        faqs.push({ q: `Does ${name} preserve line order?`, a: 'Yes. The tool removes duplicate lines while preserving the order of first occurrence. The first time a line appears, it stays; subsequent duplicates are removed.' });
      } else if (slug.includes('lorem')) {
        faqs.push({ q: `Is the lorem ipsum from ${name} standard?`, a: 'Yes. The tool generates the classic Lorem Ipsum text that has been used as printer filler since the 1500s. It is pseudo-Latin derived from Cicero\'s De Finibus Bonorum et Malorum.' });
      } else {
        faqs.push({ q: `Does ${name} support non-English text?`, a: 'Yes. The tools use JavaScript\'s native Unicode string handling, which supports all languages and character sets including CJK, Arabic, and Cyrillic.' });
      }
      faqs.push({ q: 'Is there a text size limit?', a: 'There is no artificial limit. Practical limits depend on your browser\'s memory. Text up to several megabytes (roughly a million words) processes without issues on modern devices.' });
      if (slug.includes('compare')) {
        faqs.push({ q: 'Can I compare more than two text blocks?', a: `${name} compares two text blocks at a time. For three-way comparisons, use a dedicated merge tool. This tool is designed for quick before-and-after comparisons.` });
      } else {
        faqs.push({ q: 'Can I undo changes after processing?', a: 'The tool replaces your input with the processed output. To undo, paste your original text back into the input area. Consider copying your original text before processing if you may need it.' });
      }
      faqs.push({ q: 'Will formatting be preserved?', a: 'Text tools work with plain text. Rich formatting (bold, italics, colors) from word processors is stripped when you paste. The tools operate on the raw text content only.' });
      return faqs;
    },
  },

  'Converters': {
    whatIs: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      let r = `${name} ${coreAction(enhancedDesc)}. The tool performs unit conversions using precise conversion factors defined in JavaScript — accurate to many decimal places and updated to current international standards.`;
      if (uc) r += ` ${cap(uc)}.`;
      return r;
    },
    howTo: (name, _slug, _enhancedDesc) => {
      return [
        `Enter the value you want to convert into the ${name} input field.`,
        'Select the source unit (the unit your value is currently in).',
        'Select the target unit (the unit you want to convert to).',
        'The converted result appears instantly. Copy it or adjust your input for a new conversion.',
      ];
    },
    benefits: (_name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      return [
        { title: 'Precise conversion factors', description: `Conversions use internationally recognized conversion factors (SI units, NIST standards) with full floating-point precision. Results are accurate to at least 10 significant figures.` },
        { title: 'Instant, bidirectional conversion', description: 'Change either the input or the unit selection and the result updates immediately. No submit button, no page reload.' },
        uc
          ? { title: cap(uc.split(',')[0].split(' — ')[0]), description: `${uc}. The tool covers the full range of units used in everyday and professional contexts.` }
          : { title: 'All common units included', description: 'Each converter covers the full range of units used in everyday and professional contexts — metric and imperial, plus specialized units where relevant.' },
        { title: 'Works offline', description: 'Once the page loads, all conversion logic runs in your browser. You can use the tool without an internet connection.' },
      ];
    },
    faqs: (name, _desc, slug, _enhancedDesc) => {
      const faqs: { q: string; a: string }[] = [];
      if (slug.includes('temperature')) {
        faqs.push({ q: `What temperature units does ${name} support?`, a: 'The tool converts between Celsius, Fahrenheit, and Kelvin. These are the three most commonly used temperature scales in science, weather, and cooking.' });
      } else if (slug.includes('length')) {
        faqs.push({ q: `What length units does ${name} support?`, a: 'The tool converts between millimetres, centimetres, metres, kilometres, inches, feet, yards, and miles — covering both metric and imperial systems.' });
      } else if (slug.includes('weight')) {
        faqs.push({ q: `What weight units does ${name} support?`, a: 'The tool converts between milligrams, grams, kilograms, tonnes, ounces, pounds, and stones — covering both metric and imperial mass units.' });
      } else if (slug.includes('currency')) {
        faqs.push({ q: `Does ${name} use live exchange rates?`, a: 'No. The tool lets you enter your own exchange rates for the currencies you need. This gives you control over the rates used and works offline. For live rates, check a financial service like XE or your bank.' });
      } else if (slug.includes('data-storage')) {
        faqs.push({ q: `What data units does ${name} support?`, a: 'The tool converts between bytes, kilobytes (KB), megabytes (MB), gigabytes (GB), terabytes (TB), and petabytes (PB) — using both binary (1024) and decimal (1000) conventions.' });
      } else if (slug.includes('time') || slug.includes('timestamp') || slug.includes('unix')) {
        faqs.push({ q: `What does ${name} convert?`, a: slug.includes('timestamp') || slug.includes('unix') ? 'The tool converts between Unix timestamps (seconds or milliseconds since epoch) and human-readable date/time formats. It supports both UTC and local time.' : 'The tool converts between common time units — seconds, minutes, hours, days, weeks, months, and years.' });
      } else if (slug.includes('color') || slug.includes('hex') || slug.includes('rgb')) {
        faqs.push({ q: `What color formats does ${name} support?`, a: 'The tool converts between HEX, RGB, HSL, and CMYK color formats. Enter a value in any format and the tool shows the equivalent in all other formats instantly.' });
      } else {
        faqs.push({ q: `How accurate is ${name}?`, a: 'Conversions use JavaScript floating-point arithmetic with conversion factors accurate to at least 10 significant figures. For everyday use, the precision far exceeds what is needed.' });
      }
      faqs.push({ q: 'Are both metric and imperial units supported?', a: 'Yes. Every converter includes both metric (SI) and imperial/US customary units. You can convert in either direction — metric to imperial or imperial to metric.' });
      faqs.push({ q: 'Can I convert multiple values at once?', a: 'The tool converts one value per session. For batch conversions, enter each value separately. The instant results make batch work fast.' });
      faqs.push({ q: 'Does the tool remember my last conversion?', a: 'The tool resets when you reload the page. If you need to save specific conversions, note them down or bookmark the page for quick access.' });
      return faqs;
    },
  },

  'Calculators': {
    whatIs: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      let r = `${name} ${coreAction(enhancedDesc)}. The tool performs calculations using JavaScript arithmetic with standard financial and mathematical formulas, giving you instant results without needing a spreadsheet or financial calculator.`;
      if (uc) r += ` ${cap(uc)}.`;
      return r;
    },
    howTo: (name, slug, _enhancedDesc) => {
      const steps: string[] = [];
      if (slug.includes('bmi')) {
        steps.push(`Enter your height and weight into the ${name} input fields.`);
        steps.push('The tool calculates your BMI instantly and displays the category (underweight, normal, overweight, or obese).');
        steps.push('Review the BMI score and category. Adjust your inputs to see how changes affect the result.');
      } else if (slug.includes('age')) {
        steps.push(`Enter your birth date into the ${name} input field.`);
        steps.push('The tool calculates your exact age in years, months, and days instantly.');
        steps.push('Review the age breakdown and time until your next birthday.');
      } else if (slug.includes('compound') || slug.includes('interest') || slug.includes('loan') || slug.includes('emi')) {
        steps.push(`Enter the principal amount, interest rate, and time period into the ${name} input fields.`);
        steps.push('The tool computes the result automatically using standard financial formulas.');
        steps.push('Review the breakdown of principal and interest. Adjust inputs to compare different scenarios.');
      } else if (slug.includes('percentage')) {
        steps.push(`Enter the values for your percentage calculation into the ${name} input fields.`);
        steps.push('The tool computes the percentage instantly as you type.');
        steps.push('Review the result and adjust inputs for different calculations.');
      } else if (slug.includes('discount')) {
        steps.push(`Enter the original price and discount percentage into the ${name} input fields.`);
        steps.push('The tool calculates the discount amount and final price instantly.');
        steps.push('Review the savings and adjust inputs for different discount scenarios.');
      } else if (slug.includes('gst') || slug.includes('tax')) {
        steps.push(`Enter the amount and tax rate into the ${name} input fields.`);
        steps.push('The tool calculates the tax amount and total instantly.');
        steps.push('Review the breakdown and adjust inputs for different amounts.');
      } else if (slug.includes('tip')) {
        steps.push(`Enter the bill amount and tip percentage into the ${name} input fields.`);
        steps.push('The tool calculates the tip and total per person instantly.');
        steps.push('Review the breakdown and adjust the number of people if splitting the bill.');
      } else if (slug.includes('scientific')) {
        steps.push(`Use the ${name} keypad or keyboard to enter your calculation.`);
        steps.push('The tool evaluates the expression using standard mathematical order of operations.');
        steps.push('Review the result and continue with additional calculations.');
      } else if (slug.includes('business-day')) {
        steps.push(`Enter the start and end dates into the ${name} input fields.`);
        steps.push('The tool calculates the number of working days, excluding weekends.');
        steps.push('Review the business day count and adjust dates for different periods.');
      } else {
        steps.push(`Enter the required values into the ${name} input fields.`);
        steps.push('The tool computes the result automatically as you type.');
        steps.push('Review the result and adjust inputs to compare different scenarios.');
      }
      return steps;
    },
    benefits: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      return [
        { title: 'Transparent calculation breakdown', description: `${name} shows how the result is computed — not just a final number. This helps you understand the math and verify the calculation makes sense for your situation.` },
        { title: 'Instant scenario comparison', description: 'Change any input and see the result update immediately. This lets you quickly compare different loan amounts, interest rates, or time periods without re-entering all values.' },
        uc
          ? { title: cap(uc.split(',')[0].split(' — ')[0]), description: `${uc}. ${name} uses the standard formula for this calculation, so you can verify the result against any textbook or financial calculator.` }
          : { title: 'Standard formulas, no black boxes', description: 'Calculations use well-established financial and mathematical formulas that you can verify against any textbook or financial calculator.' },
        { title: 'No ads in the calculation area', description: 'The calculator interface is clean and focused. Results are displayed prominently without distracting ad placements in the calculation flow.' },
      ];
    },
    faqs: (name, _desc, slug, _enhancedDesc) => {
      const faqs: { q: string; a: string }[] = [];
      if (slug.includes('bmi')) {
        faqs.push({ q: `Is ${name} medical advice?`, a: 'No. BMI provides a general reference value based on height and weight. It does not account for muscle mass, bone density, or body composition. Consult a healthcare professional for personalized health assessments.' });
      } else if (slug.includes('compound') || slug.includes('interest')) {
        faqs.push({ q: `What formula does ${name} use?`, a: 'The tool uses the compound interest formula A = P(1 + r/n)^(nt), where P is principal, r is annual rate, n is compounding frequency, and t is time in years. You can verify this against any finance textbook.' });
      } else if (slug.includes('loan') || slug.includes('emi')) {
        faqs.push({ q: `Is the EMI from ${name} exact?`, a: 'The tool uses the standard EMI formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is principal, r is monthly rate, and n is number of months. Real-world loans may include processing fees or insurance not captured by this formula.' });
      } else if (slug.includes('age')) {
        faqs.push({ q: `How does ${name} handle leap years?`, a: 'The tool accounts for leap years in its date calculation. If you were born on February 29, the tool counts your birthday on March 1 in non-leap years.' });
      } else if (slug.includes('scientific')) {
        faqs.push({ q: `What functions does ${name} support?`, a: 'The calculator supports trigonometric functions (sin, cos, tan), logarithms (log, ln), exponentials, factorials, square roots, powers, and constants like pi and e. It follows standard mathematical order of operations.' });
      } else if (slug.includes('percentage')) {
        faqs.push({ q: `What can ${name} calculate?`, a: 'The tool calculates percentage of a number, percentage increase/decrease between two values, and what percentage one number is of another. All three modes update instantly as you type.' });
      } else {
        faqs.push({ q: `Are ${name} results accurate for financial decisions?`, a: 'The calculator uses standard financial formulas. However, real-world loans and investments may include fees, taxes, and terms not captured by a simple calculator. Use the results as estimates and verify with your financial institution for exact figures.' });
      }
      if (slug.includes('bmi') || slug.includes('age')) {
        faqs.push({ q: `Is this medical advice?`, a: 'No. BMI and health calculators provide general reference values, not medical advice. Consult a healthcare professional for personalized health assessments, especially if you have conditions that affect interpretation.' });
      } else {
        faqs.push({ q: 'Can I use this for business calculations?', a: 'Yes. The calculators use standard formulas applicable to business scenarios like loan EMI, GST, and discount calculations. For official filings, verify against your accountant\'s calculations.' });
      }
      faqs.push({ q: 'Does the tool store my calculation history?', a: 'No. Calculations are not stored. If you need to save results, take a screenshot or note them down. Your input values are not transmitted to any server.' });
      faqs.push({ q: 'Can I share my calculation results?', a: 'The tool does not have a share feature. Take a screenshot of the results or copy the numbers manually to share with others.' });
      return faqs;
    },
  },

  'Design Tools': {
    whatIs: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      let r = `${name} ${coreAction(enhancedDesc)}. The tool generates CSS code or visual assets using browser-native rendering — Canvas for image generation and live DOM updates for CSS previews.`;
      if (uc) r += ` ${cap(uc)}.`;
      return r;
    },
    howTo: (name, slug, _enhancedDesc) => {
      const steps: string[] = [];
      steps.push(`Open ${name} and configure the available settings — such as colors, angles, dimensions, or style properties.`);
      if (slug.includes('gradient')) {
        steps.push('Choose gradient type (linear, radial, or conic) and set color stops with positions.');
        steps.push('Watch the live preview update as you adjust colors and angles.');
        steps.push('Click Copy CSS to get the gradient code for your stylesheet.');
      } else if (slug.includes('shadow')) {
        steps.push('Set horizontal and vertical offset, blur radius, spread, and color for the shadow.');
        steps.push('Watch the live preview update as you adjust each value.');
        steps.push('Click Copy CSS to get the box-shadow code.');
      } else if (slug.includes('button')) {
        steps.push('Customize colors, borders, padding, border radius, and hover states.');
        steps.push('Watch the button preview update in real-time.');
        steps.push('Click Copy CSS to get the button code.');
      } else if (slug.includes('glassmorphism')) {
        steps.push('Adjust blur, transparency, border, and background color for the glass effect.');
        steps.push('Watch the live preview update as you tweak each property.');
        steps.push('Click Copy CSS to get the glassmorphism code.');
      } else if (slug.includes('neumorphism')) {
        steps.push('Set the distance, intensity, and color for the soft shadow effect.');
        steps.push('Watch the live preview update as you adjust properties.');
        steps.push('Click Copy CSS to get the neumorphism code.');
      } else if (slug.includes('border-radius')) {
        steps.push('Drag the corner radius sliders or enter values for each corner independently.');
        steps.push('Watch the shape preview update in real-time.');
        steps.push('Click Copy CSS to get the border-radius code.');
      } else if (slug.includes('color-palette')) {
        steps.push('Enter a base color and choose a color scheme type (complementary, analogous, triadic, etc.).');
        steps.push('The tool generates a harmonious palette instantly.');
        steps.push('Copy the hex values for each color in the palette.');
      } else if (slug.includes('svg')) {
        steps.push(slug.includes('optimizer') ? 'Upload or paste your SVG code.' : 'Upload your SVG file and set custom dimensions and background color.');
        steps.push(slug.includes('optimizer') ? 'The tool removes unused data, whitespace, and metadata to reduce file size.' : 'The tool converts the SVG to PNG using Canvas rendering.');
        steps.push(slug.includes('optimizer') ? 'Copy or download the optimized SVG.' : 'Download the PNG image.');
      } else if (slug.includes('favicon')) {
        steps.push('Upload your source image.');
        steps.push('The tool generates multiple favicon sizes from the single image.');
        steps.push('Download the favicon files for your website.');
      } else if (slug.includes('placeholder')) {
        steps.push('Set custom dimensions, background color, and text for the placeholder image.');
        steps.push('The tool generates the placeholder instantly using Canvas.');
        steps.push('Download the placeholder image for your mockup or prototype.');
      } else {
        steps.push('Watch the live preview update as you adjust each setting.');
        steps.push('Click Copy CSS, Download, or Export to get the final output.');
      }
      steps.push('Paste the CSS into your stylesheet or use the downloaded asset in your project.');
      return steps;
    },
    benefits: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      return [
        { title: 'Live visual preview', description: `${name} shows changes in real-time as you adjust settings. No need to generate, copy, and test in a separate editor — the preview shows exactly what the output will look like.` },
        { title: 'Copy-ready CSS code', description: 'Generated CSS includes vendor prefixes where needed and is formatted for direct pasting into your stylesheet. No manual cleanup required.' },
        uc
          ? { title: cap(uc.split(',')[0].split(' — ')[0]), description: `${uc}. ${name} produces this output without needing Figma, Photoshop, or Sketch.` }
          : { title: 'No design software required', description: 'Create gradients, shadows, buttons, and other design elements without opening design software. The tools produce production-ready CSS in seconds.' },
        { title: 'Free for commercial use', description: 'Generated CSS and assets are yours to use in any project, personal or commercial. No attribution required.' },
      ];
    },
    faqs: (name, _desc, slug, _enhancedDesc) => {
      const faqs: { q: string; a: string }[] = [];
      if (slug.includes('gradient')) {
        faqs.push({ q: `What gradient types does ${name} support?`, a: 'The tool supports linear, radial, and conic gradients. You can set multiple color stops with precise positions, and adjust the angle for linear gradients. The output CSS works in all modern browsers.' });
      } else if (slug.includes('glassmorphism')) {
        faqs.push({ q: `Does ${name} work in all browsers?`, a: 'Glassmorphism uses backdrop-filter, which is supported in all current browsers (Chrome 76+, Firefox 103+, Safari 9+). For older browsers, provide a fallback background color — the tool generates standard CSS you can extend.' });
      } else if (slug.includes('neumorphism')) {
        faqs.push({ q: `Does ${name} work on dark backgrounds?`, a: 'Yes. Set the background color to match your dark theme, and the tool generates matching light and dark shadows for the neumorphism effect.' });
      } else if (slug.includes('svg') && slug.includes('optimizer')) {
        faqs.push({ q: `How much does ${name} reduce SVG file size?`, a: 'Optimization typically reduces SVG file size by 30-60% by removing comments, metadata, unused definitions, and redundant whitespace. The visual output is unchanged.' });
      } else if (slug.includes('favicon')) {
        faqs.push({ q: `What favicon sizes does ${name} generate?`, a: 'The tool generates common favicon sizes: 16x16, 32x32, 48x48, 180x180 (Apple Touch Icon), and 192x192 / 512x512 (Android). Upload a high-resolution source image for best results.' });
      } else if (slug.includes('color-palette')) {
        faqs.push({ q: `What color schemes does ${name} generate?`, a: 'The tool supports complementary, analogous, triadic, tetradic, split-complementary, and monochromatic color schemes. Enter a base color and select the scheme type to generate a harmonious palette.' });
      } else {
        faqs.push({ q: `Does the generated CSS from ${name} work in all browsers?`, a: 'The tools generate standard CSS properties supported by all modern browsers. Vendor prefixes are included where necessary for maximum compatibility.' });
      }
      faqs.push({ q: `Can I use ${name} output in my framework?`, a: 'Yes. The generated CSS works with React, Vue, Angular, Svelte, or plain HTML/CSS. Copy the CSS and paste it into your component styles, global stylesheet, or CSS-in-JS solution.' });
      faqs.push({ q: 'Can I customize the generated code further?', a: 'Yes. The CSS is standard and fully editable. Use the tool as a starting point, then refine the values in your code editor for fine-tuned results.' });
      faqs.push({ q: 'Is there a download option for generated assets?', a: slug.includes('svg') || slug.includes('favicon') || slug.includes('png') || slug.includes('placeholder') ? 'Yes, the tool can export generated assets as SVG, PNG, or ICO files for direct use in your projects.' : 'The tool primarily generates CSS code that you copy. For visual assets, a download option is available where applicable.' });
      return faqs;
    },
  },

  'Office Tools': {
    whatIs: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      let r = `${name} ${coreAction(enhancedDesc)}. The tool processes spreadsheet and document files in your browser using JavaScript libraries like SheetJS (for Excel/CSV) and client-side text processing — no Office installation or cloud upload required.`;
      if (uc) r += ` ${cap(uc)}.`;
      return r;
    },
    howTo: (name, slug, _enhancedDesc) => {
      const steps: string[] = [];
      steps.push(`Drag and drop your file into ${name}, or click to browse and select it.`);
      if (slug.includes('csv') || slug.includes('excel')) {
        if (slug.includes('merge')) {
          steps.push('Add additional CSV files to combine.');
          steps.push('Click Merge to join the files into a single dataset.');
        } else if (slug.includes('split')) {
          steps.push('Set the split criteria — by row count or column values.');
          steps.push('Click Split to divide the CSV into multiple files.');
        } else if (slug.includes('editor')) {
          steps.push('The tool displays your data in a spreadsheet-like interface.');
          steps.push('Edit cells, add or remove rows, and modify values directly.');
        } else if (slug.includes('viewer')) {
          steps.push('The tool displays your data in a clean, sortable table.');
          steps.push('Click column headers to sort and filter the data.');
        } else {
          steps.push('Configure the output format and any conversion options.');
          steps.push('Click Convert to transform the file using SheetJS.');
        }
        steps.push('Download the result to your device.');
      } else if (slug.includes('docx') || slug.includes('word')) {
        if (slug.includes('editor')) {
          steps.push('The tool displays the Word document content for editing.');
          steps.push('Make your edits directly in the editor interface.');
          steps.push('Click Download to save the modified DOCX file.');
        } else if (slug.includes('viewer')) {
          steps.push('The tool displays the Word document content in a readable format.');
          steps.push('Scroll through the document and review the content.');
        } else if (slug.includes('to-pdf') || slug.includes('word-to-pdf')) {
          steps.push('The tool converts the DOCX to PDF in your browser.');
          steps.push('Download the PDF file when conversion is complete.');
        }
      } else if (slug.includes('pdf-to')) {
        steps.push(`The tool extracts content from your PDF and converts it to the target format.`);
        steps.push('Review the converted output for accuracy.');
        steps.push('Download the converted file to your device.');
      } else if (slug.includes('ppt') || slug.includes('powerpoint')) {
        if (slug.includes('viewer')) {
          steps.push('The tool displays the presentation slides in your browser.');
          steps.push('Navigate through slides and review the content.');
        } else {
          steps.push('The tool converts the PPTX to PDF in your browser.');
          steps.push('Download the PDF file when conversion is complete.');
        }
      } else {
        steps.push('The tool parses your file and displays its contents or available options.');
        steps.push('Configure any available settings, such as output format or sheet selection.');
        steps.push('Click the action button to process or convert the file.');
        steps.push('Download the result to your device.');
      }
      return steps;
    },
    benefits: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      return [
        { title: 'No Office installation needed', description: `${name} lets you view, edit, and convert Office files without having Microsoft Office installed. The tools use JavaScript libraries like SheetJS to parse and generate documents in the browser.` },
        { title: 'Files stay on your device', description: 'All file processing is client-side. Your spreadsheets, documents, and presentations are never uploaded to a server — critical for business and confidential documents.' },
        uc
          ? { title: cap(uc.split(',')[0].split(' — ')[0]), description: `${uc}. ${name} handles this conversion without requiring desktop software.` }
          : { title: 'Cross-platform compatibility', description: 'The tools work on any device with a modern browser — Windows, Mac, Linux, Chromebook, or tablet. No software to install or update.' },
        { title: 'Free with no file limits', description: 'Process as many files as you need at no cost. File size is limited by your browser\'s memory rather than a server-side cap.' },
      ];
    },
    faqs: (name, _desc, slug, _enhancedDesc) => {
      const faqs: { q: string; a: string }[] = [];
      if (slug.includes('csv') && slug.includes('to-json')) {
        faqs.push({ q: `Does ${name} handle quoted fields and commas inside values?`, a: 'Yes. The tool properly parses CSV files with quoted fields, embedded commas, and various delimiters. The JSON output preserves the structure and data types from the original CSV.' });
      } else if (slug.includes('json') && slug.includes('to-csv')) {
        faqs.push({ q: `Does ${name} flatten nested JSON?`, a: 'Yes. The tool flattens nested JSON objects into dot-notation column headers and converts JSON arrays into spreadsheet-ready CSV rows.' });
      } else if (slug.includes('word-to-pdf') || slug.includes('docx') && slug.includes('to-pdf')) {
        faqs.push({ q: `Does ${name} preserve Word formatting?`, a: 'Basic formatting (text content, headings, lists, tables) is preserved in the PDF conversion. Complex formatting like custom fonts, embedded images, and advanced layouts may not transfer perfectly.' });
      } else if (slug.includes('pdf-to-word') || slug.includes('pdf-to-excel') || slug.includes('pdf-to-powerpoint')) {
        faqs.push({ q: `How accurate is ${name} for PDF conversion?`, a: 'The tool extracts text and layout from the PDF. For text-heavy PDFs, accuracy is high. For PDFs with complex layouts, images, or scanned content, some formatting may not transfer perfectly.' });
      } else if (slug.includes('csv-merge')) {
        faqs.push({ q: `Can ${name} merge CSVs with different columns?`, a: 'Yes. The tool can merge CSVs with matching or different column structures. Files with different columns are merged by combining all unique columns across all files.' });
      } else if (slug.includes('excel') || slug.includes('xlsx')) {
        faqs.push({ q: `Does ${name} support formulas?`, a: 'Cell values are preserved, but formula results are extracted as static values. The tools use SheetJS which reads computed values, not the formula expressions themselves.' });
      } else {
        faqs.push({ q: `Does ${name} preserve formatting in converted files?`, a: 'Basic formatting (text content, cell values, table structure) is preserved during conversion. Complex formatting like conditional formatting, charts, and macros may not transfer perfectly.' });
      }
      faqs.push({ q: 'What file formats are supported?', a: 'Supported formats depend on the specific tool. Common combinations include CSV to Excel, Excel to CSV, Word to PDF, and PowerPoint to PDF. Check the tool interface for the exact input and output formats.' });
      faqs.push({ q: 'Is there a file size limit?', a: 'Since processing is browser-based, the practical limit is your device\'s available memory. Files up to 50MB typically process without issues. Very large spreadsheets or documents may be slow.' });
      faqs.push({ q: 'Are macros and formulas preserved?', a: 'No. Macros, VBA scripts, and complex Excel formulas are not preserved during conversion. The tools extract data and basic formatting, not executable content. This is a limitation of browser-based file processing.' });
      return faqs;
    },
  },

  'Productivity': {
    whatIs: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      let r = `${name} ${coreAction(enhancedDesc)}. The tool runs entirely in your browser with data stored locally in your browser\'s localStorage or IndexedDB — your notes, timers, and tasks persist between sessions but never leave your device.`;
      if (uc) r += ` ${cap(uc)}.`;
      return r;
    },
    howTo: (name, slug, _enhancedDesc) => {
      const steps: string[] = [];
      if (slug.includes('notes')) {
        steps.push(`Open ${name} and start typing — the tool loads immediately with no setup.`);
        steps.push('Your notes are saved automatically to your browser\'s local storage as you type.');
        steps.push('When you return to the tool on the same browser, your notes are restored automatically.');
      } else if (slug.includes('to-do') || slug.includes('todo')) {
        steps.push(`Open ${name} and add tasks by typing and pressing Enter.`);
        steps.push('Mark tasks as complete, delete tasks, or reorder them as needed.');
        steps.push('Your task list persists automatically — it is restored when you return.');
      } else if (slug.includes('pomodoro')) {
        steps.push(`Open ${name} and set your work and break durations if you want custom intervals.`);
        steps.push('Click Start to begin a focus session. The timer counts down your work period.');
        steps.push('When the work session ends, the timer switches to your break period automatically.');
      } else if (slug.includes('countdown')) {
        steps.push(`Set your target date and time in ${name}.`);
        steps.push('The tool displays the days, hours, minutes, and seconds remaining until your target.');
        steps.push('The countdown updates in real-time and persists when you return.');
      } else if (slug.includes('stopwatch')) {
        steps.push(`Click Start in ${name} to begin timing.`);
        steps.push('Click Lap to record split times, and Stop to pause.');
        steps.push('Click Reset to clear all laps and start over.');
      } else if (slug.includes('calendar')) {
        steps.push(`Open ${name} to view the current month.`);
        steps.push('Navigate to previous or next months using the navigation controls.');
        steps.push('Click on any date to see details or plan ahead.');
      } else if (slug.includes('meeting')) {
        steps.push(`Add the cities or timezones for your meeting participants in ${name}.`);
        steps.push('The tool displays each participant\'s local time side by side.');
        steps.push('Find a time that works for everyone and note it down.');
      } else if (slug.includes('timezone')) {
        steps.push(`Enter the time and select the source timezone in ${name}.`);
        steps.push('Select the target timezone to convert to.');
        steps.push('The converted time appears instantly. Compare multiple timezones side by side.');
      } else {
        steps.push(`Open ${name} — the tool starts immediately without any setup or configuration.`);
        steps.push('Use the tool\'s interface to perform the operation.');
        steps.push('Your data is automatically saved to your browser\'s local storage as you work.');
      }
      return steps;
    },
    benefits: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      return [
        { title: 'Data persists between sessions', description: `${name} saves your data to your browser\'s local storage. You can close the tab and return later to find your data intact — no account needed.` },
        { title: 'No account or sign-up', description: 'Productivity tools that require accounts create friction. These tools work immediately with zero setup, storing everything locally.' },
        uc
          ? { title: cap(uc.split(',')[0].split(' — ')[0]), description: `${uc}. ${name} provides this capability without any software installation.` }
          : { title: 'Distraction-free interface', description: 'The tools are designed for focus — clean interfaces with no unnecessary features. A timer is a timer, a notepad is a notepad.' },
        { title: 'Works offline', description: 'Once loaded, productivity tools function without an internet connection. Your data stays in your browser and is accessible anywhere on the same device.' },
      ];
    },
    faqs: (name, _desc, slug, _enhancedDesc) => {
      const faqs: { q: string; a: string }[] = [];
      if (slug.includes('notes')) {
        faqs.push({ q: `How much text can ${name} store?`, a: 'Notes are stored in your browser\'s localStorage, which typically allows 5-10MB per domain. This is enough for thousands of notes. If you hit the limit, export older notes to free space.' });
      } else if (slug.includes('pomodoro')) {
        faqs.push({ q: `Can I customize the work and break durations in ${name}?`, a: 'Yes. You can set custom work and break intervals. The default is 25 minutes of work followed by a 5-minute break, but you can adjust both to match your workflow.' });
      } else if (slug.includes('timezone') || slug.includes('meeting')) {
        faqs.push({ q: `Does ${name} account for daylight saving time?`, a: 'Yes. The tool uses the browser\'s Intl API, which automatically handles DST transitions for all timezones. Times adjust correctly when DST starts or ends.' });
      } else if (slug.includes('countdown')) {
        faqs.push({ q: `Does ${name} send notifications when the countdown ends?`, a: 'The tool displays a visual alert when the countdown reaches zero. For audio notifications, keep the tab open. The tool does not send push notifications to your device.' });
      } else if (slug.includes('stopwatch')) {
        faqs.push({ q: `How precise is ${name}?`, a: 'The stopwatch uses the browser\'s high-resolution timer, accurate to milliseconds. Lap times are recorded with the same precision.' });
      } else {
        faqs.push({ q: `Will ${name} sync across my devices?`, a: 'No. Data is stored in your browser\'s local storage on the specific device you are using. It does not sync to other devices or browsers. For cross-device sync, use a dedicated app with cloud storage.' });
      }
      faqs.push({ q: 'What happens if I clear my browser data?', a: 'Clearing your browser\'s cache, cookies, or site data will erase your saved notes, tasks, and timer settings. Export important data before clearing browser data.' });
      faqs.push({ q: 'Is my data sent to a server?', a: 'No. All productivity tool data is stored locally in your browser. Nothing is transmitted to or stored on any server.' });
      faqs.push({ q: 'Can I export my data?', a: 'Some tools support export (e.g., notes can be downloaded as text files). For tools without explicit export, you can copy and paste your data to save it externally.' });
      return faqs;
    },
  },

  'Security Tools': {
    whatIs: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      let r = `${name} ${coreAction(enhancedDesc)}. The tool uses the Web Crypto API (crypto.getRandomValues) or standard cryptographic algorithms implemented in JavaScript to generate or hash data securely in your browser.`;
      if (uc) r += ` ${cap(uc)}.`;
      return r;
    },
    howTo: (name, slug, _enhancedDesc) => {
      const steps: string[] = [];
      if (slug.includes('password-generator') || (slug.includes('password') && !slug.includes('decrypt') && !slug.includes('encrypt'))) {
        steps.push(`Open ${name} and set your password requirements — length, character types (uppercase, lowercase, numbers, symbols).`);
        steps.push('Click Generate to create a secure password using crypto.getRandomValues.');
        steps.push('Copy the generated password and use it for your account or application.');
      } else if (slug.includes('password-strength')) {
        steps.push(`Enter a password into ${name} to test its strength.`);
        steps.push('The tool analyzes length, character variety, and common patterns in real-time.');
        steps.push('Review the strength score and recommendations for improvement.');
      } else if (slug.includes('uuid')) {
        steps.push(`Set the number of UUIDs you want to generate (up to 1000) in ${name}.`);
        steps.push('Click Generate to create UUID v4 identifiers using crypto.getRandomValues.');
        steps.push('Copy the generated UUIDs for use in your database or application.');
      } else if (slug.includes('username')) {
        steps.push(`Configure username length and style options in ${name}.`);
        steps.push('Click Generate to create random usernames.');
        steps.push('Copy the generated username for your account or profile.');
      } else if (slug.includes('bcrypt')) {
        steps.push(`Enter the password you want to hash and set the number of bcrypt rounds (4-12) in ${name}.`);
        steps.push('Click Generate to compute the bcrypt hash.');
        steps.push('Copy the hash for storage in your database or authentication system.');
      } else if (slug.includes('sha') || slug.includes('md5')) {
        steps.push(`Enter the text you want to hash into ${name}.`);
        steps.push('The tool computes the hash instantly using the selected algorithm.');
        steps.push('Copy the hash value for data verification or integrity checking.');
      } else if (slug.includes('hash-compare')) {
        steps.push(`Enter two hash values into ${name}.`);
        steps.push('The tool compares them instantly and shows whether they match.');
        steps.push('Use this to verify file integrity or detect changes.');
      } else if (slug.includes('encrypt') || slug.includes('decrypt')) {
        steps.push(slug.includes('encrypt') ? `Enter the text you want to encrypt and set a password in ${name}.` : `Enter the encrypted text and the password in ${name}.`);
        steps.push(slug.includes('encrypt') ? 'Click Encrypt to produce AES-GCM 256-bit encrypted output.' : 'Click Decrypt to recover the original text.');
        steps.push('Copy the result for secure sharing or storage.');
      } else if (slug.includes('otp')) {
        steps.push(`Enter the shared secret key in ${name}.`);
        steps.push('The tool generates TOTP or HOTP one-time passwords using the standard algorithm.');
        steps.push('Copy the OTP code for 2FA testing or verification.');
      } else if (slug.includes('random-number') || slug.includes('random-pin')) {
        steps.push(`Set the range and count for ${name}.`);
        steps.push('Click Generate to produce random numbers or PINs using crypto.getRandomValues.');
        steps.push('Copy the generated values.');
      } else {
        steps.push(`Open ${name} and configure any available settings — such as hash type, output format, or number of values.`);
        steps.push('Enter input text or click generate.');
        steps.push('Copy the generated value from the output area.');
      }
      return steps;
    },
    benefits: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      return [
        { title: 'Cryptographically secure generation', description: `${name} uses crypto.getRandomValues for random value generation — the same cryptographically secure random number generator used by HTTPS connections, not Math.random which is predictable.` },
        { title: 'Hashes computed locally', description: 'All hash functions and cryptographic operations run in your browser. Your input text, passwords, and generated values are never transmitted to a server.' },
        uc
          ? { title: cap(uc.split(',')[0].split(' — ')[0]), description: `${uc}. ${name} provides this without installing OpenSSL or writing scripts.` }
          : { title: 'No API keys or configuration', description: 'Security tools work immediately without installing OpenSSL, configuring GPG, or writing scripts. Useful for developers and non-technical users alike.' },
        { title: 'Supports common algorithms', description: 'MD5, SHA-1, SHA-256, bcrypt, and AES-GCM are all available. Use the appropriate tool for your specific security requirement.' },
      ];
    },
    faqs: (name, _desc, slug, _enhancedDesc) => {
      const faqs: { q: string; a: string }[] = [];
      if (slug.includes('password-generator') || (slug.includes('password') && !slug.includes('decrypt') && !slug.includes('encrypt') && !slug.includes('strength'))) {
        faqs.push({ q: `Is the password from ${name} truly random?`, a: 'Yes. The tool uses window.crypto.getRandomValues(), which provides cryptographically secure random numbers. This is the same API used for generating TLS keys and is far more secure than Math.random().' });
      } else if (slug.includes('bcrypt')) {
        faqs.push({ q: `Is it safe to hash passwords in the browser with ${name}?`, a: 'Yes. The hash is computed using a JavaScript implementation of bcrypt running in your browser. The input never leaves your device, so it is as safe as hashing on a server — and more private.' });
      } else if (slug.includes('uuid')) {
        faqs.push({ q: `What UUID version does ${name} generate?`, a: 'The tool generates UUID v4 (random) identifiers, as specified in RFC 4122. These are suitable for database primary keys, session IDs, and distributed system identifiers.' });
      } else if (slug.includes('encrypt')) {
        faqs.push({ q: `What encryption does ${name} use?`, a: 'The tool uses AES-GCM 256-bit encryption via the Web Crypto API. This is the same encryption standard used by banks and government agencies. The password you set is used to derive the encryption key.' });
      } else if (slug.includes('otp')) {
        faqs.push({ q: `What OTP algorithms does ${name} support?`, a: 'The tool supports both TOTP (time-based, RFC 6238) and HOTP (counter-based, RFC 4226) algorithms. These are the same algorithms used by Google Authenticator and other 2FA apps.' });
      } else if (slug.includes('sha') || slug.includes('md5')) {
        faqs.push({ q: `Which hash algorithm should I use?`, a: slug.includes('sha256') ? 'SHA-256 is suitable for data integrity, checksums, and digital signatures. It is part of the SHA-2 family and is considered secure for all current applications.' : slug.includes('sha1') ? 'SHA-1 is deprecated for security-critical applications but remains useful for non-security checksums like Git commit hashes. Use SHA-256 for security purposes.' : 'MD5 is deprecated for security use due to known collision vulnerabilities. Use it only for non-security checksums. For security, use SHA-256 or bcrypt.' });
      } else {
        faqs.push({ q: `Is ${name} truly random?`, a: 'Yes. Tools that generate random values use window.crypto.getRandomValues(), which provides cryptographically secure random numbers. This is far more secure than Math.random().' });
      }
      if (slug.includes('bcrypt') || slug.includes('hash')) {
        faqs.push({ q: 'Which hash algorithm should I use for passwords?', a: 'Bcrypt is designed specifically for password hashing — it includes a salt and is intentionally slow to resist brute-force attacks. For checksums and data integrity, use SHA-256. Avoid MD5 and SHA-1 for security-critical applications.' });
      } else {
        faqs.push({ q: 'Are these tools suitable for production security?', a: 'The tools use correct implementations of standard algorithms. For production systems, use server-side cryptography libraries and follow OWASP guidelines. These browser tools are ideal for quick verification, testing, and one-off tasks.' });
      }
      faqs.push({ q: 'Is my input stored or logged?', a: 'No. All processing is client-side. Your input text, passwords, and generated values are never transmitted to or stored on any server.' });
      faqs.push({ q: `Can I use ${name} for commercial applications?`, a: 'Yes. The generated values are yours to use in any application. No attribution or license is required.' });
      return faqs;
    },
  },

  'Web Utilities': {
    whatIs: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      let r = `${name} ${coreAction(enhancedDesc)}. The tool retrieves or displays technical information about web resources, network configurations, or browser capabilities using standard browser APIs and DNS lookups.`;
      if (uc) r += ` ${cap(uc)}.`;
      return r;
    },
    howTo: (name, slug, _enhancedDesc) => {
      const steps: string[] = [];
      if (slug.includes('dns')) {
        steps.push(`Enter the domain name you want to look up in ${name}.`);
        steps.push('Click Look Up to query DNS records via DNS-over-HTTPS.');
        steps.push('Review the A, AAAA, MX, CNAME, TXT, and NS records returned.');
      } else if (slug.includes('ssl')) {
        steps.push(`Enter the website URL you want to check in ${name}.`);
        steps.push('Click Check to retrieve the SSL certificate details.');
        steps.push('Review the issuer, validity period, expiration date, and certificate chain.');
      } else if (slug.includes('redirect')) {
        steps.push(`Enter the URL you want to trace in ${name}.`);
        steps.push('Click Check to follow the redirect chain.');
        steps.push('Review each hop with its HTTP status code (301, 302, 307, etc.).');
      } else if (slug.includes('user-agent')) {
        steps.push(`Paste a user agent string into ${name}, or view your own automatically.`);
        steps.push('The tool parses the string and extracts browser, OS, and device info.');
        steps.push('Review the parsed components in the results panel.');
      } else if (slug.includes('browser-info')) {
        steps.push(`Open ${name} to view your browser information automatically.`);
        steps.push('Review the browser name, version, operating system, screen resolution, and capabilities.');
        steps.push('Copy any values you need for troubleshooting or support.');
      } else if (slug.includes('ip-address')) {
        steps.push(`Open ${name} to view your IP address and network details.`);
        steps.push('Review your public IP, location, and connection type.');
        steps.push('Copy the IP address if needed for configuration or support.');
      } else if (slug.includes('http-header')) {
        steps.push(`Enter the URL you want to inspect in ${name}.`);
        steps.push('Click View to fetch the HTTP response headers.');
        steps.push('Review content type, cache settings, security headers, and other metadata.');
      } else if (slug.includes('cookie')) {
        steps.push(`Open ${name} to view cookies stored by your browser.`);
        steps.push('Review cookie names, values, domains, and expiration dates.');
        steps.push('Use the information for debugging or privacy auditing.');
      } else if (slug.includes('website-screenshot')) {
        steps.push(`Enter the website URL and set the viewport size in ${name}.`);
        steps.push('Choose full-page or viewport-only capture.');
        steps.push('Click Capture to take the screenshot and download it.');
      } else if (slug.includes('url-preview') || slug.includes('open-graph-preview')) {
        steps.push(`Enter the URL you want to preview in ${name}.`);
        steps.push('The tool fetches and displays the page\'s meta tags, Open Graph tags, and Twitter Card tags.');
        steps.push('Review how the link will appear when shared on social media.');
      } else {
        steps.push(`Enter the URL, domain, or IP address into the ${name} input field.`);
        steps.push('Click the action button to perform the lookup, check, or analysis.');
        steps.push('Review the results and copy any values you need.');
      }
      return steps;
    },
    benefits: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      return [
        { title: 'Quick network diagnostics', description: `${name} provides instant results without installing dig, openssl, or network utilities. DNS lookups, SSL checks, and IP information are essential for troubleshooting web issues.` },
        { title: 'No command-line tools needed', description: 'Network and web diagnostics typically require CLI tools like dig, curl, or openssl. These browser-based tools provide equivalent information with a clean interface.' },
        uc
          ? { title: cap(uc.split(',')[0].split(' — ')[0]), description: `${uc}. ${name} presents this information in a readable format without requiring networking expertise.` }
          : { title: 'Browser capability detection', description: 'Some tools display your browser\'s capabilities, user agent, and cookies — useful for debugging cross-browser issues and verifying what data websites can see about you.' },
        { title: 'Useful for developers and non-technical users', description: 'The tools present technical information in a readable format, making web diagnostics accessible without networking expertise.' },
      ];
    },
    faqs: (name, _desc, slug, _enhancedDesc) => {
      const faqs: { q: string; a: string }[] = [];
      if (slug.includes('dns')) {
        faqs.push({ q: `What DNS record types does ${name} support?`, a: 'The tool queries A (IPv4 address), AAAA (IPv6 address), MX (mail exchange), CNAME (canonical name), TXT (text records), and NS (name servers). Results are fetched via DNS-over-HTTPS.' });
      } else if (slug.includes('ssl')) {
        faqs.push({ q: `Why might ${name} show different results than my browser?`, a: 'The tool checks the SSL certificate chain independently. Your browser may have cached results or use a different trust store. If results differ, clear your browser cache and recheck.' });
      } else if (slug.includes('user-agent')) {
        faqs.push({ q: `What information does ${name} extract?`, a: 'The tool parses the user agent string to extract browser name and version, operating system, device type (mobile/desktop), and rendering engine. User agent strings can be spoofed, so treat the results as hints, not facts.' });
      } else if (slug.includes('website-screenshot')) {
        faqs.push({ q: `Can ${name} capture pages that require login?`, a: 'No. The tool captures publicly accessible pages only. Password-protected pages or pages behind authentication cannot be captured since the tool does not have your login session.' });
      } else if (slug.includes('cookie')) {
        faqs.push({ q: `Can ${name} view cookies from other websites?`, a: 'No. Browsers restrict cookie access to the same origin. The tool can only view cookies set by the current domain, not cookies from other sites you have visited.' });
      } else {
        faqs.push({ q: `Does ${name} store the URLs I check?`, a: 'No. The tool performs lookups or checks in real-time and does not store or log the URLs, domains, or IP addresses you enter.' });
      }
      faqs.push({ q: 'Can I use these tools for security auditing?', a: 'These tools provide informational results — DNS records, SSL certificate details, and HTTP headers. They are useful for basic security checks but are not a substitute for professional security scanning tools.' });
      if (slug.includes('ssl')) {
        faqs.push({ q: 'Why might an SSL check show different results than my browser?', a: 'The tool checks the SSL certificate chain independently. Your browser may have cached results or use a different trust store. If results differ, clear your browser cache and recheck.' });
      } else {
        faqs.push({ q: 'Are the lookups done from my location?', a: 'DNS and IP lookups are performed from the tool\'s server or via DNS-over-HTTPS resolvers, not from your device. Results may differ from your local DNS resolver depending on geographic routing and CDN configurations.' });
      }
      faqs.push({ q: `Is ${name} free to use?`, a: 'Yes. The tool is completely free with no registration, no API limits, and no usage caps.' });
      return faqs;
    },
  },

  'QR & Barcode Tools': {
    whatIs: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      let r = `${name} ${coreAction(enhancedDesc)}. The tool generates or scans QR codes and barcodes using JavaScript libraries (qrcode for generation, jsQR for scanning) — all processing happens in your browser with no server round-trip.`;
      if (uc) r += ` ${cap(uc)}.`;
      return r;
    },
    howTo: (name, slug, _enhancedDesc) => {
      const steps: string[] = [];
      if (slug.includes('scanner')) {
        steps.push(`Open ${name} and allow camera access when prompted.`);
        steps.push('Point your camera at a QR code, or upload an image containing a QR code.');
        steps.push('The tool decodes the QR code using the jsQR library and displays the content.');
      } else if (slug.includes('label')) {
        steps.push(`Enter the data for each QR code and configure label sheet settings in ${name}.`);
        steps.push('Set the label size, number per sheet, and QR code options.');
        steps.push('Click Generate to create a printable sheet of QR code labels.');
      } else {
        steps.push(`Open ${name} and enter the data you want to encode — URL, text, phone number, WiFi, or other content.`);
        steps.push('Configure available options, such as size, error correction level, colors, or barcode format.');
        steps.push('Click Generate to create the QR code or barcode using the qrcode library.');
        steps.push('Download the generated code as an image file (PNG, SVG, or JPG).');
      }
      return steps;
    },
    benefits: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      return [
        { title: 'No server-side generation', description: `${name} generates QR codes and barcodes entirely in your browser using the qrcode JavaScript library. Your data is never sent to a server — important for QR codes containing sensitive URLs or contact information.` },
        { title: 'High-resolution SVG output', description: 'Download QR codes as SVG for print-quality output at any size. SVG QR codes stay sharp when scaled, unlike PNG which becomes pixelated when enlarged.' },
        uc
          ? { title: cap(uc.split(',')[0].split(' — ')[0]), description: `${uc}. ${name} handles this without requiring dedicated labeling software.` }
          : { title: 'Error correction support', description: 'QR codes support error correction levels (L, M, Q, H) that allow the code to be read even if partially damaged or obscured by a logo. Higher levels provide more resilience.' },
        { title: 'No watermark or sign-up', description: 'Generated codes are clean and free of watermarks. Use them for business cards, product labels, marketing materials, or any purpose without attribution.' },
      ];
    },
    faqs: (name, _desc, slug, _enhancedDesc) => {
      const faqs: { q: string; a: string }[] = [];
      if (slug.includes('scanner')) {
        faqs.push({ q: `Can ${name} scan QR codes from an image file?`, a: 'Yes. The scanner accepts image uploads and decodes QR codes from image files using the jsQR library. This is useful for scanning codes from screenshots or photos without a camera.' });
      } else if (slug.includes('label')) {
        faqs.push({ q: `What label sizes does ${name} support?`, a: 'The tool supports common label sheet formats including Avery sizes. You can also set custom label dimensions and the number of labels per sheet.' });
      } else {
        faqs.push({ q: `Can ${name} generate codes for WiFi passwords?`, a: 'Yes. The QR Code Generator supports WiFi network QR codes that let guests connect by scanning. Enter the SSID, password, and encryption type, and the generated code connects scanners automatically.' });
      }
      faqs.push({ q: 'What is QR code error correction?', a: 'Error correction allows a QR code to be scanned correctly even if part of it is damaged or covered. There are four levels: L (7% recovery), M (15%), Q (25%), and H (30%). Higher levels make denser codes but are more resilient. Use H if you plan to overlay a logo.' });
      faqs.push({ q: 'What is the minimum size for a printable QR code?', a: 'For reliable scanning, print QR codes at least 2x2 cm (0.8x0.8 inches). Larger codes scan more easily, especially from a distance. Always test with multiple devices before printing at scale.' });
      faqs.push({ q: `What formats can I download from ${name}?`, a: 'QR codes can be downloaded as PNG, SVG, or JPG. SVG is recommended for printing since it scales without quality loss. PNG is best for digital use.' });
      return faqs;
    },
  },

  'Social Media Tools': {
    whatIs: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      let r = `${name} ${coreAction(enhancedDesc)}. The tool generates social media meta tags, previews, or content optimized for specific platforms using browser-based text processing and HTML generation.`;
      if (uc) r += ` ${cap(uc)}.`;
      return r;
    },
    howTo: (name, _slug, _enhancedDesc) => {
      return [
        `Enter your page URL, title, description, and image URL into the ${name} form.`,
        'Configure any platform-specific options, such as card type for Twitter or image dimensions for Open Graph.',
        'Click Generate to produce the meta tags or preview.',
        'Copy the generated HTML tags and paste them into your page\'s head section.',
      ];
    },
    benefits: (name, _desc, enhancedDesc) => {
      const uc = useCasePhrase(enhancedDesc);
      return [
        { title: 'Platform-accurate meta tags', description: `${name} generates tags that follow each platform\'s current specifications — Open Graph for Facebook/LinkedIn, Twitter Card for X/Twitter, and platform-specific image dimensions.` },
        { title: 'Visual preview', description: 'Some tools show a preview of how your link will appear in social feeds, helping you optimize the title, description, and image before publishing.' },
        uc
          ? { title: cap(uc.split(',')[0].split(' — ')[0]), description: `${uc}. ${name} makes this process straightforward with a form-based interface.` }
          : { title: 'No social media management tool needed', description: 'These tools generate the tags you need for free, without subscribing to Hootsuite, Buffer, or similar platforms just for meta tag creation.' },
        { title: 'Works with any CMS', description: 'Copy-paste the generated HTML into WordPress, Shopify, Next.js, or any platform that lets you edit the head section of your pages.' },
      ];
    },
    faqs: (name, _desc, _slug, _enhancedDesc) => {
      return [
        { q: 'What are Open Graph tags?', a: 'Open Graph (og:) meta tags control how your page appears when shared on Facebook, LinkedIn, and other platforms. Key tags: og:title, og:description, og:image, and og:url. Without these, platforms use generic previews.' },
        { q: `Why doesn\'t my ${name} preview match what I see on the platform?`, a: 'Social platforms cache link previews. After updating your meta tags, use Facebook\'s Sharing Debugger or Twitter\'s Card Validator to force a refresh. Changes may take a few minutes to appear.' },
        { q: 'Do I need both Open Graph and Twitter Card tags?', a: 'Twitter falls back to Open Graph tags if Twitter Card tags are missing, but adding explicit Twitter Card tags gives you more control over how links appear on X/Twitter specifically.' },
        { q: 'What image size should I use for social previews?', a: 'Use images at least 1200x630 pixels for Open Graph and 1200x600 for Twitter summary_large_image cards. JPG or PNG formats are universally supported. Keep file size under 1MB for fast loading.' },
      ];
    },
  },
};

// Tools that don't fit neatly into a category profile get a fallback generator
// that uses the tool's own enhanced description to produce unique content.
function generateFallbackContent(name: string, desc: string, slug: string, enhancedDesc: string): ContentEntry {
  const action = coreAction(enhancedDesc);
  const uc = useCasePhrase(enhancedDesc);
  return {
    whatIs: `${name} ${action}. The tool runs entirely in your browser with no server-side processing, meaning your data stays on your device throughout the operation.${uc ? ` ${cap(uc)}.` : ''}`,
    howTo: [
      `Open ${name} and enter or upload your input as prompted by the tool interface.`,
      `Configure any available settings specific to ${action}.`,
      'Click the action button to process your input.',
      'Review the output and download or copy the result as needed.',
    ],
    benefits: [
      { title: 'Browser-based, no installation', description: `${name} runs in any modern browser without installing software or creating an account. Open the page and start using it immediately.` },
      { title: 'Private and secure', description: 'All processing happens locally in your browser. Your input data is never transmitted to or stored on any server.' },
      uc
        ? { title: cap(uc.split(',')[0].split(' — ')[0]), description: `${uc}. ${name} provides this capability directly in the browser.` }
        : { title: 'Free with no limits', description: 'Use the tool as many times as you need at no cost. No file size limits, no usage caps, no subscription.' },
      { title: 'Cross-platform', description: 'The tool works on desktop, tablet, and mobile browsers. Access it from any device with a modern browser.' },
    ],
    faqs: [
      { q: `Is ${name} free to use?`, a: `Yes. ${name} is completely free with no registration, no watermarks, and no usage limits.` },
      { q: 'Does the tool upload my data?', a: 'No. All processing happens in your browser. Your data is never sent to a server.' },
      { q: `Does ${name} work on mobile?`, a: 'Yes. The tool is fully responsive and works on any modern mobile browser.' },
      { q: 'Do I need to install any software?', a: `No. ${name} runs entirely in your browser with no downloads or plugins required.` },
    ],
  };
}

export function generateToolSeoContent(slug: string): ContentEntry {
  const handCrafted = toolSeoContent[slug];
  if (handCrafted) return handCrafted;

  const tool = getToolData(slug);
  if (!tool) return generateFallbackContent(slug, slug, slug, slug);

  const enhancedDesc = getEnhancedDescription(tool);
  const profile = categoryProfiles[tool.category];
  if (profile) {
    return {
      whatIs: profile.whatIs(tool.name, tool.description, enhancedDesc),
      howTo: profile.howTo(tool.name, slug, enhancedDesc),
      benefits: profile.benefits(tool.name, tool.description, enhancedDesc),
      faqs: profile.faqs(tool.name, tool.description, slug, enhancedDesc),
    };
  }

  return generateFallbackContent(tool.name, tool.description, slug, enhancedDesc);
}

// Detect boilerplate content — the generic howTo steps that 162+ pages share
const BOILERPLATE_MARKERS = [
  'Upload your file or enter your input',
  'Adjust any settings if needed',
  'Click the action button to process',
  'Download or copy the result',
  'Upload or enter your input data',
  'Download or copy your result',
  'Enter your topic or text in the input field',
  'Click the Generate button',
  'Review the generated content in the result area',
  'Copy the result to your clipboard with one click',
];

export function isBoilerplateSeo(seo: ToolSeoContent): boolean {
  if (!seo.howTo || seo.howTo.length === 0) return true;
  return seo.howTo.some((step) =>
    BOILERPLATE_MARKERS.some((marker) => step.includes(marker))
  );
}
