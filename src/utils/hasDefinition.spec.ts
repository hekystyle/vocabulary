import { Definable, hasDefinition } from './hasDefinition';

it.each([
  ['', false],
  ['some def ...', true],
  [' ', true],
])('should for %p return %p', (def, expected) => {
  const definable: Definable = { definition: def };
  const actual = hasDefinition(definable);
  expect(actual).toBe(expected);
});
