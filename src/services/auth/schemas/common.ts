import {
  AUTH_COOKIE_ADMIN_REGISTERED_STATUS_KEYS,
  AUTH_COOKIE_AGREEMENT_STATUS_KEYS,
  AUTH_COOKIE_GENERAL_REGISTERED_STATUS_KEYS,
  AUTH_COOKIE_KEYS,
  AUTH_COOKIE_MEMBER_TYPES_KEYS,
} from '@/services/auth/enums/cookie';
import { VALIDATION_CODES } from '@/services/validation/enums/codes';
import { isJson, isUndefined } from '@/utils/typeGuards';
import { z } from 'zod';

const logoutDefaultCookieConfig = {
  isLogin: false,
  shouldRefreshToken: false,
  shouldTransferToAgreement: false,
  shouldTransferToRegister: false,
  stateToken: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  memberType: undefined,
  registeredStatus: undefined,
  agreementStatus: undefined,
  // email: undefined,
} as const;

export const authCookieStateTokenSchema = z
  .string()
  .superRefine((val, ctx) => {
    const parsedParts: unknown = isJson(val) ? JSON.parse(val) : val;

    if (typeof parsedParts !== 'string') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_CODES.INVALID_PATTERN,
      });
      return;
    }

    const parts = parsedParts.split('|');

    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    switch (true) {
      case parts.length === 1: {
        const uuidValidation = z.string().uuid().safeParse(val);

        if (!uuidValidation.success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: VALIDATION_CODES.INVALID_PATTERN,
            path: ['uuidStateToken'],
          });
        }
        break;
      }
      case parts.length === 2: {
        const uuidPart = parts[0];
        const urlPart = parts[1];

        const uuidValidation = z.string().uuid().safeParse(uuidPart);

        if (!uuidValidation.success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: VALIDATION_CODES.INVALID_PATTERN,
            path: ['uuidPart'],
          });
        }

        const urlValidation = z.string().url().safeParse(urlPart);

        if (!urlValidation.success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: VALIDATION_CODES.INVALID_PATTERN,
            path: ['urlPart'],
          });
        }
        break;
      }
      default:
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_CODES.INVALID_PATTERN,
          path: ['unknownParts length'],
        });
        break;
    }
  })
  .transform((val) => {
    if (!isJson(val)) {
      return val;
    }

    const parsedParts: unknown = JSON.parse(val);

    if (typeof parsedParts !== 'string') {
      return '';
    }

    try {
      const url = parsedParts.split('|')[1];
      return decodeURI(url);
    } catch (error) {
      console.error('Error decoding URL from state token:', error);
      return '';
    }
  });

export const authCookieAgreementStatuses = z.enum([
  AUTH_COOKIE_AGREEMENT_STATUS_KEYS.AGREEMENT,
  AUTH_COOKIE_AGREEMENT_STATUS_KEYS.DISAGREEMENT,
]);

export const authCookieGeneralRegisteredStatuses = z.enum([
  AUTH_COOKIE_GENERAL_REGISTERED_STATUS_KEYS.UNREGISTERED,
  AUTH_COOKIE_GENERAL_REGISTERED_STATUS_KEYS.REGISTERED_STEP_ONE,
  AUTH_COOKIE_GENERAL_REGISTERED_STATUS_KEYS.REGISTERED_STEP_TWO,
  AUTH_COOKIE_GENERAL_REGISTERED_STATUS_KEYS.REGISTERED,
]);

export const authCookieAdminRegisteredStatuses = z.enum([
  AUTH_COOKIE_ADMIN_REGISTERED_STATUS_KEYS.UNREGISTERED,
  AUTH_COOKIE_ADMIN_REGISTERED_STATUS_KEYS.REGISTERED,
]);

// 認証ステート取得中のクッキー
export const unauthenticatedStateCookieSchema = z
  .object({
    // ログイン画面からブラウザバックしてきた場合に備えて、オプショナル
    [AUTH_COOKIE_KEYS.STATE_TOKEN]: authCookieStateTokenSchema.optional(),
    [AUTH_COOKIE_KEYS.ACCESS_TOKEN]: z.undefined(),
    [AUTH_COOKIE_KEYS.REFRESH_TOKEN]: z.undefined(),
    [AUTH_COOKIE_KEYS.MEMBER_TYPE]: z.undefined(),

    [AUTH_COOKIE_KEYS.REGISTERED_STATUS]:
      authCookieGeneralRegisteredStatuses.optional(),
    [AUTH_COOKIE_KEYS.AGREEMENT_STATUS]: authCookieAgreementStatuses.optional(),
  })
  .transform(() => {
    return logoutDefaultCookieConfig;
  });

// login-callback時のクッキー
export const unauthenticatedLoginCallbackCookieSchema = z.object({
  [AUTH_COOKIE_KEYS.STATE_TOKEN]: authCookieStateTokenSchema,
  [AUTH_COOKIE_KEYS.ACCESS_TOKEN]: z.undefined(),
  [AUTH_COOKIE_KEYS.REFRESH_TOKEN]: z.undefined(),
  [AUTH_COOKIE_KEYS.MEMBER_TYPE]: z.undefined(),
  [AUTH_COOKIE_KEYS.REGISTERED_STATUS]: z.undefined(),
  [AUTH_COOKIE_KEYS.AGREEMENT_STATUS]: z.undefined(),
});

