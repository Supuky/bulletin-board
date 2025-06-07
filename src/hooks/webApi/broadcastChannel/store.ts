import { isUndefined } from '@/utils/typeGuards';

/**
 * BroadcastChannel を利用したストアを作成するためのユーティリティ。
 * 指定したチャンネル名でメッセージの送受信ができる。
 */

type BroadcastChannelStore<T> = {
  current: {
    message: T | undefined;
  };
};

const broadcastChannels = new Map<string, BroadcastChannel>();

const getOrCreateBroadcastChannel = (channel: string) => {
  const existingChannel = broadcastChannels.get(channel);

  if (!isUndefined(existingChannel)) {
    return existingChannel;
  }

  const newChannel = new BroadcastChannel(channel);

  broadcastChannels.set(channel, newChannel);

  return newChannel;
};

export const createBroadcastChannelStore = <T>(channel: string) => {
  let broadcastChannel: BroadcastChannel | undefined = undefined;

  const state: BroadcastChannelStore<T> = {
    current: {
      message: undefined,
    },
  };

  const subscribeBroadcastChannel = (reactNotify: () => void) => {
    broadcastChannel = getOrCreateBroadcastChannel(channel);

    broadcastChannel.onmessage = (event: MessageEvent<T>) => {
      state.current = {
        ...state.current,
        message: event.data,
      };
      reactNotify();
    };

    return () => {
      broadcastChannel?.close();
      broadcastChannels.delete(channel);
      broadcastChannel = undefined;
    };
  };

  const getBroadcastChannelSnapshot = () => {
    return state.current;
  };

  const getBroadcastChannelServerSnapshot = () => {
    return state.current;
  };

  const pushMessage = (message: T) => {
    broadcastChannel?.postMessage(message);
  };

  return {
    subscribeBroadcastChannel,
    getBroadcastChannelSnapshot,
    getBroadcastChannelServerSnapshot,
    pushMessage,
  };
};
