import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
/* import firebase from './config/fbConfig'; */
import configureStore from "./redux/configureStore";
import { Provider, ReactReduxContext } from "react-redux";
import { BrowserHistory } from "react-router";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";

const store = configureStore();
const history = syncHistoryWithStore(BrowserHistory, store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App history={history} context={ReactReduxContext} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
