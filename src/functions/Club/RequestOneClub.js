import { useDispatch } from 'react-redux';
import { fetchOneClub } from '../../redux/ducks/oneClubSlice';

const RequestOneClub = ({ seasonId, clubId }) => {
	const dispatch = useDispatch();
	dispatch(fetchOneClub({ seasonId, clubId }));
};

export default RequestOneClub;
