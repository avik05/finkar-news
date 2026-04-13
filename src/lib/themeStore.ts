"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "dark" | "light" | "paper";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.setAttribute("data-theme", theme);
      },
      toggleTheme: () => {
        set((state) => {
          const nextTheme: Theme = 
            state.theme === "dark" 
              ? "light" 
              : state.theme === "light" 
                ? "paper" 
                : "dark";
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
