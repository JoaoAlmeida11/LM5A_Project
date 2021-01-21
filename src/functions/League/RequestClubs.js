import { useDispatch } from 'react-redux';
import { fetchClubs } from '../../redux/ducks/clubsSlice';

const RequestClubs = leagueId => {
	const dispatch = useDispatch();
	dispatch(fetchClubs(leagueId));
};

export default RequestClubs;
