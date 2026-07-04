import { Redirect } from 'expo-router';

import { useAuth } from '@/context/auth-context';
import { getRoleHomePath, getUserPrimaryRole } from '@/utils/auth-routing';

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href={getRoleHomePath(getUserPrimaryRole(user))} />;
}
