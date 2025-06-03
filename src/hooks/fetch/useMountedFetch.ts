import { clientSideClientInstance } from '@/configs/clientInstance';
import type { HttpMethods } from '@/enums/httpsMethods';
import type { FetcherException } from '@/utils/fetcher/exception';
import type {
  FetcherRequestOptions,
  FetcherResponse,
} from '@/utils/fetcher/types';
import { isNull } from '@/utils/typeGuards';
import { useMemo, useRef } from 'react';
import type { SWRConfiguration } from 'swr';
import useSWR from 'swr';
import type { MutationFetcher } from 'swr/mutation';

export const useMountedFetch = <
  M extends HttpMethods,
  Data = undefined,
  FormatCallback extends (res: FetcherResponse<Data>) => any = (
    res: FetcherResponse<Data>,
  ) => Data,
>(
  method: M,
  url: string | null,
  {
    format,
    requestConfigs,
    swrConfigs,
  }: {
    format?: FormatCallback;
    requestConfigs?: Omit<FetcherRequestOptions, 'signal'>;
    swrConfigs?: SWRConfiguration<ReturnType<FormatCallback>, FetcherException>;
  } = {},
) => {
  const abortController = useRef<AbortController | undefined>(undefined);

  const fetcher = useMemo<
    MutationFetcher<ReturnType<FormatCallback>, [string]>
  >(() => {
    const formatResponse = format ?? ((res: FetcherResponse<Data>) => res.data);

    return ([fetcherUrl]) => {
      abortController.current = new AbortController();

      return clientSideClientInstance<Data>(method, fetcherUrl, {
        signal: abortController.current.signal,
        ...requestConfigs,
      })
        .then(formatResponse)
        .finally(() => {
          abortController.current = undefined;
        });
    };
  }, [format, method, requestConfigs]);

  const swr = useSWR<ReturnType<FormatCallback>, FetcherException>(
    isNull(url) ? null : [url, requestConfigs?.params, requestConfigs?.body],
    fetcher,
    swrConfigs,
  );

  const requestCancel = () => {
    abortController.current?.abort();
  };

  return {
    ...swr,
    requestCancel,
  };
};
