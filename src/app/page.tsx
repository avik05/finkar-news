import MainContent from "@/components/MainContent";
import { supabase } from "@/utils/supabase";
import { NewsArticle } from "@/types";

export const revalidate = 60; // Revalidate every 60 seconds to keep feed fresh

export default async function Home() {
  const { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(100);

  const articles = (data || []) as NewsArticle[];
  
  if (error) {
    console.error("Supabase fetch error:", error);
  }

  return <MainContent articles={articles} />;
}
