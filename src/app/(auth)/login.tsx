/**
 * Sanskriti Pre School — Login Screen
 *
 * iOS-style glass aesthetic. Top nav bar with the school brand and
 * a theme toggle. Role tabs use the fixed SSegmentedControl.
 */

import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform, Alert, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { useAuth } from '@/context/auth-context';
import { useThemeColors } from '@/hooks/use-theme';
import { Typography, Spacing, Radii, LogoPath } from '@/constants/theme';
import { SInput, SButton, SText, SSegmentedControl } from '@/components/ui';
import { ScreenShell } from '@/components/ScreenShell';
import { ScreenHeader } from '@/components/ScreenHeader';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { getRoleHomePath } from '@/utils/auth-routing';

const ROLE_OPTIONS = [
  { value: 'parent' as const, label: 'Parent' },
  { value: 'teacher' as const, label: 'Teacher' },
  { value: 'admin' as const, label: 'Admin' },
];

export default function LoginScreen() {
  const { login } = useAuth();
  const colors = useThemeColors();
  const router = useRouter();

  const [role, setRole] = useState<'parent' | 'teacher' | 'admin'>('parent');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ identifier?: string; password?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!identifier.trim()) {
      newErrors.identifier = 'Username, email, or phone is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      const payload = {
        password,
        role,
        ...(identifier.includes('@')
          ? { email: identifier.trim().toLowerCase() }
          : /^\d{10}$/.test(identifier.trim())
            ? { phone: identifier.trim() }
            : { name: identifier.trim() }),
      };

      await login(payload);
      router.replace(getRoleHomePath(role));
    } catch (error: any) {
      Alert.alert(
        'Login Failed',
        error.message || 'Please check your credentials and try again.'
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
        <ScreenHeader />
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
              Sanskriti Pre School
            </SText>
            <SText variant="bodyMd" style={{ color: colors.textSecondary, textAlign: 'center' }}>
              Vijayapura
            </SText>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(600).delay(200)}>
            <GlassSurface style={styles.formCard}>
              <SText variant="titleMd" style={[styles.formTitle, { color: colors.text }]}>
                Sign In
              </SText>

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
                label="Email, Phone, or Username"
                placeholder="Enter your registered login detail"
                value={identifier}
                onChangeText={(text) => {
                  setIdentifier(text);
                  if (errors.identifier) setErrors((prev) => ({ ...prev, identifier: undefined }));
                }}
                error={errors.identifier}
                autoCapitalize="none"
                containerStyle={styles.inputSpacing}
              />

              <SInput
                label="Password"
                placeholder="••••••••"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                error={errors.password}
                secureTextEntry
                autoCapitalize="none"
                containerStyle={styles.inputSpacing}
              />

              <Pressable
                onPress={() => router.push('/(auth)/forgot-password')}
                style={styles.forgotRow}
              >
                <SText variant="bodySm" style={{ color: colors.primary, fontWeight: '600' }}>
                  Forgot password?
                </SText>
              </Pressable>

              <SButton
                title="Sign In"
                onPress={handleLogin}
                loading={loading}
                style={styles.loginButton}
              />

              {role !== 'admin' && (
                <View style={styles.registerPrompt}>
                  <SText variant="bodySm" style={{ color: colors.textSecondary }}>
                    Don't have an account?{' '}
                  </SText>
                  <SButton
                    title="Register"
                    variant="ghost"
                    size="sm"
                    onPress={() => router.push('/(auth)/register')}
                    textStyle={[Typography.bodySm, { fontWeight: 'bold' }]}
                  />
                </View>
              )}
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
    paddingTop: Spacing.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  logoFrame: {
    padding: Spacing.md,
    borderRadius: Radii['2xl'],
    marginBottom: Spacing.md,
  },
  logo: {
    width: 88,
    height: 88,
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
  },
  formCard: {
    padding: Spacing.xl,
    borderRadius: Radii['2xl'],
  },
  formTitle: {
    fontWeight: '600',
    marginBottom: Spacing.xl,
  },
  roleSelector: {
    marginBottom: Spacing.xl,
  },
  inputSpacing: {
    marginBottom: Spacing.lg,
  },
  forgotRow: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.md,
    marginTop: -Spacing.sm,
  },
  loginButton: {
    width: '100%',
  },
  registerPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },
});
