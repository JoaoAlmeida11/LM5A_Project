import ShowLeague from './ShowLeague';
// import RequestLeague from "../../functions/Homepage/RequestLeague"
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllLeagues, fetchLeagues } from '../../redux/ducks/leagueSlice';

const dispatch = useDispatch();
const leagues = useSelector(selectAllLeagues);

export default function HomePage() {
	useEffect(() => {
		dispatch(fetchLeagues());
	}, [dispatch]);

	return (
		<Container>
			<Row>
				{leagues.map(league => (
					<ShowLeague league={league} key={league.id} />
				))}
			</Row>
		</Container>
	);
}
