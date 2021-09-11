import { Term } from "types/Term";

const VOCABULARY_KEY = "vocabulary";

export function loadState(): Term[] | undefined {
  const json = localStorage.getItem(VOCABULARY_KEY);

  //TODO: add validation
  return json ? JSON.parse(json) : undefined;
}

export function persistState(data: Term[]) {
  localStorage.setItem(VOCABULARY_KEY, JSON.stringify(data));
}
