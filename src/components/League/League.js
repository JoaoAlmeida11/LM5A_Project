import { Container, Row } from 'react-bootstrap';
import ShowClub from './ShowClub';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchClubs } from '../../redux/ducks/clubsSlice';

// shows all the clubs participating in a league
const League = ({ clubList, loading, idLeagueStore }) => {
	const { leagueId } = useParams();

	if (
		leagueId !== undefined &&
		leagueId !== null &&
		loading !== 'failed' &&
		leagueId !== idLeagueStore
	)
		loading = 'idle';

	const dispatch = useDispatch();
	if (loading === 'idle') {
		dispatch(fetchClubs(leagueId));
	}

	return (
		<Container className="pt-4 pb-5">
			<Row className="justify-content-center">
				{loading === 'idle' && <p>Loading...</p>}
				{loading === 'failed' && (
					<p>
						An error has occurred. Please reload this page and if the error
						persists contact an administrator
					</p>
				)}
				{loading === 'success' &&
					Object.entries(clubList).map(club => {
						return <ShowClub club={club[1]} key={club[0]} />;
					})}
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

// connects the component to the store
export default connect(mapStateToProps)(League);
