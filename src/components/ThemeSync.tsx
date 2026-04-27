"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/lib/themeStore";

export default function ThemeSync() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    // Apply the theme to the HTML element whenever it changes
    document.documentElement.setAttribute("data-theme", theme);
    
    // Also ensure it's saved in the storage (Zustand does this, but we're being extra safe)
    localStorage.setItem('theme-storage', JSON.stringify({
      state: { theme },
      version: 0
    }));
  }, [theme]);

  return null; // This component doesn't render anything
}
