import { isUndefined } from '@/utils/typeGuards';
import { useRef } from 'react';

export const useSleep = (delay: number) => {
  const timer = useRef<NodeJS.Timeout | undefined>(undefined);

  const clearSleep = () => {
    if (isUndefined(timer.current)) return;
    clearTimeout(timer.current);
    timer.current = undefined;
  };

  const startSleep = async () => {
    clearSleep();
    await new Promise((resolve) => {
      timer.current = setTimeout(resolve, delay);
    });
  };

  const getIsSleeping = () => !isUndefined(timer.current);

  return {
    clearSleep,
    startSleep,
    getIsSleeping,
  };
};
