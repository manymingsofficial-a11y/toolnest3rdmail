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
