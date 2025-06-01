const generateHeaders = (env) => {
  const isNotLocal = env.APP_ENV !== 'loc';

  const cspHeader = `
  frame-src 'self' https://docs.google.com/ https://www.youtube.com/ https://accounts.google.com;
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com/;
  style-src 'self' 'unsafe-inline' https://www.googletagmanager.com/ https://fonts.googleapis.com/;
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  connect-src 'self' https://www.google-analytics.com/;
  upgrade-insecure-requests;
  default-src 'self';
  `;

  const pageHeaders = [
    {
      key: 'X-Frame-Options',
      value: 'DENY',
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    {
      key: 'Referrer-Policy',
      value: 'no-referrer',
    },
    {
      key: 'Feature-Policy',
      value: "geolocation 'self'; microphone 'self'; camera 'self'",
    },
    {
      key: 'Permissions-Policy',
      value:
        'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
    },
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on',
    },
    {
      key: 'Cross-Origin-Opener-Policy',
      value: 'same-origin',
    },
    {
      key: 'Cross-Origin-Resource-Policy',
      value: 'same-origin',
    },
  ];

  if (isNotLocal) {
    pageHeaders.push(
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      {
        key: 'Content-Security-Policy',
        value: cspHeader.replace(/\n/g, ''),
      },
    );
  }

  return {
    pageHeaders,
  };
};

export default generateHeaders;
