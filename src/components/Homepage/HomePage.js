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
				{loading === 'idle' && <p>Loading...</p>}
				{loading === 'failed' && (
					<p>
						An error has occurred. Please reload this page and if the error
						persists contact an administrator.
					</p>
				)}
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
