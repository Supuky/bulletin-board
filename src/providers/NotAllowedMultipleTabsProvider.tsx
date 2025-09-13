import { useBroadcastChannel } from '@/hooks/webApi/broadcastChannel/useBroadcastChannel';
import { useRouter } from 'next/router';
import { useEffect, type ReactNode } from 'react';

type Props = {
  channelName: string;
  children: ReactNode;
};

/**
 * NotAllowedMultipleTabsProvider
 * @param param - Props for the provider
 * @returns JSX.Element
 */
export function NotAllowedMultipleTabsProvider({
  channelName,
  children,
}: Props) {
  const { pushMessage, broadcastMessage } =
    useBroadcastChannel<boolean>(channelName);
  const router = useRouter();

  useEffect(() => {
    pushMessage(true);
  }, [pushMessage]);

  const handleOnReloadClick = () => {
    router.reload();
  };

  if (broadcastMessage.message) {
    return (
      <>
        <h1>別タブで開いています</h1>
        <button onClick={handleOnReloadClick}>リロード</button>
      </>
    );
  }

  return children;
}
