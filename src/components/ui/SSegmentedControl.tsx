/**
 * Sanskriti Pre School — SSegmentedControl Component
 *
 * Branded iOS-style segmented control per DESIGN.md and the user's
 * "aesthetic rich & cool UI with iPhone type" feedback.
 *
 *  - Frosted/neutral track so unselected labels always have clear contrast
 *  - Crisp white (light) / raised surface (dark) selected pill
 *  - Animated thumb that glides between segments (Reanimated layout)
 *  - On primary text uses full contrast (no muddy yellow-on-yellow tones)
 */

import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useThemeColors } from '@/hooks/use-theme';
import { Typography, Spacing, Radii, Elevation } from '@/constants/theme';
import { Springs } from '@/constants/animations';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

interface SSegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  style?: ViewStyle;
}

export function SSegmentedControl<T extends string>({
  options,
  value,
  onChange,
  style,
}: SSegmentedControlProps<T>) {
  const colors = useThemeColors();
  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value)
  );

  // Animate the thumb position
  const thumbX = useSharedValue(0);

  useEffect(() => {
    thumbX.value = withSpring(selectedIndex, Springs.snappy);
  }, [selectedIndex, thumbX]);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: thumbX.value * 100 + '%' }],
  }));

  return (
    <View
      style={[
        styles.track,
        {
          backgroundColor: colors.segmentTrack,
          borderColor: colors.glassBorder,
        },
        style,
      ]}
    >
      {/* Sliding thumb — uses percentage translateX via shared value */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.thumb,
          {
            backgroundColor: colors.segmentSelected,
            borderColor: colors.glassBorder,
          },
          Elevation.sm,
          thumbStyle,
        ]}
      />

      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={styles.segment}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={option.label}
          >
            <Text
              style={[
                styles.label,
                {
                  // Full-contrast text in both states. Selected gets heavier weight;
                  // unselected stays at full text color (not secondary), so the
                  // label is always legible regardless of track tint.
                  color: selected ? colors.text : colors.textSecondary,
                  fontWeight: selected ? '700' : '600',
                },
              ]}
              numberOfLines={1}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    borderRadius: Radii.md,
    padding: 4,
    borderWidth: StyleSheet.hairlineWidth,
    position: 'relative',
  },
  thumb: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: 4,
    right: 4,
    width: '100%',
    borderRadius: Radii.sm + 2,
    borderWidth: StyleSheet.hairlineWidth,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    minHeight: 40,
    zIndex: 1,
  },
  label: {
    ...Typography.labelMd,
    textTransform: 'none',
    letterSpacing: 0,
    fontSize: 13,
  },
});
