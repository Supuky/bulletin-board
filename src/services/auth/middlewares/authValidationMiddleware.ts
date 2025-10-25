import { IS_LOGIN_REQUEST_HEADER } from '@/configs/requestHeaders';
import type { MiddlewareVariables } from '@/middleware';
import { AUTH_COOKIE_KEYS } from '@/services/auth/enums/cookie';
import { legitimateAuthCookieSchema } from '@/services/auth/schemas/common';
import { deletePageAuthCookies } from '@/services/auth/usecases/token';
import type { MiddlewareCallback } from '@/utils/middlewares/type';
import { NextResponse } from 'next/server';

export const authValidationMiddleware: MiddlewareCallback<
  MiddlewareVariables
> = (request, { requestHeaders, variables, responseCookies }) => {
  try {
    const { cookies: requestCookies } = request;

    const previousStateToken = requestCookies.get(
      AUTH_COOKIE_KEYS.STATE_TOKEN,
    )?.value;
    const previousAccessToken = requestCookies.get(
      AUTH_COOKIE_KEYS.ACCESS_TOKEN,
    )?.value;
    const previousRefreshToken = requestCookies.get(
      AUTH_COOKIE_KEYS.REFRESH_TOKEN,
    )?.value;
    const previousMemberType = requestCookies.get(
      AUTH_COOKIE_KEYS.MEMBER_TYPE,
    )?.value;
    const previousAgreementStatus = requestCookies.get(
      AUTH_COOKIE_KEYS.AGREEMENT_STATUS,
    )?.value;
    const previousRegisteredStatus = requestCookies.get(
      AUTH_COOKIE_KEYS.REGISTERED_STATUS,
    )?.value;

    /**
     * クッキーのバリデーションを実施
     * 問題なければ認証情報を変数にセットし、レスポンスヘッダーにログイン状態をセット
     */
    const parsedCookies = legitimateAuthCookieSchema.parse({
      [AUTH_COOKIE_KEYS.STATE_TOKEN]: previousStateToken,
      [AUTH_COOKIE_KEYS.ACCESS_TOKEN]: previousAccessToken,
      [AUTH_COOKIE_KEYS.REFRESH_TOKEN]: previousRefreshToken,
      [AUTH_COOKIE_KEYS.MEMBER_TYPE]: previousMemberType,
      [AUTH_COOKIE_KEYS.AGREEMENT_STATUS]: previousAgreementStatus,
      [AUTH_COOKIE_KEYS.REGISTERED_STATUS]: previousRegisteredStatus,
    });

    requestHeaders.set(
      IS_LOGIN_REQUEST_HEADER,
      parsedCookies.isLogin.toString(),
    );
    variables.set('authCookies', parsedCookies);
  } catch (error) {
    deletePageAuthCookies(responseCookies.delete);
    console.error('authValidationMiddleware Error:', error);
    //TODO: エラーページにリダイレクトするまたはホーム画面にリダイレクトする
    return NextResponse.redirect(new URL('/auth/error', request.url));
  }
};
