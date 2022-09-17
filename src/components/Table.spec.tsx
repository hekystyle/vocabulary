import { render } from '@testing-library/react';
import { Table } from './Table';

test('renders without error', () => {
  expect(() => render(<Table />)).not.toThrow();
});
