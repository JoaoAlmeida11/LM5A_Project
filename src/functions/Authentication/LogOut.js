import { useDispatch } from 'react-redux';
import { logOutAction } from '../../redux/ducks/AuthSlice';

const LogOut = props => {
	const dispatch = useDispatch();
	dispatch(logOutAction());
	props.firebase.logout();
};
export default LogOut;
