import { apiClient } from '@/services/apiClient';
import { Product, Chain } from '@/shared/types/product';

interface VictoryResponse {
  data?: Array<{
    id: string;
    title: string;
    price?: number;
    image?: string;
    pricePerUnit?: number;
    size?: string;
  }>;
}

export const searchVictory = async (query: string): Promise<Product[]> => {
  try {
    const url = `https://api.victory.co.il/api/products/search?query=${encodeURIComponent(query)}`;
    
    const data = await apiClient.get<VictoryResponse>(url);

    if (!data.data || data.data.length === 0) {
      return getMockVictoryProducts(query);
    }

    return normalizeVictoryProducts(data.data);
  } catch (error) {
    console.warn('Victory API failed, using mock data:', error);
    return getMockVictoryProducts(query);
  }
};

const normalizeVictoryProducts = (items: VictoryResponse['data'] = []): Product[] => {
  return items.map((item) => ({
    id: `victory-${item.id}`,
    name: item.title,
    image: item.image || null,
    chain: 'victory' as Chain,
    price: item.price || 0,
    unitPrice: item.pricePerUnit,
    quantity: item.size,
    originalData: item,
  }));
};

const getMockVictoryProducts = (query: string): Product[] => {
  return [
    {
      id: `victory-${query}-1`,
      name: `${query} - ויקטורי`,
      image: null,
      chain: 'victory',
      price: Math.random() * 48 + 9,
      unitPrice: Math.random() * 4.8 + 0.9,
      quantity: '1 יחידה',
    },
    {
      id: `victory-${query}-2`,
      name: `${query} פרמיום - ויקטורי`,
      image: null,
      chain: 'victory',
      price: Math.random() * 75 + 18,
      unitPrice: Math.random() * 3.8 + 0.7,
      quantity: '1 יחידה',
    },
  ];
};

