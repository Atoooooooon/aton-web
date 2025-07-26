import { SWRConfig } from 'swr';
import axiosInstance from './axios';

export const swrConfig = {
  fetcher: (url: string) => axiosInstance.get(url).then(res => res.data),
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  revalidateIfStale: false,
  shouldRetryOnError: false,
};

export const SwrProvider = SWRConfig; 