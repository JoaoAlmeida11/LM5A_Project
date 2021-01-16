import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchClubs } from '../../redux/ducks/clubsSlice';
import { setLoadingToIdleLeagueSlice } from '../../redux/ducks/leagueSlice';
import { setLoadingToIdleOneClubSlice } from '../../redux/ducks/oneClubSlice';

const RequestClubs = leagueId => {
	const dispatch = useDispatch();
	dispatch(fetchClubs(leagueId));
	// to set loading of other pages to idle
	useEffect(() => {
		dispatch(setLoadingToIdleLeagueSlice());
		dispatch(setLoadingToIdleOneClubSlice());
	});
};

export default RequestClubs;
