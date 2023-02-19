import { renderHook } from '@testing-library/react';
import { TEST_SERVICES } from 'services/__tests__/di';
import { ServicesProvider } from './Provider';
import { useServices } from './useServices';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

it('should throw error if not used within provider', () => {
  const run = () => renderHook(useServices);
  expect(run).toThrow(`${useServices.name} must be used within a ${ServicesProvider.name}`);
});

it('should be used without throwing error', () => {
  const run = () =>
    renderHook(useServices, {
      wrapper: ({ children }) => <ServicesProvider services={TEST_SERVICES}>{children}</ServicesProvider>,
    });
  expect(run).not.toThrow();
});
