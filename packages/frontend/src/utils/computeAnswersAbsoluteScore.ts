import { AnswersCountable } from './types';

export function computeAnswersAbsoluteScore({ answersCount, correctAnswersCount }: AnswersCountable): number {
  return answersCount + correctAnswersCount;
}
