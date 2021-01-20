import { useParams, Link } from 'react-router-dom';
import { Col, Button, Image } from 'react-bootstrap';
import { Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import RequestPlayer from '../../functions/Player/RequestPlayer';
const Player = ({ player, loading, seasonIdStore, playerIdStore }) => {
	const { seasonId, playerId } = useParams();
	// console.table([0, 1, 2, 3]);
	// console.log('playerId');
	// console.log(player);

	// if (loading === 'success') {
	// 	console.log('player.teams');
	// 	console.log(player.teams);
	// }

	if (
		(seasonId !== seasonIdStore || playerId !== playerIdStore) &&
		loading !== 'failed' &&
		seasonId !== undefined &&
		seasonId !== null &&
		playerId !== undefined &&
		playerId !== null
	)
		loading = 'idle';

	if (loading === 'idle') {
		RequestPlayer({ seasonId, playerId });
	}
	return (
		<Container>
			<Row className="pl-5 d-flex justify-content-center">
				{loading === 'idle' && <p>Loading...</p>}
				{loading === 'failed' && (
					<p>
						An error has occurred. Please reload this page and if the error
						persists contact an administrator
					</p>
				)}
				{loading === 'success' && (
					<Col xs={12} md={6} lg={3} className="text-center pt-3">
						<Image
							className="pt-2 imgPlayerConfig border border-secondary"
							src={`${player.photo}`}
							alt={player.shortName}
							fluid
						/>

						<ul className="list-group list-group-flush">
							<li className="list-group-item">
								<span className="font-weight-bolder">Full Name: </span>
								{`${player.fullName}`}
							</li>
							<li className="list-group-item">
								<span className="font-weight-bolder">Birthdate: </span>
								{`${player.additionalInfo.birthdate}`}
							</li>
							<li className="list-group-item">
								<span className="font-weight-bolder">Height: </span>
								{`${player.additionalInfo.height}`}
							</li>
							<li className="list-group-item">
								<span className="font-weight-bolder">weight: </span>
								{`${player.additionalInfo.weight}`}
							</li>
							<li className="list-group-item">
								<span className="font-weight-bolder">Country: </span>
								{`${player.country.name}`}
							</li>
						</ul>

						<Button className="viewMoreButton">
							<Link
								to={`/lm5a_project/club/${seasonId}/${player.teams[0].teamID}`}
								className="text-white"
							>
								go back!
							</Link>
						</Button>
					</Col>
				)}
			</Row>
		</Container>
	);
};

const mapStateToProps = state => {
	console.log('state of Player');
	console.log(state);
	return {
		player: state.player.onePlayerInfo,
		loading: state.player.loading,
		seasonIdStore: state.player.seasonId,
		playerIdStore: state.player.playerId,
	};
};

export default connect(mapStateToProps)(Player);
