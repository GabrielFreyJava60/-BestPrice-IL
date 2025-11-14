import { View, Text } from 'react-native';
import { formatPrice } from '@/shared/utils/priceUtils';

interface PriceTagProps {
  price: number;
  unitPrice?: number;
  size?: 'small' | 'medium' | 'large';
  highlight?: boolean;
}

export function PriceTag({ price, unitPrice, size = 'medium', highlight = false }: PriceTagProps) {
  const sizeClasses = {
    small: 'text-base',
    medium: 'text-xl',
    large: 'text-2xl',
  };

  return (
    <View className={`${highlight ? 'bg-green-100' : ''} rounded-lg p-2`}>
      <Text className={`${sizeClasses[size]} font-bold text-text`}>
        {formatPrice(price)}
      </Text>
      {unitPrice && (
        <Text className="text-xs text-textSecondary mt-1">
          {formatPrice(unitPrice)} ליחידה
        </Text>
      )}
    </View>
  );
}

