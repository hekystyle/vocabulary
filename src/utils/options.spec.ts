import { expect, it } from '@jest/globals';
import { options } from './options';

it('should create options', () => {
  expect(options(['a', 1])).toStrictEqual([
    {
      label: 'a',
      value: 'a',
    },
    {
      label: 1,
      value: 1,
    },
  ]);
});
