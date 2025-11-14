import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product, SearchResult } from '@/shared/types/product';

interface SearchState {
  recentSearches: string[];
  searchResults: SearchResult[];
  isLoading: boolean;
  currentQuery: string;
  addRecentSearch: (query: string) => void;
  setSearchResults: (results: SearchResult[]) => void;
  setLoading: (loading: boolean) => void;
  setCurrentQuery: (query: string) => void;
  clearResults: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      recentSearches: [],
      searchResults: [],
      isLoading: false,
      currentQuery: '',
      addRecentSearch: (query) =>
        set((state) => {
          const filtered = state.recentSearches.filter((s) => s !== query);
          return {
            recentSearches: [query, ...filtered].slice(0, 10),
          };
        }),
      setSearchResults: (results) => set({ searchResults: results }),
      setLoading: (loading) => set({ isLoading: loading }),
      setCurrentQuery: (query) => set({ currentQuery: query }),
      clearResults: () => set({ searchResults: [], currentQuery: '' }),
    }),
    {
      name: 'search-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ recentSearches: state.recentSearches }),
    }
  )
);

export const useRecentSearches = () => useSearchStore((state) => state.recentSearches);

