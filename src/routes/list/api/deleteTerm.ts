import { AppDb } from 'db';

export const deleteTerm =
  (db: AppDb) =>
  async (id: number): Promise<void> => {
    await db.terms.delete(id);
  };
