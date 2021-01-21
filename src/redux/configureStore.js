import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import logger from 'redux-logger';
import rootReducer from './rootReducer';
import {
	getFirebase,
	actionTypes as rrfActionTypes,
} from 'react-redux-firebase';
import { constants as rfConstants } from 'redux-firestore';

import 'firebase/database';
import 'firebase/auth';

const reducer = rootReducer;

export const store = configureStore({
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
			extraArgument: {
				getFirebase,
			},
		},
	}).concat(logger),
	devTools: process.env.NODE_ENV !== 'production',
});
export default store;
