import { shuffle } from './shuffle';

test('should be immutable', () => {
  expect.hasAssertions();
  const array = [0] as const;
  const actual = shuffle(array);
  expect(actual).not.toBe(array);
});
