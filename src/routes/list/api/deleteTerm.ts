import { db } from 'db';

export const deleteTerm = async (id: number): Promise<void> => {
  await db.terms.delete(id);
};
