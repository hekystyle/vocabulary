import { render, screen } from '@testing-library/react';
import { SpinnerBox } from './SpinnerBox';

test('renders without error', () => {
  expect(() => render(<SpinnerBox />)).not.toThrow();
});

it('should has role attribute', () => {
  render(<SpinnerBox />);
  expect(screen.getByRole('status')).toBeInTheDocument();
});
