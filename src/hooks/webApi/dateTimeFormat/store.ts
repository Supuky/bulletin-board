import type { ReactListener } from '@/utils/react';

/**
 * 日本の日時フォーマットを提供するストアを作成するためのユーティリティ。
 * このストアは、`Intl.DateTimeFormat` を使用して日本の日時をフォーマットします。
 * フォーマットは、年、月、日、時間、分、秒、および曜日を含みます。
 */

const jpDateTimeFormat = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  weekday: 'short',
  timeZone: 'Asia/Tokyo',
});

export const creatJpDateTimeFormatStore = () => {
  const listener = new Set<ReactListener>();

  const getJpDateTimeFormatSnapshot = () => {
    return jpDateTimeFormat;
  };

  const getJpDateTimeFormatServerSnapshot = () => {
    return jpDateTimeFormat;
  };

  const subscribeJpDateTimeFormat = (reactNotify: ReactListener) => {
    listener.add(reactNotify);
    return () => {
      listener.delete(reactNotify);
    };
  };

  return {
    subscribeJpDateTimeFormat,
    getJpDateTimeFormatSnapshot,
    getJpDateTimeFormatServerSnapshot,
  };
};
