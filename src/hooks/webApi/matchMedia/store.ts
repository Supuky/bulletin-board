import type { ReactListener } from '@/utils/react';

type MatchMediaStore = {
  current: boolean | undefined;
};

/**
 * メディアクエリの状態を監視するストアを作成します。
 * @param query - 監視するメディアクエリの文字列。
 * @returns オブジェクトに、メディアクエリの状態を監視するための関数と、現在の状態を取得するための関数が含まれます。
 */
export const createMatchMediaStateStore = (query: string) => {
  const state: MatchMediaStore = {
    current: undefined,
  };

  const subscribeMatchMedia = (listener: ReactListener) => {
    const mediaQueryList = window.matchMedia(query);
    state.current = mediaQueryList.matches;

    listener();

    const onChange = (e: MediaQueryListEvent) => {
      state.current = e.matches;
      listener();
    };
    mediaQueryList.addEventListener('change', onChange);

    return () => {
      mediaQueryList.removeEventListener('change', onChange);
    };
  };

  const getMatchMediaSnapshot = () => {
    return state.current;
  };

  const getMatchMediaServerSnapshot = () => {
    return state.current;
  };

  return {
    subscribeMatchMedia,
    getMatchMediaSnapshot,
    getMatchMediaServerSnapshot,
  };
};
