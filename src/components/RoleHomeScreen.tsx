import { Image } from 'expo-image';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { useAuth } from '@/context/auth-context';
import { useThemeColors } from '@/hooks/use-theme';
import { Brand, Spacing, Radii, LogoPath } from '@/constants/theme';
import { SCard } from '@/components/ui/SCard';
import { SText } from '@/components/ui/SText';
import {
  getRoleLabel,
  getUserPrimaryRole,
  type UserRole,
} from '@/utils/auth-routing';

const UPCOMING_FEATURES: Record<UserRole, string[]> = {
  parent: [
    'Child profiles & grades',
    'Daily homework & diary',
    'Notice board',
    'Attendance calendar',
  ],
  teacher: [
    'Geofenced check-in',
    'Class attendance marking',
    'Diary & homework creator',
    'Photo gallery uploads',
  ],
  admin: [
    'Pending registration queue',
    'Student enrollment',
    'School calendar',
    'Notice board manager',
  ],
};

interface RoleHomeScreenProps {
  role: UserRole;
}

export function RoleHomeScreen({ role }: RoleHomeScreenProps) {
  const { user } = useAuth();
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeInDown.duration(600).delay(100)} style={styles.header}>
            <Image source={LogoPath} style={styles.logo} contentFit="contain" />
            <SText variant="headlineLgMobile" style={{ color: colors.text, textAlign: 'center' }}>
              {Brand.schoolName}
            </SText>
            <SText variant="bodyMd" style={{ color: colors.textSecondary, textAlign: 'center' }}>
              {getRoleLabel(role)}
            </SText>
          </Animated.View>

          {user && (
            <Animated.View entering={FadeInDown.duration(600).delay(250)}>
              <SCard style={styles.userCard}>
                <SText variant="labelSm" style={{ color: colors.textMuted }}>
                  Welcome back
                </SText>
                <SText
                  variant="titleSm"
                  style={{ color: colors.text, marginTop: Spacing.xs, fontWeight: '700' }}
                >
                  {user.name}
                </SText>
                <SText variant="bodySm" style={{ color: colors.textSecondary, marginTop: Spacing.xxs }}>
                  {user.email}
                </SText>
                {user.status && (
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor: colors.primaryContainer,
                        borderColor: colors.outlineVariant,
                      },
                    ]}
                  >
                    <SText variant="labelSm" style={{ color: colors.onPrimaryContainer }}>
                      {user.status.toUpperCase()}
                    </SText>
                  </View>
                )}
              </SCard>
            </Animated.View>
          )}

          <Animated.View entering={FadeInDown.duration(600).delay(400)}>
            <SCard compact>
              <SText variant="titleMd" style={{ color: colors.text, marginBottom: Spacing.md }}>
                Coming Soon
              </SText>
              <SText variant="bodySm" style={{ color: colors.textSecondary, marginBottom: Spacing.lg }}>
                Phase 2–4 features for the {role} portal will appear here.
              </SText>
              {UPCOMING_FEATURES[role].map((feature) => (
                <View key={feature} style={styles.featureRow}>
                  <View style={[styles.bullet, { backgroundColor: colors.primaryContainer }]} />
                  <SText variant="bodyMd" style={{ color: colors.text, flex: 1 }}>
                    {feature}
                  </SText>
                </View>
              ))}
            </SCard>
          </Animated.View>

          <SText
            variant="labelSm"
            style={{ color: colors.textMuted, textAlign: 'center', marginTop: Spacing.xl }}
          >
            v1.0.0 • Phase 1 Complete
          </SText>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export function RoleHomeScreenFromUser() {
  const { user } = useAuth();
  return <RoleHomeScreen role={getUserPrimaryRole(user)} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.xl,
    gap: Spacing.xl,
    paddingBottom: Spacing['4xl'],
  },
  header: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  logo: {
    width: 88,
    height: 88,
    marginBottom: Spacing.sm,
  },
  userCard: {
    alignItems: 'center',
  },
  statusBadge: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radii.full,
    borderWidth: 1,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 2,
  },
});
