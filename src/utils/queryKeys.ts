import { Key } from 'react';

export const QUERY_KEYS = {
  terms: {
    all: () => ['terms'] as const,
    filter: (filter: Record<string, unknown>) => [...QUERY_KEYS.terms.all(), filter] as const,
    id: (id: Key) => [...QUERY_KEYS.terms.all(), id] as const,
    tags: {
      all: () => [...QUERY_KEYS.terms.all(), 'tags'] as const,
      filter: (filter: { search: string }) => [...QUERY_KEYS.terms.tags.all(), filter] as const,
    },
  },
  dictionary: {
    all: () => ['dictionary'] as const,
    word: (word: string) => [...QUERY_KEYS.dictionary.all(), word] as const,
  },
  auth: {
    all: () => ['auth'] as const,
    profile: () => [...QUERY_KEYS.auth.all(), 'profile'] as const,
  },
};
