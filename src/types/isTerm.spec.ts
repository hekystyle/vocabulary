import { expect, it } from 'vitest';
import { isTermV1 } from './isTerm';
import { TermV1 } from './Term';

it.each([
  [false, undefined],
  [false, null],
  [false, function a() {}],
  [false, () => {}],
  [false, {}],
  [
    false,
    {
      id: NaN,
      answersCount: NaN,
      correctAnswersCount: NaN,
      definition: undefined,
      partOfSpeech: undefined,
      translation: undefined,
      word: undefined,
    } as Partial<TermV1>,
  ],
  [
    true,
    {
      id: 0,
      answersCount: 0,
      correctAnswersCount: 0,
      definition: '',
      partOfSpeech: '',
      translation: '',
      word: '',
    } as TermV1,
  ],
])('should return %p for %p', (expected, value) => {
  expect.hasAssertions();
  const actual = isTermV1(value);
  expect(actual).toBe(expected);
});
