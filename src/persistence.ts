import { Term } from 'types/Term';

const VOCABULARY_KEY = 'vocabulary';

export function loadState(): Term[] | undefined {
  const json = localStorage.getItem(VOCABULARY_KEY);

  // TODO: add validation (https://github.com/hekystyle/vocabulary/issues/15)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return json ? JSON.parse(json) : undefined;
}

export function persistState(data: Term[]): void {
  localStorage.setItem(VOCABULARY_KEY, JSON.stringify(data));
}
