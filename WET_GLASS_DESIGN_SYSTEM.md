# 🎨 Wet Glass iOS 26 Design System

## Design Philosophy

The "Wet Glass" design system creates a premium, futuristic aesthetic inspired by iOS 26, featuring translucent surfaces, liquid reflections, and neon accents.

## 🎨 Color Palette

### Background Gradients
- **Primary Background:** `#0A0E27` (Deep navy)
- **Secondary Background:** `#1A1F3A` (Dark blue-gray)
- **Gradient Range:** `#0A0E27 → #1A1F3A → #2A2F4A`

### Neon Accents (Reflective)
- **Blue:** `#00D9FF` - Primary accent
- **Cyan:** `#00FFFF` - Secondary accent
- **Purple:** `#9D4EDD` - Tertiary accent
- **Pink:** `#FF006E` - Accent highlight

### Glass Surfaces
- **Light Glass:** `rgba(255, 255, 255, 0.1)` - Subtle transparency
- **Medium Glass:** `rgba(255, 255, 255, 0.15)` - Standard cards
- **Dark Glass:** `rgba(255, 255, 255, 0.05)` - Background elements
- **Border:** `rgba(255, 255, 255, 0.2)` - Edge definition
- **Highlight:** `rgba(255, 255, 255, 0.3)` - Water droplet effect

## 📐 Spacing System

Based on 8px grid:
- **XS:** 4px
- **SM:** 8px
- **MD:** 16px
- **LG:** 24px
- **XL:** 32px
- **XXL:** 48px

## 🔲 Border Radius

- **SM:** 12px - Small elements
- **MD:** 20px - Standard cards
- **LG:** 24px - Large cards
- **XL:** 32px - Extra large containers
- **Full:** 9999px - Circular elements

## 🌫 Blur Effects

- **Light:** 10px - Subtle backgrounds
- **Medium:** 20px - Standard cards
- **Heavy:** 40px - Navigation bars
- **Extra Heavy:** 60px - Modal overlays

## ✨ Visual Effects

### Reflection (Water Droplet)
- **Intensity:** 0.3
- **Position:** Top 30%, Left 30%
- **Size:** 40% width, 20% height
- **Opacity:** 0.5-0.6

### Bloom (Glow)
- **Intensity:** 0.6
- **Radius:** 20px
- **Color:** Matches neon accent

### Refraction
- **Intensity:** 0.4
- **Distortion:** 0.1
- Creates depth illusion

## 🎯 Component Specifications

### WetGlassCard
- **Blur:** 20px (medium)
- **Border:** 1px, rgba(255, 255, 255, 0.2)
- **Padding:** 16px
- **Border Radius:** 24px
- **Shadow:** Glass shadow with neon glow

### LiquidSearchBar
- **Blur:** 30px
- **Border:** 1.5px, rgba(0, 217, 255, 0.4)
- **Height:** 56px
- **Border Radius:** 24px
- **Reflection:** Top 30%, animated

### FloatingActionButton
- **Size:** 56px (standard)
- **Blur:** 40px
- **Glow Rings:** 2 layers
- **Border Radius:** Full circle
- **Shadow:** Depth shadow

### WetGlassPriceTag
- **Blur:** 25px
- **Border:** 1px, neon accent color
- **Padding:** 12px (medium)
- **Border Radius:** 16px
- **Text Shadow:** Neon glow

### FrostedNavigationBar
- **Blur:** 60px (extra heavy)
- **Height:** 80px
- **Top Border:** 1px, neon accent
- **Reflection Line:** Top, animated

### LiquidToggle
- **Width:** 52px
- **Height:** 32px
- **Thumb:** 24px
- **Animation:** Spring physics
- **Border Radius:** 16px

## 📱 Screen Layouts

### Home Screen
- **Background:** Gradient from `#0A0E27` to `#1A1F3A`
- **Search Bar:** LiquidSearchBar, full width, 16px margins
- **Product Cards:** WetGlassProductCard, 16px spacing
- **Navigation:** FrostedNavigationBar, bottom fixed

### Search Results
- **Background:** Same gradient
- **List Cards:** WetGlassCard, 12px spacing
- **Image Containers:** Wet glass overlay
- **Selected Item:** Neon outline glow

### Compare Screen
- **Header:** Frosted glass with liquid reflection
- **Table:** WetGlassCard for each row
- **Price Highlights:** Color-coded neon glow
- **Cheapest Badge:** Animated glow pulse

### Shopping List
- **Floating Button:** Bottom right, 24px from edges
- **List Items:** WetGlassCard with checkboxes
- **Total Bar:** Frosted glass with glossy refraction
- **Add Button:** LiquidToggle style

### Settings
- **Panels:** WetGlassCard, 16px spacing
- **Toggles:** LiquidToggle
- **Headers:** Frosted glass blur
- **Sections:** Translucent dividers

## 🎭 Animation Guidelines

### Spring Physics
- **Damping:** 15
- **Stiffness:** 150
- **Mass:** 1

### Timing
- **Fast:** 200ms
- **Standard:** 300ms
- **Slow:** 500ms

### Easing
- **Ease In Out:** For most transitions
- **Ease Out:** For entrances
- **Ease In:** For exits

## 🔤 Typography

### Font Family
- **Primary:** SF Pro (iOS system font)
- **Fallback:** System default

### Sizes
- **H1:** 32px, Bold (700)
- **H2:** 24px, Bold (700)
- **H3:** 20px, Semi-bold (600)
- **Body:** 16px, Regular (400)
- **Caption:** 14px, Regular (400)
- **Small:** 12px, Regular (400)

### Letter Spacing
- **Headings:** -0.5px to -0.2px (tighter)
- **Body:** 0px (normal)
- **Small:** 0.2px to 0.3px (looser)

## 🎨 Effect Parameters

### Glass Opacity Levels
- **Subtle:** 0.1 (10%)
- **Standard:** 0.15 (15%)
- **Strong:** 0.25 (25%)
- **Border:** 0.2 (20%)
- **Highlight:** 0.3 (30%)
- **Glow:** 0.4 (40%)

### Shadow Specifications
- **Glass Shadow:** 
  - Color: Neon accent
  - Offset: (0, 8)
  - Opacity: 0.3
  - Radius: 24px
  
- **Neon Glow:**
  - Color: Cyan/Blue
  - Offset: (0, 0)
  - Opacity: 0.8
  - Radius: 16px
  
- **Depth Shadow:**
  - Color: Black
  - Offset: (0, 12)
  - Opacity: 0.4
  - Radius: 32px

## 🚀 Implementation Notes

1. **Performance:** Use `BlurView` from expo-blur for native performance
2. **Gradients:** Use `LinearGradient` for smooth color transitions
3. **Animations:** Use `react-native-reanimated` for 60fps animations
4. **Shadows:** Combine multiple shadow layers for depth
5. **Reflections:** Use absolute positioned views with opacity
6. **Glow Effects:** Multiple shadow layers with neon colors

## 📦 Export Ready Assets

All components are production-ready and can be:
- Exported as standalone components
- Customized via props
- Themed via WetGlassTheme
- Animated with Reanimated
- Optimized for performance

