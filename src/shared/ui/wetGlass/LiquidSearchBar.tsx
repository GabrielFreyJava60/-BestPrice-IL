import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { WetGlassTheme } from '@/shared/design/wetGlassTheme';

interface LiquidSearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

export function LiquidSearchBar({
  placeholder = 'חפש מוצר...',
  onSearch,
  value,
  onChangeText,
}: LiquidSearchBarProps) {
  const [localValue, setLocalValue] = useState(value || '');

  const handleChange = (text: string) => {
    setLocalValue(text);
    onChangeText?.(text);
  };

  const handleSubmit = () => {
    onSearch(localValue);
  };

  const handleClear = () => {
    setLocalValue('');
    onChangeText?.('');
  };

  const displayValue = value !== undefined ? value : localValue;

  return (
    <View style={styles.container}>
      <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
        <LinearGradient
          colors={[
            'rgba(0, 217, 255, 0.15)',
            'rgba(255, 255, 255, 0.1)',
            'rgba(157, 78, 221, 0.1)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.border} />
          
