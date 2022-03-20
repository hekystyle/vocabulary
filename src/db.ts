import Dexie, { Table } from 'dexie';
import { Term } from 'types/Term';

class AppDb extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  terms!: Table<Term, number>;

  constructor() {
    super('Vocabulary');
    this.version(1).stores({
      terms: '++id', // Primary key and indexed props
    });
    this.terms.hook('creating', (_, term) => {
      term.createdAt = new Date();
    });
  }
}

export const db = new AppDb();
