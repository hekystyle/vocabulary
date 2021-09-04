export interface Answer<T> {
  isCorrect: boolean;
  entity: T;
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

export function computeAnswersRelativeScore<T extends AnswersCountable>({
  answersCount,
  correctAnswersCount,
}: T): number {
  return Math.floor((100 / answersCount) * correctAnswersCount);
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
