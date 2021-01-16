import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setLoadingToIdleLeagueSlice } from '../../redux/ducks/leagueSlice';
import { setLoadingToIdleClubsSlice } from '../../redux/ducks/clubsSlice';
import fetchOnePlayer from '../../redux/ducks/playersSlice';
import { setLoadingToIdleOneClubSlice } from '../../redux/ducks/oneClubSlice';

const RequestPlayer = ({ seasonId, playerId }) => {
	const dispatch = useDispatch();
	dispatch(fetchOnePlayer({ seasonId, playerId }));
	// to set loading of other pages to idle

	useEffect(() => {
		dispatch(setLoadingToIdleLeagueSlice());
		dispatch(setLoadingToIdleClubsSlice());
		dispatch(setLoadingToIdleOneClubSlice());
	});
};

export default RequestPlayer;
