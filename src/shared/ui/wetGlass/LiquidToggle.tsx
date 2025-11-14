import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { WetGlassTheme } from '@/shared/design/wetGlassTheme';

interface LiquidToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  activeColor?: string;
  inactiveColor?: string;
}

export function LiquidToggle({
  value,
  onValueChange,
  activeColor = WetGlassTheme.colors.neon.cyan,
  inactiveColor = 'rgba(255, 255, 255, 0.3)',
}: LiquidToggleProps) {
  const translateX = useSharedValue(value ? 1 : 0);

  React.useEffect(() => {
    translateX.value = withSpring(value ? 1 : 0, {
      damping: 15,
      stiffness: 150,
    });
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      [0, 1],
      [inactiveColor, activeColor]
    );

    return {
      transform: [{ translateX: translateX.value * 24 }],
      backgroundColor,
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      [0, 1],
      ['rgba(255, 255, 255, 0.1)', 'rgba(0, 217, 255, 0.2)']
    );

    return { backgroundColor };
  });

  return (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      activeOpacity={0.8}
      style={styles.container}
    >
      <Animated.View style={[styles.track, containerStyle]}>
        <BlurView intensity={20} tint="dark" style={styles.blur}>
          {/* Reflection */}
          <View style={styles.reflection} />
          
          {/* Animated thumb */}
          <Animated.View style={[styles.thumb, animatedStyle]}>
            <LinearGradient
              colors={[
                'rgba(255, 255, 255, 0.4)',
                'rgba(255, 255, 255, 0.2)',
                'rgba(255, 255, 255, 0.3)',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.thumbGradient}
            >
              {/* Thumb highlight */}
              <View style={styles.thumbHighlight} />
            </LinearGradient>
          </Animated.View>
        </BlurView>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 52,
    height: 32,
  },
  track: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  blur: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  reflection: {
    position: 'absolute',
    top: 0,
    left: '30%',
    width: '40%',
    height: '30%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    opacity: 0.6,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    margin: 4,
    overflow: 'hidden',
    ...WetGlassTheme.shadows.glass,
  },
  thumbGradient: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  thumbHighlight: {
    position: 'absolute',
    top: '20%',
    left: '25%',
    width: '50%',
    height: '30%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 4,
  },
});

