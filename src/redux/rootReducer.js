import authReducer from './FireBase/AuthFireBase';
import { combineReducers } from 'redux';
import firebaseReducer from 'react-redux-firebase';
import { usersSlice } from './ducks/usersSlice';
import { leagueSlice } from './ducks/leagueSlice';

const rootReducer = combineReducers({
	auth: authReducer,
	firebase: firebaseReducer,
	// users is an example made by reading documentation
	users: usersSlice,
	league: leagueSlice,
});

export default rootReducer;
