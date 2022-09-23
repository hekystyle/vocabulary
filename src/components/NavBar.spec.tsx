import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

it('should navigate to the list page', async () => {
  const user = userEvent.setup();

  render(
    <HashRouter>
      <NavBar />
    </HashRouter>,
  );

  await user.click(screen.getByRole('button', { name: 'List' }));

  expect(window.location.hash).toBe('#/list');
});
