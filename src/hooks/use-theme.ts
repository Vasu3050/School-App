/**
 * Sanskriti Pre School — useThemeColors Hook
 *
 * Returns the complete color palette for the current color scheme (light/dark).
 * Use this in every component instead of directly importing Colors.
 *
 * Usage:
 *   const colors = useThemeColors();
 *   <View style={{ backgroundColor: colors.background }} />
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useThemeColors() {
  const scheme = useColorScheme();
  const theme = scheme === 'unspecified' ? 'light' : scheme;
  return Colors[theme];
}

/**
 * @deprecated Use useThemeColors() instead for access to the full palette.
 * Kept for backward compatibility.
 */
export function useTheme() {
  return useThemeColors();
}
