import { useParams } from 'react-router-dom';
import { Col, Image } from 'react-bootstrap';
import { Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchOnePlayer } from '../../redux/ducks/playersSlice';
import { Redirect } from 'react-router-dom';

const Player = ({ player, loading, seasonIdStore, playerIdStore }) => {
	const { seasonId, playerId } = useParams();
	const dispatch = useDispatch();
	if (
		seasonId === undefined ||
		seasonId === 'undefined' ||
		seasonId === null ||
		seasonId === 'null' ||
		seasonId === '' ||
		playerId === undefined ||
		playerId === 'undefined' ||
		playerId === null ||
		playerId === 'null' ||
		playerId === ''
	)
		return <Redirect to="/soccer/" />;
	else if (
		loading !== 'failed' && //not idle do to a loading being success...
		seasonIdStore !== seasonId &&
		playerIdStore !== playerId
	)
		dispatch(fetchOnePlayer({ seasonId, playerId }));

	return (
		<Container>
			<Row className="pl-5 d-flex justify-content-around pt-4 pb-4">
				{loading === 'idle' && <p>Loading...</p>}
				{loading === 'failed' && (
					<p>
						An error has occurred. Please reload this page and if the error
						persists contact an administrator
					</p>
				)}
				{loading === 'success' && (
					<>
						<Col xs={12} lg={6} className="text-center pt-3">
							<Image
								className="pt-2 imgPlayerConfig playerCard"
								src={`${player.photo}`}
								alt={player.shortName}
								fluid
							/>
						</Col>
						<Col xs={12} lg={6} className="text-center pt-3">
							<ul className="list-group">
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

							{/* <Button className="viewMoreButton">
								<Link
									to={`/lm5a_project/club/${seasonId}/${player.teams[0].teamID}`}
									className="text-white"
								>
									go back!
								</Link>
							</Button> */}
						</Col>
					</>
				)}
			</Row>
		</Container>
	);
};

const mapStateToProps = state => ({
	player: state.player.onePlayerInfo,
	loading: state.player.loading,
	seasonIdStore: state.player.seasonId,
	playerIdStore: state.player.playerId,
});

export default connect(mapStateToProps)(Player);
