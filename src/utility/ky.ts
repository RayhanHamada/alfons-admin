import ogKy from 'ky';
import { baseURL } from './constant';

export const ky = ogKy.extend({
  prefixUrl: baseURL,
});
