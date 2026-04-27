import MainContent from "@/components/MainContent";
import { supabase } from "@/utils/supabase";
import { NewsArticle } from "@/types";

export const revalidate = 60; // Revalidate every 60 seconds to keep feed fresh

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
  
  // Deduplicate by URL just in case
  const uniqueArticles = Array.from(new Map(articles.map(item => [item.url, item])).values());

  return <MainContent articles={uniqueArticles} />;
}
