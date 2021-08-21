import { DictionaryEntry } from "types/DictionaryEntry";

const VOCABULARY_KEY = "vocabulary";

export function loadState(): DictionaryEntry[] | undefined {
  const json = localStorage.getItem(VOCABULARY_KEY);

  //TODO: add validation
  return json ? JSON.parse(json) : undefined;
}

export function persistState(data: DictionaryEntry[]) {
  localStorage.setItem(VOCABULARY_KEY, JSON.stringify(data));
}
