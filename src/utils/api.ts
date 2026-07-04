import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// UPDATE THIS WITH YOUR HOST MACHINE'S LOCAL IP ADDRESS
// when testing on a physical device connected to the same Wi-Fi network.
// Android Emulator uses '10.0.2.2' to access the host machine's localhost.
// iOS Simulator/Web uses 'localhost'.
const DEV_HOST = '10.0.2.2'; 
const PORT = '3000';

export const API_BASE_URL = Platform.select({
  android: `http://${DEV_HOST}:${PORT}/api/v1`,
  default: `http://localhost:${PORT}/api/v1`,
});

const ACCESS_TOKEN_KEY = 'sanskriti_access_token';
const REFRESH_TOKEN_KEY = 'sanskriti_refresh_token';
const USER_DATA_KEY = 'sanskriti_user_data';

// Helper to store items securely
export async function setSecureItem(key: string, value: string) {
  try {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  } catch (error) {
    console.error(`Error saving secure item: ${key}`, error);
  }
}

// Helper to retrieve items securely
export async function getSecureItem(key: string): Promise<string | null> {
  try {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error(`Error getting secure item: ${key}`, error);
    return null;
  }
}

// Helper to delete items securely
export async function deleteSecureItem(key: string) {
  try {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  } catch (error) {
    console.error(`Error deleting secure item: ${key}`, error);
  }
}

// Auth Helpers
export async function saveAuthData(accessToken: string, refreshToken: string, user: any) {
  await setSecureItem(ACCESS_TOKEN_KEY, accessToken);
  await setSecureItem(REFRESH_TOKEN_KEY, refreshToken);
  await setSecureItem(USER_DATA_KEY, JSON.stringify(user));
}

export async function updateStoredUser(user: any) {
  await setSecureItem(USER_DATA_KEY, JSON.stringify(user));
}

export async function clearAuthData() {
  await deleteSecureItem(ACCESS_TOKEN_KEY);
  await deleteSecureItem(REFRESH_TOKEN_KEY);
  await deleteSecureItem(USER_DATA_KEY);
}

export async function getAuthUser(): Promise<any | null> {
  const data = await getSecureItem(USER_DATA_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

/** Validates stored session by refreshing tokens. Returns user or null. */
export async function validateStoredSession(): Promise<any | null> {
  const refreshToken = await getSecureItem(REFRESH_TOKEN_KEY);
  const storedUser = await getAuthUser();

  if (!refreshToken || !storedUser) {
    await clearAuthData();
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/refresh-token`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      await clearAuthData();
      return null;
    }

    const data = await response.json();
    if (data?.success && data?.data?.accessToken) {
      const { accessToken, refreshToken: newRefreshToken } = data.data;
      await setSecureItem(ACCESS_TOKEN_KEY, accessToken);
      if (newRefreshToken) {
        await setSecureItem(REFRESH_TOKEN_KEY, newRefreshToken);
      }
      return storedUser;
    }

    await clearAuthData();
    return null;
  } catch {
    await clearAuthData();
    return null;
  }
}

// Main API request handler
export async function apiRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get Access Token
  const token = await getSecureItem(ACCESS_TOKEN_KEY);
  
  const headers = new Headers(options.headers || {});
  
  // Set JSON headers by default
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  
  // Set Auth Header
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  const config = {
    ...options,
    headers,
  };

  try {
    let response = await fetch(url, config);
    
    // Check if token expired (401 Unauthorized)
    if (response.status === 401 && endpoint !== '/users/login') {
      console.log('Access token expired or unauthorized. Attempting refresh...');
      const refreshed = await attemptTokenRefresh();
      
      if (refreshed) {
        // Retry request with new token
        const newToken = await getSecureItem(ACCESS_TOKEN_KEY);
        if (newToken) {
          headers.set('Authorization', `Bearer ${newToken}`);
          response = await fetch(url, { ...config, headers });
        }
      } else {
        // Refresh failed, clear data
        await clearAuthData();
        throw new Error('Session expired. Please log in again.');
      }
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data?.message || `Request failed with status ${response.status}`);
    }
    
    return data;
  } catch (error: any) {
    if (error?.message === 'Failed to fetch' || error?.name === 'TypeError') {
      console.error(
        `apiRequest network error on ${endpoint}: Cannot reach ${API_BASE_URL}. ` +
          'Check that the backend is running and CORS allows this origin.'
      );
      throw new Error(
        'Cannot connect to the server. Make sure the backend is running on port 3000.'
      );
    }
    console.error(`apiRequest error on ${endpoint}:`, error.message);
    throw error;
  }
}

// Internal function to attempt token refresh
async function attemptTokenRefresh(): Promise<boolean> {
  const refreshToken = await getSecureItem(REFRESH_TOKEN_KEY);
  if (!refreshToken) return false;

  try {
    const url = `${API_BASE_URL}/users/refresh-token`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    if (data?.success && data?.data?.accessToken) {
      const { accessToken, refreshToken: newRefreshToken } = data.data;
      await setSecureItem(ACCESS_TOKEN_KEY, accessToken);
      if (newRefreshToken) {
        await setSecureItem(REFRESH_TOKEN_KEY, newRefreshToken);
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return false;
  }
}
