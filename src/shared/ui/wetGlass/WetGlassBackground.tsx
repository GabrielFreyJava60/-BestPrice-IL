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
      <View style={styles.orb1} />
      <View style={styles.orb2} />
      <View style={styles.orb3} />
      
