import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSearchStore } from '@/features/search/store/searchStore';
import { useShoppingListStore } from '@/features/shoppingList/store/shoppingListStore';
import { Product, CHAIN_CONFIGS } from '@/shared/types/product';
import { formatPrice, findCheapestProduct } from '@/shared/utils/priceUtils';
import { CompareRow } from '@/shared/ui/CompareRow';
import { Ionicons } from '@expo/vector-icons';

export default function CompareScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const { searchResults } = useSearchStore();
  const { addItem } = useShoppingListStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (params.id && searchResults) {
      const allProducts = searchResults.flatMap((r) => r.products);
      const product = allProducts.find((p) => p.id === params.id);
      
      if (product) {
        setSelectedProduct(product);
        const sameNameProducts = allProducts.filter(
          (p) => p.name.toLowerCase().includes(product.name.toLowerCase().split(' ')[0])
        );
        setComparisonProducts(sameNameProducts);
      }
    }
  }, [params.id, searchResults]);

  const cheapest = findCheapestProduct(comparisonProducts);

  if (!selectedProduct) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <Text className="text-textSecondary">מוצר לא נמצא</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 bg-primary px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold">חזור</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4">
        <View className="py-4">
          <Text className="text-2xl font-bold text-text mb-6">השוואת מחירים</Text>

          <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            <Text className="text-lg font-semibold text-text mb-4">{selectedProduct.name}</Text>

            <View className="space-y-3">
              {comparisonProducts.map((product) => {
                const isCheapest = cheapest?.id === product.id;
                return (
                  <View key={product.id} className="relative">
                    <CompareRow
                      product={product}
                      isCheapest={isCheapest}
                      onPress={() => {}}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        addItem(product, 1);
                      }}
                      className="absolute top-4 left-4 bg-primary p-2 rounded-lg"
                    >
                      <Ionicons name="add" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>

          {cheapest && (
            <View className="bg-green-50 rounded-2xl p-4 mb-4 border border-green-200">
              <Text className="text-lg font-semibold text-green-800 mb-2">
                המחיר הטוב ביותר:
              </Text>
              <Text className="text-2xl font-bold text-green-900">
                {formatPrice(cheapest.price)} ב-{CHAIN_CONFIGS[cheapest.chain].name}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

