import { shuffle } from './shuffle';

it('should be immutable', () => {
  const array: never[] = [];
  const actual = shuffle(array);
  expect(actual).not.toBe(array);
});
