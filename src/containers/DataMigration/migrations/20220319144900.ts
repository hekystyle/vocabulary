import { AppDb } from '@/services/db';
import { isTermV1 } from '@/types/isTerm';
import { TermV1 } from '@/types/Term';
import type { Migration } from '../migrate';

const VOCABULARY_KEY = 'vocabulary';

function loadState(): TermV1[] | undefined {
  const json = localStorage.getItem(VOCABULARY_KEY);

  if (json === null) return undefined;

  const value: unknown = JSON.parse(json);

  return Array.isArray(value) && value.every(isTermV1) ? value : undefined;
}

export const up: Migration = async (db: AppDb) => {
  const terms = loadState();
  if (terms === undefined) return;
  for (const term of terms) {
    await db.terms.add({
      ...term,
      // @ts-expect-error fixed by Dexie v4
      id: undefined,
      createdAt: new Date(term.id),
      tags: [],
    });
  }
  localStorage.removeItem(VOCABULARY_KEY);
};
