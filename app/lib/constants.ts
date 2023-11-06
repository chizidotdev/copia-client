export const BASE_URL =
  typeof window !== undefined
    ? window.ENV.PUBLIC_SITE_URL
    : process.env.PUBLIC_SITE_URL || '';
