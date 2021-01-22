import ShowLeague from './ShowLeague';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchLeaguesAll } from '../../redux/ducks/leagueSlice';

const HomePage = ({ leagueList, loading }) => {
	// dispatch action to request data from API
	const dispatch = useDispatch();
	if (loading === 'idle') {
		dispatch(fetchLeaguesAll());
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

const mapStateToProps = state => ({
	leagueList: state.league.leagueList,
	loading: state.league.loading,
});

// connects the component to the store
export default connect(mapStateToProps)(HomePage);
