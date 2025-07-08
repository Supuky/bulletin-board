import { createImeStore } from '@/hooks/webApi/ime/store';
import { useSyncExternalStore } from 'react';

const { subscribeIme, getImeSnapshot, getImeServerSnapshot } = createImeStore();

/**
 * IMEの状態を監視するカスタムフック。
 *
 * @returns IMEの状態を表すオブジェクト。
 */
export const useIme = () => {
  return useSyncExternalStore(
    subscribeIme,
    getImeSnapshot,
    getImeServerSnapshot,
  );
};
