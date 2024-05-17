import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider, theme } from 'antd';
import { PropsWithChildren } from 'react';
import { HashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { DataMigration } from '@/containers/DataMigration';
import { FilterProvider } from '@/filter';
import { Notifications } from '@/services/Notifications';
import { QUERY_CLIENT } from '@/services/queryClient';

export const Providers = ({ children }: PropsWithChildren) => (
  <ConfigProvider theme={{ algorithm: [theme.darkAlgorithm] }}>
    <RecoilRoot>
      <QueryClientProvider client={QUERY_CLIENT}>
        <Notifications>
          <DataMigration>
            <HashRouter>
              <FilterProvider>{children}</FilterProvider>
            </HashRouter>
          </DataMigration>
        </Notifications>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  </ConfigProvider>
);
