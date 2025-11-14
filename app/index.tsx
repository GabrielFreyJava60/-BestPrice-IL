import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from '@/features/search/components/SearchBar';
import { useRecentSearches } from '@/features/search/store/searchStore';
import { ProductCard } from '@/shared/ui/ProductCard';

export default function HomeScreen() {
  const router = useRouter();
  const recentSearches = useRecentSearches();

  const popularProducts = [
    { id: '1', name: 'חלב 3%', chain: 'shufersal' as const, price: 5.90, image: null },
    { id: '2', name: 'לחם אחיד', chain: 'ramilevy' as const, price: 4.50, image: null },
    { id: '3', name: 'ביצים', chain: 'victory' as const, price: 12.90, image: null },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4">
        <View className="py-6">
          <Text className="text-3xl font-bold text-text mb-2">PriceCompare IL</Text>
          <Text className="text-textSecondary mb-6">השווה מחירים בין רשתות</Text>

          <SearchBar
            onSearch={(query) => router.push(`/search?q=${encodeURIComponent(query)}`)}
            placeholder="חפש מוצר..."
          />

          {recentSearches.length > 0 && (
            <View className="mt-6">
              <Text className="text-lg font-semibold text-text mb-3">חיפושים אחרונים</Text>
              <View className="flex-row flex-wrap gap-2">
                {recentSearches.slice(0, 5).map((search) => (
                  <TouchableOpacity
                    key={search}
                    onPress={() => router.push(`/search?q=${encodeURIComponent(search)}`)}
                    className="bg-surface px-4 py-2 rounded-full"
                  >
                    <Text className="text-textSecondary">{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <View className="mt-6">
            <Text className="text-lg font-semibold text-text mb-3">מוצרים פופולריים</Text>
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
