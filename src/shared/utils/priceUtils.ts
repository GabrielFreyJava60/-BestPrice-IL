import { Product } from '@/shared/types/product';

export const formatPrice = (price: number, currency: string = '₪'): string => {
  return `${currency}${price.toFixed(2)}`;
};

export const findCheapestProduct = (products: Product[]): Product | null => {
  if (products.length === 0) return null;
  
  return products.reduce((cheapest, current) => {
    const currentPrice = current.unitPrice || current.price;
    const cheapestPrice = cheapest.unitPrice || cheapest.price;
    return currentPrice < cheapestPrice ? current : cheapest;
  });
};

export const calculateTotalPrice = (products: Product[]): number => {
  return products.reduce((total, product) => total + product.price, 0);
};

export const comparePrices = (products: Product[]): {
  cheapest: Product | null;
  mostExpensive: Product | null;
  average: number;
} => {
  if (products.length === 0) {
    return { cheapest: null, mostExpensive: null, average: 0 };
  }

  const prices = products.map((p) => p.unitPrice || p.price);
  const cheapest = findCheapestProduct(products);
  const mostExpensive = products.reduce((max, current) => {
    const currentPrice = current.unitPrice || current.price;
    const maxPrice = max.unitPrice || max.price;
    return currentPrice > maxPrice ? current : max;
  });

  const average = prices.reduce((sum, price) => sum + price, 0) / prices.length;

  return { cheapest, mostExpensive, average };
};

