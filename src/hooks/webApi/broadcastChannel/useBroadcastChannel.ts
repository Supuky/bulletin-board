import { createBroadcastChannelStore } from '@/hooks/webApi/broadcastChannel/store';
import { useState, useSyncExternalStore } from 'react';

/**
 * BroadcastChannel を利用してメッセージを送受信するためのカスタムフック。
 * @param channel チャンネル名
 * @returns メッセージと送信関数を含むオブジェクト
 */
export const useBroadcastChannel = <T>(channel: string) => {
  const [
    {
      subscribeBroadcastChannel,
      getBroadcastChannelSnapshot,
      getBroadcastChannelServerSnapshot,
      pushMessage,
    },
  ] = useState(() => createBroadcastChannelStore<T>(channel));

  const broadcastMessage = useSyncExternalStore(
    subscribeBroadcastChannel,
    getBroadcastChannelSnapshot,
    getBroadcastChannelServerSnapshot,
  );

  return {
    broadcastMessage,
    pushMessage,
  };
};
