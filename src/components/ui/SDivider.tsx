/**
 * Sanskriti Pre School — SDivider Component
 *
 * A simple themed horizontal divider line using the design system's
 * divider color token. Ensures consistent separators throughout the app.
 */

import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { useThemeColors } from '@/hooks/use-theme';
import { Spacing } from '@/constants/theme';

interface SDividerProps {
  /** Override styles */
  style?: ViewStyle;
  /** Vertical spacing above and below the line */
  spacing?: number;
}

export function SDivider({ style, spacing = Spacing.lg }: SDividerProps) {
  const colors = useThemeColors();

  return (
    <View
      style={[
        styles.divider,
        {
          backgroundColor: colors.divider,
          marginVertical: spacing,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
});
