import { clientSideClientInstance } from '@/configs/clientInstance';
import type { HttpMethods } from '@/enums/httpsMethods';
import type {
  Args,
  ContentType,
  ErrorResponse,
  UseMutatedFetchWithoutMiddlewareConfig,
} from '@/hooks/fetch/types';
import type { FetcherResponse } from '@/utils/fetcher/types';
import { useCallback, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';

export const useMutatedFetchWithoutMiddleware = <
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
    format = ((res: FetcherResponse<Data>) =>
      res.data) as unknown as FormatCallback,
    onError,
    onFinally,
    onLoadingSlow,
    onSuccess,
    ...configs
  }: UseMutatedFetchWithoutMiddlewareConfig<Data, Error, FormatCallback> = {},
) => {
  const slowLoadingTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const [responseData, setResponseData] = useState<Data | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isMutating, setIsMutating] = useState(false);

  const { loadingTimeout } = useSWRConfig();

  const reset = () => {
    setResponseData(undefined);
    setError(undefined);
    setIsMutating(false);
  };

  const trigger = useCallback(
    async (args?: Args<M, C>) => {
      slowLoadingTimeout.current = setTimeout(() => {
        onLoadingSlow?.();
      }, loadingTimeout);

      try {
        setIsMutating(true);

        const response = await clientSideClientInstance<Data>(method, url, {
          body: args?.data,
          params: args?.params,
          ...configs,
        });

        clearTimeout(slowLoadingTimeout.current);
        setResponseData(format(response) as ReturnType<FormatCallback>);
        await onSuccess?.(response.data);
      } catch (e) {
        clearTimeout(slowLoadingTimeout.current);
        setError((e as FetcherResponse<Error>).data);
        await onError?.((e as FetcherResponse<Error>).data);
      } finally {
        slowLoadingTimeout.current = undefined;
        setIsMutating(false);
        await onFinally?.();
      }
    },
    [
      configs,
      format,
      loadingTimeout,
      method,
      onError,
      onFinally,
      onLoadingSlow,
      onSuccess,
      url,
    ],
  );

  return {
    data: responseData,
    error,
    isMutating,
    reset,
    trigger,
  };
};
