import type {
  AUTH_MEMBER_TYPE_VALUES,
  AuthAdminRegisteredStatuses,
  AuthAgreementStatuses,
  AuthGeneralRegisteredStatuses,
} from '@/services/auth/enums/cookie';

export type HydratedAuth =
  | {
      authAgreementStatus: AuthAgreementStatuses;
      authMemberType: typeof AUTH_MEMBER_TYPE_VALUES.GENERAL;
      authRegisteredStatus: AuthGeneralRegisteredStatuses;
      isLogin: true;
    }
  | {
      authAgreementStatus: AuthAgreementStatuses;
      authMemberType: typeof AUTH_MEMBER_TYPE_VALUES.ADMIN;
      authRegisteredStatus: AuthAdminRegisteredStatuses;
      isLogin: true;
    }
  | {
      isLogin: false | undefined;
    };

export type AuthProps = {
  auth: HydratedAuth;
};
