import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { fetchOnePlayer } from '../../redux/ducks/playersSlice';

import { setLoadingToIdleLeagueSlice } from '../../redux/ducks/leagueSlice';
import { setLoadingToIdleClubsSlice } from '../../redux/ducks/clubsSlice';
import { setLoadingToIdleOneClubSlice } from '../../redux/ducks/oneClubSlice';

const RequestPlayer = ({ seasonId, playerId }) => {
	console.log('dispatch Players');
	const dispatch = useDispatch();
	dispatch(fetchOnePlayer({ seasonId, playerId }));
	// dispatch(fetchOnePlayer());
	// to set loading of other pages to idle

	useEffect(() => {
		dispatch(setLoadingToIdleLeagueSlice());
		dispatch(setLoadingToIdleClubsSlice());
		dispatch(setLoadingToIdleOneClubSlice());
	});
};

export default RequestPlayer;
