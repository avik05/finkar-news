"use client";

import { useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";

const CONCEPTS = [
  { term: "SIP", definition: "Systematic Investment Plan. Investing a fixed amount regularly rather than all at once." },
  { term: "P/E Ratio", definition: "Price-to-Earnings. Evaluates if stock markets represent realistic earnings capability." },
  { term: "Bull Market", definition: "Market directions trending upward steadily." }
];

export default function FinConcept() {
  const [index, setIndex] = useState(0);

  return (
    <div className="p-6 bg-card rounded-2xl border border-border flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 text-accent mb-4">
          <BookOpen className="w-5 h-5" />
          <span className="text-xs font-black tracking-widest uppercase">Finance 101</span>
        </div>
        <h3 className="text-2xl font-black mb-2 text-foreground">{CONCEPTS[index].term}</h3>
        <p className="text-sm text-muted leading-relaxed">{CONCEPTS[index].definition}</p>
      </div>
      <button 
        onClick={() => setIndex((prev) => (prev + 1) % CONCEPTS.length)}
        className="mt-6 flex items-center justify-center gap-2 py-2.5 px-4 bg-accent/20 hover:bg-accent/30 text-accent rounded-full text-xs font-bold uppercase transition-colors"
      >
        <span>Next Concept</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
