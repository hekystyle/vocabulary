import { FC, PropsWithChildren } from 'react';
import { ConfigProvider, theme } from 'antd';
import { RecoilRoot } from 'recoil';
import { HashRouter } from 'react-router-dom';
import { DataMigration } from 'containers/DataMigration';
import { Services } from 'services';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QUERY_CLIENT } from 'services/query';
import { FilterProvider } from 'containers/Filter';
import { ServicesProvider } from 'containers/Services';

export const Providers: FC<PropsWithChildren<{ services: Services }>> = ({ children, services }) => (
  <ConfigProvider theme={{ algorithm: [theme.darkAlgorithm] }}>
    <RecoilRoot>
      <QueryClientProvider client={QUERY_CLIENT}>
        <ServicesProvider services={services}>
          <DataMigration>
            <HashRouter>
              <FilterProvider>{children}</FilterProvider>
            </HashRouter>
          </DataMigration>
        </ServicesProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  </ConfigProvider>
);
