import { useParams, Link } from 'react-router-dom';
import { Col, Button, Image } from 'react-bootstrap';
import { Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import RequestPlayer from '../../functions/Player/RequestPlayer';
const Player = ({ player, loading, seasonIdStore, playerIdStore }) => {
	const { seasonId, playerId } = useParams();

	if (
		(seasonId !== seasonIdStore || playerId !== playerIdStore) &&
		loading !== 'failed'
	)
		loading = 'idle';

	if (loading === 'idle') {
		RequestPlayer({ seasonId, playerId });
	}
	return (
		<Container>
			<Row>
				{loading === 'idle' && <p>Loading...</p>}
				{loading === 'failed' && (
					<p>
						An error has occurred. Please reload this page and if the error
						persists contact an administrator
					</p>
				)}
				{loading === 'success' && (
					<Col xs={12} md={6} lg={4}>
						<Image src={`${player.photo}`} alt={player.shortName} fluid />
						<Button className="homepageButtonLeague">
							<Link
								to={`/lm5a_project/player/${seasonId}/${player.playerID}/`}
								className="text-white"
							>
								View more!
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
