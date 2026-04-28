"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NewsArticle } from "@/types";
import { Clock, BookOpen, ChevronLeft, ChevronRight, Globe, Cpu } from "lucide-react";
import Image from "next/image";
import { useReaderStore } from "@/lib/readerStore";

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
  
  // Use Math.abs and a 'Just now' fallback to prevent negative weirdness
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${Math.max(1, diffInMinutes)}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  return `${Math.floor(diffInHours / 24)}d ago`;
}

interface CarouselProps {
  articles: NewsArticle[];
  height: string;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  isSmall?: boolean;
  className?: string;
  categoryIcon?: any;
}

function HeroCarousel({ 
  articles, 
  height, 
  autoPlayInterval = 6000, 
  showIndicators = true, 
  isSmall = false,
  className = "",
  categoryIcon: Icon
}: CarouselProps) {
  const { openReader } = useReaderStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (articles.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [articles.length, autoPlayInterval]);

  if (!articles || articles.length === 0) return null;

  const currentArticle = articles[currentIndex];

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    } else if (info.offset.x > threshold) {
      setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
    }
  };

  const categoryFallbacks: Record<string, string> = {
    "Markets": "/assets/market_fallback.png",
    "AI Updates": "/assets/ai_fallback.png",
    "Economy": "/assets/market_fallback.png",
    "Global": "/assets/global_fallback.png",
  };

  const fallbackImage = categoryFallbacks[currentArticle.category] || "/assets/market_fallback.png";

  return (
    <div className={`relative ${height} w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-black/20 bg-zinc-950 border border-border ${className}`}>
      <AnimatePresence>
        <motion.div
          key={currentArticle.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          onClick={() => openReader(currentArticle.url)}
          className="absolute inset-0 cursor-pointer touch-pan-y"
        >
          {/* Main Background Image or Premium Fallback */}
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src={currentArticle.image_url || fallbackImage}
              alt={currentArticle.title}
              fill
              className={`object-cover ${currentArticle.image_url ? 'opacity-60' : 'opacity-40'} transition-transform duration-[10s] ease-linear scale-100 group-hover:scale-110`}
              priority={currentIndex === 0}
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none"></div>
          
          {/* Top Label for Side Banners */}
          {isSmall && Icon && (
            <div className="absolute top-4 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full z-20">
              <Icon className="w-3 h-3 text-accent" />
              <span className="text-[8px] font-black uppercase tracking-widest text-white">{currentArticle.category}</span>
            </div>
          )}

          {/* Content overlay */}
          <div className={`absolute bottom-0 left-0 w-full flex flex-col justify-end gap-4 z-10 pointer-events-none ${isSmall ? "p-4 md:p-6" : "p-6 md:p-10"}`}>
            <div className="pointer-events-auto">
              <div className={`flex items-center gap-3 ${isSmall ? "mb-1" : "mb-2"}`}>
                {!isSmall && (
                  <span className="px-2 py-0.5 rounded-full bg-accent text-white text-[7px] font-black uppercase tracking-widest">
                    {currentArticle.category}
                  </span>
                )}
                <span className="text-[8px] text-white/60 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  {formatTimeAgo(currentArticle.published_at)}
                </span>
              </div>
              
              <h2 className={`font-serif font-bold text-white leading-tight mb-2 tracking-editorial line-clamp-2 ${isSmall ? "text-base md:text-xl" : "text-xl sm:text-2xl md:text-4xl lg:text-5xl"}`}>
                {currentArticle.title}
              </h2>
              
              <p className={`text-white/60 font-medium font-serif italic leading-relaxed hidden md:line-clamp-2 ${isSmall ? "text-[10px]" : "text-xs md:text-sm"}`}>
                {currentArticle.summary}
              </p>
            </div>

            <div className={`flex items-center justify-between ${isSmall ? "mt-1" : "mt-2"}`}>
              <div className={`flex items-center gap-2 text-white/40 font-black uppercase tracking-[0.2em] transition-all ${isSmall ? "text-[6px]" : "text-[8px]"} opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-500`}>
                <BookOpen className={isSmall ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} />
                <span>Tap to Read</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation - Minimal */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-30">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
          }}
          className="p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all"
        >
          <ChevronLeft className="w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((prev) => (prev + 1) % articles.length);
          }}
          className="p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all"
        >
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Indicators */}
      {showIndicators && articles.length > 1 && (
        <div className="absolute bottom-4 left-6 flex items-center gap-1.5 z-20">
          {articles.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-500 rounded-full ${
                currentIndex === idx ? "w-6 h-1 bg-accent" : "w-1 h-1 bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function HeroSection({ articles }: { articles: NewsArticle[] }) {
  if (!articles || articles.length === 0) return null;

  const SPORTS_KEYWORDS = ["cricket", "t20", "runs", "wicket", "ipl", "football", "goal", "match", "score", "tennis", "olympics"];
  
  const filteredArticles = articles.filter(article => {
    const content = `${article.title} ${article.category}`.toLowerCase();
    return !SPORTS_KEYWORDS.some(keyword => content.includes(keyword));
  });

  // 1. Extract Global for Top Side (up to 5)
  const globalPool = filteredArticles.filter(a => a.category === "Global").slice(0, 5);
  const globalIds = new Set(globalPool.map(a => a.id));

  // 2. Extract AI Updates for Bottom Side (up to 5)
  const aiPool = filteredArticles.filter(a => a.category === "AI Updates").slice(0, 5);
  const aiIds = new Set(aiPool.map(a => a.id));

  // 3. Main Hero gets Top 5 articles that are NOT in Global or AI pools
  const mainPool = filteredArticles
    .filter(a => !globalIds.has(a.id) && !aiIds.has(a.id))
    .slice(0, 5);

  // Fallbacks if categories are empty
  const sidePool1 = globalPool.length > 0 ? globalPool : filteredArticles.slice(5, 10);
  const sidePool2 = aiPool.length > 0 ? aiPool : filteredArticles.slice(10, 15);

  return (
    <section className="relative py-8 md:py-12 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Main Hero Carousel - All News */}
          <div className="lg:col-span-8">
            <HeroCarousel 
              articles={mainPool} 
              height="h-[450px] md:h-[550px]" 
              autoPlayInterval={6000}
            />
          </div>

          {/* Side Hero Banners */}
          <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8">
            {/* Global News Carousel */}
            <HeroCarousel 
              articles={sidePool1} 
              height="h-[210px] md:h-[260px]" 
              autoPlayInterval={8000}
              showIndicators={false}
              isSmall={true}
              categoryIcon={Globe}
            />
            {/* AI News Carousel */}
            <HeroCarousel 
              articles={sidePool2} 
              height="h-[210px] md:h-[260px]" 
              autoPlayInterval={10000}
              showIndicators={false}
              isSmall={true}
              categoryIcon={Cpu}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
