import type { HTTP_METHODS, HttpMethods } from '@/enums/httpsMethods';
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
