import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import RequestOneClub from '../../functions/Club/RequestOneClub';
import Stadium from './Stadium';
import PlayerList from './PlayerList';
import ClubInfo from './ClubInfo';
import { connect } from 'react-redux';

const Club = () => {
	const { seasonId, clubId } = useParams();
	const loading = 'idle';

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
							<Stadium />
						</Col>
						<Col xs={12} lg={6}>
							<PlayerList />
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<ClubInfo />
						</Col>
					</Row>
				</div>
			)}
		</Container>
	);
};

const mapStateToProps = state => {
	// return {
	// 	clubList: state.club.clubList,
	// 	loading: state.club.loading,
	// 	idLeagueStore: state.club.id,
	// };
};

export default connect(mapStateToProps)(Club);
