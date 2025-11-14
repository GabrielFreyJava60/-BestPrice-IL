import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { WetGlassTheme } from '@/shared/design/wetGlassTheme';

interface WetGlassPriceTagProps {
  price: number;
  unitPrice?: number;
  currency?: string;
  glowColor?: string;
  size?: 'small' | 'medium' | 'large';
}

export function WetGlassPriceTag({
  price,
  unitPrice,
  currency = '₪',
  glowColor = WetGlassTheme.colors.neon.cyan,
  size = 'medium',
}: WetGlassPriceTagProps) {
  const sizeStyles = {
    small: { fontSize: 16, padding: 8 },
    medium: { fontSize: 20, padding: 12 },
    large: { fontSize: 28, padding: 16 },
  };

  const currentSize = sizeStyles[size];

  return (
    <View style={styles.container}>
      {/* Glow effect */}
      <View
        style={[
          styles.glow,
          {
            backgroundColor: glowColor,
            borderRadius: currentSize.padding + 4,
          },
        ]}
      />
      
      {/* Glass tag */}
      <BlurView intensity={25} tint="dark" style={styles.blur}>
        <LinearGradient
          colors={[
            'rgba(0, 217, 255, 0.2)',
            'rgba(255, 255, 255, 0.15)',
            'rgba(157, 78, 221, 0.15)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.gradient,
            {
              borderRadius: currentSize.padding + 4,
              padding: currentSize.padding,
            },
          ]}
        >
          {/* Reflection */}
          <View style={styles.reflection} />
          
          {/* Border */}
          <View
            style={[
              styles.border,
              {
                borderRadius: currentSize.padding + 4,
                borderColor: `rgba(0, 217, 255, 0.4)`,
              },
            ]}
          />
          
          {/* Price text */}
          <View style={styles.content}>
            <Text
              style={[
                styles.price,
                {
                  fontSize: currentSize.fontSize,
                  color: glowColor,
                },
              ]}
            >
              {currency}{price.toFixed(2)}
            </Text>
            {unitPrice && (
              <Text style={styles.unitPrice}>
                {currency}{unitPrice.toFixed(2)} ליחידה
              </Text>
            )}
          </View>
        </LinearGradient>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  glow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    opacity: 0.3,
    ...WetGlassTheme.shadows.neon,
  },
  blur: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    position: 'relative',
    overflow: 'hidden',
  },
  reflection: {
    position: 'absolute',
    top: 0,
    left: '20%',
    width: '60%',
    height: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    opacity: 0.5,
  },
  border: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
  price: {
    fontWeight: '700',
    textShadowColor: 'rgba(0, 217, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  unitPrice: {
    fontSize: 10,
    color: WetGlassTheme.colors.text.tertiary,
    marginTop: 2,
  },
});

