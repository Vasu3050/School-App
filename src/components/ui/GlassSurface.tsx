import React from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';
import { GlassView, isGlassEffectAPIAvailable } from 'expo-glass-effect';

import { useAppTheme } from '@/context/theme-context';
import { useThemeColors } from '@/hooks/use-theme';
import { Radii } from '@/constants/theme';

interface GlassSurfaceProps {
  children: React.ReactNode;
  style?: ViewStyle;
  /** More transparent glass */
  variant?: 'regular' | 'clear';
}

export function GlassSurface({ children, style, variant = 'regular' }: GlassSurfaceProps) {
  const colors = useThemeColors();
  const { resolvedScheme } = useAppTheme();

  const baseStyle: ViewStyle = {
    borderRadius: Radii.xl,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
  };

  if (Platform.OS === 'ios' && isGlassEffectAPIAvailable()) {
    return (
      <GlassView
        glassEffectStyle={variant}
        colorScheme={resolvedScheme}
        tintColor={colors.glassTint}
        style={[baseStyle, style]}
      >
        {children}
      </GlassView>
    );
  }

  return (
    <View
      style={[
        baseStyle,
        {
          backgroundColor: colors.glassBackground,
          ...(Platform.OS === 'web'
            ? ({ backdropFilter: 'blur(20px)' } as ViewStyle)
            : {}),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
