import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { schema, normalize } from 'normalizr';

const API_KEY = process.env.REACT_APP_API_KEY;

// TODO: check the problem with the schema.Array (only if there is enough time)
// export const playersEntity = new schema.Entity('players');
// export const homeVenueEntity = new schema.Entity('homeVenue');
// // export const clubEntity = new schema.Entity('clubs', {
// // 	city: String,
// // 	homeVenue: [homeVenueEntity],
// // 	logo: String,
// // 	players: [playersEntity],
// // 	seasonID: Number,
// // 	shortName: String,
// // 	teamID: String,
// // 	teamName: String,
// // });
// // export const clubEntity = new schema.Entity('clubs');
// export const clubListEntity = new schema.Array({
// 	city: String,
// 	homeVenue: [homeVenueEntity],
// 	logo: String,
// 	players: [playersEntity],
// 	seasonID: Number,
// 	shortName: String,
// 	teamID: String,
// 	teamName: String,
// });

//! doesn't work
// ,{headers: {
// 	'Access-Control-Allow-Origin': '*',
// 	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
// },
// proxy: {
// 	//** work around CORS ISSUE - may cause less security (the other option would be to contact the API)*/
// 	host: '104.236.174.88',
// 	port: 3128,
// },}

// ** functions to call data from the API
// ! weird bug: if you go to one of the leagues, then the other, then back to the first you get CORS ERROR on the last...
export const fetchData = url => {
	const axios = require('axios').default;
	return axios
		.get(url)
		.then(response => {
			return response.data;
		})
		.catch(err => {
			console.log(err);
			return err;
		});
};
export const fetchAllData = url => {
	return Promise.resolve(fetchData(url));
};
export const fetchAllDataConcurrently = urls => {
	return Promise.all(urls.map(fetchData));
};

// ** Functions on Promise Chaining that ask data
export const fetchPlayersId = res => {
	// ** get the ids of the clubs as participants
	const seasonId =
		res.needsLeagueList === false
			? res.leagueId
			: res.league.seasons[res.league.seasons.length - 1].seasonID;
	const url = `https://api.statorium.com/api/v1/seasons/${seasonId}/?apikey=${API_KEY}`;
	return fetchAllData(url);
};
export const fetchEachClub = res => {
	// ** get each club
	const participants = res.season.participants;
	const seasonId = res.season.seasonID;
	const urlsSet = new Set();
	for (let i in participants) {
		urlsSet.add(
			`https://api.statorium.com/api/v1/teams/${participants[i].participantID}/?season_id=${seasonId}&apikey=${API_KEY}`
		);
	}
	const urlsArray = [...urlsSet];

	return Promise.resolve(fetchAllDataConcurrently(urlsArray));
};
// ** Promise Chaining
export const conditionalChaining = ({ needsLeagueList, leagueId }) => {
	if (needsLeagueList) {
		const url = `https://api.statorium.com/api/v1/leagues/${leagueId}/?apikey=${API_KEY}`;
		return fetchAllData(url);
	}
	return Promise.resolve({ needsLeagueList, leagueId });
};

// ** needs the seasonId
export const fetchClubs = createAsyncThunk(
	'clubs/requestStatus',
	async (leagueId, thunkAPI) => {
		// ** get the last season of the league from the store
		const state = thunkAPI.getState();
		const leagueList = state.league.leagueList;
		const leagueListArray = Object.entries(leagueList);
		// console.log('leagueListArray');
		// console.log(leagueListArray);

		// TODO: check if information already exists
		if (state.club.id === leagueId) {
			console.log('Store already has the info');
			return { changeStore: false };
		}

		const needsLeagueList = leagueListArray.length !== 0 ? false : true;

		// console.log('needsLeagueList');
		// console.log(needsLeagueList);

		const response = await conditionalChaining({ needsLeagueList, leagueId })
			.then(res => fetchPlayersId(res))
			.then(res => fetchEachClub(res))
			.catch(error => {
				console.log(error);
				return error;
			});

		// TODO: fix mutability (this needs to return an array)
		const teamsSet = new Set();
		for (let i in response) {
			teamsSet.add(response[i].team);
		}
		const teams = [...teamsSet];

		// !normalize not working and since it wasn't needed it was removed
		return { teams, leagueId, changeStore: true };
	}
);

// TODO: catch the error from the async
const clubsSlice = createSlice({
	name: 'clubs',
	// TODO: initial state needs to store an array like a map with a key being the id
	initialState: {
		clubList: [],
		loading: 'idle',
		id: '', //this is only to know which leagues clubs where loaded
	},
	reducers: {},
	extraReducers: {
		[fetchClubs.pending]: (state, payload) => {
			state.loading = 'pending';
		},
		[fetchClubs.fulfilled]: (state, { payload }) => {
			state.loading = 'success';

			// ** if the store already has the values doesn't cause a store change
			if (payload.changeStore) {
				// const mergeDataSet = new Set();
				// for (let i in state.clubList) {
				// 	mergeDataSet.add(state.clubList[i]);
				// }
				// for (let i in payload.teams) {
				// 	mergeDataSet.add(payload.teams[i]);
				// }
				// const mergeDataArray = [...mergeDataSet];
				state.clubList = payload.teams;
				state.id = payload.leagueId;
			}
		},
		[fetchClubs.rejected]: state => {
			state.loading = 'failed';
		},
	},
});

export default clubsSlice.reducer;
