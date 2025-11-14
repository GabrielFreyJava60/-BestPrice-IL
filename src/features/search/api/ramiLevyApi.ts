import { apiClient } from '@/services/apiClient';
import { Product, Chain } from '@/shared/types/product';

interface RamiLevyResponse {
  items?: Array<{
    productId: string;
    productName: string;
    price?: number;
    image?: string;
    unitPrice?: number;
    packageSize?: string;
  }>;
}

export const searchRamiLevy = async (query: string): Promise<Product[]> => {
  try {
    const url = `https:
    
    const data = await apiClient.get<RamiLevyResponse>(url);

    if (!data.items || data.items.length === 0) {
      return getMockRamiLevyProducts(query);
    }

    return normalizeRamiLevyProducts(data.items);
  } catch (error) {
    console.warn('Rami Levy API failed, using mock data:', error);
    return getMockRamiLevyProducts(query);
  }
};

const normalizeRamiLevyProducts = (items: RamiLevyResponse['items'] = []): Product[] => {
  return items.map((item) => ({
    id: `ramilevy-${item.productId}`,
    name: item.productName,
    image: item.image || null,
    chain: 'ramilevy' as Chain,
    price: item.price || 0,
    unitPrice: item.unitPrice,
    quantity: item.packageSize,
    originalData: item,
  }));
};

const getMockRamiLevyProducts = (query: string): Product[] => {
  return [
    {
      id: `ramilevy-${query}-1`,
      name: `${query} - רמי לוי`,
      image: null,
      chain: 'ramilevy',
      price: Math.random() * 45 + 8,
      unitPrice: Math.random() * 4.5 + 0.8,
      quantity: '1 יחידה',
    },
    {
      id: `ramilevy-${query}-2`,
      name: `${query} מותג - רמי לוי`,
      image: null,
      chain: 'ramilevy',
      price: Math.random() * 70 + 15,
      unitPrice: Math.random() * 3.5 + 0.6,
      quantity: '1 יחידה',
    },
  ];
};

