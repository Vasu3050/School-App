import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedScheme = 'light' | 'dark';

const THEME_KEY = 'sanskriti_theme_preference';

interface ThemeContextType {
  preference: ThemePreference;
  resolvedScheme: ResolvedScheme;
  setPreference: (pref: ThemePreference) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

async function loadPreference(): Promise<ThemePreference> {
  try {
    const stored =
      Platform.OS === 'web'
        ? localStorage.getItem(THEME_KEY)
        : await SecureStore.getItemAsync(THEME_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    // ignore
  }
  return 'system';
}

async function savePreference(pref: ThemePreference) {
  try {
    if (Platform.OS === 'web') {
      localStorage.setItem(THEME_KEY, pref);
    } else {
      await SecureStore.setItemAsync(THEME_KEY, pref);
    }
  } catch {
    // ignore
  }
}

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useSystemColorScheme();
  const [preference, setPreferenceState] = useState<ThemePreference>('system');

  useEffect(() => {
    loadPreference().then(setPreferenceState);
  }, []);

  const resolvedScheme: ResolvedScheme = useMemo(() => {
    if (preference === 'system') {
      return systemScheme === 'dark' ? 'dark' : 'light';
    }
    return preference;
  }, [preference, systemScheme]);

  const setPreference = (pref: ThemePreference) => {
    setPreferenceState(pref);
    savePreference(pref);
  };

  const toggleTheme = () => {
    const next: ThemePreference = resolvedScheme === 'light' ? 'dark' : 'light';
    setPreference(next);
  };

  return (
    <ThemeContext.Provider value={{ preference, resolvedScheme, setPreference, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useAppTheme must be used within AppThemeProvider');
  }
  return ctx;
}
