import type { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import type { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export type ResponseCookieSet = Set<Parameters<ResponseCookies['set']>>;

export type ResponseCookiesHelper = {
  delete: (
    key: string,
    options: Parameters<ResponseCookieSet['add']>[0][2],
  ) => void;
  set: (...args: Parameters<ResponseCookieSet['add']>[0]) => void;
};

export type VariablesHelper<V> = {
  current: V;
  set: <K extends keyof V>(key: K, value: V[K]) => void;
};

export type MiddlewareCallback<V extends { [key: string]: unknown }> = (
  request: NextRequest,
  helpers: {
    requestHeaders: Headers;
    responseCookies: ResponseCookiesHelper;
    variables: VariablesHelper<V>;
  },
  event: NextFetchEvent,
) => Promise<NextResponse | void> | NextResponse | void;

export type MiddlewareRule = RegExp;

export type Middlewares<V extends { [key: string]: unknown }> = Set<
  [MiddlewareRule, MiddlewareCallback<V>]
>;
