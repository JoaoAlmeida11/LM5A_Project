import { Container, Row, Col } from 'react-bootstrap';
import ShowClub from './ShowClub';
import { connect } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import { fetchClubs } from '../../redux/ducks/clubsSlice';

// shows all the clubs participating in a league
const League = props => {
	let { loading } = props;
	const { clubList, idLeagueStore } = props;
	const { leagueId } = useParams();
	if (
		leagueId !== undefined &&
		leagueId !== 'undefined' &&
		leagueId !== null &&
		leagueId !== 'null' &&
		leagueId !== '' &&
		loading !== 'failed' &&
		leagueId !== idLeagueStore
	)
		loading = 'idle';

	if (loading === 'idle') {
		props.fetchClub(leagueId);
	}

	return (
		<Container className="pt-4 pb-5">
			<Row className="justify-content-center">
				{loading === 'idle' ? (
					<Col xs={12} className="text-center">
						<div className="spinner-border text-center" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</Col>
				) : loading === 'success' ? (
					Object.entries(clubList).map(club => {
						return <ShowClub club={club[1]} key={club[0]} />;
					})
				) : loading === 'failed' ? (
					<Col xs={12} className="text-center">
						<h2>
							An error has occurred. Please reload this page and if the error
							persists contact an administrator
						</h2>
					</Col>
				) : (
					<Redirect to="/soccer/" />
				)}
			</Row>
		</Container>
	);
};

// receives necessary info stored in the store
const mapStateToProps = state => ({
	clubList: state.club.clubList,
	loading: state.club.loading,
	idLeagueStore: state.club.leagueId,
});

const mapDispatchToProps = dispatch => ({
	fetchClub: leagueId => dispatch(fetchClubs(leagueId)),
});

// connects the component to the store
export default connect(mapStateToProps, mapDispatchToProps)(League);
