import { render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { expect, it } from 'vitest';
import { FilterProvider } from './Provider';

it('should render without error', () => {
  expect(() =>
    render(
      <HashRouter>
        <FilterProvider />
      </HashRouter>,
    ),
  ).not.toThrow();
});
