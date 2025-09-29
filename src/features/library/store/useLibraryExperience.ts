import { create } from 'zustand';

export type ExperienceView = 'library' | 'reader' | 'audio' | 'ai' | 'stats' | 'settings';

export type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
  progress: number;
  rating: number;
  isPremium: boolean;
  hasAudio: boolean;
  isDownloaded: boolean;
  isFavorite: boolean;
  genre: string;
  content?: string[];
};

export type OnboardingPreferences = {
  theme: 'light' | 'dark' | 'sepia';
  language: string;
  interests: string[];
  readingGoal: 'casual' | 'moderate' | 'intensive';
  preferredFormat: 'text' | 'audio' | 'both';
};

interface ExperienceState {
  activeView: ExperienceView;
  selectedBook: Book | null;
  isPremium: boolean;
  showPremiumModal: boolean;
  userPreferences: OnboardingPreferences | null;
  setActiveView: (view: ExperienceView) => void;
  setSelectedBook: (book: Book | null) => void;
  openPremiumModal: () => void;
  closePremiumModal: () => void;
  upgradeToPremium: () => void;
  setUserPreferences: (prefs: OnboardingPreferences) => void;
  setPremium: (value: boolean) => void;
}

export const useLibraryExperience = create<ExperienceState>()((set) => ({
  activeView: 'library',
  selectedBook: null,
  isPremium: false,
  showPremiumModal: false,
  userPreferences: null,
  setActiveView: (view) => set({ activeView: view }),
  setSelectedBook: (book) => set({ selectedBook: book }),
  openPremiumModal: () => set({ showPremiumModal: true }),
  closePremiumModal: () => set({ showPremiumModal: false }),
  upgradeToPremium: () => set({ isPremium: true, showPremiumModal: false }),
  setUserPreferences: (userPreferences) => set({ userPreferences }),
  setPremium: (value) => set({ isPremium: value })
}));
