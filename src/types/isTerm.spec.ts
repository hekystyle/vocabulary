import { isTermV1 } from './isTerm';
import { TermV1 } from './Term';

test.each([
  [false, undefined],
  [false, null],
  [false, function a() {}],
  [false, () => {}],
  [false, {}],
  [
    false,
    <Partial<TermV1>>{
      id: NaN,
      answersCount: NaN,
      correctAnswersCount: NaN,
      definition: undefined,
      partOfSpeech: undefined,
      translation: undefined,
      word: undefined,
    },
  ],
  [
    true,
    <TermV1>{
      id: 0,
      answersCount: 0,
      correctAnswersCount: 0,
      definition: '',
      partOfSpeech: '',
      translation: '',
      word: '',
    },
  ],
])('should return %p for %p', (expected, value) => {
  expect.hasAssertions();
  const actual = isTermV1(value);
  expect(actual).toBe(expected);
});
