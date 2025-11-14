import { View, Text } from 'react-native';
import { Chain, CHAIN_CONFIGS } from '@/shared/types/product';

interface ChainBadgeProps {
  chain: Chain;
  size?: 'small' | 'medium';
}

export function ChainBadge({ chain, size = 'medium' }: ChainBadgeProps) {
  const config = CHAIN_CONFIGS[chain];
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1.5 text-sm',
  };

  return (
    <View
      className={`${sizeClasses[size]} rounded-lg`}
      style={{ backgroundColor: config.color + '20' }}
    >
      <Text className="font-semibold" style={{ color: config.color }}>
        {config.name}
      </Text>
    </View>
  );
}

