import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { rootReducer } from "./reducer";
import { loadState, persistState } from "persistence";
import { HashRouter } from "react-router-dom";

const store = configureStore({
  reducer: rootReducer,
  preloadedState: { dictionary: loadState() },
});

store.subscribe(() => {
  const state = store.getState();
  persistState(state.dictionary);
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
