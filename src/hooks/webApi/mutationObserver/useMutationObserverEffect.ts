import { isNull } from '@/utils/typeGuards';
import type { RefObject } from 'react';
import { useEffect } from 'react';

export const useMutationObserverEffect = <T extends RefObject<HTMLElement>>(
  targetRef: T,
  callback: MutationCallback,
  options?: MutationObserverInit,
) => {
  useEffect(() => {
    if (isNull(targetRef.current)) {
      return;
    }

    const mutationObserver = new MutationObserver(callback);

    mutationObserver.observe(targetRef.current, options);

    return () => {
      mutationObserver.disconnect();
    };
  }, [callback, options, targetRef]);
};
