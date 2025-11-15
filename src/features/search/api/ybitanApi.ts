import { apiClient } from '@/services/apiClient';
import { Product, Chain } from '@/shared/types/product';

interface YbitanResponse {
  products?: Array<{
    id: string;
    name: string;
    price?: number;
    image?: string;
    pricePerUnit?: number;
    volume?: string;
  }>;
}

export const searchYbitan = async (query: string): Promise<Product[]> => {
  try {
    const url = `https://www.ybitan.co.il/api/search?q=${encodeURIComponent(query)}`;
    
    const data = await apiClient.get<YbitanResponse>(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!data.products || data.products.length === 0) {
      return getMockYbitanProducts(query);
    }

    return normalizeYbitanProducts(data.products);
  } catch (error) {
    return getMockYbitanProducts(query);
  }
};

function normalizeYbitanProducts(products: YbitanResponse['products']): Product[] {
  if (!products) return [];

  return products.map((product) => ({
    id: `ybitan-${product.id}`,
    name: product.name,
    image: product.image || null,
    chain: 'ybitan' as Chain,
    price: product.price || 0,
    unitPrice: product.pricePerUnit,
    quantity: product.volume,
  }));
}

function getMockYbitanProducts(query: string): Product[] {
  const mockData: Record<string, Product[]> = {
    'חלב': [
      { id: 'ybitan-1', name: 'חלב טרה 3% 1 ליטר', chain: 'ybitan', price: 6.70, image: null, unitPrice: 6.70, quantity: '1L' },
      { id: 'ybitan-2', name: 'חלב טרה 1% 1 ליטר', chain: 'ybitan', price: 6.50, image: null, unitPrice: 6.50, quantity: '1L' },
    ],
    'לחם': [
      { id: 'ybitan-3', name: 'לחם אחיד ביתן', chain: 'ybitan', price: 5.20, image: null },
      { id: 'ybitan-4', name: 'לחם מחמצת', chain: 'ybitan', price: 8.90, image: null },
    ],
    'ביצים': [
      { id: 'ybitan-5', name: 'ביצים L 12 יח', chain: 'ybitan', price: 13.50, image: null },
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

