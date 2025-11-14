import { Product, Chain } from '@/shared/types/product';

export const normalizeProduct = (
  rawProduct: unknown,
  chain: Chain,
  normalizer: (raw: unknown) => Partial<Product>
): Product => {
  const normalized = normalizer(rawProduct);
  
  return {
    id: normalized.id || `${chain}-${Date.now()}`,
    name: normalized.name || 'Unknown Product',
    image: normalized.image || null,
    chain,
    price: normalized.price || 0,
    unitPrice: normalized.unitPrice,
    quantity: normalized.quantity,
    originalData: rawProduct,
  };
};

export const normalizePrice = (price: string | number): number => {
  if (typeof price === 'number') return price;
  const cleaned = price.replace(/[^\d.]/g, '');
  return parseFloat(cleaned) || 0;
};

