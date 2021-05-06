import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Routes } from "./app/routes";
import { persistor, store } from "./config";
import './index.scss'
ReactDOM.render(
     <Provider store={store}>
      <PersistGate persistor={persistor} loading={"Loading..."}>
        <BrowserRouter basename={'/'}>
          <Routes />
        </BrowserRouter>
      </PersistGate>
    </Provider>,
  document.getElementById('root')
);

