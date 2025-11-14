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
          <View
            style={[
              styles.border,
              {
                borderRadius: currentSize.padding + 4,
                borderColor: `rgba(0, 217, 255, 0.4)`,
              },
            ]}
          />
          
