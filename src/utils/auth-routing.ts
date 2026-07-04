export type UserRole = 'parent' | 'teacher' | 'admin';

export function getUserPrimaryRole(user: { roles?: string[] } | null): UserRole {
  const role = user?.roles?.[0];
  if (role === 'teacher' || role === 'admin' || role === 'parent') {
    return role;
  }
  return 'parent';
}

export function getRoleHomePath(role: UserRole): `/(parent)/home` | `/(teacher)/home` | `/(admin)/home` {
  switch (role) {
    case 'teacher':
      return '/(teacher)/home';
    case 'admin':
      return '/(admin)/home';
    default:
      return '/(parent)/home';
  }
}

export function getRoleGroup(role: UserRole): '(parent)' | '(teacher)' | '(admin)' {
  switch (role) {
    case 'teacher':
      return '(teacher)';
    case 'admin':
      return '(admin)';
    default:
      return '(parent)';
  }
}

export function getRoleLabel(role: UserRole): string {
  switch (role) {
    case 'admin':
      return 'Administrator Portal';
    case 'teacher':
      return 'Teacher Workspace';
    default:
      return 'Parent Portal';
  }
}
