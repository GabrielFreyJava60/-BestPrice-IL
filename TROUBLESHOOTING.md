# 🔧 Устранение неполадок - PriceCompare IL

## Общие потенциальные ошибки и как их исправить

### 1. Проблемы с API супермаркетов (самая частая)

#### Ошибка:
API супермаркетов (Shufersal, Rami Levy, Victory) могли изменить свой формат ответа (JSON структуру), URL или ввести ограничения (rate limiting). Приложение будет "падать" или не показывать данные.

#### Решение:

**Проверка API:**
```bash
# Используйте Postman или curl для проверки API
curl -X GET "https://www.shufersal.co.il/online/web/product/search?searchTerm=חלב"
curl -X GET "https://www.rami-levy.co.il/api/catalog/search/חלב"
curl -X GET "https://api.victory.co.il/api/products/search?query=חלב"
```

**Обработка ошибок:**

Проверьте файлы в `src/features/search/api/`:
- `shufersalApi.ts`
- `ramiLevyApi.ts`
- `victoryApi.ts`

Убедитесь, что есть блоки `try...catch`:

```typescript
export const searchShufersal = async (query: string): Promise<Product[]> => {
  try {
    const url = `https://www.shufersal.co.il/online/web/product/search?searchTerm=${encodeURIComponent(query)}`;
    const data = await apiClient.get<ShufersalResponse>(url);
    
    if (!data.products || data.products.length === 0) {
      return getMockShufersalProducts(query);
    }
    
    return normalizeShufersalProducts(data.products);
  } catch (error) {
    console.warn('Shufersal API failed, using mock data:', error);
    return getMockShufersalProducts(query);
  }
};
```

**Типизация (TypeScript):**

Проверьте соответствие типов в `src/shared/types/product.ts`:

```typescript
interface Product {
  id: string;
  name: string;
  image: string | null;
  chain: Chain;
  price: number;
  unitPrice?: number;
  quantity?: string;
}
```

Если API изменил структуру, обновите типы и нормализацию данных.

---

### 2. Управление состоянием (Zustand / TanStack Query)

#### Ошибка:
Данные не обновляются на экране после получения с сервера, или кэш (TanStack Query) показывает устаревшие цены.

#### Решение:

**TanStack Query:**

Проверьте настройки в `app/_layout.tsx`:

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  },
});
```

Для принудительного обновления используйте:

```typescript
import { useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();
queryClient.invalidateQueries({ queryKey: ['products'] });
```

**Zustand:**

Проверьте файлы:
- `src/features/search/store/searchStore.ts`
- `src/features/shoppingList/store/shoppingListStore.ts`

Не мутируйте состояние напрямую:

```typescript
set((state) => ({
  items: [...state.items, newItem],
}));
```

---

### 3. Стилизация (NativeWind / Tailwind)

#### Ошибка:
Элементы выглядят по-разному на iOS, Android и в вебе.

#### Решение:

**NativeWind отключен** в текущей конфигурации из-за конфликтов с Babel.

Используйте `StyleSheet.create()`:

```typescript
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

Для платформо-специфичных стилей:

```typescript
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
});
```

---

### 4. Навигация (Expo Router)

#### Ошибка:
Ошибки при передаче параметров между экранами или неправильная работа "back" (назад).

#### Решение:

**Передача параметров:**

```typescript
import { useRouter } from 'expo-router';

const router = useRouter();

router.push({
  pathname: '/search',
  params: { query: 'milk' }
});
```

**Получение параметров:**

```typescript
import { useLocalSearchParams } from 'expo-router';

const { query } = useLocalSearchParams<{ query: string }>();
```

**Навигация назад:**

```typescript
import { useRouter } from 'expo-router';

const router = useRouter();
router.back();
```

---

### 5. Проблемы с Expo Go / SDK

#### Ошибка:
"Project is incompatible with this version of Expo Go"

#### Решение:

```bash
# Обновите Expo до последней версии
npm install expo@latest

# Обновите все зависимости Expo
npx expo install --fix

# Очистите кэш и перезапустите
rm -rf node_modules .expo
npm install
npx expo start --clear
```

---

### 6. Ошибки Babel / Metro Bundler

#### Ошибка:
"[BABEL] .plugins is not a valid Plugin property"

#### Решение:

Проверьте `babel.config.js`:

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
};
```

Плагины должны быть строками или массивами, а не объектами.

Очистите кэш:

```bash
npx expo start --clear
```

---

### 7. Ошибки NavigationContainer

#### Ошибка:
"Couldn't register the navigator. Have you wrapped your app with 'NavigationContainer'?"

#### Решение:

**Expo Router автоматически создает NavigationContainer.**

Не оборачивайте `<Tabs>` дополнительными провайдерами:

```typescript
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs>
        {/* screens */}
      </Tabs>
    </QueryClientProvider>
  );
}
```

Если проблема сохраняется, проверьте дублирование `@react-navigation/native`:

```bash
npm list @react-navigation/native

# Если есть конфликты версий:
npm uninstall @react-navigation/native
rm -rf node_modules package-lock.json
npm install
```

---

### 8. Проблемы с assets (иконки, изображения)

#### Ошибка:
"Unable to resolve asset ./assets/icon.png"

#### Решение:

Убедитесь, что папка `assets/` содержит:
- `icon.png` (1024x1024)
- `splash.png` (2048x2048)
- `adaptive-icon.png` (1024x1024)
- `favicon.png` (48x48)

Проверьте `app.json`:

```json
{
  "expo": {
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png"
    }
  }
}
```

---

## Полезные команды для диагностики

```bash
# Проверка установленных зависимостей
npm list

# Проверка версии Expo
npx expo --version

# Проверка совместимости
npx expo-doctor

# Очистка всего кэша
rm -rf node_modules .expo .expo-shared
npm install
npx expo start --clear

# Просмотр логов
npx expo start
# Затем нажмите 'j' для логов
```

---

## Контрольный список при проблемах

- [ ] Обновлен ли Expo до последней версии?
- [ ] Совместимы ли версии зависимостей?
- [ ] Очищен ли кэш Metro Bundler?
- [ ] Существуют ли все необходимые assets файлы?
- [ ] Правильно ли настроен `babel.config.js`?
- [ ] Есть ли конфликты версий `@react-navigation/*`?
- [ ] Работают ли API супермаркетов?
- [ ] Проверены ли типы TypeScript?
- [ ] Обработаны ли все `try...catch` блоки?
- [ ] iPhone и компьютер в одной Wi-Fi сети?

---

## Дополнительные ресурсы

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Docs](https://expo.github.io/router/docs/)
- [React Navigation](https://reactnavigation.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://docs.pmnd.rs/zustand/)

