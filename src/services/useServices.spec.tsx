import { renderHook } from '@testing-library/react';
import { beforeAll, expect, it, vi } from 'vitest';
import { testContainer } from 'services/__tests__/container';
import { ServicesProvider } from './Provider';
import { useServices } from './useServices';

beforeAll(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  return () => {
    vi.restoreAllMocks();
  };
});

it('should throw error if not used within provider', () => {
  const run = () => renderHook(useServices);
  expect(run).toThrow(`${useServices.name} must be used within a ${ServicesProvider.name}`);
});

it('should be used without throwing error', () => {
  const container = testContainer();
  const run = () =>
    renderHook(useServices, {
      wrapper: ({ children }) => <ServicesProvider services={container.services}>{children}</ServicesProvider>,
    });
  expect(run).not.toThrow();
});
