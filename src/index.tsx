/* istanbul ignore file */

import 'reflect-metadata';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { migrate } from 'containers/DataMigration';
import { AppContainer } from 'services';
import { QUERY_CLIENT } from 'services/query';
import { Providers } from 'Providers';
import reportWebVitals from './reportWebVitals';
import { App } from './App';

const container = new AppContainer();

QUERY_CLIENT.executeMutation({
  mutationKey: migrate.queryKey,
  mutationFn: () => migrate(container.db),
}).catch(console.error);

const rootElement = document.getElementById('root');

if (rootElement === null) throw new Error('Root element not found');

const root = createRoot(rootElement);

root.render(
  // TODO: Uncomment StrictMode when Ant Design dropdowns will be compatible with it (https://github.com/hekystyle/vocabulary/issues/319)
  // <React.StrictMode>
  <Providers services={container}>
    <App />
  </Providers>,
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
