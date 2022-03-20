import { isArrayOf } from 'utils/isArrayOf';
import { TermV1 } from 'types/Term';
import { isTermV1 } from 'types/isTerm';

export const VOCABULARY_KEY = 'vocabulary';

export function loadState(): TermV1[] | undefined {
  const json = localStorage.getItem(VOCABULARY_KEY);

  if (json === null) return undefined;

  const value: unknown = JSON.parse(json);

  return isArrayOf(value, isTermV1) ? value : undefined;
}

export function persistState(data: TermV1[]): void {
  localStorage.setItem(VOCABULARY_KEY, JSON.stringify(data));
}
