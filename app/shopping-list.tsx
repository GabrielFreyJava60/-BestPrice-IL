import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatPrice } from '@/shared/utils/priceUtils';
import { ProductCard } from '@/shared/ui/ProductCard';
import { useShoppingListStore } from '@/features/shoppingList/store/shoppingListStore';
import { Ionicons } from '@expo/vector-icons';

export default function ShoppingListScreen() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotal } = useShoppingListStore();
  const total = getTotal();


  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-text">רשימת קניות</Text>
          <TouchableOpacity
            onPress={() => router.push('/search')}
            className="bg-primary px-4 py-2 rounded-xl"
          >
            <Text className="text-white font-semibold">+ הוסף מוצר</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4">
        {items.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="cart-outline" size={64} color="#ccc" />
            <Text className="text-xl text-textSecondary mt-4 mb-2">הרשימה ריקה</Text>
            <Text className="text-textSecondary text-center">
              לחץ על "הוסף מוצר" כדי להתחיל
            </Text>
          </View>
        ) : (
          <View className="py-4">
            {items.map((item) => (
              <View key={item.id} className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
                <ProductCard product={item.product} showChain={true} />
                <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
                    >
                      <Text className="text-lg font-bold">-</Text>
                    </TouchableOpacity>
                    <Text className="mx-4 text-lg font-semibold">{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
                    >
                      <Text className="text-lg font-bold">+</Text>
                    </TouchableOpacity>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-lg font-bold text-text mr-3">
                      {formatPrice(item.product.price * item.quantity)}
                    </Text>
                    <TouchableOpacity
                      onPress={() => removeItem(item.id)}
                      className="bg-red-100 p-2 rounded-lg"
                    >
                      <Ionicons name="trash-outline" size={20} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {items.length > 0 && (
        <View className="px-4 py-4 bg-white border-t border-gray-200">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-xl font-semibold text-text">סה"כ:</Text>
            <Text className="text-2xl font-bold text-primary">{formatPrice(total)}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              router.push('/compare');
            }}
            className="bg-secondary py-4 rounded-xl"
          >
            <Text className="text-white text-center text-lg font-semibold">
              מצא את העגלה הזולה ביותר
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

