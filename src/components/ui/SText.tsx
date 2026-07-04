/**
 * Sanskriti Pre School — SText Component
 *
 * Themed text component that maps to the design system's typography scale.
 * Use this instead of raw <Text> to ensure typographic consistency.
 *
 * Usage:
 *   <SText variant="headlineLg">Welcome</SText>
 *   <SText variant="bodyMd" color="textSecondary">Subtitle text</SText>
 */

import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

import { useThemeColors } from '@/hooks/use-theme';
import { Typography, ThemeColor } from '@/constants/theme';

type TypographyVariant = keyof typeof Typography;

interface STextProps extends TextProps {
  /** Typography variant from the design system */
  variant?: TypographyVariant;
  /** Color token from the theme. Defaults to 'text'. */
  color?: string;
  /** Center align */
  center?: boolean;
  /** Style overrides */
  style?: TextStyle | TextStyle[];
}

export function SText({
  variant = 'bodyMd',
  color = 'text',
  center = false,
  style,
  children,
  ...rest
}: STextProps) {
  const colors = useThemeColors();

  const textColor = (colors as any)[color] ?? color;

  return (
    <Text
      style={[
        Typography[variant],
        { color: textColor },
        center && { textAlign: 'center' },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
