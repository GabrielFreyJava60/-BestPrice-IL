# 🚀 PriceCompare IL - Setup Instructions

## Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Start the development server:**
```bash
npm start
```

3. **Run on your platform:**
- iOS: `npm run ios`
- Android: `npm run android`
- Web: `npm run web`

## Project Structure

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
│   │   └── shoppingList/ # Shopping list feature
│   ├── shared/           # Shared code
│   │   ├── ui/          # Reusable components
│   │   ├── types/       # TypeScript types
│   │   └── utils/       # Utility functions
│   └── services/         # API clients
└── assets/               # Images, fonts, etc.
```

## Features Implemented

✅ Multi-chain search (Shufersal, Rami Levy, Victory)
✅ Price comparison with highlighting
✅ Shopping list with totals
✅ Multi-language support (Hebrew, English, Russian)
✅ Recent searches persistence
✅ Modern UI with NativeWind
✅ TypeScript throughout
✅ Clean architecture

## API Integration

The app includes API clients for all three chains with fallback mock data for development.

## Next Steps

1. Add AdMob integration for monetization
2. Implement Pro subscription
3. Add price history tracking
4. Optimize API calls with better caching
5. Add product images from APIs

