import type { ReactListener } from '@/utils/react';

type MatchMediaStore = {
  current: boolean | undefined;
};

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
