// Template-based generation logic for all AI tools.
// No paid APIs — everything uses predefined patterns and browser-side logic.

export type GenConfig = {
  slug: string;
  label: string;
  placeholder: string;
  example: string;
  inputType: 'text' | 'textarea';
  showCharCounter: boolean;
  generate: (input: string) => string;
};

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function titleCase(s: string): string {
  return s.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
}

// ── Content & Writing ──────────────────────────────────────────

const blogTitleTemplates = [
  (t: string) => `${titleCase(t)}: A Complete Guide for ${new Date().getFullYear()}`,
  (t: string) => `How to Master ${t} in 7 Simple Steps`,
  (t: string) => `The Ultimate Guide to ${t} (Everything You Need to Know)`,
  (t: string) => `${titleCase(t)}: ${pick(['10 Proven Tips', '7 Secrets', '5 Mistakes to Avoid', '9 Expert Strategies'], hashStr(t))}`,
  (t: string) => `Why ${t} Matters More Than You Think`,
  (t: string) => `The Beginner's Guide to ${t}`,
  (t: string) => `${titleCase(t)} Explained: What It Is and How It Works`,
  (t: string) => `Everything You Need to Know About ${t}`,
  (t: string) => `${pick(['Mastering', 'Understanding', 'Navigating', 'Demystifying'], hashStr(t))} ${t}: A Step-by-Step Approach`,
  (t: string) => `The ${new Date().getFullYear()} Guide to ${t}: Trends, Tips, and Tools`,
];

const articleIdeas = [
  (t: string) => `The future of ${t}: 5 trends reshaping the industry`,
  (t: string) => `Common ${t} mistakes and how to avoid them`,
  (t: string) => `How to get started with ${t}: A beginner's roadmap`,
  (t: string) => `${titleCase(t)} vs. alternatives: A comprehensive comparison`,
  (t: string) => `The hidden costs of ignoring ${t}`,
  (t: string) => `How top professionals approach ${t} differently`,
  (t: string) => `${titleCase(t)} for small businesses: A practical guide`,
  (t: string) => `The science behind why ${t} works`,
  (t: string) => `Case study: How one company transformed with ${t}`,
  (t: string) => `${titleCase(t)} myths debunked: What the data actually says`,
];

const outlineSections = [
  'Introduction', 'What Is {TOPIC}?', 'Why {TOPIC} Matters',
  'Key Concepts and Terminology', 'Getting Started with {TOPIC}',
  'Best Practices', 'Common Mistakes to Avoid', 'Tools and Resources',
  'Advanced Strategies', 'Real-World Examples', 'Future Trends',
  'Frequently Asked Questions', 'Conclusion', 'Key Takeaways',
];

const simplifyReplacements: [RegExp, string][] = [
  [/\butilize\b/gi, 'use'],
  [/\bcommence\b/gi, 'start'],
  [/\bterminate\b/gi, 'end'],
  [/\bdemonstrate\b/gi, 'show'],
  [/\bsubsequently\b/gi, 'then'],
  [/\bapproximately\b/gi, 'about'],
  [/\bnumerous\b/gi, 'many'],
  [/\bfacilitate\b/gi, 'help'],
  [/\bendeavor\b/gi, 'try'],
  [/\bprior to\b/gi, 'before'],
  [/\bin order to\b/gi, 'to'],
  [/\bdue to the fact that\b/gi, 'because'],
  [/\bin the event that\b/gi, 'if'],
  [/\bwith regard to\b/gi, 'about'],
  [/\bas a matter of fact\b/gi, 'in fact'],
];

const humanizeReplacements: [RegExp, string][] = [
  [/\bmoreover\b/gi, "what's more"],
  [/\bfurthermore\b/gi, 'also'],
  [/\bnevertheless\b/gi, 'still'],
  [/\bnotwithstanding\b/gi, 'even so'],
  [/\bhenceforth\b/gi, 'from now on'],
  [/\bthus\b/gi, 'so'],
  [/\btherefore\b/gi, 'so'],
  [/\badditionally\b/gi, 'plus'],
  [/\bconsequently\b/gi, 'as a result'],
  [/\baccordingly\b/gi, 'so'],
];

const hashtagCategories: Record<string, string[]> = {
  default: ['#trending', '#viral', '#explore', '#instagood', '#content', '#daily', '#inspiration', '#community'],
  business: ['#business', '#entrepreneur', '#startup', '#marketing', '#growth', '#success', '#leadership', '#networking'],
  food: ['#food', '#foodie', '#recipe', '#cooking', '#delicious', '#foodporn', '#homemade', '#tasty'],
  travel: ['#travel', '#wanderlust', '#adventure', '#explore', '#vacation', '#travelgram', '#nature', '#sunset'],
  fitness: ['#fitness', '#workout', '#gym', '#health', '#motivation', '#training', '#fitspo', '#wellness'],
  fashion: ['#fashion', '#style', '#ootd', '#trend', '#aesthetic', '#outfit', '#lookbook', '#chic'],
  tech: ['#tech', '#technology', '#innovation', '#ai', '#coding', '#developer', '#programming', '#gadgets'],
};

// ── Generation configs ──────────────────────────────────────────

