import { renderHook } from '@testing-library/react';
import { SERVICES } from 'services/di';
import { ServicesProvider } from './Provider';
import { useServices } from './useServices';

it('should throw error if not used within provider', () => {
  const run = () => renderHook(useServices);
  expect(run).toThrow(`useServices must be used within a ${ServicesProvider.name}`);
});

it('should be used without throwing error', () => {
  const run = () =>
    renderHook(useServices, {
      wrapper: ({ children }) => <ServicesProvider services={SERVICES}>{children}</ServicesProvider>,
    });
  expect(run).not.toThrow();
});
