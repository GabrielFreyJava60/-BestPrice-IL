import { apiClient } from '@/services/apiClient';
import { Product, Chain } from '@/shared/types/product';

interface MegaResponse {
  items?: Array<{
    productId: string;
    productName: string;
    price?: number;
    imageUrl?: string;
    unitPrice?: number;
    size?: string;
  }>;
}

export const searchMega = async (query: string): Promise<Product[]> => {
  try {
    const url = `https://mega.co.il/api/v1/products/search/${encodeURIComponent(query)}`;
    
    const data = await apiClient.get<MegaResponse>(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!data.items || data.items.length === 0) {
      return getMockMegaProducts(query);
    }

    return normalizeMegaProducts(data.items);
  } catch (error) {
    console.warn('Mega API failed, using mock data:', error);
    return getMockMegaProducts(query);
  }
};

function normalizeMegaProducts(products: MegaResponse['items']): Product[] {
  if (!products) return [];

  return products.map((product) => ({
    id: `mega-${product.productId}`,
    name: product.productName,
    image: product.imageUrl || null,
    chain: 'mega' as Chain,
    price: product.price || 0,
    unitPrice: product.unitPrice,
    quantity: product.size,
  }));
}

function getMockMegaProducts(query: string): Product[] {
  const mockData: Record<string, Product[]> = {
    'חלב': [
      { id: 'mega-1', name: 'חלב טרה 3% 1 ליטר', chain: 'mega', price: 6.40, image: null, unitPrice: 6.40, quantity: '1L' },
      { id: 'mega-2', name: 'חלב יוטבתה 3%', chain: 'mega', price: 7.20, image: null, unitPrice: 7.20, quantity: '1L' },
    ],
    'לחם': [
      { id: 'mega-3', name: 'לחם שחור', chain: 'mega', price: 6.50, image: null },
      { id: 'mega-4', name: 'חלה קלועה', chain: 'mega', price: 12.90, image: null },
    ],
    'ביצים': [
      { id: 'mega-5', name: 'ביצים M 12 יח', chain: 'mega', price: 11.90, image: null },
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

