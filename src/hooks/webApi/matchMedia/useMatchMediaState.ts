import { createMatchMediaStateStore } from '@/hooks/webApi/matchMedia/store';
import { useMemo, useSyncExternalStore } from 'react';

/**
 * メディアクエリの状態を監視するカスタムフック。
 *
 * @param query - 監視するメディアクエリの文字列。
 */
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
