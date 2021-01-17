import { useDispatch } from 'react-redux';
import { logOutAction } from '../../redux/ducks/AuthSlice';

const LogOut = () => {
	const dispatch = useDispatch();
	dispatch(logOutAction());
};
export default LogOut;
