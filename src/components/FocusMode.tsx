"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Clock, Share2 } from "lucide-react";
import Image from "next/image";
import TickerLink from "./TickerLink";
import ShareButton from "./ShareButton";

interface FocusModeProps {
  isOpen: boolean;
  onClose: () => void;
  article: {
    title: string;
    source: string;
    url: string;
    summary: string;
    category: string;
    timeAgo: string;
    imageUrl?: string;
    tickers?: string[];
  } | null;
}

export default function FocusMode({ isOpen, onClose, article }: FocusModeProps) {
  if (!article) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] cursor-zoom-out"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-x-[15%] md:inset-y-[10%] lg:inset-x-[25%] lg:inset-y-[15%] bg-card border border-border rounded-[32px] shadow-2xl z-[101] overflow-hidden flex flex-col"
          >
            {/* Header / Close Button */}
            <div className="absolute top-6 right-6 z-10">
              <button
                onClick={onClose}
                className="p-3 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white border border-white/10 transition-all active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Scrollable Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12">
              {/* Category & Source */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[10px] font-black px-3 py-1 rounded-full bg-accent text-white uppercase tracking-widest">
                  {article.category}
                </span>
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                  {article.source}
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <Clock className="w-3 h-3" />
                  {article.timeAgo}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif font-bold text-3xl md:text-5xl leading-tight mb-8 tracking-editorial">
                {article.title}
              </h2>

              {/* Tickers */}
              {article.tickers && article.tickers.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-8">
                  {article.tickers.map((t) => (
                    <TickerLink key={t} ticker={t} />
                  ))}
                </div>
              )}

              {/* Image if available */}
              {article.imageUrl && (
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-12 border border-border">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Summary / Body */}
              <div className="prose prose-invert max-w-none">
                <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-medium mb-12">
                  {article.summary}
                </p>
                <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6 mb-12 text-sm text-accent/80 leading-relaxed">
                  <p>
                    This is an automated summary of the article from {article.source}.
                    For the full story, including detailed charts and expert analysis, please visit the source below.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-8 border-t border-border bg-card/80 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-4">
                <ShareButton title={article.title} url={article.url} />
                <button 
                  onClick={() => window.open(article.url, "_blank")}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-colors active:scale-95"
                >
                  Read Full Article
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              <p className="hidden md:block text-[10px] font-black uppercase tracking-widest text-muted">
                FINKAR INTELLIGENCE ENGINE v4.2
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
