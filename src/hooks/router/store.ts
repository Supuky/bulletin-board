import type { ReactListener } from '@/utils/react';
import { isEmptyString } from '@/utils/string';

type HashStore = {
  current?: string;
};

const store: HashStore = {
  current: undefined,
};

export const createHashStore = () => {
  const subscribeHash = (listener: ReactListener) => {
    const { hash } = window.location;
    store.current = isEmptyString(hash) ? undefined : hash.slice(1);
    listener();
    return () => {
      store.current = undefined;
    };
  };

  const getHashSnapshot = () => {
    return store.current;
  };

  const getHashServerSnapshot = () => {
    return store.current;
  };

  return {
    subscribeHash,
    getHashSnapshot,
    getHashServerSnapshot,
  };
};
