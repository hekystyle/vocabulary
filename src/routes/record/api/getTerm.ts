import { AppDb } from 'db';
import { Term } from 'types/Term';

export const getTerm =
  (db: AppDb) =>
  async (id: Term['id']): Promise<Term | undefined> =>
    id !== undefined ? db.terms.get(id) : undefined;
