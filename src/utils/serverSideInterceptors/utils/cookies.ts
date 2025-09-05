import type { ServerSideCookieOptions } from '@/utils/serverSideInterceptors/type';
import { isUndefined } from '@/utils/typeGuards';

/**
 * Generates a Set-Cookie header string.
 * @param key The name of the cookie.
 * @param value The value of the cookie.
 * @param options Additional cookie options.
 * @returns The formatted Set-Cookie header string.
 */
export const generateCookieHeader = (
  key: string,
  value: string,
  options: ServerSideCookieOptions,
) => {
  return `${key}=${value}; ${
    isUndefined(options.expires) ? '' : (
      `Expires=${options.expires.toUTCString()}; `
    )
  }Path=${options.path ?? '/'}; ${
    isUndefined(options.domain) ? '' : `Domain=${options.domain}; `
  }${isUndefined(options.secure) ? '' : `Secure; `}${isUndefined(options.httpOnly) ? '' : `HttpOnly; `}${
    isUndefined(options.sameSite) ? '' : `SameSite=${options.sameSite}; `
  }${isUndefined(options.maxAge) ? '' : `Max-Age=${options.maxAge}; `}` /**.trim()*/;
};
