"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, TrendingUp, TrendingDown } from "lucide-react";
import InfoModal from "./InfoModal";

// Approximate Data for Indian Companies (2024 Estimates in INR)
const COMPANIES = [
  { name: "Reliance Ind.", sector: "Conglomerate", rev: "₹9.7 Lakh Cr", pe: 28, mc: 19.5, margin: 9, dividend: 0.3 },
  { name: "TCS", sector: "IT Services", rev: "₹2.3 Lakh Cr", pe: 30, mc: 14.2, margin: 19, dividend: 1.8 },
  { name: "HDFC Bank", sector: "Banking", rev: "₹2.0 Lakh Cr", pe: 19, mc: 11.5, margin: 22, dividend: 1.1 },
  { name: "Infosys", sector: "IT Services", rev: "₹1.5 Lakh Cr", pe: 24, mc: 6.2, margin: 16, dividend: 2.4 },
  { name: "SBI", sector: "Banking", rev: "₹4.7 Lakh Cr", pe: 9, mc: 6.8, margin: 14, dividend: 1.6 },
  { name: "Bharti Airtel", sector: "Telecom", rev: "₹1.4 Lakh Cr", pe: 60, mc: 7.2, margin: 8, dividend: 0.6 },
  { name: "ITC", sector: "FMCG", rev: "₹0.7 Lakh Cr", pe: 26, mc: 5.4, margin: 28, dividend: 3.2 },
  { name: "L&T", sector: "Construction", rev: "₹1.8 Lakh Cr", pe: 35, mc: 4.8, margin: 7, dividend: 0.9 },
  { name: "Tata Motors", sector: "Automotive", rev: "₹3.5 Lakh Cr", pe: 16, mc: 3.4, margin: 6, dividend: 0.6 },
  { name: "Adani Ent.", sector: "Conglomerate", rev: "₹1.4 Lakh Cr", pe: 120, mc: 3.2, margin: 2, dividend: 0.1 },
  { name: "Zomato", sector: "Tech", rev: "₹0.1 Lakh Cr", pe: 150, mc: 1.6, margin: 2, dividend: 0.0 },
  { name: "HUL", sector: "FMCG", rev: "₹0.6 Lakh Cr", pe: 55, mc: 5.8, margin: 16, dividend: 1.8 }
];

type GameMode = 'market_cap' | 'margin' | 'pe' | 'dividend';

const MODES: Record<GameMode, { title: string, question: string, valueSuffix: string, valuePrefix: string, getAValue: (c: any) => number, renderHints: (c: any) => React.ReactNode }> = {
  market_cap: {
    title: "The Valuation Duel",
    question: "Market Capitalization",
    valuePrefix: "₹",
    valueSuffix: "L Cr",
    getAValue: (c) => c.mc,
    renderHints: (c) => (
      <>
        <div className="flex flex-col items-center"><span className="font-bold text-muted">Rev: {c.rev}</span></div>
        <div className="flex flex-col items-center"><span className="font-bold text-muted">Margin: {c.margin}%</span></div>
        <div className="flex flex-col items-center"><span className="font-bold text-muted">P/E: {c.pe}</span></div>
      </>
    )
  },
  margin: {
    title: "The Profitability Duel",
    question: "Net Profit Margin",
    valuePrefix: "",
    valueSuffix: "%",
    getAValue: (c) => c.margin,
    renderHints: (c) => (
      <>
        <div className="flex flex-col items-center"><span className="font-bold text-muted">Rev: {c.rev}</span></div>
        <div className="flex flex-col items-center"><span className="font-bold text-muted">MCap: ₹{c.mc}L</span></div>
        <div className="flex flex-col items-center"><span className="font-bold text-muted">P/E: {c.pe}</span></div>
      </>
    )
  },
  pe: {
    title: "The Growth Duel",
    question: "P/E Ratio",
    valuePrefix: "",
    valueSuffix: "x",
    getAValue: (c) => c.pe,
    renderHints: (c) => (
      <>
        <div className="flex flex-col items-center"><span className="font-bold text-muted">Rev: {c.rev}</span></div>
        <div className="flex flex-col items-center"><span className="font-bold text-muted">Margin: {c.margin}%</span></div>
        <div className="flex flex-col items-center"><span className="font-bold text-muted">MCap: ₹{c.mc}L</span></div>
      </>
    )
  },
  dividend: {
    title: "The Cash Cow Duel",
    question: "Dividend Yield",
    valuePrefix: "",
    valueSuffix: "%",
    getAValue: (c) => c.dividend,
    renderHints: (c) => (
      <>
        <div className="flex flex-col items-center"><span className="font-bold text-muted">MCap: ₹{c.mc}L</span></div>
        <div className="flex flex-col items-center"><span className="font-bold text-muted">Margin: {c.margin}%</span></div>
        <div className="flex flex-col items-center"><span className="font-bold text-muted">P/E: {c.pe}</span></div>
      </>
    )
  }
};

