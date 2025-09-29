import { create } from 'zustand';

type ThemeMode = 'light' | 'dark' | 'sepia';

type AppState = {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
};

export const useAppStore = create<AppState>()((set) => ({
  theme: 'light',
  setTheme: (mode) => set({ theme: mode })
}));
