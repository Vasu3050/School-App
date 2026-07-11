/**
 * Sanskriti Pre School — Design System: "Academic Warmth"
 *
 * This is the single source of truth for all visual tokens used across the app.
 * Every screen, component, and animation MUST reference these tokens to ensure
 * visual consistency. Do NOT hard-code colors, font sizes, or spacing anywhere.
 *
 * Based on DESIGN.md at the project root.
 */

import '@/global.css';

import { Platform, TextStyle, ViewStyle } from 'react-native';

// ─── Brand Constants ──────────────────────────────────────────────────────────
/** Exact hex values sampled from the school logo */
export const Brand = {
  /** The goldenrod yellow from the logo background */
  goldenrod: '#F2C94C',
  /** The deep cocoa brown from the logo iconography & text */
  cocoa: '#4A321F',
  /** The darker primary yellow used for interactive elements */
  primaryYellow: '#745B00',
  /** Mid-tone cocoa used for secondary actions */
  secondaryCocoa: '#755843',
  /** The school name for programmatic use */
  schoolName: 'Sanskriti Pre School',
  /** Full school name with location */
  schoolFullName: 'Sanskriti Pre School, Vijayapura',
  /** Tagline / parent org */
  parentOrg: 'Sanskriti Vidya Samsthe',
} as const;

