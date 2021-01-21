// import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Image } from 'react-bootstrap';
import { Container, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchOnePlayer } from '../../redux/ducks/playersSlice';
import { Redirect, Link } from 'react-router-dom';

const Player = props => {
	let { loading } = props;
	const { player, seasonIdStore, playerIdStore } = props;
	const { seasonId, playerId } = useParams();
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
		(seasonId !== seasonIdStore || playerId !== playerIdStore) &&
		loading !== 'failed'
	)
		loading = 'idle';

	if (loading === 'idle') {
		props.fetchPlayer({ seasonId, playerId });
	}

	if (
		loading !== undefined &&
		loading !== null &&
		loading !== 'undefined' &&
		loading !== 'null' &&
		loading !== ''
	)
		return (
			<Container>
				<Row className="pl-5 d-flex justify-content-around pt-4 pb-4">
					{loading === 'idle' ? (
						<Col xs={12} className="text-center">
							<div className="spinner-border text-center" role="status">
								<span className="sr-only">Loading...</span>
							</div>
						</Col>
					) : loading === 'success' ? (
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

								<Button className="viewMoreButton">
									<Link
										to={`/soccer/club/${seasonId}/${player.teams[0].teamID}`}
										className="text-white"
									>
										go back!
									</Link>
								</Button>
							</Col>
						</>
					) : loading === 'failed' ? (
						<Col xs={12} className="text-center">
							<h2>
								An error has occurred. Please reload this page and if the error
								persists contact an administrator
							</h2>
						</Col>
					) : (
						// <Redirect to="/soccer/" />
						<p></p>
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

// used instead of useDispatch while trying to fix the bug where a component renders while another component (from another page) is being loaded
// either way the code coverage prefers this method
const mapDispatchToProps = dispatch => ({
	fetchPlayer: ({ seasonId, playerId }) =>
		dispatch(fetchOnePlayer({ seasonId, playerId })),
});
export default connect(mapStateToProps, mapDispatchToProps)(Player);
