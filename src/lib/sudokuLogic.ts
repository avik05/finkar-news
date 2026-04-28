// Sudoku generator and solver using backtracking

export type SudokuBoard = (number | null)[][];

const BLANK = null;

export function generateSudoku(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): { initial: SudokuBoard, solved: SudokuBoard } {
  let board: SudokuBoard = Array(9).fill(null).map(() => Array(9).fill(BLANK));
  
  // Fill diagonal 3x3 boxes first (they are independent)
  fillDiagonal(board);
  
  // Fill rest recursively
  solveSudoku(board);
  
  const solved = JSON.parse(JSON.stringify(board));
  
  // Remove numbers based on difficulty
  let cellsToRemove = 40;
  if (difficulty === 'easy') cellsToRemove = 30;
  if (difficulty === 'hard') cellsToRemove = 55;
  
  removeKDigits(board, cellsToRemove);
  
  return { initial: board, solved };
}

function fillDiagonal(board: SudokuBoard) {
  for (let i = 0; i < 9; i = i + 3) {
    fillBox(board, i, i);
  }
}

function fillBox(board: SudokuBoard, rowStart: number, colStart: number) {
  let num;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      do {
        num = Math.floor(Math.random() * 9) + 1;
      } while (!unUsedInBox(board, rowStart, colStart, num));
      board[rowStart + i][colStart + j] = num;
    }
  }
}

function unUsedInBox(board: SudokuBoard, rowStart: number, colStart: number, num: number) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[rowStart + i][colStart + j] === num) return false;
    }
  }
  return true;
}

function solveSudoku(board: SudokuBoard): boolean {
  let row = -1;
  let col = -1;
  let isEmpty = false;
  
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === BLANK) {
        row = i;
        col = j;
        isEmpty = true;
        break;
      }
    }
    if (isEmpty) break;
  }
  
  if (!isEmpty) return true;
  
  for (let num = 1; num <= 9; num++) {
    if (isSafe(board, row, col, num)) {
      board[row][col] = num;
      if (solveSudoku(board)) return true;
      board[row][col] = BLANK;
    }
  }
  return false;
}

export function isSafe(board: SudokuBoard, row: number, col: number, num: number): boolean {
  // Check row
  for (let d = 0; d < 9; d++) {
    if (board[row][d] === num) return false;
  }
  // Check col
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === num) return false;
  }
  // Check box
  let boxRowStart = row - row % 3;
  let boxColStart = col - col % 3;
  for (let r = 0; r < 3; r++) {
    for (let d = 0; d < 3; d++) {
      if (board[r + boxRowStart][d + boxColStart] === num) return false;
    }
  }
  return true;
}

function removeKDigits(board: SudokuBoard, k: number) {
  let count = k;
  while (count !== 0) {
    let cellId = Math.floor(Math.random() * 81);
    let i = Math.floor(cellId / 9);
    let j = cellId % 9;
    
    if (board[i][j] !== BLANK) {
      board[i][j] = BLANK;
      count--;
    }
  }
}
