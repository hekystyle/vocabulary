import { shuffle } from './shuffle';

test('should be immutable', () => {
  expect.hasAssertions();
  const array: never[] = [];
  const actual = shuffle(array);
  expect(actual).not.toBe(array);
});
