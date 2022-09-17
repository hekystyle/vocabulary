import { render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { FilterProvider } from './Provider';

it('renders', () => {
  expect(() =>
    render(
      <HashRouter>
        <FilterProvider />
      </HashRouter>,
    ),
  ).not.toThrow();
});
