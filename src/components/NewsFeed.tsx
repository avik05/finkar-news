"use client";

import NewsCard from "./NewsCard";
import { NewsArticle } from "@/types";
import { formatTimeAgo } from "@/utils/format";

interface NewsFeedProps {
  initialArticles: NewsArticle[];
  activeCategory: string;
  searchQuery?: string;
  onOpenFocus: (article: NewsArticle) => void;
}

export default function NewsFeed({ 
  initialArticles, 
  activeCategory, 
  searchQuery,
  onOpenFocus
}: NewsFeedProps) {
  const displayedArticles = initialArticles;

  return (
    <section id="feed" className="py-12 bg-background min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <div>
            <h2 className="text-3xl font-serif font-bold tracking-editorial mb-2">
              {searchQuery ? `Results for "${searchQuery}"` : "Live Insight Feed"}
            </h2>
            <p className="text-sm text-muted font-medium">Real-time financial intelligence from global streams.</p>
          </div>
        </div>

        {displayedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedArticles.map((news) => (
              <NewsCard 
                key={news.id} 
                title={news.title}
                source={news.source}
                url={news.url}
                summary={news.summary}
                category={news.category}
                timeAgo={formatTimeAgo(news.published_at)}
                imageUrl={news.image_url || undefined}
                tickers={news.tickers}
                onOpenFocus={() => onOpenFocus(news)}
              />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center text-muted border border-dashed border-border rounded-3xl bg-card/30">
            <p className="font-serif italic text-lg text-muted/50">
              No matching intelligence found {searchQuery ? `for "${searchQuery}"` : `in ${activeCategory}`} right now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
