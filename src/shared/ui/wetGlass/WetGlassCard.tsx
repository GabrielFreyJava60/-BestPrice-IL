import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { WetGlassTheme } from '@/shared/design/wetGlassTheme';

interface WetGlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  borderRadius?: number;
  borderWidth?: number;
  glowColor?: string;
  padding?: number;
}

export function WetGlassCard({
  children,
  style,
  intensity = 20,
  borderRadius = 24,
  borderWidth = 1,
  glowColor = WetGlassTheme.colors.neon.blue,
  padding = 16,
}: WetGlassCardProps) {
  return (
    <View style={[styles.container, style]}>
      <BlurView intensity={intensity} tint="dark" style={[styles.blurContainer, { borderRadius }]}>
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0.15)',
            'rgba(255, 255, 255, 0.05)',
            'rgba(255, 255, 255, 0.1)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, { borderRadius, padding }]}
        >
          <View
            style={[
              styles.border,
              {
                borderRadius,
                borderWidth,
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
            ]}
          />
          
