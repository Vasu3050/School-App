/**
 * Sanskriti Pre School — SCard Component
 *
 * Branded card component per DESIGN.md:
 *  - White background (Level 1 elevation)
 *  - 16px corner radius (rounded-lg)
 *  - 1px #E0DCD5 border
 *  - Soft 16px blur shadow tinted with Cocoa Brown
 *  - Minimum 32px internal padding (24px on compact)
 *  - Nested images get 12px inner radius
 *
 * Includes optional press animation for interactive cards.
 */

import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { useThemeColors } from '@/hooks/use-theme';
import { Spacing, Radii, Elevation } from '@/constants/theme';
import { Springs, ScaleFeedback } from '@/constants/animations';
import { GlassSurface } from '@/components/ui/GlassSurface';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface SCardProps {
  children: React.ReactNode;
  /** If provided, card becomes pressable */
  onPress?: () => void;
  /** Compact mode uses less padding (24px instead of 32px) */
  compact?: boolean;
  /** Override container styles */
  style?: ViewStyle;
  /** Remove shadow for flat cards in lists */
  flat?: boolean;
  /** Frosted glass card (iOS-style) */
  glass?: boolean;
}

export function SCard({
  children,
  onPress,
  compact = false,
  style,
  flat = false,
  glass = false,
}: SCardProps) {
  const colors = useThemeColors();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (onPress) {
      scale.value = withSpring(ScaleFeedback.card, Springs.snappy);
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      scale.value = withSpring(1, Springs.gentle);
    }
  };

  const cardStyle: ViewStyle[] = [
    styles.card,
    !glass && {
      backgroundColor: colors.card,
      borderColor: colors.cardBorder,
    },
    glass && {
      backgroundColor: 'transparent',
      borderColor: colors.glassBorder,
    },
    {
      padding: compact ? Spacing['2xl'] : Spacing['3xl'],
    },
    !flat && !glass && Elevation.sm,
    style,
  ].filter(Boolean) as ViewStyle[];

  if (glass) {
    return (
      <Animated.View style={onPress ? animatedStyle : undefined}>
        <GlassSurface style={cardStyle}>
          {onPress ? (
            <AnimatedPressable
              onPress={onPress}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={styles.glassInner}
              accessibilityRole="button"
            >
              {children}
            </AnimatedPressable>
          ) : (
            children
          )}
        </GlassSurface>
      </Animated.View>
    );
  }

  if (onPress) {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[cardStyle, animatedStyle]}
        accessibilityRole="button"
      >
        {children}
      </AnimatedPressable>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radii.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
  glassInner: {
    flex: 1,
  },
});
