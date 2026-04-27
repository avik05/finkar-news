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
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) throw new Error("Could not reach site");
    const html = await response.text();

    try {
      // 1. ATTEMPT HIGH-FIDELITY EXTRACTION (Works on Vercel)
      const { parseHTML } = require("linkedom");
      const { Readability } = require("@mozilla/readability");

      const { document } = parseHTML(html);
      const unwanted = document.querySelectorAll("script, style, nav, footer, iframe, ads, .ads, .advertisement");
      unwanted.forEach((el: any) => el.remove());

      const reader = new Readability(document);
      const article = reader.parse();

      if (article && article.content) {
        let cleanContent = article.content;
        cleanContent = cleanContent.replace(/<img/g, '<img class="rounded-2xl my-8 w-full h-auto object-cover shadow-lg"');
        
        return NextResponse.json({
          title: article.title,
          content: cleanContent,
          byline: article.byline || "Editorial Staff",
          siteName: article.siteName || new URL(url).hostname.replace('www.', ''),
        });
      }
      throw new Error("Readability failed");

    } catch (e) {
      // 2. FALLBACK TO LIGHTWEIGHT REGEX (Works on Localhost without linkedom)
      console.log("Using lightweight fallback for:", url);
      
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : "Article";

      let content = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");

      const articleMatch = content.match(/<article[^>]*>([\s\S]*?)<\/article>/i) || 
                           content.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
      
      let cleanContent = articleMatch ? articleMatch[1] : content;
      cleanContent = cleanContent.replace(/<(?!p|h1|h2|h3|br|blockquote|img|\/p|\/h1|\/h2|\/h3|\/blockquote)[^>]+>/gi, "");

      return NextResponse.json({
        title,
        content: cleanContent,
        byline: "Fast Mode",
        siteName: new URL(url).hostname.replace('www.', ''),
      });
    }

  } catch (error: any) {
    // 3. DATABASE FALLBACK (Failsafe)
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
          </div>
        `,
        byline: "Intelligence Digest",
        siteName: data.source,
      });
    }

    return NextResponse.json({ error: "Content unavailable" }, { status: 500 });
  }
}
