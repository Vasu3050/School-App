/**
 * Sanskriti Pre School — SChip Component
 *
 * Branded chip/tag per DESIGN.md — fixed contrast for selected/unselected states.
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
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
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
    backgroundColor: selected ? colors.secondary : colors.surfaceContainerLowest,
    borderRadius: variant === 'pill' ? Radii.full : Radii.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: selected ? colors.secondary : colors.outlineVariant,
  };

  const content = (
    <Text
      style={[
        styles.label,
        { color: selected ? colors.onSecondary : colors.text },
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
        accessibilityState={{ selected }}
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
  label: {
    ...Typography.labelMd,
    textTransform: 'none',
    letterSpacing: 0,
    fontSize: 13,
  },
});
