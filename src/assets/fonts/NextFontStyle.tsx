import { Inter, Noto_Sans_JP, Noto_Sans_Mono } from 'next/font/google';

const inter = Inter({
  weight: ['700'],
  style: 'normal',
  display: 'block',
  subsets: ['latin'],
  fallback: [],
});

const notoSansJp = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  style: 'normal',
  display: 'block',
  subsets: ['latin'],
  fallback: [],
});

const notoSansMono = Noto_Sans_Mono({
  weight: ['400', '500', '700'],
  style: 'normal',
  display: 'block',
  subsets: ['latin'],
  fallback: [],
});

// ref:
// https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
// https://github.com/vercel/next.js/issues/44840#issuecomment-1385718414
export function NextFontStyle() {
  return (
    <style
      jsx
      global
    >
      {`
        :root {
          --font-inter: ${inter.style.fontFamily};
          --font-noto-sans-jp: ${notoSansJp.style.fontFamily};
          --font-noto-sans-mono: ${notoSansMono.style.fontFamily};
        }
        html {
          font-family: var(--font-noto-sans-jp), sans-serif;
        }
      `}
    </style>
  );
}
