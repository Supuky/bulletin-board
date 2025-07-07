import { createMatchMediaStateStore } from '@/hooks/webApi/matchMedia/store';
import { useMemo, useSyncExternalStore } from 'react';

export const useMatchMediaState = (query: string) => {
  const {
    subscribeMatchMedia,
    getMatchMediaSnapshot,
    getMatchMediaServerSnapshot,
  } = useMemo(() => createMatchMediaStateStore(query), [query]);

  return useSyncExternalStore(
    subscribeMatchMedia,
    getMatchMediaSnapshot,
    getMatchMediaServerSnapshot,
  );
};
