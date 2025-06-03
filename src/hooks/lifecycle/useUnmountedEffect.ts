import { useEffect } from 'react';

export const useUnmountedEffect = (callback: () => void) => {
  useEffect(() => {
    return () => {
      callback();
    };
  }, [callback]);
};
