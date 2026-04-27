import { NextRequest, NextResponse } from "next/server";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import { supabase } from "@/utils/supabase";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    // 1. Attempt to fetch the article
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
      next: { revalidate: 3600 } // Cache the fetch for 1 hour
    });

    if (!response.ok) throw new Error("Could not reach site");

    let html = await response.text();
    
    // 2. Truncate HTML to prevent JSDOM from timing out on Vercel
    // Most articles are in the first 150KB. Ads/Footers are at the bottom.
    if (html.length > 150000) {
      html = html.substring(0, 150000) + "</body></html>";
    }

    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article || !article.content) throw new Error("Parsing failed");

    return NextResponse.json({
      title: article.title,
      content: article.content,
      byline: article.byline,
      siteName: article.siteName,
    });

  } catch (error: any) {
    console.warn(`Scraping failed for ${url}, falling back to DB summary. Error:`, error.message);
    
    // 3. FAILSAFE: Fallback to Supabase Summary
    try {
      const { data } = await supabase
        .from('news_articles')
        .select('*')
        .eq('url', url)
        .single();

      if (data) {
        return NextResponse.json({
          title: data.title,
          content: `<p>${data.summary}</p><div style="margin-top: 2rem; padding: 1rem; background: rgba(0,0,0,0.05); border-radius: 1rem; font-style: italic;">Note: The full article couldn't be extracted from the source site. Displaying the intelligence summary instead.</div>`,
          byline: "Intelligence Digest",
          siteName: data.source,
        });
      }
    } catch (dbError) {
      console.error("Database fallback failed:", dbError);
    }

    return NextResponse.json({ error: "Could not extract content" }, { status: 500 });
  }
}
