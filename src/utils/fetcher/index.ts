import type { HttpMethods } from '@/enums/httpsMethods';
import type { HttpStatusCodes } from '@/enums/httpStatusCodes';
import { HTTP_STATUS_CODES } from '@/enums/httpStatusCodes';
import { FETCHER_ERROR_TYPES } from '@/utils/fetcher/enums';
import { FetcherException } from '@/utils/fetcher/exception';
import { transformBody } from '@/utils/fetcher/modules/body';
import { generateQueryParams } from '@/utils/fetcher/modules/query';
import { analyzeResponse } from '@/utils/fetcher/modules/response';
import type {
  CreateFetcherOptions,
  FetcherRequestOptions,
  FetcherResponse,
} from '@/utils/fetcher/types';
import { isUndefined } from '@/utils/typeGuards';

export const createFetcher = ({
  baseUrl,
  headers,
  timeout,
  ...options
}: CreateFetcherOptions) => {
  return async <Res, Params extends object = object, ErrorRes = object>(
    method: HttpMethods,
    url: string,
    {
      timeout: settingsTimeout,
      headers: settingsHeaders,
      signal = undefined,
      params,
      body,
      ...settingOptions
    }: FetcherRequestOptions<Params> = {},
    qsType: Parameters<typeof generateQueryParams>[1] = 'comma',
  ): Promise<FetcherResponse<Res>> => {
    let errorType: string | undefined = undefined;

    try {
      const mainAbortController = new AbortController();

      const mainTimeout = settingsTimeout ?? timeout;

      if (!isUndefined(mainTimeout)) {
        const timeoutSignal = AbortSignal.timeout(mainTimeout);

        timeoutSignal.addEventListener('abort', () => {
          errorType = FETCHER_ERROR_TYPES.TIMEOUT_ERROR;
          mainAbortController.abort();
        });
      }

      signal?.addEventListener('abort', () => {
        errorType = FETCHER_ERROR_TYPES.ABORT_ERROR;
        mainAbortController.abort();
      });

      const stringfiedParams = generateQueryParams(params, qsType);

      const response = await fetch(`${baseUrl}${url}${stringfiedParams}`, {
        method,
        ...options,
        ...settingOptions,
        signal: mainAbortController.signal,
        body: transformBody(body),
        headers: {
          ...headers,
          ...settingsHeaders,
        },
      });

      const status = response.status as HttpStatusCodes;

      const data: unknown = await analyzeResponse(response);

      if (status >= HTTP_STATUS_CODES.BAD_REQUEST) {
        errorType = FETCHER_ERROR_TYPES.RESPONSE_ERROR;
        throw new FetcherException(
          FETCHER_ERROR_TYPES.RESPONSE_ERROR,
          response,
          data as ErrorRes,
          status,
        );
      }

      return {
        data: data as Res,
        status,
        response,
      };
    } catch (error) {
      switch (errorType) {
        case FETCHER_ERROR_TYPES.RESPONSE_ERROR:
          throw error;
        case FETCHER_ERROR_TYPES.TIMEOUT_ERROR:
        case FETCHER_ERROR_TYPES.ABORT_ERROR:
          throw new FetcherException(errorType, error);
        case undefined:
        default:
          throw new FetcherException(FETCHER_ERROR_TYPES.NETWORK_ERROR, error);
      }
    }
  };
};
