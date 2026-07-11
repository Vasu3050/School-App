import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  apiRequest,
  saveAuthData,
  clearAuthData,
  validateStoredSession,
  updateStoredUser,
} from '../utils/api';

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  roles: string[];
  status?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (credentials: {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    role: string;
  }) => Promise<any>;
  register: (userData: {
    name: string;
    email: string;
    phone: string;
    password?: string;
    role: string;
    sid?: string;
  }) => Promise<any>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  resetPassword: (oldPassword: string, newPassword: string) => Promise<void>;
  forgotPassword: (email: string, phone: string, newPassword: string) => Promise<void>;
  updateProfile: (fields: { name?: string; phone?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const validUser = await validateStoredSession();
      setUser(validUser);
    } catch (error) {
      console.error('Error during initial auth verification:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials: {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    role: string;
  }) => {
    try {
      setLoading(true);
      const response = await apiRequest('/users/login', {
        method: 'PATCH',
        body: JSON.stringify(credentials),
      });

      if (response?.success && response?.data) {
        const { accessToken, refreshToken, user: userData } = response.data;
        await saveAuthData(accessToken, refreshToken, userData);
        setUser(userData);
        return response.data;
      }
      throw new Error(response?.message || 'Login failed.');
    } catch (error: any) {
      console.error('Login error:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    phone: string;
    password?: string;
    role: string;
    sid?: string;
  }) => {
    try {
      setLoading(true);
      const response = await apiRequest('/users/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      return response;
    } catch (error: any) {
      console.error('Registration error:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await apiRequest('/users/logout', { method: 'PATCH' });
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      await clearAuthData();
      setUser(null);
      setLoading(false);
    }
  };

  const resetPassword = async (oldPassword: string, newPassword: string) => {
    if (!user?.email) {
      throw new Error('User email not found.');
    }

    await apiRequest('/users/reset-password', {
      method: 'PATCH',
      body: JSON.stringify({
        email: user.email,
        oldPassword,
        newPassword,
      }),
    });
  };

  const forgotPassword = async (email: string, phone: string, newPassword: string) => {
    await apiRequest('/users/forgot-password', {
      method: 'PATCH',
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        newPassword,
      }),
    });
  };

  const updateProfile = async (fields: { name?: string; phone?: string }) => {
    await apiRequest('/users/update-user', {
      method: 'PATCH',
      body: JSON.stringify(fields),
    });

    if (user) {
      const updatedUser = { ...user, ...fields };
      await updateStoredUser(updatedUser);
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        checkAuth,
        resetPassword,
        forgotPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
