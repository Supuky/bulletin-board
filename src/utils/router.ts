import type { Url } from '@/types/common';
import { resolveHref } from 'next/dist/client/resolve-href';
import Router from 'next/router';

export const resolveRouterHref = (href: Url) => {
  const [resolve, interpolatedAs] = resolveHref(Router, href, true);

  return interpolatedAs ?? resolve;
};
