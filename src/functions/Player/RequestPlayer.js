import { useDispatch } from 'react-redux';
import { fetchOnePlayer } from '../../redux/ducks/playersSlice';

const RequestPlayer = ({ seasonId, playerId }) => {
	const dispatch = useDispatch();
	dispatch(fetchOnePlayer({ seasonId, playerId }));
};

export default RequestPlayer;
