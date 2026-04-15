"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  bookmarks: string[]; // Array of article URLs
  readHistory: string[]; // Array of article URLs
  followedKeywords: string[];
  
  toggleBookmark: (url: string) => void;
  markAsRead: (url: string) => void;
  addKeyword: (keyword: string) => void;
  removeKeyword: (keyword: string) => void;
  isBookmarked: (url: string) => boolean;
  isRead: (url: string) => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      readHistory: [],
      followedKeywords: ["AI", "Markets", "Economy"],

      toggleBookmark: (url) => {
        const { bookmarks } = get();
        const isBookmarked = bookmarks.includes(url);
        if (isBookmarked) {
          set({ bookmarks: bookmarks.filter((b) => b !== url) });
        } else {
          set({ bookmarks: [...bookmarks, url] });
        }
      },

      markAsRead: (url) => {
        const { readHistory } = get();
        if (!readHistory.includes(url)) {
          set({ readHistory: [...readHistory, url] });
        }
      },

      addKeyword: (keyword) => {
        const { followedKeywords } = get();
        if (!followedKeywords.includes(keyword)) {
          set({ followedKeywords: [...followedKeywords, keyword] });
        }
      },

      removeKeyword: (keyword) => {
        const { followedKeywords } = get();
        set({ followedKeywords: followedKeywords.filter((k) => k !== keyword) });
      },

      isBookmarked: (url) => get().bookmarks.includes(url),
      isRead: (url) => get().readHistory.includes(url),
    }),
    {
      name: "finkar-user-storage",
    }
  )
);
