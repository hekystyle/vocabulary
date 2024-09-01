import { render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { Table } from './Table';

window.matchMedia = query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(), // deprecated
  removeListener: vi.fn(), // deprecated
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(() => false),
});

it('renders without error', () => {
  expect(() => render(<Table />)).not.toThrow();
});
