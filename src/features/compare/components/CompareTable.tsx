import { View, Text, ScrollView } from 'react-native';
import { Product } from '@/shared/types/product';
import { CompareRow } from '@/shared/ui/CompareRow';
import { findCheapestProduct } from '@/shared/utils/priceUtils';

interface CompareTableProps {
  products: Product[];
  onProductPress?: (product: Product) => void;
}

export function CompareTable({ products, onProductPress }: CompareTableProps) {
  const cheapest = findCheapestProduct(products);

  if (products.length === 0) {
    return (
      <View className="p-4">
        <Text className="text-textSecondary text-center">אין מוצרים להשוואה</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1">
      <View className="p-4">
        {products.map((product) => (
          <CompareRow
            key={product.id}
            product={product}
            isCheapest={cheapest?.id === product.id}
            onPress={() => onProductPress?.(product)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

