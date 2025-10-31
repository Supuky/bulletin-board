// import {
//   ERROR_401_URL,
//   ERROR_403_URL,
//   ERROR_404_URL,
//   ERROR_500_URL,
// } from '@/configs/urls';
import type { LegitimateAuthCookieSchemaPayload } from '@/services/auth/schemas/common';
import { Middleware } from '@/utils/middlewares';

// const errorPagePath = [
//   ERROR_401_URL,
//   ERROR_403_URL,
//   ERROR_404_URL,
//   ERROR_500_URL,
// ];

export type MiddlewareVariables = {
  authCookies: LegitimateAuthCookieSchemaPayload;
};

const middleware = new Middleware<MiddlewareVariables>();

// middleware.add(errorPagePath, );

export default middleware.generate();

export const config = {
  matcher: '/((?!api|_next/static|_next/image|.*.ico|.*,svg).*)',
};
