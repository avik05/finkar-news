"use client";

import { useState, useEffect, useCallback } from "react";
import { generateSudoku, SudokuBoard, isSafe } from "@/lib/sudokuLogic";
import { motion } from "framer-motion";
import InfoModal from "./InfoModal";
import { Info } from "lucide-react";

export default function Sudoku() {
  const [board, setBoard] = useState<SudokuBoard>([]);
  const [initialBoard, setInitialBoard] = useState<SudokuBoard>([]);
  const [solvedBoard, setSolvedBoard] = useState<SudokuBoard>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [errors, setErrors] = useState<boolean[][]>([]);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const initGame = useCallback((diff: 'easy' | 'medium' | 'hard') => {
    const { initial, solved } = generateSudoku(diff);
    setInitialBoard(JSON.parse(JSON.stringify(initial)));
    setBoard(JSON.parse(JSON.stringify(initial)));
    setSolvedBoard(solved);
    setSelectedCell(null);
    setErrors(Array(9).fill(false).map(() => Array(9).fill(false)));
  }, []);

  useEffect(() => {
    initGame('medium');
  }, [initGame]);

  const handleCellClick = (r: number, c: number) => {
    if (initialBoard[r][c] !== null) return; // Can't select initial numbers
    setSelectedCell([r, c]);
  };

  const handleNumberInput = useCallback((num: number) => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    
    const newBoard = [...board];
    newBoard[r] = [...newBoard[r]];
    newBoard[r][c] = num;
    setBoard(newBoard);

    // Validate
    const newErrors = [...errors];
    newErrors[r] = [...newErrors[r]];
    if (num !== null && solvedBoard[r][c] !== num) {
      newErrors[r][c] = true;
    } else {
      newErrors[r][c] = false;
    }
    setErrors(newErrors);
  }, [selectedCell, board, solvedBoard, errors]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell) return;
      if (e.key >= '1' && e.key <= '9') {
        handleNumberInput(parseInt(e.key));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleNumberInput(null as any);
      } else if (e.key === 'ArrowUp' && selectedCell[0] > 0) {
        setSelectedCell([selectedCell[0] - 1, selectedCell[1]]);
      } else if (e.key === 'ArrowDown' && selectedCell[0] < 8) {
        setSelectedCell([selectedCell[0] + 1, selectedCell[1]]);
      } else if (e.key === 'ArrowLeft' && selectedCell[1] > 0) {
        setSelectedCell([selectedCell[0], selectedCell[1] - 1]);
      } else if (e.key === 'ArrowRight' && selectedCell[1] < 8) {
        setSelectedCell([selectedCell[0], selectedCell[1] + 1]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNumberInput, selectedCell]);

  if (board.length === 0) return <div className="animate-pulse h-96 bg-card rounded-2xl"></div>;

  return (
    <div className="bg-card border border-border p-6 rounded-3xl shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-500"></div>
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
          <h2 className="text-2xl font-black text-foreground tracking-tight">Executive Sudoku</h2>
          <p className="text-xs text-muted font-medium mt-1 uppercase tracking-widest">Logic & Focus Training</p>
        </div>
        <button 
          onClick={() => setIsInfoOpen(true)}
          className="p-2 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-colors"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>

      <div className="flex gap-2 mb-6 relative z-10">
        {(['easy', 'medium', 'hard'] as const).map(d => (
          <button
            key={d}
            onClick={() => { setDifficulty(d); initGame(d); }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
              difficulty === d ? 'bg-accent text-white' : 'bg-black/5 dark:bg-white/5 text-muted hover:bg-black/10 dark:hover:bg-white/10'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-9 gap-[1px] bg-border p-[1px] rounded-xl overflow-hidden relative z-10">
        {board.map((row, r) => (
          row.map((cell, c) => {
            const isInitial = initialBoard[r][c] !== null;
            const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;
            const isError = errors[r][c];
            
            // Check if current 3x3 box is fully correctly filled
            let isBoxCompleted = true;
            if (solvedBoard && solvedBoard.length > 0) {
              const startRow = Math.floor(r / 3) * 3;
              const startCol = Math.floor(c / 3) * 3;
              for (let i = startRow; i < startRow + 3; i++) {
                for (let j = startCol; j < startCol + 3; j++) {
                  if (board[i][j] === null || board[i][j] !== solvedBoard[i][j]) {
                    isBoxCompleted = false;
                    break;
                  }
                }
                if (!isBoxCompleted) break;
              }
            } else {
              isBoxCompleted = false;
            }

            // Box borders
            const borderBottom = r === 2 || r === 5 ? 'border-b-2 border-foreground/20' : '';
            const borderRight = c === 2 || c === 5 ? 'border-r-2 border-foreground/20' : '';

            return (
              <motion.div
                key={`${r}-${c}`}
                onClick={() => handleCellClick(r, c)}
                whileHover={!isInitial ? { scale: 0.95 } : {}}
                className={`
                  aspect-square flex items-center justify-center text-lg md:text-xl font-bold cursor-pointer transition-colors duration-500
                  ${borderBottom} ${borderRight}
                  ${isBoxCompleted 
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                    : isInitial 
                      ? 'bg-black/5 dark:bg-white/5 text-foreground/70 cursor-not-allowed' 
                      : 'bg-card'
                  }
                  ${isSelected ? '!bg-accent/20 ring-1 ring-inset ring-accent' : ''}
                  ${isError ? '!bg-rose-500/20 text-rose-500' : ''}
                  ${!isInitial && !isError && cell && !isBoxCompleted ? 'text-accent' : ''}
                `}
              >
                {cell || ''}
              </motion.div>
            )
          })
        ))}
      </div>

      <div className="grid grid-cols-5 md:grid-cols-9 gap-2 mt-6 relative z-10">
        {[1,2,3,4,5,6,7,8,9].map(num => (
          <button
            key={num}
            onClick={() => handleNumberInput(num)}
            className="aspect-square rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-border flex items-center justify-center text-lg font-bold text-foreground transition-all hover:scale-105 active:scale-95"
          >
            {num}
          </button>
        ))}
      </div>

      <InfoModal 
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        title="Executive Sudoku"
        howToPlay={[
          "Select an empty cell to highlight it.",
          "Use the on-screen numpad or your keyboard to input a number from 1 to 9.",
          "Every row, column, and 3x3 box must contain the digits 1-9 exactly once.",
          "Incorrect placements will be highlighted in red."
        ]}
        whatYouLearn="Sudoku sharpens logical deduction and pattern recognition—skills directly translatable to financial modeling, algorithmic trading, and complex problem-solving in fast-paced markets."
      />
    </div>
  );
}
