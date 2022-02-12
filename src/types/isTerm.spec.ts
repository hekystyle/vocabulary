import { isTerm } from './isTerm';
import { Term } from './Term';

test.each([
  [false, undefined],
  [false, null],
  [false, function a() {}],
  [false, () => {}],
  [false, {}],
  [
    false,
    <Partial<Term>>{
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
    <Term>{
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
  const actual = isTerm(value);
  expect(actual).toBe(expected);
});
