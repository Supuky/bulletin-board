import type { ServerTimeProps } from '@/services/serverTime/types';
import type { ServerSideInterceptor } from '@/utils/serverSideInterceptors/type';

export const serverTimeInterceptor: ServerSideInterceptor<
  {}, // 今後InterceptorVariablesという型を定義する
  ServerTimeProps
> = () => {
  return {
    props: {
      serverTime: Date.now(),
    },
  };
};
