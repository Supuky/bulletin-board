import {
  LOGIN_EXCEPTION_STATUS,
  LOGIN_TYPE_MISMATCH_QUERY_TYPES,
} from '@/services/auth/enums/status';
import { z } from 'zod';

export const loginExceptionQueryStatusesSchema = z
  .enum([LOGIN_EXCEPTION_STATUS.RELOGIN, LOGIN_EXCEPTION_STATUS.FAILED])
  .optional();

export type LoginExceptionQueryStatusesSchemaPayload = z.infer<
  typeof loginExceptionQueryStatusesSchema
>;

export const loginTypeMismatchQueryTypesSchema = z.enum([
  LOGIN_TYPE_MISMATCH_QUERY_TYPES.GENERAL_TRY_LOGIN_AS_ADMIN,
  LOGIN_TYPE_MISMATCH_QUERY_TYPES.ADMIN_TRY_LOGIN_AS_GENERAL,
]);
