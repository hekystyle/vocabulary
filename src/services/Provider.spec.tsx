import { render } from '@testing-library/react';
import { expect, it } from 'vitest';
import { testContainer } from '@/services/__tests__/container';
import { ServicesProvider } from './Provider';

it('should render without error', () => {
  const container = testContainer();
  expect(() => render(<ServicesProvider services={container.services} />)).not.toThrow();
});
