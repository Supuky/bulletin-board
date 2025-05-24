import type {
  MiddlewareCallback,
  Middlewares,
  ResponseCookieSet,
  ResponseCookiesHelper,
  VariablesHelper,
} from '@/utils/middlewares/type';
import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from 'next/server';

/**
 * Next.js のリクエストに対してミドルウェアを実行するためのクラス
 */
export class Middleware<V extends { [key: string]: unknown }> {
  private middlewares: Middlewares<V> = new Set();

  /**
   * ミドルウェアを追加する
   * @param {RegExp} middlewareRule - リクエストURLにマッチするルール
   * @param {MiddlewareCallback} middlewareCallback - 実行するミドルウェアのコールバック関数
   */
  // public use(...middleware: [RegExp, MiddlewareCallback<V>]) {
  public add(...middleware: [RegExp, MiddlewareCallback<V>]) {
    this.middlewares.add(middleware);
  }

  /**
   * ミドルウェア処理関数を生成する
   * @return {Function} - ミドルウェア処理関数
   */
  public generate() {
    return this.run;
  }

  /**
   * リクエストとイベントに対してミドルウェアを実行する
   * @param {NextRequest} request - リクエストオブジェクト
   * @param {NextFetchEvent} event - イベントオブジェクト
   * @return {Promise<NextResponse | void>} - ミドルウェアの実行後のレスポンス
   */
  // private generateMiddleware = async (
  private run = async (request: NextRequest, event: NextFetchEvent) => {
    const responseCookies: ResponseCookieSet = new Set();
    const requestHeaders = new Headers(request.headers);

    const variables = {
      current: {} as VariablesHelper<V>['current'],
    };

    const setVariable: VariablesHelper<V>['set'] = (key, value) => {
      variables.current = {
        ...variables.current,
        [key]: value,
      };
    };

    const setCookie: ResponseCookiesHelper['set'] = (...args) => {
      responseCookies.add(args);
    };

    const deleteCookie: ResponseCookiesHelper['delete'] = (key, option) => {
      responseCookies.add([
        key,
        '',
        {
          ...option,
          maxAge: 0,
        },
      ]);
    };

    for (const [rule, callback] of this.middlewares) {
      if (!rule.test(request.nextUrl.pathname)) {
        continue;
      }

      // eslint-disable-next-line no-await-in-loop
      const process = await callback(
        request,
        {
          requestHeaders,
          responseCookies: {
            set: setCookie,
            delete: deleteCookie,
          },
          variables: {
            current: variables.current,
            set: setVariable,
          },
        },
        event,
      );

      if (process instanceof NextResponse) {
        responseCookies.forEach((args) => {
          process.cookies.set(...args);
        });
        return process;
      }

      const nextResponse = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      responseCookies.forEach((args) => {
        nextResponse.cookies.set(...args);
      });

      return nextResponse;
    }
  };
}
