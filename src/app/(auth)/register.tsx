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

export default function RegisterScreen() {
  const { register } = useAuth();
  const colors = useThemeColors();
  const router = useRouter();

  const [role, setRole] = useState<'parent' | 'teacher'>('parent');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [sid, setSid] = useState('');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    sid?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email is required';
    if (!phone.trim() || !/^\d{10}$/.test(phone.trim())) newErrors.phone = '10-digit phone number is required';
    if (!password || password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (role === 'parent' && !sid.trim()) newErrors.sid = 'Student ID (SID) is required for parents';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      const payload = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password,
        role,
        ...(role === 'parent' ? { sid: sid.trim().toLowerCase() } : {}),
      };

      const response = await register(payload);

      if (response?.success) {
        Alert.alert(
          'Registration Success',
          'Your account has been created successfully. You can now log in.',
          [{ text: 'Go to Login', onPress: () => router.replace('/(auth)/login') }]
        );
      }
    } catch (error: any) {
      Alert.alert(
        'Registration Failed',
        error.message || 'An error occurred during registration. Please try again.'
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
            Join Sanskriti Pre School
          </SText>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(200)}
          style={[styles.formCard, { backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]}
        >
          <SText variant="titleMd" style={styles.formTitle}>
            Create Account
          </SText>

          <SText variant="labelSm" style={{ color: colors.textSecondary, marginBottom: Spacing.sm }}>
            Register As
          </SText>
          <View style={styles.roleContainer}>
            <SChip
              label="Parent"
              selected={role === 'parent'}
              onPress={() => {
                setRole('parent');
                setErrors((prev) => ({ ...prev, sid: undefined }));
              }}
              style={styles.roleChip}
            />
            <SChip
              label="Teacher"
              selected={role === 'teacher'}
              onPress={() => {
                setRole('teacher');
                setErrors((prev) => ({ ...prev, sid: undefined }));
              }}
              style={styles.roleChip}
            />
          </View>

          <SInput
            label="Full Name"
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            error={errors.name}
            containerStyle={styles.inputSpacing}
          />

          <SInput
            label="Email Address"
            placeholder="example@mail.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
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
            onChangeText={(text) => {
              setPhone(text);
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
            }}
            error={errors.phone}
            keyboardType="phone-pad"
            containerStyle={styles.inputSpacing}
          />

          {role === 'parent' && (
            <SInput
              label="Student ID (SID)"
              placeholder="e.g. sid01"
              value={sid}
              onChangeText={(text) => {
                setSid(text);
                if (errors.sid) setErrors((prev) => ({ ...prev, sid: undefined }));
              }}
              error={errors.sid}
              autoCapitalize="none"
              containerStyle={styles.inputSpacing}
              helperText="Ask the administrator for your child's student ID."
            />
          )}

          <SInput
            label="Password"
            placeholder="At least 6 characters"
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
            title="Register"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerButton}
          />

          <View style={styles.loginPrompt}>
            <SText variant="bodySm" style={{ color: colors.textSecondary }}>
              Already have an account?{' '}
            </SText>
            <SButton
              title="Sign In"
              variant="ghost"
              size="sm"
              onPress={() => router.replace('/(auth)/login')}
              textStyle={[Typography.bodySm, { fontWeight: 'bold' }]}
            />
          </View>
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
    marginBottom: Spacing['2xl'],
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: Spacing.sm,
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
  registerButton: {
    marginTop: Spacing.md,
    width: '100%',
  },
  loginPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },
});
