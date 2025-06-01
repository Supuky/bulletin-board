import type { Enum } from '@/types/enum';

export const FETCHER_ERROR_TYPES = {
  TIMEOUT_ERROR: 'TimeoutError',
  NETWORK_ERROR: 'NetworkError',
  ABORT_ERROR: 'AbortError',
  // PARSE_ERROR: 'ParseError',
  // UNKNOWN_ERROR: 'UnknownError',
  RESPONSE_ERROR: 'ResponseError',
} as const;

export type FetcherErrorTypes = Enum<typeof FETCHER_ERROR_TYPES>;
