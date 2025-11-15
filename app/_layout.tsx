import { Stack, Tabs } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import '../src/styles/global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  },
});

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: '#0066CC',
              tabBarInactiveTintColor: '#999',
              tabBarStyle: {
                borderTopWidth: 1,
                borderTopColor: '#E5E5E5',
              },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: 'בית',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="search"
              options={{
                title: 'חיפוש',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="search" size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="shopping-list"
              options={{
                title: 'רשימה',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="cart" size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="settings"
              options={{
                title: 'הגדרות',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="settings" size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="compare"
              options={{
                href: null,
              }}
            />
            <Tabs.Screen
              name="web"
              options={{
                href: null,
              }}
            />
          </Tabs>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
