import { combineReducers } from 'redux';
// import authReducer from './FireBase/AuthFireBase';
// import firebaseReducer from 'react-redux-firebase';
// import { usersSlice } from './ducks/usersSlice';
import leagueReducer from './ducks/leagueSlice'; //leagueReducer === leagueSlice

const rootReducer = combineReducers({
	// auth: authReducer,
	// firebase: firebaseReducer,
	// users is an example made by reading documentation
	// users: usersSlice,
	league: leagueReducer,
});

export default rootReducer;