// 一般ユーザーの認証済みクッキー
export const authenticatedGeneralCookieSchema = z
  .object({
    [AUTH_COOKIE_KEYS.STATE_TOKEN]: z.undefined(),
    [AUTH_COOKIE_KEYS.ACCESS_TOKEN]: z.string().min(1).optional(),
    [AUTH_COOKIE_KEYS.REFRESH_TOKEN]: z.string().min(1),
    [AUTH_COOKIE_KEYS.MEMBER_TYPE]: z.literal(
      AUTH_COOKIE_MEMBER_TYPES_KEYS.GENERAL,
    ),
    [AUTH_COOKIE_KEYS.AGREEMENT_STATUS]: authCookieAgreementStatuses,
    [AUTH_COOKIE_KEYS.REGISTERED_STATUS]: authCookieGeneralRegisteredStatuses,
  })
  .transform(
    ({ [AUTH_COOKIE_KEYS.ACCESS_TOKEN]: accessToken, ...otherData }) => {
      if (isUndefined(accessToken)) {
        return {
          isLogin: true,
          shouldRefreshToken: true,
          stateToken: undefined,
          accessToken: undefined,
          refreshToken: otherData[AUTH_COOKIE_KEYS.REFRESH_TOKEN],
          memberType: otherData[AUTH_COOKIE_KEYS.MEMBER_TYPE],
          agreementStatus: otherData[AUTH_COOKIE_KEYS.AGREEMENT_STATUS],
          registeredStatus: otherData[AUTH_COOKIE_KEYS.REGISTERED_STATUS],
        } as const;
      }

      return {
        isLogin: true,
        shouldRefreshToken: false,
        stateToken: undefined,
        accessToken,
        refreshToken: otherData[AUTH_COOKIE_KEYS.REFRESH_TOKEN],
        memberType: otherData[AUTH_COOKIE_KEYS.MEMBER_TYPE],
        agreementStatus: otherData[AUTH_COOKIE_KEYS.AGREEMENT_STATUS],
        registeredStatus: otherData[AUTH_COOKIE_KEYS.REGISTERED_STATUS],
      } as const;
    },
  );

// 管理者ユーザーの認証済みクッキー
export const authenticatedAdminCookieSchema = z
  .object({
    [AUTH_COOKIE_KEYS.STATE_TOKEN]: z.undefined(),
    [AUTH_COOKIE_KEYS.ACCESS_TOKEN]: z.string().min(1).optional(),
    [AUTH_COOKIE_KEYS.REFRESH_TOKEN]: z.string().min(1),
    [AUTH_COOKIE_KEYS.MEMBER_TYPE]: z.literal(
      AUTH_COOKIE_MEMBER_TYPES_KEYS.ADMIN,
    ),
    [AUTH_COOKIE_KEYS.AGREEMENT_STATUS]: authCookieAgreementStatuses,
    [AUTH_COOKIE_KEYS.REGISTERED_STATUS]: authCookieAdminRegisteredStatuses,
  })
  .transform(
    ({ [AUTH_COOKIE_KEYS.ACCESS_TOKEN]: accessToken, ...otherData }) => {
      if (isUndefined(accessToken)) {
        return {
          isLogin: true,
          shouldRefreshToken: true,
          stateToken: undefined,
          accessToken: undefined,
          refreshToken: otherData[AUTH_COOKIE_KEYS.REFRESH_TOKEN],
          memberType: otherData[AUTH_COOKIE_KEYS.MEMBER_TYPE],
          agreementStatus: otherData[AUTH_COOKIE_KEYS.AGREEMENT_STATUS],
          registeredStatus: otherData[AUTH_COOKIE_KEYS.REGISTERED_STATUS],
        } as const;
      }

      return {
        isLogin: true,
        shouldRefreshToken: false,
        stateToken: undefined,
        accessToken,
        refreshToken: otherData[AUTH_COOKIE_KEYS.REFRESH_TOKEN],
        memberType: otherData[AUTH_COOKIE_KEYS.MEMBER_TYPE],
        agreementStatus: otherData[AUTH_COOKIE_KEYS.AGREEMENT_STATUS],
        registeredStatus: otherData[AUTH_COOKIE_KEYS.REGISTERED_STATUS],
      };
    },
  );

// ログイン中のクッキー
export const authenticatedCookieSchema = authenticatedGeneralCookieSchema.or(
  authenticatedAdminCookieSchema,
);

// ログアウト済みのクッキー
export const unauthenticatedCookieSchema = z
  .object({
    [AUTH_COOKIE_KEYS.STATE_TOKEN]: authCookieStateTokenSchema.optional(),
    [AUTH_COOKIE_KEYS.ACCESS_TOKEN]: z.undefined(),
    [AUTH_COOKIE_KEYS.REFRESH_TOKEN]: z.undefined(),
    [AUTH_COOKIE_KEYS.MEMBER_TYPE]: z.undefined(),
    [AUTH_COOKIE_KEYS.REGISTERED_STATUS]:
      authCookieGeneralRegisteredStatuses.optional(),
    [AUTH_COOKIE_KEYS.AGREEMENT_STATUS]:
      authCookieGeneralRegisteredStatuses.optional(),
  })
  .transform(() => {
    return logoutDefaultCookieConfig;
  });

export const legitimateStateAuthCookieSchema = unauthenticatedCookieSchema.or(
  authenticatedCookieSchema,
);

export const legitimateAuthCookieSchema = authenticatedCookieSchema.or(
  unauthenticatedCookieSchema,
);

export type LegitimateStateAuthCookieSchemaPayload = z.infer<
  typeof legitimateStateAuthCookieSchema
>;

export type LegitimateAuthCookieSchemaPayload = z.infer<
  typeof legitimateAuthCookieSchema
>;
