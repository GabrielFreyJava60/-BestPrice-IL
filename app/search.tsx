import { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { searchAllChains } from '@/features/search/api/searchApi';
import { useSearchStore } from '@/features/search/store/searchStore';
import { useShoppingListStore } from '@/features/shoppingList/store/shoppingListStore';
import { ProductCard } from '@/shared/ui/ProductCard';
import { SearchBar } from '@/features/search/components/SearchBar';
import { CHAIN_CONFIGS } from '@/shared/types/product';
import { Ionicons } from '@expo/vector-icons';

export default function SearchResultsScreen() {
  const params = useLocalSearchParams<{ q?: string }>();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(params.q || '');
  const { addRecentSearch, setSearchResults, setCurrentQuery } = useSearchStore();
  const { addItem } = useShoppingListStore();

  const { data: results, isLoading, refetch } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: () => searchAllChains(searchQuery),
    enabled: !!searchQuery,
  });

  useEffect(() => {
    if (searchQuery && results) {
      setSearchResults(results);
      setCurrentQuery(searchQuery);
      addRecentSearch(searchQuery);
    }
  }, [results, searchQuery, setSearchResults, setCurrentQuery, addRecentSearch]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const allProducts = results?.flatMap((result) => result.products) || [];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4 py-4 border-b border-gray-200">
        <SearchBar onSearch={handleSearch} defaultValue={searchQuery} />
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0066CC" />
          <Text className="mt-4 text-textSecondary">טוען תוצאות...</Text>
        </View>
      ) : (
        <ScrollView
          className="flex-1 px-4"
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />}
        >
          {results && (
            <View className="py-4">
              {results.map((result) => (
                <View key={result.chain} className="mb-6">
                  <View className="flex-row items-center mb-3">
                    <View
                      className="px-3 py-1 rounded-lg mr-2"
                      style={{ backgroundColor: CHAIN_CONFIGS[result.chain].color + '20' }}
                    >
                      <Text
                        className="text-sm font-semibold"
                        style={{ color: CHAIN_CONFIGS[result.chain].color }}
                      >
                        {CHAIN_CONFIGS[result.chain].name}
                      </Text>
                    </View>
                    {result.isLoading && <ActivityIndicator size="small" />}
                    {result.error && (
                      <Text className="text-xs text-red-500 ml-2">{result.error}</Text>
                    )}
                  </View>

                  {result.products.length > 0 ? (
                    result.products.map((product) => (
                      <View key={product.id} className="mb-2 relative">
                        <ProductCard
                          product={product}
                          showChain={false}
                          onPress={() => router.push(`/compare?id=${product.id}`)}
                        />
                        <TouchableOpacity
                          onPress={() => addItem(product, 1)}
                          className="absolute top-2 right-2 bg-secondary p-2 rounded-lg"
                        >
                          <Ionicons name="cart" size={18} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    ))
                  ) : (
                    <Text className="text-textSecondary text-center py-4">
                      לא נמצאו תוצאות
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {allProducts.length === 0 && !isLoading && (
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-xl text-textSecondary mb-2">לא נמצאו תוצאות</Text>
              <Text className="text-textSecondary">נסה לחפש מוצר אחר</Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

