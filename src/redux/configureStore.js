// import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
// import monitorReducersEnhancer from "./enhancers/monitorReducers";

import logger from 'redux-logger';
import rootReducer from './rootReducer';
// import thunkMiddleware from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

export default function configureAppStore(preloadedState) {
	const store = configureStore({
		reducer: rootReducer(history),
		// middleware: [thunkMiddleware, logger],
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(logger).concat(routerMiddleware(history)),
		preloadedState,
		// enhancers: [monitorReducersEnhancer],
	});

	if (process.env.NODE_ENV !== 'production' && module.hot) {
		module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer));
	}

	return store;
}
// export default function configureAppStore(preloadedState) {
// 	const store = configureStore({
// 		reducer: rootReducer(history),
// 		middleware: [thunkMiddleware, logger],
// 		//for costum middleware ->  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
// 		preloadedState,
// 		// enhancers: [monitorReducersEnhancer],
// 	});

// 	if (process.env.NODE_ENV !== 'production' && module.hot) {
// 		module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer));
// 	}

// 	return store;
// }
