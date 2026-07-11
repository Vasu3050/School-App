/**
 * Sanskriti Pre School — ThemeToggle
 *
 * iOS-style glass capsule with a sun/moon icon. Designed to live in a
 * screen's nav bar (used by ScreenHeader). Not floating — that's old design.
 *
 * Falls back to emoji on platforms that can't render SF Symbols.
 */

import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { useAppTheme } from '@/context/theme-context';
import { useThemeColors } from '@/hooks/use-theme';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { Spacing, Radii, Typography } from '@/constants/theme';

interface ThemeToggleProps {
  /** Slight style overrides (e.g. margin) */
  style?: object;
  /** Compact mode for very small nav bars */
  compact?: boolean;
}

export function ThemeToggle({ style, compact = false }: ThemeToggleProps) {
  const { resolvedScheme, toggleTheme } = useAppTheme();
  const colors = useThemeColors();

  const isDark = resolvedScheme === 'dark';
  const next = isDark ? 'light' : 'dark';
  const symbolName = isDark ? 'sun.max.fill' : 'moon.fill';
  const label = isDark ? 'Light' : 'Dark';

  return (
    <Pressable
      onPress={toggleTheme}
      accessibilityRole="button"
      accessibilityLabel={`Switch to ${label.toLowerCase()} mode`}
      style={style}
      hitSlop={Spacing.sm}
    >
      <GlassSurface
        style={[
          styles.button,
          compact && styles.buttonCompact,
        ]}
      >
        {Platform.OS === 'ios' ? (
          <SymbolView
            name={symbolName}
            size={compact ? 14 : 16}
            weight="semibold"
            tintColor={isDark ? colors.primary : colors.secondary}
          />
        ) : (
          <Text style={styles.emoji}>{isDark ? '☀️' : '🌙'}</Text>
        )}
        {!compact && (
          <Text
            style={[
              styles.label,
              Typography.labelMd,
              { color: colors.text },
            ]}
            numberOfLines={1}
          >
            {label}
          </Text>
        )}
      </GlassSurface>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radii.full,
  },
  buttonCompact: {
    paddingVertical: Spacing.xs + 2,
    paddingHorizontal: Spacing.sm,
    gap: 0,
  },
  emoji: {
    fontSize: 14,
  },
  label: {
    fontSize: 12,
    textTransform: 'none',
    letterSpacing: 0,
  },
});
