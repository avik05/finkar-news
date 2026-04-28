"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, TrendingUp, TrendingDown, Clock } from "lucide-react";
import InfoModal from "./InfoModal";
import { MACRO_SCENARIOS } from "@/data/macroScenarios";

export default function BullBearGame() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'feedback' | 'gameover'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds rapid fire
  
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [shuffledScenarios, setShuffledScenarios] = useState([...MACRO_SCENARIOS]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [history, setHistory] = useState<{scenario: typeof MACRO_SCENARIOS[0], isCorrect: boolean, guess: string}[]>([]);

  const startGame = () => {
    // Shuffle
    const shuffled = [...MACRO_SCENARIOS].sort(() => 0.5 - Math.random());
    setShuffledScenarios(shuffled);
    setCurrentScenarioIndex(0);
    setScore(0);
    setTimeLeft(60);
    setHistory([]);
    setGameState('playing');
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('gameover');
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleSwipe = (guess: 'bull' | 'bear') => {
    if (gameState !== 'playing') return;
    
    const current = shuffledScenarios[currentScenarioIndex];
    const isCorrect = guess === current.type;
    
    setFeedback(isCorrect ? 'correct' : 'wrong');
    setHistory(prev => [...prev, { scenario: current, isCorrect, guess }]);
    
    if (isCorrect) setScore(s => s + 10);
    else setScore(s => Math.max(0, s - 5)); // Penalty for wrong guess
    
    setGameState('feedback');
    
    setTimeout(() => {
      if (currentScenarioIndex + 1 < shuffledScenarios.length) {
        setCurrentScenarioIndex(prev => prev + 1);
        setGameState('playing');
      } else {
        // Reshuffle and keep going if time permits
        const reshuffled = [...MACRO_SCENARIOS].sort(() => 0.5 - Math.random());
        setShuffledScenarios(reshuffled);
        setCurrentScenarioIndex(0);
        setGameState('playing');
      }
    }, 1500); // Wait 1.5s to read the explanation
  };

  const current = shuffledScenarios[currentScenarioIndex];

  return (
    <div className="bg-card border border-border p-6 rounded-3xl shadow-xl relative overflow-hidden group">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-foreground tracking-tight">Market Sentiments</h2>
          <p className="text-xs text-muted font-medium mt-1 uppercase tracking-widest">Bull or Bear? (Macro)</p>
        </div>
        <button 
          onClick={() => setIsInfoOpen(true)}
          className="p-2 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-colors"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>

      {gameState === 'start' ? (
        <div className="bg-black/5 dark:bg-white/5 border border-border rounded-2xl p-8 text-center min-h-[250px] flex flex-col justify-center items-center">
          <TrendingUp className="w-12 h-12 text-accent mb-4" />
          <h3 className="text-xl font-bold mb-2 text-foreground">Rapid Fire Macro</h3>
          <p className="text-sm text-muted mb-6 max-w-xs mx-auto">Read the headline and guess the market reaction. You have 60 seconds.</p>
          <button 
            onClick={startGame}
            className="px-8 py-3 bg-accent text-white font-black uppercase tracking-widest rounded-full hover:bg-accent/90 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
          >
            Start Timer
          </button>
        </div>
      ) : gameState === 'gameover' ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/5 dark:bg-white/5 border border-border rounded-2xl p-6 min-h-[300px] max-h-[400px] flex flex-col relative overflow-hidden"
        >
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-border shrink-0">
            <div>
              <h3 className="text-2xl font-black text-foreground">Time's Up!</h3>
              <p className="text-xs text-muted font-bold uppercase tracking-widest mt-1">Score: <span className="text-accent text-sm">{score}</span></p>
            </div>
            <button 
              onClick={startGame}
              className="px-4 py-2 bg-accent text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-accent/90 transition-colors shadow-lg"
            >
              Play Again
            </button>
          </div>
          
          <div className="overflow-y-auto pr-2 space-y-4 custom-scrollbar flex-1">
            {history.length === 0 ? (
              <p className="text-muted text-center py-8">You didn't answer any scenarios!</p>
            ) : (
              history.map((item, idx) => (
                <div key={idx} className={`p-4 rounded-xl border ${item.isCorrect ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}>
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <p className="text-sm font-bold text-foreground leading-snug">"{item.scenario.text}"</p>
                    <span className={`shrink-0 text-xs font-black uppercase tracking-widest px-2 py-1 rounded-md ${item.isCorrect ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'}`}>
                      {item.isCorrect ? 'Correct' : 'Wrong'}
                    </span>
                  </div>
                  <p className="text-xs text-muted">
                    <span className="font-bold text-foreground">Explanation: </span>
                    {item.scenario.explanation}
                  </p>
                </div>
              ))
            )}
          </div>
        </motion.div>
      ) : (
        <div className="relative">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-4 px-2">
            <div className="text-sm font-bold text-muted uppercase">Score: <span className="text-accent text-lg">{score}</span></div>
            <div className={`text-xl font-black font-mono ${timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-foreground'}`}>
              00:{timeLeft.toString().padStart(2, '0')}
            </div>
          </div>

          {/* Card */}
          <div className="bg-black/5 dark:bg-white/5 border border-border rounded-2xl p-6 min-h-[180px] flex flex-col justify-center items-center text-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              {gameState === 'playing' ? (
                <motion.div
                  key={`q-${currentScenarioIndex}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="w-full"
                >
                  <p className="text-lg md:text-xl font-bold text-foreground leading-snug">"{current.text}"</p>
                </motion.div>
              ) : (
                <motion.div
                  key={`a-${currentScenarioIndex}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  <div className={`text-2xl font-black uppercase tracking-widest mb-2 ${feedback === 'correct' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {feedback === 'correct' ? 'Correct!' : 'Wrong!'}
                  </div>
                  <p className="text-xs font-medium text-foreground">{current.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex justify-between gap-4 mt-4">
            <button
              disabled={gameState === 'feedback'}
              onClick={() => handleSwipe('bear')}
              className={`flex-1 py-4 rounded-xl border font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                gameState === 'feedback' ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
              } bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500 hover:text-white`}
            >
              <TrendingDown className="w-5 h-5" /> Bearish
            </button>
            <button
              disabled={gameState === 'feedback'}
              onClick={() => handleSwipe('bull')}
              className={`flex-1 py-4 rounded-xl border font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                gameState === 'feedback' ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
              } bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500 hover:text-white`}
            >
              <TrendingUp className="w-5 h-5" /> Bullish
            </button>
          </div>
        </div>
      )}

      <InfoModal 
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        title="Market Sentiments"
        howToPlay={[
          "Read the headline scenario presented on the card.",
          "Quickly decide if this news is generally Bullish (Good for the stock market) or Bearish (Bad for the market).",
          "You have 60 seconds to score as many points as possible. Correct guesses give +10, wrong guesses deduct 5 points."
        ]}
        whatYouLearn="This game trains your intuition on macroeconomic forces. You will learn how factors like RBI interest rate decisions, inflation, foreign inflows (FIIs), and crude oil prices impact the Indian equity markets."
      />
    </div>
  );
}
