import { createBroadcastChannelStore } from '@/hooks/webApi/broadcastChannel/store';
import { useState, useSyncExternalStore } from 'react';

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
