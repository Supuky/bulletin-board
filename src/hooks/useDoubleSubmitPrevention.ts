import { useCallback, useRef } from 'react';

export const useDoubleSubmitPrevention = <
  T extends (...args: any[]) => Promise<any>,
>(
  callback: T,
) => {
  const isBlocked = useRef<boolean>(false);

  const preventedCallback = useCallback(
    async (...args: Parameters<T>) => {
      if (isBlocked.current) return;

      isBlocked.current = true;
      await callback(...args);
      isBlocked.current = false;
    },
    [callback],
  );

  return preventedCallback;
};
