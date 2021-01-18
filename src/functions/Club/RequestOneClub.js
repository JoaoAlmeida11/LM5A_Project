import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { fetchOneClub } from '../../redux/ducks/oneClubSlice';
import { setLoadingToIdleLeagueSlice } from '../../redux/ducks/leagueSlice';
import { setLoadingToIdleClubsSlice } from '../../redux/ducks/clubsSlice';

const RequestOneClub = ({ seasonId, clubId }) => {
	const dispatch = useDispatch();
	dispatch(fetchOneClub({ seasonId, clubId }));
	// to set loading of other pages to idle

	// TODO: see if it still needs
	useEffect(() => {
		dispatch(setLoadingToIdleLeagueSlice());
		dispatch(setLoadingToIdleClubsSlice());
	});
};

export default RequestOneClub;
