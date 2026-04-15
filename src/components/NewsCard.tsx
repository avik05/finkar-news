"use client";

import { motion } from "framer-motion";
import { ExternalLink, Clock } from "lucide-react";
import Image from "next/image";
import { useState, MouseEvent, useMemo } from "react";
import { useUserStore } from "@/lib/userStore";
import TickerLink from "./TickerLink";
import ShareButton from "./ShareButton";
import { Heart, CheckCircle2 } from "lucide-react";

interface NewsCardProps {
  id?: string;
  title: string;
  source: string;
  url: string;
  summary: string;
  category: string;
  timeAgo: string;
  imageUrl?: string;
  isFeatured?: boolean;
  tickers?: string[];
  onOpenFocus?: () => void;
}

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

export default function NewsCard({
  id,
  title,
  source,
  url,
  summary,
  category,
  timeAgo,
  imageUrl,
  isFeatured = false,
  tickers = [],
  onOpenFocus,
}: NewsCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const { toggleBookmark, isBookmarked, markAsRead, isRead } = useUserStore();
  const bookmarked = isBookmarked(url);
  const read = isRead(url);

  // Fallback ticker detection if not provided by backend
  const displayTickers = useMemo(() => {
    if (tickers && tickers.length > 0) return tickers;
    const combinedText = title + " " + summary;
    const detected = new Set<string>();
    const regex = /(?:\$|\()([A-Z]{2,6})(?:\)|)/g;
    let match;
    while ((match = regex.exec(combinedText)) !== null) {
      if (match[1]) detected.add(match[1]);
    }
    return Array.from(detected);
  }, [tickers, title, summary]);

  const handleCardClick = (e: MouseEvent) => {
    // If they click on the Ticker or Share button, don't trigger anything else
    if ((e.target as HTMLElement).closest("a, button")) return;
    
    e.preventDefault();
    markAsRead(url);
    if (onOpenFocus) {
      onOpenFocus();
    } else {
      window.open(url, "_blank");
    }
  };

  const handleBookmark = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(url);
  };

  const sourceLogo = SOURCE_LOGOS[source] || `https://logo.clearbit.com/${source.toLowerCase().replace(/\s+/g, '')}.com?size=512`;

  return (
    <motion.div
      onClick={handleCardClick}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group flex flex-col bg-card border border-border rounded-3xl overflow-hidden hover:border-muted transition-all duration-300 hover:shadow-lg cursor-pointer ${
        isFeatured ? "md:flex-row md:col-span-2 lg:col-span-3 min-h-[350px]" : "h-full"
      } ${read ? "opacity-60 saturate-[0.8]" : "opacity-100"}`}
    >
      <div className={`${isFeatured ? "md:w-1/2" : "w-full aspect-video"} relative overflow-hidden bg-white/95 flex items-center justify-center p-12 group-hover:bg-white transition-colors`}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            onLoadingComplete={() => setIsLoaded(true)}
            className={`object-cover group-hover:scale-105 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            {!logoError ? (
              <Image
                src={sourceLogo}
                alt={source}
                fill
                className="object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-700"
                onError={() => setLogoError(true)}
                unoptimized
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <span className="font-serif font-black text-3xl text-zinc-800 tracking-tighter">{source}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Intelligence Source</span>
              </div>
            )}
          </div>
        )}
        {/* Subtle grid pattern overlay for depth */}
        {!imageUrl && (
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(var(--border) 1px, transparent 0)`, backgroundSize: '24px 24px' }}></div>
        )}
      </div>
      <div className={`p-6 flex flex-col ${isFeatured && imageUrl ? "md:w-1/2" : "w-full flex-1"}`}>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black px-2 py-0.5 rounded-sm bg-accent/10 text-accent uppercase tracking-widest border border-accent/20">
              {category}
            </span>
            {read && (
              <span className="flex items-center gap-1 text-[8px] font-bold text-muted/60 uppercase tracking-widest">
                <CheckCircle2 className="w-3 h-3 text-emerald-500/50" />
                Seen
              </span>
            )}
          </div>
          <button 
            onClick={handleBookmark}
            className={`p-1.5 rounded-full transition-all ${bookmarked ? "text-accent bg-accent/10" : "text-muted hover:text-accent hover:bg-accent/5"}`}
          >
            <Heart className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
          </button>
        </div>
        
        <h3 className={`font-serif font-bold tracking-editorial leading-tight mb-3 group-hover:text-accent transition-colors ${isFeatured ? "text-3xl" : "text-xl"}`}>
          {title}
        </h3>
        
        <p className="text-sm text-muted line-clamp-3 mb-4 leading-relaxed font-medium">
          {summary}
        </p>

        {displayTickers.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {displayTickers.map((t) => (
              <TickerLink key={t} ticker={t} />
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-muted pt-4 border-t border-border mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-foreground/80">{source}</span>
            <span className="w-1 h-1 rounded-full bg-border"></span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {timeAgo}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ShareButton title={title} url={url} />
            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
