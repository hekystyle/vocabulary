import { AppDb } from 'db';

export const increaseTermAnswers =
  (db: AppDb) =>
  async (id: number, increaseCorrect: boolean): Promise<void> => {
    const term = await db.terms.get(id);
    if (term) {
      term.answersCount += 1;
      if (increaseCorrect) term.correctAnswersCount += 1;
      await db.terms.put(term);
    }
  };
