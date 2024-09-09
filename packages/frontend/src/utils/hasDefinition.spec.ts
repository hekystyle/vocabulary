import { expect, it } from 'vitest';
import { Definable, hasDefinition } from './hasDefinition';

it.each([
  ['', false],
  ['some def ...', true],
  [' ', true],
])('should for %p return %p', (def, expected) => {
  expect.hasAssertions();
  const definable: Definable = { definition: def };
  const actual = hasDefinition(definable);
  expect(actual).toBe(expected);
});
