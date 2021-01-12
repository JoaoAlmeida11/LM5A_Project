import { Container, Row } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
import ClubeDaLiga from './ClubeDaLiga';
import RequestClubs from '../../functions/League/RequestClubs';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

const League = ({ clubList, loading }) => {
	let { leagueId } = useParams();
	// send params by redux
	// let { paramsId } = useParams();

	// console.log(paramsId);

	if (loading === 'idle') {
		RequestClubs(leagueId);
	}
	// ** Esta a ser chamado
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
				{loading === 'success' &&
					Object.entries(clubList).map(club => {
						return <ClubeDaLiga club={club[1]} key={club[0]} />;
					})}
			</Row>
		</Container>
	);
};

const mapStateToProps = state => {
	return {
		clubList: state.club.leagueId.clubList,
		loading: state.club.leagueId.loading,
	};
};

export default connect(mapStateToProps)(League);
