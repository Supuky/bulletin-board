import {
  ACCESS_TOKEN_COOKIE_CONFIG,
  REFRESH_TOKEN_COOKIE_CONFIG,
  STATE_TOKEN_COOKIE_CONFIG,
} from '@/services/auth/configs/cookies';
import type { AuthCookieMemberTypes } from '@/services/auth/enums/cookie';
import {
  AUTH_COOKIE_KEYS,
  AUTH_COOKIE_MEMBER_TYPES_KEYS,
} from '@/services/auth/enums/cookie';
import type { ResponseCookiesHelper } from '@/utils/middlewares/type';
import type { ServerSideCookieHelper } from '@/utils/serverSideInterceptors/type';

// TODO: 各会員種別ごとのリフレッシュトークン発行ロジックを実装する
const generateNewRefreshToken = {
  [AUTH_COOKIE_MEMBER_TYPES_KEYS.GENERAL]: async ({
    previousRefreshToken,
  }: {
    previousRefreshToken: string;
  }) => {
    // TODO: 一般ユーザー向けのリフレッシュトークン発行APIを呼び出す
    await new Promise((resolve) => void setTimeout(resolve, 1000));
    return `${previousRefreshToken}`;
  },
  [AUTH_COOKIE_MEMBER_TYPES_KEYS.ADMIN]: async ({
    previousRefreshToken,
  }: {
    previousRefreshToken: string;
  }) => {
    // TODO: 管理者ユーザー向けのリフレッシュトークン発行APIを呼び出す
    await new Promise((resolve) => void setTimeout(resolve, 1000));
    return `${previousRefreshToken}`;
  },
} as const;

export const getNewAccessTokenByRefreshToken = async (
  memberType: AuthCookieMemberTypes,
  previousRefreshToken: string,
) => {
  const response = await generateNewRefreshToken[memberType]({
    previousRefreshToken,
  });

  return response;
};

export const deletePageAuthCookies = (
  deleteCookie:
    | ResponseCookiesHelper['delete']
    | ServerSideCookieHelper['delete'],
) => {
  deleteCookie(AUTH_COOKIE_KEYS.STATE_TOKEN, STATE_TOKEN_COOKIE_CONFIG);
  deleteCookie(AUTH_COOKIE_KEYS.ACCESS_TOKEN, ACCESS_TOKEN_COOKIE_CONFIG);
  deleteCookie(AUTH_COOKIE_KEYS.REFRESH_TOKEN, REFRESH_TOKEN_COOKIE_CONFIG);
  deleteCookie(AUTH_COOKIE_KEYS.MEMBER_TYPE, REFRESH_TOKEN_COOKIE_CONFIG);
  deleteCookie(AUTH_COOKIE_KEYS.AGREEMENT_STATUS, REFRESH_TOKEN_COOKIE_CONFIG);
  deleteCookie(AUTH_COOKIE_KEYS.REGISTERED_STATUS, REFRESH_TOKEN_COOKIE_CONFIG);
};

export const setPageAuthCookies = (
  setCookie: ResponseCookiesHelper['set'] | ServerSideCookieHelper['set'],
  {
    accessToken,
    refreshToken,
    memberType,
    agreementStatus,
    registeredStatus,
  }: {
    accessToken: string;
    agreementStatus: string;
    memberType: AuthCookieMemberTypes;
    refreshToken: string;
    registeredStatus: string;
  },
) => {
  setCookie(
    AUTH_COOKIE_KEYS.ACCESS_TOKEN,
    accessToken,
    ACCESS_TOKEN_COOKIE_CONFIG,
  );
  setCookie(
    AUTH_COOKIE_KEYS.REFRESH_TOKEN,
    refreshToken,
    REFRESH_TOKEN_COOKIE_CONFIG,
  );
  setCookie(
    AUTH_COOKIE_KEYS.MEMBER_TYPE,
    memberType,
    REFRESH_TOKEN_COOKIE_CONFIG,
  );
  setCookie(
    AUTH_COOKIE_KEYS.AGREEMENT_STATUS,
    agreementStatus,
    REFRESH_TOKEN_COOKIE_CONFIG,
  );
  setCookie(
    AUTH_COOKIE_KEYS.REGISTERED_STATUS,
    registeredStatus,
    REFRESH_TOKEN_COOKIE_CONFIG,
  );
};
