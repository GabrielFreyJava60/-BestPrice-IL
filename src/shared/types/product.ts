export type Chain = 
  | 'shufersal' 
  | 'ramilevy' 
  | 'victory'
  | 'ybitan'
  | 'mega'
  | 'tivtaam';

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
    color: '#E30613',
  },
  ramilevy: {
    name: 'רמי לוי',
    color: '#0066CC',
  },
  victory: {
    name: 'ויקטורי',
    color: '#00A651',
  },
  ybitan: {
    name: 'יינות ביתן',
    color: '#8B0000',
  },
  mega: {
    name: 'מגה בעיר',
    color: '#FF6B00',
  },
  tivtaam: {
    name: 'טיב טעם',
    color: '#006633',
  },
};
