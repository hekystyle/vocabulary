import { expect, it } from '@jest/globals';
import { QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { QUERY_CLIENT } from 'services/queryClient';
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
