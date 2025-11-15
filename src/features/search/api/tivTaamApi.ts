import { apiClient } from '@/services/apiClient';
import { Product, Chain } from '@/shared/types/product';

interface TivTaamResponse {
  data?: Array<{
    id: string;
    title: string;
    currentPrice?: number;
    imgUrl?: string;
    pricePerKg?: number;
    weight?: string;
  }>;
}

export const searchTivTaam = async (query: string): Promise<Product[]> => {
  try {
    const url = `https://www.tivtaam.co.il/api/products?search=${encodeURIComponent(query)}`;
    
    const data = await apiClient.get<TivTaamResponse>(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!data.data || data.data.length === 0) {
      return getMockTivTaamProducts(query);
    }

    return normalizeTivTaamProducts(data.data);
  } catch (error) {
    return getMockTivTaamProducts(query);
  }
};

function normalizeTivTaamProducts(products: TivTaamResponse['data']): Product[] {
  if (!products) return [];

  return products.map((product) => ({
    id: `tivtaam-${product.id}`,
    name: product.title,
    image: product.imgUrl || null,
    chain: 'tivtaam' as Chain,
    price: product.currentPrice || 0,
    unitPrice: product.pricePerKg,
    quantity: product.weight,
  }));
}

function getMockTivTaamProducts(query: string): Product[] {
  const mockData: Record<string, Product[]> = {
    'חלב': [
      { id: 'tivtaam-1', name: 'חלב אורגני 3% 1 ליטר', chain: 'tivtaam', price: 8.90, image: null, unitPrice: 8.90, quantity: '1L' },
      { id: 'tivtaam-2', name: 'חלב שקדים', chain: 'tivtaam', price: 12.50, image: null, unitPrice: 12.50, quantity: '1L' },
    ],
    'לחם': [
      { id: 'tivtaam-3', name: 'לחם אורגני', chain: 'tivtaam', price: 9.90, image: null },
      { id: 'tivtaam-4', name: 'בגט צרפתי', chain: 'tivtaam', price: 11.90, image: null },
    ],
    'ביצים': [
      { id: 'tivtaam-5', name: 'ביצים אורגניות 10 יח', chain: 'tivtaam', price: 18.90, image: null },
    ],
  };

  const normalizedQuery = query.toLowerCase().trim();
  for (const [key, products] of Object.entries(mockData)) {
    if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
      return products;
    }
  }

  return [];
}

