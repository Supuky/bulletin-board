import type { Enum } from '@/types/enum';

export const LOGIN_EXCEPTION_STATUS = {
  RELOGIN: '0',
  FAILED: '1',
} as const;

export type LoginExceptionStatus = Enum<typeof LOGIN_EXCEPTION_STATUS>;

// TODO: 今後型を追加するかも
