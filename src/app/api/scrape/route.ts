import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) throw new Error("Could not reach site");
    const html = await response.text();

    // Lightweight Regex-based extraction (Faster and more reliable on Vercel)
    // 1. Extract Title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : "Article";

    // 2. Extract Article Content (Heuristic: Look for largest text blocks)
    // We remove scripts, styles, and navs first
    let cleanHtml = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "")
      .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, "")
      .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "");

    // Find the main content area (heuristically looking for <article> or <main> or large <div>)
    const articleMatch = cleanHtml.match(/<article[^>]*>([\s\S]*?)<\/article>/i) || 
                         cleanHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    
    let content = articleMatch ? articleMatch[1] : cleanHtml;

    // Further clean the content to keep only P, H1, H2, H3 tags
    content = content.replace(/<(?!p|h1|h2|h3|br|blockquote|\/p|\/h1|\/h2|\/h3|\/blockquote)[^>]+>/gi, "");

    if (content.length < 200) throw new Error("Content too short");

    return NextResponse.json({
      title,
      content,
      siteName: new URL(url).hostname.replace('www.', ''),
    });

  } catch (error: any) {
    console.warn(`Scraping fallback for ${url}:`, error.message);
    
    // FAILSAFE: Always fall back to Supabase summary
    const { data } = await supabase
      .from('news_articles')
      .select('*')
      .eq('url', url)
      .single();

    if (data) {
      return NextResponse.json({
        title: data.title,
        content: `<p>${data.summary}</p><div style="margin-top: 2rem; padding: 1.5rem; background: rgba(0,0,0,0.03); border-radius: 1.5rem; border: 1px dashed rgba(0,0,0,0.1); font-style: italic; font-size: 0.9em; line-height: 1.6;">Note: The full article couldn't be extracted in high-fidelity mode. Displaying the Finkar Intelligence summary instead.</div>`,
        byline: "Intelligence Digest",
        siteName: data.source,
      });
    }

    return NextResponse.json({ error: "Content unavailable" }, { status: 500 });
  }
}
