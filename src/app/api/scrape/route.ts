import { NextRequest, NextResponse } from "next/server";
import { parseHTML } from "linkedom";
import { Readability } from "@mozilla/readability";
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
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      },
    });

    if (!response.ok) throw new Error("Could not reach site");
    const html = await response.text();

    // Use Linkedom - 10x lighter than JSDOM, perfect for Vercel
    const { document } = parseHTML(html);
    
    // Clean up unwanted elements before parsing to improve quality
    const unwanted = document.querySelectorAll("script, style, nav, footer, iframe, ads, .ads, .advertisement");
    unwanted.forEach(el => el.remove());

    const reader = new Readability(document);
    const article = reader.parse();

    if (!article || !article.content) throw new Error("Content extraction failed");

    // Post-process content to ensure images look good
    let cleanContent = article.content;
    
    // Ensure images have proper classes and are responsive
    cleanContent = cleanContent.replace(/<img/g, '<img class="rounded-2xl my-8 w-full h-auto object-cover shadow-lg"');

    return NextResponse.json({
      title: article.title,
      content: cleanContent,
      byline: article.byline || "Editorial Staff",
      siteName: article.siteName || new URL(url).hostname.replace('www.', ''),
    });

  } catch (error: any) {
    console.warn(`Linkedom failure for ${url}:`, error.message);
    
    // FAILSAFE: Fallback to Supabase summary with beautiful styling
    const { data } = await supabase
      .from('news_articles')
      .select('*')
      .eq('url', url)
      .single();

    if (data) {
      return NextResponse.json({
        title: data.title,
        content: `
          <div class="space-y-6">
            ${data.image_url ? `<img src="${data.image_url}" class="rounded-[2rem] w-full h-auto mb-10 shadow-2xl" />` : ''}
            <p class="text-xl leading-relaxed">${data.summary}</p>
            <div style="margin-top: 3rem; padding: 2rem; background: rgba(0,0,0,0.03); border-radius: 2rem; border: 1px dashed rgba(0,0,0,0.1); font-style: italic; font-size: 0.95em; line-height: 1.6;">
              Note: This article is protected or unreachable. Displaying the Finkar Intelligence summary instead.
            </div>
          </div>
        `,
        byline: "Intelligence Digest",
        siteName: data.source,
      });
    }

    return NextResponse.json({ error: "Content unavailable" }, { status: 500 });
  }
}
