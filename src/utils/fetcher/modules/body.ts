import type { FetcherRequestOptions } from '@/utils/fetcher/types';
import { isUndefined } from '@/utils/typeGuards';

export const transformBody = (body: FetcherRequestOptions['body']) => {
  if (
    isUndefined(body) ||
    body instanceof URLSearchParams ||
    body instanceof FormData
  ) {
    return body;
  }

  return JSON.stringify(body);
};
