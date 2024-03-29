import { act, renderHook } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { beforeAll, expect, it, vi } from 'vitest';
import { FilterProvider } from './Provider';
import { useFilter } from './useFilter';

beforeAll(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});

  return () => {
    vi.restoreAllMocks();
  };
});

it('should throw error if not used within provider', () => {
  const run = () => renderHook(useFilter);
  expect(run).toThrow(`${useFilter.name} must be used within a ${FilterProvider.name}`);
});

it('should be used without throwing error', async () => {
  window.location.hash = '#/?page=2';
  const { result } = renderHook(useFilter, {
    wrapper: ({ children }) => (
      <HashRouter>
        <FilterProvider>{children}</FilterProvider>,
      </HashRouter>
    ),
  });
  expect(result.current.filter).toEqual({ page: 2 });

  act(() => result.current.update({ page: 1 }));
  expect(result.current.filter).toEqual({ page: 1 });

  act(() => result.current.setFields([] as const));
  expect(result.current.filter).toEqual({});

  act(() => result.current.setFields(undefined));
  expect(result.current.filter).toEqual({ page: 1 });
});
