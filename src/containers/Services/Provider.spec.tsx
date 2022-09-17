import { render } from '@testing-library/react';
import { SERVICES } from 'services/di';
import { ServicesProvider } from './Provider';

it('should render without error', () => {
  expect(() => render(<ServicesProvider services={SERVICES} />)).not.toThrow();
});
