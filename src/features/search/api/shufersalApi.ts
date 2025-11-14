import { apiClient } from '@/services/apiClient';
import { Product, Chain } from '@/shared/types/product';

interface ShufersalResponse {
  products?: Array<{
    id: string;
    name: string;
    price?: number;
    imageUrl?: string;
    unitPrice?: number;
    quantity?: string;
  }>;
}

export const searchShufersal = async (query: string): Promise<Product[]> => {
  try {
    const url = `https://www.shufersal.co.il/online/web/product/search?searchTerm=${encodeURIComponent(query)}`;
    
    const data = await apiClient.get<ShufersalResponse>(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!data.products || data.products.length === 0) {
      return getMockShufersalProducts(query);
    }

    return normalizeShufersalProducts(data.products);
  } catch (error) {
    console.warn('Shufersal API failed, using mock data:', error);
    return getMockShufersalProducts(query);
  }
};

const normalizeShufersalProducts = (products: ShufersalResponse['products'] = []): Product[] => {
  return products.map((p) => ({
    id: `shufersal-${p.id}`,
    name: p.name,
    image: p.imageUrl || null,
    chain: 'shufersal' as Chain,
    price: p.price || 0,
    unitPrice: p.unitPrice,
    quantity: p.quantity,
    originalData: p,
  }));
};

const getMockShufersalProducts = (query: string): Product[] => {
  return [
    {
      id: `shufersal-${query}-1`,
      name: `${query} - שופרסל`,
      image: null,
      chain: 'shufersal',
      price: Math.random() * 50 + 10,
      unitPrice: Math.random() * 5 + 1,
      quantity: '1 יחידה',
    },
    {
      id: `shufersal-${query}-2`,
      name: `${query} גדול - שופרסל`,
      image: null,
      chain: 'shufersal',
      price: Math.random() * 80 + 20,
      unitPrice: Math.random() * 3 + 0.5,
      quantity: '2 יחידות',
    },
  ];
};

