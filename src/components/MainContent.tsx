"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NewsFeed from "@/components/NewsFeed";
import ReaderMode from "@/components/ReaderMode";
import QuickAccess from "@/components/QuickAccess";
import DailyBriefs from "@/components/DailyBriefs";
import { NewsArticle } from "@/types";
import { useReaderStore } from "@/lib/readerStore";

interface MainContentProps {
  articles: NewsArticle[];
}

export default function MainContent({ articles }: MainContentProps) {
  const { isOpen, url, openReader, closeReader } = useReaderStore();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const readUrl = searchParams.get("read");
    if (readUrl) {
      openReader(decodeURIComponent(readUrl));
    }
  }, [searchParams, openReader]);

  // Combined filtering logic
  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === "All" || article.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.source.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const showHero = activeCategory === "All" && searchQuery === "";
  const heroArticles = articles.slice(0, 15); // Increased to support main + side carousels
  const feedArticles = showHero ? filteredArticles.slice(15) : filteredArticles;

  return (
    <>
      <Navbar 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {showHero && (
            <>
              <motion.div
                key="hero"
                initial={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <HeroSection articles={articles} />
              </motion.div>
              
              <motion.div
                key="briefs"
                initial={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <DailyBriefs articles={
                  articles.filter(a => a.source === 'NewsBytes').length > 0
                    ? articles.filter(a => a.source === 'NewsBytes').slice(0, 10)
                    : articles.slice(20, 30)
                } />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
        <QuickAccess 
          activeCategory={activeCategory} 
          onCategorySelect={setActiveCategory} 
        />
        
        <NewsFeed 
          initialArticles={feedArticles} 
          activeCategory={activeCategory}
          searchQuery={searchQuery}
        />
      </main>

      <ReaderMode isOpen={isOpen} url={url} onClose={closeReader} />
      
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
