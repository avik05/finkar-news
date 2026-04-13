"use client";

import NewsCard from "./NewsCard";
import { NewsArticle } from "@/types";

const CATEGORIES = ["All", "Markets", "Economy", "Companies", "Global"];

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
  
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  return `${Math.floor(diffInHours / 24)}d ago`;
}

interface NewsFeedProps {
  initialArticles: NewsArticle[];
  activeCategory: string;
  searchQuery?: string;
}

export default function NewsFeed({ initialArticles, activeCategory, searchQuery }: NewsFeedProps) {
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
                {...news} 
                timeAgo={formatTimeAgo(news.published_at)}
                imageUrl={news.image_url || undefined} 
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
