import { createBrowserHistory } from "history";
// import { getDefaultMiddleware } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit";
// import monitorReducersEnhancer from "./enhancers/monitorReducers";
// import logger from "redux-logger";
import rootReducer from "./rootReducer";
// import thunkMiddleware from "redux-thunk";

export const history = createBrowserHistory();

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    preloadedState,
    // enhancers: [monitorReducersEnhancer],
  });

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./rootReducer", () => store.replaceReducer(rootReducer));
  }

  return store;
}
