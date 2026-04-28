import MainContent from "@/components/MainContent";
import { supabase } from "@/utils/supabase";
import { NewsArticle } from "@/types";
import { Suspense } from "react";
import { Metadata } from "next";

export const revalidate = 60;

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata(props: { searchParams: SearchParams }): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const readUrl = typeof searchParams.read === "string" ? searchParams.read : undefined;

  if (readUrl) {
    const { data: article } = await supabase
      .from("news_articles")
      .select("*")
      .eq("url", readUrl)
      .single();

    if (article) {
      const summaryText = article.summary || "Read the latest financial intelligence update.";
      return {
        title: `${article.title} | Finkar News`,
        description: summaryText,
        openGraph: {
          title: article.title,
          description: summaryText,
          images: article.image_url ? [article.image_url] : [],
          type: "article",
        },
        twitter: {
          card: "summary_large_image",
          title: article.title,
          description: summaryText,
          images: article.image_url ? [article.image_url] : [],
        },
      };
    }
  }

  return {
    title: "Finkar News | Automated Intelligence",
    description: "Your daily premium real-time insight dashboard.",
    openGraph: {
      title: "Finkar News",
      description: "Your daily premium real-time insight dashboard.",
      images: ["/icon.png"],
    },
  };
}

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
