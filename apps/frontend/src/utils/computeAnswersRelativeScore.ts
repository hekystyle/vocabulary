import { AnswersCountable } from './types';

export function computeAnswersRelativeScore({ answersCount, correctAnswersCount }: AnswersCountable): number {
  return answersCount === 0 ? 0 : Math.floor((100 / answersCount) * correctAnswersCount);
}
