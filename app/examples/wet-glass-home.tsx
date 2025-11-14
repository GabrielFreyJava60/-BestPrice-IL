import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WetGlassBackground } from '@/shared/ui/wetGlass/WetGlassBackground';
import { LiquidSearchBar } from '@/shared/ui/wetGlass/LiquidSearchBar';
import { WetGlassProductCard } from '@/shared/ui/wetGlass/WetGlassProductCard';
import { FloatingActionButton } from '@/shared/ui/wetGlass/FloatingActionButton';
import { FrostedNavigationBar } from '@/shared/ui/wetGlass/FrostedNavigationBar';
import { WetGlassTheme } from '@/shared/design/wetGlassTheme';
import { Product } from '@/shared/types/product';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'חלב 3% תנובה',
    image: null,
    chain: 'shufersal',
    price: 5.90,
    unitPrice: 5.90,
    quantity: '1 ליטר',
  },
  {
    id: '2',
    name: 'לחם אחיד דגנית',
    image: null,
    chain: 'ramilevy',
    price: 4.50,
    unitPrice: 4.50,
    quantity: '750 גרם',
  },
  {
    id: '3',
    name: 'ביצים גדולות',
    image: null,
    chain: 'victory',
    price: 12.90,
    unitPrice: 12.90,
    quantity: '12 יחידות',
  },
];

const tabs = [
  { name: 'home', icon: 'home' as const, label: 'בית' },
  { name: 'search', icon: 'search' as const, label: 'חיפוש' },
  { name: 'list', icon: 'cart' as const, label: 'רשימה' },
  { name: 'settings', icon: 'settings' as const, label: 'הגדרות' },
];

export default function WetGlassHomeScreen() {
  const [activeTab, setActiveTab] = React.useState('home');

  return (
    <WetGlassBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <LiquidSearchBar
            placeholder="חפש מוצר..."
            onSearch={(query) => console.log('Search:', query)}
          />
        </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>מוצרים פופולריים</Text>
            {mockProducts.map((product) => (
              <WetGlassProductCard
                key={product.id}
                product={product}
                onPress={() => console.log('Product pressed:', product.id)}
                onAddToCart={() => console.log('Add to cart:', product.id)}
                showChain={true}
              />
            ))}
          </View>
        </ScrollView>

        <FrostedNavigationBar
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />
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
    paddingBottom: WetGlassTheme.spacing.sm,
  },
  title: {
    ...WetGlassTheme.typography.h1,
    marginBottom: 4,
  },
  subtitle: {
    ...WetGlassTheme.typography.body,
    color: WetGlassTheme.colors.text.secondary,
  },
  searchContainer: {
    paddingHorizontal: WetGlassTheme.spacing.lg,
    marginBottom: WetGlassTheme.spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: WetGlassTheme.spacing.lg,
    paddingBottom: 100,
  },
  section: {
    marginTop: WetGlassTheme.spacing.md,
  },
  sectionTitle: {
    ...WetGlassTheme.typography.h2,
    marginBottom: WetGlassTheme.spacing.md,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 100,
    right: WetGlassTheme.spacing.lg,
    zIndex: 10,
  },
});

