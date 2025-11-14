export const API_CONFIG = {
  timeout: 10000,
  retries: 2,
  retryDelay: 1000,
};

export const API_ENDPOINTS = {
  SHUFERSAL: {
    base: 'https://www.shufersal.co.il/online/web/product/search',
    search: (query: string) => `?searchTerm=${encodeURIComponent(query)}`,
  },
  RAMI_LEVY: {
    base: 'https://www.rami-levy.co.il/api/catalog/search',
    search: (query: string) => `/${encodeURIComponent(query)}`,
  },
  VICTORY: {
    base: 'https://api.victory.co.il/api/products/search',
    search: (query: string) => `?query=${encodeURIComponent(query)}`,
  },
};

