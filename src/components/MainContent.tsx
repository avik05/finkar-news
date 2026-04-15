"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NewsFeed from "@/components/NewsFeed";
import AdvancedSearch from "@/components/AdvancedSearch";
import SourceStats from "@/components/SourceStats";
import FocusMode from "@/components/FocusMode";
import { NewsArticle } from "@/types";
import { useUserStore } from "@/lib/userStore";
import { formatTimeAgo } from "@/utils/format";
import { Sparkles, Bookmark, Zap } from "lucide-react";

interface MainContentProps {
  articles: NewsArticle[];
}

export default function MainContent({ articles }: MainContentProps) {
  const [activeTab, setActiveTab] = useState<"All" | "For You" | "Bookmarks">("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ category: "All", source: "All" });
  const [focusedArticle, setFocusedArticle] = useState<NewsArticle | null>(null);

  const { bookmarks, followedKeywords } = useUserStore();

  const categories = Array.from(new Set(articles.map(a => a.category)));
  const sources = Array.from(new Set(articles.map(a => a.source)));

  // Filtered dataset based on tab
  const tabArticles = (() => {
    switch (activeTab) {
      case "Bookmarks":
        return articles.filter(a => bookmarks.includes(a.url));
      case "For You":
        return articles.filter(a => {
          const text = (a.title + " " + a.summary).toLowerCase();
          return followedKeywords.some(k => text.includes(k.toLowerCase()));
        });
      default:
        return articles;
    }
  })();

  // Refined filtering logic
  const filteredArticles = tabArticles.filter(article => {
    const matchesCategory = filters.category === "All" || article.category === filters.category;
    const matchesSource = filters.source === "All" || article.source === filters.source;
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.source.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSource && matchesSearch;
  });

  const showHero = activeTab === "All" && filters.category === "All" && filters.source === "All" && searchQuery === "";
  const heroArticles = articles.slice(0, 3);
  const feedArticles = showHero ? filteredArticles.slice(3) : filteredArticles;

  const handleOpenFocus = (article: NewsArticle) => {
    setFocusedArticle(article);
  };

  return (
    <>
      <Navbar 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <main className="flex-1 max-w-7xl mx-auto px-4 w-full py-8">
        <AdvancedSearch 
          onSearch={setSearchQuery}
          onFilterChange={setFilters}
          categories={categories}
          sources={sources}
        />

        <div className="flex items-center justify-between mb-12 border-b border-border/50 pb-4 overflow-x-auto gap-8 no-scrollbar">
          <div className="flex items-center gap-1 md:gap-4">
            <button
              onClick={() => setActiveTab("All")}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === "All" ? "bg-accent text-white shadow-lg shadow-accent/20" : "text-muted hover:text-foreground"
              }`}
            >
              <Zap className="w-4 h-4" />
              Intelligence Feed
            </button>
            <button
              onClick={() => setActiveTab("For You")}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === "For You" ? "bg-accent text-white shadow-lg shadow-accent/20" : "text-muted hover:text-foreground"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              For You
            </button>
            <button
              onClick={() => setActiveTab("Bookmarks")}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === "Bookmarks" ? "bg-accent text-white shadow-lg shadow-accent/20" : "text-muted hover:text-foreground"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              Bookmarks
            </button>
          </div>
          
          <div className="hidden lg:block text-[10px] font-black uppercase tracking-[0.3em] text-muted">
            {filteredArticles.length} News Points Found
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {showHero && (
                <motion.div
                  key="hero"
                  initial={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="overflow-hidden mb-12"
                >
                  <HeroSection articles={heroArticles} onOpenFocus={handleOpenFocus} />
                </motion.div>
              )}
            </AnimatePresence>
            
            <NewsFeed 
              initialArticles={feedArticles} 
              activeCategory={filters.category}
              searchQuery={searchQuery}
              onOpenFocus={handleOpenFocus}
            />
          </div>

          <aside className="lg:col-span-3 space-y-12">
            <SourceStats articles={articles} />
            <div className="bg-zinc-900/30 border border-border rounded-3xl p-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-4">
                Personalization
              </h4>
              <p className="text-xs text-muted leading-relaxed mb-6 font-medium">
                Following {followedKeywords.length} topics. Mark articles as read to refine your Intelligence Profile.
              </p>
              <div className="flex flex-wrap gap-2">
                {followedKeywords.map(k => (
                  <span key={k} className="px-2 py-1 rounded-lg bg-zinc-800 text-[10px] font-bold text-zinc-400 border border-zinc-700">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <FocusMode 
        isOpen={!!focusedArticle} 
        onClose={() => setFocusedArticle(null)}
        article={focusedArticle ? {
          ...focusedArticle,
          timeAgo: formatTimeAgo(focusedArticle.published_at),
        } : null}
      />
      
      <footer className="border-t border-border bg-card py-12 text-center text-muted transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-baseline justify-center gap-1 mb-4 opacity-60">
            <span className="font-sans font-black text-3xl tracking-tighter text-foreground">Fin</span>
            <span className="text-positive font-black text-3xl font-hindi">कर</span>
            <span className="text-xs font-black tracking-[0.3em] ml-1">NEWS</span>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-[10px] font-black uppercase tracking-widest">
            <span>© {new Date().getFullYear()} All rights reserved</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-border"></span>
            <span>Automated Financial Intelligence</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-border"></span>
            <span>Built by Avik Majumdar</span>
          </div>
        </div>
      </footer>
    </>
  );
}
