import { isUndefined } from '@/utils/typeGuards';
import { useRouter } from 'next/router';
import { useEffect, type ReactNode } from 'react';

type TransitionOptions = {
  locale?: string | false;
  scroll?: boolean;
  shallow?: boolean;
  unstable_skipClientCache?: boolean;
};

type NextHistoryState = {
  as: string;
  options: TransitionOptions;
  url: string;
};

type Props = {
  children: ReactNode;
};

/**
 * BrowserBackConfirmProvider component
 * @param param - Props for the provider
 * @returns JSX.Element
 */
export function BrowserBackConfirmProvider({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    let backwardTargetUrl: string | undefined = undefined;

    const handleOnBeforePopState = ({ url }: NextHistoryState) => {
      if (isUndefined(backwardTargetUrl)) {
        backwardTargetUrl = url;
      }

      if (window.confirm('編集を破棄してもよろしいですか？')) {
        void router.push(backwardTargetUrl ?? url);
      }

      void router.push(router.asPath, undefined, {
        shallow: true,
      });

      return false;
    };

    router.beforePopState(handleOnBeforePopState);

    return () => {
      router.beforePopState(() => true);
    };
  }, [router]);

  return children;
}
