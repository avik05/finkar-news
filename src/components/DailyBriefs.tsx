"use client";

import { motion } from "framer-motion";
import { NewsArticle } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useReaderStore } from "@/lib/readerStore";
import { BookOpen, Clock, Play, ArrowRight } from "lucide-react";
import { useRef } from "react";

interface DailyBriefsProps {
  articles: NewsArticle[];
}

export default function DailyBriefs({ articles }: DailyBriefsProps) {
  const { openReader } = useReaderStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-2">60-Second Intelligence</h3>
            <h2 className="text-3xl md:text-5xl font-serif font-black tracking-tighter">Daily Brief</h2>
          </div>
          
          <Link 
            href="/briefs"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent/10 hover:bg-accent text-accent hover:text-white transition-all duration-500 border border-accent/20 group"
          >
            <span className="text-[10px] font-black uppercase tracking-widest">Enter Full Screen</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto px-4 md:px-[calc((100vw-1280px)/2+32px)] no-scrollbar snap-x snap-mandatory pb-8 pt-12"
        style={{ paddingLeft: 'max(1rem, calc((100vw - 80rem) / 2 + 2rem))', paddingRight: 'max(1rem, calc((100vw - 80rem) / 2 + 2rem))' }}
      >
          {articles.map((article, index) => {
            const matteColors = [
              "#3b4a3f", // Deep Sage
              "#3e4a59", // Dusty Blue
              "#4a3535", // Muted Burgundy
              "#2f3542", // Slate
              "#4d453e", // Mocha
              "#3d3d5c", // Muted Indigo
            ];
            const cardBg = matteColors[index % matteColors.length];

            return (
              <motion.div
                key={article.id}
                whileHover={{ y: -8, scale: 1.01 }}
                style={{ backgroundColor: cardBg }}
                className="flex-shrink-0 w-[85vw] md:w-[450px] h-[550px] md:h-[650px] relative rounded-[3rem] overflow-hidden group snap-center shadow-2xl border border-white/5"
              >
                {/* Background Image with subtle texture blend */}
                <div className="absolute inset-0">
                  {article.image_url ? (
                    <Image
                      src={article.image_url}
                      alt={article.title}
                      fill
                      className="object-cover opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-[3000ms]"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
                </div>

                {/* Content: Maximized for text */}
                <div className="absolute inset-0 p-10 md:p-14 flex flex-col h-full">
                  <h3 className="text-2xl md:text-4xl font-serif font-black text-white mb-6 leading-[1.1] tracking-tight shrink-0">
                    {article.title}
                  </h3>

                  <div className="flex-grow overflow-y-auto no-scrollbar pr-2">
                    <p className="text-base md:text-lg text-white/90 leading-relaxed font-medium text-justify line-clamp-[12] md:line-clamp-none">
                      {article.summary}
                    </p>
                  </div>
                  
                  {/* Subtle Separator */}
                  <div className="mt-8 w-12 h-0.5 bg-white/20 rounded-full shrink-0" />
                </div>
              </motion.div>
            );
          })}

        {/* View All Card */}
        <motion.div
          whileHover={{ x: 5 }}
          className="flex-shrink-0 w-[60vw] md:w-[200px] h-[500px] md:h-[550px] flex flex-col items-center justify-center gap-4 bg-card/20 border border-dashed border-border rounded-[2.5rem] group cursor-pointer snap-center"
        >
           <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
             <ArrowRight className="w-6 h-6" />
           </div>
           <span className="text-[10px] font-black uppercase tracking-widest text-muted">View More News</span>
        </motion.div>
      </div>
    </section>
  );
}
