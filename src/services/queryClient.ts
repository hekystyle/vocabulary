import { QueryCache, QueryClient } from '@tanstack/react-query';

export const QUERY_CLIENT = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: error => {
      console.error('QueryCache error:', error);
    },
  }),
});
