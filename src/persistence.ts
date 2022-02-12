import { isArrayOf } from 'utils/isArrayOf';
import { Term } from 'types/Term';
import { isTerm } from 'types/isTerm';

const VOCABULARY_KEY = 'vocabulary';

export function loadState(): Term[] | undefined {
  const json = localStorage.getItem(VOCABULARY_KEY);

  if (json === null) return undefined;

  const value: unknown = JSON.parse(json);

  return isArrayOf(value, isTerm) ? value : undefined;
}

export function persistState(data: Term[]): void {
  localStorage.setItem(VOCABULARY_KEY, JSON.stringify(data));
}
