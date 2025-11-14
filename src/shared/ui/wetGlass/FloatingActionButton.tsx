import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { WetGlassTheme } from '@/shared/design/wetGlassTheme';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  label?: string;
  size?: number;
  glowColor?: string;
}

export function FloatingActionButton({
  onPress,
  icon,
  label,
  size = 56,
  glowColor = WetGlassTheme.colors.neon.blue,
}: FloatingActionButtonProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[
          styles.button,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      >
        <BlurView intensity={40} tint="dark" style={styles.blur}>
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0.25)',
              'rgba(255, 255, 255, 0.1)',
              'rgba(255, 255, 255, 0.2)',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.gradient, { borderRadius: size / 2 }]}
          >
            <View
              style={[
                styles.reflection,
                {
                  width: size * 0.4,
                  height: size * 0.3,
                  borderRadius: size * 0.15,
                },
              ]}
            />
            
            <View
              style={[
                styles.border,
                {
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
              ]}
            />
            
            <View style={styles.iconContainer}>
              <Ionicons name={icon} size={size * 0.4} color={glowColor} />
            </View>
          </LinearGradient>
        </BlurView>
      </TouchableOpacity>
      
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowRing1: {
    position: 'absolute',
    opacity: 0.2,
    ...WetGlassTheme.shadows.neon,
  },
  glowRing2: {
    position: 'absolute',
    opacity: 0.3,
    ...WetGlassTheme.shadows.neon,
  },
  button: {
    overflow: 'hidden',
    ...WetGlassTheme.shadows.depth,
  },
  blur: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reflection: {
    position: 'absolute',
    top: '15%',
    left: '30%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    opacity: 0.6,
  },
  border: {
    position: 'absolute',
    borderWidth: 1.5,
    pointerEvents: 'none',
  },
  iconContainer: {
    zIndex: 1,
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    color: WetGlassTheme.colors.text.secondary,
    fontWeight: '500',
  },
});

