import type { GetServerSidePropsContext, PreviewData, Redirect } from 'next';
import type { ParsedUrlQuery } from 'querystring';

export type ServerSideCookieOptions = {
  domain?: string;
  expires?: Date;
  httpOnly?: boolean;
  maxAge?: number;
  path?: string;
  sameSite?: 'lax' | 'none' | 'strict' | 'Lax' | 'None' | 'Strict';
  secure?: boolean;
};

export type ServerSideCookieHelper = {
  delete: (key: string, options?: ServerSideCookieOptions) => void;
  set: (key: string, value: string, options: ServerSideCookieOptions) => void;
};

export type ServerSideInterceptorVariablesHelper<
  V extends { [key: string]: unknown },
> = {
  current: V;
  set: <K extends keyof V>(key: K, value: V[K]) => void;
};

export type ServerSideInterceptorHelpers<V extends { [key: string]: unknown }> =
  {
    cookies: ServerSideCookieHelper;
    variables: ServerSideInterceptorVariablesHelper<V>;
  };

export type GetServerSidePropsReturn<
  Props extends { [key: string]: any } = object,
> =
  | Promise<{ props: Props } | { redirect: Redirect } | { notfound: true }>
  | { props: Props }
  | { redirect: Redirect }
  | { notfound: true };

export type GetServerSideCallback<
  V extends { [key: string]: unknown },
  Props extends { [key: string]: any } = object,
  Params extends ParsedUrlQuery = ParsedUrlQuery,
  Preview extends PreviewData = PreviewData,
> = (
  context: GetServerSidePropsContext<Params, Preview>,
  helper: ServerSideInterceptorHelpers<V>,
) => GetServerSidePropsReturn<Props>;

export type ServerSideInterceptor<
  V extends { [key: string]: unknown },
  Props extends { [key: string]: any } = object,
  Params extends ParsedUrlQuery = ParsedUrlQuery,
  Preview extends PreviewData = PreviewData,
> = (
  context: GetServerSidePropsContext<Params, Preview>,
  helper: ServerSideInterceptorHelpers<V>,
) => GetServerSidePropsReturn<Props>;

export type ServerSideErrorInterceptor<
  V extends { [key: string]: unknown },
  Params extends ParsedUrlQuery = ParsedUrlQuery,
  Preview extends PreviewData = PreviewData,
> = (
  error: any,
  context: GetServerSidePropsContext<Params, Preview>,
  helper: ServerSideInterceptorHelpers<V>,
) => GetServerSidePropsReturn | void;
