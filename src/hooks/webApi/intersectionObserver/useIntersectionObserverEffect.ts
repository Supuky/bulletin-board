import { isNull } from '@/utils/typeGuards';
import type { RefObject } from 'react';
import { useEffect } from 'react';

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
