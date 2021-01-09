import { useDispatch } from 'react-redux';
import { fetchLeaguesAll } from '../../redux/ducks/leagueSlice';

const RequestLeague = () => {
	const dispatch = useDispatch();
	dispatch(fetchLeaguesAll());
};

export default RequestLeague;
