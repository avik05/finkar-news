"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "black" | "light" | "paper";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "paper",
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.setAttribute("data-theme", theme);
      },
      toggleTheme: () => {
        set((state) => {
          const nextTheme: Theme = 
            state.theme === "paper" 
              ? "light" 
              : state.theme === "light" 
                ? "black" 
                : "paper";
          document.documentElement.setAttribute("data-theme", nextTheme);
          return { theme: nextTheme };
        });
      },
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.setAttribute("data-theme", state.theme);
        }
      },
    }
  )
);
