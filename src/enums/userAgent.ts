import type { Enum } from '@/types/enum';

export const BROWSER = {
  EDGE: 'Edge',
  FIREFOX: 'Firefox',
  CHROME: 'Google Chrome', // user agentに表示される名称
  OPERA: 'Opera',
  SAFARI: 'Safari',
  UNKNOWN: 'Unknown',
} as const;

export type Browser = Enum<typeof BROWSER>;

export const PLATFORM = {
  IPHONE_IOS: 'iPhone iOS',
  IPAD_IOS: 'iPad iOS',
  ANDROID: 'Android',
  WINDOWS: 'Windows',
  MAC_OS: 'macOS',
  LINUX: 'Linux',
  UNKNOWN: 'Unknown',
} as const;

export type Platform = Enum<typeof PLATFORM>;
