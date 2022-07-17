import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { DataMigration } from 'containers/DataMigration';
import { SERVICES, ServicesProvider } from 'services/di';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QUERY_CLIENT } from 'services/query';
import { RecoilRoot } from 'recoil';
import { rootReducer } from './reducer';
import reportWebVitals from './reportWebVitals';
import { App } from './containers/App';

const store = configureStore({
  reducer: rootReducer,
});

const container = document.getElementById('root');
if (container === null) throw new Error('Root element not found');
const root = createRoot(container);
root.render(
  <StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={QUERY_CLIENT}>
        <ServicesProvider services={SERVICES}>
          <DataMigration>
            <Provider store={store}>
              <HashRouter>
                <App />
              </HashRouter>
            </Provider>
          </DataMigration>
        </ServicesProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
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
      navigator.serviceWorker.register('./service-worker.js');
    },
    { once: true, passive: true },
  );
}
