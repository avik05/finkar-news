"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function PromoFooter() {
  return (
    <div className="relative mt-12 p-8 rounded-2xl bg-gradient-to-r from-card to-accent/5 border border-accent/20 overflow-hidden group">
      <div className="absolute top-1/2 right-4 -translate-y-1/2 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors"></div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="max-w-xl">
          <span className="text-[9px] font-black px-2 py-0.5 rounded-sm bg-accent/20 text-accent uppercase tracking-widest border border-accent/30 mb-3 inline-block">
            Take Control
          </span>
          <h4 className="font-sans font-black text-2xl tracking-tighter text-foreground mb-2">
            Loved the read? Optimize your overall wealth.
          </h4>
          <p className="text-xs text-muted leading-relaxed">
            Pair fast financial intelligence with advanced dashboarding. Track assets in complete isolation.
          </p>
        </div>

        <Link 
          href="https://getfinkar.com/" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-md shadow-accent/20 self-start md:self-auto shrink-0"
        >
          <span>Try Finkar Free</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
