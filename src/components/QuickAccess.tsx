"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  Globe, 
  Cpu, 
  Wallet, 
  Zap, 
  Search,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const TOPICS = [
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
    <section className="py-8 md:py-12 bg-card/30 border-y border-border backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="flex-shrink-0 text-center md:text-left">
            <p className="text-lg md:text-xl font-serif font-bold italic">Quick Access Hub</p>
          </div>

          <div className="grid grid-cols-2 md:flex items-center gap-3 md:gap-4 w-full md:w-auto">
            {TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => onCategorySelect(topic.id)}
                className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border transition-all duration-300 group ${
                  activeCategory === topic.id 
                    ? "bg-accent border-accent text-white shadow-xl shadow-accent/20 scale-105" 
                    : "bg-background border-border text-foreground hover:border-accent/50 hover:shadow-lg"
                }`}
              >
                <div className={`p-2 rounded-lg ${activeCategory === topic.id ? "bg-white/20" : topic.bg}`}>
                  <topic.icon className={`w-5 h-5 ${activeCategory === topic.id ? "text-white" : topic.color}`} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest">{topic.label}</span>
                {activeCategory === topic.id && <ArrowRight className="w-4 h-4 animate-bounce-x" />}
              </button>
            ))}
          </div>

          <Link 
            href="/briefs"
            className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border border-border bg-background text-foreground hover:border-accent hover:shadow-lg transition-all duration-300 group"
          >
            <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent transition-colors">
              <Zap className="w-5 h-5 text-accent group-hover:text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-widest text-muted group-hover:text-accent">Quick Reads</span>
              <span className="text-xs font-black uppercase tracking-widest">Daily Brief</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
