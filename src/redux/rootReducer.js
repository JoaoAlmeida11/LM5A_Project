import { connectRouter } from 'connected-react-router';
import authReducer from './FireBase/AuthFireBase';
import { combineReducers } from 'redux';
import firebaseReducer from 'react-redux-firebase';
import { usersSlice } from './usersSlice';
const rootReducer = history =>
	combineReducers({
		auth: authReducer,
		firebase: firebaseReducer,
		router: connectRouter(history),
		// users is an example made by reading documentation
		users: usersSlice,
	});

export default rootReducer;
