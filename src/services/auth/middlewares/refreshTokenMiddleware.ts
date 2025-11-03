import {
  ACCESS_TOKEN_REQUEST_HEADER,
  ARGEEMENT_STATUS_REQUEST_HEADER,
  USER_TYPE_REQUEST_HEADER,
} from '@/configs/requestHeaders';
import { USER_TOP_RELOIN_URL, WARNING_URL } from '@/configs/urls';
import { HTTP_STATUS_CODES } from '@/enums/httpStatusCodes';
import type { MiddlewareVariables } from '@/middleware';
import {
  deletePageAuthCookies,
  getNewAccessTokenByRefreshToken,
  setPageAuthCookies,
} from '@/services/auth/usecases/token';
import { FetcherException } from '@/utils/fetcher/exception';
import type { MiddlewareCallback } from '@/utils/middlewares/type';
import { NextResponse } from 'next/server';

// トークンのリフレッシュ処理を行うミドルウェア（エラーページ以外）
export const refreshTokenMiddleware: MiddlewareCallback<
  MiddlewareVariables
> = async (request, { requestHeaders, responseCookies, variables }) => {
  try {
    const { authCookies } = variables.current;

    if (!authCookies.isLogin) {
      return;
    }

    const { accessToken: newAccessToken } = await (async () => {
      if (authCookies.shouldRefreshToken) {
        const response = await getNewAccessTokenByRefreshToken(
          authCookies.memberType,
          authCookies.refreshToken,
        );

        setPageAuthCookies(responseCookies.set, {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          memberType: authCookies.memberType,
          agreementStatus: authCookies.agreementStatus,
          registeredStatus: authCookies.registeredStatus,
        });

        return response;
      }

      return {
        accessToken: authCookies.accessToken,
        refreshToken: authCookies.refreshToken,
      };
    })();

    // getServerSideProps で使用するためにリクエストヘッダーにセット
    requestHeaders.set(ACCESS_TOKEN_REQUEST_HEADER, newAccessToken);
    requestHeaders.set(USER_TYPE_REQUEST_HEADER, authCookies.memberType);
    requestHeaders.set(
      ARGEEMENT_STATUS_REQUEST_HEADER,
      authCookies.agreementStatus,
    );
  } catch (error) {
    console.error('refresh token error', error);

    if (!(error instanceof FetcherException)) {
      deletePageAuthCookies(responseCookies.delete);
      return NextResponse.redirect(new URL(WARNING_URL, request.url));
    }

    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    switch (error.status) {
      case HTTP_STATUS_CODES.UNAUTHORIZED:
        deletePageAuthCookies(responseCookies.delete);
        return NextResponse.redirect(new URL(USER_TOP_RELOIN_URL, request.url));
      default:
        deletePageAuthCookies(responseCookies.delete);
        return NextResponse.redirect(new URL(WARNING_URL, request.url));
    }
  }
};
