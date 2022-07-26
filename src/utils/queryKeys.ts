import { Term } from 'types/Term';

export const QUERY_KEYS = {
  terms: {
    key: 'terms',
    filter: (filter: Record<string, unknown>) => [QUERY_KEYS.terms.key, filter] as const,
    id: (id: Term['id']) => [QUERY_KEYS.terms.key, id] as const,
  },
  dictionary: {
    key: 'dictionary',
    word: (word: string) => [...QUERY_KEYS.dictionary.key, word] as const,
  },
};
