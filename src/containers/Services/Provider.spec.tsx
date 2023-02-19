import { render } from '@testing-library/react';
import { TestContainer } from 'services/__tests__/container';
import { ServicesProvider } from './Provider';

it('should render without error', () => {
  const container = new TestContainer();
  expect(() => render(<ServicesProvider services={container} />)).not.toThrow();
});
