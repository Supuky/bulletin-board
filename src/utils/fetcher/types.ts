import type { HttpStatusCodes } from '@/enums/httpStatusCodes';
import type { createFetcher } from '@/utils/fetcher';

export type CreateFetcherOptions = {
  baseUrl: string;
  timeout?: number;
} & Omit<RequestInit, 'method'>;

export type FetcherRequestOptions<Params = object> = Omit<
  RequestInit,
  'body' | 'method'
> & {
  body?: object | BodyInit;
  params?: Params;
  timeout?: number;
};

export type FetcherResponse<Res> = {
  data: Res;
  response: Response;
  status: HttpStatusCodes;
};

export type AbortedType = 'AbortedError' | 'TimeoutError';

export type CreateFetcher = ReturnType<typeof createFetcher>;
