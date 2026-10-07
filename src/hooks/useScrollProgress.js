import { create } from 'zustand';

// Using Zustand for scroll progress to prevent React from re-rendering the entire component tree
// 60 times a second. Components that need it can subscribe directly.

export const useScrollProgress = create((set) => ({
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}));
