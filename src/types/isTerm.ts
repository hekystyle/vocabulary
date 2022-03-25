import { isObject } from 'utils/isObject';
import { TermV1 } from './Term';

export function isTermV1(val: unknown): val is TermV1 {
  if (!isObject(val)) return false;

  const term = val as Record<keyof TermV1, unknown>;

  return (
    typeof term.id === 'number' &&
    !Number.isNaN(term.id) &&
    typeof term.word === 'string' &&
    typeof term.partOfSpeech === 'string' &&
    typeof term.translation === 'string' &&
    typeof term.definition === 'string' &&
    typeof term.answersCount === 'number' &&
    !Number.isNaN(term.answersCount) &&
    typeof term.correctAnswersCount === 'number' &&
    !Number.isNaN(term.correctAnswersCount)
  );
}
