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
      {/* Outer glow */}
      <View style={styles.glow} />
      
      {/* Glass container */}
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
          {/* Liquid reflection effect */}
          <View style={styles.reflection} />
          
          {/* Border with neon accent */}
          <View style={styles.border} />
          
          {/* Content */}
          <View style={styles.content}>
            <Ionicons name="search" size={20} color={WetGlassTheme.colors.neon.cyan} />
            
            <TextInput
              value={displayValue}
              onChangeText={handleChange}
              onSubmitEditing={handleSubmit}
              placeholder={placeholder}
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              style={styles.input}
              returnKeyType="search"
            />
            
            {displayValue.length > 0 && (
              <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                <Ionicons name="close-circle" size={20} color="rgba(255, 255, 255, 0.6)" />
              </TouchableOpacity>
            )}
            
            <TouchableOpacity onPress={handleSubmit} style={styles.searchButton}>
              <LinearGradient
                colors={[WetGlassTheme.colors.neon.blue, WetGlassTheme.colors.neon.cyan]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.searchButtonGradient}
              >
                <Text style={styles.searchButtonText}>חפש</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: WetGlassTheme.spacing.md,
  },
  glow: {
    position: 'absolute',
    top: -6,
    left: -6,
    right: -6,
    bottom: -6,
    borderRadius: 28,
    backgroundColor: WetGlassTheme.colors.neon.cyan,
    opacity: 0.3,
    ...WetGlassTheme.shadows.neon,
  },
  blurContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    ...WetGlassTheme.shadows.glass,
  },
  gradient: {
    position: 'relative',
    overflow: 'hidden',
  },
  reflection: {
    position: 'absolute',
    top: 0,
    left: '25%',
    width: '50%',
    height: '30%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 24,
    opacity: 0.5,
  },
  border: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 217, 255, 0.4)',
    pointerEvents: 'none',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: WetGlassTheme.spacing.md,
    paddingVertical: WetGlassTheme.spacing.sm,
    gap: WetGlassTheme.spacing.sm,
  },
  input: {
    flex: 1,
    color: WetGlassTheme.colors.text.primary,
    fontSize: 16,
    fontWeight: '400',
  },
  clearButton: {
    padding: 4,
  },
  searchButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  searchButtonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});

