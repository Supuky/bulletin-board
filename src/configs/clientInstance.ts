import { REQUEST_API_TIMEOUT_LIMIT } from '@/configs/times';
import { createFetcher } from '@/utils/fetcher';

const { BACKEND_API_ENDPOINT } = process.env;
const API_VERSION = 'v1';

const commonRequestHeaders = {
  'Content-Type': 'application/json',
};

export const serverClientInstance = createFetcher({
  baseUrl: `${BACKEND_API_ENDPOINT}/${API_VERSION}`,
  headers: commonRequestHeaders,
  cache: 'no-store',
  credentials: 'include',
});

export const serverClientInstanceWithAuth = (authHeader: string) =>
  createFetcher({
    baseUrl: `${BACKEND_API_ENDPOINT}/${API_VERSION}`,
    headers: {
      ...commonRequestHeaders,
      Authorization: `Bearer ${authHeader}`,
      // 'x-Auth-Token': authHeader,
    },
    cache: 'no-store',
    credentials: 'include',
  });

export const clientSideClientInstance = createFetcher({
  baseUrl: '/api',
  headers: commonRequestHeaders,
  cache: 'no-store',
  timeout: REQUEST_API_TIMEOUT_LIMIT,
  credentials: 'include',
});
