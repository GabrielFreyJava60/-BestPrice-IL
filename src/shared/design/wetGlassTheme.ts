export const WetGlassTheme = {
  colors: {
    
    background: {
      primary: '#0A0E27',
      secondary: '#1A1F3A',
      gradient: ['#0A0E27', '#1A1F3A', '#2A2F4A'],
    },
    
    
    neon: {
      blue: '#00D9FF',
      cyan: '#00FFFF',
      purple: '#9D4EDD',
      pink: '#FF006E',
    },
    
    
    glass: {
      light: 'rgba(255, 255, 255, 0.1)',
      medium: 'rgba(255, 255, 255, 0.15)',
      dark: 'rgba(255, 255, 255, 0.05)',
      border: 'rgba(255, 255, 255, 0.2)',
      highlight: 'rgba(255, 255, 255, 0.3)',
    },
    
    
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.8)',
      tertiary: 'rgba(255, 255, 255, 0.6)',
      accent: '#00D9FF',
    },
    
    
    chains: {
      shufersal: {
        base: '#0066CC',
        glow: '#00D9FF',
        glass: 'rgba(0, 217, 255, 0.2)',
      },
      ramilevy: {
        base: '#00A651',
        glow: '#00FF88',
        glass: 'rgba(0, 255, 136, 0.2)',
      },
      victory: {
        base: '#FF6B35',
        glow: '#FF006E',
        glass: 'rgba(255, 0, 110, 0.2)',
      },
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    sm: 12,
    md: 20,
    lg: 24,
    xl: 32,
    full: 9999,
  },
  
  blur: {
    light: 10,
    medium: 20,
    heavy: 40,
    extraHeavy: 60,
  },
  
  opacity: {
    glass: 0.1,
    glassMedium: 0.15,
    glassStrong: 0.25,
    border: 0.2,
    highlight: 0.3,
    glow: 0.4,
  },
  
  shadows: {
    glass: {
      shadowColor: '#00D9FF',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 24,
      elevation: 8,
    },
    neon: {
      shadowColor: '#00FFFF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 16,
      elevation: 0,
    },
    depth: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.4,
      shadowRadius: 32,
      elevation: 12,
    },
  },
  
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: '700' as const,
      letterSpacing: -0.5,
      color: '#FFFFFF',
    },
    h2: {
      fontSize: 24,
      fontWeight: '700' as const,
      letterSpacing: -0.3,
      color: '#FFFFFF',
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      letterSpacing: -0.2,
      color: '#FFFFFF',
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      letterSpacing: 0,
      color: 'rgba(255, 255, 255, 0.9)',
    },
    caption: {
      fontSize: 14,
      fontWeight: '400' as const,
      letterSpacing: 0.2,
      color: 'rgba(255, 255, 255, 0.7)',
    },
    small: {
      fontSize: 12,
      fontWeight: '400' as const,
      letterSpacing: 0.3,
      color: 'rgba(255, 255, 255, 0.6)',
    },
  },
  
  effects: {
    reflection: {
      intensity: 0.3,
      position: { x: 0.3, y: 0.1 },
      size: { width: 0.4, height: 0.2 },
    },
    bloom: {
      intensity: 0.6,
      radius: 20,
    },
    refraction: {
      intensity: 0.4,
      distortion: 0.1,
    },
  },
};

