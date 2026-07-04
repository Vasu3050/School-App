/**
 * Sanskriti Pre School — SChip Component
 *
 * Branded chip/tag per DESIGN.md:
 *  - Used for grade levels (Pre-K, Nursery, etc.)
 *  - Light tint of Primary Yellow background
 *  - Deep Cocoa Brown text
 *  - Pill shape for tags, rounded for filters
 */

import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import { useThemeColors } from '@/hooks/use-theme';
import { Typography, Spacing, Radii } from '@/constants/theme';

interface SChipProps {
  /** Chip label */
  label: string;
  /** Chip is currently selected */
  selected?: boolean;
  /** Press handler (if interactive) */
  onPress?: () => void;
  /** Override container styles */
  style?: ViewStyle;
  /** Variant — pill for tags, rounded for filter chips */
  variant?: 'pill' | 'rounded';
}

export function SChip({
  label,
  selected = false,
  onPress,
  style,
  variant = 'pill',
}: SChipProps) {
  const colors = useThemeColors();

  const containerStyle: ViewStyle = {
    backgroundColor: selected ? colors.primaryContainer : colors.primaryFixed,
    borderRadius: variant === 'pill' ? Radii.full : Radii.md,
    paddingVertical: Spacing.xs + 2,
    paddingHorizontal: Spacing.md,
    borderWidth: selected ? 1.5 : 0,
    borderColor: selected ? colors.primary : 'transparent',
  };

  const content = (
    <Text
      style={[
        Typography.labelSm,
        { color: colors.onPrimaryContainer },
      ]}
    >
      {label}
    </Text>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={[styles.base, containerStyle, style]}
        accessibilityRole="button"
      >
        {content}
      </Pressable>
    );
  }

  return (
    <Pressable style={[styles.base, containerStyle, style]} disabled>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
