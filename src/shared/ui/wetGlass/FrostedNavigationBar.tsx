import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { WetGlassTheme } from '@/shared/design/wetGlassTheme';

interface TabItem {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}

interface FrostedNavigationBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tabName: string) => void;
}

export function FrostedNavigationBar({
  tabs,
  activeTab,
  onTabPress,
}: FrostedNavigationBarProps) {
  return (
    <View style={styles.container}>
      <BlurView intensity={60} tint="dark" style={styles.blur}>
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0.2)',
            'rgba(255, 255, 255, 0.1)',
            'rgba(255, 255, 255, 0.15)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.tabs}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.name;
              
              return (
                <TouchableOpacity
                  key={tab.name}
                  onPress={() => onTabPress(tab.name)}
                  style={styles.tab}
                  activeOpacity={0.7}
                >
                  {isActive && (
                    <View style={styles.activeIndicator}>
                      <LinearGradient
                        colors={[
                          WetGlassTheme.colors.neon.blue,
                          WetGlassTheme.colors.neon.cyan,
                        ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.activeGradient}
                      />
                    </View>
                  )}
                  
                  <Ionicons
                    name={tab.icon}
                    size={24}
                    color={
                      isActive
                        ? WetGlassTheme.colors.neon.cyan
                        : WetGlassTheme.colors.text.tertiary
                    }
                    style={[
                      styles.icon,
                      isActive && {
                        textShadowColor: WetGlassTheme.colors.neon.cyan,
                        textShadowOffset: { width: 0, height: 0 },
                        textShadowRadius: 8,
                      },
                    ]}
                  />
                  
                  <Text
                    style={[
                      styles.label,
                      isActive && { color: WetGlassTheme.colors.neon.cyan },
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
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
  reflectionLine: {
    position: 'absolute',
    top: 0,
    left: '20%',
    width: '60%',
    height: 2,
    backgroundColor: 'rgba(0, 217, 255, 0.6)',
    borderRadius: 1,
    zIndex: 1,
  },
  blur: {
    overflow: 'hidden',
  },
  gradient: {
    position: 'relative',
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: WetGlassTheme.spacing.md,
  },
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(0, 217, 255, 0.3)',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    left: '20%',
    right: '20%',
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
  },
  activeGradient: {
    width: '100%',
    height: '100%',
  },
  icon: {
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    color: WetGlassTheme.colors.text.tertiary,
    fontWeight: '500',
  },
});

