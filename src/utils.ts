/**
 * Shuffle array and return new instance.
 */
export function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => (Math.random() > 0.5 ? 1 : -1));
}

export interface Answer<T> {
  isCorrect: boolean;
  entity: T;
}

export function prepareAnswersSet<T>(tested: T, all: T[]): Answer<T>[] {
  const allWithoutTested = all.filter((p) => p !== tested);
  const shufledAllWithoutTested = shuffle(allWithoutTested);
  const incorrects = shufledAllWithoutTested.splice(0, 3);
  const set = [
    { isCorrect: true, entity: tested },
    ...incorrects.map((p) => ({ isCorrect: false, entity: p })),
  ];
  const shufledSet = shuffle(set);
  return shufledSet;
}
