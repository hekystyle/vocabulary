import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider, theme } from 'antd';
import { UserSynchronizer } from 'auth/UserSynchronizer';
import { FilterProvider } from 'filter';
import { FC, PropsWithChildren } from 'react';
import { HashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Services, ServicesProvider } from 'services';
import { DataMigration } from 'containers/DataMigration';
import { Notifications } from 'services/Notifications';
import { QUERY_CLIENT } from 'services/queryClient';

export const Providers: FC<PropsWithChildren<{ services: Services }>> = ({ children, services }) => (
  <ConfigProvider theme={{ algorithm: [theme.darkAlgorithm] }}>
    <RecoilRoot>
      <QueryClientProvider client={QUERY_CLIENT}>
        <ServicesProvider services={services}>
          <UserSynchronizer />
          <Notifications>
            <DataMigration>
              <HashRouter>
                <FilterProvider>{children}</FilterProvider>
              </HashRouter>
            </DataMigration>
          </Notifications>
        </ServicesProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  </ConfigProvider>
);
