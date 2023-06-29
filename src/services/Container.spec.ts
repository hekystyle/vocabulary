import { expect, it } from '@jest/globals';
import { Container } from './Container';

it('should be able to create instance and resolve a dependency', () => {
  const container = new Container({
    a: () => 'a',
    b: ({ get }) => `${get('a')}.b`,
  });
  expect(container.services.b).toBe('a.b');
});
