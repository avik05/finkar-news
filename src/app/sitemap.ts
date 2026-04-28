import { MetadataRoute } from "next";
import { supabase } from "@/utils/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://news.getfinkar.com";

  const staticRoutes = ["", "/briefs", "/playground"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "always" as const,
    priority: 1.0,
  }));

  try {
    const { data: articles } = await supabase
      .from("news_articles")
      .select("url")
      .order("published_at", { ascending: false })
      .limit(50);

    const dynamicRoutes = (articles || []).map((article) => ({
      url: `${baseUrl}/?read=${encodeURIComponent(article.url)}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));

    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    return staticRoutes;
  }
}
