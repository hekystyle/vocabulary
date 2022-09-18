import { renderHook } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { useFilter } from './useFilter';
import { FilterProvider } from './Provider';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

it('should throw error if not used within provider', () => {
  const run = () => renderHook(useFilter);
  expect(run).toThrow(`${useFilter.name} must be used within a ${FilterProvider.name}`);
});

it('should be used without throwing error', () => {
  const run = () =>
    renderHook(useFilter, {
      wrapper: ({ children }) => (
        <HashRouter>
          <FilterProvider>{children}</FilterProvider>,
        </HashRouter>
      ),
    });
  expect(run).not.toThrow();
});
