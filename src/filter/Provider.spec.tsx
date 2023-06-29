import { expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
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
