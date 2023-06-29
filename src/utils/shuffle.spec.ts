import { expect, it } from '@jest/globals';
import { shuffle } from './shuffle';

it('should be immutable', () => {
  expect.hasAssertions();
  const array = [0] as const;
  const actual = shuffle(array);
  expect(actual).not.toBe(array);
});
