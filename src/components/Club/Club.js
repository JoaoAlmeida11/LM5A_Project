import { Container, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ShowPlayer from './ShowPlayer';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchOneClub } from '../../redux/ducks/oneClubSlice';

const Club = ({ club, loading }) => {
	// get the url params
	const { seasonId, clubId } = useParams();

	// checks if the request already failed or the url didn't receive info
	if ((club === undefined || club === null) && loading !== 'failed')
		loading = 'idle';

	// dispatch action to request data from API
	const dispatch = useDispatch();
	if (loading === 'idle') {
		dispatch(fetchOneClub({ seasonId, clubId }));
	}

	return (
		<Container>
			{loading === 'idle' && <p>Loading...</p>}
			{loading === 'failed' && (
				<p>
					An error has occurred. Please reload this page and if the error
					persists contact an administrator
				</p>
			)}
			{loading === 'success' && (
				<>
					<Row className="pb-4 justify-content-center">
						<Col xs={12} className="text-center pt-5">
							<Image src={`${club.logo}`} alt={club.teamName} fluid />
							<h1 className="font-weight-bolder text-center pt-4">
								{club.teamName}
							</h1>
							<h2 className="mt-3">Stadium: {club.homeVenue.name}</h2>
						</Col>
					</Row>
					<Row className="justify-content-center">
						{club.players.map(player => {
							if (player.photo !== '')
								return (
									<ShowPlayer
										player={player}
										seasonId={seasonId}
										key={player.playerID}
									/>
								);
							return true;
						})}
					</Row>
				</>
			)}
		</Container>
	);
};

// receives necessary info stored in the store
const mapStateToProps = state => ({
	club: state.oneClub.oneClubInfo,
	loading: state.oneClub.loading,
});

// connects the component to the store
export default connect(mapStateToProps)(Club);
