import type { ServerTimeProps } from '@/services/serverTime/types';
import { createContext, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  serverSideProps: ServerTimeProps;
};

export const ServerTimeContext = createContext<ServerTimeProps>({
  serverTime: Date.now(),
});

export function ServerTimeProvider({ children, serverSideProps }: Props) {
  return (
    <ServerTimeContext.Provider value={serverSideProps}>
      {children}
    </ServerTimeContext.Provider>
  );
}