// ─── Color Tokens ─────────────────────────────────────────────────────────────
export const Colors = {
  light: {
    // Surfaces
    background: '#FFF8F3',
    surface: '#FFF8F3',
    surfaceDim: '#E0D9D2',
    surfaceBright: '#FFF8F3',
    surfaceContainerLowest: '#FFFFFF',
    surfaceContainerLow: '#FAF2EC',
    surfaceContainer: '#F4ECE6',
    surfaceContainerHigh: '#EFE7E0',
    surfaceContainerHighest: '#E9E1DB',
    surfaceVariant: '#E9E1DB',

    // On-surface (text & icons on backgrounds)
    text: '#1E1B17',
    textSecondary: '#4D4635',
    textMuted: '#7F7663',
    inverseSurface: '#33302C',
    inverseOnSurface: '#F7EFE9',

    // Primary (Goldenrod)
    primary: '#745B00',
    onPrimary: '#FFFFFF',
    primaryContainer: '#F2C94C',
    onPrimaryContainer: '#6B5400',
    inversePrimary: '#EBC246',
    primaryFixed: '#FFE08B',
    primaryFixedDim: '#EBC246',

    // Secondary (Cocoa Brown)
    secondary: '#755843',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#FFD8BD',
    onSecondaryContainer: '#7A5D47',
    secondaryFixed: '#FFDCC3',
    secondaryFixedDim: '#E5BFA5',

    // Tertiary (Warm Grey)
    tertiary: '#5F5E5A',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#CFCDC7',
    onTertiaryContainer: '#585753',

    // Semantic
    error: '#BA1A1A',
    onError: '#FFFFFF',
    errorContainer: '#FFDAD6',
    onErrorContainer: '#93000A',
    success: '#2E7D32',
    onSuccess: '#FFFFFF',
    successContainer: '#C8E6C9',
    warning: '#F9A825',
    onWarning: '#1E1B17',
    warningContainer: '#FFF8E1',
    info: '#0288D1',
    onInfo: '#FFFFFF',
    infoContainer: '#E1F5FE',

    // Outlines & Borders
    outline: '#7F7663',
    outlineVariant: '#D0C5AF',
    divider: '#E0DCD5',

    // Elevation tints (used with shadows)
    surfaceTint: '#745B00',

    // Specific component backgrounds
    card: '#FFFFFF',
    cardBorder: '#E0DCD5',
    inputBackground: '#FFFFFF',
    inputBorder: '#D0C5AF',
    inputBorderFocus: '#F2C94C',

    // Tab bar
    tabBar: '#FFFFFF',
    tabBarBorder: '#E0DCD5',
    tabIconDefault: '#7F7663',
    tabIconSelected: '#745B00',

    // Glass / iOS-style surfaces
    glassBackground: 'rgba(255, 255, 255, 0.78)',
    glassBorder: 'rgba(117, 88, 67, 0.14)',
    glassTint: 'rgba(255, 248, 243, 0.45)',
    segmentTrack: 'rgba(74, 50, 31, 0.06)',
    segmentSelected: '#FFFFFF',
    blobPrimary: 'rgba(242, 201, 76, 0.38)',
    blobSecondary: 'rgba(117, 88, 67, 0.16)',

    // Legacy aliases for template compatibility
    /** @deprecated */ backgroundElement: '#F4ECE6',
    /** @deprecated */ backgroundSelected: '#EFE7E0',
  },

  dark: {
    // Surfaces — warm dark tones, not pure black
    background: '#16130F',
    surface: '#16130F',
    surfaceDim: '#16130F',
    surfaceBright: '#3D3830',
    surfaceContainerLowest: '#110E0A',
    surfaceContainerLow: '#1E1B17',
    surfaceContainer: '#23201B',
    surfaceContainerHigh: '#2D2A25',
    surfaceContainerHighest: '#38352F',
    surfaceVariant: '#4D4635',

    // On-surface
    text: '#E9E1DB',
    textSecondary: '#D0C5AF',
    textMuted: '#9C937F',
    inverseSurface: '#E9E1DB',
    inverseOnSurface: '#33302C',

    // Primary
    primary: '#EBC246',
    onPrimary: '#3D2E00',
    primaryContainer: '#584400',
    onPrimaryContainer: '#FFE08B',
    inversePrimary: '#745B00',
    primaryFixed: '#FFE08B',
    primaryFixedDim: '#EBC246',

    // Secondary
    secondary: '#E5BFA5',
    onSecondary: '#432A18',
    secondaryContainer: '#5B412D',
    onSecondaryContainer: '#FFDCC3',
    secondaryFixed: '#FFDCC3',
    secondaryFixedDim: '#E5BFA5',

    // Tertiary
    tertiary: '#C9C6C1',
    onTertiary: '#31312D',
    tertiaryContainer: '#474743',
    onTertiaryContainer: '#E5E2DC',

    // Semantic
    error: '#FFB4AB',
    onError: '#690005',
    errorContainer: '#93000A',
    onErrorContainer: '#FFDAD6',
    success: '#81C784',
    onSuccess: '#1B5E20',
    successContainer: '#1B5E20',
    warning: '#FFD54F',
    onWarning: '#1E1B17',
    warningContainer: '#5D4700',
    info: '#4FC3F7',
    onInfo: '#01579B',
    infoContainer: '#01579B',

    // Outlines & Borders
    outline: '#9C937F',
    outlineVariant: '#4D4635',
    divider: '#38352F',

    // Elevation tints
    surfaceTint: '#EBC246',

    // Component backgrounds
    card: '#23201B',
    cardBorder: '#38352F',
    inputBackground: '#1E1B17',
    inputBorder: '#4D4635',
    inputBorderFocus: '#EBC246',

    // Tab bar
    tabBar: '#1E1B17',
    tabBarBorder: '#38352F',
    tabIconDefault: '#9C937F',
    tabIconSelected: '#EBC246',

    // Glass / iOS-style surfaces
    glassBackground: 'rgba(35, 32, 27, 0.82)',
    glassBorder: 'rgba(255, 255, 255, 0.12)',
    glassTint: 'rgba(22, 19, 15, 0.55)',
    segmentTrack: 'rgba(255, 255, 255, 0.05)',
    segmentSelected: 'rgba(255, 255, 255, 0.12)',
    blobPrimary: 'rgba(235, 194, 70, 0.24)',
    blobSecondary: 'rgba(229, 191, 165, 0.10)',

    // Legacy aliases for template compatibility
    /** @deprecated */ backgroundElement: '#23201B',
    /** @deprecated */ backgroundSelected: '#2E3135',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

// ─── Typography ───────────────────────────────────────────────────────────────
/**
 * Font families:
 *  - Headings: Hanken Grotesk (sharp, contemporary, institutional quality)
 *  - Body:    Source Sans 3 (exceptional readability for long-form text)
 *
 * On native, we fall back to system fonts until custom fonts are loaded.
 */
export const FontFamily = Platform.select({
  web: {
    heading: '"Hanken Grotesk", ui-sans-serif, system-ui, sans-serif',
    body: '"Source Sans 3", ui-sans-serif, system-ui, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  default: {
    heading: 'HankenGrotesk_600SemiBold',
    body: 'SourceSans3_400Regular',
    mono: 'monospace',
  },
})!;

/** Typographic scale — maps to DESIGN.md token names */
export const Typography: Record<string, TextStyle> = {
  /** 48px / 56px — hero sections, splash screens */
  displayLg: {
    fontFamily: FontFamily.heading,
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 56,
    letterSpacing: -0.96, // -0.02em of 48
  },
  /** 32px / 40px — page titles, section headers */
  headlineLg: {
    fontFamily: FontFamily.heading,
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 40,
  },
  /** 28px / 36px — page titles on mobile */
  headlineLgMobile: {
    fontFamily: FontFamily.heading,
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 36,
  },
  /** 24px / 32px — sub-section headers */
  headlineMd: {
    fontFamily: FontFamily.heading,
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  /** 20px / 28px — card titles, dialog headers */
  titleMd: {
    fontFamily: FontFamily.heading,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  /** 16px / 24px — list item titles, bold labels */
  titleSm: {
    fontFamily: FontFamily.heading,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  /** 18px / 28px — primary body text */
  bodyLg: {
    fontFamily: FontFamily.body,
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 28,
  },
  /** 16px / 24px — standard body text */
  bodyMd: {
    fontFamily: FontFamily.body,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  /** 14px / 20px — secondary body text */
  bodySm: {
    fontFamily: FontFamily.body,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  /** 12px / 16px — labels, chips, captions */
  labelSm: {
    fontFamily: FontFamily.heading,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    letterSpacing: 0.6, // 0.05em of 12
    textTransform: 'uppercase',
  },
  /** 14px / 20px — button text */
  labelMd: {
    fontFamily: FontFamily.heading,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0.28, // 0.02em of 14
  },
};

// ─── Spacing ──────────────────────────────────────────────────────────────────
/** 8px base unit spacing system */
export const Spacing = {
  /** 2px — hairline separators */
  xxs: 2,
  /** 4px — tight internal padding */
  xs: 4,
  /** 8px — 1 unit — default small gap */
  sm: 8,
  /** 12px — 1.5 units */
  md: 12,
  /** 16px — 2 units — standard padding, mobile margins */
  lg: 16,
  /** 20px — 2.5 units */
  xl: 20,
  /** 24px — 3 units — gutters, section padding */
  '2xl': 24,
  /** 32px — 4 units — card internal padding (minimum per DESIGN.md) */
  '3xl': 32,
  /** 40px — 5 units */
  '4xl': 40,
  /** 48px — 6 units */
  '5xl': 48,
  /** 64px — 8 units — desktop margins */
  '6xl': 64,
  /** 80px — 10 units — section gaps */
  '7xl': 80,
  // ─── Legacy aliases (old template used these names) ───
  /** @deprecated Use xxs */ half: 2,
  /** @deprecated Use xs */ one: 4,
  /** @deprecated Use sm */ two: 8,
  /** @deprecated Use lg */ three: 16,
  /** @deprecated Use '2xl' */ four: 24,
  /** @deprecated Use '3xl' */ five: 32,
  /** @deprecated Use '6xl' */ six: 64,
} as const;

// ─── Border Radii ─────────────────────────────────────────────────────────────
/**
 * "Soft enough to be friendly, but sharp enough to be professional."
 * Base radius: 8px (0.5rem)
 */
export const Radii = {
  /** 4px — small elements, tags */
  sm: 4,
  /** 8px — standard elements: buttons, inputs */
  md: 8,
  /** 12px — icon enclosures, nested images in cards */
  lg: 12,
  /** 16px — large containers: cards, images */
  xl: 16,
  /** 24px — extra large containers */
  '2xl': 24,
  /** 9999px — pills, fully rounded elements */
  full: 9999,
} as const;

// ─── Elevation / Shadows ──────────────────────────────────────────────────────
/**
 * Warm-tinted shadows using Cocoa Brown instead of black.
 * Per DESIGN.md: rgba(74, 50, 31, 0.08) base tint.
 * Web uses boxShadow; native uses shadow* + elevation.
 */
function createElevation(
  native: ViewStyle,
  boxShadow: string
): ViewStyle {
  if (Platform.OS === 'web') {
    return { boxShadow } as ViewStyle;
  }
  return native;
}

export const Elevation = {
  none: createElevation(
    {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    'none'
  ),
  sm: createElevation(
    {
      shadowColor: '#4A321F',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
    },
    '0 2px 8px rgba(74, 50, 31, 0.08)'
  ),
  md: createElevation(
    {
      shadowColor: '#4A321F',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 4,
    },
    '0 4px 12px rgba(74, 50, 31, 0.10)'
  ),
  lg: createElevation(
    {
      shadowColor: '#4A321F',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 8,
    },
    '0 8px 16px rgba(74, 50, 31, 0.12)'
  ),
  xl: createElevation(
    {
      shadowColor: '#4A321F',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.16,
      shadowRadius: 24,
      elevation: 12,
    },
    '0 12px 24px rgba(74, 50, 31, 0.16)'
  ),
} as const;

// ─── Layout Constants ─────────────────────────────────────────────────────────
export const Layout = {
  /** Max content width for tablets / landscape */
  maxContentWidth: 800,
  /** Standard card internal padding */
  cardPadding: 24,
  /** Bottom tab bar inset (accounts for safe area) */
  bottomTabInset: Platform.select({ ios: 50, android: 80 }) ?? 0,
} as const;

// ─── Logo & Branding Assets ──────────────────────────────────────────────────
/**
 * Central reference for the school logo.
 * The logo is stored at assets/images/school-logo.png
 * Use `require('@/../../assets/images/school-logo.png')` in components.
 */
export const LogoPath = require('../../assets/images/school-logo.png');

// ─── Backward-Compatible Exports ─────────────────────────────────────────────
// These aliases ensure existing template components (themed-text.tsx,
// themed-view.tsx, app-tabs.tsx, etc.) continue to work without modification.
// New code should NOT use these — use the new tokens above instead.

/** @deprecated Use FontFamily instead */
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-heading)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-heading)',
    mono: 'var(--font-mono)',
  },
});

/** @deprecated Use Layout.bottomTabInset instead */
export const BottomTabInset = Layout.bottomTabInset;

/** @deprecated Use Layout.maxContentWidth instead */
export const MaxContentWidth = Layout.maxContentWidth;
