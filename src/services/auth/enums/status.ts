import type { Enum } from '@/types/enum';

export const LOGIN_EXCEPTION_STATUS = {
  RELOGIN: '0',
  FAILED: '1',
} as const;

export type LoginExceptionStatus = Enum<typeof LOGIN_EXCEPTION_STATUS>;

export const LOGIN_TYPE_MISMATCH_QUERY_TYPES = {
  GENERAL_TRY_LOGIN_AS_ADMIN: '0',
  ADMIN_TRY_LOGIN_AS_GENERAL: '1',
};

export type LoginTypeMismatchQueryTypes = Enum<
  typeof LOGIN_TYPE_MISMATCH_QUERY_TYPES
>;
