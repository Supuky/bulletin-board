import { createImeStore } from '@/hooks/webApi/ime/store';
import { useSyncExternalStore } from 'react';

const { subscribeIme, getImeSnapshot, getImeServerSnapshot } = createImeStore();

export const useIme = () => {
  return useSyncExternalStore(
    subscribeIme,
    getImeSnapshot,
    getImeServerSnapshot,
  );
};
