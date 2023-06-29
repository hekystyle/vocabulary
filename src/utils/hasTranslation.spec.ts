import { expect, it } from '@jest/globals';
import { hasTranslation } from './hasTranslation';

it.each([
  ['', false],
  ['foo', true],
  [' ', true],
])('should for %p return %p', (translation, expected) => {
  expect.hasAssertions();
  const actual = hasTranslation({ translation });
  expect(actual).toBe(expected);
});
