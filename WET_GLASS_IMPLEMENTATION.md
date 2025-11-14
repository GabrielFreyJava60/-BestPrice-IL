# 🚀 Wet Glass iOS 26 Implementation Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install expo-blur expo-linear-gradient react-native-reanimated
```

### 2. Import Components

```tsx
import { WetGlassCard } from '@/shared/ui/wetGlass/WetGlassCard';
import { LiquidSearchBar } from '@/shared/ui/wetGlass/LiquidSearchBar';
import { WetGlassBackground } from '@/shared/ui/wetGlass/WetGlassBackground';
```

### 3. Use in Your Screens

```tsx
export default function MyScreen() {
  return (
    <WetGlassBackground>
      <SafeAreaView>
        <LiquidSearchBar onSearch={handleSearch} />
        <WetGlassCard>
          <Text>Your content</Text>
        </WetGlassCard>
      </SafeAreaView>
    </WetGlassBackground>
  );
}
```

## Component Integration

### Replace Existing Components

#### Before (Standard):
```tsx
<View style={styles.card}>
  <Text>{product.name}</Text>
</View>
```

#### After (Wet Glass):
```tsx
<WetGlassCard glowColor="#00D9FF">
  <Text style={WetGlassTheme.typography.body}>{product.name}</Text>
</WetGlassCard>
```

### Update Screens

1. **Wrap with WetGlassBackground**
2. **Replace cards with WetGlassCard**
3. **Use LiquidSearchBar instead of TextInput**
4. **Add FloatingActionButton for actions**
5. **Use FrostedNavigationBar for navigation**

## Theme Integration

### Apply Theme Globally

```tsx
// app/_layout.tsx
import { WetGlassTheme } from '@/shared/design/wetGlassTheme';

export default function RootLayout() {
  return (
    <ThemeProvider theme={WetGlassTheme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### Use Theme Values

```tsx
import { WetGlassTheme } from '@/shared/design/wetGlassTheme';

const styles = StyleSheet.create({
  text: {
    ...WetGlassTheme.typography.body,
    color: WetGlassTheme.colors.text.primary,
  },
  container: {
    padding: WetGlassTheme.spacing.md,
    borderRadius: WetGlassTheme.borderRadius.lg,
  },
});
```

## Animation Setup

### Configure Reanimated

```tsx
// babel.config.js
module.exports = {
  plugins: [
    'react-native-reanimated/plugin',
  ],
};
```

### Add Animations

```tsx
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const scale = useSharedValue(1);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));

// Use in component
<Animated.View style={animatedStyle}>
  <WetGlassCard />
</Animated.View>
```

## Performance Optimization

### 1. Memoize Components

```tsx
const MemoizedCard = React.memo(WetGlassCard);
```

### 2. Optimize Blur Intensity

- Use lower intensity (10-20) for lists
- Use higher intensity (40-60) for modals
- Disable blur on low-end devices

### 3. Reduce Shadow Layers

```tsx
// Lightweight version
<WetGlassCard 
  intensity={10}
  style={{ shadowOpacity: 0.1 }}
/>
```

## Platform-Specific Adjustments

### iOS
- Native blur works perfectly
- Full effect support
- 60fps performance

### Android
- Native blur supported
- May need intensity adjustment
- Test on various devices

### Web
- Fallback blur via CSS
- Reduced effects for performance
- Gradient fallbacks

## Common Patterns

### Card List

```tsx
{products.map((product) => (
  <WetGlassProductCard
    key={product.id}
    product={product}
    onPress={() => navigate(product)}
  />
))}
```

### Settings Panel

```tsx
<WetGlassCard>
  <View style={styles.settingRow}>
    <Text>Setting Name</Text>
    <LiquidToggle value={enabled} onValueChange={setEnabled} />
  </View>
</WetGlassCard>
```

### Search Interface

```tsx
<View>
  <LiquidSearchBar onSearch={handleSearch} />
  <ScrollView>
    {results.map(item => (
      <WetGlassCard key={item.id}>
        {item.content}
      </WetGlassCard>
    ))}
  </ScrollView>
</View>
```

## Troubleshooting

### Blur Not Working
- Ensure `expo-blur` is installed
- Check platform support
- Verify BlurView import

### Performance Issues
- Reduce blur intensity
- Limit shadow layers
- Use memoization
- Profile with React DevTools

### Colors Not Showing
- Check theme import
- Verify color values
- Ensure opacity values

## Best Practices

1. **Consistent Spacing**: Use theme spacing values
2. **Color Harmony**: Stick to neon palette
3. **Blur Levels**: Match intensity to context
4. **Animation Timing**: Use spring physics
5. **Accessibility**: Maintain contrast ratios

## Export Checklist

- [ ] All components exported from index.ts
- [ ] Theme values documented
- [ ] Examples created
- [ ] Performance tested
- [ ] Platform compatibility verified
- [ ] Documentation complete

