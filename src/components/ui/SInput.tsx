/**
 * Sanskriti Pre School — SInput Component
 *
 * Branded text input per DESIGN.md:
 *  - White background with 1px warm grey border
 *  - On focus: border transitions to Goldenrod Yellow with subtle glow
 *  - Labels always positioned above the field in label-sm Cocoa Brown
 *
 * Includes animated border color transition via Reanimated.
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

import { useThemeColors } from '@/hooks/use-theme';
import { Typography, Spacing, Radii } from '@/constants/theme';
import { Timings } from '@/constants/animations';

const AnimatedView = Animated.View;

interface SInputProps extends Omit<TextInputProps, 'style'> {
  /** Label displayed above the input */
  label?: string;
  /** Error message displayed below the input */
  error?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Override container styles */
  containerStyle?: ViewStyle;
  /** Override input styles */
  inputStyle?: TextStyle;
}

export function SInput({
  label,
  error,
  helperText,
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
  ...rest
}: SInputProps) {
  const colors = useThemeColors();
  const focusProgress = useSharedValue(0);
  const [isFocused, setIsFocused] = useState(false);

  const animatedBorderStyle = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        focusProgress.value,
        [0, 1],
        [colors.inputBorder, colors.inputBorderFocus]
      ),
      borderWidth: 1.5,
    };
  });

  const handleFocus = (e: any) => {
    setIsFocused(true);
    focusProgress.value = withTiming(1, Timings.quickFade);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    focusProgress.value = withTiming(0, Timings.quickFade);
    onBlur?.(e);
  };

  const hasError = !!error;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text
          style={[
            styles.label,
            Typography.labelSm,
            { color: hasError ? colors.error : colors.textSecondary },
          ]}
        >
          {label}
        </Text>
      )}
      <AnimatedView
        style={[
          styles.inputWrapper,
          {
            backgroundColor: colors.inputBackground,
          },
          hasError
            ? { borderColor: colors.error, borderWidth: 1.5 }
            : animatedBorderStyle,
        ]}
      >
        <TextInput
          style={[
            styles.input,
            Typography.bodyMd,
            { color: colors.text },
            inputStyle,
          ]}
          placeholderTextColor={colors.textMuted}
          onFocus={handleFocus}
          onBlur={handleBlur}
          selectionColor={colors.primary}
          {...rest}
        />
      </AnimatedView>
      {(error || helperText) && (
        <Text
          style={[
            styles.helperText,
            Typography.bodySm,
            { color: hasError ? colors.error : colors.textMuted },
          ]}
        >
          {hasError ? error : helperText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: Spacing.xs,
  },
  inputWrapper: {
    borderRadius: Radii.md,
    overflow: 'hidden',
  },
  input: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  helperText: {
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },
});
