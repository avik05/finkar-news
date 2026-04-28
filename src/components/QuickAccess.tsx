"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  Globe, 
  Cpu, 
  Wallet, 
  Zap, 
  Search,
  Gamepad2,
  Newspaper
} from "lucide-react";
import Link from "next/link";

const TOPICS = [
  { id: "All", label: "All News", icon: Search, color: "text-zinc-500 dark:text-zinc-400", bg: "bg-zinc-500/10" },
  { id: "Markets", label: "Markets", icon: BarChart3, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "Economy", label: "Economy", icon: Wallet, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { id: "AI Updates", label: "AI & Tech", icon: Cpu, color: "text-purple-500", bg: "bg-purple-500/10" },
  { id: "Global", label: "Global", icon: Globe, color: "text-amber-500", bg: "bg-amber-500/10" },
];

interface QuickAccessProps {
  onCategorySelect: (category: string) => void;
  activeCategory: string;
}

export default function QuickAccess({ onCategorySelect, activeCategory }: QuickAccessProps) {
  return (
    <section className="py-4 md:py-6 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-2 w-full">
          
          {/* Title Section */}
          <div className="hidden lg:flex flex-col justify-center pr-4 border-r border-border/50">
            <h3 className="text-[9px] font-black uppercase tracking-widest text-muted">Quick Access</h3>
            <p className="text-xs text-foreground font-black tracking-tight mt-0.5">Explore Hub</p>
          </div>

          {/* Categories / Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-3 flex-1 lg:px-2">
            {TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => onCategorySelect(topic.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-300 group ${
                  activeCategory === topic.id 
                    ? "bg-accent border-accent text-white shadow-md shadow-accent/20" 
                    : "bg-black/5 dark:bg-white/5 border-transparent text-foreground hover:border-border hover:bg-black/10 dark:hover:bg-white/10"
                }`}
              >
                <div className={`p-1.5 rounded-md transition-colors ${activeCategory === topic.id ? "bg-white/20" : topic.bg}`}>
                  <topic.icon className={`w-3.5 h-3.5 ${activeCategory === topic.id ? "text-white" : topic.color}`} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">{topic.label}</span>
              </button>
            ))}
          </div>

          {/* Divider for Desktop */}
          <div className="hidden lg:block w-px h-8 bg-border/50 mx-2" />

          {/* Special Pages Gateways */}
          <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-3">
            <Link 
              href="/briefs"
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-500/40 text-foreground transition-all duration-300 group"
            >
              <div className="p-1.5 rounded-md bg-amber-500/20 group-hover:bg-amber-500 transition-colors duration-300">
                <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 group-hover:text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[7px] font-black uppercase tracking-widest text-amber-600/70 dark:text-amber-400/70 whitespace-nowrap">Flash Reads</span>
                <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Daily Brief</span>
              </div>
            </Link>

            <Link 
              href="/playground"
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 hover:border-indigo-500/40 text-foreground transition-all duration-300 group"
            >
              <div className="p-1.5 rounded-md bg-indigo-500/20 group-hover:bg-indigo-500 transition-colors duration-300">
                <Gamepad2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 group-hover:text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[7px] font-black uppercase tracking-widest text-indigo-600/70 dark:text-indigo-400/70 whitespace-nowrap">Gamified Learning</span>
                <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Playground</span>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
