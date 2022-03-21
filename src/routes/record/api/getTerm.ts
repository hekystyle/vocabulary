import { db } from 'db';
import { Term } from 'types/Term';

export const getTerm = async (id: Term['id']): Promise<Term | undefined> =>
  id !== undefined ? db.terms.get(id) : undefined;
