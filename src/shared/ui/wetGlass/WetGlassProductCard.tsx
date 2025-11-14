import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { WetGlassCard } from './WetGlassCard';
import { WetGlassPriceTag } from './WetGlassPriceTag';
import { ChainBadge } from '../ChainBadge';
import { Product, CHAIN_CONFIGS } from '@/shared/types/product';
import { WetGlassTheme } from '@/shared/design/wetGlassTheme';
import { Ionicons } from '@expo/vector-icons';

interface WetGlassProductCardProps {
  product: Product;
  onPress?: () => void;
  onAddToCart?: () => void;
  showChain?: boolean;
}

export function WetGlassProductCard({
  product,
  onPress,
  onAddToCart,
  showChain = true,
}: WetGlassProductCardProps) {
  const chainConfig = CHAIN_CONFIGS[product.chain];
  const glowColor = chainConfig.color || WetGlassTheme.colors.neon.blue;

  return (
    <WetGlassCard
      glowColor={glowColor}
      borderRadius={28}
      padding={16}
      style={styles.card}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <View style={styles.content}>
            <View style={styles.imageOverlay} />
            
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={2}>
              {product.name}
            </Text>

            {product.quantity && (
              <Text style={styles.quantity}>{product.quantity}</Text>
            )}

          {onAddToCart && (
            <TouchableOpacity
              onPress={onAddToCart}
              style={[styles.addButton, { borderColor: glowColor + '40' }]}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={20} color={glowColor} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </WetGlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: WetGlassTheme.spacing.md,
  },
  content: {
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: WetGlassTheme.spacing.md,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  badgeContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  info: {
    gap: WetGlassTheme.spacing.xs,
  },
  name: {
    ...WetGlassTheme.typography.h3,
    marginBottom: 4,
  },
  quantity: {
    ...WetGlassTheme.typography.caption,
    color: WetGlassTheme.colors.text.tertiary,
  },
  priceContainer: {
    marginTop: WetGlassTheme.spacing.sm,
  },
  addButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

