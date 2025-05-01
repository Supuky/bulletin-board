import generateHeaders from './config/webpack/headers.webpack.mjs';
import sassOption from './config/webpack/sass.webpack.mjs';

console.log('環境:', process.env.APP_ENV);
const isProduction =
  process.env.APP_ENV === 'prd' || process.env.APP_ENV === 'stg';
// const isLocal =
//   process.env.APP_ENV === 'loc' || process.env.APP_ENV === 'loc-ci';

const { pageHeaders } = generateHeaders(process.env);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  sassOption,
  compiler: {
    removeConsole:
      isProduction ?
        {
          exclude: ['error', 'warn', 'info'],
        }
      : false,
  },
  experimental: {
    instrumentationHook: true,
    swcPlugins:
      isProduction ?
        [
          [
            'swc-plugin-unassert',
            {
              variables: ['assert', 'invariant', 'nassert', 'uassert'],
              modules: [
                'assert',
                'node:assert',
                'invariant',
                'nanoassert',
                'uvu/assert',
              ],
            },
          ],
        ]
      : [],
  },
  images: {
    unoptimized: true,
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '', aws s3
    //     pathname: '/statics/**',
    //   },
    // ],
  },
  async headers() {
    return [
      {
        source: '/((?!api).*)',
        headers: pageHeaders,
      },
    ];
  },
};

export default nextConfig;
