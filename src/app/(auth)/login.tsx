import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { useAuth } from '@/context/auth-context';
import { useThemeColors } from '@/hooks/use-theme';
import { Typography, Spacing, Radii, LogoPath, Elevation } from '@/constants/theme';
import { SInput } from '@/components/ui/SInput';
import { SButton } from '@/components/ui/SButton';
import { SText } from '@/components/ui/SText';
import { SChip } from '@/components/ui/SChip';
import { getRoleHomePath } from '@/utils/auth-routing';

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View entering={FadeIn.duration(800)} style={styles.header}>
          <Image source={LogoPath} style={styles.logo} contentFit="contain" />
          <SText variant="headlineLg" style={styles.title}>
            Sanskriti Pre School
          </SText>
          <SText variant="bodyMd" style={{ color: colors.textSecondary, textAlign: 'center' }}>
            Vijayapura
          </SText>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          style={[styles.formCard, { backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}
        >
          <SText variant="titleMd" style={styles.formTitle}>
            Sign In
          </SText>

          <SText variant="labelSm" style={{ color: colors.textSecondary, marginBottom: Spacing.sm }}>
            Select Account Type
          </SText>
          <View style={styles.roleContainer}>
            <SChip
              label="Parent"
              selected={role === 'parent'}
              onPress={() => setRole('parent')}
              style={styles.roleChip}
            />
            <SChip
              label="Teacher"
              selected={role === 'teacher'}
              onPress={() => setRole('teacher')}
              style={styles.roleChip}
            />
            <SChip
              label="Admin"
              selected={role === 'admin'}
              onPress={() => setRole('admin')}
              style={styles.roleChip}
            />
          </View>

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
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing['3xl'],
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: Spacing.md,
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
  },
  formCard: {
    borderRadius: Radii.lg,
    borderWidth: 1,
    padding: Spacing.xl,
    ...Elevation.sm,
  },
  formTitle: {
    fontWeight: '600',
    marginBottom: Spacing.xl,
  },
  roleContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  roleChip: {
    flex: 1,
    alignItems: 'center',
  },
  inputSpacing: {
    marginBottom: Spacing.lg,
  },
  loginButton: {
    marginTop: Spacing.md,
    width: '100%',
  },
  registerPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },
});
