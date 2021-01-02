// import { useEffect } from 'react';
import ShowLeague from './ShowLeague';
import RequestLeague from '../../functions/Homepage/RequestLeague';
import { Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
// import produce from 'immer';
// import { useSelector, useDispatch, connect } from 'react-redux';
// import { selectLeagues, fetchLeagues } from '../../redux/ducks/leagueSlice';

// const dispatch = useDispatch();
// const leagues = useSelector(selectAllLeagues);

const HomePage = ({ leagueList, loading }) => {
	if (loading === 'idle') {
		RequestLeague();
	}
	// leagues = useSelector(selectLeagues);
	// const dispatch = useDispatch();
	// useEffect(() => {
	// 	dispatch(fetchLeagues()); //can be passed an obj
	// 	console.log(leagues);
	// }, [dispatch]); //so that it only re-renders if dispatch is changed

	return (
		<Container>
			<Row>
				{!leagueList && <p>Loading...</p>}
				{/* {console.log(league)} */}
				{loading === 'success' &&
					Object.entries(leagueList).map(league => {
						console.log('league map');
						console.log(league);
						// console.log(league[1]);
						// console.log(index);
						return <ShowLeague league={league[1]} key={league[0]} />;
					})}
			</Row>
		</Container>
	);
};

const mapStateToProps = state => {
	// console.log('state');
	// console.log(state);
	return { leagueList: state.league.leagueList, loading: state.league.loading };
};

export default connect(mapStateToProps)(HomePage);

// const dispatch = useDispatch();
// 	useEffect(() => {
// 		dispatch(fetchLeagues()); //can be passed an obj
// 	}, [dispatch]); //so that it only re-renders if dispatch is changed
