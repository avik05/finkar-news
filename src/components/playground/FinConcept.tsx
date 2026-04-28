"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, RefreshCw } from "lucide-react";

import { FINANCE_CONCEPTS, FinanceConcept } from "@/data/finConcepts";

export default function FinConcept() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledConcepts, setShuffledConcepts] = useState<FinanceConcept[]>([...FINANCE_CONCEPTS]);

  useEffect(() => {
    // Shuffle on mount so it's fresh every time the page loads
    setShuffledConcepts([...FINANCE_CONCEPTS].sort(() => 0.5 - Math.random()));
  }, []);

  // Auto-cycle the concept if they haven't flipped it, or they can manually refresh
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % shuffledConcepts.length);
    }, 300);
  };

  const currentConcept = shuffledConcepts[currentIndex];

  return (
    <div className="bg-card border border-border p-5 rounded-3xl shadow-xl relative overflow-hidden group perspective-1000 h-[280px]">
      <div className="flex justify-between items-center mb-4 relative z-20">
        <div>
          <h2 className="text-xl font-black text-foreground tracking-tight">Concept of the Day</h2>
          <p className="text-[10px] text-muted font-medium mt-0.5 uppercase tracking-widest">Interactive Lexicon</p>
        </div>
        <div>
          <button 
            onClick={handleNext} 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all text-xs font-bold uppercase tracking-widest border border-accent/20"
          >
             <RefreshCw className="w-3.5 h-3.5" /> Next
          </button>
        </div>
      </div>

      <div className="relative w-full h-[180px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <motion.div
          className="w-full h-full absolute preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-black/5 dark:bg-white/5 border border-border/50 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentConcept.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full flex flex-col items-center"
              >
                <h3 className="text-2xl font-black text-accent mb-2">{currentConcept.title}</h3>
                <p className="text-xs text-muted font-medium">{currentConcept.hook}</p>
                <ArrowRight className="w-4 h-4 text-muted mt-4 animate-bounce-x" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden bg-accent/10 border border-accent/20 rounded-2xl p-5 flex flex-col justify-center items-center text-center rotate-y-180">
            <p className="text-xs text-foreground leading-relaxed font-medium mb-3">
              {currentConcept.explanation}
            </p>
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-accent bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20">
              <span>{currentConcept.flow[0]}</span>
              <ArrowRight className="w-2.5 h-2.5" />
              <span>{currentConcept.flow[1]}</span>
              <ArrowRight className="w-2.5 h-2.5" />
              <span>{currentConcept.flow[2]}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
