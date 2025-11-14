import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Product, CHAIN_CONFIGS } from '@/shared/types/product';
import { formatPrice } from '@/shared/utils/priceUtils';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  showChain?: boolean;
}

export function ProductCard({ product, onPress, showChain = true }: ProductCardProps) {
  const chainConfig = CHAIN_CONFIGS[product.chain];

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        {product.image ? (
          <Image source={{ uri: product.image }} className="w-16 h-16 rounded-xl mr-3" />
        ) : (
          <View
            className="w-16 h-16 rounded-xl mr-3 items-center justify-center"
            style={{ backgroundColor: chainConfig.color + '20' }}
          >
            <Text className="text-2xl">📦</Text>
          </View>
        )}

        <View className="flex-1">
          <Text className="text-base font-semibold text-text mb-1" numberOfLines={2}>
            {product.name}
          </Text>

          {showChain && (
            <View className="flex-row items-center mb-2">
              <View
                className="px-2 py-1 rounded"
                style={{ backgroundColor: chainConfig.color + '20' }}
              >
                <Text className="text-xs font-medium" style={{ color: chainConfig.color }}>
                  {chainConfig.name}
                </Text>
              </View>
            </View>
          )}

          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xl font-bold text-text">
                {formatPrice(product.price)}
              </Text>
              {product.unitPrice && (
                <Text className="text-xs text-textSecondary">
                  {formatPrice(product.unitPrice)} ליחידה
                </Text>
              )}
            </View>

            {product.quantity && (
              <Text className="text-xs text-textSecondary">{product.quantity}</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
