import { Container, Row } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
import ClubeDaLiga from './ClubeDaLiga';
import RequestClubs from '../../functions/League/RequestClubs';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

const League = ({ clubList, loading, idLeagueStore }) => {
	let { leagueId } = useParams();

	let checkIfLeaguesWasLoadedBefore = false;

	console.log('idLeagueStore');
	console.log(idLeagueStore);
	if (idLeagueStore.length !== 0) {
		for (let i in idLeagueStore) {
			if (idLeagueStore[i] === leagueId) checkIfLeaguesWasLoadedBefore = true;
		}
	}

	if (
		loading === 'idle' ||
		(loading === 'success' && checkIfLeaguesWasLoadedBefore)
	) {
		if (loading !== 'stop') {
			RequestClubs(leagueId);
		}
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
		idLeagueStore: state.club.leagueId.id,
	};
};

export default connect(mapStateToProps)(League);
