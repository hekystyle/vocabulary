import { QueryClient } from '@tanstack/react-query';

export const QUERY_CLIENT = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError: error => {
        console.error(error);
      },
    },
    mutations: {
      onError: error => {
        console.error(error);
      },
    },
  },
});
