import { createUserAgentStore } from '@/hooks/webApi/userAgent/store';
import { useSyncExternalStore } from 'react';

const { subscribeUserAgent, getUserAgentSnapshot, getUserAgentServerSnapshot } =
  createUserAgentStore();

export const useUserAgent = () => {
  return useSyncExternalStore(
    subscribeUserAgent,
    getUserAgentSnapshot,
    getUserAgentServerSnapshot,
  );
};
