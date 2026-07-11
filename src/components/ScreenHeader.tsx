/**
 * Sanskriti Pre School — ScreenHeader
 *
 * iOS-style frosted nav bar that sits at the top of every screen.
 * Left side: large title or small title + optional subtitle / back action.
 * Right side: action slots (theme toggle by default).
 *
 * Replaces the old floating ThemeToggle — that's the new rule.
 */

import React from 'react';
import { Platform, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { useThemeColors } from '@/hooks/use-theme';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SText } from '@/components/ui/SText';
import { Spacing, Radii, Typography } from '@/constants/theme';

interface ScreenHeaderProps {
  /** Large title — used in iOS large-title style (default). */
  title?: string;
  /** Subtitle / caption shown below large title. */
  subtitle?: string;
  /** When true, the title is rendered in a smaller, compact style. */
  compact?: boolean;
  /** Hide the theme toggle (e.g. on splash/loading screens). */
  hideThemeToggle?: boolean;
  /** Right-side action button (e.g. settings). Renders next to the theme toggle. */
  rightAction?: React.ReactNode;
  /** Show a back button (iOS chevron) that pops the router stack. */
  showBack?: boolean;
  /** Optional override container style. */
  style?: ViewStyle;
}

/**
 * Frosted top nav bar with iOS large-title support.
 * Sits above the screen content, accounting for safe-area top inset.
 */
export function ScreenHeader({
  title,
  subtitle,
  compact = false,
  hideThemeToggle = false,
  rightAction,
  showBack = false,
  style,
}: ScreenHeaderProps) {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const isLarge = !compact && !!title;

  return (
    <View
      style={[
        styles.wrapper,
        { paddingTop: insets.top + Spacing.xs },
        style,
      ]}
    >
      <View style={styles.row}>
        <View style={styles.leftCluster}>
          {showBack && (
            <Pressable
              onPress={() => router.back()}
              hitSlop={Spacing.sm}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              style={styles.backButton}
            >
              <SText variant="headlineMd" style={{ color: colors.primary }}>
                ‹
              </SText>
            </Pressable>
          )}
          {!isLarge && title && (
            <SText
              variant="titleMd"
              style={[styles.titleCompact, { color: colors.text }]}
              numberOfLines={1}
            >
              {title}
            </SText>
          )}
        </View>

        <View style={styles.rightCluster}>
          {rightAction}
          {!hideThemeToggle && <ThemeToggle />}
        </View>
      </View>

      {isLarge && title && (
        <View style={styles.largeTitleRow}>
          <SText
            style={[
              styles.largeTitle,
              Typography.displayLg,
              { color: colors.text },
            ]}
            numberOfLines={1}
          >
            {title}
          </SText>
        </View>
      )}

      {subtitle && (
        <SText
          variant="bodyMd"
          style={{ color: colors.textSecondary, marginTop: Spacing.xxs }}
        >
          {subtitle}
        </SText>
      )}
    </View>
  );
}

/**
 * Optional bottom-edge accent — a hairline divider under the header.
 * Use it on screens where you want the iOS "navigation bar separator" look.
 */
export function ScreenHeaderDivider() {
  const colors = useThemeColors();
  return (
    <View
      style={[
        styles.divider,
        { backgroundColor: colors.divider },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  leftCluster: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    flex: 1,
  },
  rightCluster: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -Spacing.xs,
  },
  titleCompact: {
    fontWeight: '700',
  },
  largeTitleRow: {
    marginTop: Spacing.md,
  },
  largeTitle: {
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: 0.36, // iOS large title tracking
    fontWeight: '700',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    opacity: 0.5,
  },
});
