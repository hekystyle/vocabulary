import { expect, it } from '@jest/globals';
import { computeAnswersRelativeScore } from './computeAnswersRelativeScore';

it.each([
  [100, 2, 2],
  [66, 3, 2],
  [50, 4, 2],
  [0, 0, 0],
  [0, 0, 1],
])('should return %p for %p total answers count and %p correct answers count', (expected, total, correct) => {
  expect.hasAssertions();
  const actual = computeAnswersRelativeScore({
    answersCount: total,
    correctAnswersCount: correct,
  });
  expect(actual).toBe(expected);
});
