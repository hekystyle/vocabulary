import 'reflect-metadata';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/antd.css';
import 'antd/dist/antd.dark.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { HashRouter } from 'react-router-dom';
import { DataMigration, migrate } from 'containers/DataMigration';
import { SERVICES } from 'services/di';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QUERY_CLIENT } from 'services/query';
import { FilterProvider } from 'containers/Filter';
import { ServicesProvider } from 'containers/Services';
import reportWebVitals from './reportWebVitals';
import { App } from './App';

QUERY_CLIENT.executeMutation({
  mutationKey: migrate.queryKey,
  mutationFn: () => migrate(SERVICES.db),
}).catch(console.error);

const container = document.getElementById('root');
if (container === null) throw new Error('Root element not found');
const root = createRoot(container);
root.render(
  <StrictMode>
    <QueryClientProvider client={QUERY_CLIENT}>
      <ServicesProvider services={SERVICES}>
        <DataMigration>
          <HashRouter>
            <FilterProvider>
              <App />
            </FilterProvider>
          </HashRouter>
        </DataMigration>
      </ServicesProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener(
    'load',
    () => {
      navigator.serviceWorker.register('./service-worker.js').catch(console.error);
    },
    { once: true, passive: true },
  );
}
