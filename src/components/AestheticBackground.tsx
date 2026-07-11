import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useThemeColors } from '@/hooks/use-theme';

interface AestheticBackgroundProps {
  children: React.ReactNode;
}

/** Soft gradient-like blobs for an iOS-inspired depth background. */
export function AestheticBackground({ children }: AestheticBackgroundProps) {
  const colors = useThemeColors();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.blob,
          styles.blobTop,
          { backgroundColor: colors.blobPrimary },
        ]}
      />
      <View
        style={[
          styles.blob,
          styles.blobBottom,
          { backgroundColor: colors.blobSecondary },
        ]}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  blob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.55,
  },
  blobTop: {
    width: 280,
    height: 280,
    top: -80,
    right: -60,
  },
  blobBottom: {
    width: 320,
    height: 320,
    bottom: -100,
    left: -80,
  },
});
