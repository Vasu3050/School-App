/**
 * Sanskriti Pre School — Profile Screen
 *
 * Shows account info, edit name/phone, change password, sign out.
 * Wrapped in ScreenShell + ScreenHeader for the iOS-style top nav bar.
 */

import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { useAuth } from '@/context/auth-context';
import { useThemeColors } from '@/hooks/use-theme';
import { Spacing, Radii } from '@/constants/theme';
import { SButton, SCard, SDivider, SInput, SText } from '@/components/ui';
import { ScreenShell } from '@/components/ScreenShell';
import { ScreenHeader } from '@/components/ScreenHeader';
import { getRoleLabel, getUserPrimaryRole } from '@/utils/auth-routing';

export function ProfileScreen() {
  const { user, logout, resetPassword, updateProfile } = useAuth();
  const colors = useThemeColors();

  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Name cannot be empty.');
      return;
    }
    if (phone.trim() && !/^\d{10}$/.test(phone.trim())) {
      Alert.alert('Validation', 'Phone must be a 10-digit number.');
      return;
    }

    setSavingProfile(true);
    try {
      await updateProfile({
        name: name.trim(),
        phone: phone.trim() || undefined,
      });
      Alert.alert('Success', 'Profile updated successfully.');
    } catch (error: any) {
      Alert.alert('Update Failed', error.message || 'Could not update profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert('Validation', 'Please fill in all password fields.');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Validation', 'New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Validation', 'New passwords do not match.');
      return;
    }

    setChangingPassword(true);
    try {
      await resetPassword(oldPassword, newPassword);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      Alert.alert('Success', 'Password changed successfully.');
    } catch (error: any) {
      Alert.alert('Password Change Failed', error.message || 'Could not change password.');
    } finally {
      setChangingPassword(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      setLoggingOut(false);
    }
  };

  if (!user) return null;

  const role = getUserPrimaryRole(user);

  return (
    <ScreenShell>
      <ScreenHeader title="Profile" subtitle={getRoleLabel(role)} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View entering={FadeInDown.duration(500).delay(100)}>
            <SCard compact>
              <SText variant="titleMd" style={{ color: colors.text, marginBottom: Spacing.lg }}>
                Account Details
              </SText>

              <View style={styles.readOnlyField}>
                <SText variant="labelSm" style={{ color: colors.textMuted }}>
                  Email
                </SText>
                <SText variant="bodyMd" style={{ color: colors.text, marginTop: Spacing.xxs }}>
                  {user.email}
                </SText>
              </View>

              <SDivider spacing={Spacing.md} />

              <View style={styles.readOnlyField}>
                <SText variant="labelSm" style={{ color: colors.textMuted }}>
                  Account Status
                </SText>
                <SText variant="bodyMd" style={{ color: colors.text, marginTop: Spacing.xxs }}>
                  {(user.status ?? 'active').charAt(0).toUpperCase() +
                    (user.status ?? 'active').slice(1)}
                </SText>
              </View>
            </SCard>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(200)}>
            <SCard compact>
              <SText variant="titleMd" style={{ color: colors.text, marginBottom: Spacing.lg }}>
                Edit Profile
              </SText>

              <SInput
                label="Full Name"
                value={name}
                onChangeText={setName}
                containerStyle={styles.inputSpacing}
              />

              <SInput
                label="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="10-digit mobile number"
                containerStyle={styles.inputSpacing}
              />

              <SButton
                title="Save Changes"
                onPress={handleSaveProfile}
                loading={savingProfile}
              />
            </SCard>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(300)}>
            <SCard compact>
              <SText variant="titleMd" style={{ color: colors.text, marginBottom: Spacing.lg }}>
                Change Password
              </SText>

              <SInput
                label="Current Password"
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry
                autoCapitalize="none"
                containerStyle={styles.inputSpacing}
              />

              <SInput
                label="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                autoCapitalize="none"
                containerStyle={styles.inputSpacing}
              />

              <SInput
                label="Confirm New Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                containerStyle={styles.inputSpacing}
              />

              <SButton
                title="Update Password"
                variant="secondary"
                onPress={handleChangePassword}
                loading={changingPassword}
              />
            </SCard>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(400)}>
            <SButton
              title="Sign Out"
              variant="ghost"
              onPress={handleLogout}
              loading={loggingOut}
              style={styles.logoutButton}
            />
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.xl,
    gap: Spacing.xl,
    paddingBottom: Spacing['4xl'],
  },
  readOnlyField: {
    marginBottom: Spacing.sm,
  },
  inputSpacing: {
    marginBottom: Spacing.lg,
  },
  logoutButton: {
    alignSelf: 'center',
  },
});
