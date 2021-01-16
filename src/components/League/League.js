import { Container, Row } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
import ClubeDaLiga from './ClubeDaLiga';
import RequestClubs from '../../functions/League/RequestClubs';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// ! comment below
// TODO: see why when this page is opened oneClub.loading is set to 'success
const League = ({ clubList, loading, idLeagueStore }) => {
	const { leagueId } = useParams();

	if (loading === 'idle') {
		RequestClubs(leagueId);
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
		clubList: state.club.clubList,
		loading: state.club.loading,
		idLeagueStore: state.club.id,
	};
};

export default connect(mapStateToProps)(League);
