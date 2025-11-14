# 🏗️ Architecture Overview

## Clean Architecture Principles

The project follows clean architecture with feature-based organization:

```
src/
├── features/          # Feature modules (business logic)
│   ├── search/       # Search feature
│   ├── compare/      # Comparison feature
│   └── shoppingList/ # Shopping list feature
├── shared/           # Shared code (cross-cutting concerns)
│   ├── ui/          # Reusable UI components
│   ├── types/       # TypeScript type definitions
│   ├── utils/       # Utility functions
│   └── config/      # Configuration
├── services/         # External services (API clients)
└── hooks/           # Custom React hooks
```

## Feature Structure

Each feature follows this structure:

```
feature/
├── api/            # API calls specific to feature
├── components/     # Feature-specific components
├── screens/        # Screen components
├── store/          # Zustand state management
└── hooks/          # Feature-specific hooks
```

## State Management

- **Zustand** for global state
- **TanStack Query** for server state and caching
- **AsyncStorage** for persistence

## Data Flow

1. User action → Component
2. Component → Hook/Store
3. Hook → API Service
4. API Service → External API
5. Response → Normalizer
6. Normalized data → Store
7. Store update → Component re-render

## API Integration

- **Base API Client:** Axios wrapper with interceptors
- **Chain-specific APIs:** Separate clients for each supermarket
- **Unified Search:** Aggregates results from all chains
- **Normalization:** Converts API responses to unified Product interface
- **Mock Fallback:** Provides mock data when APIs fail

## Type Safety

- Full TypeScript coverage
- Strict mode enabled
- Path aliases for clean imports
- Shared type definitions

## Styling

- **NativeWind** (Tailwind CSS for React Native)
- Utility-first approach
- Theme configuration
- RTL support for Hebrew

## Navigation

- **Expo Router** file-based routing
- Tab navigation for main screens
- Stack navigation for detail screens
- Type-safe navigation params

