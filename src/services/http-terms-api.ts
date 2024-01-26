import qs from 'qs';
import { z } from 'zod';
import { Term } from '@/types/Term';
import { BASE_API_URL } from './constants';

export const termSchema = z.object({
  _id: z.string(),
  word: z.string(),
  partOfSpeech: z.string(),
  translation: z.string(),
  definition: z.string(),
  answersCount: z.number(),
  correctAnswersCount: z.number(),
  tags: z.array(z.string()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ServerTerm = z.infer<typeof termSchema>;

export const findTermsResultSchema = z.object({
  data: z.array(termSchema),
  meta: z.object({
    totalItems: z.number(),
    totalPages: z.number(),
  }),
});

export type FindTermsResult = z.infer<typeof findTermsResultSchema>;

type Operator =
  | '$eq'
  | '$not'
  | '$null'
  | '$in'
  | '$gt'
  | '$gte'
  | '$lt'
  | '$lte'
  | '$btw'
  | '$ilike'
  | '$sw'
  | '$contains';

export interface FindTermsArgs {
  page: number;
  sortBy: Array<`${keyof ServerTerm}:${'ASC' | 'DESC'}`>;
  filter: {
    [K in keyof ServerTerm]?: ServerTerm[K] | `${Operator}:${Omit<ServerTerm, 'tags'>[keyof Omit<ServerTerm, 'tags'>]}`;
  };
}

export class HttpTermsApi {
  constructor(protected readonly baseOrigin: string = BASE_API_URL) {}

  async find({ filter, page, sortBy }: FindTermsArgs, signal: AbortSignal | undefined) {
    const url = new URL('/api/terms', this.baseOrigin);
    url.search = qs.stringify(
      {
        filter,
        page,
        sortBy,
      },
      {
        arrayFormat: 'comma',
        allowDots: true,
        encodeValuesOnly: true,
      },
    );

    const response = await fetch(url, { signal });
    const data: unknown = await response.json();

    return findTermsResultSchema.parse(data);
  }

  async create(term: Omit<Term, 'id'>, signal: AbortSignal | undefined) {
    const response = await fetch(new URL('/api/terms', this.baseOrigin), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(term),
      signal,
    });

    const data: unknown = await response.json();

    return termSchema.parse(data);
  }

  async patch(termId: string, term: Partial<Term>, signal: AbortSignal | undefined) {
    const response = await fetch(new URL(`/api/terms/${termId}`, this.baseOrigin), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(term),
      signal,
    });

    const data: unknown = await response.json();

    return termSchema.parse(data);
  }
}
