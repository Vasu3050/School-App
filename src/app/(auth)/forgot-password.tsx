/**
 * Sanskriti Pre School — Forgot Password Screen
 *
 * Matches the iOS-style glass aesthetic of login/register. Resets a password
 * via PATCH /users/forgot-password (email + phone + newPassword).
 *
 * The user must also confirm their account type (parent/teacher/admin)
 * because login requires a role; the forgot-password flow helps them
 * remember which portal to return to.
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { useAuth } from '@/context/auth-context';
import { useThemeColors } from '@/hooks/use-theme';
import { Typography, Spacing, Radii, LogoPath } from '@/constants/theme';
import { SInput } from '@/components/ui/SInput';
import { SButton } from '@/components/ui/SButton';
import { SText } from '@/components/ui/SText';
import { SSegmentedControl } from '@/components/ui/SSegmentedControl';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { ScreenShell } from '@/components/ScreenShell';
import { ScreenHeader } from '@/components/ScreenHeader';

const ROLE_OPTIONS = [
  { value: 'parent' as const, label: 'Parent' },
  { value: 'teacher' as const, label: 'Teacher' },
  { value: 'admin' as const, label: 'Admin' },
];

export default function ForgotPasswordScreen() {
  const { forgotPassword } = useAuth();
  const colors = useThemeColors();
  const router = useRouter();

  const [role, setRole] = useState<'parent' | 'teacher' | 'admin'>('parent');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    phone?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      e.email = 'Valid email is required';
    }
    if (!phone.trim() || !/^\d{10}$/.test(phone.trim())) {
      e.phone = '10-digit phone is required';
    }
    if (!newPassword || newPassword.length < 6) {
      e.newPassword = 'New password must be at least 6 characters';
    }
    if (newPassword !== confirmPassword) {
      e.confirmPassword = 'Passwords do not match';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleReset = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await forgotPassword(email, phone, newPassword);
      Alert.alert(
        'Password Reset',
        'Your password has been reset successfully. You can now sign in.',
        [{ text: 'Go to Sign In', onPress: () => router.replace('/(auth)/login') }]
      );
    } catch (err: any) {
      Alert.alert(
        'Reset Failed',
        err?.message || 'Could not reset password. Please check your details.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenShell>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScreenHeader showBack compact />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View entering={FadeIn.duration(800)} style={styles.header}>
            <GlassSurface style={styles.logoFrame}>
              <Image source={LogoPath} style={styles.logo} contentFit="contain" />
            </GlassSurface>
            <SText variant="headlineLgMobile" style={[styles.title, { color: colors.text }]}>
              Reset Password
            </SText>
            <SText
              variant="bodyMd"
              style={{ color: colors.textSecondary, textAlign: 'center' }}
            >
              Verify your account with email and phone, then choose a new password.
            </SText>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(600).delay(200)}>
            <GlassSurface style={styles.formCard}>
              <SText variant="labelSm" style={{ color: colors.textSecondary, marginBottom: Spacing.sm }}>
                Account Type
              </SText>
              <SSegmentedControl
                options={ROLE_OPTIONS}
                value={role}
                onChange={setRole}
                style={styles.roleSelector}
              />

              <SInput
                label="Email Address"
                placeholder="example@mail.com"
                value={email}
                onChangeText={(t) => {
                  setEmail(t);
                  if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                }}
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                containerStyle={styles.inputSpacing}
              />

              <SInput
                label="Phone Number"
                placeholder="10-digit mobile number"
                value={phone}
                onChangeText={(t) => {
                  setPhone(t);
                  if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                }}
                error={errors.phone}
                keyboardType="phone-pad"
                containerStyle={styles.inputSpacing}
              />

              <SInput
                label="New Password"
                placeholder="At least 6 characters"
                value={newPassword}
                onChangeText={(t) => {
                  setNewPassword(t);
                  if (errors.newPassword) setErrors((p) => ({ ...p, newPassword: undefined }));
                }}
                error={errors.newPassword}
                secureTextEntry
                autoCapitalize="none"
                containerStyle={styles.inputSpacing}
              />

              <SInput
                label="Confirm New Password"
                placeholder="Re-enter the new password"
                value={confirmPassword}
                onChangeText={(t) => {
                  setConfirmPassword(t);
                  if (errors.confirmPassword)
                    setErrors((p) => ({ ...p, confirmPassword: undefined }));
                }}
                error={errors.confirmPassword}
                secureTextEntry
                autoCapitalize="none"
                containerStyle={styles.inputSpacing}
              />

              <SButton
                title="Reset Password"
                onPress={handleReset}
                loading={loading}
                style={styles.submitButton}
              />

              <View style={styles.backRow}>
                <SText variant="bodySm" style={{ color: colors.textSecondary }}>
                  Remembered it?{' '}
                </SText>
                <SButton
                  title="Back to Sign In"
                  variant="ghost"
                  size="sm"
                  onPress={() => router.replace('/(auth)/login')}
                  textStyle={[Typography.bodySm, { fontWeight: 'bold' }]}
                />
              </View>
            </GlassSurface>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
    gap: Spacing.xs,
  },
  logoFrame: {
    padding: Spacing.md,
    borderRadius: Radii['2xl'],
    marginBottom: Spacing.md,
  },
  logo: {
    width: 72,
    height: 72,
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
  },
  formCard: {
    padding: Spacing.xl,
    borderRadius: Radii['2xl'],
  },
  roleSelector: {
    marginBottom: Spacing.xl,
  },
  inputSpacing: {
    marginBottom: Spacing.lg,
  },
  submitButton: {
    width: '100%',
    marginTop: Spacing.md,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },
});
