import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Product, CHAIN_CONFIGS } from '@/shared/types/product';

interface WetGlassProductCardProps {
  product: Product;
  onPress?: () => void;
  showChain?: boolean;
  isCheapest?: boolean;
}

export function WetGlassProductCard({
  product,
  onPress,
  showChain = true,
  isCheapest = false,
}: WetGlassProductCardProps) {
  const chainConfig = CHAIN_CONFIGS[product.chain];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, isCheapest && styles.containerCheapest]}
    >
      <BlurView intensity={40} tint="dark" style={styles.blur}>
        <LinearGradient
          colors={
            isCheapest
              ? [
                  'rgba(0, 255, 150, 0.25)',
                  'rgba(0, 200, 255, 0.15)',
                  'rgba(100, 150, 255, 0.2)',
                ]
              : [
                  'rgba(255, 255, 255, 0.15)',
                  'rgba(255, 255, 255, 0.08)',
                  'rgba(255, 255, 255, 0.12)',
                ]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View
            style={[
              styles.highlight,
              { backgroundColor: 'rgba(255, 255, 255, 0.35)' },
            ]}
          />

          <View style={styles.content}>
            <View style={styles.imageContainer}>
              {product.image ? (
                <Image source={{ uri: product.image }} style={styles.image} />
              ) : (
                <LinearGradient
                  colors={[`${chainConfig.color}40`, `${chainConfig.color}20`]}
                  style={styles.imagePlaceholder}
                >
                  <Text style={styles.placeholderEmoji}>📦</Text>
                </LinearGradient>
              )}
            </View>

            <View style={styles.details}>
              <Text style={styles.productName} numberOfLines={2}>
                {product.name}
              </Text>

              {showChain && (
                <View style={styles.chainRow}>
                  <View
                    style={[
                      styles.chainDot,
                      { backgroundColor: chainConfig.color },
                    ]}
                  />
                  <Text style={styles.chainName}>{chainConfig.name}</Text>
                </View>
              )}

              {product.quantity && (
                <Text style={styles.quantity}>{product.quantity}</Text>
              )}
            </View>

            <View style={styles.priceContainer}>
              <BlurView intensity={20} tint="dark" style={styles.priceBlur}>
                <LinearGradient
                  colors={
                    isCheapest
                      ? ['rgba(0, 255, 150, 0.3)', 'rgba(0, 200, 255, 0.2)']
                      : ['rgba(100, 200, 255, 0.3)', 'rgba(150, 100, 255, 0.2)']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.priceGradient}
                >
                  <Text style={styles.priceSymbol}>₪</Text>
                  <Text style={styles.priceValue}>{product.price.toFixed(2)}</Text>
                </LinearGradient>
              </BlurView>
            </View>
          </View>

          {isCheapest && (
            <View style={styles.badge}>
              <BlurView intensity={30} tint="dark" style={styles.badgeBlur}>
                <LinearGradient
                  colors={['rgba(0, 255, 150, 0.4)', 'rgba(0, 200, 255, 0.3)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.badgeGradient}
                >
                  <Text style={styles.badgeText}>🏆 הכי זול</Text>
                </LinearGradient>
              </BlurView>
            </View>
          )}
        </LinearGradient>
      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 24,
    overflow: 'hidden',
  },
  containerCheapest: {
    transform: [{ scale: 1.02 }],
  },
  blur: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  gradient: {
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  highlight: {
    position: 'absolute',
    top: 8,
    left: 20,
    width: 80,
    height: 30,
    borderRadius: 40,
    opacity: 0.4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 12,
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
    borderRadius: 16,
  },
  placeholderEmoji: {
    fontSize: 28,
  },
  details: {
    flex: 1,
    marginRight: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'right',
  },
  chainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    justifyContent: 'flex-end',
  },
  chainDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 6,
  },
  chainName: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  quantity: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'right',
  },
  priceContainer: {
    alignSelf: 'center',
  },
  priceBlur: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  priceGradient: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  priceSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 2,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  badgeBlur: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  badgeGradient: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 150, 0.3)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
