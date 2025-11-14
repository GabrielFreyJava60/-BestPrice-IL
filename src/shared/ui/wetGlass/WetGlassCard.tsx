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
      {/* Glow effect */}
      <View
        style={[
          styles.glow,
          {
            borderRadius,
            backgroundColor: glowColor,
            opacity: 0.2,
          },
        ]}
      />
      
      {/* Main glass card */}
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
          {/* Top highlight (water droplet effect) */}
          <View
            style={[
              styles.highlight,
              {
                borderRadius,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            ]}
          />
          
          {/* Border */}
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
          
          {/* Content */}
          <View style={styles.content}>{children}</View>
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
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    zIndex: 0,
  },
  blurContainer: {
    overflow: 'hidden',
    ...WetGlassTheme.shadows.glass,
  },
  gradient: {
    position: 'relative',
    overflow: 'hidden',
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: '30%',
    width: '40%',
    height: '20%',
    opacity: 0.6,
  },
  border: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});

