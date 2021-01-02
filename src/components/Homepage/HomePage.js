import ShowLeague from './ShowLeague';
import RequestLeague from '../../functions/Homepage/RequestLeague';
import { Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

const HomePage = ({ leagueList, loading }) => {
	if (loading === 'idle') {
		RequestLeague();
	}

	return (
		<Container>
			<Row>
				{!leagueList && <p>Loading...</p>}
				{/* {console.log(league)} */}
				{loading === 'success' &&
					Object.entries(leagueList).map(league => {
						return <ShowLeague league={league[1]} key={league[0]} />;
					})}
			</Row>
		</Container>
	);
};

const mapStateToProps = state => {
	return { leagueList: state.league.leagueList, loading: state.league.loading };
};

export default connect(mapStateToProps)(HomePage);
