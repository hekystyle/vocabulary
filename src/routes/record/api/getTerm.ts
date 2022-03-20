import { db } from 'db';
import { Term } from 'types/Term';

export const getTerm = async (id?: number): Promise<Term | undefined> =>
  id !== undefined ? db.terms.get(id) : undefined;
