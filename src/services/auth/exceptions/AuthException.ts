import type { AuthExceptionMessage } from '@/services/auth/enums/exception';
import { toAuthExceptionMessage } from '@/services/auth/enums/exception';

export class AuthException extends Error {
  constructor(type: AuthExceptionMessage) {
    super(toAuthExceptionMessage(type));
    this.name = 'AuthException';
  }
}
