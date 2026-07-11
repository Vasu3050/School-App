import {
  HankenGrotesk_400Regular,
  HankenGrotesk_600SemiBold,
  HankenGrotesk_700Bold,
} from '@expo-google-fonts/hanken-grotesk';
import {
  SourceSans3_400Regular,
  SourceSans3_600SemiBold,
} from '@expo-google-fonts/source-sans-3';
import { ThemeProvider, DefaultTheme, DarkTheme, Stack, useRouter, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ActivityIndicator, StatusBar, View, StyleSheet } from 'react-native';
import { useEffect } from 'react';

import { AuthProvider, useAuth } from '@/context/auth-context';
import { AppThemeProvider, useAppTheme } from '@/context/theme-context';
import { useThemeColors } from '@/hooks/use-theme';
import {
  getRoleGroup,
  getRoleHomePath,
  getUserPrimaryRole,
} from '@/utils/auth-routing';

SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const colors = useThemeColors();
  const { resolvedScheme } = useAppTheme();

  useEffect(() => {
    if (loading) return;

    const currentGroup = segments[0] as string;
    const inAuthGroup = currentGroup === '(auth)';

    if (!user && !inAuthGroup) {
      router.replace('/(auth)/login');
      SplashScreen.hideAsync();
      return;
    }

    if (user) {
      const role = getUserPrimaryRole(user);
      const expectedGroup = getRoleGroup(role);

      if (inAuthGroup || currentGroup !== expectedGroup) {
        router.replace(getRoleHomePath(role));
      }
    }

    SplashScreen.hideAsync();
  }, [user, loading, segments]);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle={resolvedScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(parent)" />
        <Stack.Screen name="(teacher)" />
        <Stack.Screen name="(admin)" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    HankenGrotesk_400Regular,
    HankenGrotesk_600SemiBold,
    HankenGrotesk_700Bold,
    SourceSans3_400Regular,
    SourceSans3_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AppThemeProvider>
      <ThemeProviderWrapper>
        <AuthProvider>
          <InitialLayout />
        </AuthProvider>
      </ThemeProviderWrapper>
    </AppThemeProvider>
  );
}

function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedScheme } = useAppTheme();
  return (
    <ThemeProvider value={resolvedScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {children}
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
