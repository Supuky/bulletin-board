import { isNull } from '@/utils/typeGuards';
import type { RefObject } from 'react';
import { useEffect } from 'react';

/**
 * カスタムフックで、ターゲット要素の変更を監視します。
 * @param targetRef - 監視対象となる要素へのRef。
 * @param callback - 変更が発生したときに呼び出されるコールバック関数。
 * @param options - MutationObserverのオプション。
 */
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
