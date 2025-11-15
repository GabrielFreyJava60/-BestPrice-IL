#!/bin/bash
echo "🚀 Запуск PriceCompare IL"
echo ""
echo "📂 Проверка директории..."
pwd
echo ""

if [ ! -f "package.json" ]; then
  echo "❌ Ошибка: package.json не найден!"
  echo "Убедитесь, что вы находитесь в директории проекта"
  exit 1
fi

if [ ! -d "assets" ]; then
  echo "❌ Ошибка: папка assets не найдена!"
  echo "Создаю папку assets..."
  mkdir -p assets
fi

echo "✅ Все проверки пройдены"
echo ""
echo "🚀 Запускаю Metro Bundler..."
echo ""

npx expo start --clear
