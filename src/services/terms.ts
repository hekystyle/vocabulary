// eslint-disable-next-line max-classes-per-file
import { Key } from 'react';
import { Sortable } from '@/filter';
import { AppDb } from '@/services/db';
import { StrictOmit } from '@/types/StrictOmit';
import { Term } from '@/types/Term';
import { computeSkip, Pagination } from '@/utils/computeSkip';

export interface FindManyResult<T> {
  data: T[];
  meta: {
    totalItems: number;
  };
}

export type UpdateTermDto = StrictOmit<Term, 'id' | 'createdAt'>;
export interface UpdateTermArgs {
  id: Key;
  dto: UpdateTermDto;
}

export interface TermsRepository {
  get(filter: Pagination & Sortable, signal: AbortSignal | undefined): Promise<FindManyResult<Term>>;
  getById(id: Key, signal: AbortSignal | undefined): Promise<Term | undefined>;
  create(term: StrictOmit<Term, 'id' | 'createdAt'>): Promise<Term | undefined>;
  update(args: UpdateTermArgs): Promise<Term | undefined>;
  delete(id: Exclude<Term['id'], undefined>): Promise<void>;

  getWords(search: string, signal: AbortSignal | undefined): Promise<string[]>;
  getUniquePartsOfSpeech(signal: AbortSignal | undefined): Promise<string[]>;
  getUniqueTags(search: string, signal: AbortSignal | undefined): Promise<string[]>;
}

export class IndexedDbTermsRepository implements TermsRepository {
  constructor(private db: AppDb) {}

  public async get(filter: Pagination & Sortable): Promise<FindManyResult<Term>> {
    const skip = computeSkip(filter);

    const sorter = filter.sortBy[0];

    const query = this.db.terms.orderBy(sorter?.field ?? ('createdAt' satisfies keyof Term));

    if (sorter?.order === 'descend') {
      query.reverse();
    }

    const [data, totalItems] = await Promise.all([
      query.offset(skip).limit(filter.pageSize).toArray(),
      this.db.terms.count(),
    ]);

    return { data, meta: { totalItems } };
  }

  public async getById(id: Exclude<Term['id'], undefined>): Promise<Term | undefined> {
    return await this.db.terms.get(id);
  }

  public async create(term: Omit<Term, 'id'>): Promise<Term | undefined> {
    const key = await this.db.terms.add(
      // @ts-expect-error fixed by Dexie v4
      term,
    );
    return await this.db.terms.get(key);
  }

  public async update({ id, dto }: UpdateTermArgs): Promise<Term | undefined> {
    const key = await this.db.terms.put({ id, ...dto });
    return await this.db.terms.get(key);
  }

  public async delete(id: Exclude<Term['id'], undefined>): Promise<void> {
    await this.db.terms.delete(id);
  }

  public async getWords(search: string): Promise<string[]> {
    const set = new Set<string>();
    await this.db.terms
      .where('word')
      .startsWithIgnoreCase(search)
      .each(term => {
        set.add(term.word);
      });
    return Array.from(set);
  }

  public async getUniquePartsOfSpeech(): Promise<string[]> {
    const set = new Set<string>();
    await this.db.terms.each(term => set.add(term.partOfSpeech));
    return Array.from(set);
  }

  public async getUniqueTags(search: string): Promise<string[]> {
    const lowercasedSearch = search.toLowerCase();
    const set = new Set<string>();
    await this.db.terms.each(term =>
      term.tags.forEach(tag => {
        if (tag.toLowerCase().includes(lowercasedSearch)) {
          set.add(tag);
        }
      }),
    );
    return Array.from(set);
  }
}

export class DelayedTermsRepository implements TermsRepository {
  constructor(
    private repo: TermsRepository,
    public readonly delayMs: number,
  ) {}

  private async wait() {
    return await new Promise(resolve => {
      setTimeout(resolve, this.delayMs);
    });
  }

  async get(filter: Pagination & Sortable, signal: AbortSignal | undefined): Promise<FindManyResult<Term>> {
    await this.wait();
    return await this.repo.get(filter, signal);
  }

  async getById(id: Exclude<Term['id'], undefined>, signal: AbortSignal | undefined): Promise<Term | undefined> {
    await this.wait();
    return await this.repo.getById(id, signal);
  }

  async create(term: Omit<Term, 'id'>): Promise<Term | undefined> {
    await this.wait();
    return await this.repo.create(term);
  }

  async update(args: UpdateTermArgs): Promise<Term | undefined> {
    await this.wait();
    return await this.repo.update(args);
  }

  async delete(id: Exclude<Term['id'], undefined>): Promise<void> {
    await this.wait();
    return await this.repo.delete(id);
  }

  async getWords(search: string, signal: AbortSignal | undefined): Promise<string[]> {
    await this.wait();
    return await this.repo.getWords(search, signal);
  }

  async getUniquePartsOfSpeech(signal: AbortSignal | undefined): Promise<string[]> {
    await this.wait();
    return await this.repo.getUniquePartsOfSpeech(signal);
  }

  async getUniqueTags(search: string, signal: AbortSignal | undefined): Promise<string[]> {
    await this.wait();
    return await this.repo.getUniqueTags(search, signal);
  }
}
