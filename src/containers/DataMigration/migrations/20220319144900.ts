import { AppDb } from 'services/db';
import { isArrayOf } from 'utils/isArrayOf';
import { TermV1 } from 'types/Term';
import { isTermV1 } from 'types/isTerm';
import type { Migration } from '../DataMigration';

const VOCABULARY_KEY = 'vocabulary';

function loadState(): TermV1[] | undefined {
  const json = localStorage.getItem(VOCABULARY_KEY);

  if (json === null) return undefined;

  const value: unknown = JSON.parse(json);

  return isArrayOf(value, isTermV1) ? value : undefined;
}

export const up: Migration = async (db: AppDb) => {
  const terms = loadState();
  if (terms === undefined) return;
  for (const term of terms) {
    await db.terms.add({
      ...term,
      id: undefined,
      createdAt: new Date(term.id),
    });
  }
  localStorage.removeItem(VOCABULARY_KEY);
};
