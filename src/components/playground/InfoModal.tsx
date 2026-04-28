"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Info, X, Lightbulb } from "lucide-react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  howToPlay: string[];
  whatYouLearn: string;
}

export default function InfoModal({ isOpen, onClose, title, howToPlay, whatYouLearn }: InfoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-card border border-border rounded-2xl p-6 shadow-2xl z-[101]"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-black tracking-tight text-foreground">{title}</h2>
              <button onClick={onClose} className="p-1 text-muted hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4" /> How to Play
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted">
                  {howToPlay.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">{step}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-positive mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> Educational Value
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {whatYouLearn}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-colors"
            >
              Got it, let's play!
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
