import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { migrate } from '@/containers/DataMigration';
import { appContainer } from '@/services/AppContainer';
import { QUERY_CLIENT } from '@/services/queryClient';
import { App } from './App';
import { Providers } from './Providers';
import reportWebVitals from './reportWebVitals';

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: {
      successMessage?: string;
      errorMessage?: string;
    };
  }
}

const container = appContainer();

QUERY_CLIENT.getMutationCache()
  .build(QUERY_CLIENT, {
    mutationKey: migrate.queryKey,
    mutationFn: migrate,
  })
  .execute(container.services.db)
  .catch(console.error);

const rootElement = document.getElementById('root');

if (rootElement === null) throw new Error('Root element not found');

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Providers services={container.services}>
      <App />
    </Providers>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
