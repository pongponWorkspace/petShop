/**
 * petshop App Theme System
 * Comprehensive design tokens for consistent UI/UX
 */

import { Dimensions, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const Colors = {
  light: {
    // Primary colors - Modern sage green with better contrast
    primary: '#4A6741',
    primaryLight: '#EDF4EC',
    primaryDark: '#3A5233',

    // Secondary colors - Warm terracotta
    secondary: '#B8956A',
    secondaryLight: '#F7F3ED',
    secondaryDark: '#A17F50',

    // Neutral colors - Light brown background with clean surfaces
    background: '#F5F1EA',
    surface: '#FFFFFF',
    surfaceSecondary: '#F9F6F1',

    // Text colors - High contrast
    text: '#1C1B1A',
    textSecondary: '#6B6B6B',
    textTertiary: '#9CA3AF',
    textLight: '#FFFFFF',

    // Border and divider - Subtle but visible
    border: '#E5E5E5',
    divider: '#F0F0F0',

    // Status colors - Modern and accessible
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',

    // Shadow
    shadow: '#000000',

    // Tab bar
    tint: '#4A6741',
    icon: '#6B6B6B',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: '#4A6741',
  },
  dark: {
    // Primary colors - Modern sage green for dark mode
    primary: '#68A35C',
    primaryLight: '#1F2A1D',
    primaryDark: '#7BB36D',

    // Secondary colors - Warm terracotta for dark
    secondary: '#CFA875',
    secondaryLight: '#2D2820',
    secondaryDark: '#E6B986',

    // Neutral colors - Dark brown theme
    background: '#1A1511',
    surface: '#252017',
    surfaceSecondary: '#2F281E',

    // Text colors - High contrast for dark mode
    text: '#FFFFFF',
    textSecondary: '#A3A3A3',
    textTertiary: '#737373',
    textLight: '#0F0F0F',

    // Border and divider
    border: '#404040',
    divider: '#2A2A2A',

    // Status colors - Accessible dark mode
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    info: '#60A5FA',

    // Shadow
    shadow: '#000000',

    // Tab bar
    tint: '#68A35C',
    icon: '#A3A3A3',
    tabIconDefault: '#737373',
    tabIconSelected: '#68A35C',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const BorderRadius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  round: 50,
};

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  h5: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 20,
  },
};

export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const Layout = {
  screenWidth,
  screenHeight,
  isSmallDevice: screenWidth < 375,
  isMediumDevice: screenWidth >= 375 && screenWidth < 414,
  isLargeDevice: screenWidth >= 414,
  
  // Content widths
  contentMaxWidth: screenWidth - (Spacing.lg * 2),
  cardMaxWidth: screenWidth - (Spacing.lg * 2),
  
  // Common heights
  buttonHeight: 48,
  inputHeight: 48,
  tabBarHeight: 84,
  headerHeight: 88,
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
