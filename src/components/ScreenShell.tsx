import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AestheticBackground } from '@/components/AestheticBackground';

interface ScreenShellProps {
  children: React.ReactNode;
}

/** Wraps screens with soft blob background (theme toggle is global in root layout). */
export function ScreenShell({ children }: ScreenShellProps) {
  return (
    <AestheticBackground>
      <View style={styles.inner}>{children}</View>
    </AestheticBackground>
  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
  },
});
