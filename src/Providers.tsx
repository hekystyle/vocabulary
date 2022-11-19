import { FC, PropsWithChildren } from 'react';
import { ConfigProvider, theme } from 'antd';
import { RecoilRoot } from 'recoil';
import { HashRouter } from 'react-router-dom';
import { DataMigration } from 'containers/DataMigration';
import { SERVICES } from 'services/di';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QUERY_CLIENT } from 'services/query';
import { FilterProvider } from 'containers/Filter';
import { ServicesProvider } from 'containers/Services';

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <ConfigProvider theme={{ algorithm: [theme.darkAlgorithm] }}>
    <RecoilRoot>
      <QueryClientProvider client={QUERY_CLIENT}>
        <ServicesProvider services={SERVICES}>
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
