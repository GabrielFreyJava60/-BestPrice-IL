# 📱 PriceCompare IL

A cross-platform mobile application for comparing supermarket prices in Israel. Built with Expo, React Native, and TypeScript.

## ✨ Features

- 🔍 **Multi-chain search** - Search products across Shufersal, Rami Levy, and Victory simultaneously
- 💰 **Price comparison** - Compare prices side-by-side with cheapest highlighting
- 📝 **Shopping list** - Create and manage shopping lists with automatic totals
- 🌍 **Multi-language** - Hebrew, English, and Russian support
- 🎨 **Modern UI** - Clean Israeli-market design with glassmorphism effects
- 📱 **Cross-platform** - iOS, Android, and Web support

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platform
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser
```

## 📂 Project Structure

```
price-compare-il/
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout with tabs
│   ├── index.tsx          # Home screen
│   ├── search.tsx         # Search results
│   ├── compare.tsx        # Price comparison
│   ├── shopping-list.tsx  # Shopping list
│   └── settings.tsx       # Settings
├── src/
│   ├── features/          # Feature modules
│   │   ├── search/       # Search feature
│   │   ├── compare/      # Comparison feature
│   │   └── shoppingList/ # Shopping list feature
│   ├── shared/           # Shared code
│   │   ├── ui/          # Reusable components
│   │   ├── types/       # TypeScript types
│   │   ├── utils/       # Utility functions
│   │   └── config/      # Configuration
│   ├── services/         # API clients
│   └── hooks/           # Custom hooks
└── assets/               # Images, fonts
```

## 🛠 Tech Stack

- **Framework:** Expo ~51.0.0
- **Language:** TypeScript 5.3+
- **State Management:** Zustand 4.5+
- **API Caching:** TanStack Query 5.17+
- **Styling:** NativeWind 4.0+ (Tailwind CSS)
- **Navigation:** Expo Router 3.5+
- **HTTP Client:** Axios 1.6+

## 📋 API Integration

The app integrates with three supermarket APIs:

- **Shufersal:** `https://www.shufersal.co.il/online/web/product/search`
- **Rami Levy:** `https://www.rami-levy.co.il/api/catalog/search`
- **Victory:** `https://api.victory.co.il/api/products/search`

All APIs include mock data fallback for development and testing.

## 🎯 Screens

1. **Home** - Search input, recent searches, popular products
2. **Search** - Results from all chains with loading states
3. **Compare** - Side-by-side price comparison
4. **Shopping List** - Manage items with totals
5. **Settings** - Language, theme, preferences

## 🔧 Development

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Formatting
npm run format
```

## 📱 Building for Production

### iOS
```bash
eas build --platform ios
```

### Android
```bash
eas build --platform android
```

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🙏 Acknowledgments

- Expo team for the amazing framework
- React Native community
- All supermarket APIs for providing data access
