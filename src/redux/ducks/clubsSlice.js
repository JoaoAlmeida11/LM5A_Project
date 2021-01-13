import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { schema, normalize } from 'normalizr';

const API_KEY = process.env.REACT_APP_API_KEY;

export const clubEntity = new schema.Entity('clubs');
export const clubListEntity = new schema.Entity('clubList', {
	list: [clubEntity],
});

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
	const seasonId = res.league.seasons[res.league.seasons.length - 1].seasonID;
	const url = `https://api.statorium.com/api/v1/seasons/${seasonId}/?apikey=${API_KEY}`;
	return fetchAllData(url);
};
export const fetchEachClub = res => {
	console.log('fetchEachClub - Here');
	// console.log(sres);
	const participants = res.season.participants;
	// console.log('participants');
	// console.log(participants);
	const seasonId = res.season.seasonID;
	let urls = [];
	for (let i in participants) {
		urls.push(
			`https://api.statorium.com/api/v1/teams/${participants[i].participantID}/?season_id=${seasonId}&apikey=${API_KEY}`
		);
	}
	// console.log(urls);

	return Promise.resolve(fetchAllDataConcurrently(urls));
};
// ** Promise Chaining
export const conditionalChaining = ({ needsLeagueList, leagueId }) => {
	if (needsLeagueList) {
		const url = `https://api.statorium.com/api/v1/leagues/${leagueId}/?apikey=${API_KEY}`;
		return fetchAllData(url);
	} else {
		return Promise.resolve(true);
	}
};

// ** needs the seasonId
export const fetchClubs = createAsyncThunk(
	'clubs/requestStatus',
	async (leagueId, thunkAPI) => {
		// ** get the last season of the league from the store
		// ! this page can't be de first to be opened so there needs to be an automatic redirect or something
		const state = thunkAPI.getState();
		const leagueList = state.league.leagueList;

		// to transform object into an array
		const leagueListArray = Object.entries(leagueList);
		console.log('leagueList');
		console.log(leagueList);
		console.log('leagueListArray');
		console.log(leagueListArray);

		// let url;
		// let seasonId;

		// code improvement
		let needsLeagueList = leagueListArray.length !== 0 ? false : true;

		const response = await conditionalChaining({ needsLeagueList, leagueId }) //**working */
			.then(res => {
				console.log('All done! - Success');
				// console.log(res);
				return res;
			})
			.then(res => {
				return fetchPlayersId(res);
			})
			.then(res => {
				// const lastInfo = fetchEachClub(res);
				// console.log(lastInfo)
				return fetchEachClub(res);
			})
			.then(res => {
				console.log('EndOfLine');
				console.log(res);
			})
			.catch(error => {
				console.log(error);
				return error;
			});
		//!ALL the calls are working but the response doesn't wait for them...
		console.log('response');
		console.log(response);
		console.table(response);

		// console.log(response);
		const normalized = normalize(response.leagues, [clubListEntity]);
		return normalized.entities;
	}
);

const clubsSlice = createSlice({
	name: 'clubs',
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
			state.clubList = payload.clubList;
		},
		[fetchClubs.rejected]: state => {
			state.leagueId.loading = 'failed';
		},
	},
});

export default clubsSlice.reducer;
