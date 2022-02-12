import { isObject } from 'utils/isObject';
import { Term } from './Term';

export function isTerm(val: unknown): val is Term {
  if (!isObject(val)) return false;

  const term = val as Record<keyof Term, unknown>;

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
