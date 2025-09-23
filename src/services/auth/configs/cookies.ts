import { SAME_SITE_COOKIE } from '@/enums/cookies';

const { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } = process.env;

export const ACCESS_TOKEN_COOKIE_CONFIG = {
  maxAge: Number(ACCESS_TOKEN_MAX_AGE) || 15 * 60 * 1000, // 15 minutes
  path: '/',
  httpOnly: true,
  secure: true,
  sameSite: SAME_SITE_COOKIE.LAX,
};

export const REFRESH_TOKEN_COOKIE_CONFIG = {
  maxAge: Number(REFRESH_TOKEN_MAX_AGE) || 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
  httpOnly: true,
  secure: true,
  sameSite: SAME_SITE_COOKIE.LAX,
};

export const STATE_TOKEN_COOKIE_CONFIG = {
  maxAge: 60 * 30 * 1000, // 30 minutes
  path: '/',
  httpOnly: true,
  secure: true,
  sameSite: SAME_SITE_COOKIE.LAX,
};
