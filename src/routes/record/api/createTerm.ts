import { AppDb } from 'services/db';
import { Term } from 'types/Term';

export const createTerm =
  (db: AppDb) =>
  async (term: Term): Promise<undefined | Term> => {
    const key = await db.terms.add(term);
    return await db.terms.get(key);
  };
