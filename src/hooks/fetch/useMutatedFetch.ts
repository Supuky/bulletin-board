import { clientSideClientInstance } from '@/configs/clientInstance';
import type { HttpMethods } from '@/enums/httpsMethods';
import { HTTP_STATUS_CODES } from '@/enums/httpStatusCodes';
import type {
  Args,
  ContentType,
  ErrorResponse,
  UseMutatedFetchSwrConfig,
} from '@/hooks/fetch/types';
import type { createFetcher } from '@/utils/fetcher';
import type { FetcherException } from '@/utils/fetcher/exception';
import type {
  FetcherRequestOptions,
  FetcherResponse,
} from '@/utils/fetcher/types';
import { useMemo, useRef } from 'react';
import { useSWRConfig } from 'swr';
import type { MutationFetcher } from 'swr/mutation';
import useSWRMutation from 'swr/mutation';

export const useMutatedFetch = <
  M extends HttpMethods,
  C extends ContentType<M>,
  Data = undefined,
  Error = ErrorResponse,
  FormatCallback extends (res: FetcherResponse<Data>) => any = (
    res: FetcherResponse<Data>,
  ) => Data,
>(
  method: M,
  url: string,
  {
    format,
    client = clientSideClientInstance,
    requestConfigs,
    swrConfigs: {
      onLoadingSlow,
      onError,
      onSuccess,
      onFinally,
      ...swrConfigs
    } = {},
  }: {
    client?: ReturnType<typeof createFetcher>;
    format?: FormatCallback;
    requestConfigs?: Omit<FetcherRequestOptions, 'signal' | 'params'>;
    swrConfigs?: UseMutatedFetchSwrConfig<
      typeof url,
      M,
      C,
      Data,
      Error,
      FormatCallback
    >;
  } = {},
) => {
  const { loadingTimeout } = useSWRConfig();
  const abortController = useRef<AbortController | undefined>(undefined);
  const slowLoadingTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const fetcher = useMemo<
    MutationFetcher<
      ReturnType<FormatCallback>,
      [typeof url],
      Args<typeof method, C>
    >
  >(() => {
    const formatResponse = format ?? ((res: FetcherResponse<Data>) => res.data);

    return ([fetcherUrl], { arg: { params, data } = {} }) => {
      abortController.current = new AbortController();

      slowLoadingTimeout.current = setTimeout(() => {
        onLoadingSlow?.();
      }, loadingTimeout);

      return client<Data>(method, fetcherUrl, {
        params,
        body: data,
        signal: abortController.current.signal,
        ...requestConfigs,
      })
        .then(formatResponse)
        .finally(() => {
          clearTimeout(slowLoadingTimeout.current);
          slowLoadingTimeout.current = undefined;
          abortController.current = undefined;
        });
    };
  }, [client, format, loadingTimeout, method, onLoadingSlow, requestConfigs]);

  const onSuccessCallback: UseMutatedFetchSwrConfig<
    typeof url,
    M,
    C,
    Data,
    Error,
    FormatCallback
  >['onSuccess'] = async (...args) => {
    await onSuccess?.(...args);
    await onFinally?.();
  };

  const onErrorCallback: UseMutatedFetchSwrConfig<
    typeof url,
    M,
    C,
    Data,
    Error,
    FormatCallback
  >['onError'] = async (error, key, config) => {
    if (
      error.status !== HTTP_STATUS_CODES.GATEWAY_TIMEOUT &&
      error.status !== HTTP_STATUS_CODES.REQUEST_TIMEOUT &&
      error.reason !== 'TimeoutError' &&
      error.reason !== 'NetworkError'
    ) {
      await onError?.(error, key, config);
    }

    await onFinally?.();
  };

  const swrMutation = useSWRMutation<
    ReturnType<FormatCallback>,
    FetcherException<Error>,
    [typeof url],
    Args<typeof method, C>
  >([url], fetcher, {
    ...swrConfigs,
    throwOnError: false,
    onSuccess: onSuccessCallback,
    onError: onErrorCallback,
  });

  const cancel = () => {
    abortController.current?.abort();
  };

  return {
    ...swrMutation,
    cancel,
  };
};
