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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>הגדרות</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Notifications Section */}
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

          {/* Appearance Section */}
          <WetGlassCard borderRadius={24} padding={20} style={styles.card}>
            <View style={styles.sectionHeader}>
              <Ionicons name="color-palette-outline" size={24} color={WetGlassTheme.colors.neon.purple} />
              <Text style={styles.sectionTitle}>מראה</Text>
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>מצב כהה</Text>
                <Text style={styles.settingDescription}>ערכת נושא כהה</Text>
              </View>
              <LiquidToggle
                value={darkMode}
                onValueChange={setDarkMode}
                activeColor={WetGlassTheme.colors.neon.purple}
              />
            </View>
          </WetGlassCard>

          {/* Language Section */}
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

          {/* Pro Section */}
          <WetGlassCard
            borderRadius={24}
            padding={20}
            style={styles.card}
            glowColor={WetGlassTheme.colors.neon.pink}
          >
            <View style={styles.proSection}>
              <Ionicons name="star" size={32} color={WetGlassTheme.colors.neon.pink} />
              <Text style={styles.proTitle}>שדרג ל-Pro</Text>
              <Text style={styles.proDescription}>
                הסר פרסומות • רשימות בלתי מוגבלות • היסטוריית מחירים
              </Text>
              <TouchableOpacity style={styles.proButton} activeOpacity={0.8}>
                <Text style={styles.proButtonText}>התחל עכשיו</Text>
              </TouchableOpacity>
            </View>
          </WetGlassCard>
        </ScrollView>
      </SafeAreaView>
    </WetGlassBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: WetGlassTheme.spacing.lg,
    paddingTop: WetGlassTheme.spacing.md,
    paddingBottom: WetGlassTheme.spacing.md,
  },
  title: {
    ...WetGlassTheme.typography.h1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: WetGlassTheme.spacing.lg,
    paddingBottom: WetGlassTheme.spacing.xl,
  },
  card: {
    marginBottom: WetGlassTheme.spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: WetGlassTheme.spacing.md,
    gap: WetGlassTheme.spacing.sm,
  },
  sectionTitle: {
    ...WetGlassTheme.typography.h3,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: WetGlassTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingInfo: {
    flex: 1,
    marginRight: WetGlassTheme.spacing.md,
  },
  settingLabel: {
    ...WetGlassTheme.typography.body,
    marginBottom: 4,
  },
  settingDescription: {
    ...WetGlassTheme.typography.caption,
    color: WetGlassTheme.colors.text.tertiary,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: WetGlassTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  languageText: {
    ...WetGlassTheme.typography.body,
  },
  proSection: {
    alignItems: 'center',
    paddingVertical: WetGlassTheme.spacing.md,
  },
  proTitle: {
    ...WetGlassTheme.typography.h2,
    marginTop: WetGlassTheme.spacing.sm,
    marginBottom: WetGlassTheme.spacing.xs,
  },
  proDescription: {
    ...WetGlassTheme.typography.caption,
    textAlign: 'center',
    marginBottom: WetGlassTheme.spacing.lg,
    color: WetGlassTheme.colors.text.secondary,
  },
  proButton: {
    backgroundColor: WetGlassTheme.colors.neon.pink,
    paddingHorizontal: WetGlassTheme.spacing.xl,
    paddingVertical: WetGlassTheme.spacing.md,
    borderRadius: 20,
    ...WetGlassTheme.shadows.neon,
  },
  proButtonText: {
    ...WetGlassTheme.typography.body,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