export const aiConfigs: Record<string, GenConfig> = {
  // Content & Writing
  'ai-blog-title-generator': {
    slug: 'ai-blog-title-generator',
    label: 'Topic / Keyword',
    placeholder: 'e.g. digital marketing, healthy eating, productivity tips',
    example: 'digital marketing',
    inputType: 'text',
    showCharCounter: false,
    generate: (input) => blogTitleTemplates.map((t) => t(input)).join('\n'),
  },
  'ai-blog-outline-generator': {
    slug: 'ai-blog-outline-generator',
    label: 'Blog Topic',
    placeholder: 'e.g. how to start a podcast',
    example: 'how to start a podcast',
    inputType: 'text',
    showCharCounter: false,
    generate: (input) => {
      const sections = outlineSections.slice(0, 8);
      return sections.map((s, i) => `${i + 1}. ${s.replace(/\{TOPIC\}/g, titleCase(input))}`).join('\n');
    },
  },
  'ai-article-idea-generator': {
    slug: 'ai-article-idea-generator',
    label: 'Topic / Niche',
    placeholder: 'e.g. artificial intelligence, personal finance',
    example: 'artificial intelligence',
    inputType: 'text',
    showCharCounter: false,
    generate: (input) => articleIdeas.map((t) => `• ${t(input)}`).join('\n'),
  },
  'ai-paragraph-generator': {
    slug: 'ai-paragraph-generator',
    label: 'Topic',
    placeholder: 'e.g. the importance of sleep',
    example: 'the importance of sleep',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const seed = hashStr(input);
      const intros = [
        `${titleCase(input)} is a topic that deserves more attention than it often receives.`,
        `When it comes to ${input}, there are several key factors to consider.`,
        `Understanding ${input} can transform the way you approach everyday challenges.`,
        `In today's fast-paced world, ${input} has become increasingly relevant.`,
      ];
      const bodies = [
        `Research shows that people who prioritize ${input} tend to see better outcomes in both their personal and professional lives. The key is to develop consistent habits and remain patient as results compound over time.`,
        `Many experts agree that ${input} requires a strategic approach. By breaking down the process into manageable steps, anyone can make meaningful progress without feeling overwhelmed.`,
        `The impact of ${input} extends far beyond the obvious. From improving productivity to enhancing overall well-being, the benefits are well-documented and supported by growing evidence.`,
      ];
      const conclusions = [
        `Ultimately, ${input} is not a one-time effort but an ongoing journey. Start small, stay consistent, and the results will follow.`,
        `Whether you're just getting started or looking to deepen your knowledge, ${input} offers something valuable for everyone willing to put in the effort.`,
        `By making ${input} a priority, you set yourself up for long-term success and meaningful growth.`,
      ];
      return `${pick(intros, seed)} ${pick(bodies, seed)} ${pick(conclusions, seed)}`;
    },
  },
  'ai-sentence-rewriter': {
    slug: 'ai-sentence-rewriter',
    label: 'Sentence to Rewrite',
    placeholder: 'Paste a sentence you want to rewrite...',
    example: 'The company implemented a new strategy to improve productivity.',
    inputType: 'textarea',
    showCharCounter: true,
    generate: (input) => {
      const sentences = input.split('. ').filter(Boolean);
      const rewritten = sentences.map((s) => {
        const seed = hashStr(s);
        const patterns = [
          (x: string) => `It is worth noting that ${x.charAt(0).toLowerCase()}${x.slice(1)}`,
          (x: string) => `Interestingly, ${x.charAt(0).toLowerCase()}${x.slice(1)}`,
          (x: string) => `One could argue that ${x.charAt(0).toLowerCase()}${x.slice(1)}`,
          (x: string) => `${x} This has significant implications.`,
          (x: string) => `From a different perspective, ${x.charAt(0).toLowerCase()}${x.slice(1)}`,
        ];
        return pick(patterns, seed)(s.trim());
      });
      return rewritten.join('. ') + '.';
    },
  },
  'ai-grammar-improver': {
    slug: 'ai-grammar-improver',
    label: 'Text to Check',
    placeholder: 'Paste text with grammar issues...',
    example: 'Their going to the store. Its a nice day outside.',
    inputType: 'textarea',
    showCharCounter: true,
    generate: (input) => {
      let out = input
        .replace(/\btheir going\b/gi, "they're going")
        .replace(/\bits a\b/gi, "it's a")
        .replace(/\byour welcome\b/gi, "you're welcome")
        .replace(/\bthen\b(?=,)/gi, 'than')
        .replace(/\bi\b/g, 'I')
        .replace(/\s+/g, ' ')
        .replace(/\s+([.,!?;:])/g, '$1')
        .trim();
      out = out.charAt(0).toUpperCase() + out.slice(1);
      if (!/[.!?]$/.test(out)) out += '.';
      return out;
    },
  },
  'ai-summarizer': {
    slug: 'ai-summarizer',
    label: 'Text to Summarize',
    placeholder: 'Paste a long article or text to summarize...',
    example: 'Artificial intelligence is transforming industries across the globe. From healthcare to finance, AI is being used to automate tasks, analyze data, and make predictions. Companies that adopt AI early gain a competitive advantage. However, there are concerns about job displacement and ethical implications. Despite these concerns, the benefits of AI far outweigh the risks for most organizations.',
    inputType: 'textarea',
    showCharCounter: true,
    generate: (input) => {
      const sentences = input.match(/[^.!?]+[.!?]+/g) || [input];
      if (sentences.length <= 2) return input.trim();
      const scored = sentences.map((s, i) => ({
        text: s.trim(),
        score: s.length * (i === 0 ? 2 : i === sentences.length - 1 ? 1.5 : 1),
      }));
      scored.sort((a, b) => b.score - a.score);
      const topN = Math.max(2, Math.ceil(sentences.length / 3));
      const top = scored.slice(0, topN).sort((a, b) => input.indexOf(a.text) - input.indexOf(b.text));
      return top.map((s) => s.text).join(' ');
    },
  },
  'ai-expand-text': {
    slug: 'ai-expand-text',
    label: 'Short Text to Expand',
    placeholder: 'Paste a short sentence or paragraph...',
    example: 'Exercise is good for your health.',
    inputType: 'textarea',
    showCharCounter: true,
    generate: (input) => {
      const core = input.trim().replace(/[.!?]+$/, '');
      const seed = hashStr(core);
      const expansions = [
        `${core}. This simple yet powerful statement holds more truth than many realize. Studies have consistently shown that incorporating this into your daily routine can lead to significant improvements over time. Furthermore, experts in the field emphasize that consistency is key — small, regular efforts compound into remarkable results. Whether you're just starting out or looking to deepen your practice, the evidence is clear: the benefits far outweigh the initial effort required.`,
        `${core}. While this may seem obvious at first glance, the underlying mechanisms are fascinating. Research indicates that the positive effects extend well beyond the surface, influencing multiple aspects of daily life. By understanding the deeper connections and applying proven strategies, individuals can maximize the impact and create lasting, meaningful change. The key is to start small, remain patient, and trust the process.`,
      ];
      return pick(expansions, seed);
    },
  },
  'ai-simplify-text': {
    slug: 'ai-simplify-text',
    label: 'Complex Text',
    placeholder: 'Paste text that is hard to read...',
    example: 'The utilization of this methodology will facilitate the commencement of the project.',
    inputType: 'textarea',
    showCharCounter: true,
    generate: (input) => {
      let out = input;
      for (const [re, rep] of simplifyReplacements) out = out.replace(re, rep);
      out = out.replace(/\b([A-Z][a-z]+)ize\b/g, '$1ise');
      return out;
    },
  },
  'ai-humanize-text': {
    slug: 'ai-humanize-text',
    label: 'AI-Generated Text',
    placeholder: 'Paste robotic-sounding text to humanize...',
    example: 'Furthermore, it is important to note that the implementation of said strategies will yield optimal results. Additionally, one must consider the various factors at play.',
    inputType: 'textarea',
    showCharCounter: true,
    generate: (input) => {
      let out = input;
      for (const [re, rep] of humanizeReplacements) out = out.replace(re, rep);
      out = out.replace(/\bIt is important to note that\b/gi, "It's worth noting that");
      out = out.replace(/\bIt should be noted that\b/gi, 'Keep in mind that');
      out = out.replace(/\bIn conclusion\b/gi, 'All in all');
      out = out.replace(/\bIn summary\b/gi, 'To sum up');
      out = out.replace(/\bOne must consider\b/gi, 'You should think about');
      out = out.replace(/\bthe implementation of\b/gi, 'using');
      out = out.replace(/\bsaid\b/gi, 'these');
      out = out.replace(/\boptimal\b/gi, 'best');
      out = out.replace(/\byield\b/gi, 'give');
      return out;
    },
  },
  // SEO AI
  'ai-meta-title-generator': {
    slug: 'ai-meta-title-generator',
    label: 'Page Topic / Keyword',
    placeholder: 'e.g. organic gardening tips',
    example: 'organic gardening tips',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const t = titleCase(input);
      const seed = hashStr(input);
      const titles = [
        `${t} — Complete Guide & Expert Tips`,
        `${t}: ${pick(['Everything You Need to Know', 'A Beginner\'s Guide', 'Tips & Tricks', 'Step-by-Step'], seed)}`,
        `Best ${t} for ${new Date().getFullYear()} | Expert Guide`,
        `${t} | Free Tools & Resources`,
        `How to ${input}: ${pick(['Ultimate Guide', 'Proven Methods', 'Expert Tips'], seed)}`,
      ];
      return titles.join('\n');
    },
  },
  'ai-meta-description-generator': {
    slug: 'ai-meta-description-generator',
    label: 'Page Topic',
    placeholder: 'e.g. healthy meal prep ideas',
    example: 'healthy meal prep ideas',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const seed = hashStr(input);
      const descs = [
        `Discover the best ${input} with our comprehensive guide. Learn expert tips, tricks, and strategies to get started today.`,
        `Looking for ${input}? Our expert guide covers everything you need to know. Start your journey here.`,
        `Get started with ${input} today! Explore our tips, tools, and resources designed for beginners and experts alike.`,
        `Master ${input} with our step-by-step guide. Practical tips, proven strategies, and expert advice await.`,
      ];
      return pick(descs, seed);
    },
  },
  'ai-keyword-generator': {
    slug: 'ai-keyword-generator',
    label: 'Seed Keyword',
    placeholder: 'e.g. coffee machine',
    example: 'coffee machine',
    inputType: 'text',
    showCharCounter: false,
    generate: (input) => {
      const kw = input.toLowerCase().trim();
      const modifiers = ['best', 'top', 'how to', 'guide', 'tips', 'review', 'vs', 'for beginners', 'near me', 'online', 'cheap', 'professional', 'automatic', 'manual'];
      const intents = ['buy', 'rent', 'compare', 'choose', 'fix', 'clean', 'use'];
      const lines: string[] = [];
      for (const m of modifiers.slice(0, 8)) lines.push(`${m} ${kw}`);
      for (const i of intents.slice(0, 5)) lines.push(`${i} ${kw}`);
      lines.push(`${kw} ${pick(['price', 'cost', 'reviews', 'alternatives', 'benefits', 'types'], hashStr(kw))}`);
      return lines.join('\n');
    },
  },
  'ai-faq-generator': {
    slug: 'ai-faq-generator',
    label: 'Topic',
    placeholder: 'e.g. solar panels',
    example: 'solar panels',
    inputType: 'text',
    showCharCounter: false,
    generate: (input) => {
      const t = titleCase(input);
      const faqs = [
        { q: `What is ${input}?`, a: `${t} refers to a system or concept designed to ${pick(['provide a specific solution', 'address a particular need', 'deliver results efficiently'], hashStr(input))}. Understanding the basics is the first step to making informed decisions.` },
        { q: `How does ${input} work?`, a: `${t} works by ${pick(['following a structured process', 'leveraging proven principles', 'using a systematic approach'], hashStr(input) + 1)}. The exact mechanism depends on the specific type and configuration you choose.` },
        { q: `Is ${input} worth it?`, a: `For most people, ${input} is absolutely worth considering. The ${pick(['long-term benefits', 'cost savings', 'efficiency gains'], hashStr(input) + 2)} often justify the initial investment.` },
        { q: `How much does ${input} cost?`, a: `The cost of ${input} varies depending on ${pick(['quality, features, and scale', 'your specific needs and location', 'the provider and service level'], hashStr(input) + 3)}. It's best to compare multiple options.` },
      ];
      return faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n');
    },
  },
  'ai-seo-outline-generator': {
    slug: 'ai-seo-outline-generator',
    label: 'Target Keyword',
    placeholder: 'e.g. email marketing',
    example: 'email marketing',
    inputType: 'text',
    showCharCounter: false,
    generate: (input) => {
      const t = titleCase(input);
      return [
        `1. Introduction to ${t}`,
        `2. Why ${t} Matters for Your Business`,
        `3. Key Benefits of ${t}`,
        `4. How to Get Started with ${t}`,
        `5. Best Practices for ${t}`,
        `6. Common ${t} Mistakes to Avoid`,
        `7. Tools and Resources for ${t}`,
        `8. Measuring ${t} Success`,
        `9. ${t} Trends to Watch`,
        `10. Conclusion and Next Steps`,
      ].join('\n');
    },
  },
  'ai-slug-generator-pro': {
    slug: 'ai-slug-generator-pro',
    label: 'Title or Phrase',
    placeholder: 'e.g. How to Build a Website in 2024',
    example: 'How to Build a Website in 2024',
    inputType: 'text',
    showCharCounter: false,
    generate: (input) => {
      const base = input
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      const variations = [
        base,
        base.replace(/-in-\d{4}$/, ''),
        base.replace(/how-to-/, ''),
        `${base}-guide`,
        `${base}-tips`,
        `best-${base}`,
      ];
      return Array.from(new Set(variations)).join('\n');
    },
  },
  'ai-product-schema-writer': {
    slug: 'ai-product-schema-writer',
    label: 'Product Name & Description',
    placeholder: 'e.g. Wireless Headphones | Premium noise-cancelling over-ear headphones',
    example: 'Wireless Headphones | Premium noise-cancelling over-ear headphones',
    inputType: 'text',
    showCharCounter: false,
    generate: (input) => {
      const [name, ...descParts] = input.split('|');
      const desc = descParts.join('|').trim() || 'High-quality product';
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: name.trim(),
        description: desc,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.5', reviewCount: '100' },
      }, null, 2);
    },
  },
  'ai-alt-text-generator': {
    slug: 'ai-alt-text-generator',
    label: 'Image Description / Context',
    placeholder: 'e.g. a woman hiking on a mountain trail at sunset',
    example: 'a woman hiking on a mountain trail at sunset',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const seed = hashStr(input);
      const templates = [
        `${input} — perfect for ${pick(['blog posts', 'social media', 'presentations', 'website headers'], seed)}`,
        `Photo showing ${input}. Ideal for ${pick(['articles', 'marketing materials', 'travel content', 'inspiration posts'], seed + 1)}.`,
        `${titleCase(input)}. ${pick(['High resolution', 'Professional quality', 'Authentic moment', 'Scenic view'], seed + 2)}.`,
      ];
      return templates.join('\n');
    },
  },
  // Social Media
  'ai-instagram-caption-generator': {
    slug: 'ai-instagram-caption-generator',
    label: 'Post Topic',
    placeholder: 'e.g. morning coffee routine',
    example: 'morning coffee routine',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const seed = hashStr(input);
      const captions = [
        `Starting the day right with ${input}. What does your morning look like? ☕✨\n\n#${input.replace(/\s/g, '')} #morningroutine #dailyvibes #coffeelover`,
        `There's something magical about ${input}. Here's to small moments that make life beautiful. 🌟\n\n#${input.replace(/\s/g, '')} #goodvibes #dailyinspiration`,
        `${titleCase(input)} — because every great day starts with a great beginning. 💫\n\nDrop a ❤️ if this resonates with you!\n\n#${input.replace(/\s/g, '')} #lifestyle #inspiration`,
      ];
      return pick(captions, seed);
    },
  },
  'ai-facebook-caption-generator': {
    slug: 'ai-facebook-caption-generator',
    label: 'Post Topic',
    placeholder: 'e.g. grand opening sale',
    example: 'grand opening sale',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const seed = hashStr(input);
      const captions = [
        `🎉 Big news! We're excited to share ${input} with all of you. This is something we've been working hard on, and we can't wait for you to experience it. Tag a friend who needs to see this! 👇`,
        `Hey everyone! Just wanted to share something special about ${input}. We'd love to hear your thoughts in the comments below. What do you think? 💬`,
        `Today is the day! ${titleCase(input)} is finally here, and we couldn't be more thrilled. Thank you to everyone who's supported us along the way. This one's for you! 🙌`,
      ];
      return pick(captions, seed);
    },
  },
  'ai-linkedin-post-generator': {
    slug: 'ai-linkedin-post-generator',
    label: 'Professional Topic',
    placeholder: 'e.g. lessons learned in leadership',
    example: 'lessons learned in leadership',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const seed = hashStr(input);
      const posts = [
        `After years of experience, here's what I've learned about ${input}:\n\n1. Consistency beats intensity\n2. Listen more than you speak\n3. Small wins compound over time\n4. Surround yourself with people who challenge you\n\nWhat would you add to this list?\n\n#${input.replace(/\s/g, '')} #leadership #professionaldevelopment`,
        `Reflecting on ${input} today. Here are three insights that changed my perspective:\n\n→ Growth happens outside your comfort zone\n→ The best investment you can make is in yourself\n→ Failure is data, not defeat\n\nWhat's one lesson ${input} has taught you? Share below. 👇`,
        `${titleCase(input)} — a topic I keep coming back to.\n\nThe most impactful lesson? It's not about being perfect. It's about showing up, doing the work, and being willing to learn.\n\nIf this resonates, share it with someone who needs to hear it today.\n\n#${input.replace(/\s/g, '')} #growthmindset #career`,
      ];
      return pick(posts, seed);
    },
  },
  'ai-tweet-generator': {
    slug: 'ai-tweet-generator',
    label: 'Tweet Topic',
    placeholder: 'e.g. productivity tips',
    example: 'productivity tips',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const seed = hashStr(input);
      const tweets = [
        `5 ${input} that actually work:\n\n1. Start with the hardest task\n2. Time-block your day\n3. Take real breaks\n4. Single-task\n5. Review weekly\n\nWhich one will you try? 🧵`,
        `Unpopular opinion about ${input}:\n\nMost people overcomplicate it.\n\nThe best approach? Keep it simple, stay consistent, and trust the process.\n\nAgree or disagree?`,
        `Just realized something about ${input}:\n\nThe people who succeed aren't the ones who never fail. They're the ones who never quit.\n\nRetweet if you needed this reminder today. 🚀`,
      ];
      return pick(tweets, seed);
    },
  },
  'ai-pinterest-pin-title-generator': {
    slug: 'ai-pinterest-pin-title-generator',
    label: 'Pin Topic',
    placeholder: 'e.g. easy dinner recipes',
    example: 'easy dinner recipes',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const seed = hashStr(input);
      const titles = [
        `${titleCase(input)} You'll Love | Easy Ideas`,
        `Best ${input} for Busy People`,
        `${titleCase(input)}: ${pick(['10 Simple Ideas', '5 Must-Try Tips', 'The Ultimate Collection'], seed)}`,
        `How to ${input} — Step by Step Guide`,
        `${pick(['Amazing', 'Delicious', 'Easy', 'Quick'], seed)} ${input} for ${new Date().getFullYear()}`,
      ];
      return titles.join('\n');
    },
  },
  'ai-pinterest-description-generator': {
    slug: 'ai-pinterest-description-generator',
    label: 'Pin Topic',
    placeholder: 'e.g. farmhouse bedroom decor',
    example: 'farmhouse bedroom decor',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const seed = hashStr(input);
      const descs = [
        `Looking for ${input} inspiration? This pin has everything you need! Discover creative ideas, practical tips, and beautiful examples to bring your vision to life. Save this pin for later and click through for the full guide! #${input.replace(/\s/g, '')} #homedecor #inspiration`,
        `Transform your space with these ${input} ideas! Whether you're on a budget or going all out, you'll find something you love here. Don't forget to save this pin and share it with a friend who needs decor inspiration. ✨ #${input.replace(/\s/g, '')} #pinterestideas`,
      ];
      return pick(descs, seed);
    },
  },
  'ai-hashtag-generator': {
    slug: 'ai-hashtag-generator',
    label: 'Topic / Niche',
    placeholder: 'e.g. fitness motivation',
    example: 'fitness motivation',
    inputType: 'text',
    showCharCounter: false,
    generate: (input) => {
      const kw = input.toLowerCase().trim();
      const base = `#${kw.replace(/\s/g, '')}`;
      const cat = Object.keys(hashtagCategories).find((c) => kw.includes(c)) || 'default';
      const tags = [base, `#${kw.replace(/\s/g, '')}tips`, `#${kw.replace(/\s/g, '')}ideas`, ...hashtagCategories[cat].slice(0, 8)];
      return Array.from(new Set(tags)).join(' ');
    },
  },
  'ai-social-bio-generator': {
    slug: 'ai-social-bio-generator',
    label: 'Your Interests / Profession',
    placeholder: 'e.g. photographer | coffee lover | traveler',
    example: 'photographer | coffee lover | traveler',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const parts = input.split('|').map((p) => p.trim()).filter(Boolean);
      const seed = hashStr(input);
      const bios = [
        `${parts.join(' 📸 ')} | Sharing my journey one post at a time ✨`,
        `${parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' | ')} | Living life, one adventure at a time 🌍`,
        `Just a ${parts[0] || 'creator'} who loves ${parts.slice(1).join(' and ') || 'creating'} | Follow for daily inspiration 💫`,
        `${parts.join(' • ')} | ${pick(['Dream big', 'Stay curious', 'Create daily', 'Be kind'], seed)} 🌟`,
      ];
      return bios.join('\n\n');
    },
  },
  // YouTube
  'ai-youtube-title-generator': {
    slug: 'ai-youtube-title-generator',
    label: 'Video Topic',
    placeholder: 'e.g. how to edit videos for beginners',
    example: 'how to edit videos for beginners',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const seed = hashStr(input);
      const titles = [
        `How to ${input} (Complete ${new Date().getFullYear()} Guide)`,
        `${titleCase(input)} — ${pick(['I Was Shocked!', 'You Won\'t Believe What Happened', 'The Truth Revealed', 'Step by Step'], seed)}`,
        `I Tried ${input} for 30 Days — Here's What Happened`,
        `${titleCase(input)}: ${pick(['The Ultimate Guide', 'Everything You Need to Know', 'From Zero to Pro', 'Tips Nobody Talks About'], seed + 1)}`,
        `STOP Doing ${input} Wrong! Do This Instead 👇`,
      ];
      return titles.join('\n');
    },
  },
  'ai-youtube-description-generator': {
    slug: 'ai-youtube-description-generator',
    label: 'Video Topic',
    placeholder: 'e.g. cooking pasta from scratch',
    example: 'cooking pasta from scratch',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const t = titleCase(input);
      return `In this video, we cover everything you need to know about ${input}! Whether you're a complete beginner or looking to level up your skills, this tutorial has you covered.\n\n📋 What you'll learn:\n- The fundamentals of ${input}\n- Pro tips and tricks\n- Common mistakes to avoid\n- Step-by-step walkthrough\n\n🔔 Subscribe for more content like this!\n\n⏱️ Timestamps:\n0:00 Introduction\n1:30 Getting Started\n5:00 Pro Tips\n10:00 Common Mistakes\n15:00 Final Results\n\n#${input.replace(/\s/g, '')} #tutorial #howto #${new Date().getFullYear()}`;
    },
  },
  'ai-video-hook-generator': {
    slug: 'ai-video-hook-generator',
    label: 'Video Topic',
    placeholder: 'e.g. personal finance tips',
    example: 'personal finance tips',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const seed = hashStr(input);
      const hooks = [
        `Stop scrolling! Here's something about ${input} nobody tells you...`,
        `I wish someone told me this about ${input} sooner.`,
        `The truth about ${input}? It's not what you think.`,
        `Here's why ${input} is about to change everything.`,
        `Nobody talks about this ${input} secret...`,
        `If you're into ${input}, this will blow your mind.`,
      ];
      return hooks.map((h, i) => `${i + 1}. ${h}`).join('\n');
    },
  },
  'ai-video-script-generator': {
    slug: 'ai-video-script-generator',
    label: 'Video Topic',
    placeholder: 'e.g. 5 productivity apps you need',
    example: '5 productivity apps you need',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const t = titleCase(input);
      return `[HOOK - 0:00]\nHey everyone! Today we're talking about ${input}. If you found this video, you're in the right place.\n\n[INTRO - 0:15]\nWelcome back to the channel! I'm excited to share everything I know about ${input}. Let's dive right in.\n\n[MAIN CONTENT - 0:30]\nSo here's what you need to know about ${input}:\n\nPoint 1: Start with the basics. Understanding the fundamentals is crucial.\n\nPoint 2: Practice consistently. Even 10 minutes a day makes a difference.\n\nPoint 3: Learn from others. Find mentors, watch tutorials, and join communities.\n\n[DEMONSTRATION - 2:00]\nLet me show you exactly how this works in practice...\n\n[CTA - 4:00]\nIf you found this helpful, hit that subscribe button and drop a comment below with your biggest takeaway. I read every single one!\n\n[OUTRO - 4:30]\nThanks for watching! See you in the next video.`;
    },
  },
  'ai-shorts-caption-generator': {
    slug: 'ai-shorts-caption-generator',
    label: 'Short Video Topic',
    placeholder: 'e.g. quick workout routine',
    example: 'quick workout routine',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const seed = hashStr(input);
      const captions = [
        `${titleCase(input)} in 60 seconds! Save this for later 🔥\n\n#${input.replace(/\s/g, '')} #shorts #fyp #viral`,
        `POV: you just discovered the best ${input} 👀\n\nFollow for more! 🚀\n\n#${input.replace(/\s/g, '')} #shorts #trending`,
        `This ${input} hack changed everything 🤯\n\nShare with someone who needs this!\n\n#${input.replace(/\s/g, '')} #shorts #foryou`,
      ];
      return pick(captions, seed);
    },
  },
  'ai-thumbnail-text-generator': {
    slug: 'ai-thumbnail-text-generator',
    label: 'Video Topic',
    placeholder: 'e.g. crazy science experiment',
    example: 'crazy science experiment',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const seed = hashStr(input);
      const texts = [
        `WOW!`, `INSANE!`, `YOU WON'T BELIEVE THIS`, `MUST WATCH`, `SHOCKING!`,
        `THE TRUTH`, `DON'T TRY THIS`, `I WAS WRONG`, `GAME CHANGER`, `NO WAY!`,
      ];
      return texts.map((t) => `${t} — ${titleCase(input)}`).join('\n');
    },
  },
  // Business
  'ai-business-name-generator': {
    slug: 'ai-business-name-generator',
    label: 'Industry / Keywords',
    placeholder: 'e.g. coffee shop, tech startup',
    example: 'coffee shop',
    inputType: 'text',
    showCharCounter: false,
    generate: (input) => {
      const kw = input.trim();
      const prefixes = ['Prime', 'Elite', 'Summit', 'Nova', 'Apex', 'Bright', 'Swift', 'Bold', 'True', 'Peak'];
      const suffixes = ['Hub', 'Lab', 'Co', 'Works', 'Studio', 'Group', 'House', 'Forge', 'Point', 'Space'];
      const names: string[] = [];
      for (let i = 0; i < 10; i++) {
        const p = pick(prefixes, hashStr(kw) + i);
        const s = pick(suffixes, hashStr(kw) + i * 3);
        names.push(`${p} ${titleCase(kw)} ${s}`);
      }
      return Array.from(new Set(names)).slice(0, 10).join('\n');
    },
  },
  'ai-startup-name-generator': {
    slug: 'ai-startup-name-generator',
    label: 'Industry / Keywords',
    placeholder: 'e.g. AI, fintech, health',
    example: 'fintech',
    inputType: 'text',
    showCharCounter: false,
    generate: (input) => {
      const kw = input.trim();
      const suffixes = ['ly', 'ify', 'able', 'io', 'AI', 'OS', 'X', '360', 'Lab', 'Base'];
      const names: string[] = [];
      for (const s of suffixes) {
        names.push(`${kw.toLowerCase().replace(/\s/g, '')}${s}`);
      }
      names.push(`${titleCase(kw)}OS`, `${kw.toLowerCase().replace(/\s/g, '')}.io`, `Go${titleCase(kw)}`, `My${titleCase(kw)}`);
      return names.join('\n');
    },
  },
  'ai-brand-name-generator': {
    slug: 'ai-brand-name-generator',
    label: 'Product / Industry',
    placeholder: 'e.g. skincare, athletic wear',
    example: 'skincare',
    inputType: 'text',
    showCharCounter: false,
    generate: (input) => {
      const kw = input.trim();
      const styles = [
        `${titleCase(kw)} & Co.`,
        `Pure ${titleCase(kw)}`,
        `${titleCase(kw)} Naturals`,
        `${kw.charAt(0).toUpperCase()}${kw.slice(1)}ly`,
        `The ${titleCase(kw)} Bar`,
        `${titleCase(kw)} Collective`,
        `Bloom ${titleCase(kw)}`,
        `${titleCase(kw)} Essentials`,
        `Vibe ${titleCase(kw)}`,
        `${titleCase(kw)} Studio`,
      ];
      return styles.join('\n');
    },
  },
  'ai-slogan-generator': {
    slug: 'ai-slogan-generator',
    label: 'Business Name / Industry',
    placeholder: 'e.g. fitness brand, coffee company',
    example: 'fitness brand',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const seed = hashStr(input);
      const slogans = [
        `${titleCase(input)}: ${pick(['Excellence in every detail', 'Where quality meets value', 'Your trusted partner', 'Building better futures'], seed)}`,
        `${pick(['Simply', 'Always', 'Truly', 'Purely'], seed)} ${titleCase(input)}.`,
        `${titleCase(input)} — ${pick(['because you deserve the best', 'redefining the standard', 'making it happen', 'going the extra mile'], seed + 1)}`,
        `${pick(['Think', 'Choose', 'Trust', 'Believe in'], seed + 2)} ${titleCase(input)}.`,
      ];
      return slogans.join('\n');
    },
  },
  'ai-tagline-generator': {
    slug: 'ai-tagline-generator',
    label: 'Business / Product',
    placeholder: 'e.g. eco-friendly cleaning service',
    example: 'eco-friendly cleaning service',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const seed = hashStr(input);
      const taglines = [
        `${pick(['Clean', 'Green', 'Smart', 'Bold', 'Fresh'], seed)} solutions for a ${pick(['better', 'brighter', 'smarter', 'cleaner'], seed + 1)} tomorrow.`,
        `${titleCase(input)} — ${pick(['done right', 'made simple', 'reimagined', 'at its best'], seed + 2)}`,
        `Where ${input} meets ${pick(['excellence', 'innovation', 'quality', 'value'], seed + 3)}.`,
        `${pick(['Your', 'The', 'One'], seed + 4)} ${input} ${pick(['partner', 'solution', 'destination', 'choice'], seed + 5)}.`,
      ];
      return taglines.join('\n');
    },
  },
  'ai-product-description-generator': {
    slug: 'ai-product-description-generator',
    label: 'Product Name & Features',
    placeholder: 'e.g. Smart Water Bottle | tracks hydration, BPA-free, 24oz',
    example: 'Smart Water Bottle | tracks hydration, BPA-free, 24oz',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const [name, ...features] = input.split('|');
      const featList = features.join(',').split(',').map((f) => f.trim()).filter(Boolean);
      const seed = hashStr(input);
      const intros = [
        `Meet the ${name.trim()} — designed to elevate your everyday experience.`,
        `Introducing the ${name.trim()}. Perfect for those who demand more from their products.`,
        `The ${name.trim()} is here, and it's everything you've been looking for.`,
      ];
      const bodies = featList.length > 0
        ? `Key features include ${featList.map((f, i) => i === featList.length - 1 ? `and ${f}` : f).join(', ')}. Built with quality and designed to last, this product delivers exceptional value.`
        : `Built with quality materials and designed to last, this product delivers exceptional value.`;
      const ctas = [
        `Order yours today and experience the difference!`,
        `Don't miss out — add to cart now!`,
        `Limited stock available. Get yours before it's gone!`,
      ];
      return `${pick(intros, seed)} ${bodies} ${pick(ctas, seed)}`;
    },
  },
  'ai-marketing-copy-generator': {
    slug: 'ai-marketing-copy-generator',
    label: 'Product / Offer',
    placeholder: 'e.g. 50% off all summer collection',
    example: '50% off all summer collection',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const seed = hashStr(input);
      const copies = [
        `🚨 LIMITED TIME OFFER 🚨\n\n${titleCase(input)}!\n\nThis won't last long. Act now and save big on the products you love.\n\n✅ Premium quality\n✅ Unbeatable price\n✅ Fast shipping\n\nDon't wait — this offer ends soon!`,
        `Ready for something amazing?\n\n${titleCase(input)} is happening right now, and you don't want to miss it.\n\nHere's why customers love it:\n→ Top-rated products\n→ Incredible savings\n→ Satisfaction guaranteed\n\nShop now and see the difference for yourself!`,
        `${titleCase(input)} — but only for a limited time.\n\nWe're making it easier than ever to get what you want at a price you'll love. No gimmicks, no catch — just real value.\n\n👉 Click here to claim your offer today!`,
      ];
      return pick(copies, seed);
    },
  },
  // Email
  'ai-email-writer': {
    slug: 'ai-email-writer',
    label: 'Email Purpose / Topic',
    placeholder: 'e.g. request a meeting with the design team',
    example: 'request a meeting with the design team',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      return `Subject: ${titleCase(input)}\n\nHi [Name],\n\nI hope this email finds you well. I'm reaching out regarding ${input}.\n\nI'd love to schedule a time to discuss this further. Would you be available for a brief call sometime this week?\n\nPlease let me know what works best for your schedule, and I'll be happy to accommodate.\n\nThank you for your time, and I look forward to hearing from you.\n\nBest regards,\n[Your Name]`;
    },
  },
  'ai-cold-email-generator': {
    slug: 'ai-cold-email-generator',
    label: 'Product / Value Proposition',
    placeholder: 'e.g. SaaS tool that saves 10 hours per week',
    example: 'SaaS tool that saves 10 hours per week',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      return `Subject: Quick question about your workflow\n\nHi [First Name],\n\nI noticed [Company] has been growing fast — congratulations! I'm reaching out because I help teams like yours ${input}.\n\nCompanies similar to yours have seen significant results after implementing this, and I thought you might benefit as well.\n\nI know you're busy, so I'll keep it brief: would you be open to a 10-minute call next week to explore if this makes sense for your team?\n\nIf not, no worries at all — I appreciate you taking the time to read this.\n\nBest,\n[Your Name]`;
    },
  },
  'ai-follow-up-email-generator': {
    slug: 'ai-follow-up-email-generator',
    label: 'Context of Previous Email',
    placeholder: 'e.g. sent a proposal last week for website redesign',
    example: 'sent a proposal last week for website redesign',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      return `Subject: Following up — ${titleCase(input)}\n\nHi [Name],\n\nI hope you're doing well! I wanted to follow up on my previous email about ${input}.\n\nI understand things get busy, so I just wanted to bump this to the top of your inbox. If you have any questions or need more information, I'm happy to help.\n\nWould it be helpful to schedule a quick call to go over the details? Let me know what works best for you.\n\nLooking forward to your response.\n\nBest regards,\n[Your Name]`;
    },
  },
  'ai-professional-reply-generator': {
    slug: 'ai-professional-reply-generator',
    label: 'Email You Received (paste it)',
    placeholder: 'Paste the email you want to reply to...',
    example: 'Hi, can we reschedule our meeting to next Thursday?',
    inputType: 'textarea',
    showCharCounter: true,
    generate: (input) => {
      return `Hi [Name],\n\nThank you for your email. I appreciate you reaching out.\n\nRegarding your message: "${input.trim()}"\n\nAbsolutely, that works for me. I've reviewed my schedule and can accommodate this change. Please go ahead and send the updated details at your convenience.\n\nIf there's anything else you need from my end, please don't hesitate to ask.\n\nBest regards,\n[Your Name]`;
    },
  },
  // Career
  'ai-resume-summary-generator': {
    slug: 'ai-resume-summary-generator',
    label: 'Job Title & Key Skills',
    placeholder: 'e.g. Marketing Manager | SEO, content strategy, analytics',
    example: 'Marketing Manager | SEO, content strategy, analytics',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const [title, ...skillParts] = input.split('|');
      const skills = skillParts.join(',').split(',').map((s) => s.trim()).filter(Boolean);
      const skillStr = skills.length > 0 ? skills.join(', ') : 'key skills';
      const seed = hashStr(input);
      const summaries = [
        `Results-driven ${title.trim()} with ${pick(['5+', '7+', '10+'], seed)} years of experience specializing in ${skillStr}. Proven track record of delivering measurable outcomes and driving organizational growth. Passionate about leveraging expertise to solve complex challenges and contribute to team success.`,
        `Detail-oriented ${title.trim()} skilled in ${skillStr}. Adept at managing multiple priorities in fast-paced environments while maintaining high standards. Strong communicator and collaborator with a commitment to continuous learning and professional development.`,
        `Dynamic ${title.trim()} with expertise in ${skillStr}. Recognized for ${pick(['leading cross-functional initiatives', 'optimizing processes for efficiency', 'building high-performing teams', 'driving strategic growth'], seed + 1)}. Seeking to apply proven skills and experience in a challenging new role.`,
      ];
      return pick(summaries, seed);
    },
  },
  'ai-cover-letter-generator': {
    slug: 'ai-cover-letter-generator',
    label: 'Job Title & Company',
    placeholder: 'e.g. Software Engineer at Google',
    example: 'Software Engineer at Google',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const parts = input.split(' at ');
      const title = parts[0]?.trim() || 'the position';
      const company = parts[1]?.trim() || 'your company';
      return `Dear Hiring Manager,\n\nI am writing to express my strong interest in the ${title} position at ${company}. With a solid background in ${title.toLowerCase()} and a passion for delivering quality results, I am confident in my ability to contribute meaningfully to your team.\n\nThroughout my career, I have developed a strong skill set that aligns well with the requirements of this role. I am particularly drawn to ${company} because of its reputation for innovation and excellence in the industry.\n\nI would welcome the opportunity to discuss how my experience and skills can benefit your organization. Thank you for considering my application — I look forward to the possibility of working together.\n\nSincerely,\n[Your Name]`;
    },
  },
  'ai-job-description-generator': {
    slug: 'ai-job-description-generator',
    label: 'Job Title',
    placeholder: 'e.g. Senior Product Designer',
    example: 'Senior Product Designer',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const t = titleCase(input);
      return `Job Title: ${t}\n\nAbout the Role:\nWe are seeking a talented ${input} to join our growing team. In this role, you will be responsible for leading key initiatives, collaborating with cross-functional teams, and delivering high-quality results.\n\nKey Responsibilities:\n• Lead and execute ${input.toLowerCase()} projects from concept to completion\n• Collaborate with stakeholders to define requirements and deliverables\n• Maintain quality standards and best practices\n• Mentor junior team members and share knowledge\n• Stay current with industry trends and technologies\n\nRequirements:\n• ${pick(['3+', '5+', '7+'], hashStr(input))} years of experience in a similar role\n• Strong portfolio demonstrating relevant work\n• Excellent communication and collaboration skills\n• Proficiency with industry-standard tools\n• Bachelor's degree or equivalent experience\n\nWhat We Offer:\n• Competitive salary and benefits\n• Flexible work arrangements\n• Professional development opportunities\n• Collaborative and inclusive culture`;
    },
  },
  'ai-interview-questions-generator': {
    slug: 'ai-interview-questions-generator',
    label: 'Job Title / Role',
    placeholder: 'e.g. Project Manager',
    example: 'Project Manager',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const t = titleCase(input);
      const general = [
        'Tell me about yourself and your background.',
        'Why are you interested in this role?',
        'What are your greatest strengths and weaknesses?',
        'Where do you see yourself in 5 years?',
        'Describe a challenge you faced and how you overcame it.',
      ];
      const specific = [
        `What experience do you have as a ${input}?`,
        `Walk me through a typical project you'd manage as a ${input}.`,
        `How do you handle conflicting priorities in your role as a ${input}?`,
        `What tools or methodologies do you use most as a ${input}?`,
        `Describe a time you had to make a difficult decision as a ${input}.`,
      ];
      return `General Questions:\n${general.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n\nRole-Specific Questions:\n${specific.map((q, i) => `${i + 1}. ${q}`).join('\n')}`;
    },
  },
  // E-commerce
  'ai-amazon-listing-generator': {
    slug: 'ai-amazon-listing-generator',
    label: 'Product Name & Key Features',
    placeholder: 'e.g. Bluetooth Speaker | waterproof, 20h battery, deep bass',
    example: 'Bluetooth Speaker | waterproof, 20h battery, deep bass',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const [name, ...featParts] = input.split('|');
      const features = featParts.join(',').split(',').map((f) => f.trim()).filter(Boolean);
      const featBullets = features.length > 0
        ? features.map((f) => `• ${f}`).join('\n')
        : '• Premium quality\n• Satisfaction guaranteed\n• Fast shipping';
      return `Product Title: ${titleCase(name.trim())} — ${features.join(', ') || 'Premium Quality'}\n\nAbout this product:\n${featBullets}\n• Backed by our 100% satisfaction guarantee\n• Trusted by thousands of happy customers\n\nProduct Description:\nExperience the ${name.trim()} like never before. Designed with quality and performance in mind, this product delivers outstanding results every time. Whether you're at home or on the go, the ${name.trim()} is your perfect companion.\n\nKeywords: ${features.join(', ')}, ${name.trim().toLowerCase()}, best ${name.trim().toLowerCase()}, buy ${name.trim().toLowerCase()}`;
    },
  },
  'ai-shopify-product-description-generator': {
    slug: 'ai-shopify-product-description-generator',
    label: 'Product Name & Features',
    placeholder: 'e.g. Organic Face Serum | vitamin C, hyaluronic acid, all skin types',
    example: 'Organic Face Serum | vitamin C, hyaluronic acid, all skin types',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const [name, ...featParts] = input.split('|');
      const features = featParts.join(',').split(',').map((f) => f.trim()).filter(Boolean);
      const featStr = features.length > 0 ? features.join(', ') : 'premium ingredients';
      return `${titleCase(name.trim())}\n\nNourish, protect, and rejuvenate your skin with our ${name.trim()}. Crafted with ${featStr}, this product is designed to deliver visible results you can see and feel.\n\nWhy customers love it:\n• Made with high-quality, carefully selected ingredients\n• Suitable for daily use\n• Visible results in just weeks\n• Loved by thousands of happy customers\n\nHow to use:\nApply gently and consistently for best results. Pair with your existing routine for enhanced benefits.\n\nAdd to cart now and experience the difference!`;
    },
  },
  'ai-etsy-product-description-generator': {
    slug: 'ai-etsy-product-description-generator',
    label: 'Product Name & Details',
    placeholder: 'e.g. Handmade Ceramic Mug | 12oz, dishwasher safe, made to order',
    example: 'Handmade Ceramic Mug | 12oz, dishwasher safe, made to order',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const [name, ...detailParts] = input.split('|');
      const details = detailParts.join(',').split(',').map((d) => d.trim()).filter(Boolean);
      const detailStr = details.length > 0 ? details.join(' • ') : 'handcrafted with love';
      return `${titleCase(name.trim())}\n\n✨ Handmade with love and care ✨\n\n${detailStr}\n\nEach piece is unique and may have slight variations — that's the beauty of handmade! Perfect as a gift or a treat for yourself.\n\n📏 Details:\n• Material: High-quality ceramic\n• Handmade by skilled artisans\n• Ships in 3-5 business days\n• Eco-friendly packaging\n\n💬 Have a question? Send me a message — I love hearing from you!\n\n💛 Thank you for supporting handmade!`;
    },
  },
  'ai-ebay-listing-generator': {
    slug: 'ai-ebay-listing-generator',
    label: 'Product Name & Condition',
    placeholder: 'e.g. Vintage Camera | excellent condition, includes lens',
    example: 'Vintage Camera | excellent condition, includes lens',
    inputType: 'text',
    showCharCounter: true,
    generate: (input) => {
      const [name, ...condParts] = input.split('|');
      const condition = condParts.join(',').split(',').map((c) => c.trim()).filter(Boolean);
      const condStr = condition.length > 0 ? condition.join(', ') : 'good condition';
      return `${titleCase(name.trim())}\n\nCondition: ${condStr}\n\nItem Description:\nUp for sale is this ${name.trim()}. ${condStr}. Please review all photos carefully as they are part of the description.\n\nWhat's Included:\n• ${name.trim()}\n• Original packaging (if shown in photos)\n• As shown in pictures\n\nShipping:\n• Ships within 1-2 business days of payment\n• Combined shipping available for multiple purchases\n• International buyers welcome\n\nPayment:\n• PayPal accepted\n• Payment due within 3 days of auction end\n\nReturns:\n• Returns accepted within 30 days\n• Buyer pays return shipping\n\nFeel free to ask any questions before bidding!`;
    },
  },
};
