import { isArrayOfTerms } from 'types/isArrayOfTerms';
import { Term } from 'types/Term';

const VOCABULARY_KEY = 'vocabulary';

export function loadState(): Term[] | undefined {
  const json = localStorage.getItem(VOCABULARY_KEY);

  if (json === null) return undefined;

  const value: unknown = JSON.parse(json);

  return isArrayOfTerms(value) ? value : undefined;
}

export function persistState(data: Term[]): void {
  localStorage.setItem(VOCABULARY_KEY, JSON.stringify(data));
}
