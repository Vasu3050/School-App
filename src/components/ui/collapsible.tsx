/**
 * Sanskriti Pre School — Collapsible Component
 *
 * A simple accordion-style collapsible panel with smooth animation.
 * Usage:
 *   <Collapsible header={<SText>Section Title</SText>}>
 *     <SText>Content goes here...</SText>
 *   </Collapsible>
 */

import React, { useState, useRef, LayoutChangeEvent } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { useThemeColors } from '@/hooks/use-theme';
import { Spacing, Radii } from '@/constants/theme';
import { Springs } from '@/constants/animations';

interface CollapsibleProps {
  /** Header content */
  header: React.ReactNode;
  /** Content to be shown/hidden */
  children: React.ReactNode;
  /** Initial expanded state */
  defaultExpanded?: boolean;
}

export function Collapsible({
  header,
  children,
  defaultExpanded = false,
}: CollapsibleProps) {
  const colors = useThemeColors();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const contentHeight = useSharedValue(0);
  const measuredHeight = useRef(0);

  const animate = () => {
    setIsExpanded(!isExpanded);
    contentHeight.value = withTiming(
      isExpanded ? 0 : measuredHeight.current,
      {
        duration: 250,
        easing: Easing.out(Easing.cubic),
      }
    );
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    measuredHeight.current = e.nativeEvent.layout.height;
    if (isExpanded) {
      contentHeight.value = measuredHeight.current;
    }
  };

  const contentStyle = useAnimatedStyle(() => ({
    height: contentHeight.value,
    overflow: 'hidden',
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Pressable
        style={[styles.header, { paddingVertical: Spacing.md }]}
        onPress={animate}
        accessibilityRole="button"
        accessibilityLabel={`Toggle ${typeof header === 'string' ? header : 'section'}`}
      >
        {header}
      </Pressable>
      <Animated.View style={[styles.content, contentStyle]}>
        <View
          onLayout={handleLayout}
          style={styles.contentInner}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Radii.md,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: Spacing.md,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  content: {},
  contentInner: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
});
