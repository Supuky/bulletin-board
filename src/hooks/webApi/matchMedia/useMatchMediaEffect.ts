import { useEffect } from 'react';

export const useMatchMediaEffect = (
  query: string,
  callback: (e: MediaQueryListEvent) => void,
) => {
  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const event = new MediaQueryListEvent('change', {
      media: query,
      matches: mediaQueryList.matches,
    });

    callback(event);

    mediaQueryList.addEventListener('change', callback);

    return () => {
      mediaQueryList.removeEventListener('change', callback);
    };
  }, [query, callback]);
};
