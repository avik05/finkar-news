"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PromoCard() {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-gradient-to-br from-card via-card to-accent/5 border border-accent/20 rounded-3xl overflow-hidden hover:border-accent/40 transition-all duration-300 hover:shadow-xl cursor-pointer min-h-[300px] justify-between p-8"
    >
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-500"></div>
      
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[9px] font-black px-2 py-0.5 rounded-sm bg-accent/20 text-accent uppercase tracking-widest border border-accent/30">
            Featured Platform
          </span>
        </div>
        
        <h3 className="font-sans font-black text-3xl tracking-tighter text-foreground leading-none mb-4">
          Fin<span className="text-positive font-hindi">कर</span> Dashboard
        </h3>
        
        <p className="text-sm text-muted leading-relaxed font-medium mb-6">
          Connect your accounts, track total net worth, and receive smart analytics triggers inside a unified monitoring hub.
        </p>

        <div className="relative w-full aspect-[16/9] mb-6 rounded-xl overflow-hidden border border-border/50 bg-black/5">
          <Image
            src="/finkar-screenshot.png"
            alt="Finkar Dashboard Preview"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            unoptimized
          />
        </div>
      </div>

      <Link 
        href="https://getfinkar.com/" 
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-accent hover:bg-accent/90 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-md shadow-accent/20 mt-auto"
      >
        <span>Track Wealth</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </Link>
    </motion.div>
  );
}
