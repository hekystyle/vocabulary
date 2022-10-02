import { render, screen } from '@testing-library/react';
import { SpinnerBox } from './SpinnerBox';

test('renders without error', () => {
  expect(() => render(<SpinnerBox label="" />)).not.toThrow();
});

it('should has role attribute', () => {
  render(<SpinnerBox label="foo" />);
  expect(screen.getByRole('status', { name: 'foo' })).toBeInTheDocument();
});
