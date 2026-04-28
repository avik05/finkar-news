"use client";

import { useState } from "react";
import Sudoku from "@/components/Sudoku";
import FinConcept from "@/components/FinConcept";
import Navbar from "@/components/Navbar";

export default function Playground() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <main className="max-w-4xl mx-auto px-4 py-24">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-tighter text-foreground mb-3">Gazette Playground</h1>
          <p className="text-muted text-sm">Interactive coffee-break modules mapping advanced engagement.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Sudoku />
          <FinConcept />
        </div>
      </main>
    </div>
  );
}
