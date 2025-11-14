export type Chain = 'shufersal' | 'ramilevy' | 'victory';

export interface Product {
  id: string;
  name: string;
  image: string | null;
  chain: Chain;
  price: number;
  unitPrice?: number;
  quantity?: string;
  originalData?: unknown;
}

export interface SearchResult {
  chain: Chain;
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

export interface CompareItem {
  product: Product;
  selected: boolean;
}

export interface ShoppingListItem {
  id: string;
  product: Product;
  quantity: number;
  notes?: string;
}

export interface ChainConfig {
  name: string;
  color: string;
  logo?: string;
}

export const CHAIN_CONFIGS: Record<Chain, ChainConfig> = {
  shufersal: {
    name: 'שופרסל',
    color: '#0066CC',
  },
  ramilevy: {
    name: 'רמי לוי',
    color: '#00A651',
  },
  victory: {
    name: 'ויקטורי',
    color: '#FF6B35',
  },
};

