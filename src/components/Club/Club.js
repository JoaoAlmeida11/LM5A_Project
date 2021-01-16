import { Container, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import RequestOneClub from '../../functions/Club/RequestOneClub';
import Stadium from './Stadium';
import PlayerList from './PlayerList';
// import ClubInfo from './ClubInfo';
import { connect } from 'react-redux';

const Club = ({ club, loading }) => {
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
					<Row>
						<Col xs={12} lg={6}>
							<div>{club.teamName}</div>
							<Image src={`${club.logo}`} alt={club.teamName} fluid />
							<Stadium
								stadiumName={club.homeVenue.name}
								key={club.homeVenue.id}
							/>
						</Col>
						<Col xs={12} lg={6}>
							<PlayerList players={club.players} />
						</Col>
					</Row>
					{/* <Row>
						<Col xs={12}>
							<ClubInfo />
						</Col>
					</Row> */}
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
