import { NextFontStyle } from '@/assets/fonts/NextFontStyle';
import '@/assets/styles/globals.scss';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { SWRConfig } from 'swr';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, props: P) => ReactNode;
};

type AppPropsWithLayout<P = object> = AppProps<P> & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // const getLayout = Component.getLayout ?? ((page) => {
  //   return <SiteLayout>{page}</SiteLayout>
  // });
  return (
    <SWRConfig>
      <NextFontStyle />
    </SWRConfig>
  );
}