export default function HigherLowerGame() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const [compA, setCompA] = useState(COMPANIES[0]);
  const [compB, setCompB] = useState(COMPANIES[1]);
  const [currentMode, setCurrentMode] = useState<GameMode>('market_cap');
  
  const [gameState, setGameState] = useState<'playing' | 'revealing' | 'gameover'>('playing');
  const [lastGuess, setLastGuess] = useState<'higher' | 'lower' | null>(null);

  const startNewGame = useCallback((keepScore = false) => {
    const aIdx = Math.floor(Math.random() * COMPANIES.length);
    let bIdx = Math.floor(Math.random() * COMPANIES.length);
    while (bIdx === aIdx) bIdx = Math.floor(Math.random() * COMPANIES.length);
    
    // Pick random mode
    const modeKeys: GameMode[] = ['market_cap', 'margin', 'pe', 'dividend'];
    const randomMode = modeKeys[Math.floor(Math.random() * modeKeys.length)];
    
    setCurrentMode(randomMode);
    setCompA(COMPANIES[aIdx]);
    setCompB(COMPANIES[bIdx]);
    if (!keepScore) setScore(0);
    setGameState('playing');
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const handleGuess = (guess: 'higher' | 'lower') => {
    if (gameState !== 'playing') return;
    
    setLastGuess(guess);
    setGameState('revealing');
    
    const modeConfig = MODES[currentMode];
    const valA = modeConfig.getAValue(compA);
    const valB = modeConfig.getAValue(compB);
    
    const isHigher = valB >= valA;
    const isCorrect = (guess === 'higher' && isHigher) || (guess === 'lower' && !isHigher);
    
    setTimeout(() => {
      if (isCorrect) {
        setScore(s => {
          const newScore = s + 1;
          if (newScore > highScore) setHighScore(newScore);
          return newScore;
        });
        
        // Next round: B becomes A, pick a new B, pick a new Mode
        const modeKeys: GameMode[] = ['market_cap', 'margin', 'pe', 'dividend'];
        setCurrentMode(modeKeys[Math.floor(Math.random() * modeKeys.length)]);
        
        setCompA(compB);
        let nextBIdx = Math.floor(Math.random() * COMPANIES.length);
        while (COMPANIES[nextBIdx].name === compB.name) {
          nextBIdx = Math.floor(Math.random() * COMPANIES.length);
        }
        setCompB(COMPANIES[nextBIdx]);
        setGameState('playing');
      } else {
        setGameState('gameover');
      }
    }, 1500);
  };

  const mode = MODES[currentMode];
  const valA = mode.getAValue(compA);
  const valB = mode.getAValue(compB);

  return (
    <div className="bg-card border border-border p-6 rounded-3xl shadow-xl relative overflow-hidden group">
      <div className="flex justify-between items-center mb-6">
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMode}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <h2 className="text-2xl font-black text-foreground tracking-tight">{mode.title}</h2>
              <p className="text-xs text-muted font-medium mt-1 uppercase tracking-widest">Guess the {mode.question}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-muted font-bold uppercase">Score: <span className="text-accent text-lg">{score}</span></div>
            <div className="text-[10px] text-muted uppercase">Best: {highScore}</div>
          </div>
          <button 
            onClick={() => setIsInfoOpen(true)}
            className="p-2 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-colors"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      {gameState === 'gameover' ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/5 dark:bg-white/5 border border-border rounded-2xl p-8 text-center min-h-[300px] flex flex-col justify-center items-center"
        >
          <h3 className="text-3xl font-black text-rose-500 mb-2">Game Over!</h3>
          <p className="text-muted mb-6">You scored <span className="font-bold text-foreground">{score}</span>.</p>
          <button 
            onClick={() => startNewGame(false)}
            className="px-6 py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-colors shadow-lg"
          >
            Play Again
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative min-h-[300px]">
          
          {/* Mobile Score */}
          <div className="sm:hidden flex justify-between items-center mb-2 px-2 absolute top-0 left-0 right-0 z-20">
            <div className="text-xs font-bold text-muted uppercase">Score: <span className="text-accent text-sm">{score}</span></div>
          </div>

          {/* Company A */}
          <div className="bg-black/5 dark:bg-white/5 border border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden mt-6 md:mt-0">
            <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest text-muted">{compA.sector}</div>
            <h3 className="text-2xl font-black text-foreground mt-4 mb-2">{compA.name}</h3>
            
            <div className="flex gap-4 text-xs mb-6">
              {mode.renderHints(compA)}
            </div>

            <p className="text-[10px] font-bold uppercase text-muted mb-1">{mode.question}</p>
            <div className="text-3xl font-black text-emerald-500 tracking-tighter">
              {mode.valuePrefix}{valA}{mode.valueSuffix}
            </div>
          </div>

          {/* VS Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-black italic shadow-xl z-10 hidden md:flex border-4 border-card">
            VS
          </div>

          {/* Company B */}
          <div className="bg-black/5 dark:bg-white/5 border border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden mt-2 md:mt-0">
            <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest text-muted">{compB.sector}</div>
            <h3 className="text-2xl font-black text-foreground mt-4 mb-2">{compB.name}</h3>
            
            <div className="flex gap-4 text-xs mb-6">
              {mode.renderHints(compB)}
            </div>

            <p className="text-[10px] font-bold uppercase text-muted mb-1">has a {mode.question}</p>
            
            {gameState === 'playing' ? (
              <div className="flex flex-col gap-2 mt-2 w-full max-w-[200px]">
                <button 
                  onClick={() => handleGuess('higher')}
                  className="w-full py-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold rounded-xl border border-emerald-500/30 hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <TrendingUp className="w-5 h-5" /> HIGHER
                </button>
                <button 
                  onClick={() => handleGuess('lower')}
                  className="w-full py-2.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold rounded-xl border border-rose-500/30 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <TrendingDown className="w-5 h-5" /> LOWER
                </button>
              </div>
            ) : (
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-3xl font-black tracking-tighter flex items-center gap-2 mt-2"
              >
                <span className={
                  (lastGuess === 'higher' && valB >= valA) || (lastGuess === 'lower' && valB < valA) 
                    ? 'text-emerald-500' 
                    : 'text-rose-500'
                }>
                  {mode.valuePrefix}{valB}{mode.valueSuffix}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      )}

      <InfoModal 
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        title="Multi-Mode Valuation Duel"
        howToPlay={[
          "The game randomly cycles between 4 financial modes every round.",
          "1. Valuation Duel: Guess the Market Cap. (Math: Revenue × Net Margin × P/E Ratio).",
          "2. Profitability Duel: Guess the Net Profit Margin. (Math: Net Income ÷ Total Revenue).",
          "3. Growth Duel: Guess the P/E Ratio. (Math: Market Cap ÷ Net Income).",
          "4. Cash Cow Duel: Guess the Dividend Yield. (Math: Annual Dividend per Share ÷ Share Price).",
          "Analyze the fundamental 'hints' provided and guess HIGHER or LOWER to build a streak!"
        ]}
        whatYouLearn="All data is based on real-world approximations for top Indian companies (FY24). This game trains your intuition across multiple valuation dimensions with actual mathematics. You'll mathematically see that Tech companies have high margins but low dividends, PSU Banks have high dividends but low P/E, and massive revenue doesn't always equal massive Market Cap if growth expectations are low."
      />
    </div>
  );
}
