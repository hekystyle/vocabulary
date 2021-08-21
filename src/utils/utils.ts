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

export function sortImmutable<T>(
  items: T[],
  comparer?: (a: T, b: T) => number
): T[] {
  return [...items].sort(comparer);
}

export interface AnswersCountable {
  answersCount: number;
  correctAnswersCount: number;
}

export function computeAnswersAbsoluteScore<T extends AnswersCountable>({
  answersCount,
  correctAnswersCount,
}: T): number {
  return answersCount + correctAnswersCount;
}

export function answersComparer<T extends AnswersCountable>(a: T, b: T) {
  const [scoreA, scoreB] = [a, b].map(computeAnswersAbsoluteScore);

  return scoreB - scoreA;
}

export interface Definable {
  definition: string;
}

export const hasDefinition = (definable: Definable) =>
  definable.definition !== "";

export interface Translateable {
  translation: string;
}

export const hasTranslation = (translateable: Translateable) =>
  translateable.translation !== "";
