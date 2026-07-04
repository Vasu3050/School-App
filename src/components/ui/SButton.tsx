/**
 * Sanskriti Pre School — SButton Component
 *
 * Branded button component with three variants (from DESIGN.md):
 *  - primary:   Solid Cocoa Brown with White text (Enroll Now, Contact Us)
 *  - secondary: Alabaster Cream bg with 1px Cocoa Brown border
 *  - ghost:     Goldenrod Yellow text, no background (Read More links)
 *
 * Includes press-scale animation via Reanimated for consistent micro-feedback.
 */

import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  StyleProp,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { useThemeColors } from '@/hooks/use-theme';
import { Brand, Typography, Radii, Spacing, Elevation } from '@/constants/theme';
import { Springs, ScaleFeedback } from '@/constants/animations';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface SButtonProps {
  /** Button label */
  title: string;
  /** Visual variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Press handler */
  onPress?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state — shows spinner and disables interactions */
  loading?: boolean;
  /** Optional icon element to render before the title */
  icon?: React.ReactNode;
  /** Override container styles */
  style?: StyleProp<ViewStyle>;
  /** Override text styles */
  textStyle?: StyleProp<TextStyle>;
}

export function SButton({
  title,
  variant = 'primary',
  size = 'md',
  onPress,
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}: SButtonProps) {
  const colors = useThemeColors();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(ScaleFeedback.button, Springs.snappy);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, Springs.gentle);
  };

  const isDisabled = disabled || loading;

  // Variant-based styles
  const variantStyles = getVariantStyles(variant, colors);
  const sizeStyles = getSizeStyles(size);

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      style={[
        styles.base,
        variantStyles.container,
        sizeStyles.container,
        isDisabled && styles.disabled,
        animatedStyle,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variantStyles.textColor}
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text
            style={[
              styles.text,
              { color: variantStyles.textColor },
              sizeStyles.text,
              icon ? { marginLeft: Spacing.sm } : undefined,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </AnimatedPressable>
  );
}

function getVariantStyles(variant: ButtonVariant, colors: any) {
  switch (variant) {
    case 'primary':
      return {
        container: {
          backgroundColor: colors.secondary, // Cocoa Brown
          ...Elevation.sm,
        } as ViewStyle,
        textColor: colors.onSecondary,
      };
    case 'secondary':
      return {
        container: {
          backgroundColor: colors.surfaceContainerLowest,
          borderWidth: 1,
          borderColor: colors.secondary,
        } as ViewStyle,
        textColor: colors.secondary,
      };
    case 'ghost':
      return {
        container: {
          backgroundColor: 'transparent',
        } as ViewStyle,
        textColor: colors.primary, // Goldenrod
      };
  }
}

function getSizeStyles(size: ButtonSize) {
  switch (size) {
    case 'sm':
      return {
        container: {
          paddingVertical: Spacing.sm,
          paddingHorizontal: Spacing.lg,
          borderRadius: Radii.md,
        } as ViewStyle,
        text: {
          ...Typography.bodySm,
          fontWeight: '600' as const,
        } as TextStyle,
      };
    case 'md':
      return {
        container: {
          paddingVertical: Spacing.md,
          paddingHorizontal: Spacing.xl,
          borderRadius: Radii.md,
        } as ViewStyle,
        text: Typography.labelMd as TextStyle,
      };
    case 'lg':
      return {
        container: {
          paddingVertical: Spacing.lg,
          paddingHorizontal: Spacing['2xl'],
          borderRadius: Radii.md,
        } as ViewStyle,
        text: {
          ...Typography.bodyMd,
          fontWeight: '600' as const,
        } as TextStyle,
      };
  }
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});
