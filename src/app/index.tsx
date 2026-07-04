import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';

import { useThemeColors } from '@/hooks/use-theme';
import { Brand, Typography, Spacing, Radii, LogoPath } from '@/constants/theme';

export default function HomeScreen() {
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        {/* School Logo */}
        <Animated.View entering={FadeInUp.duration(800).delay(200)} style={styles.logoContainer}>
          <Image
            source={LogoPath}
            style={styles.logo}
            contentFit="contain"
          />
        </Animated.View>

        {/* School Name */}
        <Animated.View entering={FadeInDown.duration(600).delay(500)} style={styles.textContainer}>
          <Animated.Text
            style={[
              Typography.headlineLgMobile,
              { color: colors.text, textAlign: 'center' },
            ]}
          >
            {Brand.schoolName}
          </Animated.Text>

          <Animated.Text
            entering={FadeInDown.duration(600).delay(700)}
            style={[
              Typography.bodyMd,
              { color: colors.textSecondary, textAlign: 'center', marginTop: Spacing.xs },
            ]}
          >
            {Brand.parentOrg}, Vijayapura
          </Animated.Text>
        </Animated.View>

        {/* Status Badge */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(900)}
          style={[
            styles.statusBadge,
            {
              backgroundColor: colors.surfaceContainerLow,
              borderColor: colors.outlineVariant,
            },
          ]}
        >
          <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
          <Animated.Text
            style={[
              Typography.bodySm,
              { color: colors.textSecondary },
            ]}
          >
            App initialized successfully
          </Animated.Text>
        </Animated.View>

        {/* Version */}
        <Animated.View entering={FadeInDown.duration(400).delay(1100)}>
          <Animated.Text
            style={[
              Typography.labelSm,
              { color: colors.textMuted, textAlign: 'center' },
            ]}
          >
            v1.0.0 • Basic Setup Complete
          </Animated.Text>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    gap: Spacing['2xl'],
  },
  logoContainer: {
    width: 200,
    height: 200,
    borderRadius: Radii.xl,
    overflow: 'hidden',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radii.full,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
