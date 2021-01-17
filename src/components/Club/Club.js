import { Container, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import RequestOneClub from '../../functions/Club/RequestOneClub';
import Stadium from './Stadium';
import ShowPlayer from './ShowPlayer';
// import ClubInfo from './ClubInfo';
import { connect } from 'react-redux';

const Club = ({ club, loading }) => {
	console.log('club');
	console.log(club);

	const { seasonId, clubId } = useParams();

	// !Forced Fix: see what is setting the loading to success or preventing it from being set to 'idle' in the correspondent reducer
	// ! its when the League page is opened
	if ((club === undefined || club === null) && loading !== 'failed')
		loading = 'idle';

	if (loading === 'idle') {
		RequestOneClub({ seasonId, clubId });
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
			{/*//TODO: remove the div (its needed because there can only be a parent element)*/}
			{loading === 'success' && (
				<div>
					<Row className="pb-4 justify-content-center">
						<Col xs={6} lg={3}>
							<h2 className="font-weight-bolder text-center pt-4">
								{club.teamName}
							</h2>
							<Image src={`${club.logo}`} alt={club.teamName} fluid />
							<Stadium
								stadiumName={club.homeVenue.name}
								key={club.homeVenue.id}
							/>
						</Col>
					</Row>
					<Row>
						{club.players.map(player => {
							return (
								<ShowPlayer
									player={player}
									seasonId={seasonId}
									key={player.playerID}
								/>
							);
						})}
					</Row>
				</div>
			)}
		</Container>
	);
};

const mapStateToProps = state => {
	return {
		club: state.oneClub.oneClubInfo,
		loading: state.oneClub.loading,
	};
};

export default connect(mapStateToProps)(Club);
