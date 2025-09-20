import { useJpDateTimeFormat } from '@/hooks/webApi/dateTimeFormat/useJpDateTimeFormat';
import { ServerTimeContext } from '@/services/serverTime/providers/ServerTimeProvider';
import { useContext } from 'react';

export const useServerTime = () => {
  const { serverTime: serverTimeOnServer } = useContext(ServerTimeContext);

  const { formatDate } = useJpDateTimeFormat();

  return formatDate(serverTimeOnServer);
};
