import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import monitorReducersEnhancer from "./enhancers/monitorReducers";

import logger from 'redux-logger';
import rootReducer from './rootReducer';
import {
	getFirebase,
	actionTypes as rrfActionTypes,
} from 'react-redux-firebase';
import { constants as rfConstants } from 'redux-firestore';

// import firebase from './FireBase/fbConfig';
import firebase from 'firebase/app';

import 'firebase/database';
import 'firebase/auth';

const reducer = rootReducer;

const store = configureStore({
	reducer,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [
				// just ignore every redux-firebase and react-redux-firebase action type
				...Object.keys(rfConstants.actionTypes).map(
					type => `${rfConstants.actionsPrefix}/${type}`
				),
				...Object.keys(rrfActionTypes).map(
					type => `@@reactReduxFirebase/${type}`
				),
			],
			ignoredPaths: ['firebase', 'firestore'],
		},
		thunk: {
			extraArgument: getFirebase,
		},
	}).concat(logger),
	devTools: process.env.NODE_ENV !== 'production',
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
	apiKey: [process.env.REACT_APP_FIREBASE_API_KEY],
	authDomain: [process.env.REACT_APP_FIREBASE_AUTH_DOMAIN],
	projectId: [process.env.REACT_APP_FIREBASE_PROJECT_ID],
	storageBucket: [process.env.REACT_APP_FIREBASE_STORAGE_BUCKET],
	messagingSenderId: [process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID],
	appId: [process.env.REACT_APP_FIREBASE_APP_ID],
};
firebase.initializeApp(fbConfig);
