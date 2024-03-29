import { expect, it, vi } from 'vitest';
import { QUERY_KEYS } from './queryKeys';

it.each([
  [() => QUERY_KEYS.dictionary.all()],
  [() => QUERY_KEYS.dictionary.word('foo')],
  [() => QUERY_KEYS.terms.all()],
  [() => QUERY_KEYS.terms.id(-1)],
  [() => QUERY_KEYS.terms.filter({})],
  [() => QUERY_KEYS.terms.tags.all()],
])('should not throw error %#', (run: () => readonly unknown[]) => {
  const runMock = vi.fn(run);
  expect(runMock).not.toThrow();
  expect(runMock).toHaveBeenCalledTimes(1);
  expect(runMock.mock.results[0]?.value).toBeInstanceOf(Array);
});
