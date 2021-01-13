import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { schema, normalize } from 'normalizr';

const API_KEY = process.env.REACT_APP_API_KEY;

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

// ** functions to call data from the API
export const fetchData = url => {
	const axios = require('axios').default;
	return axios
		.get(url)
		.then(function (response) {
			return response.data;
		})
		.catch(function (err) {
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
	console.log('fetchPlayersId - Here');
	console.log(res);
	// console.log(res.needsLeagueList)
	let seasonId;
	if (res.needsLeagueList === false) seasonId = res.leagueId;
	else seasonId = res.league.seasons[res.league.seasons.length - 1].seasonID;
	const url = `https://api.statorium.com/api/v1/seasons/${seasonId}/?apikey=${API_KEY}`;
	return fetchAllData(url);
};
export const fetchEachClub = res => {
	// ** get each club
	const participants = res.season.participants;
	const seasonId = res.season.seasonID;
	let urls = [];
	for (let i in participants) {
		urls.push(
			`https://api.statorium.com/api/v1/teams/${participants[i].participantID}/?season_id=${seasonId}&apikey=${API_KEY}`
		);
	}
	return Promise.resolve(fetchAllDataConcurrently(urls));
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

		const needsLeagueList = leagueListArray.length !== 0 ? false : true;
		console.log('needsLeagueList');
		console.log(needsLeagueList);
		const response = await conditionalChaining({ needsLeagueList, leagueId })
			.then(res => fetchPlayersId(res))
			.then(res => fetchEachClub(res))
			.catch(error => {
				console.log(error);
				return error;
			});

		let teams = [];
		for (let i in response) {
			teams.push(response[i].team);
		}

		// !normalize not working and since it wasn't needed it was removed
		return teams;
	}
);

const clubsSlice = createSlice({
	name: 'clubs',
	// TODO: initial state needs to store an array like a map with a key being the id
	initialState: {
		leagueId: {
			id: '',
			clubList: [],
			loading: 'idle',
		},
	},
	reducers: {},
	extraReducers: {
		[fetchClubs.pending]: state => {
			state.leagueId.loading = 'pending';
		},
		[fetchClubs.fulfilled]: (state, { payload }) => {
			state.leagueId.loading = 'success';
			console.log('payload');
			console.log(payload);
			state.clubList = payload;
		},
		[fetchClubs.rejected]: state => {
			state.leagueId.loading = 'failed';
		},
	},
});

export default clubsSlice.reducer;
