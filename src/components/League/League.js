import { Container, Row } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
import ClubeDaLiga from './ClubeDaLiga';
import RequestClub from '../../functions/League/RequestClub';
import { connect } from 'react-redux';

const League = ({ clubList, loading }) => {
	// send params by redux
	// let { paramsId } = useParams();

	// console.log(paramsId);

	if (loading === 'idle') {
		RequestClub();
	}

	return (
		<Container>
			<Row>
				{/* {dbClubs.data.map(club => (
					<ClubeDaLiga club={club} key={club.id} path={paramsId} />
				))} */}

				{loading === 'idle' && <p>Loading...</p>}
				{loading === 'failed' && (
					<p>
						An error has occurred. Please reload this page and if the error
						persists contact an administrator
					</p>
				)}
				{/* {console.log(league)} */}
				{loading === 'success' &&
					Object.entries(clubList).map(club => {
						return <ClubeDaLiga club={club[1]} key={club[0]} />;
					})}
			</Row>
		</Container>
	);
};

const mapStateToProps = state => {
	return { leagueList: state.league.leagueList, loading: state.league.loading };
};

export default connect(mapStateToProps)(League);
