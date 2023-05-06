import Dexie, { type Table } from 'dexie';
import type { Term } from 'types/Term';

type Writable<T> = { -readonly [P in keyof T]: T[P] };

export class AppDb extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  terms!: Table<Term, number>;

  constructor(databaseName: string) {
    super(databaseName);
    this.version(1).stores({
      terms: '++id', // [primary key, ...indexed props]
    });
    this.version(2).stores({
      terms: '++id, createdAt',
    });
    this.version(3).stores({
      terms: '++id, word, createdAt',
    });
    this.version(4).stores({
      terms: '++id, word, answersCount, correctAnswersCount, createdAt',
    });
    this.version(5)
      .stores({
        terms: '++id, word, answersCount, correctAnswersCount, createdAt, *tags',
      })
      .upgrade(transaction =>
        transaction
          .table<Term>('terms')
          .toCollection()
          .modify(term => {
            // eslint-disable-next-line no-param-reassign
            term.tags = [];
          }),
      );
    this.terms.hook('creating', (_, term: Writable<Term>) => {
      // eslint-disable-next-line no-param-reassign
      term.createdAt = new Date();
    });
  }
}
