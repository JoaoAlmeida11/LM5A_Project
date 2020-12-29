import { connectRouter } from 'connected-react-router';
import authReducer from './FireBase/AuthFireBase';
import { combineReducers } from 'redux';
import firebaseReducer from 'react-redux-firebase';

const rootReducer = history =>
	combineReducers({
		auth: authReducer,
		firebase: firebaseReducer,
		router: connectRouter(history),
	});

export default rootReducer;
