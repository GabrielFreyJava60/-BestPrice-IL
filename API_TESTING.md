# 🧪 Тестирование API супермаркетов

## Быстрая проверка API

### 1. Shufersal

```bash
curl -X GET "https://www.shufersal.co.il/online/web/product/search?searchTerm=חלב" \
  -H "Accept: application/json" \
  -H "User-Agent: Mozilla/5.0" \
  | python3 -m json.tool
```

**Ожидаемый формат ответа:**
```json
{
  "products": [
    {
      "id": "string",
      "name": "string",
      "price": number,
      "imageUrl": "string",
      "unitPrice": number,
      "quantity": "string"
    }
  ]
}
```

### 2. Rami Levy

```bash
curl -X GET "https://www.rami-levy.co.il/api/catalog/search/חלב" \
  -H "Accept: application/json" \
  | python3 -m json.tool
```

**Ожидаемый формат ответа:**
```json
{
  "items": [
    {
      "productId": "string",
      "productName": "string",
      "price": number,
      "image": "string",
      "unitPrice": number,
      "packageSize": "string"
    }
  ]
}
```

### 3. Victory

```bash
curl -X GET "https://api.victory.co.il/api/products/search?query=חלב" \
  -H "Accept: application/json" \
  | python3 -m json.tool
```

**Ожидаемый формат ответа:**
```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "price": number,
      "image": "string",
      "pricePerUnit": number,
      "size": "string"
    }
  ]
}
```

---

## Если API не работает

### Вариант 1: Использовать моковые данные

Приложение уже настроено на использование моковых данных при ошибках API.

Проверьте функции `getMock*Products()` в:
- `src/features/search/api/shufersalApi.ts`
- `src/features/search/api/ramiLevyApi.ts`
- `src/features/search/api/victoryApi.ts`

### Вариант 2: Создать прокси-сервер

Если API блокирует прямые запросы:

```javascript
// server.js (Node.js прокси)
const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/shufersal/:query', async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.shufersal.co.il/online/web/product/search?searchTerm=${req.params.query}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);
```

### Вариант 3: Обновить URL API

Если API переехали, обновите URL в:
- `src/shared/config/api.ts`
- `src/shared/config/constants.ts`
- Файлы в `src/features/search/api/`

---

## Тестирование в приложении

```typescript
// Добавьте логирование в API файлы
console.log('API Request:', url);
console.log('API Response:', data);
console.log('Normalized Products:', products);
```

Проверьте логи в Metro Bundler или в консоли браузера.
