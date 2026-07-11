import { useAppTheme } from '@/context/theme-context';

/** Returns the resolved color scheme (light | dark), respecting user toggle. */
export function useColorScheme() {
  const { resolvedScheme } = useAppTheme();
  return resolvedScheme;
}
