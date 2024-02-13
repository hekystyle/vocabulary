import qs from 'qs';
import { z } from 'zod';
import { Sorting } from '@/filter';
import { StrictOmit } from '@/types/StrictOmit';
import { Term } from '@/types/Term';
import { Pagination } from '@/utils/computeSkip';
import { BASE_API_URL } from './constants';
import { TermsRepository } from './terms';

export const termSchema = z
  .object({
    _id: z.string(),
    word: z.string(),
    partOfSpeech: z.string(),
    translation: z.string(),
    definition: z.string(),
    answersCount: z.number(),
    correctAnswersCount: z.number(),
    tags: z.array(z.string()),
    createdAt: z
      .string()
      .datetime()
      .transform(value => new Date(value)),
    updatedAt: z
      .string()
      .datetime()
      .transform(value => new Date(value)),
  })
  .transform(term => ({
    ...term,
    id: term._id,
  }));

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
  limit: number;
  sortBy: Array<`${keyof ServerTerm}:${'ASC' | 'DESC'}`>;
  filter: {
    [K in keyof ServerTerm]?:
      | ServerTerm[K]
      | {
          [Op in Operator]?: ServerTerm[K];
        };
  };
}

export class HttpTermsApi implements TermsRepository {
  constructor(protected readonly baseOrigin: string = BASE_API_URL) {}

  async get(filter: Pagination & Sorting, signal: AbortSignal | undefined) {
    const url = new URL('/api/terms', this.baseOrigin);
    url.search = qs.stringify(
      {
        filter: {},
        page: filter.page,
        limit: filter.pageSize,
        // @ts-expect-error TODO: try to solve this
        sortBy:
          // formatting
          `${filter.sortField}:${filter.sortOrder === 'ascend' ? 'ASC' : 'DESC'}`,
      } satisfies FindTermsArgs,
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

  async getById(id: number, signal: AbortSignal | undefined): Promise<Term | undefined> {
    const response = await fetch(new URL(`/api/terms/${id}`, this.baseOrigin), { signal });

    if (response.status === 404) {
      return undefined;
    }

    const data: unknown = await response.json();

    return termSchema.parse(data);
  }

  async create(dto: StrictOmit<ServerTerm, '_id' | 'createdAt' | 'updatedAt'>) {
    const response = await fetch(new URL('/api/terms', this.baseOrigin), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });

    const data: unknown = await response.json();

    return termSchema.parse(data);
  }

  async update(term: Term): Promise<Term | undefined> {
    return await this.patch(term.id?.toString() ?? '', term, undefined);
  }

  async patch(termId: ServerTerm['_id'], term: Partial<Term>, signal: AbortSignal | undefined) {
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

  async delete(id: number): Promise<void> {
    await fetch(new URL(`/api/terms/${id}`, this.baseOrigin), {
      method: 'DELETE',
    });
  }

  getWords(search: string, signal: AbortSignal | undefined): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  async getUniquePartsOfSpeech(signal: AbortSignal | undefined): Promise<string[]> {
    return await this.distinct('partOfSpeech', undefined, signal);
  }

  async getUniqueTags(search: string, signal: AbortSignal | undefined): Promise<string[]> {
    return await this.distinct('tags', search, signal);
  }

  async distinct(
    field: keyof ServerTerm,
    search: string | undefined,
    signal: AbortSignal | undefined,
  ): Promise<string[]> {
    const url = new URL('/api/terms/distinct', this.baseOrigin);
    url.search = qs.stringify({ field, search }, { arrayFormat: 'comma', encodeValuesOnly: true });

    const response = await fetch(url, { signal });
    const data: unknown = await response.json();

    return z.array(z.string()).parse(data);
  }
}
