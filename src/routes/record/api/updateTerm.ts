import { db } from 'db';
import { Term } from 'types/Term';

export const updateTerm = async (term: Term): Promise<undefined | Term> => {
  const key = await db.terms.put(term);
  return await db.terms.get(key);
};
