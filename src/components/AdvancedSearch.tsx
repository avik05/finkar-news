"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AdvancedSearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: { category: string; source: string }) => void;
  categories: string[];
  sources: string[];
}

export default function AdvancedSearch({ 
  onSearch, 
  onFilterChange, 
  categories, 
  sources 
}: AdvancedSearchProps) {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSource, setSelectedSource] = useState("All");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  const handleFilterChange = (cat: string, src: string) => {
    setSelectedCategory(cat);
    setSelectedSource(src);
    onFilterChange({ category: cat, source: src });
  };

  // Keyboard shortcut for focus (Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-12 z-20">
      <div className="relative flex items-center">
        <div className="absolute left-6 text-muted">
          <Search className="w-5 h-5" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search financial intelligence... (⌘K)"
          className="w-full bg-card border border-border rounded-full py-5 pl-14 pr-32 text-lg focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all outline-none"
        />
        <div className="absolute right-3 flex items-center gap-2">
          {query && (
            <button 
              onClick={() => setQuery("")}
              className="p-2 hover:bg-zinc-800 rounded-full text-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
              showFilters || selectedCategory !== "All" || selectedSource !== "All"
                ? "bg-accent text-white border-accent"
                : "bg-zinc-900 text-muted border-zinc-800 hover:border-zinc-700"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest hidden md:block">Filters</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-4 p-8 bg-card border border-border rounded-[32px] shadow-2xl overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Categories */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-4 px-1">
                  Topic Classification
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["All", ...categories].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleFilterChange(cat, selectedSource)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedCategory === cat
                          ? "bg-accent text-white"
                          : "bg-zinc-900 text-muted hover:text-foreground border border-transparent hover:border-zinc-700"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sources */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-4 px-1">
                  Intelligence Sources
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["All", ...sources].map((src) => (
                    <button
                      key={src}
                      onClick={() => handleFilterChange(selectedCategory, src)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedSource === src
                          ? "bg-accent text-white"
                          : "bg-zinc-900 text-muted hover:text-foreground border border-transparent hover:border-zinc-700"
                      }`}
                    >
                      {src}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {(selectedCategory !== "All" || selectedSource !== "All") && (
              <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between">
                <button
                  onClick={() => handleFilterChange("All", "All")}
                  className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-accent transition-colors underline underline-offset-4"
                >
                  Clear all filters
                </button>
                <div className="text-[10px] font-bold text-muted/40 uppercase tracking-widest">
                  Filtering results in real-time
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
