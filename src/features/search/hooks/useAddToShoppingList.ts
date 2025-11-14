import { useShoppingListStore } from '@/features/shoppingList/store/shoppingListStore';
import { Product } from '@/shared/types/product';
import { useRouter } from 'expo-router';

export const useAddToShoppingList = () => {
  const { addItem } = useShoppingListStore();
  const router = useRouter();

  const addToShoppingList = (product: Product, quantity: number = 1) => {
    addItem(product, quantity);
    router.push('/shopping-list');
  };

  return { addToShoppingList };
};

