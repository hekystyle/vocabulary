import { render } from '@testing-library/react';
import { SpinnerBox } from './SpinnerBox';

test('renders without error', () => {
  expect(() => render(<SpinnerBox />)).not.toThrow();
});
