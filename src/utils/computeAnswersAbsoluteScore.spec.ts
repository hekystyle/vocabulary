import { computeAnswersAbsoluteScore } from './computeAnswersAbsoluteScore';

it.each([
  [4, 2, 2],
  [3, 2, 1],
  [2, 2, 0],
  [0, 0, 0],
])('should return %p for %p total answers count and %p correct answers count', (expected, total, correct) => {
  const actual = computeAnswersAbsoluteScore({
    answersCount: total,
    correctAnswersCount: correct,
  });
  expect(actual).toBe(expected);
});
