"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, TrendingUp, Sun, Moon, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "@/lib/themeStore";

const CATEGORIES = ["All", "Markets", "Economy", "AI Updates", "Global"];

interface NavbarProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Navbar({ activeCategory, setActiveCategory, searchQuery, setSearchQuery }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getThemeIcon = () => {
    if (theme === "black") return <Moon className="w-5 h-5" />;
    if (theme === "light") return <Sun className="w-5 h-5" />;
    return <Sparkles className="w-5 h-5" />;
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/60 backdrop-blur-2xl transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-1.5 group select-none">
              <div className="flex items-baseline">
                <span className="font-sans font-black text-5xl tracking-tighter text-foreground">
                  Fin
                </span>
                <span className="text-positive font-black text-5xl drop-shadow-sm font-hindi">
                  कर
                </span>
                <span className="ml-2 text-[11px] font-black tracking-[0.4em] text-muted transition-colors group-hover:text-accent">
                  NEWS
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 overflow-hidden ${
                  activeCategory === cat 
                    ? "text-white" 
                    : "text-muted hover:text-foreground"
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-accent shadow-lg shadow-accent/20 z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
            
            <Link
              href="/briefs"
              className="flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-muted hover:text-accent transition-all border border-transparent hover:border-accent/30"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Daily Brief
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* Theme Selector - Reader Mode Style */}
            <div className="flex items-center gap-1.5 p-1 bg-black/5 dark:bg-white/5 rounded-full border border-border/50">
              {(["light", "black", "paper"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    theme === t 
                      ? "border-accent scale-110 shadow-lg" 
                      : "border-transparent opacity-50 hover:opacity-100"
                  } ${
                    t === "light" ? "bg-white" : t === "black" ? "bg-zinc-900" : "bg-[#f4ecd8]"
                  }`}
                  title={`${t.charAt(0).toUpperCase() + t.slice(1)} Mode`}
                />
              ))}
            </div>
            
            <div className="flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 240, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="relative overflow-hidden"
                  >
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search news..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-card border border-border rounded-full py-1.5 pl-4 pr-10 text-[10px] uppercase font-black tracking-widest outline-none focus:border-accent transition-colors"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-accent"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 transition-colors rounded-full hover:bg-card border border-transparent hover:border-border ${isSearchOpen ? 'text-accent' : 'text-muted hover:text-foreground'}`}
              >
                {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Theme Selector */}
            <div className="flex items-center gap-2 p-1 bg-black/5 dark:bg-white/5 rounded-full border border-border/50 scale-90">
              {(["light", "black", "paper"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${
                    theme === t 
                      ? "border-accent shadow-lg" 
                      : "border-transparent opacity-50"
                  } ${
                    t === "light" ? "bg-white" : t === "black" ? "bg-zinc-900" : "bg-[#f4ecd8]"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-muted hover:text-foreground"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              <Link
                href="/briefs"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-black uppercase tracking-widest text-accent bg-accent/5 border border-accent/10 mb-2"
              >
                <Sparkles className="w-4 h-4" />
                Daily Brief
              </Link>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm font-black uppercase tracking-widest transition-colors ${
                    activeCategory === cat 
                      ? "bg-accent/10 text-accent border border-accent/20" 
                      : "text-muted hover:text-foreground hover:bg-card"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
