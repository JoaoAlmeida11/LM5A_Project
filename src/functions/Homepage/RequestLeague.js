import { useDispatch } from 'react-redux';
import { fetchLeagues } from '../../redux/ducks/leagueSlice';

const RequestLeague = () => {
	const dispatch = useDispatch();
	dispatch(fetchLeagues());
};

export default RequestLeague;
