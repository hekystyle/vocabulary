import { expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import { testContainer } from 'services/__tests__/container';
import { ServicesProvider } from './Provider';

it('should render without error', () => {
  const container = testContainer();
  expect(() => render(<ServicesProvider services={container.services} />)).not.toThrow();
});
