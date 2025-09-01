import { isNull } from '@/utils/typeGuards';
import type { RefObject } from 'react';
import { useEffect } from 'react';

export const useOnFocusOutside = <
  T extends RefObject<HTMLElement | null>,
  U extends (event: Event) => unknown = (event: Event) => void,
>(
  ref: T,
  isOpen: boolean,
  callback: U,
) => {
  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: Event) => {
      e.stopPropagation();

      const isIgnore =
        isNull(ref.current) || ref.current.contains(e.target as Node);
      if (isIgnore) return;
      callback(e);
    };

    document.addEventListener('pointerdown', onClick, true);
    document.addEventListener('focus', onClick, true);

    return () => {
      document.removeEventListener('pointerdown', onClick, true);
      document.removeEventListener('focus', onClick, true);
    };
  }, [ref, isOpen, callback]);
};
