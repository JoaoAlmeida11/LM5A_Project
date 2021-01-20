import ShowLeague from './ShowLeague';
import RequestLeague from '../../functions/Homepage/RequestLeague';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

const HomePage = ({ leagueList, loading }) => {
	if (loading === 'idle') {
		RequestLeague();
	}
	if (loading === 'success') {
		console.log('Object.values(leagueList)');
		console.log(Object.values(leagueList));
		console.log(Object.values(leagueList)[0].seasons[0].seasonName);
	}

	return (
		<Container>
			<Row className="pt-5">
				<Col xs={12}>
					{loading === 'success' && (
						<h1 className="text-center">
							Season {Object.values(leagueList)[0].seasons[0].seasonName}
						</h1>
					)}
				</Col>
			</Row>

			<Row className="justify-content-around pdImgLeague">
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
	console.log('state in HomePage');
	console.log(state);
	return {
		leagueList: state.league.leagueList,
		loading: state.league.loading,
	};
};

export default connect(mapStateToProps)(HomePage);
