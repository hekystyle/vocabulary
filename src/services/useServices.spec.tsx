import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { beforeAll, expect, it, vi } from 'vitest';
import { useServices } from './useServices';

beforeAll(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  return () => {
    vi.restoreAllMocks();
  };
});

it('should be used without throwing error', () => {
  const run = () =>
    renderHook(useServices, {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
    });
  expect(run).not.toThrow();
});
