import { combineReducers } from 'redux';
import authReducer from './ducks/AuthSlice';
import { firebaseReducer } from 'react-redux-firebase';
import leagueReducer from './ducks/leagueSlice'; //leagueReducer === leagueSlice
import clubReducer from './ducks/clubsSlice';
import oneClubReducer from './ducks/oneClubSlice';
import playersReducer from './ducks/playersSlice';

const rootReducer = combineReducers({
	auth: authReducer,
	firebase: firebaseReducer,
	league: leagueReducer,
	club: clubReducer,
	oneClub: oneClubReducer,
	player: playersReducer,
});

export default rootReducer;
