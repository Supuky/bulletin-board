import { createHashStore } from '@/hooks/router/store';
import { useSyncExternalStore } from 'react';

const { subscribeHash, getHashSnapshot, getHashServerSnapshot } =
  createHashStore();

/**
 * A custom hook that returns the current hash value from the URL.
 * @returns The current hash value.
 */
export const useHash = () => {
  return useSyncExternalStore(
    subscribeHash,
    getHashSnapshot,
    getHashServerSnapshot,
  );
};
