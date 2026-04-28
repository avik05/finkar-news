import Navbar from "@/components/Navbar";
import Sudoku from "@/components/playground/Sudoku";
import HigherLowerGame from "@/components/playground/HigherLowerGame";
import BullBearGame from "@/components/playground/BullBearGame";
import FinConcept from "@/components/playground/FinConcept";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground | Finkar News",
  description: "Interactive finance modules, simulations, and brain-training games for the modern executive.",
};

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-12 md:pb-24">
        <div className="mb-8 max-w-3xl">
          <span className="text-[10px] font-black px-2 py-0.5 rounded-sm bg-accent/20 text-accent uppercase tracking-widest border border-accent/30 mb-4 inline-block">
            Beta Labs
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground mb-4">
            The <span className="text-accent">Playground</span>
          </h1>
          <p className="text-lg text-muted font-medium leading-relaxed">
            Gamified financial concepts, valuation duels, and executive focus training. 
            Designed specifically for MBA students and market enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Column 1 */}
          <div className="space-y-8 md:space-y-12">
            <Sudoku />
            <FinConcept />
          </div>

          {/* Column 2 */}
          <div className="space-y-8 md:space-y-12">
            <HigherLowerGame />
            <BullBearGame />
          </div>
        </div>
      </main>
    </div>
  );
}
