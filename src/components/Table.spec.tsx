import { render } from '@testing-library/react';
import { Table } from './Table';

window.matchMedia = query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

test('renders without error', () => {
  expect(() => render(<Table />)).not.toThrow();
});
