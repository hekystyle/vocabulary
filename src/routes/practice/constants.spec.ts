import { isScoreAlgorithm, ScoreAlgorithm } from './constants';

it.each([
  ...Object.values(ScoreAlgorithm).map(value => [true, value] as const),
  [false, 'foo'],
  [false, 0],
  [false, null],
  [false, undefined],
] as const)('should return %p for %p', (expected, value) => {
  expect(isScoreAlgorithm(value)).toBe(expected);
});
