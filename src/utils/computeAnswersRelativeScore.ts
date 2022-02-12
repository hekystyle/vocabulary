import { AnswersCountable } from './types';

export function computeAnswersRelativeScore({ answersCount, correctAnswersCount }: AnswersCountable): number {
  return Math.floor((100 / answersCount) * correctAnswersCount);
}
