import { Container, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import RequestOneClub from '../../functions/Club/RequestOneClub';
import ShowPlayer from './ShowPlayer';
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
						<Col xs={12} className="text-center">
							<h1 className="font-weight-bolder text-center pt-4">
								{club.teamName}
							</h1>
							<Image src={`${club.logo}`} alt={club.teamName} fluid />
							{/* //TODO: change to div */}
							<div>Nome do Estadio</div>
						</Col>
					</Row>
					<Row className="justify-content-center">
						{club.players.map(player => {
							// TODO:
							console.log('player');
							console.log(player);
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
