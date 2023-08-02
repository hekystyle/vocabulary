import { expect, it } from 'vitest';
import { isScoreAlgorithm, ScoreAlgorithm } from './constants';

it.each([
  ...(Object.values(ScoreAlgorithm).map(value => [true, value] as const) as Array<[true, ScoreAlgorithm]>),
  [false, 'foo'],
  [false, 0],
  [false, null],
  [false, undefined],
])('should return %p for %p', (expected: boolean, value: unknown) => {
  expect(isScoreAlgorithm(value)).toBe(expected);
});
