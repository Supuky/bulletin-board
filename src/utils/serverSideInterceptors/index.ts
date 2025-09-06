import { ERROR_500_URL } from '@/configs/urls';
import { HTTP_STATUS_CODES } from '@/enums/httpStatusCodes';
import { FetcherException } from '@/utils/fetcher/exception';
import type {
  GetServerSideCallback,
  ServerSideCookieHelper,
  ServerSideErrorInterceptor,
  ServerSideInterceptor,
  ServerSideInterceptorHelpers,
} from '@/utils/serverSideInterceptors/type';
import { generateCookieHeader } from '@/utils/serverSideInterceptors/utils/cookies';
import type { GetServerSidePropsContext, PreviewData } from 'next';
import type { ParsedUrlQuery } from 'querystring';

export const serverSideInterceptors = <
  V extends { [key: string]: unknown },
  InterceptorProps extends { [key: string]: any }[] = object[],
  Params extends ParsedUrlQuery = ParsedUrlQuery,
  Preview extends PreviewData = PreviewData,
>(
  ...interceptors: ServerSideInterceptor<
    V,
    InterceptorProps[number],
    Params,
    Preview
  >[]
) => {
  return <
    Props extends { [key: string]: any } = object,
    CallbackV extends V = V,
  >(
    callback?: GetServerSideCallback<CallbackV, Props, Params, Preview>,
    errorInterceptor?: ServerSideErrorInterceptor<V, Params, Preview>,
  ) => {
    const getServerSidePropsCallback = callback ?? (() => ({ props: {} }));

    return async (context: GetServerSidePropsContext<Params, Preview>) => {
      const cookies: string[] = [
        ...((context.res.getHeader('Set-Cookie') ?? []) as string[]),
      ];

      const variables = {
        current: {} as V,
      };

      const setVariables = <K extends keyof V>(key: K, value: V[K]) => {
        variables.current[key] = value;
      };

      const setCookie: ServerSideCookieHelper['set'] = (
        key,
        value,
        options,
      ) => {
        cookies.push(generateCookieHeader(key, value, options));
      };

      const deleteCookie: ServerSideCookieHelper['delete'] = (key, options) => {
        cookies.push(
          generateCookieHeader(key, '', {
            ...options,
            expires: new Date(0),
            maxAge: 0,
          }),
        );
      };

      const helper = {
        variables: {
          current: variables.current,
          set: setVariables,
        },
        cookies: {
          set: setCookie,
          delete: deleteCookie,
        },
      };

      try {
        const result = {
          props: {},
        };

        for (const interceptor of interceptors) {
          // eslint-disable-next-line no-await-in-loop
          const interceptorResult = await interceptor(context, helper);

          if (
            'redirect' in interceptorResult ||
            'notfound' in interceptorResult
          ) {
            context.res.setHeader('Set-Cookie', cookies);
            return interceptorResult;
          }

          result.props = {
            ...result.props,
            ...interceptorResult.props,
          };
        }

        const callbackResult = await getServerSidePropsCallback(
          context,
          helper as unknown as ServerSideInterceptorHelpers<CallbackV>,
        );

        if ('redirect' in callbackResult || 'notfound' in callbackResult) {
          context.res.setHeader('Set-Cookie', cookies);
          return callbackResult;
        }

        result.props = {
          ...result.props,
          ...callbackResult.props,
        };

        context.res.setHeader('Set-Cookie', cookies);

        return result;
      } catch (error) {
        if (
          error instanceof FetcherException &&
          error.status === HTTP_STATUS_CODES.NOT_FOUND
        ) {
          return {
            notfound: true,
          };
        }

        console.error('getServerSide Interceptor', error);

        const errorResult = errorInterceptor?.(error, context, helper) ?? {
          redirect: {
            destination: ERROR_500_URL,
            permanent: false,
          },
        };

        context.res.setHeader('Set-Cookie', cookies);

        return errorResult;
      }
    };
  };
};
