import ogKy from 'ky';

export const ky = ogKy.extend({
  prefixUrl: process.env.NEXT_PUBLIC_BASE_URL,
});
