import { COOKIE_PREFIX } from '@/enums/cookies';
import { AUTH_EXCEPTION_MESSAGE } from '@/services/auth/enums/exception';
import { AuthException } from '@/services/auth/exceptions/AuthException';
import type { Enum } from '@/types/enum';

// TODO: COOKIE_PREFIX.HOST以降をランダムな文字列に変更する
export const AUTH_COOKIE_KEYS = {
  STATE_TOKEN: `${COOKIE_PREFIX.HOST}state_token`,
  ACCESS_TOKEN: `${COOKIE_PREFIX.HOST}access_token`,
  REFRESH_TOKEN: `${COOKIE_PREFIX.HOST}refresh_token`,
  AGREEMENT_STATUS: `${COOKIE_PREFIX.HOST}agreement_status`,
  REGISTERED_STATUS: `${COOKIE_PREFIX.HOST}registered_status`,
  MEMBER_TYPE: `${COOKIE_PREFIX.HOST}member_type`,
} as const;

// TODO: AGREEMENT_STATUSの値をagreement, disagreementをランダムな文字列に変更する
export const AUTH_COOKIE_AGREEMENT_STATUS_KEYS = {
  DISAGREEMENT: 'disagreement',
  AGREEMENT: 'agreement',
} as const;

// TODO: REGISTERED_STATUSの値をunregistered, registered_step_one, registered_step_two, registeredをランダムな文字列に変更する
export const AUTH_COOKIE_GENERAL_REGISTERED_STATUS_KEYS = {
  UNREGISTERED: 'unregistered',
  REGISTERED_STEP_ONE: 'registered_step_one',
  REGISTERED_STEP_TWO: 'registered_step_two',
  REGISTERED: 'registered',
} as const;

// TODO: REGISTERED_STATUSの値をunregistered, registeredをランダムな文字列に変更する
export const AUTH_COOKIE_ADMIN_REGISTERED_STATUS_KEYS = {
  UNREGISTERED: 'unregistered',
  REGISTERED: 'registered',
} as const;

// TODO: MEMBER_TYPEの値をgeneral, adminをランダムな文字列に変更する
export const AUTH_COOKIE_MEMBER_TYPES_KEYS = {
  GENERAL: 'general',
  ADMIN: 'admin',
} as const;

export type AuthCookieKeys = Enum<typeof AUTH_COOKIE_KEYS>;
export type AuthCookieAgreementStatus = Enum<
  typeof AUTH_COOKIE_AGREEMENT_STATUS_KEYS
>;
export type AuthCookieGeneralRegisteredStatus = Enum<
  typeof AUTH_COOKIE_GENERAL_REGISTERED_STATUS_KEYS
>;
export type AuthCookieAdminRegisteredStatus = Enum<
  typeof AUTH_COOKIE_ADMIN_REGISTERED_STATUS_KEYS
>;
export type AuthCookieMemberTypes = Enum<typeof AUTH_COOKIE_MEMBER_TYPES_KEYS>;

export const AUTH_MEMBER_TYPE_VALUES = {
  GENERAL: 0,
  ADMIN: 1,
} as const;

export const AUTH_AGREEMENT_STATUS_VALUES = {
  DISAGREEMENT: 0,
  AGREEMENT: 1,
} as const;

export const AUTH_GENERAL_REGISTERED_STATUS_VALUES = {
  UNREGISTERED: 0,
  REGISTERED_STEP_ONE: 1,
  REGISTERED_STEP_TWO: 2,
  REGISTERED: 3,
} as const;

export const AUTH_ADMIN_REGISTERED_STATUS_VALUES = {
  UNREGISTERED: 100,
  REGISTERED: 101,
} as const;

export const toAuthMemberType = (value: string | string[] | undefined) => {
  switch (value) {
    case AUTH_COOKIE_GENERAL_REGISTERED_STATUS_KEYS.REGISTERED:
      return AUTH_MEMBER_TYPE_VALUES.GENERAL;
    case AUTH_COOKIE_ADMIN_REGISTERED_STATUS_KEYS.REGISTERED:
      return AUTH_MEMBER_TYPE_VALUES.ADMIN;
    case undefined:
    default:
      throw new AuthException(AUTH_EXCEPTION_MESSAGE.INVALID_MEMBER_TYPE);
  }
};

export const toAuthMemberTypeLoginPath = (value: number | undefined) => {
  switch (value) {
    case AUTH_MEMBER_TYPE_VALUES.GENERAL:
      return 'general';
    case AUTH_MEMBER_TYPE_VALUES.ADMIN:
      return 'admin';
    case undefined:
    default:
      throw new AuthException(AUTH_EXCEPTION_MESSAGE.INVALID_MEMBER_TYPE);
  }
};

export const toAuthAgreementStatus = (value: string | string[] | undefined) => {
  switch (value) {
    case AUTH_COOKIE_AGREEMENT_STATUS_KEYS.DISAGREEMENT:
      return AUTH_AGREEMENT_STATUS_VALUES.DISAGREEMENT;
    case AUTH_COOKIE_AGREEMENT_STATUS_KEYS.AGREEMENT:
      return AUTH_AGREEMENT_STATUS_VALUES.AGREEMENT;
    case undefined:
    default:
      throw new AuthException(AUTH_EXCEPTION_MESSAGE.INVALID_AGREEMENT_STATUS);
  }
};

export const toAuthGeneralRegisteredStatus = (
  value: string | string[] | undefined,
) => {
  switch (value) {
    case AUTH_COOKIE_GENERAL_REGISTERED_STATUS_KEYS.UNREGISTERED:
      return AUTH_GENERAL_REGISTERED_STATUS_VALUES.UNREGISTERED;
    case AUTH_COOKIE_GENERAL_REGISTERED_STATUS_KEYS.REGISTERED_STEP_ONE:
      return AUTH_GENERAL_REGISTERED_STATUS_VALUES.REGISTERED_STEP_ONE;
    case AUTH_COOKIE_GENERAL_REGISTERED_STATUS_KEYS.REGISTERED_STEP_TWO:
      return AUTH_GENERAL_REGISTERED_STATUS_VALUES.REGISTERED_STEP_TWO;
    case AUTH_COOKIE_GENERAL_REGISTERED_STATUS_KEYS.REGISTERED:
      return AUTH_GENERAL_REGISTERED_STATUS_VALUES.REGISTERED;
    case undefined:
    default:
      throw new AuthException(AUTH_EXCEPTION_MESSAGE.INVALID_REGISTERED_STATUS);
  }
};

export const toAuthAdminRegisteredStatus = (
  value: string | string[] | undefined,
) => {
  switch (value) {
    case AUTH_COOKIE_ADMIN_REGISTERED_STATUS_KEYS.UNREGISTERED:
      return AUTH_ADMIN_REGISTERED_STATUS_VALUES.UNREGISTERED;
    case AUTH_COOKIE_ADMIN_REGISTERED_STATUS_KEYS.REGISTERED:
      return AUTH_ADMIN_REGISTERED_STATUS_VALUES.REGISTERED;
    case undefined:
    default:
      throw new AuthException(AUTH_EXCEPTION_MESSAGE.INVALID_REGISTERED_STATUS);
  }
};

export type AuthMemberTypes = ReturnType<typeof toAuthMemberType>;
export type AuthAgreementStatuses = ReturnType<typeof toAuthAgreementStatus>;
export type AuthGeneralRegisteredStatuses = ReturnType<
  typeof toAuthGeneralRegisteredStatus
>;
export type AuthAdminRegisteredStatuses = ReturnType<
  typeof toAuthAdminRegisteredStatus
>;
