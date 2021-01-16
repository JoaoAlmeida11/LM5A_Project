import { useDispatch } from 'react-redux';
import { fetchLeaguesAll } from '../../redux/ducks/leagueSlice';
import { setLoadingToIdleClubsSlice } from '../../redux/ducks/clubsSlice';
import { setLoadingToIdleOneClubSlice } from '../../redux/ducks/oneClubSlice';

const RequestLeague = () => {
	const dispatch = useDispatch();
	dispatch(fetchLeaguesAll());
	// to set loading of other pages to idle

	useEffect(() => {
		dispatch(setLoadingToIdleClubsSlice());
		dispatch(setLoadingToIdleOneClubSlice());
	});
};

export default RequestLeague;
