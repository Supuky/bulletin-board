import type { RefObject } from 'react';
import { useEffect } from 'react';
import { isNull } from 'util';

export const useResizeObserverEffect = <
  T extends RefObject<HTMLElement | null>,
>(
  ref: T,
  callback: ResizeObserverCallback,
) => {
  useEffect(() => {
    const element = ref.current;
    if (isNull(element)) return;

    const resizeObserver = new ResizeObserver(callback);
    resizeObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element);
    };
  }, [ref, callback]);
};
