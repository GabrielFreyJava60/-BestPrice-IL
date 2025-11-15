import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { SearchBar } from '@/features/search/components/SearchBar';
import { useRecentSearches } from '@/features/search/store/searchStore';
import { WetGlassProductCard } from '@/shared/ui/wetGlass/WetGlassProductCard';

export default function HomeScreen() {
  const router = useRouter();
  const recentSearches = useRecentSearches();

  const popularProducts = [
    { id: '1', name: 'חלב 3%', chain: 'shufersal' as const, price: 5.90, image: null },
    { id: '2', name: 'לחם אחיד', chain: 'ramilevy' as const, price: 4.50, image: null },
    { id: '3', name: 'ביצים M', chain: 'mega' as const, price: 11.90, image: null },
    { id: '4', name: 'גבינה צהובה', chain: 'ybitan' as const, price: 22.90, image: null },
    { id: '5', name: 'לחם אורגני', chain: 'tivtaam' as const, price: 9.90, image: null },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0A0F1C', '#1A1F2E', '#0F1419']}
        style={StyleSheet.absoluteFill}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <BlurView intensity={20} tint="dark" style={styles.headerBlur}>
              <LinearGradient
                colors={['rgba(100, 200, 255, 0.15)', 'rgba(150, 100, 255, 0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.headerGradient}
              >
                <Text style={styles.title}>PriceCompare IL</Text>
                <Text style={styles.subtitle}>השווה מחירים בכל הרשתות</Text>
              </LinearGradient>
            </BlurView>

            <SearchBar
              onSearch={(query) => router.push(`/search?q=${encodeURIComponent(query)}`)}
              placeholder="חפש מוצר..."
            />

            {recentSearches.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>חיפושים אחרונים</Text>
                <View style={styles.tagsContainer}>
                  {recentSearches.slice(0, 5).map((search) => (
                    <TouchableOpacity
                      key={search}
                      onPress={() => router.push(`/search?q=${encodeURIComponent(search)}`)}
                      activeOpacity={0.8}
                    >
                      <BlurView intensity={30} tint="dark" style={styles.tag}>
                        <Text style={styles.tagText}>{search}</Text>
                      </BlurView>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>מוצרים פופולריים</Text>
              {popularProducts.map((product) => (
                <WetGlassProductCard 
                  key={product.id} 
                  product={product}
                  onPress={() => router.push(`/compare?productName=${encodeURIComponent(product.name)}`)}
                />
              ))}
            </View>

            <View style={styles.networkInfo}>
              <BlurView intensity={15} tint="dark" style={styles.networkBlur}>
                <Text style={styles.networkText}>🛒 מחפש ב-6 רשתות בו-זמנית</Text>
              </BlurView>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  headerBlur: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerGradient: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'right',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  tagText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  networkInfo: {
    marginTop: 32,
    marginBottom: 20,
  },
  networkBlur: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(100, 200, 255, 0.2)',
  },
  networkText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textAlign: 'center',
  },
});
