# ✨ Features Overview

## 🔍 Search Feature

- **Multi-chain search:** Search across Shufersal, Rami Levy, and Victory simultaneously
- **Parallel API calls:** All chains queried in parallel for fast results
- **Loading states:** Individual loading indicators per chain
- **Error handling:** Graceful fallback to mock data if APIs fail
- **Recent searches:** Persisted search history (last 10 searches)

## 💰 Price Comparison

- **Side-by-side comparison:** Compare prices for the same product across chains
- **Cheapest highlighting:** Automatically highlights the lowest price
- **Unit price display:** Shows price per unit when available
- **Visual indicators:** Color-coded chain badges

## 📝 Shopping List

- **Add products:** Add items from search results
- **Quantity management:** Increase/decrease quantities
- **Total calculation:** Automatic total price calculation
- **Remove items:** Delete items from list
- **Find cheapest cart:** Button to optimize shopping across chains

## ⚙️ Settings

- **Language selection:** Hebrew, English, Russian
- **Theme:** Light, Dark, Auto
- **Preferred chain:** Set default supermarket
- **Notifications:** Toggle price alerts
- **Pro subscription:** Placeholder for premium features

## 🎨 UI Components

- **ProductCard:** Display product with image, price, chain badge
- **PriceTag:** Formatted price display
- **CompareRow:** Comparison row with highlighting
- **SearchBar:** Search input with clear button
- **LoadingSpinner:** Loading indicator
- **ErrorView:** Error state display
- **EmptyState:** Empty state with action button
- **Button:** Reusable button component
- **ChainBadge:** Chain identifier badge

## 🔧 Technical Features

- **TypeScript:** Full type safety
- **State management:** Zustand with persistence
- **API caching:** TanStack Query for efficient data fetching
- **Offline support:** AsyncStorage for local persistence
- **Clean architecture:** Feature-based folder structure
- **RTL support:** Right-to-left for Hebrew

