import { configureStore } from '@reduxjs/toolkit';
// import monitorReducersEnhancer from "./enhancers/monitorReducers";

import logger from 'redux-logger';
import rootReducer from './rootReducer';
import { getFirebase } from 'react-redux-firebase';
// import firebase from './FireBase/fbConfig';
import firebase from 'firebase/app';
import 'firebase/auth';
const reducer = rootReducer;

const store = configureStore({
	reducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: getFirebase,
			},
		}).concat(logger),
	devTools: process.env.NODE_ENV !== 'production',
	// preloadedState,
	// enhancers: [reduxBatch],
});
export default store;
const rrfConfig = {
	userProfile: 'users',
};
export const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
};

export const fbConfig = {
	apiKey: [process.env.FIREBASE_API_KEY],
	authDomain: [process.env.FIREBASE_AUTH_DOMAIN],
	projectId: [process.env.FIREBASE_PROJECT_ID],
	storageBucket: [process.env.FIREBASE_STORAGE_BUCKET],
	messagingSenderId: [process.env.FIREBASE_MESSAGING_SENDER_ID],
	appId: [process.env.FIREBASE_APP_ID],
};
// const API_KEY = process.env.REACT_APP_API_KEY;
firebase.initializeApp(fbConfig);
