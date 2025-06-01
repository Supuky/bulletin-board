import type { Enum } from '@/types/enum';

export const COOKIE_PREFIX = {
  HOST: '--HOST--',
  SECURE: '--SECURE--',
} as const;

export const SAME_SITE_COOKIE = {
  STRICT: 'strict',
  LAX: 'lax',
  NONE: 'none',
} as const;

export type CookiePrefixes = Enum<typeof COOKIE_PREFIX>;
export type SameSiteCookie = Enum<typeof SAME_SITE_COOKIE>;
