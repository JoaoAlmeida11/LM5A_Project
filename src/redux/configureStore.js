import { configureStore } from '@reduxjs/toolkit';
// import monitorReducersEnhancer from "./enhancers/monitorReducers";

import logger from 'redux-logger';
import rootReducer from './rootReducer';

// const preloadedState = {};

const reducer = rootReducer;

const store = configureStore({
	reducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
	devTools: process.env.NODE_ENV !== 'production',
	// preloadedState,
	// enhancers: [reduxBatch],
});
export default store;
