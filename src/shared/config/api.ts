export const API_CONFIG = {
  timeout: 10000,
  retries: 2,
  retryDelay: 1000,
};

export const API_ENDPOINTS = {
  SHUFERSAL: {
    base: 'https:
    search: (query: string) => `?searchTerm=${encodeURIComponent(query)}`,
  },
  RAMI_LEVY: {
    base: 'https:
    search: (query: string) => `/${encodeURIComponent(query)}`,
  },
  VICTORY: {
    base: 'https:
    search: (query: string) => `?query=${encodeURIComponent(query)}`,
  },
};

