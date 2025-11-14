import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WetGlassTheme } from '@/shared/design/wetGlassTheme';

interface WetGlassBackgroundProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function WetGlassBackground({ children, variant = 'primary' }: WetGlassBackgroundProps) {
  const gradients = {
    primary: WetGlassTheme.colors.background.gradient,
    secondary: ['#1A1F3A', '#2A2F4A', '#3A3F5A'],
  };

  return (
    <LinearGradient
      colors={gradients[variant]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Subtle noise texture overlay */}
      <View style={styles.noiseOverlay} />
      
      {/* Animated light orbs (optional) */}
      <View style={styles.orb1} />
      <View style={styles.orb2} />
      <View style={styles.orb3} />
      
      {/* Content */}
      <View style={styles.content}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  noiseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.03,
    backgroundColor: '#FFFFFF',
  },
  orb1: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 217, 255, 0.1)',
  },
  orb2: {
    position: 'absolute',
    top: '60%',
    right: '15%',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(157, 78, 221, 0.1)',
  },
  orb3: {
    position: 'absolute',
    bottom: '20%',
    left: '20%',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 0, 110, 0.1)',
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});

