import { render } from '@testing-library/react';
import { TEST_SERVICES } from 'services/__tests__/di';
import { ServicesProvider } from './Provider';

it('should render without error', () => {
  expect(() => render(<ServicesProvider services={TEST_SERVICES} />)).not.toThrow();
});
