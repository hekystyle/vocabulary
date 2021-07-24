import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { dictionarySlice } from "./reducer";

const VOCABULARY_KEY = "vocabulary";

const json = localStorage.getItem(VOCABULARY_KEY);

const store = configureStore({
  reducer: dictionarySlice.reducer,
  preloadedState: json ? JSON.parse(json) : undefined,
});

store.subscribe(() => {
  localStorage.setItem(VOCABULARY_KEY, JSON.stringify(store.getState()));
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
