"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, TrendingUp, Sun, Moon, Sparkles, Bell, Newspaper, Zap, Gamepad2 } from "lucide-react";
import OneSignal from "react-onesignal";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "@/lib/themeStore";

const CATEGORIES = ["All", "Markets", "Economy", "AI Updates", "Global"];

interface NavbarProps {
  activeCategory?: string;
  setActiveCategory?: (cat: string) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export default function Navbar({ activeCategory, setActiveCategory, searchQuery, setSearchQuery }: NavbarProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("Notification" in window && Notification.permission === "granted") {
        setIsSubscribed(true);
      }

      try {
        const os = OneSignal as any;
        if (os.User && os.User.PushSubscription) {
          setIsSubscribed(os.User.PushSubscription.optedIn);
          os.User.PushSubscription.addEventListener("change", (event: any) => {
            setIsSubscribed(event.current?.optedIn);
          });
        }
      } catch (e) {}
    }
  }, []);

  const handleNotificationClick = () => {
    try {
      OneSignal.Slidedown.promptPush();
    } catch (e) {
      console.error("OneSignal prompt error:", e);
    }
  };

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

          <div className="hidden md:flex items-center justify-center flex-1 mx-8 gap-6">
            {/* Categories Block */}
            {setActiveCategory && (
              <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1.5 rounded-full border border-border/50 shadow-inner">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 overflow-hidden ${
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
              </div>
            )}
            
            {/* Main Links Block */}
            <div className={`flex items-center gap-1 ${setActiveCategory ? "pl-6 border-l border-border/50" : ""}`}>
              {!setActiveCategory && (
                <Link
                  href="/"
                  className="relative flex items-center justify-center gap-2 px-4 py-2 h-9 rounded-xl text-[10px] font-black uppercase tracking-widest text-foreground bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-accent/40 transition-all group overflow-hidden shadow-sm backdrop-blur-sm whitespace-nowrap"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out transition-transform" />
                  <Newspaper className="w-3.5 h-3.5 text-emerald-500" />
                  News
                </Link>
              )}

              <Link
                href="/briefs"
                className="relative flex items-center justify-center gap-2 px-4 py-2 h-9 rounded-xl text-[10px] font-black uppercase tracking-widest text-foreground bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-accent/40 transition-all group overflow-hidden shadow-sm backdrop-blur-sm whitespace-nowrap"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out transition-transform" />
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Daily Brief
              </Link>
              
              <Link
                href="/playground"
                className="relative flex items-center justify-center gap-2 px-4 py-2 h-9 rounded-xl text-[10px] font-black uppercase tracking-widest text-foreground bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-accent/40 transition-all group overflow-hidden shadow-sm backdrop-blur-sm whitespace-nowrap"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out transition-transform" />
                <Gamepad2 className="w-3.5 h-3.5 text-indigo-500" />
                Playground
              </Link>
            </div>
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
            
            {!isSubscribed && (
              <button 
                onClick={handleNotificationClick}
                className="p-2 transition-colors rounded-full hover:bg-card border border-transparent hover:border-border text-muted hover:text-foreground"
                title="Enable Notifications"
              >
                <Bell className="w-5 h-5" />
              </button>
            )}
            
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 240, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="absolute right-full mr-2 overflow-hidden z-50"
                  >
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search news..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery?.(e.target.value)}
                      className="w-full bg-card border border-border rounded-full py-1.5 pl-4 pr-10 text-[10px] uppercase font-black tracking-widest outline-none focus:border-accent transition-colors"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery?.("")}
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
              <div className="relative mb-3">
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery?.(e.target.value)}
                  className="w-full bg-card border border-border rounded-full py-2.5 pl-4 pr-10 text-[10px] uppercase font-black tracking-widest outline-none focus:border-accent transition-colors text-foreground"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
              </div>
              {!isSubscribed && (
                <button
                  onClick={handleNotificationClick}
                  className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-md text-sm font-black uppercase tracking-widest text-muted hover:text-foreground hover:bg-card border border-border/50 mb-3"
                >
                  <Bell className="w-4 h-4" />
                  <span>Enable Notifications</span>
                </button>
              )}
              {!setActiveCategory && (
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-black uppercase tracking-widest text-muted hover:text-accent hover:bg-accent/5 border border-transparent mb-2"
                >
                  <Newspaper className="w-4 h-4" />
                  News
                </Link>
              )}
              <Link
                href="/briefs"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-black uppercase tracking-widest text-amber-500 bg-amber-500/5 border border-amber-500/10 mb-2"
              >
                <Zap className="w-4 h-4" />
                Daily Brief
              </Link>
              <Link
                href="/playground"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-black uppercase tracking-widest text-indigo-500 bg-indigo-500/5 border border-indigo-500/10 mb-2"
              >
                <Gamepad2 className="w-4 h-4" />
                Playground
              </Link>
              {setActiveCategory && CATEGORIES.map((cat) => (
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
