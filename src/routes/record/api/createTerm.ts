import { db } from 'db';
import { Term } from 'types/Term';

export const createTerm = async (term: Term): Promise<undefined | Term> => {
  const key = await db.terms.add(term);
  return await db.terms.get(key);
};
