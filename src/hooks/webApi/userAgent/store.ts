import { BROWSER, PLATFORM } from '@/enums/userAgent';
import type { ReactListener } from '@/utils/react';
import { isUndefined } from '@/utils/typeGuards';

type UserAgentStore = {
  current:
    | {
        isReady: false;
      }
    | {
        browser: string;
        browserVersion: string;
        isReady: true;
        mobile: boolean;
        model: string;
        platform: string;
        platformVersion: string;
      };
};

const matchPlatform = (userAgent: string) => {
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
  switch (true) {
    case /iphone/i.test(userAgent):
      return {
        platform: PLATFORM.IPHONE_IOS,
        platformVersion:
          userAgent.match(/OS ([0-9_]+)/)?.[1].replace(/_/g, '.') ?? 'Unknown',
      };
    case /Macintosh/i.test(userAgent) && 'ontouchend' in document:
      return {
        platform: PLATFORM.IPAD_IOS,
        platformVersion:
          userAgent.match(/Mac OS X ([0-9_]+)/)?.[1].replace(/_/g, '.') ??
          'Unknown',
      };
    case /ipad/i.test(userAgent):
      return {
        platform: PLATFORM.IPAD_IOS,
        platformVersion:
          userAgent.match(/OS ([0-9_]+)/)?.[1].replace(/_/g, '.') ?? 'Unknown',
      };
    case /android/i.test(userAgent):
      return {
        platform: PLATFORM.ANDROID,
        platformVersion: userAgent.match(/Android ([0-9.]+)/)?.[1] ?? 'Unknown',
      };
    case /Macintosh/i.test(userAgent):
      return {
        platform: PLATFORM.MAC_OS,
        platformVersion:
          userAgent.match(/Mac OS X ([0-9_]+)/)?.[1].replace(/_/g, '.') ??
          'Unknown',
      };
    case /Linux/i.test(userAgent):
      return {
        platform: PLATFORM.LINUX,
        platformVersion: 'Unknown',
      };
    default:
      return {
        platform: PLATFORM.UNKNOWN,
        platformVersion: 'Unknown',
      };
  }
};

const matchBrowser = (userAgent: string) => {
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
  switch (true) {
    case /Edge/i.test(userAgent):
      return {
        browser: BROWSER.EDGE,
        browserVersion: userAgent.match(/Edge\/([0-9.]+)/)?.[1] ?? 'Unknown',
      };
    case /Firefox/i.test(userAgent):
      return {
        browser: BROWSER.FIREFOX,
        browserVersion: userAgent.match(/Firefox\/([0-9.]+)/)?.[1] ?? 'Unknown',
      };
    case /Chrome/i.test(userAgent):
      return {
        browser: BROWSER.CHROME,
        browserVersion: userAgent.match(/Chrome\/([0-9.]+)/)?.[1] ?? 'Unknown',
      };
    case /CriOS/i.test(userAgent):
      return {
        browser: BROWSER.CHROME,
        browserVersion: userAgent.match(/CriOS\/([0-9.]+)/)?.[1] ?? 'Unknown',
      };
    case /Opera/i.test(userAgent):
      return {
        browser: BROWSER.OPERA,
        browserVersion: userAgent.match(/OPR\/([0-9.]+)/)?.[1] ?? 'Unknown',
      };
    case /Safari/i.test(userAgent):
      return {
        browser: BROWSER.SAFARI,
        browserVersion: userAgent.match(/Version\/([0-9.]+)/)?.[1] ?? 'Unknown',
      };
    default:
      return {
        browser: BROWSER.UNKNOWN,
        browserVersion: 'Unknown',
      };
  }
};

const getUserAgent = () => {
  const { userAgent } = navigator;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);

  return {
    ...matchBrowser(userAgent),
    mobile: isMobile,
    model: 'Unknown',
    ...matchPlatform(userAgent),
  };
};

const generateUserAgent = async () => {
  const { userAgentData } = navigator;
  if (isUndefined(userAgentData)) {
    return getUserAgent();
  }

  try {
    const highEntropyValues = await userAgentData.getHighEntropyValues([
      'platformVersion',
      'model',
    ]);

    return {
      browser: userAgentData.brands[2].brand,
      browserVersion: userAgentData.brands[2].version,
      mobile: userAgentData.mobile,
      platform: userAgentData.platform,
      platformVersion: highEntropyValues.platformVersion ?? 'Unknown',
      // reference: https://developer.mozilla.org/ja/docs/Web/API/NavigatorUAData/getHighEntropyValues#model
      model: highEntropyValues.model || 'Unknown',
    };
  } catch {
    // reference: https://developer.mozilla.org/ja/docs/Web/API/NavigatorUAData/getHighEntropyValues#notallowederror
    return getUserAgent();
  }
};

const store: UserAgentStore = {
  current: { isReady: false },
};

const setStore = async (listener: ReactListener) => {
  const userAgent = await generateUserAgent();
  store.current = {
    isReady: true,
    ...userAgent,
  };
  listener();
};

export const createUserAgentStore = () => {
  const subscribeUserAgent = (listener: ReactListener) => {
    if (!store.current.isReady) {
      void setStore(listener);
    }
    return () => {
      store.current = { isReady: false };
    };
  };

  const getUserAgentSnapshot = () => store.current;

  const getUserAgentServerSnapshot = () => store.current;

  return {
    getUserAgentSnapshot,
    getUserAgentServerSnapshot,
    subscribeUserAgent,
  };
};
