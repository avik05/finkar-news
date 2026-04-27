import { create } from "zustand";

interface ReaderState {
  isOpen: boolean;
  url: string;
  openReader: (url: string) => void;
  closeReader: () => void;
}

export const useReaderStore = create<ReaderState>((set) => ({
  isOpen: false,
  url: "",
  openReader: (url) => set({ isOpen: true, url }),
  closeReader: () => set({ isOpen: false, url: "" }),
}));
