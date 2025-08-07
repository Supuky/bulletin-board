import { createHashStore } from '@/hooks/router/store';
import { useSyncExternalStore } from 'react';

const { subscribeHash, getHashSnapshot, getHashServerSnapshot } =
  createHashStore();

export const useHash = () => {
  return useSyncExternalStore(
    subscribeHash,
    getHashSnapshot,
    getHashServerSnapshot,
  );
};
