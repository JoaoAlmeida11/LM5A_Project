import { combineReducers } from 'redux';
import authReducer from './ducks/AuthSlice';
import firebaseReducer from 'react-redux-firebase';
// import { usersSlice } from './ducks/usersSlice';
import leagueReducer from './ducks/leagueSlice'; //leagueReducer === leagueSlice
import clubReducer from './ducks/clubsSlice';

const rootReducer = combineReducers({
	auth: authReducer,
	firebase: firebaseReducer,
	// users is an example made by reading documentation
	// users: usersSlice,
	league: leagueReducer,
	club: clubReducer,
});

export default rootReducer;
