import { render } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { QUERY_CLIENT } from 'services/query';
import { DataMigration } from './DataMigration';

it('should render without throwing an error', () => {
  const run = () =>
    render(
      <QueryClientProvider client={QUERY_CLIENT}>
        <DataMigration />
      </QueryClientProvider>,
    );
  expect(run).not.toThrow();
});
