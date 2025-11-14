# 🎨 Wet Glass Component Library

## Complete UI Kit

### Core Components

#### 1. **WetGlassCard**
Premium glass card with blur, gradients, and reflections.

```tsx
<WetGlassCard
  glowColor="#00D9FF"
  borderRadius={24}
  padding={16}
  intensity={20}
>
  {children}
</WetGlassCard>
```

**Props:**
- `children`: ReactNode
- `style?`: ViewStyle
- `intensity?`: number (blur intensity, default: 20)
- `borderRadius?`: number (default: 24)
- `borderWidth?`: number (default: 1)
- `glowColor?`: string (neon glow color)
- `padding?`: number (default: 16)

**Features:**
- BlurView backdrop
- Multi-layer gradient
- Water droplet reflection
- Neon glow shadow
- Translucent border

---

#### 2. **LiquidSearchBar**
Animated search bar with liquid reflection effects.

```tsx
<LiquidSearchBar
  placeholder="חפש מוצר..."
  onSearch={(query) => handleSearch(query)}
  value={searchQuery}
  onChangeText={setSearchQuery}
/>
```

**Props:**
- `placeholder?`: string
- `onSearch`: (query: string) => void
- `value?`: string
- `onChangeText?`: (text: string) => void

**Features:**
- Animated liquid reflection
- Neon border accent
- Clear button
- Search button with gradient
- Blur backdrop

---

#### 3. **FloatingActionButton**
3D floating button with multiple glow rings.

```tsx
<FloatingActionButton
  icon="add"
  label="הוסף"
  onPress={() => handlePress()}
  size={56}
  glowColor="#00D9FF"
/>
```

**Props:**
- `onPress`: () => void
- `icon`: Ionicons name
- `label?`: string
- `size?`: number (default: 56)
- `glowColor?`: string

**Features:**
- Double glow rings
- Glass refraction
- Reflection highlight
- Depth shadow
- Spring animation ready

---

#### 4. **WetGlassPriceTag**
Price display with neon glow and glass effect.

```tsx
<WetGlassPriceTag
  price={29.90}
  unitPrice={5.98}
  currency="₪"
  glowColor="#00D9FF"
  size="medium"
/>
```

**Props:**
- `price`: number
- `unitPrice?`: number
- `currency?`: string (default: "₪")
- `glowColor?`: string
- `size?`: "small" | "medium" | "large"

**Features:**
- Neon text glow
- Glass container
- Unit price display
- Size variants

---

#### 5. **FrostedNavigationBar**
Bottom navigation with liquid reflection line.

```tsx
<FrostedNavigationBar
  tabs={[
    { name: 'home', icon: 'home', label: 'בית' },
    { name: 'search', icon: 'search', label: 'חיפוש' },
  ]}
  activeTab="home"
  onTabPress={(tab) => setActiveTab(tab)}
/>
```

**Props:**
- `tabs`: TabItem[]
- `activeTab`: string
- `onTabPress`: (tabName: string) => void

**Features:**
- Heavy blur (60px)
- Liquid reflection line
- Active tab indicator
- Neon icon glow
- Smooth transitions

---

#### 6. **LiquidToggle**
Animated toggle switch with liquid glass effect.

```tsx
<LiquidToggle
  value={isEnabled}
  onValueChange={setIsEnabled}
  activeColor="#00D9FF"
  inactiveColor="rgba(255, 255, 255, 0.3)"
/>
```

**Props:**
- `value`: boolean
- `onValueChange`: (value: boolean) => void
- `activeColor?`: string
- `inactiveColor?`: string

**Features:**
- Spring animation
- Color interpolation
- Glass thumb
- Reflection highlight
- Smooth transitions

---

#### 7. **WetGlassProductCard**
Complete product card with wet glass styling.

```tsx
<WetGlassProductCard
  product={product}
  onPress={() => handlePress()}
  onAddToCart={() => handleAdd()}
  showChain={true}
/>
```

**Props:**
- `product`: Product
- `onPress?`: () => void
- `onAddToCart?`: () => void
- `showChain?`: boolean

**Features:**
- Image with glass overlay
- Chain badge
- Price tag integration
- Add to cart button
- Full wet glass styling

---

#### 8. **WetGlassBackground**
Animated gradient background with light orbs.

```tsx
<WetGlassBackground variant="primary">
  {children}
</WetGlassBackground>
```

**Props:**
- `children`: ReactNode
- `variant?`: "primary" | "secondary"

**Features:**
- Multi-color gradient
- Subtle noise texture
- Animated light orbs
- Depth layering

---

## Design Tokens

### Colors
```typescript
WetGlassTheme.colors.background.primary
WetGlassTheme.colors.neon.blue
WetGlassTheme.colors.glass.light
WetGlassTheme.colors.text.primary
```

### Spacing
```typescript
WetGlassTheme.spacing.xs  // 4px
WetGlassTheme.spacing.sm  // 8px
WetGlassTheme.spacing.md  // 16px
WetGlassTheme.spacing.lg  // 24px
```

### Typography
```typescript
WetGlassTheme.typography.h1
WetGlassTheme.typography.body
WetGlassTheme.typography.caption
```

### Shadows
```typescript
WetGlassTheme.shadows.glass
WetGlassTheme.shadows.neon
WetGlassTheme.shadows.depth
```

## Usage Examples

See `app/examples/` for complete screen implementations:
- `wet-glass-home.tsx` - Home screen example
- `wet-glass-settings.tsx` - Settings screen example

## Performance Notes

- All components use native BlurView for 60fps performance
- Gradients are optimized with LinearGradient
- Animations use react-native-reanimated
- Shadows are layered for depth without performance cost
- Reflections use absolute positioning for minimal overhead

## Customization

All components accept style props and can be customized:
- Colors via `glowColor` prop
- Sizes via size props
- Effects via intensity props
- Layout via style prop

## Browser/Platform Support

- ✅ iOS (native blur)
- ✅ Android (native blur)
- ✅ Web (fallback blur)
- ✅ All Expo platforms

