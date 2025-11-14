import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WetGlassBackground } from '@/shared/ui/wetGlass/WetGlassBackground';
import { WetGlassCard } from '@/shared/ui/wetGlass/WetGlassCard';
import { LiquidToggle } from '@/shared/ui/wetGlass/LiquidToggle';
import { WetGlassTheme } from '@/shared/design/wetGlassTheme';
import { Ionicons } from '@expo/vector-icons';

export default function WetGlassSettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(false);

  return (
    <WetGlassBackground>
      <SafeAreaView style={styles.container}>
          <WetGlassCard borderRadius={24} padding={20} style={styles.card}>
            <View style={styles.sectionHeader}>
              <Ionicons name="notifications-outline" size={24} color={WetGlassTheme.colors.neon.cyan} />
              <Text style={styles.sectionTitle}>התראות</Text>
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>התראות מחירים</Text>
                <Text style={styles.settingDescription}>קבל התראות על שינויי מחירים</Text>
              </View>
              <LiquidToggle
                value={notifications}
                onValueChange={setNotifications}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>התראות מחיר נמוך</Text>
                <Text style={styles.settingDescription}>התראה כשהמחיר יורד</Text>
              </View>
              <LiquidToggle
                value={priceAlerts}
                onValueChange={setPriceAlerts}
              />
            </View>
          </WetGlassCard>

          <WetGlassCard borderRadius={24} padding={20} style={styles.card}>
            <View style={styles.sectionHeader}>
              <Ionicons name="language-outline" size={24} color={WetGlassTheme.colors.neon.blue} />
              <Text style={styles.sectionTitle}>שפה</Text>
            </View>
            
            {['עברית', 'English', 'Русский'].map((lang, index) => (
              <TouchableOpacity
                key={index}
                style={styles.languageOption}
                activeOpacity={0.7}
              >
                <Text style={styles.languageText}>{lang}</Text>
                {index === 0 && (
                  <Ionicons
                    name="checkmark"
                    size={20}
                    color={WetGlassTheme.colors.neon.cyan}
                  />
                )}
              </TouchableOpacity>
            ))}
          </WetGlassCard>

