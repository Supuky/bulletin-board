import { SITE_NAME } from '@/configs/word';
import Head from 'next/head';

export function CommonHead() {
  return (
    <Head>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, viewport-fit=cover'
      />
      <meta
        property='og:site_name'
        content={SITE_NAME}
      />
      <meta
        property='og:locale'
        content='ja_JP'
      />
      <meta
        property='og:type'
        content='website'
      />
      <meta
        property='og:url'
        content={process.env.NEXT_PUBLIC_HOST}
      />
      <meta
        name='twitter:card'
        content='summary_large_image'
      />
      <meta
        name='twitter:site'
        content={process.env.NEXT_PUBLIC_HOST}
      />
      <link
        rel='icon'
        href='/favicon.ico'
      />
    </Head>
  );
}
