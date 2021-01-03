import { configureStore } from '@reduxjs/toolkit';
// import monitorReducersEnhancer from "./enhancers/monitorReducers";

import logger from 'redux-logger';
import rootReducer from './rootReducer';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebase, { fbConfig } from './FireBase/fbConfig';

const reducer = rootReducer;
const store = configureStore({
	reducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: getFirebase,
			},
		})
			.concat(logger)
			.concat(
				reactReduxFirebase(fbConfig, {
					userProfile: 'users',
					useFirestoreForProfile: true,
					attachAuthIsReady: true,
				})
			),
	devTools: process.env.NODE_ENV !== 'production',
	// preloadedState,
	// enhancers: [reduxBatch],
});
export default store;

export const rrfProps = {
	firebase,
	config: fbConfig,
	dispatch: store.dispatch,
	initializeAuth: true,
};
