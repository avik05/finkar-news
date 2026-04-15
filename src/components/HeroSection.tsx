"use client";

import { motion } from "framer-motion";
import NewsCard from "./NewsCard";
import { NewsArticle } from "@/types";
import { TrendingUp, Clock, ChevronRight } from "lucide-react";
import Image from "next/image";

import { formatTimeAgo } from "@/utils/format";
import { useUserStore } from "@/lib/userStore";

const SOURCE_LOGOS: Record<string, string> = {
  "Mint": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Mint_%28newspaper%29_logo.svg",
  "Economic Times": "https://upload.wikimedia.org/wikipedia/commons/c/c5/The_Economic_Times_logo.svg",
  "Business Standard": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Business_Standard_logo.svg",
  "Financial Express": "https://upload.wikimedia.org/wikipedia/commons/9/9f/The_Financial_Express_%28India%29_Logo.svg",
  "Reuters": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Reuters_logo_2024.svg",
  "CNBC": "https://upload.wikimedia.org/wikipedia/commons/e/e3/CNBC_logo.svg",
  "TechCrunch AI": "https://upload.wikimedia.org/wikipedia/commons/b/b1/TechCrunch_logo.svg",
  "Hugging Face": "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
  "MIT Tech Review": "https://upload.wikimedia.org/wikipedia/commons/e/e0/MIT_Technology_Review_modern_logo.svg",
  "VentureBeat AI": "https://logo.clearbit.com/venturebeat.com?size=512",
  "TechBuzz AI": "https://logo.clearbit.com/techbuzz.ai?size=512",
  "Hacker News": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Y_Combinator_logo.svg",
};

export default function HeroSection({ 
  articles, 
  onOpenFocus 
}: { 
  articles: NewsArticle[], 
  onOpenFocus: (article: NewsArticle) => void 
}) {
  const { markAsRead } = useUserStore();

  if (!articles || articles.length === 0) return null;

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 3);

  const handleArticleClick = (article: NewsArticle) => {
    markAsRead(article.url);
    onOpenFocus(article);
  };
  const sourceLogo = SOURCE_LOGOS[mainArticle.source] || `https://logo.clearbit.com/${mainArticle.source.toLowerCase().replace(/\s+/g, '')}.com?size=512`;

  return (
    <section className="py-8 md:py-12 border-b border-border bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-accent mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Featured Intelligence</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-black tracking-editorial leading-tight">
              Market <span className="text-muted italic">Spotlight</span>
            </h1>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Main Feature */}
          <motion.div
            onClick={() => handleArticleClick(mainArticle)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 group relative flex flex-col justify-end min-h-[400px] md:min-h-[550px] rounded-3xl overflow-hidden bg-card border border-border cursor-pointer"
          >
            {mainArticle.image_url ? (
              <Image
                src={mainArticle.image_url}
                alt={mainArticle.title}
                fill
                className="object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
              />
            ) : (
              <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
                {/* Large Background Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-[0.05] grayscale brightness-0 invert pointer-events-none">
                  <Image 
                    src={sourceLogo} 
                    alt="" 
                    fill 
                    className="object-contain p-24"
                    unoptimized 
                  />
                </div>
                {/* Mesh Gradient */}
                <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" 
                     style={{ background: 'radial-gradient(circle at 0% 0%, var(--accent) 0%, transparent 50%), radial-gradient(circle at 100% 100%, #22c55e 0%, transparent 50%)' }}>
                </div>
                {/* Tech Grid */}
                <div className="absolute inset-0 opacity-5 pointer-events-none" 
                     style={{ backgroundImage: `radial-gradient(var(--border) 1px, transparent 0)`, backgroundSize: '40px 40px' }}>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            
            <div className="relative p-6 md:p-10 z-10 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em] border border-accent/30">
                  {mainArticle.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted font-medium">
                  <Clock className="w-3 h-3" />
                  {formatTimeAgo(mainArticle.published_at)}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-[1.1] mb-6 tracking-editorial group-hover:underline decoration-accent/50 underline-offset-8 decoration-2">
                {mainArticle.title}
              </h2>
              <p className="text-white/80 text-lg max-w-2xl line-clamp-2 font-medium mb-6 leading-relaxed">
                {mainArticle.summary}
              </p>
              <div className="flex items-center gap-2 text-white font-bold text-sm tracking-wide group/btn">
                <span>Read Analysis</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* Side Panel */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {sideArticles.map((article, idx) => (
              <motion.div
                key={article.id}
                onClick={() => handleArticleClick(article)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.1 * (idx + 1) } }}
                className="flex-1 group bg-card border border-border p-6 rounded-[2rem] hover:border-muted transition-all hover:shadow-xl cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-black text-muted uppercase tracking-widest">{article.source}</span>
                </div>
                <h3 className="text-xl font-serif font-bold leading-snug mb-3 group-hover:text-accent transition-colors tracking-editorial">
                  {article.title}
                </h3>
                <p className="text-sm text-muted line-clamp-2 leading-relaxed mb-4">
                  {article.summary}
                </p>
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted mt-auto">
                  <span>{formatTimeAgo(article.published_at)}</span>
                  <span className="text-accent group-hover:underline underline-offset-4">Insights</span>
                </div>
              </motion.div>
            ))}
            
            {/* Minimal Stock Pulse / Market Status indicator */}
            {/* Market Status removed as per user request */}
          </div>
        </div>
      </div>
    </section>
  );
}
