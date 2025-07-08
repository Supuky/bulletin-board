import { isNull } from '@/utils/typeGuards';
import type { RefObject } from 'react';
import { useEffect } from 'react';

/**
 * ターゲット要素とルート要素の交差を監視するカスタムフック。
 *
 * @param targetRef - 監視対象となる要素へのRef。
 * @param callback - 交差状態が変化したときに実行されるコールバック関数。
 * @param options - IntersectionObserverのオプション（rootMargin、ルート要素、thresholdなど）。
 */
export const useIntersectionObserverEffect = <R extends RefObject<HTMLElement>>(
  targetRef: RefObject<HTMLElement>,
  callback: IntersectionObserverCallback,
  {
    rootMargin,
    rootRef,
    threshold,
  }: {
    rootMargin?: string;
    rootRef?: R;
    threshold?: number | number[];
  } = {
    rootMargin: undefined,
    rootRef: undefined,
    threshold: undefined,
  },
) => {
  useEffect(() => {
    if (isNull(targetRef.current)) {
      return;
    }
    const intersectionObserver = new IntersectionObserver(callback, {
      root: rootRef?.current ?? null,
      rootMargin,
      threshold,
    });

    intersectionObserver.observe(targetRef.current);

    return () => {
      intersectionObserver.disconnect();
    };
  });
};
