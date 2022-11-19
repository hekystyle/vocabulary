/* istanbul ignore file */

import 'reflect-metadata';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { migrate } from 'containers/DataMigration';
import { SERVICES } from 'services/di';
import { QUERY_CLIENT } from 'services/query';
import { Providers } from 'Providers';
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
    <Providers>
      <App />
    </Providers>
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
