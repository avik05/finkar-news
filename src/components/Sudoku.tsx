"use client";

import { useState } from "react";

const INITIAL_PUZZLE = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

export default function Sudoku() {
  const [board, setBoard] = useState(INITIAL_PUZZLE);

  const updateCell = (r: number, c: number, v: number) => {
    const updated = board.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === r && cIdx === c ? v : cell))
    );
    setBoard(updated);
  };

  return (
    <div className="p-6 bg-card rounded-2xl border border-border">
      <h3 className="text-lg font-bold mb-4">Sudoku Challenge</h3>
      <div className="grid grid-cols-9 gap-1 max-w-xs mx-auto">
        {board.map((row, r) =>
          row.map((cell, c) => (
            <input
              key={`${r}-${c}`}
              type="text"
              maxLength={1}
              value={cell === 0 ? "" : cell}
              onChange={(e) => updateCell(r, c, parseInt(e.target.value) || 0)}
              className="w-8 h-8 text-center text-sm font-bold bg-zinc-900 border border-zinc-700 text-white rounded focus:outline-none focus:border-accent"
            />
          ))
        )}
      </div>
    </div>
  );
}
