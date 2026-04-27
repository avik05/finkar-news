import MainContent from "@/components/MainContent";
import { supabase } from "@/utils/supabase";
import { NewsArticle } from "@/types";
import { Suspense } from "react";

// Build trigger: 2026-04-27T17:31:30 - Grand Bundle Edition
export const revalidate = 60;

export default async function Home() {
  // Fetch general news
  const { data: generalData } = await supabase
    .from('news_articles')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(100);

  // Specifically fetch NewsBytes for the Daily Brief section
  const { data: briefData } = await supabase
    .from('news_articles')
    .select('*')
    .eq('source', 'NewsBytes')
    .order('published_at', { ascending: false })
    .limit(20);

  const articles = [...(generalData || []), ...(briefData || [])] as NewsArticle[];
  const uniqueArticles = Array.from(new Map(articles.map(item => [item.url, item])).values());

  return (
    <Suspense fallback={
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <MainContent articles={uniqueArticles} />
    </Suspense>
  );
}
