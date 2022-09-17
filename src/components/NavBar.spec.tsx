import { render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { NavBar } from './NavBar';

test('renders without error', () => {
  expect(() =>
    render(
      <HashRouter>
        <NavBar />
      </HashRouter>,
    ),
  ).not.toThrow();
});
