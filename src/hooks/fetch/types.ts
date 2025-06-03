import type { HTTP_METHODS, HttpMethods } from '@/enums/httpsMethods';
import type { FetcherException } from '@/utils/fetcher/exception';
import type {
  FetcherRequestOptions,
  FetcherResponse,
} from '@/utils/fetcher/types';
import type { Key } from 'swr';
import type { SWRMutationConfiguration } from 'swr/mutation';

export type Params = { params?: object } | undefined;

// ContentType:
// - 'JSON': application/json
// - 'MULTIPART': multipart/form-data
// - 'FORM_URLENCODED': application/x-www-form-urlencoded
export type ContentType<M extends HttpMethods> =
  M extends typeof HTTP_METHODS.POST ? 'JSON' | 'MULTIPART' | 'FORM_URLENCODED'
  : 'JSON';

export type Data<
  M extends HttpMethods,
  C extends ContentType<M> = ContentType<M>,
> =
  C extends 'FORM_URLENCODED' ? { data: URLSearchParams }
  : C extends 'MULTIPART' ? { data: FormData }
  : { data: Record<string, unknown> | unknown[] | undefined };

export type Args<
  M extends HttpMethods,
  C extends ContentType<M> = ContentType<M>,
> =
  M extends typeof HTTP_METHODS.GET ? Params & ({ data?: never } | undefined)
  : Params & Data<M, C>;

export type useMutatedFetchSWRConfig<
  D,
  Error,
  SWRMutationKey extends Key = Key,
  ExtraArg = any,
  SWRData = any,
> = Omit<
  SWRMutationConfiguration<D, Error, SWRMutationKey, ExtraArg, SWRData>,
  'onSuccess' | 'onError'
> & {
  onError?: (
    error: Error,
    key: string,
    config: Readonly<
      SWRMutationConfiguration<D, Error, SWRMutationKey, ExtraArg, SWRData>
    >,
  ) => void | Promise<void>;
  onFinally?: () => void | Promise<void>;
  onLoadingSlow?: () => void;
  onSuccess?: (
    data: D,
    key: string,
    config: Readonly<
      SWRMutationConfiguration<D, Error, SWRMutationKey, ExtraArg, SWRData>
    >,
  ) => void | Promise<void>;
};

export type UseMutatedFetchSwrConfig<
  U,
  M extends HttpMethods,
  C extends ContentType<M>,
  D = undefined,
  Error = ErrorResponse,
  FormatCallback extends (res: FetcherResponse<D>) => any = (
    res: FetcherResponse<D>,
  ) => D,
> = useMutatedFetchSWRConfig<
  ReturnType<FormatCallback>,
  FetcherException<Error>,
  [U],
  Args<M, C>
>;

export type ErrorResponse = {
  errorCode?: string;
  message: string;
};

export type UseMutatedFetchWithoutMiddlewareConfig<
  D = undefined,
  E = ErrorResponse,
  F extends (res: FetcherResponse<D>) => any = (res: FetcherResponse<D>) => D,
> = {
  format?: F;
  onError?: (error: E) => void | Promise<void>;
  onFinally?: () => void | Promise<void>;
  onLoadingSlow?: () => void;
  onSuccess?: (data: D) => void | Promise<void>;
} & Omit<FetcherRequestOptions, 'params' | 'body'>;
