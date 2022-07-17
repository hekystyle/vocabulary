import { AppDb } from 'services/db';
import { increaseAnswersCounts } from 'utils/increaseAnswersCounts';

export const updateTermAnswers =
  (db: AppDb) =>
  async ({ id, increaseCorrect }: { id: number; increaseCorrect: boolean }): Promise<void> => {
    const term = await db.terms.get(id);
    if (term) {
      await db.terms.put(increaseAnswersCounts(term, increaseCorrect));
    }
  };
