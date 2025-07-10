import { useEffect } from 'react';

/**
 * カスタムフックで、メディアクエリの変化を監視します。
 * @param query - 監視するメディアクエリの文字列。
 * @param callback - メディアクエリの状態が変化したときに呼び出されるコールバック関数。
 */
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
