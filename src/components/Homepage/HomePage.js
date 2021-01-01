import ShowLeague from './ShowLeague';
// import RequestLeague from "../../functions/Homepage/RequestLeague"
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectAllLeagues } from '../../redux/ducks/leagueSlice';

export default function HomePage() {
	const leagues = useSelector(selectAllLeagues);
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
