import type { HttpStatusCodes } from '@/enums/httpStatusCodes';
import type { FetcherErrorTypes } from '@/utils/fetcher/enums';

export class FetcherException<R = Response> extends Error {
  public status?: HttpStatusCodes;
  public data?: R;
  public reason: FetcherErrorTypes;
  public response: unknown;

  constructor(
    reason: FetcherErrorTypes,
    response: unknown,
    data?: R,
    status?: HttpStatusCodes,
  ) {
    super('Fech Error Occurred');
    this.name = 'FetcherException';
    this.status = status;
    this.data = data;
    this.reason = reason;
    this.response = response;
  }
}
