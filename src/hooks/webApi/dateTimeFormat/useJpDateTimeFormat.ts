import { creatJpDateTimeFormatStore } from '@/hooks/webApi/dateTimeFormat/store';
import { useSyncExternalStore } from 'react';

/**
 * 日本の日時フォーマットを提供するカスタムフック。
 */

const {
  subscribeJpDateTimeFormat,
  getJpDateTimeFormatSnapshot,
  getJpDateTimeFormatServerSnapshot,
} = creatJpDateTimeFormatStore();

export const useJpDateTimeFormat = () => {
  const jpDateTimeFormat = useSyncExternalStore(
    subscribeJpDateTimeFormat,
    getJpDateTimeFormatSnapshot,
    getJpDateTimeFormatServerSnapshot,
  );

  const formatDate = (unixTime?: Date | number) => {
    const [
      { value: year },
      ,
      { value: month },
      ,
      { value: day },
      ,
      { value: hour },
      ,
      { value: minute },
      ,
      { value: second },
      ,
      { value: weekday },
    ] = jpDateTimeFormat.formatToParts(unixTime);

    return {
      year,
      month,
      day,
      hour,
      minute,
      second,
      weekday,
    };
  };

  const formatDateTimeToView = (unixTime?: Date | number) => {
    const { year, month, day } = formatDate(unixTime);
    // TODO: 表示用の関数を別途作成
    return `${year}/${month}/${day}`;
  };

  return { formatDate, formatDateTimeToView };
};
