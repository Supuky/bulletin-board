import type { Enum } from '@/types/enum';

export const AUTH_EXCEPTION_MESSAGE = {
  INVALID_MEMBER_TYPE: 0,
  FAILED_TO_SET_AUTH_HEADER: 1,
  PAGE_MIDDLEWARE_ERROR: 2,
  INVALID_REGISTERED_STATUS: 3,
  INVALID_AGREEMENT_STATUS: 4,
  STATE_TOKEN_MISMATCH: 5,
} as const;

export type AuthExceptionMessage = Enum<typeof AUTH_EXCEPTION_MESSAGE>;

export const toAuthExceptionMessage = (value: AuthExceptionMessage) => {
  switch (value) {
    case AUTH_EXCEPTION_MESSAGE.INVALID_MEMBER_TYPE:
      return 'Invalid member type';
    case AUTH_EXCEPTION_MESSAGE.FAILED_TO_SET_AUTH_HEADER:
      return 'Failed to set auth header';
    case AUTH_EXCEPTION_MESSAGE.PAGE_MIDDLEWARE_ERROR:
      return 'Page middleware error';
    case AUTH_EXCEPTION_MESSAGE.INVALID_REGISTERED_STATUS:
      return 'Invalid registered status';
    case AUTH_EXCEPTION_MESSAGE.INVALID_AGREEMENT_STATUS:
      return 'Invalid agreement status';
    case AUTH_EXCEPTION_MESSAGE.STATE_TOKEN_MISMATCH:
      return 'State token mismatch';
    default:
      return 'Unknown error';
  }
};
