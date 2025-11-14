import { View, Text, TouchableOpacity } from 'react-native';
import { Product, CHAIN_CONFIGS } from '@/shared/types/product';
import { formatPrice } from '@/shared/utils/priceUtils';

interface CompareRowProps {
  product: Product;
  isCheapest?: boolean;
  onPress?: () => void;
}

export function CompareRow({ product, isCheapest = false, onPress }: CompareRowProps) {
  const chainConfig = CHAIN_CONFIGS[product.chain];

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`p-4 rounded-xl border-2 mb-3 ${
        isCheapest ? 'bg-green-50 border-green-500' : 'bg-white border-gray-200'
      }`}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center justify-between mb-2">
        <View
          className="px-3 py-1 rounded-lg"
          style={{ backgroundColor: chainConfig.color + '20' }}
        >
          <Text className="text-sm font-semibold" style={{ color: chainConfig.color }}>
            {chainConfig.name}
          </Text>
        </View>
        {isCheapest && (
          <View className="bg-green-500 px-3 py-1 rounded-lg">
            <Text className="text-white text-xs font-semibold">הכי זול</Text>
          </View>
        )}
      </View>

      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-text">{formatPrice(product.price)}</Text>
          {product.unitPrice && (
            <Text className="text-sm text-textSecondary">
              {formatPrice(product.unitPrice)} ליחידה
            </Text>
          )}
        </View>
        {product.quantity && (
          <Text className="text-sm text-textSecondary">{product.quantity}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

