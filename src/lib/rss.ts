import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: [
      ["media:content", "mediaContent"],
      ["content:encoded", "contentEncoded"],
    ],
  },
});

export const RSS_SOURCES = [
  { name: "Mint", url: "https://www.livemint.com/rss/markets" },
  { name: "Economic Times", url: "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms" },
  { name: "Business Standard", url: "https://www.business-standard.com/rss/markets-106.rss" },
  { name: "Financial Express", url: "https://www.financialexpress.com/market/feed/" },
  { name: "Reuters", url: "https://www.reutersagency.com/feed/?best-topics=business-finance&post_type=best" },
  { name: "CNBC", url: "https://www.cnbc.com/id/100003114/device/rss/rss.html" },
  { name: "TechCrunch AI", url: "https://techcrunch.com/category/artificial-intelligence/feed/" },
  { name: "Hugging Face", url: "https://huggingface.co/blog/feed.xml" },
  { name: "MIT Tech Review", url: "https://www.technologyreview.com/topic/artificial-intelligence/feed/" },
  { name: "Wired AI", url: "https://www.wired.com/feed/tag/ai/latest/rss" },
  { name: "TechBuzz AI", url: "https://www.techbuzz.ai/api/rss/articles" },
  { name: "Hacker News", url: "https://hnrss.org/frontpage?points=100" },
];

export interface ProcessedArticle {
  title: string;
  source: string;
  url: string;
  summary: string | null;
  category: string;
  image_url: string | null;
  published_at: string;
}

const cleanHtml = (str: string) => {
  if (!str) return "";
  let clean = str.replace(/<[^>]*>?/gm, "").trim();
  clean = clean
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return clean;
};

const extractImage = (item: any, rawDescription: string = ""): string | null => {
  const content = item.mediaContent;
  if (content?.$?.url) return content.$.url;

  if (item.enclosure?.url) return item.enclosure.url;

  const match = rawDescription.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (match && match[1]) return match[1];

  return null;
};

// Sentiment analysis removed as per user request

const categorize = (title: string, summary: string, sourceName: string = ""): string => {
  const t = (title + " " + summary).toLowerCase();
  
  const aiSources = ["TechCrunch AI", "Hugging Face", "MIT Tech Review", "Wired AI", "TechBuzz AI"];
  if (aiSources.includes(sourceName)) return "AI Updates";

  const categories = {
    "AI Updates": ["ai", "artificial intelligence", "openai", "chatgpt", "generative ai", "nvidia", "llm", "gemini", "claude", "machine learning", "deep learning", "sam altman"],
    Economy: ["inflation", "rbi", "gdp", "policy", "interest rate"],
    Global: ["international", "us", "china", "global", "fed"],
    Markets: ["stock", "share", "nifty", "sensex", "market", "trading", "investment", "investing"],
  };

  if (categories["AI Updates"].some((k) => new RegExp(`\\b${k}\\b`, "i").test(t))) return "AI Updates";
  if (categories.Economy.some((k) => new RegExp(`\\b${k}\\b`, "i").test(t))) return "Economy";
  if (categories.Global.some((k) => new RegExp(`\\b${k}\\b`, "i").test(t))) return "Global";
  return "Markets"; // Fallback to Markets
};

export async function fetchAndProcessFeeds(): Promise<ProcessedArticle[]> {
  const allArticles: ProcessedArticle[] = [];

  const feedPromises = RSS_SOURCES.map(async (source) => {
    try {
      const feed = await parser.parseURL(source.url);
      const items = feed.items.slice(0, 15); // Limit to latest 15 per feed

      return items
        .map((item) => {
          const itemAny = item as any;
          if (!item.title || !item.link) return null;

          const rawDesc = (itemAny.contentEncoded || itemAny.description || itemAny.content || "") as string;
          const cleanedDesc = cleanHtml(rawDesc);
          let summary = cleanedDesc.length > 250 ? cleanedDesc.substring(0, 247) + "..." : cleanedDesc;
          if (summary.trim().length === 0) summary = item.title;

          let pubDate = new Date();
          if (item.pubDate) {
            const parsed = new Date(item.pubDate);
            if (!isNaN(parsed.getTime())) pubDate = parsed;
          }

          return {
            title: cleanHtml(item.title),
            source: source.name,
            url: item.link.split("?")[0], // Basic normalization of URL
            summary,
            category: categorize(item.title, summary, source.name),
            image_url: extractImage(item, rawDesc),
            published_at: pubDate.toISOString(),
          } as ProcessedArticle;
        })
        .filter((a): a is ProcessedArticle => a !== null);
    } catch (error) {
      console.error(`Error fetching feed ${source.name}:`, error);
      return [];
    }
  });

  const results = await Promise.all(feedPromises);
  results.forEach((items) => allArticles.push(...items));

  // Secondary memory deduplication (Title normalization check)
  const deduped: ProcessedArticle[] = [];
  const seenTitles = new Set<string>();

  for (const article of allArticles) {
    const normalizedTitle = article.title.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!seenTitles.has(normalizedTitle)) {
      seenTitles.add(normalizedTitle);
      deduped.push(article);
    }
  }

  return deduped;
}
